-- Profile photos: a column to point at the uploaded file, plus somewhere to put it.
-- Until now the profile screen showed a placeholder icon with no way to change it.

alter table public.profiles
  add column if not exists avatar_url text;

-- Public bucket so a saved avatar_url can be rendered directly by the app without
-- minting signed URLs on every render. Writes stay owner-scoped via the policies
-- below; "public" here only means readable.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  5242880, -- 5 MB; the picker downscales to 512px before upload, so this is headroom
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Objects are stored as avatars/<user_id>/<file>, so the first path segment is the
-- owner. Every write policy checks it against auth.uid(), which stops one member
-- overwriting another's photo.
drop policy if exists "Avatar images are publicly readable" on storage.objects;
create policy "Avatar images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "Members can upload their own avatar" on storage.objects;
create policy "Members can upload their own avatar"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Members can replace their own avatar" on storage.objects;
create policy "Members can replace their own avatar"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Members can delete their own avatar" on storage.objects;
create policy "Members can delete their own avatar"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
