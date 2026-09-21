import { registerPlugin } from "@capacitor/core";

export type SendCodeResult =
  { autoRetrieved: true; idToken: string } | { autoRetrieved: false; verificationId: string };

export interface FirebasePhoneAuthPlugin {
  sendCode(options: { phoneNumber: string }): Promise<SendCodeResult>;
  confirmCode(options: { verificationId: string; code: string }): Promise<{ idToken: string }>;
}

// Backed by android/app/src/main/java/com/sangath/community/FirebasePhoneAuthPlugin.java —
// there's no web implementation, so callers must gate on Capacitor.isNativePlatform() first
// (see src/lib/phone-auth-helpers.ts, which is the only caller).
export const FirebasePhoneAuth = registerPlugin<FirebasePhoneAuthPlugin>("FirebasePhoneAuth");
