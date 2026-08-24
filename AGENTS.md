# Working on Sangath — read this before making changes

This file is for any AI coding assistant (Claude, ChatGPT/Codex, Cursor,
Lovable, etc.) working on this codebase. It exists because several rules
here are not obvious from reading the code, and violating them either
silently reopens a privacy/security hole or breaks something that looks
fine until it's tested on a real device. If you're an AI assistant, read
this in full before editing anything.

## What this app is

Sangath — a community/family directory app for an Indian community
("samaj"). Stack: TanStack Start (React 19) + Tailwind + Supabase
(Postgres, auth, RLS) + Capacitor (Android). Runs as a normal web app in
dev (`npm run dev`, **port 8080**, not 3000) and is packaged into an
Android APK via `npm run build:android && npx cap sync android`.

The backend is the owner's own Supabase project (not Lovable Cloud, not
shared with anyone else). Every schema change is a SQL migration file in
`supabase/migrations/`, applied with the Supabase CLI.

## Hard rules — do not violate these

**1. RLS is row-level, not column-level. Never grant members direct
`SELECT` on `profiles` or other members' rows.**
Postgres RLS controls which *rows* a query can see, not which *columns*.
If you grant a member a policy to read other members' `profiles` rows,
they get every column in that row through the API — including mobile
number and date of birth — no matter what the UI shows. Cross-member
reads go through `SECURITY DEFINER` functions
(`search_members`, `get_member`, `get_member_family`,
`get_family_admin_of` in `supabase/migrations/`) that project only the
approved fields. If a new feature needs to show one member's data to
another, extend one of these functions or add a new one in the same
style — never add a broad RLS `SELECT` policy on `profiles`.

**2. Mobile number visibility follows `profiles.gender`, decided at the
database, not in the UI.**
A member's number is exposed to other members only if `gender = 'male'`
(a deliberate product decision by the app owner — female and unset
genders are hidden by default). A member always sees their own number
regardless of gender (`p.id = auth.uid() OR p.gender = 'male'` in the
projection functions above). Do not add a UI-only mask for this — it
must stay enforced in the SQL functions, or it can be bypassed by
calling the API directly.

**3. Role changes go through `set_member_role(target_id, new_role)`, never
a direct `UPDATE profiles SET role = ...`.**
The `profiles` UPDATE policy explicitly rejects any change to the `role`
column (checked via a `WITH CHECK` that compares old and new role), so a
plain update will fail (or worse, look like it works but silently no-op
— verify the return value). The RPC is `SECURITY DEFINER`, re-checks the
caller is an admin, and refuses to let an admin change their own role
(anti-lockout). Keep using it for any future role/permission UI.

**4. Never invent placeholder data that looks real — payment details,
phone numbers, addresses, names.**
This codebase originally shipped from Lovable with fake-but-plausible
UPI IDs, bank account numbers, and a fake QR code on the Fundraiser page
that could have misdirected a real payment once installed on a phone.
All of that was deliberately removed. **The community has no 80G tax
certificate — do not add "80G Eligible" or similar tax-exemption
claims.** If a feature needs payment collection, that requires the owner
to explicitly choose a payment gateway (Razorpay/Cashfree) — do not wire
up UPI deep links or bank details as a stand-in. If you need test
fixtures during development, make them obviously fake ("TEST Hospital",
"+91 00000 00000") and delete them before finishing — see
`supabase/seed.sql` for the policy on this (it's intentionally empty).

**5. Do not reintroduce the OTP/email-verification page.**
Email confirmation is disabled in Supabase auth config
(`enable_confirmations = false` in `supabase/config.toml`) at the
owner's request — signup logs a user straight in. There is no `/otp`
route. Don't add one back, and don't flip `enable_confirmations` on
without checking with the owner first (it would break signup UX).

## Two non-obvious bugs already fixed — don't reintroduce them

**Route nesting:** `facilities_.$id.tsx` (note the trailing underscore)
is deliberate. TanStack Router nests `facilities.$id.tsx` under
`facilities.tsx` by default, but `facilities.tsx` renders no `<Outlet />`,
so the detail page would silently render the list page instead. The
trailing `_` opts a route out of that nesting. If you add a new
`<parent>.<child>` route pair and the parent has no `<Outlet />`, name the
child `<parent>_.<child>.tsx`.

**Bottom sheets must use `fixed md:absolute inset-0`, not `absolute
inset-0`.** The `PhoneFrame` component only has a fixed height at
desktop widths (`md:h-[860px]`); at mobile widths it grows with content.
An `absolute inset-0` sheet inside it anchors to the *document* bottom,
not the viewport, so the Save/submit button can render below the fold
and be unreachable. See any `AdminSheet`/`AddMemberSheet`/
`CreatePostSheet` for the pattern.

## Workflow for schema changes

1. Write a migration in `supabase/migrations/<timestamp>_description.sql`.
2. Push it: `npx supabase db push --db-url "<pooler-url>"` — the plain
   (non-`--db-url`) form fails on this network with an IPv6 error; use
   the connection pooler (`aws-0-<region>.pooler.supabase.com:5432`),
   not the direct `db.<ref>.supabase.co` host.
3. Regenerate types:
   `npx supabase gen types typescript --project-id <ref> > src/integrations/supabase/types.ts`
4. `npx tsc --noEmit` — must be clean before you consider the change done.
5. If you change an existing function's *return type* (not just its
   body), `CREATE OR REPLACE` fails — you need `DROP FUNCTION ... ;` first.
6. Verify behavior against the database directly when the change is
   security-relevant (RLS, a `SECURITY DEFINER` function) — don't just
   trust that the UI looks right. A quick way: run a query as a
   simulated session (`set_config('request.jwt.claims', ...)`) and check
   what rows/columns actually come back, not just what the app displays.

## Before you finish a change

- `npx tsc --noEmit` clean.
- If you touched anything a member would notice, actually load the page
  (dev server, port 8080) and check it, not just read the diff.
- Don't leave test/seed data in the live database — this app has real
  users, not just a dev sandbox.
