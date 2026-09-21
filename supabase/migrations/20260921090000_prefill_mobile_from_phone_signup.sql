-- Phone-signup users already have a verified number on auth.users (set by
-- bridgeFirebasePhoneLogin's admin.createUser call) — prefill profiles.mobile
-- with it so members don't have to retype the number they just verified.
--
-- profiles.mobile stays the same free-text, user-editable field it always
-- was (see phone_auth_identities.sql's note on why that table is kept
-- separate from it) — this only changes its value at row-creation time from
-- NULL to a sensible default; nothing prevents the member from clearing or
-- changing it afterward in Account settings. Email-signup users are
-- unaffected: NEW.phone is NULL for them, so mobile stays NULL as before.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, mobile)
  VALUES (
    NEW.id,
    NULLIF(NEW.raw_user_meta_data ->> 'full_name', ''),
    NULLIF(NEW.phone, '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
