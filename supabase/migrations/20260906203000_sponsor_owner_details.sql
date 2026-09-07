-- Sponsors get their own detail page, reached by tapping the banner.
--
-- owner_name / phone are the business details that page shows; the table had no
-- notion of who runs the business.
--
-- image_original_url exists because image_url holds the *square crop* the admin
-- framed for the 1:1 banner. That crop necessarily loses part of a portrait
-- poster — on the first real sponsor it cut the address block — so the detail
-- page, where there is room to show the artwork whole, needs the uncropped file
-- kept alongside it. Sponsors uploaded before this stays crop-only and the page
-- falls back to image_url.
--
-- No new policies: sponsors already restricts SELECT to signed-in members with
-- active = true, and writes to admins. The storage bucket is likewise unchanged.

alter table public.sponsors
  add column if not exists owner_name text,
  add column if not exists phone text,
  add column if not exists image_original_url text;
