import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * A server-side Supabase client that acts as one specific signed-in member.
 *
 * Distinct from `supabaseAdmin`, which bypasses RLS entirely: some server work
 * must run *as the member* so that `auth.uid()` resolves and the database's own
 * guards still apply. `delete_my_account()` is the case this exists for — it
 * refuses to delete the last remaining admin, and that check is worthless if
 * the server calls it with a service-role key that makes `auth.uid()` null.
 *
 * The caller is responsible for having verified the token first (see
 * `deleteAccountCore`); this only scopes the requests, it proves nothing.
 */
export function createUserScopedClient(accessToken: string) {
  const url = process.env["SUPABASE_URL"];
  const publishableKey = process.env["SUPABASE_PUBLISHABLE_KEY"];

  if (!url || !publishableKey) {
    const missing = [
      ...(url ? [] : ["SUPABASE_URL"]),
      ...(publishableKey ? [] : ["SUPABASE_PUBLISHABLE_KEY"]),
    ];
    throw new Error(`Missing Supabase environment variable(s): ${missing.join(", ")}.`);
  }

  return createClient<Database>(url, publishableKey, {
    global: {
      // The member's token, not the key's: this is what makes auth.uid() the
      // member inside SECURITY DEFINER functions and RLS policies.
      headers: { Authorization: `Bearer ${accessToken}` },
    },
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
