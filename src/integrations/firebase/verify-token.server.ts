import { createRemoteJWKSet, jwtVerify } from "jose";

// Firebase publishes the current signing keys for ID tokens at this fixed URL,
// in standard JWKS shape — verifying against it directly means we never need
// the (Node-only, not edge-runtime-friendly) Firebase Admin SDK just to check
// a token's signature.
const FIREBASE_JWKS_URL =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;

function getJwks() {
  if (!jwks) jwks = createRemoteJWKSet(new URL(FIREBASE_JWKS_URL));
  return jwks;
}

export class FirebasePhoneTokenError extends Error {}

/**
 * Verifies a Firebase ID token came from this project's Firebase Auth and was
 * issued for a phone sign-in, then returns the verified E.164 phone number.
 *
 * This only proves phone ownership at the moment the token was issued — it is
 * a one-time proof, not an ongoing Firebase session. Nothing about the actual
 * account lives in Firebase.
 */
export async function verifyFirebasePhoneToken(idToken: string): Promise<string> {
  const projectId = process.env["FIREBASE_PROJECT_ID"];
  if (!projectId) {
    throw new Error("Missing FIREBASE_PROJECT_ID environment variable.");
  }

  let payload;
  try {
    ({ payload } = await jwtVerify(idToken, getJwks(), {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    }));
  } catch {
    throw new FirebasePhoneTokenError("Could not verify the phone verification token.");
  }

  const signInProvider = (payload as { firebase?: { sign_in_provider?: string } }).firebase
    ?.sign_in_provider;
  const phoneNumber = payload["phone_number"];

  if (signInProvider !== "phone" || typeof phoneNumber !== "string" || !phoneNumber) {
    throw new FirebasePhoneTokenError("Token was not issued for a verified phone sign-in.");
  }

  return phoneNumber;
}
