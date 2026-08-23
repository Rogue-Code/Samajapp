import { supabase } from "@/integrations/supabase/client";

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Email only — never store passwords in session/local storage. */
export const PENDING_EMAIL_KEY = "sangath.pendingEmail";

export function authRedirectUrl(path: string) {
  if (typeof window === "undefined") return undefined;
  return `${window.location.origin}${path}`;
}

export function rememberPendingEmail(email: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_EMAIL_KEY, email.trim());
}

export function readPendingEmail() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(PENDING_EMAIL_KEY)?.trim() ?? "";
}

export function clearPendingEmail() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_EMAIL_KEY);
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

/** Where a signed-in member should land: Home when their profile is set up, otherwise profile setup. */
export async function destinationAfterLogin(): Promise<"/home" | "/profile"> {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return "/profile";
  const { data } = await supabase
    .from("profiles")
    .select("profile_completed")
    .eq("id", userId)
    .maybeSingle();
  return data?.profile_completed ? "/home" : "/profile";
}

/** Human-friendly copy for auth errors; never surfaces raw provider internals. */
export function friendlyAuthError(message: string | undefined): string {
  const m = (message ?? "").toLowerCase();
  if (m.includes("invalid login credentials")) return "Incorrect email or password. Please try again.";
  if (m.includes("email not confirmed")) return "Please verify your email address before logging in.";
  if (m.includes("already registered") || m.includes("already been registered") || m.includes("user already"))
    return "This email is already registered. Try logging in instead.";
  if (m.includes("expired")) return "This code has expired. Please request a new one.";
  if (m.includes("invalid") && m.includes("token")) return "Incorrect verification code. Please try again.";
  if (m.includes("otp")) return "Incorrect or expired verification code. Please request a new one.";
  if (m.includes("rate limit") || m.includes("too many") || m.includes("security purposes"))
    return "Too many attempts. Please wait a moment before trying again.";
  if (m.includes("weak") || m.includes("password should")) return "Please choose a stronger password.";
  return message || "Something went wrong. Please try again.";
}
