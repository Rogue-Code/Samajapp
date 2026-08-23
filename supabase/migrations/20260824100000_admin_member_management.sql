-- Admin member management.
--
-- The profiles UPDATE policy deliberately rejects role changes for everyone,
-- so promotions cannot go through a plain UPDATE. They go through this
-- SECURITY DEFINER function instead, which re-checks the caller is an admin.

-- Admins need to see the whole member list to manage it.
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.current_role_is(ARRAY['admin']));

CREATE OR REPLACE FUNCTION public.set_member_role(target_id UUID, new_role TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.current_role_is(ARRAY['admin']) THEN
    RAISE EXCEPTION 'Only admins can change member roles';
  END IF;

  IF new_role NOT IN ('member', 'committee', 'admin') THEN
    RAISE EXCEPTION 'Unknown role: %', new_role;
  END IF;

  -- Guard against an admin locking themselves (and possibly everyone) out.
  IF target_id = auth.uid() THEN
    RAISE EXCEPTION 'You cannot change your own role';
  END IF;

  UPDATE public.profiles SET role = new_role WHERE id = target_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No such member';
  END IF;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.set_member_role(UUID, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_member_role(UUID, TEXT) TO authenticated;
