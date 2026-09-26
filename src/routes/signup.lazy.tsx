import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, Smartphone } from "lucide-react";
import type { RecaptchaVerifier } from "firebase/auth";
import { PhoneFrame } from "@/components/PhoneFrame";
import { OtpInput } from "@/components/OtpInput";
import { useT } from "@/lib/i18n";
import { destinationAfterLogin, friendlyAuthError } from "@/lib/auth-helpers";
import {
  createRecaptchaVerifier,
  isPhoneRegistered,
  isValidIndianMobile,
  sendPhoneOtp,
  toE164India,
  verifyPhoneOtpAndSignIn,
  type PhoneAuthSession,
} from "@/lib/phone-auth-helpers";

export const Route = createLazyFileRoute("/signup")({
  component: SignupPage,
});

/** Seconds before the member may ask for another code. */
const RESEND_DELAY = 45;

// Mobile-only sign-up — see index.lazy.tsx for the matching removal on login
// and why this is a deliberate, known trade-off rather than an oversight.
function SignupPage() {
  const navigate = useNavigate();
  const t = useT();
  const [step, setStep] = useState<"mobile" | "code">("mobile");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const phoneSessionRef = useRef<PhoneAuthSession | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    return () => recaptchaRef.current?.clear();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  const sendCode = async () => {
    if (!isValidIndianMobile(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (loading) return;
    setError("");
    setLoading(true);

    const e164 = toE164India(mobile);
    let session: PhoneAuthSession;
    try {
      if (await isPhoneRegistered(e164)) {
        setLoading(false);
        setError("This number is already registered. Try logging in instead.");
        return;
      }
      // A fresh verifier every attempt, not just the first — see the matching
      // comment in index.lazy.tsx for why reusing one produces
      // auth/invalid-app-credential on any retry.
      recaptchaRef.current?.clear();
      recaptchaRef.current = createRecaptchaVerifier("recaptcha-container");
      session = await sendPhoneOtp(e164, recaptchaRef.current);
    } catch (err) {
      setLoading(false);
      setError(friendlyAuthError(err instanceof Error ? err.message : undefined));
      return;
    }
    phoneSessionRef.current = session;

    if (session.kind === "native-auto") {
      // Play Integrity verified the device instantly — there's no code for
      // the member to enter, so finish signing up instead of showing the
      // code step at all.
      const { data, error: verifyError } = await verifyPhoneOtpAndSignIn(session, "", true);
      setLoading(false);
      if (verifyError || !data.session) {
        setError(friendlyAuthError(verifyError?.message));
        return;
      }
      const dest = await destinationAfterLogin(data.session.user.id);
      navigate({ to: dest });
      return;
    }
    setLoading(false);
    setCode("");
    setStep("code");
    setCooldown(RESEND_DELAY);
  };

  const verify = async () => {
    if (code.length !== 6 || loading) return;
    setError("");
    setLoading(true);
    const { data, error: verifyError } = await verifyPhoneOtpAndSignIn(
      phoneSessionRef.current!,
      code,
      true,
    );
    if (verifyError || !data.session) {
      setError(friendlyAuthError(verifyError?.message));
      setCode("");
      setLoading(false);
      return;
    }
    const dest = await destinationAfterLogin(data.session.user.id);
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
          onClick={() => (step === "code" ? setStep("mobile") : navigate({ to: "/" }))}
          className="w-11 h-11 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
          aria-label={t("common.back")}
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {step === "mobile" ? (
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
                  {t("common.mobileNumber")}
                </label>
                <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground text-base">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder={t("common.mobilePlaceholder")}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-base"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 px-1">{t("signup.mobileHelp")}</p>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={!isValidIndianMobile(mobile) || loading}
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

              {/*
                No checkbox: creating the account itself is treated as
                agreement, the same passive-consent pattern the login screen
                already uses. Worth knowing — India's DPDP Act expects consent
                for data collection to come from "a clear affirmative action",
                and a checkbox is the standard way to demonstrate that
                specifically on a new signup (a returning member logging in is
                a weaker case for requiring it again). This is a real
                trade-off, made deliberately, not an oversight.
              */}
              <p className="text-xs text-muted-foreground leading-relaxed text-center">
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
            </form>
          </>
        ) : (
          <>
            <div className="mt-6 fade-up">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                {t("otp.title")}
              </h1>
              <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                {t("otp.sentToPrefix")}{" "}
                <span className="font-medium text-foreground">{toE164India(mobile)}</span>
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
        <div id="recaptcha-container" />
      </div>
    </PhoneFrame>
  );
}
