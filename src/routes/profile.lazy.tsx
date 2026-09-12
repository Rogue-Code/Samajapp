import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Briefcase,
  Heart,
  Calendar,
  Check,
  Loader2,
  KeyRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Avatar } from "@/components/Avatar";
import { AvatarPicker } from "@/components/AvatarPicker";
import { PlacePicker } from "@/components/PlacePicker";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useT } from "@/lib/i18n";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";
import {
  MARITAL_OPTIONS,
  OCCUPATION_OPTIONS,
  OCCUPATION_OTHER,
  occupationKeySuffix,
  RELATIONS,
  type MaritalStatus,
} from "@/lib/profile-options";

interface FamilyPreview {
  family_id: string;
  admin_name: string | null;
  admin_avatar_url: string | null;
}

export const Route = createLazyFileRoute("/profile")({
  component: ProfilePage,
});

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete = "off",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="relative">
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block px-1">{label}</label>
      <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
        />
      </div>
    </div>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const t = useT();
  const { checking, session } = useRequireAuth();
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [occupation, setOccupation] = useState("");
  // True once "Other" is picked, so the custom field appears even before
  // anything is typed into it (occupation itself stays "" until they do).
  const [occupationOther, setOccupationOther] = useState(false);
  const [marital, setMarital] = useState<MaritalStatus | "">("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(null);
  const [admin, setAdmin] = useState<"yes" | "no" | null>(null);
  const [familyCode, setFamilyCode] = useState("");
  const [familyRelation, setFamilyRelation] = useState<string>(RELATIONS[0]);
  const [familyPreview, setFamilyPreview] = useState<FamilyPreview | null>(null);
  const [familyChecking, setFamilyChecking] = useState(false);
  const [familyCodeError, setFamilyCodeError] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Debounced lookup so the member sees whose family they are about to ask to
  // join before they commit — the code itself is otherwise unreadable (no
  // direct table access), so this is the only way to catch a typo.
  useEffect(() => {
    const code = familyCode.trim();
    setFamilyPreview(null);
    setFamilyCodeError("");
    if (code.length < 6) return;
    setFamilyChecking(true);
    const handle = setTimeout(async () => {
      const { data, error: previewError } = await supabase.rpc("preview_family_by_code", {
        input_code: code,
      });
      setFamilyChecking(false);
      const match = (data ?? [])[0] as FamilyPreview | undefined;
      if (previewError || !match) {
        setFamilyCodeError(t("profile.familyCodeInvalid"));
      } else {
        setFamilyPreview(match);
      }
    }, 400);
    return () => clearTimeout(handle);
  }, [familyCode, t]);

  // Every other field is required, so saving cannot blank it. avatar_url can be
  // null, so without loading the current one first a re-save would wipe a photo
  // the member had already set.
  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    void (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", session.user.id)
        .maybeSingle();
      if (!cancelled && data?.avatar_url) setAvatarUrl(data.avatar_url);
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  // Entering a valid family code answers the family-admin question by
  // itself (you can't be the admin of a family you're asking to join).
  const joiningFamily = familyPreview !== null;
  const familyAnswered = joiningFamily || admin !== null;

  const canSubmit = name && village && occupation && dob && gender && marital && familyAnswered;

  const handleSave = async () => {
    if (!canSubmit || saving || !session) return;
    setError("");
    setSaving(true);
    const { error: saveError } = await supabase
      .from("profiles")
      .update({
        full_name: name,
        village,
        occupation,
        dob,
        marital_status: marital,
        avatar_url: avatarUrl,
        gender,
        profile_completed: true,
      })
      .eq("id", session.user.id);
    if (saveError) {
      setSaving(false);
      setError(friendlyAuthError(saveError.message));
      return;
    }

    if (joiningFamily) {
      const { error: joinError } = await supabase.rpc("request_join_family", {
        input_code: familyCode.trim(),
        member_relation: familyRelation,
      });
      if (joinError) {
        setSaving(false);
        setError(friendlyAuthError(joinError.message));
        return;
      }
    } else if (admin === "yes") {
      const { error: adminError } = await supabase.rpc("ensure_family_admin");
      if (adminError) {
        setSaving(false);
        setError(friendlyAuthError(adminError.message));
        return;
      }
    }

    setSaving(false);
    navigate({ to: "/home" });
  };

  if (checking) return <LoadingScreen />;

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px]">
        <div className="px-6 pt-8 pb-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10 border-b border-border/50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                void supabase.auth.signOut();
                navigate({ to: "/" });
              }}
              className="w-11 h-11 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
              aria-label={t("profile.signOut")}
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <LanguageToggle />
          </div>
        </div>

        <div className="flex-1 px-6 py-6 pb-32 fade-up">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {t("profile.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{t("profile.subtitle")}</p>

          <div className="mt-5">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block px-1">
              {t("profile.familyCodeLabel")}
            </label>
            <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
              <KeyRound className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                value={familyCode}
                onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                placeholder={t("profile.familyCodePlaceholder")}
                autoComplete="off"
                maxLength={6}
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 tracking-widest uppercase"
              />
              {familyChecking && (
                <Loader2 className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />
              )}
              {familyCode && !familyChecking && (
                <button
                  onClick={() => setFamilyCode("")}
                  aria-label={t("common.clear")}
                  className="text-muted-foreground shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {familyCodeError && (
              <p className="text-xs text-destructive mt-1.5 px-1">{familyCodeError}</p>
            )}
            {!familyCodeError && !familyPreview && (
              <p className="text-[11px] text-muted-foreground mt-1.5 px-1 leading-relaxed">
                {t("profile.familyCodeHelp")}
              </p>
            )}
            {familyPreview && (
              <div className="mt-2.5 flex items-center gap-3 bg-primary-soft border border-primary/20 rounded-2xl px-3 py-2.5">
                <Avatar
                  url={familyPreview.admin_avatar_url}
                  name={familyPreview.admin_name}
                  className="w-9 h-9 shrink-0"
                />
                <p className="flex-1 text-xs text-foreground leading-snug">
                  {t("profile.familyCodeMatch", { name: familyPreview.admin_name ?? "" })}
                </p>
              </div>
            )}
            {familyPreview && (
              <div className="mt-3">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block px-1">
                  {t("profile.familyRelationLabel")}
                </label>
                <select
                  value={familyRelation}
                  onChange={(e) => setFamilyRelation(e.target.value)}
                  className="w-full bg-card border border-border rounded-2xl px-4 h-12 outline-none text-foreground text-sm appearance-none"
                >
                  {RELATIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="my-7">
            {session && (
              <AvatarPicker userId={session.user.id} value={avatarUrl} onChange={setAvatarUrl} />
            )}
          </div>

          <div className="space-y-4">
            <Field
              icon={User}
              label={t("profile.fullName")}
              value={name}
              onChange={setName}
              placeholder={t("profile.fullNamePlaceholder")}
              autoComplete="name"
            />

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block px-1">
                {t("profile.gender")}
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-2xl">
                {(["male", "female", "other"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`h-11 rounded-xl text-sm font-medium capitalize transition-all ${
                      gender === g ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                    }`}
                  >
                    {t(`profile.gender.${g}` as never)}
                  </button>
                ))}
              </div>
            </div>

            <PlacePicker label={t("profile.village")} value={village} onChange={setVillage} />

            <div>
              <label
                htmlFor="occupation"
                className="text-xs font-medium text-muted-foreground mb-1.5 block px-1"
              >
                {t("profile.occupation")}
              </label>
              <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <Briefcase className="w-4 h-4 text-muted-foreground shrink-0" />
                <select
                  id="occupation"
                  value={occupationOther ? OCCUPATION_OTHER : occupation}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === OCCUPATION_OTHER) {
                      setOccupationOther(true);
                      setOccupation("");
                    } else {
                      setOccupationOther(false);
                      setOccupation(v);
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-foreground appearance-none"
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

            {/* Occupation is free text in the database — the presets above are a
                shortcut, not the whole space. Anyone whose work isn't listed
                falls back to typing it, the same escape hatch PlacePicker gives
                villages. */}
            {occupationOther && (
              <Field
                icon={Briefcase}
                label={t("profile.occupationOtherLabel")}
                value={occupation}
                onChange={setOccupation}
                placeholder={t("profile.occupationOtherPlaceholder")}
              />
            )}

            <div>
              <label
                htmlFor="dob"
                className="text-xs font-medium text-muted-foreground mb-1.5 block px-1"
              >
                {t("profile.dob")}
              </label>
              <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  max={new Date().toISOString().slice(0, 10)}
                  className="flex-1 bg-transparent outline-none text-foreground [color-scheme:light]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="marital"
                className="text-xs font-medium text-muted-foreground mb-1.5 block px-1"
              >
                {t("profile.maritalStatus")}
              </label>
              <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <Heart className="w-4 h-4 text-muted-foreground shrink-0" />
                <select
                  id="marital"
                  value={marital}
                  onChange={(e) => setMarital(e.target.value as MaritalStatus)}
                  className="flex-1 bg-transparent outline-none text-foreground appearance-none"
                >
                  <option value="" disabled>
                    {t("account.select")}
                  </option>
                  {MARITAL_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {t(`profile.marital.${m}` as never)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {joiningFamily ? (
              <div className="pt-2">
                <div className="rounded-2xl border-2 border-primary bg-primary-soft p-4">
                  <div className="font-semibold text-foreground text-sm">
                    {t("profile.familyAdminSkipped")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {t("profile.familyCodeMatch", { name: familyPreview.admin_name ?? "" })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  {t("profile.familyAdminQuestion")}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["yes", "no"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setAdmin(v)}
                      className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                        admin === v ? "border-primary bg-primary-soft" : "border-border bg-card"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center absolute top-3 right-3 ${
                          admin === v ? "border-primary bg-primary" : "border-border"
                        }`}
                      >
                        {admin === v && (
                          <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                        )}
                      </div>
                      <div className="text-2xl mb-1">{v === "yes" ? "👨‍👩‍👧" : "🙋"}</div>
                      <div className="font-semibold text-foreground capitalize">
                        {v === "yes" ? t("profile.familyAdminYes") : t("profile.familyAdminNo")}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {v === "yes" ? "Manage family members" : "Join existing family"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 px-6 py-4 bg-background/90 backdrop-blur-xl border-t border-border/50">
          {error && <p className="text-sm text-destructive mb-3">{error}</p>}
          <button
            onClick={() => void handleSave()}
            disabled={!canSubmit || saving}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> {t("profile.saving")}
              </>
            ) : (
              t("profile.save")
            )}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
