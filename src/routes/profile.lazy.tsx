import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, User, Briefcase, Heart, Calendar, Check, Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { AvatarPicker } from "@/components/AvatarPicker";
import { PlacePicker } from "@/components/PlacePicker";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useT } from "@/lib/i18n";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";
import { MARITAL_OPTIONS, type MaritalStatus } from "@/lib/profile-options";

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
  const [marital, setMarital] = useState<MaritalStatus>("Single");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(null);
  const [admin, setAdmin] = useState<"yes" | "no" | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  const canSubmit = name && village && occupation && dob && gender && admin;

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
        is_family_admin: admin === "yes",
        profile_completed: true,
      })
      .eq("id", session.user.id);
    setSaving(false);
    if (saveError) {
      setError(friendlyAuthError(saveError.message));
      return;
    }
    navigate({ to: "/home" });
  };

  if (checking) return <LoadingScreen />;

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px]">
        <div className="px-6 pt-8 pb-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
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
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <span className="text-xs font-semibold text-muted-foreground">
                {t("profile.lastStep")}
              </span>
            </div>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-primary to-accent-saffron rounded-full transition-all" />
          </div>
        </div>

        <div className="flex-1 px-6 py-6 pb-32 fade-up">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {t("profile.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{t("profile.subtitle")}</p>

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
            <Field
              icon={Briefcase}
              label={t("profile.occupation")}
              value={occupation}
              onChange={setOccupation}
              placeholder={t("profile.occupationPlaceholder")}
            />
            <Field
              icon={Calendar}
              label={t("profile.dob")}
              value={dob}
              onChange={setDob}
              placeholder={t("profile.dobPlaceholder")}
            />

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
                  {MARITAL_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {t(`profile.marital.${m}` as never)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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
