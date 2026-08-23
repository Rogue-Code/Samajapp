-- Point posts.author_id at profiles rather than auth.users so PostgREST can
-- join author details in one request. profiles.id already references
-- auth.users(id) ON DELETE CASCADE, so the delete behaviour is unchanged.

ALTER TABLE public.posts DROP CONSTRAINT posts_author_id_fkey;
ALTER TABLE public.posts
  ADD CONSTRAINT posts_author_id_fkey
  FOREIGN KEY (author_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Posts a member has bookmarked.
CREATE TABLE public.saved_posts (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

GRANT SELECT, INSERT, DELETE ON public.saved_posts TO authenticated;
GRANT ALL ON public.saved_posts TO service_role;

ALTER TABLE public.saved_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved posts" ON public.saved_posts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can save posts for themselves" ON public.saved_posts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their own saved posts" ON public.saved_posts
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
