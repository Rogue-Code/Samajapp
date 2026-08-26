import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Globe, HelpCircle, Loader2, Mail } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Logo } from "@/components/Logo";
import { OtpInput } from "@/components/OtpInput";
import { supabase } from "@/integrations/supabase/client";
import {
  destinationAfterLogin,
  friendlyAuthError,
  isValidEmail,
  sendEmailOtp,
  verifyEmailOtp,
} from "@/lib/auth-helpers";

export const Route = createLazyFileRoute("/")({
  component: LoginPage,
});

/** Seconds before the member may ask for another code. */
const RESEND_DELAY = 45;

function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        const dest = await destinationAfterLogin();
        if (!cancelled) navigate({ to: dest });
        return;
      }
      setChecking(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  const sendCode = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (loading) return;
    setError("");
    setLoading(true);
    // createUser stays false here: an unknown address should say so rather than
    // quietly create an account from the login screen.
    const { error: otpError } = await sendEmailOtp(email, false);
    setLoading(false);
    if (otpError) {
      setError(friendlyAuthError(otpError.message));
      return;
    }
    setCode("");
    setStep("code");
    setCooldown(RESEND_DELAY);
  };

  const verify = async () => {
    if (code.length !== 6 || loading) return;
    setError("");
    setLoading(true);
    const { data, error: verifyError } = await verifyEmailOtp(email, code);
    if (verifyError || !data.session) {
      setError(friendlyAuthError(verifyError?.message));
      setCode("");
      setLoading(false);
      return;
    }
    const dest = await destinationAfterLogin();
    navigate({ to: dest });
  };

  useEffect(() => {
    if (step === "code" && code.length === 6 && !loading) void verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, step]);

  if (checking) {
    return (
      <PhoneFrame>
        <div className="flex min-h-screen md:min-h-[860px] flex-col items-center justify-center gap-3 px-6">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading Sangath…</p>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-10 fade-up">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center shadow-card overflow-hidden">
              <Logo className="w-8 h-8" />
            </div>
            <span className="font-semibold text-foreground">Sangath</span>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted">
            <Globe className="w-3.5 h-3.5" /> EN
          </button>
        </div>

        <div className="flex-1 flex flex-col fade-up" style={{ animationDelay: "60ms" }}>
          {step === "email" ? (
            <>
              <div className="w-20 h-20 rounded-3xl bg-card border border-border flex items-center justify-center mb-6 shadow-elevated overflow-hidden">
                <Logo className="w-16 h-16" />
              </div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight leading-tight">
                Welcome to Sangath
              </h1>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                Connect with your family & community digitally. Trusted by 50,000+ families across
                India.
              </p>

              <form
                className="mt-10 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  void sendCode();
                }}
              >
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-base"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 px-1">
                    We'll email you a 6-digit code to sign in. No password needed.
                  </p>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button
                  type="submit"
                  disabled={!isValidEmail(email) || loading}
                  className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending code...
                    </>
                  ) : (
                    "Send login code"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                New to Sangath?{" "}
                <button
                  type="button"
                  onClick={() => navigate({ to: "/signup" })}
                  className="font-semibold text-primary"
                >
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("email")}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition mb-6"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>

              <h1 className="text-3xl font-bold text-foreground tracking-tight">Enter the code</h1>
              <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">{email}</span>. It expires in a few
                minutes.
              </p>

              <div className="mt-8">
                <OtpInput value={code} onChange={setCode} error={Boolean(error)} />

                {error && <p className="text-sm text-destructive mt-4">{error}</p>}

                <button
                  type="button"
                  onClick={() => void verify()}
                  disabled={code.length !== 6 || loading}
                  className="mt-6 w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
                    </>
                  ) : (
                    "Verify & continue"
                  )}
                </button>

                <div className="mt-5 text-center text-sm text-muted-foreground">
                  Didn't get it?{" "}
                  {cooldown > 0 ? (
                    <span>Resend in {cooldown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void sendCode()}
                      className="font-semibold text-primary"
                    >
                      Resend code
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-muted-foreground">
          <button className="flex items-center gap-1 hover:text-foreground transition">
            <HelpCircle className="w-3.5 h-3.5" /> Help
          </button>
          <span className="w-1 h-1 rounded-full bg-border" />
          <button className="hover:text-foreground transition">Contact Support</button>
        </div>
        <p className="text-[11px] text-center text-muted-foreground mt-4 leading-relaxed">
          By continuing you agree to our{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/terms" })}
            className="text-primary font-medium underline underline-offset-2"
          >
            Terms
          </button>{" "}
          &{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/privacy" })}
            className="text-primary font-medium underline underline-offset-2"
          >
            Privacy Policy
          </button>
        </p>
      </div>
    </PhoneFrame>
  );
}
