-- Community news / announcements feed.
-- Any signed-in member can read. Committee members and admins can publish;
-- authors can edit and delete their own posts, admins can moderate any.
-- Pinning is admin-only and enforced in the UPDATE policy below.

CREATE TABLE public.posts (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General Update'
    CHECK (category IN (
      'Announcement', 'Event', 'Education', 'Scholarship',
      'Achievement', 'Obituary', 'Emergency Notice', 'General Update'
    )),
  pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX posts_feed_idx ON public.posts (pinned DESC, created_at DESC);
CREATE INDEX posts_category_idx ON public.posts (category);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Signed-in members can read posts" ON public.posts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Committee and admins can publish posts" ON public.posts
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = author_id
    AND public.current_role_is(ARRAY['committee', 'admin'])
    -- Only admins may publish something already pinned.
    AND (pinned = false OR public.current_role_is(ARRAY['admin']))
  );

CREATE POLICY "Authors edit own posts, admins edit any" ON public.posts
  FOR UPDATE TO authenticated
  USING (auth.uid() = author_id OR public.current_role_is(ARRAY['admin']))
  WITH CHECK (
    (auth.uid() = author_id OR public.current_role_is(ARRAY['admin']))
    -- Non-admins cannot pin: the flag must match what is already stored.
    AND (
      public.current_role_is(ARRAY['admin'])
      OR pinned = (SELECT p.pinned FROM public.posts p WHERE p.id = posts.id)
    )
  );

CREATE POLICY "Authors delete own posts, admins delete any" ON public.posts
  FOR DELETE TO authenticated
  USING (auth.uid() = author_id OR public.current_role_is(ARRAY['admin']));

CREATE TRIGGER posts_set_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
