-- Family members belonging to a member's household.
-- Owned by the auth user who added them; verification is vouched for by that owner.

CREATE TABLE public.family_members (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  relation TEXT NOT NULL,
  dob DATE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('verified', 'pending', 'approval')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX family_members_owner_id_idx ON public.family_members (owner_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.family_members TO authenticated;
GRANT ALL ON public.family_members TO service_role;

ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own family members" ON public.family_members
  FOR SELECT TO authenticated USING (auth.uid() = owner_id);
CREATE POLICY "Users can insert their own family members" ON public.family_members
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own family members" ON public.family_members
  FOR UPDATE TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can delete their own family members" ON public.family_members
  FOR DELETE TO authenticated USING (auth.uid() = owner_id);

CREATE TRIGGER family_members_set_updated_at
BEFORE UPDATE ON public.family_members
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
