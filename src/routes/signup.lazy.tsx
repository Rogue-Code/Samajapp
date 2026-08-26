import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { OtpInput } from "@/components/OtpInput";
import {
  destinationAfterLogin,
  friendlyAuthError,
  isValidEmail,
  sendEmailOtp,
  verifyEmailOtp,
} from "@/lib/auth-helpers";

export const Route = createLazyFileRoute("/signup")({
  component: SignupPage,
});

/** Seconds before the member may ask for another code. */
const RESEND_DELAY = 45;

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

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
    const { error: otpError } = await sendEmailOtp(email, true);
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

  // Submit as soon as all six digits are in — saves a tap on mobile.
  useEffect(() => {
    if (step === "code" && code.length === 6 && !loading) void verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, step]);

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] px-6 pt-8 pb-8">
        <button
          onClick={() => (step === "code" ? setStep("email") : navigate({ to: "/" }))}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {step === "email" ? (
          <>
            <div className="mt-6 fade-up">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Create your account
              </h1>
              <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                Enter your email and we'll send you a 6-digit code to verify it. No password needed.
              </p>
            </div>

            <form
              className="mt-8 space-y-4 fade-up"
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
                  We'll only use this to sign you in and keep your account secure.
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
                  "Send verification code"
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="mt-6 fade-up">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Enter the code</h1>
              <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">{email}</span>. It expires in a few
                minutes.
              </p>
            </div>

            <div className="mt-8 fade-up">
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

        <p className="mt-auto pt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="font-semibold text-primary"
          >
            Login
          </button>
        </p>

        <p className="mt-4 text-[11px] text-center text-muted-foreground leading-relaxed">
          By creating an account you agree to our{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/terms" })}
            className="text-primary font-medium underline underline-offset-2"
          >
            Terms
          </button>{" "}
          and confirm you have read our{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/privacy" })}
            className="text-primary font-medium underline underline-offset-2"
          >
            Privacy Policy
          </button>
          , including who in the community can see your mobile number.
        </p>
      </div>
    </PhoneFrame>
  );
}
