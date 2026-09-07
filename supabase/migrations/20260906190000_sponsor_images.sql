-- Sponsor artwork. Until now a sponsor's banner was a single emoji on a gradient;
-- sponsors supply square (1:1) photos, so give them somewhere to live and a column
-- to point at. The emoji stays as the fallback for sponsors without a photo.

alter table public.sponsors
  add column if not exists image_url text;

-- Public bucket, same reasoning as avatars: a stored image_url can be rendered
-- directly without minting signed URLs on every render. "public" is read-only —
-- writes are admin-gated by the policies below.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'sponsors',
  'sponsors',
  true,
  5242880, -- 5 MB; the picker downscales to 1024px square before upload
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Unlike avatars there is no per-owner path segment to check: sponsor artwork is
-- not owned by a member. Writes are restricted to admins, which is the same bar
-- as editing the sponsors table itself.
drop policy if exists "Sponsor images are publicly readable" on storage.objects;
create policy "Sponsor images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'sponsors');

drop policy if exists "Admins can upload sponsor images" on storage.objects;
create policy "Admins can upload sponsor images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'sponsors'
    and public.current_role_is(array['admin'])
  );

drop policy if exists "Admins can replace sponsor images" on storage.objects;
create policy "Admins can replace sponsor images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'sponsors'
    and public.current_role_is(array['admin'])
  );

drop policy if exists "Admins can delete sponsor images" on storage.objects;
create policy "Admins can delete sponsor images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'sponsors'
    and public.current_role_is(array['admin'])
  );
