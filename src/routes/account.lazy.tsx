import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useGoBack } from "@/hooks/use-go-back";
import { isSyntheticPhoneEmail } from "@/lib/phone-auth.functions";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  User,
  Phone,
  Mail,
  MapPin,
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
  Copy,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PhoneFrame, SheetPortal } from "@/components/PhoneFrame";
import { Avatar } from "@/components/Avatar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useProfileRole } from "@/hooks/use-profile-role";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";
import {
  MARITAL_OPTIONS,
  OCCUPATION_OPTIONS,
  OCCUPATION_OTHER,
  occupationKeySuffix,
  type MaritalStatus,
} from "@/lib/profile-options";
import { AvatarPicker } from "@/components/AvatarPicker";
import { PlacePicker } from "@/components/PlacePicker";
import { BottomNav } from "@/components/BottomNav";
import { DeleteAccountSheet } from "@/components/DeleteAccountSheet";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useT } from "@/lib/i18n";

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
  avatarUrl: null as string | null,
};

function AccountPage() {
  const navigate = useNavigate();
  const t = useT();
  const goBack = useGoBack();
  const { checking, session } = useRequireAuth();
  const { canPublish, role } = useProfileRole(session);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [form, setForm] = useState(emptyForm);
  // The last-saved snapshot, so a change to any field can be detected without
  // the member having to scroll down to the Update Profile button to find out.
  const [savedForm, setSavedForm] = useState(emptyForm);
  // Set each time a field edit is finished (a picker/select choice, or leaving
  // a text field with a changed value). The "Update your profile?" dialog shows
  // while this is set and the form differs from savedForm; "Not now" clears it
  // until the next finished edit.
  const [askToSave, setAskToSave] = useState(false);
  // True once "Other" is explicitly picked, so the custom field stays visible
  // even if occupation is momentarily "" while retyping it.
  const [occupationOther, setOccupationOther] = useState(false);
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
          "full_name, mobile, village, city, state, occupation, dob, marital_status, gender, avatar_url",
        )
        .eq("id", session.user.id)
        .maybeSingle();
      if (cancelled) return;
      if (data) {
        const loaded: typeof emptyForm = {
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
          avatarUrl: data.avatar_url ?? null,
        };
        setForm(loaded);
        setSavedForm(loaded);
      }
      setLoadingProfile(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  // For controls where a single change is the whole edit (pickers, selects).
  const commit = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    set(k, v);
    setAskToSave(true);
  };

  // Occupation is free text, so a saved value that predates the preset list
  // (or was typed as something else entirely) shows up here too — not just
  // when "Other" was explicitly picked on this visit.
  const occupationIsCustom =
    occupationOther ||
    (form.occupation !== "" &&
      !OCCUPATION_OPTIONS.includes(form.occupation as (typeof OCCUPATION_OPTIONS)[number]));

  const isDirty = JSON.stringify(form) !== JSON.stringify(savedForm);

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
        avatar_url: form.avatarUrl,
      })
      .eq("id", session.user.id);
    setSaving(false);
    if (saveError) {
      setError(friendlyAuthError(saveError.message));
      return;
    }
    setSavedForm(form);
    setSaved(true);
    setTimeout(() => setAskToSave(false), 1000);
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
              className="w-11 h-11 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
              aria-label={t("common.back")}
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="flex-1 font-bold text-foreground text-lg leading-tight">
              {t("account.title")}
            </h1>
            <LanguageToggle />
          </div>

        </div>

        {/* Body */}
        <div className="flex-1 px-5 pt-5 pb-28 space-y-5">
          {/* Profile header card */}
          <section className="rounded-3xl bg-gradient-to-br from-primary-soft via-background to-accent p-5 border border-border shadow-card">
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                {session ? (
                  <AvatarPicker
                    userId={session.user.id}
                    value={form.avatarUrl}
                    onChange={(url) => commit("avatarUrl", url)}
                    compact
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white text-2xl font-bold border-4 border-card shadow-elevated">
                    {(form.name.trim()[0] ?? "?").toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-foreground text-lg leading-tight truncate">
                  {form.name.trim() || t("account.yourProfile")}
                </h2>
                {!isSyntheticPhoneEmail(session?.user.email) && (
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {session?.user.email}
                  </p>
                )}
                {role !== "member" && (
                  <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                    <BadgeCheck className="w-3.5 h-3.5" /> {t(`role.${role}` as never)}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <SectionCard title={t("account.personalInfo")}>
            <p className="text-[11px] text-muted-foreground -mt-1 leading-relaxed">
              {t("account.lockedFieldHint")}
            </p>
            <Field
              icon={User}
              label={t("profile.fullName")}
              value={form.name}
              onChange={() => {}}
              autoComplete="name"
              disabled
            />
            <Field
              icon={Phone}
              label={t("account.mobile")}
              value={form.mobile}
              onChange={() => {}}
              type="tel"
              autoComplete="tel"
              disabled
            />
            {/*
              Every account created after mobile-only sign-up has a synthetic
              placeholder address here (see isSyntheticPhoneEmail) rather than
              a real one — showing that to a member as "their email" would be
              a confusing leak of an internal implementation detail. A member
              who signed up before that change still has a real address, and
              still sees it here.
            */}
            {!isSyntheticPhoneEmail(session?.user.email) && (
              <Field
                icon={Mail}
                label={t("common.emailAddress")}
                value={session?.user.email ?? ""}
                onChange={() => {}}
                type="email"
                disabled
              />
            )}
            <PlacePicker
              label={t("profile.village")}
              value={form.village}
              onChange={(v) => commit("village", v)}
            />
            <Field
              icon={MapPin}
              label={t("account.city")}
              value={form.city}
              onChange={(v) => set("city", v)}
              onCommit={() => setAskToSave(true)}
              autoComplete="address-level2"
            />
            <div>
              <label
                htmlFor="occupation"
                className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1"
              >
                {t("profile.occupation")}
              </label>
              <div className="flex items-center gap-3 bg-background border border-border rounded-2xl px-4 h-14 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <Briefcase className="w-4 h-4 text-muted-foreground shrink-0" />
                <select
                  id="occupation"
                  value={occupationIsCustom ? OCCUPATION_OTHER : form.occupation}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === OCCUPATION_OTHER) {
                      setOccupationOther(true);
                      set("occupation", "");
                    } else {
                      setOccupationOther(false);
                      commit("occupation", v);
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-foreground text-sm appearance-none"
                >
                  <option value="" disabled>
                    {t("account.select")}
                  </option>
                  {OCCUPATION_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {t(`profile.occupation.${occupationKeySuffix(o)}` as never)}
                    </option>
                  ))}
                  <option value={OCCUPATION_OTHER}>{t("profile.occupationOther")}</option>
                </select>
              </div>
            </div>

            {/* Occupation is free text in the database — an existing member's
                saved answer may not match any preset, which is exactly when
                this needs to show rather than silently hide their own words. */}
            {occupationIsCustom && (
              <Field
                icon={Briefcase}
                label={t("profile.occupationOtherLabel")}
                value={form.occupation}
                onChange={(v) => set("occupation", v)}
                onCommit={() => setAskToSave(true)}
              />
            )}

            <Field
              icon={Calendar}
              label={t("profile.dob")}
              value={form.dob}
              onChange={() => {}}
              type="date"
              max={new Date().toISOString().slice(0, 10)}
              disabled
            />

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
                {t("profile.gender")}
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-2xl">
                {(["male", "female", "other"] as const).map((g) => (
                  <button
                    key={g}
                    disabled
                    className={`h-11 rounded-xl text-sm font-medium transition-all disabled:opacity-60 ${
                      form.gender === g
                        ? "bg-card text-foreground shadow-soft"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t(`profile.gender.${g}` as never)}
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
                  {t("account.genderUnset")}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block px-1">
                <Heart className="w-3 h-3 inline mr-1" /> {t("profile.maritalStatus")}
              </label>
              <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <select
                  value={
                    MARITAL_OPTIONS.includes(form.marital as MaritalStatus) ? form.marital : ""
                  }
                  onChange={(e) => commit("marital", e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground appearance-none"
                >
                  {/* Older rows may hold a value no longer offered (e.g. the
                      retired "Other"); keep it selectable rather than silently
                      rewriting the member's saved answer. */}
                  {!MARITAL_OPTIONS.includes(form.marital as MaritalStatus) && (
                    <option value="">{form.marital || t("account.select")}</option>
                  )}
                  {MARITAL_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {t(`profile.marital.${m}` as never)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </SectionCard>

          {/* Family Information */}
          <SectionCard title={t("account.familyInfo")}>
            {session && <FamilyAdminSection userId={session.user.id} />}

            <Row
              icon={<Users className="w-4 h-4" />}
              label={t("account.familyMembers")}
              value={
                family.total === 0
                  ? t("account.noneAdded")
                  : t(family.total === 1 ? "common.memberCountOne" : "common.memberCount", {
                      count: family.total,
                    })
              }
            />
            <Row
              icon={<BadgeCheck className="w-4 h-4" />}
              label={t("account.verified")}
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
                    {t("account.verifiedOf", { done: family.verified, total: family.total })}
                  </span>
                )
              }
            />
            <button
              onClick={() => navigate({ to: "/family" })}
              className="mt-2 w-full h-12 rounded-2xl bg-muted text-foreground text-sm font-semibold flex items-center justify-center gap-2 px-4 active:scale-[0.98] transition"
            >
              <Users className="w-4 h-4" /> {t("account.manageFamily")}
              <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </button>
          </SectionCard>

          {/* Admin */}
          {canPublish && (
            <SectionCard title={t("account.communityManagement")}>
              <Row
                icon={<ShieldCheck className="w-4 h-4" />}
                label={t("account.yourRole")}
                value={
                  <span className="font-semibold text-primary">{t(`role.${role}` as never)}</span>
                }
              />
              <button
                onClick={() => navigate({ to: "/admin" })}
                className="mt-2 w-full h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 px-4 active:scale-[0.98] transition"
              >
                <ShieldCheck className="w-4 h-4" /> {t("account.openAdmin")}
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
                <Check className="w-5 h-5" strokeWidth={3} /> {t("account.profileUpdated")}
              </>
            ) : saving ? (
              t("profile.saving")
            ) : (
              t("account.updateProfile")
            )}
          </button>

          {/* Legal */}
          <SectionCard title={t("account.legal")}>
            <button
              onClick={() => navigate({ to: "/privacy" })}
              className="w-full h-12 rounded-2xl bg-background border border-border text-foreground text-sm font-semibold flex items-center gap-3 px-4 active:scale-[0.98] transition"
            >
              <Shield className="w-4 h-4 text-muted-foreground" /> {t("common.privacyPolicy")}
              <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </button>
            <button
              onClick={() => navigate({ to: "/terms" })}
              className="w-full h-12 rounded-2xl bg-background border border-border text-foreground text-sm font-semibold flex items-center gap-3 px-4 active:scale-[0.98] transition"
            >
              <FileText className="w-4 h-4 text-muted-foreground" /> {t("account.termsOfUse")}
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
            <LogOut className="w-4 h-4" /> {t("account.signOut")}
          </button>

          {/* Danger zone */}
          <SectionCard title={t("account.dangerZone")}>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("account.deleteExplain")}
            </p>
            <button
              onClick={() => setShowDelete(true)}
              className="mt-1 w-full h-12 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
            >
              <Trash2 className="w-4 h-4" /> {t("account.deleteAccount")}
            </button>
          </SectionCard>

          <div className="pb-4" />
        </div>

        {askToSave && (isDirty || saved) && (
          <SheetPortal>
            <div className="fixed md:absolute inset-0 z-40 bg-foreground/40 backdrop-blur-sm flex items-center justify-center px-6">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="save-dialog-title"
                className="w-full max-w-sm bg-card rounded-3xl shadow-elevated p-5 fade-up"
              >
                {saved ? (
                  <p className="flex items-center justify-center gap-2 py-3 text-base font-bold text-foreground">
                    <Check className="w-5 h-5 text-primary" strokeWidth={3} />{" "}
                    {t("account.profileUpdated")}
                  </p>
                ) : (
                  <>
                    <h3 id="save-dialog-title" className="text-base font-bold text-foreground">
                      {t("account.saveDialogTitle")}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      {t("account.saveDialogBody")}
                    </p>
                    {error && <p className="text-xs text-destructive mt-3">{error}</p>}
                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <button
                        onClick={() => setAskToSave(false)}
                        disabled={saving}
                        className="h-12 rounded-2xl bg-muted text-foreground text-sm font-semibold active:scale-[0.98] transition disabled:opacity-60"
                      >
                        {t("account.notNow")}
                      </button>
                      <button
                        onClick={() => void handleSave()}
                        disabled={saving}
                        className="h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.98] transition disabled:opacity-60"
                      >
                        {saving ? t("profile.saving") : t("account.update")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </SheetPortal>
        )}

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

interface FamilyStatus {
  is_admin: boolean;
  family_code: string | null;
  family_id: string | null;
  admin_id: string | null;
  admin_name: string | null;
  admin_avatar_url: string | null;
  pending_request_id: string | null;
  pending_admin_name: string | null;
}

/**
 * Surfaces the family <-> family-admin mapping from Account, read-only: who
 * becomes the admin and who joins whom is a one-time choice made during
 * Profile Setup (only one member per family can be the admin), so nothing
 * here lets that be picked or changed after the fact. A still-pending join
 * request is the one exception — it can be cancelled since the admin has not
 * approved it yet, so nothing has actually been decided.
 */
function FamilyAdminSection({ userId }: { userId: string }) {
  const t = useT();
  const [status, setStatus] = useState<FamilyStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const load = async () => {
    const { data } = await supabase.rpc("get_my_family_status");
    setStatus(((data ?? [])[0] as FamilyStatus) ?? null);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, [userId]);

  const cancelRequest = async () => {
    if (!status?.pending_request_id) return;
    setBusy(true);
    setError("");
    const { error: deleteError } = await supabase
      .from("family_join_requests")
      .delete()
      .eq("id", status.pending_request_id);
    setBusy(false);
    if (deleteError) {
      setError(friendlyAuthError(deleteError.message));
      return;
    }
    await load();
  };

  const copyCode = () => {
    if (!status?.family_code) return;
    void navigator.clipboard.writeText(status.family_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  if (loading || !status) {
    return <div className="h-11 rounded-xl bg-muted animate-pulse" />;
  }

  if (!status.is_admin && !(status.family_id && status.admin_id) && !status.pending_request_id) {
    // Chose neither at setup — a stable, final state, not something to fix here.
    return null;
  }

  return (
    <div className="space-y-3 pb-3.5 border-b border-border/60">
      {error && <p className="text-xs text-destructive">{error}</p>}

      {status.is_admin ? (
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <ShieldCheck className="w-3.5 h-3.5" /> {t("account.familyAdminBadge")}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            {t("account.familyAdminCodeHelp")}
          </p>
          <button
            onClick={copyCode}
            className="mt-2 w-full h-11 rounded-xl bg-primary-soft border border-primary/20 flex items-center justify-center gap-2 text-sm font-bold text-primary tracking-widest active:scale-[0.98] transition"
          >
            {status.family_code}
            <Copy className="w-3.5 h-3.5" />
          </button>
          {copied && <p className="text-[11px] text-success mt-1">{t("account.copied")}</p>}
        </div>
      ) : status.family_id && status.admin_id ? (
        <div className="flex items-center gap-3">
          <Avatar
            url={status.admin_avatar_url}
            name={status.admin_name}
            className="w-9 h-9 shrink-0"
          />
          <p className="flex-1 text-xs text-foreground leading-snug">
            {t("account.partOfFamily", { name: status.admin_name ?? "" })}
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-warning">
            <Clock className="w-3.5 h-3.5" />
            {t("account.pendingApproval", { name: status.pending_admin_name ?? "" })}
          </div>
          <button
            onClick={() => void cancelRequest()}
            disabled={busy}
            className="mt-2 w-full h-10 rounded-xl bg-muted text-foreground text-xs font-semibold disabled:opacity-50"
          >
            {busy ? "…" : t("account.cancelRequest")}
          </button>
        </div>
      )}
    </div>
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
  max,
  onCommit,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
  autoComplete?: string;
  /** Passed straight through — used to cap type="date" at today. */
  max?: string;
  /** Called on leaving the field, only if its value changed while focused. */
  onCommit?: () => void;
}) {
  const valueOnFocus = useRef(value);
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
          onFocus={() => (valueOnFocus.current = value)}
          onBlur={() => {
            if (value !== valueOnFocus.current) onCommit?.();
          }}
          // The keyboard's Done/Enter finishes the edit, same as tapping away.
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          disabled={disabled}
          autoComplete={autoComplete}
          max={max}
          className={`flex-1 bg-transparent outline-none text-foreground text-sm min-w-0 disabled:text-muted-foreground ${type === "date" ? "[color-scheme:light]" : ""}`}
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
