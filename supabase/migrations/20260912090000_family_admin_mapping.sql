-- Real family <-> family-admin mapping.
--
-- Until now `profiles.is_family_admin` was a self-declared flag with nothing
-- behind it, and `family_members` was a free-text household list one person
-- typed in and could optionally point at a real account via
-- `linked_profile_id` — set unilaterally by the owner, with no confirmation
-- from the person being linked and no way for a member to initiate the
-- connection themselves.
--
-- This adds an actual family unit (`families`, one per admin, identified by a
-- short shareable code) and a request/approval flow (`family_join_requests`)
-- so a member can enter their admin's code and be added once the admin
-- approves — regardless of which of them signed up first:
--
--   * Admin signs up first: they generate a code (via ensure_family_admin),
--     share it, and approve requests as they arrive.
--   * Member signs up first, with no admin yet: they skip the code at
--     onboarding and enter it later from Account once the admin exists and
--     shares it with them.
--
-- Approval is required (not an instant link) so a family cannot be joined by
-- anyone who happens to see or guess a code.

CREATE TABLE public.families (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.families TO authenticated;
GRANT ALL ON public.families TO service_role;

-- The family a profile currently belongs to — its own family if they are the
-- admin, or the family they were approved into. NULL means unaffiliated. Must
-- exist before the families RLS policy below, which reads it.
ALTER TABLE public.profiles
  ADD COLUMN family_id UUID REFERENCES public.families(id) ON DELETE SET NULL;

ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;

-- A code lookup for someone who does not yet belong to this family has to go
-- through preview_family_by_code / request_join_family (SECURITY DEFINER)
-- below, not this policy — otherwise every code would be readable/guessable
-- via a plain client select.
CREATE POLICY "Members can view their own family" ON public.families
  FOR SELECT TO authenticated
  USING (
    auth.uid() = admin_id
    OR id = (SELECT family_id FROM public.profiles WHERE id = auth.uid())
  );

CREATE TABLE public.family_join_requests (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  relation TEXT NOT NULL DEFAULT 'Other',
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- One outstanding request at a time per person; requesting a different family
-- while pending updates this row instead of stacking another (see
-- request_join_family).
CREATE UNIQUE INDEX family_join_requests_one_pending_per_user
  ON public.family_join_requests (requester_id)
  WHERE status = 'pending';

CREATE INDEX family_join_requests_family_id_idx ON public.family_join_requests (family_id);

GRANT SELECT, DELETE ON public.family_join_requests TO authenticated;
GRANT ALL ON public.family_join_requests TO service_role;

ALTER TABLE public.family_join_requests ENABLE ROW LEVEL SECURITY;

-- INSERT/UPDATE are intentionally not granted to authenticated: every write
-- other than a self-cancel goes through a SECURITY DEFINER function below, so
-- the business rules (one pending request, admin-only approval, no joining
-- your own family) cannot be bypassed by a direct client write.
CREATE POLICY "Requester or family admin can view a request" ON public.family_join_requests
  FOR SELECT TO authenticated
  USING (
    auth.uid() = requester_id
    OR family_id IN (SELECT id FROM public.families WHERE admin_id = auth.uid())
  );

CREATE POLICY "Requester can cancel their own pending request" ON public.family_join_requests
  FOR DELETE TO authenticated
  USING (auth.uid() = requester_id AND status = 'pending');

CREATE TRIGGER family_join_requests_set_updated_at
BEFORE UPDATE ON public.family_join_requests
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Short, human-typeable code. Ambiguous characters (0/O, 1/I) are excluded.
CREATE OR REPLACE FUNCTION public.generate_family_code()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  alphabet TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '';
  i INT;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || substr(alphabet, (floor(random() * length(alphabet)) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$;

-- Idempotent: a member who is already a family admin just gets their
-- existing code back, so the "Yes" path in Profile Setup / Account can call
-- this unconditionally.
CREATE OR REPLACE FUNCTION public.ensure_family_admin()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller  UUID := auth.uid();
  fam_id  UUID;
  fam_code TEXT;
  attempt INT := 0;
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'You must be signed in';
  END IF;

  SELECT id, code INTO fam_id, fam_code FROM public.families WHERE admin_id = caller;
  IF fam_id IS NOT NULL THEN
    RETURN fam_code;
  END IF;

  LOOP
    attempt := attempt + 1;
    fam_code := public.generate_family_code();
    BEGIN
      INSERT INTO public.families (admin_id, code) VALUES (caller, fam_code)
      RETURNING id INTO fam_id;
      EXIT;
    EXCEPTION WHEN unique_violation THEN
      IF attempt > 20 THEN
        RAISE EXCEPTION 'Could not generate a unique family code — try again';
      END IF;
    END;
  END LOOP;

  UPDATE public.profiles SET is_family_admin = true, family_id = fam_id WHERE id = caller;

  RETURN fam_code;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.ensure_family_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.ensure_family_admin() TO authenticated;

-- Lets the join screen confirm "this code belongs to <name>" before the
-- member commits to requesting, without exposing the families table itself.
CREATE OR REPLACE FUNCTION public.preview_family_by_code(input_code TEXT)
RETURNS TABLE (
  family_id UUID,
  admin_id UUID,
  admin_name TEXT,
  admin_avatar_url TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT f.id, f.admin_id, p.full_name, p.avatar_url
  FROM public.families f
  JOIN public.profiles p ON p.id = f.admin_id
  WHERE auth.uid() IS NOT NULL
    AND f.code = upper(btrim(input_code));
$$;

REVOKE EXECUTE ON FUNCTION public.preview_family_by_code(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.preview_family_by_code(TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION public.request_join_family(input_code TEXT, member_relation TEXT DEFAULT 'Other')
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller          UUID := auth.uid();
  fam             RECORD;
  caller_family   UUID;
  existing_request UUID;
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'You must be signed in';
  END IF;

  SELECT id, admin_id INTO fam FROM public.families WHERE code = upper(btrim(input_code));
  IF fam.id IS NULL THEN
    RAISE EXCEPTION 'Invalid family code';
  END IF;

  IF fam.admin_id = caller THEN
    RAISE EXCEPTION 'You cannot join your own family';
  END IF;

  IF EXISTS (SELECT 1 FROM public.families WHERE admin_id = caller) THEN
    RAISE EXCEPTION 'You are a family admin and cannot join another family';
  END IF;

  SELECT family_id INTO caller_family FROM public.profiles WHERE id = caller;
  IF caller_family = fam.id THEN
    RAISE EXCEPTION 'You are already part of this family';
  END IF;

  SELECT id INTO existing_request
    FROM public.family_join_requests
   WHERE requester_id = caller AND status = 'pending';

  IF existing_request IS NOT NULL THEN
    UPDATE public.family_join_requests
       SET family_id = fam.id, relation = member_relation, updated_at = now()
     WHERE id = existing_request;
  ELSE
    INSERT INTO public.family_join_requests (family_id, requester_id, relation)
    VALUES (fam.id, caller, member_relation);
  END IF;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.request_join_family(TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.request_join_family(TEXT, TEXT) TO authenticated;

-- One consolidated status read for the Account screen: whether the caller is
-- an admin (and their code), who their family's admin is (if they belong to
-- one), and any outstanding join request of their own.
CREATE OR REPLACE FUNCTION public.get_my_family_status()
RETURNS TABLE (
  is_admin BOOLEAN,
  family_code TEXT,
  family_id UUID,
  admin_id UUID,
  admin_name TEXT,
  admin_avatar_url TEXT,
  pending_request_id UUID,
  pending_admin_name TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    (own_fam.id IS NOT NULL) AS is_admin,
    own_fam.code AS family_code,
    p.family_id,
    fam_admin.id AS admin_id,
    fam_admin.full_name AS admin_name,
    fam_admin.avatar_url AS admin_avatar_url,
    pending.id AS pending_request_id,
    pending_admin.full_name AS pending_admin_name
  FROM public.profiles p
  LEFT JOIN public.families own_fam ON own_fam.admin_id = p.id
  LEFT JOIN public.families joined_fam ON joined_fam.id = p.family_id
  LEFT JOIN public.profiles fam_admin ON fam_admin.id = joined_fam.admin_id
  LEFT JOIN public.family_join_requests pending
    ON pending.requester_id = p.id AND pending.status = 'pending'
  LEFT JOIN public.families pending_fam ON pending_fam.id = pending.family_id
  LEFT JOIN public.profiles pending_admin ON pending_admin.id = pending_fam.admin_id
  WHERE auth.uid() IS NOT NULL AND p.id = auth.uid();
$$;

REVOKE EXECUTE ON FUNCTION public.get_my_family_status() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_family_status() TO authenticated;

-- Incoming pending requests for the caller's own family. Empty for anyone who
-- is not a family admin — no separate authorization check needed, the join
-- to families already scopes it.
CREATE OR REPLACE FUNCTION public.list_family_join_requests()
RETURNS TABLE (
  id UUID,
  requester_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  village TEXT,
  city TEXT,
  relation TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jr.id, jr.requester_id, p.full_name, p.avatar_url, p.village, p.city, jr.relation, jr.created_at
  FROM public.family_join_requests jr
  JOIN public.families f ON f.id = jr.family_id
  JOIN public.profiles p ON p.id = jr.requester_id
  WHERE f.admin_id = auth.uid()
    AND jr.status = 'pending'
  ORDER BY jr.created_at;
$$;

REVOKE EXECUTE ON FUNCTION public.list_family_join_requests() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_family_join_requests() TO authenticated;

-- Approving links the two accounts for real: the requester's profile gets
-- family_id set, and a verified family_members row (linked_profile_id) is
-- created so they immediately show up in the admin's existing family tree /
-- Manage Family screen — the same place a manually-added, manually-linked
-- member would show up.
CREATE OR REPLACE FUNCTION public.respond_family_join_request(request_id UUID, approve BOOLEAN)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller UUID := auth.uid();
  req    RECORD;
  requester_name TEXT;
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'You must be signed in';
  END IF;

  SELECT jr.id, jr.family_id, jr.requester_id, jr.relation, jr.status, f.admin_id
    INTO req
    FROM public.family_join_requests jr
    JOIN public.families f ON f.id = jr.family_id
   WHERE jr.id = request_id;

  IF req.id IS NULL THEN
    RAISE EXCEPTION 'Request not found';
  END IF;

  IF req.admin_id <> caller THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  IF req.status <> 'pending' THEN
    RAISE EXCEPTION 'This request was already handled';
  END IF;

  IF approve THEN
    UPDATE public.profiles SET family_id = req.family_id WHERE id = req.requester_id;

    SELECT full_name INTO requester_name FROM public.profiles WHERE id = req.requester_id;

    IF NOT EXISTS (
      SELECT 1 FROM public.family_members
       WHERE owner_id = caller AND linked_profile_id = req.requester_id
    ) THEN
      INSERT INTO public.family_members (owner_id, full_name, relation, status, linked_profile_id)
      VALUES (caller, coalesce(requester_name, 'Member'), req.relation, 'verified', req.requester_id);
    END IF;

    UPDATE public.family_join_requests SET status = 'approved', updated_at = now() WHERE id = request_id;
  ELSE
    UPDATE public.family_join_requests SET status = 'rejected', updated_at = now() WHERE id = request_id;
  END IF;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.respond_family_join_request(UUID, BOOLEAN) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.respond_family_join_request(UUID, BOOLEAN) TO authenticated;

-- Lets a joined (non-admin) member detach themselves from a family they
-- joined by mistake or no longer belong to. An admin cannot leave their own
-- family this way — there is no transfer-of-admin flow yet, so that would
-- strand the family's members with no admin.
CREATE OR REPLACE FUNCTION public.leave_family()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller UUID := auth.uid();
  fam_id UUID;
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'You must be signed in';
  END IF;

  IF EXISTS (SELECT 1 FROM public.families WHERE admin_id = caller) THEN
    RAISE EXCEPTION 'You are a family admin and cannot leave your own family';
  END IF;

  SELECT family_id INTO fam_id FROM public.profiles WHERE id = caller;
  IF fam_id IS NULL THEN
    RAISE EXCEPTION 'You are not part of a family';
  END IF;

  DELETE FROM public.family_members
   WHERE linked_profile_id = caller
     AND owner_id = (SELECT admin_id FROM public.families WHERE id = fam_id);

  UPDATE public.profiles SET family_id = NULL WHERE id = caller;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.leave_family() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.leave_family() TO authenticated;
