import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useGoBack } from "@/hooks/use-go-back";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Briefcase,
  Calendar,
  Heart,
  ShieldCheck,
  Users,
  ChevronRight,
  Check,
  LogOut,
  FileText,
  Shield,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useProfileRole } from "@/hooks/use-profile-role";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";
import { MARITAL_OPTIONS, type MaritalStatus } from "@/lib/profile-options";
import { BottomNav } from "@/components/BottomNav";
import { DeleteAccountSheet } from "@/components/DeleteAccountSheet";

export const Route = createLazyFileRoute("/account")({
  component: AccountPage,
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
  gender: null as "male" | "female" | "other" | null,
  admin: "no" as "yes" | "no",
};

function AccountPage() {
  const navigate = useNavigate();
  const goBack = useGoBack();
  const { checking, session } = useRequireAuth();
  const { canPublish, role } = useProfileRole(session);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [family, setFamily] = useState<{ total: number; verified: number }>({
    total: 0,
    verified: 0,
  });

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
        .select(
          "full_name, mobile, village, city, state, occupation, dob, marital_status, gender, is_family_admin",
        )
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
          gender:
            data.gender === "male" || data.gender === "female" || data.gender === "other"
              ? data.gender
              : null,
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
        gender: form.gender,
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
              onClick={goBack}
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
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white text-2xl font-bold border-4 border-card shadow-elevated">
                  {(form.name.trim()[0] ?? "?").toUpperCase()}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-foreground text-lg leading-tight truncate">
                  {form.name.trim() || "Your profile"}
                </h2>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  {session?.user.email}
                </p>
                {role !== "member" && (
                  <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold capitalize">
                    <BadgeCheck className="w-3.5 h-3.5" /> {role}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <SectionCard title="Personal Information">
            <Field
              icon={User}
              label="Full Name"
              value={form.name}
              onChange={(v) => set("name", v)}
              autoComplete="name"
            />
            <Field
              icon={Phone}
              label="Mobile Number"
              value={form.mobile}
              onChange={(v) => set("mobile", v)}
              type="tel"
              autoComplete="tel"
            />
            <Field
              icon={Mail}
              label="Email Address"
              value={session?.user.email ?? ""}
              onChange={() => {}}
              type="email"
              disabled
            />
            <Field
              icon={MapPin}
              label="Village"
              value={form.village}
              onChange={(v) => set("village", v)}
            />
            <Field
              icon={Building2}
              label="City"
              value={form.city}
              onChange={(v) => set("city", v)}
            />
            <Field
              icon={MapPin}
              label="State"
              value={form.state}
              onChange={(v) => set("state", v)}
            />
            <Field
              icon={Briefcase}
              label="Occupation"
              value={form.occupation}
              onChange={(v) => set("occupation", v)}
            />
            <Field
              icon={Calendar}
              label="Date of Birth"
              value={form.dob}
              onChange={(v) => set("dob", v)}
            />

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-2xl">
                {(["male", "female", "other"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => set("gender", g)}
                    className={`h-10 rounded-xl text-sm font-medium capitalize transition-all ${
                      form.gender === g
                        ? "bg-card text-foreground shadow-soft"
                        : "text-muted-foreground"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              {/*
                The explanatory line is gone, to match Profile Setup. The unset
                warning stays: it is not an explanation but a live status, and
                without it a member has no way to discover their number is hidden.
              */}
              {form.gender === null && (
                <p className="text-[11px] text-muted-foreground mt-1.5 px-1 leading-relaxed">
                  Not set — your mobile number is hidden from other members until you set this.
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
                <Heart className="w-3 h-3 inline mr-1" /> Marital Status
              </label>
              <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <select
                  value={
                    MARITAL_OPTIONS.includes(form.marital as MaritalStatus) ? form.marital : ""
                  }
                  onChange={(e) => set("marital", e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground appearance-none"
                >
                  {/* Older rows may hold a value no longer offered (e.g. the
                      retired "Other"); keep it selectable rather than silently
                      rewriting the member's saved answer. */}
                  {!MARITAL_OPTIONS.includes(form.marital as MaritalStatus) && (
                    <option value="">{form.marital || "Select"}</option>
                  )}
                  {MARITAL_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
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
                      form.admin === v
                        ? "bg-card text-foreground shadow-soft"
                        : "text-muted-foreground"
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
              value={
                family.total === 0
                  ? "None added yet"
                  : `${family.total} member${family.total === 1 ? "" : "s"}`
              }
            />
            <Row
              icon={<BadgeCheck className="w-4 h-4" />}
              label="Verified"
              value={
                family.total === 0 ? (
                  "—"
                ) : (
                  <span
                    className={
                      family.verified === family.total
                        ? "text-success font-semibold"
                        : "font-semibold"
                    }
                  >
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
              <>
                <Check className="w-5 h-5" strokeWidth={3} /> Profile Updated
              </>
            ) : saving ? (
              "Saving..."
            ) : (
              "Update Profile"
            )}
          </button>

          {/* Legal */}
          <SectionCard title="Legal">
            <button
              onClick={() => navigate({ to: "/privacy" })}
              className="w-full h-12 rounded-2xl bg-background border border-border text-foreground text-sm font-semibold flex items-center gap-3 px-4 active:scale-[0.98] transition"
            >
              <Shield className="w-4 h-4 text-muted-foreground" /> Privacy Policy
              <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </button>
            <button
              onClick={() => navigate({ to: "/terms" })}
              className="w-full h-12 rounded-2xl bg-background border border-border text-foreground text-sm font-semibold flex items-center gap-3 px-4 active:scale-[0.98] transition"
            >
              <FileText className="w-4 h-4 text-muted-foreground" /> Terms of Use
              <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </button>
          </SectionCard>

          {/* Sign out */}
          <button
            onClick={() => {
              void supabase.auth.signOut();
              navigate({ to: "/" });
            }}
            className="w-full h-12 rounded-2xl bg-muted text-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>

          {/* Danger zone */}
          <SectionCard title="Danger Zone">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Deleting your account removes your profile, your family members and your photo for
              good. Community news you published stays in the feed without your name.
            </p>
            <button
              onClick={() => setShowDelete(true)}
              className="mt-1 w-full h-12 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
            >
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </SectionCard>

          <div className="pb-4" />
        </div>

        {showDelete && session && (
          <DeleteAccountSheet
            userId={session.user.id}
            onClose={() => setShowDelete(false)}
            onDeleted={() => navigate({ to: "/" })}
          />
        )}

        <BottomNav active="profile" />
      </div>
    </PhoneFrame>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-bold text-foreground text-sm mb-3 px-1">{title}</h2>
      <div className="rounded-2xl bg-card border border-border shadow-soft p-4 space-y-3.5">
        {children}
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  autoComplete = "off",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
        {label}
      </label>
      <div className="flex items-center gap-3 bg-background border border-border rounded-2xl px-4 h-12 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
        <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent outline-none text-foreground text-sm min-w-0 disabled:text-muted-foreground"
        />
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-foreground truncate">{value}</div>
      </div>
    </div>
  );
}
