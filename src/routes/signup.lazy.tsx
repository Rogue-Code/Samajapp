import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { OtpInput } from "@/components/OtpInput";
import { useT } from "@/lib/i18n";
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
  const t = useT();
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
          className="w-11 h-11 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
          aria-label={t("common.back")}
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {step === "email" ? (
          <>
            <div className="mt-6 fade-up">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                {t("signup.title")}
              </h1>
              <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                {t("signup.subtitle")}
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
                  {t("common.emailAddress")}
                </label>
                <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("common.emailPlaceholder")}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-base"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 px-1">{t("signup.emailHelp")}</p>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={!isValidEmail(email) || loading}
                className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> {t("login.sendingCode")}
                  </>
                ) : (
                  t("signup.sendCode")
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="mt-6 fade-up">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                {t("otp.title")}
              </h1>
              <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                {t("otp.sentToPrefix")} <span className="font-medium text-foreground">{email}</span>
                {t("otp.sentToSuffix")}
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
                    <Loader2 className="w-5 h-5 animate-spin" /> {t("otp.verifying")}
                  </>
                ) : (
                  t("otp.verify")
                )}
              </button>

              <div className="mt-5 text-center text-sm text-muted-foreground">
                {t("otp.didntGet")}{" "}
                {cooldown > 0 ? (
                  <span>{t("otp.resendIn", { seconds: cooldown })}</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => void sendCode()}
                    className="font-semibold text-primary"
                  >
                    {t("otp.resend")}
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        <p className="mt-auto pt-6 text-center text-sm text-muted-foreground">
          {t("signup.haveAccount")}{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="font-semibold text-primary"
          >
            {t("signup.login")}
          </button>
        </p>

        <p className="mt-4 text-[11px] text-center text-muted-foreground leading-relaxed">
          {t("signup.consentPrefix")}{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/terms" })}
            className="text-primary font-medium underline underline-offset-2"
          >
            {t("common.terms")}
          </button>{" "}
          {t("signup.consentMiddle")}{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/privacy" })}
            className="text-primary font-medium underline underline-offset-2"
          >
            {t("common.privacyPolicy")}
          </button>
          {t("signup.consentSuffix")}
        </p>
      </div>
    </PhoneFrame>
  );
}
