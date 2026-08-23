-- Member roles. 'committee' can publish community news; 'admin' can also
-- moderate anyone's posts and manage the facilities directory.
--
-- Role lives on profiles, but is deliberately NOT writable by the member:
-- the profiles UPDATE policy is replaced with one that rejects any change
-- to the role column, so nobody can promote themselves. Role changes go
-- through service_role (dashboard / a future admin screen).

ALTER TABLE public.profiles
  ADD COLUMN role TEXT NOT NULL DEFAULT 'member'
  CHECK (role IN ('member', 'committee', 'admin'));

CREATE INDEX profiles_role_idx ON public.profiles (role) WHERE role <> 'member';

DROP POLICY "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
  );

-- SECURITY DEFINER so the lookup bypasses RLS on profiles; without it a
-- policy that calls this while filtering profiles would recurse.
CREATE OR REPLACE FUNCTION public.current_role_is(required TEXT[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = ANY(required)
  );
$$;

REVOKE EXECUTE ON FUNCTION public.current_role_is(TEXT[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.current_role_is(TEXT[]) TO authenticated;

-- Admins manage the facilities directory in-app.
CREATE POLICY "Admins can insert facilities" ON public.facilities
  FOR INSERT TO authenticated WITH CHECK (public.current_role_is(ARRAY['admin']));
CREATE POLICY "Admins can update facilities" ON public.facilities
  FOR UPDATE TO authenticated
  USING (public.current_role_is(ARRAY['admin']))
  WITH CHECK (public.current_role_is(ARRAY['admin']));
CREATE POLICY "Admins can delete facilities" ON public.facilities
  FOR DELETE TO authenticated USING (public.current_role_is(ARRAY['admin']));

GRANT INSERT, UPDATE, DELETE ON public.facilities TO authenticated;
