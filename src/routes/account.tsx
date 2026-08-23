import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft, Camera, BadgeCheck, User, Phone, Mail, MapPin, Building2,
  Briefcase, Calendar, Heart, ShieldCheck, Users, ChevronRight, Check, Mail as MailIcon,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useProfileRole } from "@/hooks/use-profile-role";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";
import { BottomNav } from "@/routes/facilities";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({ meta: [{ title: "My Profile — Sangath" }] }),
});

const emptyForm = {
  name: "",
  mobile: "",
  village: "",
  city: "",
  state: "",
  occupation: "",
  dob: "",
  marital: "Single",
  admin: "no" as "yes" | "no",
};

function AccountPage() {
  const navigate = useNavigate();
  const { checking, session } = useRequireAuth();
  const { canPublish, role } = useProfileRole(session);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [family, setFamily] = useState<{ total: number; verified: number }>({ total: 0, verified: 0 });

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      const { data: members } = await supabase
        .from("family_members")
        .select("status")
        .eq("owner_id", session.user.id);
      if (!cancelled && members) {
        setFamily({
          total: members.length,
          verified: members.filter((m) => m.status === "verified").length,
        });
      }
      const { data } = await supabase
        .from("profiles")
        .select("full_name, mobile, village, city, state, occupation, dob, marital_status, is_family_admin")
        .eq("id", session.user.id)
        .maybeSingle();
      if (cancelled) return;
      if (data) {
        setForm({
          name: data.full_name ?? "",
          mobile: data.mobile ?? "",
          village: data.village ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          occupation: data.occupation ?? "",
          dob: data.dob ?? "",
          marital: data.marital_status ?? "Single",
          admin: data.is_family_admin ? "yes" : "no",
        });
      }
      setLoadingProfile(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!session || saving) return;
    setError("");
    setSaving(true);
    const { error: saveError } = await supabase
      .from("profiles")
      .update({
        full_name: form.name,
        mobile: form.mobile,
        village: form.village,
        city: form.city,
        state: form.state,
        occupation: form.occupation,
        dob: form.dob,
        marital_status: form.marital,
        is_family_admin: form.admin === "yes",
      })
      .eq("id", session.user.id);
    setSaving(false);
    if (saveError) {
      setError(friendlyAuthError(saveError.message));
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  if (checking || loadingProfile) return <LoadingScreen />;

  return (
    <PhoneFrame>
      <div className="relative flex flex-col min-h-screen md:min-h-[860px] bg-background">
        {/* Sticky header */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3 flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/home" })}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="flex-1 font-bold text-foreground text-lg leading-tight">My Profile</h1>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-5 pt-5 pb-28 space-y-5">
          {/* Profile header card */}
          <section className="rounded-3xl bg-gradient-to-br from-primary-soft via-background to-accent p-5 border border-border shadow-card">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white text-2xl font-bold border-4 border-card shadow-elevated">
                  {form.name.charAt(0)}
                </div>
                <button
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-elevated border-2 border-card active:scale-95 transition"
                  aria-label="Change photo"
                >
                  <Camera className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-foreground text-lg leading-tight truncate">{form.name}</h2>
                <p className="text-[11px] text-muted-foreground mt-0.5">Member ID · SC-2024-08291</p>
                <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full bg-success/10 text-success text-[11px] font-bold">
                  <BadgeCheck className="w-3.5 h-3.5" /> Verified Member
                </span>
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <SectionCard title="Personal Information">
            <Field icon={User} label="Full Name" value={form.name} onChange={(v) => set("name", v)} />
            <Field icon={Phone} label="Mobile Number" value={form.mobile} onChange={(v) => set("mobile", v)} type="tel" />
            <Field icon={Mail} label="Email Address" value={session?.user.email ?? ""} onChange={() => {}} type="email" disabled />
            <Field icon={MapPin} label="Village" value={form.village} onChange={(v) => set("village", v)} />
            <Field icon={Building2} label="City" value={form.city} onChange={(v) => set("city", v)} />
            <Field icon={MapPin} label="State" value={form.state} onChange={(v) => set("state", v)} />
            <Field icon={Briefcase} label="Occupation" value={form.occupation} onChange={(v) => set("occupation", v)} />
            <Field icon={Calendar} label="Date of Birth" value={form.dob} onChange={(v) => set("dob", v)} />

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
                <Heart className="w-3 h-3 inline mr-1" /> Marital Status
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-2xl">
                {["Single", "Married", "Other"].map((m) => (
                  <button
                    key={m}
                    onClick={() => set("marital", m)}
                    className={`h-10 rounded-xl text-sm font-medium transition-all ${
                      form.marital === m ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
                <ShieldCheck className="w-3 h-3 inline mr-1" /> Family Admin Status
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-2xl">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => set("admin", v)}
                    className={`h-10 rounded-xl text-sm font-medium transition-all ${
                      form.admin === v ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                    }`}
                  >
                    {v === "yes" ? "Yes, I am Admin" : "No"}
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Family Information */}
          <SectionCard title="Family Information">
            <Row
              icon={<Users className="w-4 h-4" />}
              label="Family Members"
              value={family.total === 0 ? "None added yet" : `${family.total} member${family.total === 1 ? "" : "s"}`}
            />
            <Row
              icon={<BadgeCheck className="w-4 h-4" />}
              label="Verified"
              value={
                family.total === 0 ? (
                  "—"
                ) : (
                  <span className={family.verified === family.total ? "text-success font-semibold" : "font-semibold"}>
                    {family.verified} of {family.total}
                  </span>
                )
              }
            />
            <button
              onClick={() => navigate({ to: "/family" })}
              className="mt-2 w-full h-12 rounded-2xl bg-muted text-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
            >
              <Users className="w-4 h-4" /> Manage Family Members
              <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </button>
          </SectionCard>

          {/* Admin */}
          {canPublish && (
            <SectionCard title="Community Management">
              <Row
                icon={<ShieldCheck className="w-4 h-4" />}
                label="Your role"
                value={<span className="capitalize font-semibold text-primary">{role}</span>}
              />
              <button
                onClick={() => navigate({ to: "/admin" })}
                className="mt-2 w-full h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
              >
                <ShieldCheck className="w-4 h-4" /> Open Admin Console
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
            </SectionCard>
          )}

          {/* Update */}
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <button
            onClick={() => void handleSave()}
            disabled={saving}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saved ? (
              <><Check className="w-5 h-5" strokeWidth={3} /> Profile Updated</>
            ) : saving ? (
              "Saving..."
            ) : (
              "Update Profile"
            )}
          </button>

          {/* Support */}
          <div className="text-center pt-2 pb-4">
            <p className="text-sm text-muted-foreground">Need help updating your information?</p>
            <a
              href="mailto:support@samajconnect.com"
              className="mt-2 inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
            >
              <MailIcon className="w-4 h-4" /> support@samajconnect.com
            </a>
          </div>
        </div>

        <BottomNav active="profile" />
      </div>
    </PhoneFrame>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-bold text-foreground text-sm mb-3 px-1">{title}</h2>
      <div className="rounded-2xl bg-card border border-border shadow-soft p-4 space-y-3.5">{children}</div>
    </section>
  );
}

function Field({
  icon: Icon, label, value, onChange, type = "text", disabled = false,
}: { icon: any; label: string; value: string; onChange: (v: string) => void; type?: string; disabled?: boolean }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">{label}</label>
      <div className="flex items-center gap-3 bg-background border border-border rounded-2xl px-4 h-12 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
        <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-foreground text-sm min-w-0 disabled:text-muted-foreground"
        />
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-foreground truncate">{value}</div>
      </div>
    </div>
  );
}
