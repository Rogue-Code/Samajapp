-- Surface profile photos wherever a member is listed.
--
-- avatar_url existed on profiles but none of the member-facing RPCs returned it,
-- so an uploaded photo only ever appeared on the screen that set it. Every other
-- list fell back to an initial-letter circle.
--
-- Return types change, so these need a DROP rather than CREATE OR REPLACE. The
-- mobile-visibility rule and the auth.uid() guards are carried over unchanged.

drop function if exists public.search_members(text);

create function public.search_members(term text)
returns table (
  id uuid,
  full_name text,
  avatar_url text,
  village text,
  city text,
  occupation text,
  marital_status text,
  mobile text,
  is_family_admin boolean,
  birth_year integer,
  role text
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  SELECT
    p.id, p.full_name, p.avatar_url, p.village, p.city, p.occupation, p.marital_status,
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
$function$;

drop function if exists public.get_member(uuid);

create function public.get_member(target_id uuid)
returns table (
  id uuid,
  full_name text,
  avatar_url text,
  village text,
  city text,
  state text,
  occupation text,
  marital_status text,
  mobile text,
  is_family_admin boolean,
  birth_year integer,
  role text
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  SELECT
    p.id, p.full_name, p.avatar_url, p.village, p.city, p.state, p.occupation, p.marital_status,
    CASE WHEN p.id = auth.uid() OR p.gender = 'male' THEN p.mobile ELSE NULL END,
    p.is_family_admin,
    public.birth_year_of(p.dob),
    p.role
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
    AND p.id = target_id
    AND coalesce(btrim(p.full_name), '') <> '';
$function$;

drop function if exists public.get_family_admin_of(uuid);

create function public.get_family_admin_of(target_id uuid)
returns table (
  id uuid,
  full_name text,
  avatar_url text,
  village text,
  city text,
  state text,
  occupation text,
  marital_status text,
  mobile text,
  is_family_admin boolean,
  birth_year integer,
  role text
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  SELECT
    p.id, p.full_name, p.avatar_url, p.village, p.city, p.state, p.occupation, p.marital_status,
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
$function$;

-- get_member_family lists family_members rows, which are not all profiles. Only
-- the linked ones have a photo, so the avatar comes from the linked profile.
drop function if exists public.get_member_family(uuid);

create function public.get_member_family(target_id uuid)
returns table (
  id uuid,
  full_name text,
  relation text,
  birth_year integer,
  status text,
  linked_profile_id uuid,
  avatar_url text
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  SELECT
    f.id, f.full_name, f.relation,
    -- family_members.dob is a real date, unlike profiles.dob which is text and
    -- needs birth_year_of(). Keep EXTRACT here, as the original did.
    EXTRACT(YEAR FROM f.dob)::int,
    f.status,
    f.linked_profile_id,
    lp.avatar_url
  FROM public.family_members f
  LEFT JOIN public.profiles lp ON lp.id = f.linked_profile_id
  WHERE auth.uid() IS NOT NULL
    AND f.owner_id = target_id
  ORDER BY f.created_at;
$function$;

grant execute on function public.search_members(text) to authenticated;
grant execute on function public.get_member(uuid) to authenticated;
grant execute on function public.get_family_admin_of(uuid) to authenticated;
grant execute on function public.get_member_family(uuid) to authenticated;
