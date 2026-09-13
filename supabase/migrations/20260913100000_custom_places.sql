-- Member-contributed places for the village/city picker.
--
-- The picker's bundled dataset (Gujarat's official village list plus a
-- curated national list of cities/towns) can never be complete. Until now a
-- village missing from it could only be typed as free text into that one
-- member's own profile — nobody else searching for the same village would
-- ever find it. This table lets that typed value persist so the next member
-- who types the same thing finds it in the list instead of re-typing it.

CREATE TABLE public.custom_places (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  added_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Case/whitespace-insensitive: "Kaner" and " kaner " should merge into one row.
CREATE UNIQUE INDEX custom_places_name_unique ON public.custom_places (lower(btrim(name)));

GRANT SELECT ON public.custom_places TO authenticated;
GRANT ALL ON public.custom_places TO service_role;

ALTER TABLE public.custom_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Signed-in members can view custom places" ON public.custom_places
  FOR SELECT TO authenticated USING (true);

-- INSERT is intentionally not granted directly to authenticated: everyone
-- adds through this function so two members typing the same missing village
-- (different case or spacing) merge into one row instead of erroring or
-- duplicating.
CREATE OR REPLACE FUNCTION public.add_custom_place(place_name TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'You must be signed in';
  END IF;

  IF btrim(place_name) = '' THEN
    RETURN;
  END IF;

  INSERT INTO public.custom_places (name, added_by)
  VALUES (btrim(place_name), auth.uid())
  ON CONFLICT (lower(btrim(name))) DO NOTHING;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.add_custom_place(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.add_custom_place(TEXT) TO authenticated;
