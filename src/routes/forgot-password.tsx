import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { supabase } from "@/integrations/supabase/client";
import { authRedirectUrl, friendlyAuthError, isValidEmail } from "@/lib/auth-helpers";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
  head: () => ({ meta: [{ title: "Forgot Password — Sangath" }] }),
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: authRedirectUrl("/reset-password"),
    });
    setLoading(false);
    if (resetError) {
      setError(friendlyAuthError(resetError.message));
      return;
    }
    setSent(true);
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] px-6 pt-8 pb-8">
        <button
          onClick={() => navigate({ to: "/" })}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        <div className="mt-6 fade-up">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Forgot password</h1>
          <p className="text-muted-foreground mt-2 text-base leading-relaxed">
            Enter your email and we will send a password reset link. You will set a new password after opening that email.
          </p>
        </div>

        {sent ? (
          <div className="mt-10 fade-up">
            <p className="text-base text-foreground leading-relaxed">
              If an account exists for <span className="font-medium">{email.trim()}</span>, a reset email is on its way.
            </p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="mt-8 w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated active:scale-[0.98]"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form
            className="mt-8 fade-up"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSend();
            }}
          >
            <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
            <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-base"
              />
            </div>
            {error && <p className="text-sm text-destructive mt-3">{error}</p>}
            <button
              type="submit"
              disabled={!isValidEmail(email) || loading}
              className="mt-8 w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                </>
              ) : (
                "Send reset email"
              )}
            </button>
          </form>
        )}
      </div>
    </PhoneFrame>
  );
}
