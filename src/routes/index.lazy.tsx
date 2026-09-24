import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, Mail, Smartphone } from "lucide-react";
import type { RecaptchaVerifier } from "firebase/auth";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useT } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/legal";
import { OtpInput } from "@/components/OtpInput";
import { supabase } from "@/integrations/supabase/client";
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

export const Route = createLazyFileRoute("/")({
  component: LoginPage,
});

/** Seconds before the member may ask for another code. */
const RESEND_DELAY = 45;

// Mobile-only sign-in: Sangath no longer offers email as a login method (see
// signup.lazy.tsx for the matching removal). Existing members who originally
// registered by email — before phone sign-in existed — have no self-serve way
// back in under this change; that gap is deliberate and known, not an oversight.
function LoginPage() {
  const navigate = useNavigate();
  const t = useT();
  const [step, setStep] = useState<"mobile" | "code">("mobile");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const phoneSessionRef = useRef<PhoneAuthSession | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    return () => recaptchaRef.current?.clear();
  }, []);

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
      // Firebase has no notion of "registered in our app" — check ourselves
      // first so an unknown number never burns an SMS.
      if (!(await isPhoneRegistered(e164))) {
        setLoading(false);
        setError("No account found for this number. Please sign up first.");
        return;
      }
      // A fresh verifier every attempt, not just the first: Firebase's
      // invisible reCAPTCHA token is single-use, consumed the moment
      // signInWithPhoneNumber sends it — whether that call succeeds or
      // fails. Reusing recaptchaRef.current on a retry (a typo'd number,
      // "Resend code", or any other second attempt on the same mount) hands
      // Firebase an already-spent token, which it rejects as
      // auth/invalid-app-credential rather than re-checking it.
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
      // the member to enter, so finish signing in instead of showing the
      // code step at all.
      const { data, error: verifyError } = await verifyPhoneOtpAndSignIn(session, "", false);
      setLoading(false);
      if (verifyError || !data.session) {
        setError(friendlyAuthError(verifyError?.message));
        return;
      }
      const dest = await destinationAfterLogin();
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
      false,
    );
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
          <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
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
          <LanguageToggle />
        </div>

        <div
          className="flex-1 flex flex-col justify-center fade-up"
          style={{ animationDelay: "60ms" }}
        >
          {step === "mobile" ? (
            <>
              <h1 className="text-3xl font-bold text-foreground tracking-tight leading-tight mt-4">
                {t("login.welcome")}
              </h1>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                {t("login.tagline")}
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
                  <p className="text-xs text-muted-foreground mt-2 px-1">{t("login.mobileHelp")}</p>
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
                    t("login.sendCode")
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {t("login.newHere")}{" "}
                <button
                  type="button"
                  onClick={() => navigate({ to: "/signup" })}
                  className="font-semibold text-primary"
                >
                  {t("login.signUp")}
                </button>
              </p>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("mobile")}
                className="w-11 h-11 rounded-full bg-muted flex items-center justify-center active:scale-95 transition mb-6"
                aria-label={t("common.back")}
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>

              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                {t("otp.title")}
              </h1>
              <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                {t("otp.sentToPrefix")}{" "}
                <span className="font-medium text-foreground">{toE164India(mobile)}</span>
                {t("otp.sentToSuffix")}
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
        </div>

        <div className="flex items-center justify-center mt-8 text-xs text-muted-foreground">
          {/*
            A real mailto rather than a button: there is no in-app help centre to
            send anyone to, and a member who taps this wants to reach a person.
            The address comes from legal.ts so it cannot drift from the Privacy
            Policy's stated contact.
          */}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Sangath support")}`}
            className="flex items-center gap-1.5 hover:text-foreground transition"
          >
            <Mail className="w-3.5 h-3.5" /> {t("common.contactSupport")}
          </a>
        </div>
        <p className="text-[11px] text-center text-muted-foreground mt-4 leading-relaxed">
          {t("common.byContinuingPrefix")}{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/terms" })}
            className="text-primary font-medium underline underline-offset-2"
          >
            {t("common.terms")}
          </button>{" "}
          {t("common.and")}{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/privacy" })}
            className="text-primary font-medium underline underline-offset-2"
          >
            {t("common.privacyPolicy")}
          </button>{" "}
          {t("common.byContinuingSuffix")}
        </p>
        <div id="recaptcha-container" />
      </div>
    </PhoneFrame>
  );
}
