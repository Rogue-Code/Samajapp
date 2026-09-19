-- Maps a verified E.164 phone number to the Supabase auth user it belongs to.
--
-- Phone ownership itself is proven by Firebase Phone Auth (SMS is sent and
-- verified there, not by Supabase) — this table is the only place that link
-- is recorded, so a server-side bridge can find-or-create the matching
-- Supabase user without ever touching auth.users directly (that schema isn't
-- exposed via PostgREST, even to service_role).
--
-- This is deliberately separate from profiles.mobile, which stays free-text,
-- unverified, editable contact info shown in the member directory.
CREATE TABLE public.phone_auth_identities (
  phone TEXT NOT NULL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS enabled with no policies at all: only the service-role bridge (which
-- bypasses RLS) ever reads or writes this table.
ALTER TABLE public.phone_auth_identities ENABLE ROW LEVEL SECURITY;

-- Lets the signup/login screens check registration status before handing a
-- phone number to Firebase, so an SMS is never sent for a signup that will
-- just be rejected as a dupe, or a login for a number with no account.
-- Same shape as public.email_registered.
CREATE OR REPLACE FUNCTION public.phone_registered(check_phone TEXT)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.phone_auth_identities WHERE phone = check_phone
  );
$$;

REVOKE EXECUTE ON FUNCTION public.phone_registered(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.phone_registered(TEXT) TO anon, authenticated;
