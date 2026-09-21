import { createServerFn } from "@tanstack/react-start";

export interface DeleteAccountInput {
  /** The caller's Supabase access token, proving who is being deleted. */
  accessToken: string;
}

/**
 * What happened to the member's Firebase sign-in record.
 *
 * "skipped" means the account had no mobile sign-in identity, so there was
 * never a Firebase user; "failed" means the Sangath account is gone but the
 * Firebase record survived and still needs removing by hand.
 */
export type FirebaseOutcome = "deleted" | "not_found" | "skipped" | "failed";

export type DeleteAccountResult =
  | { ok: true; firebase: FirebaseOutcome }
  | { ok: false; reason: "unauthenticated" }
  | { ok: false; reason: "refused"; message: string };

/**
 * Deletes a member's account everywhere it exists.
 *
 * This runs on the server rather than the client because the Firebase half
 * needs service-account credentials that must never reach a WebView. It is not
 * just a convenience wrapper: the *order* of the two deletions is the point.
 *
 * Supabase goes first. delete_my_account() carries the guards — it refuses to
 * delete the only remaining admin — and those guards have to be able to stop
 * the whole operation. Deleting the Firebase user first and then having the RPC
 * refuse would leave a member who still has an account but can no longer sign
 * in to it, which is the worst outcome available here.
 *
 * Firebase goes second, best effort. If it fails, the Sangath account is
 * already gone — the actual erasure obligation is met — and what remains is a
 * phone number still held by Google, which is exactly the state the Privacy
 * Policy describes and asks members to write in about. The caller is told, so
 * it can say so rather than claiming a clean delete.
 */
export async function deleteAccountCore(input: DeleteAccountInput): Promise<DeleteAccountResult> {
  const accessToken = input.accessToken?.trim();
  if (!accessToken) return { ok: false, reason: "unauthenticated" };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Verify the token rather than trusting a user id from the client: this is
  // the only thing standing between a stranger's request and someone else's
  // account being deleted.
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  const user = userData?.user;
  if (userError || !user) return { ok: false, reason: "unauthenticated" };

  // Read the sign-in number BEFORE the delete: phone_auth_identities has a
  // foreign key to auth.users ON DELETE CASCADE, so this row is gone the
  // moment the RPC succeeds, and with it the only record of which Firebase
  // user belonged to this member.
  //
  // `phone_auth_identities` postdates the last `supabase gen types` run, hence
  // the cast — same as in phone-auth.functions.ts.
  const { data: identity } = await supabaseAdmin
    .from("phone_auth_identities" as never)
    .select("phone")
    .eq("user_id", user.id)
    .maybeSingle<{ phone: string }>();

  const { createUserScopedClient } = await import("@/integrations/supabase/user-client.server");
  const asUser = createUserScopedClient(accessToken);

  const { error: rpcError } = await asUser.rpc("delete_my_account");
  if (rpcError) {
    // The guards inside the function raise readable messages ("You are the only
    // admin…"), which the member needs to see to act on.
    return { ok: false, reason: "refused", message: rpcError.message };
  }

  if (!identity?.phone) return { ok: true, firebase: "skipped" };

  try {
    const { deleteFirebaseUserByPhone } = await import("@/integrations/firebase/admin.server");
    return { ok: true, firebase: await deleteFirebaseUserByPhone(identity.phone) };
  } catch (error) {
    // Deliberately not rethrown: the member's account is already deleted, and
    // failing the request now would tell them the deletion did not happen when
    // it did. Logged so the leftover Firebase record can be cleaned up.
    console.error("[account-deletion] Firebase user survived deletion:", error);
    return { ok: true, firebase: "failed" };
  }
}

export const deleteAccount = createServerFn({ method: "POST" })
  .validator((input: DeleteAccountInput) => input)
  .handler(({ data }) => deleteAccountCore(data));
