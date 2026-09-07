import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";

export const Route = createLazyFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });
    supabase.auth.getSession().then(({ data: sessionData }) => {
      if (sessionData.session) setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const canSubmit = password.length >= 8 && password === confirm && ready;

  const handleReset = async () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!ready) {
      setError("Open the reset link from your email first.");
      return;
    }
    setError("");
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(friendlyAuthError(updateError.message));
      setLoading(false);
      return;
    }
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] px-6 pt-12 pb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Reset password</h1>
        <p className="text-muted-foreground mt-2 text-base">
          Choose a new password, then log in with it. Passwords are never stored on this device.
        </p>

        {!ready && (
          <p className="mt-4 text-sm text-muted-foreground">
            Waiting for the reset link from your email. If you opened this page directly, go back to
            Forgot Password.
          </p>
        )}

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void handleReset();
          }}
        >
          <PasswordField
            label="New password"
            value={password}
            onChange={setPassword}
            show={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
          />
          <PasswordField
            label="Confirm new password"
            value={confirm}
            onChange={setConfirm}
            show={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Saving...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Back to Login
        </button>
      </div>
    </PhoneFrame>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>
      <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
        <Lock className="w-4 h-4 text-muted-foreground" />
        <input
          type={show ? "text" : "password"}
          autoComplete="new-password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-foreground text-base"
        />
        <button
          type="button"
          onClick={onToggle}
          className="text-muted-foreground"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
