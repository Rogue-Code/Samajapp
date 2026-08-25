import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, HelpCircle, Globe, Loader2, Lock, Mail } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import {
  destinationAfterLogin,
  friendlyAuthError,
  isValidEmail,
} from "@/lib/auth-helpers";

export const Route = createLazyFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const valid = isValidEmail(email) && password.length > 0;

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

  const handleLogin = async () => {
    if (!valid || loading) return;
    setError("");
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (authError) {
      setError(friendlyAuthError(authError.message));
      setLoading(false);
      return;
    }
    const dest = await destinationAfterLogin();
    navigate({ to: dest });
  };

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
          <div className="w-20 h-20 rounded-3xl bg-card border border-border flex items-center justify-center mb-6 shadow-elevated overflow-hidden">
            <Logo className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight leading-tight">
            Welcome to Sangath
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            Connect with your family & community digitally. Trusted by 50,000+ families across India.
          </p>

          <form
            className="mt-10 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void handleLogin();
            }}
          >
            <div>
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
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
              <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 h-14 shadow-soft focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate({ to: "/forgot-password" })}
                className="text-sm font-semibold text-primary"
              >
                Forgot Password
              </button>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={!valid || loading}
              className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated transition-all disabled:opacity-40 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Signing in...
                </>
              ) : (
                "Login"
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
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-muted-foreground">
          <button className="flex items-center gap-1 hover:text-foreground transition">
            <HelpCircle className="w-3.5 h-3.5" /> Help
          </button>
          <span className="w-1 h-1 rounded-full bg-border" />
          <button className="hover:text-foreground transition">Contact Support</button>
        </div>
        <p className="text-[11px] text-center text-muted-foreground mt-4 leading-relaxed">
          By continuing you agree to our <span className="text-primary font-medium">Terms</span> &{" "}
          <span className="text-primary font-medium">Privacy Policy</span>
        </p>
      </div>
    </PhoneFrame>
  );
}
