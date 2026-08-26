-- Self-service account deletion.
--
-- The Privacy Policy promises members can have their data erased, and Google
-- Play requires an in-app deletion path. Deleting a row from auth.users is the
-- only way to actually revoke a login, and that needs privileges the member
-- does not have — hence a SECURITY DEFINER function rather than a client call.
--
-- Two things do NOT get cleaned up by the cascade and are handled explicitly
-- below: community news (which should outlive its author) and avatar files in
-- storage (which have no foreign key to auth.users at all).

-- 1. Community news outlives its author.
--
-- posts.author_id was NOT NULL ON DELETE CASCADE, so deleting a committee
-- member erased every announcement they had ever published. For a community
-- record that is the wrong trade: the post matters to everyone, the byline
-- only to one person. Dropping the author reference keeps the notice and
-- removes the attribution, which is what the Privacy Policy describes.
--
-- The existing RLS policies stay correct under a NULL author: every one of
-- them compares auth.uid() = author_id, and `uid = NULL` is NULL rather than
-- true, so an orphaned post cannot be inserted, edited or deleted by anyone
-- except an admin.
ALTER TABLE public.posts ALTER COLUMN author_id DROP NOT NULL;
ALTER TABLE public.posts DROP CONSTRAINT posts_author_id_fkey;
ALTER TABLE public.posts
  ADD CONSTRAINT posts_author_id_fkey
  FOREIGN KEY (author_id) REFERENCES public.profiles(id) ON DELETE SET NULL;

-- 2. The deletion itself.
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

  -- storage.objects has no foreign key to auth.users, so a profile photo would
  -- survive the cascade and stay readable at its public URL forever. The client
  -- removes the files through the storage API first (which reclaims the actual
  -- object); this is the backstop for anything that call missed.
  DELETE FROM storage.objects
   WHERE bucket_id = 'avatars'
     AND (storage.foldername(name))[1] = caller::text;

  -- Everything else hangs off auth.users by foreign key. Cascades: profiles,
  -- family_members, saved_posts, saved_facilities, event_rsvps. Set to NULL:
  -- posts.author_id, events.created_by, family_members.linked_profile_id on
  -- other members' rows that pointed at this profile.
  DELETE FROM auth.users WHERE id = caller;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.delete_my_account() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_my_account() TO authenticated;
