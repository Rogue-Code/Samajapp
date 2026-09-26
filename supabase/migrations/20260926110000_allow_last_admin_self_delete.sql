-- delete_my_account() used to refuse to let the last remaining admin delete
-- their own account (see 20260911140000_fix_delete_my_account_storage.sql),
-- on the same anti-lockout reasoning as set_member_role(): losing every
-- admin leaves nobody who can manage the app, and unlike a role change this
-- is irreversible.
--
-- Removed at the owner's explicit request (2026-09-26): any member,
-- including a lone admin, may delete their own account. Consequence, stated
-- plainly for whoever reads this next: if the only admin does this, the
-- admin console (member roles, facilities, events, sponsors) has no
-- self-service way back — set_member_role() requires an existing admin
-- caller. Recovery needs a manual SQL Editor bootstrap, e.g.:
--   update public.profiles set role = 'admin' where mobile = '<their +91 number>';
-- set_member_role()'s own anti-lockout (blocking an admin from demoting
-- themselves) is untouched — this migration only concerns deletion.
CREATE OR REPLACE FUNCTION public.delete_my_account()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller UUID := auth.uid();
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'You must be signed in to delete your account';
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
