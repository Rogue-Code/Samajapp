-- Facilities a member has bookmarked. One row per (member, facility).

CREATE TABLE public.saved_facilities (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  facility_id TEXT NOT NULL REFERENCES public.facilities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, facility_id)
);

GRANT SELECT, INSERT, DELETE ON public.saved_facilities TO authenticated;
GRANT ALL ON public.saved_facilities TO service_role;

ALTER TABLE public.saved_facilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved facilities" ON public.saved_facilities
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can save facilities for themselves" ON public.saved_facilities
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their own saved facilities" ON public.saved_facilities
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
