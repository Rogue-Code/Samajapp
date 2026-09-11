-- Lets the signup screen tell a member their email already has an account
-- before it emails an OTP to it.
--
-- signInWithOtp({ shouldCreateUser: true }) never reports an existing email —
-- Supabase does that deliberately, to stop signup forms being used to probe
-- which addresses have accounts. That's the right default for a login form,
-- but on the SIGNUP form it just leaves someone re-registering with their own
-- email confused: the OTP goes out silently to the account they already have,
-- with no explanation. A member cannot be enumerated by an address they typed
-- themselves, so this only needs to run before account creation, not on login.
--
-- SECURITY DEFINER because auth.users is not readable by anon/authenticated;
-- the function exposes existence only (true/false), never any user data.
CREATE OR REPLACE FUNCTION public.email_registered(check_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users WHERE lower(email) = lower(check_email)
  );
$$;

REVOKE EXECUTE ON FUNCTION public.email_registered(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.email_registered(TEXT) TO anon, authenticated;
