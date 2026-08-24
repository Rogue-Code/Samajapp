import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, User, MapPin, Briefcase, Heart, Calendar, Check, Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Profile Setup — Sangath" }] }),
});

function Field({
  icon: Icon, label, value, onChange, placeholder, type = "text",
}: { icon: LucideIcon; label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; }) {
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
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
        />
      </div>
    </div>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const { checking, session } = useRequireAuth();
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [occupation, setOccupation] = useState("");
  const [marital, setMarital] = useState("Single");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(null);
  const [admin, setAdmin] = useState<"yes" | "no" | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
              aria-label="Sign out"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <span className="text-xs font-semibold text-muted-foreground">Last step</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-primary to-accent-saffron rounded-full transition-all" />
          </div>
        </div>

        <div className="flex-1 px-6 py-6 pb-32 fade-up">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Profile Setup</h1>
          <p className="text-sm text-muted-foreground mt-1">Tell us about yourself to connect with your community.</p>

          <div className="flex justify-center my-7">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-soft to-accent flex items-center justify-center border-4 border-card shadow-card">
              <User className="w-12 h-12 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <Field icon={User} label="Full Name" value={name} onChange={setName} placeholder="Ramesh Patel" />

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block px-1">Gender</label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-2xl">
                {(["male", "female", "other"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`h-10 rounded-xl text-sm font-medium capitalize transition-all ${
                      gender === g ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 px-1 leading-relaxed">
                Affects whether your mobile number is shown to other members in the directory.
              </p>
            </div>

            <Field icon={MapPin} label="Village / City" value={village} onChange={setVillage} placeholder="Anand, Gujarat" />
            <Field icon={Briefcase} label="Occupation" value={occupation} onChange={setOccupation} placeholder="Business Owner" />
            <Field icon={Calendar} label="Date of Birth" value={dob} onChange={setDob} placeholder="DD / MM / YYYY" />

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block px-1">Marital Status</label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-2xl">
                {["Single", "Married", "Other"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMarital(m)}
                    className={`h-10 rounded-xl text-sm font-medium transition-all ${
                      marital === m ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 inline mr-1" /> {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="text-sm font-semibold text-foreground mb-3 block">Are you the Family Admin?</label>
              <div className="grid grid-cols-2 gap-3">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setAdmin(v)}
                    className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                      admin === v ? "border-primary bg-primary-soft" : "border-border bg-card"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center absolute top-3 right-3 ${
                      admin === v ? "border-primary bg-primary" : "border-border"
                    }`}>
                      {admin === v && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
                    </div>
                    <div className="text-2xl mb-1">{v === "yes" ? "👨‍👩‍👧" : "🙋"}</div>
                    <div className="font-semibold text-foreground capitalize">{v === "yes" ? "Yes, I am" : "No, I'm not"}</div>
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
                <Loader2 className="w-5 h-5 animate-spin" /> Saving...
              </>
            ) : (
              "Save & Continue"
            )}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
