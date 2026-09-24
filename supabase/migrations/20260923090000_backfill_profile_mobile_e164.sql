-- Two gaps left by 20260921090000_prefill_mobile_from_phone_signup.sql:
--
-- 1. It only ran at row-creation time, so phone-signup accounts created
--    before it (2026-09-20 and earlier) still have profiles.mobile = NULL —
--    and Account settings shows mobile read-only, so those members have no
--    way to fill it in themselves.
-- 2. auth.users.phone is stored by GoTrue *without* the leading "+"
--    ("916353623199"), and the trigger copied it verbatim. That breaks the
--    tel: link on the member page. The E.164 form with "+" is what
--    phone_auth_identities holds and what signup displays.
--
-- Fix the trigger to write E.164, then backfill. The backfill only touches
-- rows whose mobile is NULL or still exactly the un-prefixed value the old
-- trigger wrote — a number a member or admin typed by hand is left alone.
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
    CASE
      WHEN COALESCE(NEW.phone, '') = '' THEN NULL
      WHEN NEW.phone LIKE '+%' THEN NEW.phone
      ELSE '+' || NEW.phone
    END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

UPDATE public.profiles p
SET mobile = '+' || u.phone
FROM auth.users u
WHERE u.id = p.id
  AND COALESCE(u.phone, '') <> ''
  AND u.phone NOT LIKE '+%'
  AND (p.mobile IS NULL OR p.mobile = u.phone);
