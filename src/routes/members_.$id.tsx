import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft, Phone, MapPin, Briefcase, Heart, Cake, Users, BadgeCheck, Info, ChevronRight,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";
import { FamilyTree, type FamilyNode } from "@/components/FamilyTree";

export const Route = createFileRoute("/members_/$id")({
  component: MemberProfilePage,
  head: () => ({ meta: [{ title: "Member — Sangath" }] }),
});

type Member = {
  id: string;
  full_name: string | null;
  village: string | null;
  city: string | null;
  state: string | null;
  occupation: string | null;
  marital_status: string | null;
  mobile: string | null;
  is_family_admin: boolean;
  birth_year: number | null;
  role: string;
};

function ageFromYear(year: number | null) {
  if (!year) return null;
  return new Date().getFullYear() - year;
}

function MemberProfilePage() {
  const { id } = useParams({ from: "/members_/$id" });
  const navigate = useNavigate();
  const { checking, session } = useRequireAuth();
  const [member, setMember] = useState<Member | null>(null);
  const [family, setFamily] = useState<FamilyNode[]>([]);
  const [familyAdmin, setFamilyAdmin] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      const [profile, household, admin] = await Promise.all([
        supabase.rpc("get_member", { target_id: id }),
        supabase.rpc("get_member_family", { target_id: id }),
        supabase.rpc("get_family_admin_of", { target_id: id }),
      ]);
      if (cancelled) return;
      setMember((profile.data?.[0] as Member) ?? null);
      setFamily((household.data ?? []) as FamilyNode[]);
      setFamilyAdmin((admin.data?.[0] as Member) ?? null);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id, session]);

  if (checking || loading) return <LoadingScreen />;

  if (!member) {
    return (
      <PhoneFrame>
        <div className="flex flex-col items-center justify-center min-h-screen md:min-h-[860px] px-8 text-center">
          <div className="text-5xl mb-3">🔍</div>
          <h1 className="font-bold text-foreground">Member not found</h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            This profile may have been removed.
          </p>
          <button
            onClick={() => navigate({ to: "/home" })}
            className="mt-6 h-11 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
          >
            Back to Home
          </button>
        </div>
      </PhoneFrame>
    );
  }

  const age = ageFromYear(member.birth_year);
  const place = [member.village, member.city, member.state].filter(Boolean).join(", ");
  const isSelf = member.id === session?.user.id;

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0 md:h-[860px] bg-background">
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3 flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/home" })}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="flex-1 font-bold text-foreground text-lg leading-tight truncate">
              Member Profile
            </h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-28 space-y-5" style={{ scrollbarWidth: "none" }}>
          {/* Identity */}
          <section className="rounded-3xl bg-gradient-to-br from-primary-soft via-background to-accent p-5 border border-border shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white text-2xl font-bold border-4 border-card shadow-elevated shrink-0">
                {(member.full_name?.trim()[0] ?? "?").toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-foreground text-lg leading-tight truncate">
                  {member.full_name}
                  {isSelf && <span className="text-[11px] font-normal text-muted-foreground"> (you)</span>}
                </h2>
                {place && (
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" /> {place}
                  </p>
                )}
                {member.role !== "member" && (
                  <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold capitalize">
                    <BadgeCheck className="w-3.5 h-3.5" /> {member.role}
                  </span>
                )}
              </div>
            </div>

            {member.mobile ? (
              <a
                href={`tel:${member.mobile}`}
                className="mt-4 w-full h-12 rounded-2xl bg-success text-success-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
              >
                <Phone className="w-4 h-4" /> Call {member.mobile}
              </a>
            ) : familyAdmin && familyAdmin.id !== member.id ? (
              <button
                onClick={() => navigate({ to: "/members/$id", params: { id: familyAdmin.id } })}
                className="mt-4 w-full rounded-2xl bg-background border border-border px-3.5 py-3 flex items-center gap-3 text-left active:scale-[0.98] transition"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {(familyAdmin.full_name?.trim()[0] ?? "?").toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-muted-foreground">No number shown — reach via family admin</div>
                  <div className="text-sm font-semibold text-foreground truncate">{familyAdmin.full_name}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            ) : (
              <p className="mt-4 flex items-start gap-2 text-[11.5px] text-muted-foreground leading-relaxed">
                <Info className="w-3.5 h-3.5 shrink-0 mt-px" />
                No contact number shown for this member.
              </p>
            )}
          </section>

          {/* Details */}
          <section>
            <h2 className="font-bold text-foreground text-sm mb-3 px-1">Details</h2>
            <div className="rounded-2xl bg-card border border-border shadow-soft divide-y divide-border/60">
              <DetailRow icon={<Briefcase className="w-4 h-4" />} label="Occupation" value={member.occupation} />
              <DetailRow icon={<Heart className="w-4 h-4" />} label="Marital status" value={member.marital_status} />
              <DetailRow
                icon={<Cake className="w-4 h-4" />}
                label="Age"
                value={age !== null ? `${age} years` : null}
              />
            </div>
          </section>

          {/* Family tree */}
          <section>
            <h2 className="font-bold text-foreground text-sm mb-3 px-1 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Family
              {family.length > 0 && (
                <span className="text-xs font-normal text-muted-foreground">
                  · {family.length} {family.length === 1 ? "member" : "members"}
                </span>
              )}
            </h2>
            {family.length === 0 ? (
              <p className="text-sm text-muted-foreground px-1 py-3">No family members listed.</p>
            ) : (
              <>
                <FamilyTree
                  members={family}
                  selfName={member.full_name ?? "This member"}
                  onOpen={(profileId) => navigate({ to: "/members/$id", params: { id: profileId } })}
                />
                {family.some((f) => f.linked_profile_id) && (
                  <p className="text-[11px] text-muted-foreground mt-2 px-1">
                    Cards with an arrow are on Sangath — tap to open their profile.
                  </p>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </PhoneFrame>
  );
}

function DetailRow({
  icon, label, value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-center gap-3 p-3.5">
      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-foreground truncate">
          {value?.trim() || <span className="text-muted-foreground font-normal">Not provided</span>}
        </div>
      </div>
    </div>
  );
}
