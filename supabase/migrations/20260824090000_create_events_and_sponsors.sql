-- Community events with member RSVPs, plus the sponsor slots shown on Home.

CREATE TABLE public.events (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  emoji TEXT NOT NULL DEFAULT '📅',
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX events_starts_at_idx ON public.events (starts_at);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Signed-in members can view events" ON public.events
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Committee and admins can create events" ON public.events
  FOR INSERT TO authenticated WITH CHECK (public.current_role_is(ARRAY['committee', 'admin']));
CREATE POLICY "Committee and admins can update events" ON public.events
  FOR UPDATE TO authenticated
  USING (public.current_role_is(ARRAY['committee', 'admin']))
  WITH CHECK (public.current_role_is(ARRAY['committee', 'admin']));
CREATE POLICY "Committee and admins can delete events" ON public.events
  FOR DELETE TO authenticated USING (public.current_role_is(ARRAY['committee', 'admin']));

CREATE TRIGGER events_set_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- One RSVP per member per event.
CREATE TABLE public.event_rsvps (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, event_id)
);

GRANT SELECT, INSERT, DELETE ON public.event_rsvps TO authenticated;
GRANT ALL ON public.event_rsvps TO service_role;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;

-- Attendee counts are public to members, so SELECT is not restricted to own rows.
CREATE POLICY "Signed-in members can view rsvps" ON public.event_rsvps
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can rsvp as themselves" ON public.event_rsvps
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can withdraw their own rsvp" ON public.event_rsvps
  FOR DELETE TO authenticated USING (auth.uid() = user_id);


-- Sponsor slots shown on the Home feed. Admin-managed.
CREATE TABLE public.sponsors (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  emoji TEXT NOT NULL DEFAULT '🏢',
  link_url TEXT,
  facility_id TEXT REFERENCES public.facilities(id) ON DELETE SET NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX sponsors_active_idx ON public.sponsors (active, sort_order);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sponsors TO authenticated;
GRANT ALL ON public.sponsors TO service_role;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Signed-in members can view active sponsors" ON public.sponsors
  FOR SELECT TO authenticated USING (active);
CREATE POLICY "Admins can insert sponsors" ON public.sponsors
  FOR INSERT TO authenticated WITH CHECK (public.current_role_is(ARRAY['admin']));
CREATE POLICY "Admins can update sponsors" ON public.sponsors
  FOR UPDATE TO authenticated
  USING (public.current_role_is(ARRAY['admin']))
  WITH CHECK (public.current_role_is(ARRAY['admin']));
CREATE POLICY "Admins can delete sponsors" ON public.sponsors
  FOR DELETE TO authenticated USING (public.current_role_is(ARRAY['admin']));

CREATE TRIGGER sponsors_set_updated_at
BEFORE UPDATE ON public.sponsors
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
