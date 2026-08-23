import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Loader2, Mail } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { supabase } from "@/integrations/supabase/client";
import {
  authRedirectUrl,
  destinationAfterLogin,
  friendlyAuthError,
  readPendingEmail,
} from "@/lib/auth-helpers";

export const Route = createFileRoute("/otp")({
  component: VerifyEmailPage,
  head: () => ({ meta: [{ title: "Verify Email — Sangath" }] }),
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);
  const [continuing, setContinuing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setEmail(readPendingEmail());
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === "SIGNED_IN" || event === "USER_UPDATED") && session?.user?.email_confirmed_at) {
        setVerified(true);
        const dest = await destinationAfterLogin();
        navigate({ to: dest });
      }
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  const handleResend = async () => {
    if (!email || timer > 0 || resending) return;
    setError("");
    setNotice("");
    setResending(true);
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: authRedirectUrl("/otp") },
    });
    setResending(false);
    if (resendError) {
      setError(friendlyAuthError(resendError.message));
      return;
    }
    setNotice("Verification email sent again. Check your inbox.");
    setTimer(30);
  };

  const handleContinue = async () => {
    setError("");
    setContinuing(true);
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError || !data.user) {
      setContinuing(false);
      setError("Email not verified yet. Open the link we sent, then try Continue.");
      return;
    }
    if (!data.user.email_confirmed_at) {
      setContinuing(false);
      setError("Email not verified yet. Open the link we sent, then try Continue.");
      return;
    }
    setVerified(true);
    const dest = await destinationAfterLogin();
    navigate({ to: dest });
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] px-6 pt-8 pb-8">
        <button
          onClick={() => navigate({ to: "/signup" })}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {verified ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-success flex items-center justify-center scale-pop shadow-elevated">
              <Check className="w-12 h-12 text-success-foreground" strokeWidth={3} />
            </div>
            <p className="mt-6 text-lg font-semibold text-foreground">Email verified</p>
            <p className="text-sm text-muted-foreground mt-1">Taking you to Sangath…</p>
          </div>
        ) : (
          <>
            <div className="mt-6 fade-up">
              <div className="w-14 h-14 rounded-2xl bg-primary-soft flex items-center justify-center mb-5">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Verify your email</h1>
              <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                We sent a verification link to{" "}
                <span className="font-medium text-foreground">{email || "your email address"}</span>.
                Open that email and tap the link to confirm your account. This is not an SMS code.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {timer > 0 ? `Resend in 00:${String(timer).padStart(2, "0")}` : "Didn't get the email?"}
              </span>
              <button
                disabled={timer > 0 || resending || !email}
                onClick={() => void handleResend()}
                className="font-semibold text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                {resending ? "Sending..." : "Resend verification email"}
              </button>
            </div>

            {notice && <p className="text-sm text-success mt-3">{notice}</p>}
            {error && <p className="text-sm text-destructive mt-3">{error}</p>}

            <button
              onClick={() => void handleContinue()}
              disabled={continuing}
              className="mt-10 h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {continuing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Checking...
                </>
              ) : (
                "Continue after verification"
              )}
            </button>

            <button
              onClick={() => navigate({ to: "/signup" })}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground"
            >
              Change email / return to signup
            </button>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}
