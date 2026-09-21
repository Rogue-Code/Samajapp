import { SignJWT, importPKCS8 } from "jose";

/**
 * The few Firebase Admin operations this app needs, over Google's REST APIs.
 *
 * Same reasoning as verify-token.server.ts: the Firebase Admin SDK is Node-only
 * and does not run on the Cloudflare Worker this app deploys to, so the two
 * calls we actually need — find a user by phone number, delete that user — are
 * made directly against the Identity Toolkit API, authenticated with a service
 * account. `jose` is already a dependency for token verification and can sign
 * the OAuth assertion too, so this adds no new packages.
 *
 * Needs two secrets beyond the existing FIREBASE_PROJECT_ID, both from a
 * service-account key in the Firebase console (Project settings → Service
 * accounts → Generate new private key):
 *
 *   FIREBASE_CLIENT_EMAIL   the key's `client_email`
 *   FIREBASE_PRIVATE_KEY    the key's `private_key`, PEM including the
 *                           BEGIN/END lines (escaped \n are handled below)
 *
 * Unlike the VITE_FIREBASE_* values next to them, these ARE secrets: the
 * private key can mint admin credentials for the whole Firebase project. Set
 * them with `wrangler secret put`, never in .env committed to the repo.
 */

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const IDENTITY_TOOLKIT = "https://identitytoolkit.googleapis.com/v1";

/** Narrowest scope that allows accounts:lookup and accounts:delete. */
const SCOPE = "https://www.googleapis.com/auth/identitytoolkit";

/** Thrown when the service-account credentials are absent or unusable. */
export class FirebaseAdminUnavailableError extends Error {}

interface ServiceAccount {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

function readServiceAccount(): ServiceAccount {
  const projectId = process.env["FIREBASE_PROJECT_ID"];
  const clientEmail = process.env["FIREBASE_CLIENT_EMAIL"];
  const rawKey = process.env["FIREBASE_PRIVATE_KEY"];

  const missing = [
    ...(projectId ? [] : ["FIREBASE_PROJECT_ID"]),
    ...(clientEmail ? [] : ["FIREBASE_CLIENT_EMAIL"]),
    ...(rawKey ? [] : ["FIREBASE_PRIVATE_KEY"]),
  ];
  if (missing.length > 0) {
    throw new FirebaseAdminUnavailableError(
      `Missing Firebase service-account variable(s): ${missing.join(", ")}.`,
    );
  }

  return {
    projectId: projectId as string,
    clientEmail: clientEmail as string,
    // Secret stores and .env files usually carry the PEM with escaped newlines;
    // importPKCS8 needs real ones.
    privateKey: (rawKey as string).replace(/\\n/g, "\n"),
  };
}

/**
 * Cached because a Worker isolate handles many requests, and minting a token is
 * an RSA signature plus a round trip to Google. Refreshed a minute early so a
 * token cannot expire mid-request.
 */
let cachedToken: { value: string; expiresAt: number } | undefined;

async function getAccessToken(account: ServiceAccount): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) return cachedToken.value;

  let key: CryptoKey;
  try {
    key = (await importPKCS8(account.privateKey, "RS256")) as CryptoKey;
  } catch {
    throw new FirebaseAdminUnavailableError(
      "FIREBASE_PRIVATE_KEY is not a usable PKCS#8 PEM private key.",
    );
  }

  const assertion = await new SignJWT({ scope: SCOPE })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(account.clientEmail)
    .setSubject(account.clientEmail)
    .setAudience(TOKEN_ENDPOINT)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new FirebaseAdminUnavailableError(
      `Google refused the service-account assertion (${response.status}).`,
    );
  }

  const body = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!body.access_token) {
    throw new FirebaseAdminUnavailableError("Google returned no access token.");
  }

  cachedToken = {
    value: body.access_token,
    expiresAt: now + (body.expires_in ?? 3600) * 1000,
  };
  return cachedToken.value;
}

async function identityToolkit<T>(
  account: ServiceAccount,
  method: "accounts:lookup" | "accounts:delete",
  payload: Record<string, unknown>,
): Promise<T> {
  const token = await getAccessToken(account);
  const response = await fetch(`${IDENTITY_TOOLKIT}/projects/${account.projectId}/${method}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Identity Toolkit ${method} failed (${response.status}).`);
  }
  return (await response.json()) as T;
}

/**
 * Deletes the Firebase Auth user that owns `phone`, if there is one.
 *
 * Returns "not_found" rather than throwing when no Firebase user matches:
 * an account created before mobile sign-in existed, or one whose Firebase
 * record was already removed, is a normal outcome of deleting an account, not
 * an error the member should see.
 */
export async function deleteFirebaseUserByPhone(phone: string): Promise<"deleted" | "not_found"> {
  const account = readServiceAccount();

  const lookup = await identityToolkit<{ users?: { localId?: string }[] }>(
    account,
    "accounts:lookup",
    { phoneNumber: [phone] },
  );

  const localId = lookup.users?.[0]?.localId;
  if (!localId) return "not_found";

  await identityToolkit(account, "accounts:delete", { localId });
  return "deleted";
}
