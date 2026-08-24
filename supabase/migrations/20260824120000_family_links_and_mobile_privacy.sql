-- Two changes to the member directory:
--
-- 1. Mobile numbers are now only exposed for members who are their family's
--    admin. Everyone else's number is withheld at the source, so it is not
--    reachable through the API at all — you contact a household through its
--    admin.
--
-- 2. A family member row can be linked to a real Sangath account, so their
--    entry in a family tree can open that member's profile. The link is set
--    by the household owner; unlinked people are simply not on the app.

ALTER TABLE public.family_members
  ADD COLUMN linked_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

CREATE INDEX family_members_linked_profile_idx
  ON public.family_members (linked_profile_id)
  WHERE linked_profile_id IS NOT NULL;

-- Each of these gains a column, and CREATE OR REPLACE cannot widen a
-- function's return type, so they are dropped and recreated.
DROP FUNCTION IF EXISTS public.search_members(TEXT);
DROP FUNCTION IF EXISTS public.get_member(UUID);
DROP FUNCTION IF EXISTS public.get_member_family(UUID);

-- Mobile is gated on is_family_admin in every projection below.
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
    CASE WHEN p.is_family_admin THEN p.mobile ELSE NULL END,
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
    CASE WHEN p.is_family_admin THEN p.mobile ELSE NULL END,
    p.is_family_admin,
    public.birth_year_of(p.dob),
    p.role
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
    AND p.id = target_id
    AND coalesce(btrim(p.full_name), '') <> '';
$$;

-- Family tree entries, now carrying the linked account (if any) so the UI can
-- offer a tap-through. Only the linked id and whether that account is
-- reachable are exposed — no columns from the linked profile itself.
CREATE OR REPLACE FUNCTION public.get_member_family(target_id UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  relation TEXT,
  birth_year INTEGER,
  status TEXT,
  linked_profile_id UUID
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    f.id, f.full_name, f.relation,
    EXTRACT(YEAR FROM f.dob)::int,
    f.status,
    f.linked_profile_id
  FROM public.family_members f
  WHERE auth.uid() IS NOT NULL
    AND f.owner_id = target_id
  ORDER BY f.created_at;
$$;

REVOKE EXECUTE ON FUNCTION public.search_members(TEXT) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_member(UUID) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_member_family(UUID) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.search_members(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_member(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_member_family(UUID) TO authenticated;
