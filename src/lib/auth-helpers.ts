import { supabase } from "@/integrations/supabase/client";

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function authRedirectUrl(path: string) {
  if (typeof window === "undefined") return undefined;
  return `${window.location.origin}${path}`;
}

export function isValidEmail(value: string) {
  return emailPattern.test(value.trim());
}

export interface PasswordRule {
  label: string;
  passed: boolean;
}

export function passwordRules(password: string): PasswordRule[] {
  return [
    { label: "Minimum 8 characters", passed: password.length >= 8 },
    { label: "At least one uppercase letter", passed: /[A-Z]/.test(password) },
    { label: "At least one number", passed: /\d/.test(password) },
    { label: "At least one special character", passed: /[^A-Za-z0-9]/.test(password) },
  ];
}

export function isStrongPassword(password: string) {
  return passwordRules(password).every((r) => r.passed);
}

/**
 * Where a signed-in member should land: Home when their profile is set up,
 * otherwise profile setup.
 *
 * Takes the user id from the caller's own already-verified session/sign-in
 * result rather than re-deriving it here via `supabase.auth.getUser()` — that
 * method re-checks the JWT against the server on every call, a network round
 * trip this decision doesn't need. It used to: offline (e.g. a cold start
 * in airplane mode, right after `getSession()` confirmed a valid *local*
 * session), that call would fail, `userData.user` would come back empty, and
 * this returned "/profile" — sending a fully set-up member into the empty
 * setup wizard ("Family Code", "Are you the Family Admin?") instead of their
 * own account. To that member it looks exactly like their profile vanished.
 */
export async function destinationAfterLogin(userId: string): Promise<"/home" | "/profile"> {
  const { data, error } = await supabase
    .from("profiles")
    .select("profile_completed")
    .eq("id", userId)
    .maybeSingle();
  // Same reasoning as above, one step further down: a failed check (still
  // offline) must not read as "profile incomplete" either. Default home —
  // its screens degrade to blank/offline (see the offline banner in
  // PhoneFrame) rather than this screen lying about needing setup again.
  if (error) return "/home";
  return data?.profile_completed ? "/home" : "/profile";
}

/** Human-friendly copy for auth errors; never surfaces raw provider internals. */
export function friendlyAuthError(message: string | undefined): string {
  const m = (message ?? "").toLowerCase();
  // Firebase Phone Auth error codes (e.g. "Firebase: Error (auth/invalid-verification-code).")
  // reach here too, since the phone-login path reuses this same helper.
  if (m.includes("invalid-phone-number")) return "Please enter a valid mobile number.";
  if (m.includes("invalid-verification-code"))
    return "Incorrect verification code. Please try again.";
  if (m.includes("too-many-requests") || m.includes("quota-exceeded"))
    return "Too many attempts. Please wait a moment before trying again.";
  if (m.includes("invalid login credentials"))
    return "Incorrect email or password. Please try again.";
  if (m.includes("signups not allowed") || m.includes("user not found"))
    return "No account found for this email. Please sign up first.";
  if (m.includes("email not confirmed"))
    return "Please verify your email address before logging in.";
  if (
    m.includes("already registered") ||
    m.includes("already been registered") ||
    m.includes("user already")
  )
    return "This email is already registered. Try logging in instead.";
  if (m.includes("expired")) return "This code has expired. Please request a new one.";
  if (m.includes("invalid") && m.includes("token"))
    return "Incorrect verification code. Please try again.";
  if (m.includes("otp")) return "Incorrect or expired verification code. Please request a new one.";
  if (m.includes("rate limit") || m.includes("too many") || m.includes("security purposes"))
    return "Too many attempts. Please wait a moment before trying again.";
  if (m.includes("weak") || m.includes("password should"))
    return "Please choose a stronger password.";
  return message || "Something went wrong. Please try again.";
}
