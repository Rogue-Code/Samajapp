-- delete_my_account() previously carried a "backstop" DELETE FROM
-- storage.objects, for the rare case where the client's own storage cleanup
-- (supabase.storage.from('avatars').remove(...), which runs first and reclaims
-- the actual file) failed silently before this RPC was called.
--
-- Supabase now rejects any raw SQL DELETE against storage.objects outright —
-- "Direct deletion from storage tables is not allowed. Use storage API
-- instead" — as a blanket, statement-level protection, not one that only
-- fires when a matching row exists. So that backstop no longer degrades to
-- "an orphaned file"; it aborts the whole function before auth.users is ever
-- touched, which made account deletion fail unconditionally, for every
-- member, whether or not they even had an avatar.
--
-- The fix is to drop the backstop rather than replace it: reaching for a real
-- one would mean calling the Storage REST API from inside Postgres (pg_net
-- plus a service-role key held in the database), which is a materially
-- different security posture and not something to reach for to patch a bug.
-- The client-side removal remains the actual cleanup path and already runs
-- before this function is called; what's lost is only the safety net for the
-- case where that call fails right as someone deletes their account — a file
-- left behind under a permanently invalidated login, not a readable one.
CREATE OR REPLACE FUNCTION public.delete_my_account()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller       UUID := auth.uid();
  caller_role  TEXT;
  other_admins INTEGER;
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'You must be signed in to delete your account';
  END IF;

  SELECT p.role INTO caller_role FROM public.profiles p WHERE p.id = caller;

  -- Anti-lockout, same reasoning as set_member_role: an admin must not be able
  -- to leave the community with nobody who can manage it. Unlike a role change
  -- this one is irreversible, so it is checked before anything is touched.
  IF caller_role = 'admin' THEN
    SELECT count(*) INTO other_admins
      FROM public.profiles p
     WHERE p.role = 'admin' AND p.id <> caller;

    IF other_admins = 0 THEN
      RAISE EXCEPTION 'You are the only admin. Make another member an admin before deleting your account.';
    END IF;
  END IF;

  -- Everything else hangs off auth.users by foreign key. Cascades: profiles,
  -- family_members, saved_posts, saved_facilities, event_rsvps. Set to NULL:
  -- posts.author_id, events.created_by, family_members.linked_profile_id on
  -- other members' rows that pointed at this profile.
  DELETE FROM auth.users WHERE id = caller;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.delete_my_account() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_my_account() TO authenticated;
