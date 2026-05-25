import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Shield } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";

export const Route = createFileRoute("/otp")({
  component: OtpPage,
  head: () => ({ meta: [{ title: "Verify OTP — Samaj Connect" }] }),
});

function OtpPage() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const phone = typeof window !== "undefined" ? sessionStorage.getItem("phone") || "9876543210" : "9876543210";
  const masked = `+91 ${phone.slice(0, 2)}XXXXX${phone.slice(-3)}`;

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleChange = (i: number, v: string) => {
    const ch = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    setError(false);
    if (ch && i < 5) refs.current[i + 1]?.focus();
    if (next.every((d) => d) && next.join("").length === 6) {
      verify(next.join(""));
    }
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const verify = (code: string) => {
    if (code === "000000") {
      setError(true);
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate({ to: "/profile" }), 900);
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] px-6 pt-8 pb-8">
        <button onClick={() => navigate({ to: "/" })} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        <div className="mt-6 fade-up">
          <div className="w-14 h-14 rounded-2xl bg-primary-soft flex items-center justify-center mb-5">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Verify OTP</h1>
          <p className="text-muted-foreground mt-2 text-base">
            We sent a 6-digit OTP to <span className="font-medium text-foreground">{masked}</span>
          </p>
        </div>

        {success ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-success flex items-center justify-center scale-pop shadow-elevated">
              <Check className="w-12 h-12 text-success-foreground" strokeWidth={3} />
            </div>
            <p className="mt-6 text-lg font-semibold text-foreground">Verified successfully</p>
            <p className="text-sm text-muted-foreground mt-1">Setting up your profile...</p>
          </div>
        ) : (
          <>
            <div className={`flex gap-2 mt-10 ${error ? "shake" : ""}`}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { refs.current[i] = el; }}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKey(i, e)}
                  inputMode="numeric"
                  maxLength={1}
                  className={`w-full aspect-square text-center text-2xl font-bold rounded-2xl border-2 bg-card outline-none transition-all ${
                    error ? "border-destructive text-destructive" : d ? "border-primary text-primary bg-primary-soft" : "border-border text-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
                  }`}
                />
              ))}
            </div>
            {error && <p className="text-sm text-destructive mt-3">Incorrect OTP. Please try again.</p>}

            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {timer > 0 ? `Resend in 00:${String(timer).padStart(2, "0")}` : "Didn't get the code?"}
              </span>
              <button
                disabled={timer > 0}
                onClick={() => setTimer(30)}
                className="font-semibold text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                Resend OTP
              </button>
            </div>

            <button
              onClick={() => verify(digits.join(""))}
              disabled={digits.join("").length !== 6}
              className="mt-10 h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98]"
            >
              Verify & Continue
            </button>

            <button onClick={() => navigate({ to: "/" })} className="mt-4 text-sm text-muted-foreground hover:text-foreground">
              Change mobile number
            </button>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}
