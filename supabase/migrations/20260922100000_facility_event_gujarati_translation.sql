-- Machine-translated Gujarati copy of facility and event content, filled in
-- by the deployed Worker's /api/translate-facility and /api/translate-event
-- routes (Cloudflare Workers AI) right after an admin saves the record.
-- Nullable and best-effort, same as posts.title_gu/content_gu: a record
-- whose translation call failed, or one saved before this feature existed,
-- just falls back to showing the English text in Gujarati mode — see
-- facilities-data.ts's facilityText() and home.lazy.tsx's event rendering.
--
-- address/phone/email/website/timings/capacity/established are facts, not
-- prose — they are not translated, on the same reasoning a facility's phone
-- number or a member's mobile number never gets translated either.
ALTER TABLE public.facilities
  ADD COLUMN name_gu TEXT,
  ADD COLUMN description_gu TEXT,
  ADD COLUMN long_description_gu TEXT;

-- events.description exists but nothing in the app renders it yet, so only
-- the title (the one field members actually see) gets a translation column.
ALTER TABLE public.events
  ADD COLUMN title_gu TEXT;
