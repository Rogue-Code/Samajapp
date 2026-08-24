-- 1. Mobile visibility now follows gender, replacing the earlier
--    family-admin-only rule: male members' numbers are visible to other
--    members, female (and unset) members' numbers are not. A member always
--    sees their own number regardless of gender. Legacy profiles have no
--    gender on file, so they are hidden (NULL) until the member sets it —
--    the safer default, per the household decision.
--
-- 2. A member's family admin is now discoverable from their own profile
--    (the back-reference), so someone whose number is hidden can be reached
--    through whoever manages their household — if that link exists.

ALTER TABLE public.profiles
  ADD COLUMN gender TEXT CHECK (gender IN ('male', 'female', 'other'));

CREATE OR REPLACE FUNCTION public.search_members(term TEXT)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  village TEXT,
  city TEXT,
  occupation TEXT,
  marital_status TEXT,
  mobile TEXT,
  is_family_admin BOOLEAN,
  birth_year INTEGER,
  role TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id, p.full_name, p.village, p.city, p.occupation, p.marital_status,
    CASE WHEN p.id = auth.uid() OR p.gender = 'male' THEN p.mobile ELSE NULL END,
    p.is_family_admin,
    public.birth_year_of(p.dob),
    p.role
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
    AND coalesce(btrim(p.full_name), '') <> ''
    AND length(btrim(term)) >= 2
    AND (
      p.full_name ILIKE '%' || btrim(term) || '%'
      OR p.village ILIKE '%' || btrim(term) || '%'
      OR p.city    ILIKE '%' || btrim(term) || '%'
      OR p.occupation ILIKE '%' || btrim(term) || '%'
    )
  ORDER BY
    (p.full_name ILIKE btrim(term) || '%') DESC,
    p.full_name
  LIMIT 30;
$$;

CREATE OR REPLACE FUNCTION public.get_member(target_id UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  village TEXT,
  city TEXT,
  state TEXT,
  occupation TEXT,
  marital_status TEXT,
  mobile TEXT,
  is_family_admin BOOLEAN,
  birth_year INTEGER,
  role TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id, p.full_name, p.village, p.city, p.state, p.occupation, p.marital_status,
    CASE WHEN p.id = auth.uid() OR p.gender = 'male' THEN p.mobile ELSE NULL END,
    p.is_family_admin,
    public.birth_year_of(p.dob),
    p.role
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
    AND p.id = target_id
    AND coalesce(btrim(p.full_name), '') <> '';
$$;

-- The family admin who added `target_id` as a family member, if any such
-- link exists. Same shape and same mobile rule as get_member, so the UI can
-- render it identically. Picks the earliest link if more than one exists.
CREATE OR REPLACE FUNCTION public.get_family_admin_of(target_id UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  village TEXT,
  city TEXT,
  state TEXT,
  occupation TEXT,
  marital_status TEXT,
  mobile TEXT,
  is_family_admin BOOLEAN,
  birth_year INTEGER,
  role TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id, p.full_name, p.village, p.city, p.state, p.occupation, p.marital_status,
    CASE WHEN p.id = auth.uid() OR p.gender = 'male' THEN p.mobile ELSE NULL END,
    p.is_family_admin,
    public.birth_year_of(p.dob),
    p.role
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
    AND p.id = (
      SELECT f.owner_id FROM public.family_members f
      WHERE f.linked_profile_id = target_id
      ORDER BY f.created_at
      LIMIT 1
    );
$$;

REVOKE EXECUTE ON FUNCTION public.get_family_admin_of(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_family_admin_of(UUID) TO authenticated;
