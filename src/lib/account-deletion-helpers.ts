import { Capacitor } from "@capacitor/core";
import { supabase } from "@/integrations/supabase/client";
import { DEPLOYED_ORIGIN } from "@/lib/deployed-origin";
import {
  deleteAccount,
  type DeleteAccountResult,
  type FirebaseOutcome,
} from "@/lib/account-deletion.functions";

export type { DeleteAccountResult, FirebaseOutcome };

/**
 * Deletes the signed-in member's account, everywhere it exists.
 *
 * Picks the transport the same way phone sign-in does: the web build calls the
 * server function directly, while the APK — whose build never generates the
 * client stub — goes through the plain REST route on the deployed backend.
 * Everything about *what* deletion means lives on the server; this only chooses
 * how to reach it.
 */
export async function requestAccountDeletion(): Promise<DeleteAccountResult> {
  const { data } = await supabase.auth.getSession();
  const accessToken = data.session?.access_token;
  if (!accessToken) return { ok: false, reason: "unauthenticated" };

  if (!Capacitor.isNativePlatform()) {
    return deleteAccount({ data: { accessToken } });
  }

  const response = await fetch(`${DEPLOYED_ORIGIN}/api/account-deletion`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ accessToken }),
  });
  if (!response.ok) {
    return { ok: false, reason: "refused", message: "Account deletion failed." };
  }
  return response.json();
}
