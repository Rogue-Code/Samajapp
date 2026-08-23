-- Community facilities directory (schools, hospitals, hostels, banks, ...).
-- Readable by any signed-in member; writes are admin-only for now and go
-- through the dashboard/service_role, so no client-side write policies exist.

CREATE TABLE public.facilities (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  address TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  head TEXT,
  established INTEGER,
  capacity TEXT,
  timings TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX facilities_category_idx ON public.facilities (category);
CREATE INDEX facilities_state_city_idx ON public.facilities (state, city);

GRANT SELECT ON public.facilities TO authenticated;
GRANT ALL ON public.facilities TO service_role;

ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Signed-in members can view facilities" ON public.facilities
  FOR SELECT TO authenticated USING (true);

CREATE TRIGGER facilities_set_updated_at
BEFORE UPDATE ON public.facilities
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
