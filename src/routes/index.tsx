import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, HelpCircle, Globe, MessageCircle, Users, Loader2 } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Samaj Connect — Login" },
      { name: "description", content: "Connect with your family & community digitally." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const valid = /^[6-9]\d{9}$/.test(phone);

  const handleSend = () => {
    if (!valid) return;
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem("phone", phone);
      navigate({ to: "/otp" });
    }, 900);
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-screen md:min-h-[860px] px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-10 fade-up">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center shadow-card overflow-hidden">
              <Logo className="w-8 h-8" />
            </div>
            <span className="font-semibold text-foreground">Samaj Connect</span>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted">
            <Globe className="w-3.5 h-3.5" /> EN
          </button>
        </div>

        <div className="flex-1 flex flex-col fade-up" style={{ animationDelay: "60ms" }}>
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center mb-6 shadow-elevated">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight leading-tight">
            Welcome to your<br />Samaj community
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            Connect with your family & community digitally. Trusted by 50,000+ families across India.
          </p>

          <div className="mt-10">
            <label className="text-sm font-medium text-foreground mb-2 block">Mobile Number</label>
            <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
              <div className="flex items-center gap-1.5 pr-3 border-r border-border">
                <span className="text-lg">🇮🇳</span>
                <span className="font-medium text-foreground">+91</span>
              </div>
              <Phone className="w-4 h-4 text-muted-foreground" />
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="98765 43210"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-base"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 px-1">
              We'll send you a 6-digit verification code.
            </p>
          </div>

          <button
            onClick={handleSend}
            disabled={!valid || loading}
            className="mt-8 h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending OTP...</> : "Send OTP"}
          </button>

          <div className="flex items-center gap-2 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="h-12 rounded-2xl border border-border bg-card font-medium text-foreground flex items-center justify-center gap-2 active:scale-[0.98] transition">
            <MessageCircle className="w-4 h-4" /> Continue with WhatsApp
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-muted-foreground">
          <button className="flex items-center gap-1 hover:text-foreground transition"><HelpCircle className="w-3.5 h-3.5" /> Help</button>
          <span className="w-1 h-1 rounded-full bg-border" />
          <button className="hover:text-foreground transition">Contact Support</button>
        </div>
        <p className="text-[11px] text-center text-muted-foreground mt-4 leading-relaxed">
          By continuing you agree to our <span className="text-primary font-medium">Terms</span> & <span className="text-primary font-medium">Privacy Policy</span>
        </p>
      </div>
    </PhoneFrame>
  );
}
