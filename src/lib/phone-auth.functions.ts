import { createServerFn } from "@tanstack/react-start";
import {
  FirebasePhoneTokenError,
  verifyFirebasePhoneToken,
} from "@/integrations/firebase/verify-token.server";

// Phone-only accounts need SOME email on file — Supabase's session-minting
// path (generateLink) only supports the email type. This address is never
// mailed anywhere; generateLink just returns a token, it doesn't send.
const SYNTHETIC_EMAIL_DOMAIN = "phone.sangath.internal";

function syntheticEmailFor(phone: string) {
  return `${phone.replace("+", "")}@${SYNTHETIC_EMAIL_DOMAIN}`;
}

interface BridgeInput {
  idToken: string;
  createUser: boolean;
}

type BridgeResult =
  | { ok: true; email: string; otp: string }
  | { ok: false; reason: "not_registered" | "invalid_token" };

/**
 * Exchanges a Firebase-verified phone ownership proof for a real Supabase
 * sign-in code. The client still has to redeem that code itself via
 * `supabase.auth.verifyOtp` — this never hands back a session directly.
 */
export const bridgeFirebasePhoneLogin = createServerFn({ method: "POST" })
  .validator((input: BridgeInput) => input)
  .handler(async ({ data }): Promise<BridgeResult> => {
    let phone: string;
    try {
      phone = await verifyFirebasePhoneToken(data.idToken);
    } catch (err) {
      if (err instanceof FirebasePhoneTokenError) {
        return { ok: false, reason: "invalid_token" };
      }
      throw err;
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = syntheticEmailFor(phone);

    // `phone_auth_identities` predates the last `supabase gen types` run, so
    // the generated Database type doesn't know about it yet.
    const identities = supabaseAdmin.from("phone_auth_identities" as never);

    const { data: existing } = await identities
      .select("user_id")
      .eq("phone", phone)
      .maybeSingle<{ user_id: string }>();

    let userId = existing?.user_id;

    if (!userId) {
      if (!data.createUser) {
        return { ok: false, reason: "not_registered" };
      }

      const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
        phone,
        phone_confirm: true,
        email,
        email_confirm: true,
      });
      if (createError || !created.user) {
        throw createError ?? new Error("Failed to create phone-verified user.");
      }
      userId = created.user.id;

      const { error: insertError } = await identities.insert({ phone, user_id: userId } as never);
      if (insertError) throw insertError;
    }

    const { data: link, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email,
    });
    if (linkError || !link) {
      throw linkError ?? new Error("Failed to issue a sign-in code.");
    }

    return { ok: true, email, otp: link.properties.email_otp };
  });
