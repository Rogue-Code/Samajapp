import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { isAuthRetryableFetchError, type Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { clearCachedProfile } from "@/lib/cached-profile";
import { clearCachedFamilyStatus } from "@/lib/cached-family-status";

/**
 * Redirects to login when there's no active session; otherwise exposes the
 * session once known.
 *
 * `getSession()` alone only proves a token was saved on this device — it
 * doesn't ask the server whether that login is still good, so a member whose
 * account was deleted (by themselves, by an admin, or by hand in the
 * Supabase dashboard) keeps sailing straight past this guard on their
 * existing, not-yet-expired token: every page they land on comes back empty
 * instead of sending them back to sign in. Two checks run in the background
 * after the page has already rendered with the local session, covering the
 * two different ways "deleted" turns out to mean in practice:
 *
 * 1. `getUser()` re-verifies the login itself. Catches the account being
 *    gone outright — delete_my_account(), an admin removal, or a dashboard
 *    "Delete user". Signs out only on a genuine *rejection*, never merely
 *    being unreachable — `isAuthRetryableFetchError` is the same distinction
 *    the bundled auth library itself uses so a member isn't signed out just
 *    for being offline (see destinationAfterLogin's own comment); that
 *    behavior must not regress here.
 * 2. A direct check that a `profiles` row exists for this id. Catches the
 *    login surviving while the row itself was deleted separately — e.g. by
 *    hand in the dashboard's Table Editor, which doesn't touch `auth.users`
 *    at all, so `getUser()` alone sees nothing wrong. A missing row is never
 *    a legitimate state for an *existing* session to be in: the signup
 *    trigger inserts one in the same transaction as the `auth.users` row, so
 *    a genuinely new member always has one (with `profile_completed` false,
 *    not absent) — that's what tells this apart from someone legitimately
 *    mid-signup on the Profile Setup screen, who must not be signed out here.
 */
export function useRequireAuth() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!data.session) {
        navigate({ to: "/" });
        return;
      }
      const userId = data.session.user.id;
      setSession(data.session);
      setChecking(false);

      const [userCheck, profileCheck] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("profiles").select("id").eq("id", userId).maybeSingle(),
      ]);
      if (cancelled) return;
      const userError = userCheck.error;
      const rejected = userError && !isAuthRetryableFetchError(userError);
      // profileCheck.error covers its own request failing (offline, etc.) —
      // silently keep the session then too, same reasoning as `getUser()`.
      const rowMissing = !profileCheck.error && profileCheck.data === null;
      if (!rejected && !rowMissing) return;
      clearCachedProfile(userId);
      clearCachedFamilyStatus(userId);
      await supabase.auth.signOut().catch(() => undefined);
      if (!cancelled) navigate({ to: "/" });
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return { session, checking };
}
