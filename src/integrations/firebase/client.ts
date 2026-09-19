import { initializeApp, getApps } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// Firebase's web config isn't a secret (it's restricted by authorized
// domains / API restrictions in the console, not by confidentiality) — same
// posture as the VITE_SUPABASE_* values it sits next to in .env.
const firebaseConfig = {
  apiKey: import.meta.env["VITE_FIREBASE_API_KEY"],
  authDomain: import.meta.env["VITE_FIREBASE_AUTH_DOMAIN"],
  projectId: import.meta.env["VITE_FIREBASE_PROJECT_ID"],
  appId: import.meta.env["VITE_FIREBASE_APP_ID"],
};

function createFirebaseAuth(): Auth {
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  return getAuth(app);
}

let _firebaseAuth: Auth | undefined;

// Lazy, same as src/integrations/supabase/client.ts's `supabase` export: this
// module is imported by the login/signup route files, which render during
// SSR (Cloudflare Worker) too. Initializing eagerly at module scope would run
// Firebase's browser-only Auth SDK (window/indexedDB) on the server. Nothing
// here actually accesses `firebaseAuth` outside client-only event handlers,
// so the Proxy defers construction until the browser first touches it.
export const firebaseAuth = new Proxy({} as Auth, {
  get(_, prop, receiver) {
    if (!_firebaseAuth) _firebaseAuth = createFirebaseAuth();
    return Reflect.get(_firebaseAuth, prop, receiver);
  },
});
