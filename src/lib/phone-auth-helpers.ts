import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth";
import { firebaseAuth } from "@/integrations/firebase/client";
import { supabase } from "@/integrations/supabase/client";
import { bridgeFirebasePhoneLogin } from "@/lib/phone-auth.functions";

/** India-only for v1: 10 digits, starting 6-9 (matches TRAI mobile numbering). */
const indianMobilePattern = /^[6-9]\d{9}$/;

export function isValidIndianMobile(digits: string) {
  return indianMobilePattern.test(digits.trim());
}

export function toE164India(digits: string) {
  return `+91${digits.trim()}`;
}

/**
 * Checks registration before ever calling Firebase, so an SMS is never spent
 * on a signup that would just be rejected as a dupe, or a login for a number
 * with no account — mirrors `email_registered` / `shouldCreateUser: false`.
 *
 * `phone_registered` predates the last `supabase gen types` run, hence the cast.
 */
export async function isPhoneRegistered(e164Phone: string): Promise<boolean> {
  const { data, error } = await supabase.rpc(
    "phone_registered" as never,
    {
      check_phone: e164Phone,
    } as never,
  );
  if (error) throw error;
  return Boolean(data);
}

/**
 * Binds an invisible reCAPTCHA to a container the caller mounts. Not cached
 * at module scope: each login/signup route mount owns its own instance (via
 * `useRef`) and must call `.clear()` on unmount, since a cached verifier
 * would otherwise point at a DOM node from a route the SPA already left.
 */
export function createRecaptchaVerifier(containerId: string): RecaptchaVerifier {
  return new RecaptchaVerifier(firebaseAuth, containerId, { size: "invisible" });
}

/** Sends a 6-digit SMS code to an E.164 number via Firebase Phone Auth. */
export async function sendPhoneOtp(
  e164Phone: string,
  verifier: RecaptchaVerifier,
): Promise<ConfirmationResult> {
  return signInWithPhoneNumber(firebaseAuth, e164Phone, verifier);
}

interface PhoneAuthResult {
  data: { session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"] };
  error: { message: string } | null;
}

/**
 * Confirms the SMS code with Firebase (proving phone ownership), bridges that
 * proof to a Supabase-issued sign-in code via `bridgeFirebasePhoneLogin`, then
 * redeems it the same way the email flow redeems its emailed code — so both
 * paths end at the same `supabase.auth.verifyOtp` call and the same session shape.
 */
export async function verifyPhoneOtpAndSignIn(
  confirmationResult: ConfirmationResult,
  code: string,
  createUser: boolean,
): Promise<PhoneAuthResult> {
  let idToken: string;
  try {
    const credential = await confirmationResult.confirm(code.trim());
    idToken = await credential.user.getIdToken();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Incorrect verification code.";
    return { data: { session: null }, error: { message } };
  }

  const bridged = await bridgeFirebasePhoneLogin({ data: { idToken, createUser } });

  if (!bridged.ok) {
    const message =
      bridged.reason === "not_registered"
        ? "No account found for this number. Please sign up first."
        : "Something went wrong. Please try again.";
    return { data: { session: null }, error: { message } };
  }

  const { data, error } = await supabase.auth.verifyOtp({
    email: bridged.email,
    token: bridged.otp,
    type: "email",
  });
  return { data: { session: data.session }, error: error ? { message: error.message } : null };
}
