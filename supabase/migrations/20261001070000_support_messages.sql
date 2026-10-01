-- In-app feedback mechanism, required by Google Play's Child Safety
-- Standards policy: a way to reach us "without leaving the app". The only
-- contact path before this was a mailto: link on the login screen (see
-- index.lazy.tsx), which hands off to an external email app -- Play review
-- rejected the production release over exactly this, since that is not an
-- in-app mechanism.
--
-- This is a one-way mailbox, reachable both signed in and signed out (the
-- login screen's Contact Support link has to work before sign-in). Nobody --
-- not even the sender -- can read a submission back through the API; only
-- the operator, via the Supabase dashboard or service role. That keeps this
-- table out of the SELECT-policy discipline the rest of the schema needs,
-- since there is nothing here for RLS to filter by row.

CREATE TABLE public.support_messages (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  contact_info TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.support_messages TO service_role;

ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
-- Deliberately no SELECT/UPDATE/DELETE policy for anon or authenticated --
-- see note above. Writes only happen through submit_support_message().

CREATE OR REPLACE FUNCTION public.submit_support_message(message_text TEXT, contact TEXT DEFAULT NULL)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF btrim(coalesce(message_text, '')) = '' THEN
    RAISE EXCEPTION 'Message cannot be empty';
  END IF;

  INSERT INTO public.support_messages (member_id, contact_info, message)
  VALUES (auth.uid(), NULLIF(btrim(coalesce(contact, '')), ''), btrim(message_text));
END;
$$;

REVOKE EXECUTE ON FUNCTION public.submit_support_message(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_support_message(TEXT, TEXT) TO anon, authenticated;
