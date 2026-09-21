-- Machine-translated Gujarati copy of a post, filled in by the deployed
-- Worker's /api/translate-post route (Cloudflare Workers AI) right after the
-- post is created. Nullable and best-effort: a post whose translation call
-- failed, or one created before this feature existed, just falls back to
-- showing the English title/content in Gujarati mode — see news.lazy.tsx's
-- postText().
ALTER TABLE public.posts
  ADD COLUMN title_gu TEXT,
  ADD COLUMN content_gu TEXT;
