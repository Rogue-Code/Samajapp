-- Member directory search.
--
-- RLS is row-level, so granting members SELECT on public.profiles would expose
-- every column through the API regardless of what the UI renders. These
-- SECURITY DEFINER functions are the only path members have to each other's
-- data, and they project exactly the agreed fields:
--   name, village, city, occupation, marital status, mobile, birth year
-- Never the exact date of birth, and never anything from auth.users.

-- profiles.dob is free text ("15 / 06 / 1998") inherited from the prototype,
-- so the year is recovered heuristically and only accepted if plausible.
CREATE OR REPLACE FUNCTION public.birth_year_of(dob_text TEXT)
RETURNS INTEGER
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN y BETWEEN 1900 AND EXTRACT(YEAR FROM now())::int THEN y
    ELSE NULL
  END
  FROM (SELECT NULLIF(substring(dob_text from '(\d{4})'), '')::int AS y) t;
$$;

CREATE OR REPLACE FUNCTION public.search_members(term TEXT)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  village TEXT,
  city TEXT,
  occupation TEXT,
  marital_status TEXT,
  mobile TEXT,
  birth_year INTEGER,
  role TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id, p.full_name, p.village, p.city, p.occupation,
    p.marital_status, p.mobile, public.birth_year_of(p.dob), p.role
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
    -- Prefix matches on the name first; they are what people usually want.
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
  birth_year INTEGER,
  role TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id, p.full_name, p.village, p.city, p.state, p.occupation,
    p.marital_status, p.mobile, public.birth_year_of(p.dob), p.role
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
    AND p.id = target_id
    AND coalesce(btrim(p.full_name), '') <> '';
$$;

-- A member's household, as shown on their directory page. Names and relations
-- only, plus a birth year; the stored date itself is not exposed.
CREATE OR REPLACE FUNCTION public.get_member_family(target_id UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  relation TEXT,
  birth_year INTEGER,
  status TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    f.id, f.full_name, f.relation,
    EXTRACT(YEAR FROM f.dob)::int,
    f.status
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
