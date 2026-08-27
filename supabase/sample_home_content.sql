-- Placeholder Events and Sponsors so the Home screen's sections render while the
-- real content is still being gathered.
--
-- Every row is prefixed "[Sample]" on purpose: it is unmistakable in the admin
-- console, and the whole set can be removed in one statement (see the bottom of
-- this file) once real entries exist. These are NOT real events or businesses —
-- do not ship a build carrying them to members.

insert into public.events (title, description, starts_at, location, emoji)
values
  (
    '[Sample] Community Ganesh Utsav',
    'Placeholder entry. Replace with a real event from the admin console.',
    now() + interval '9 days',
    'Community Hall',
    '🪔'
  ),
  (
    '[Sample] Youth Career Guidance Meet',
    'Placeholder entry. Replace with a real event from the admin console.',
    now() + interval '23 days',
    'Samaj Bhavan',
    '🎓'
  ),
  (
    '[Sample] Annual General Meeting',
    'Placeholder entry. Replace with a real event from the admin console.',
    now() + interval '41 days',
    'Main Auditorium',
    '📋'
  );

insert into public.sponsors (name, description, emoji, active, sort_order)
values
  ('[Sample] Sponsor One', 'Placeholder sponsor slot.', '🏬', true, 1),
  ('[Sample] Sponsor Two', 'Placeholder sponsor slot.', '🏭', true, 2);

-- Cleanup, when the real content is in:
--   delete from public.events   where title like '[Sample]%';
--   delete from public.sponsors where name  like '[Sample]%';
