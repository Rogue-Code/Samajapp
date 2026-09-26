/**
 * A tiny, deliberately narrow exception to "nothing is cached on-device"
 * (see AGENTS.md): just enough of a member's own `profiles` row to keep
 * showing *them* — name, photo, and the rest of what My Profile displays —
 * across a failed fetch, instead of falling back to a generic "there" / "?"
 * / blank fields the moment they're offline. That fallback reads exactly
 * like a different, anonymous account, not like their own account with a
 * temporarily unreachable server. See home.lazy.tsx's `load()` and
 * account.lazy.tsx's own load effect.
 *
 * Keyed by user id so a stale entry from a previous account on a shared or
 * re-used device can never surface under a different, currently signed-in
 * one — the read only ever looks up the *current* session's own id.
 *
 * Display only. Nothing that reads this cache may treat it as fresh enough
 * to save back to the server — callers gate actually saving on being online
 * (see account.lazy.tsx's use of useOnlineStatus), since a save built off a
 * stale cached field the member never touched would silently revert it.
 */

type CachedProfile = Partial<{
  full_name: string | null;
  avatar_url: string | null;
  mobile: string | null;
  village: string | null;
  city: string | null;
  state: string | null;
  occupation: string | null;
  dob: string | null;
  marital_status: string | null;
  gender: string | null;
}>;

function key(userId: string) {
  return `sangath.cached-profile.${userId}`;
}

export function getCachedProfile(userId: string): CachedProfile | null {
  try {
    const raw = localStorage.getItem(key(userId));
    return raw ? (JSON.parse(raw) as CachedProfile) : null;
  } catch {
    return null;
  }
}

/** Merges into whatever's already cached, so a partial write (e.g. Home's
 * name + avatar only) never erases fields a fuller write (Account's whole
 * form) cached earlier, or vice versa. */
export function setCachedProfile(userId: string, profile: CachedProfile): void {
  try {
    const existing = getCachedProfile(userId) ?? {};
    localStorage.setItem(key(userId), JSON.stringify({ ...existing, ...profile }));
  } catch {
    // Best effort — a full or blocked localStorage just means no fallback
    // next time, not a broken app now.
  }
}

export function clearCachedProfile(userId: string): void {
  try {
    localStorage.removeItem(key(userId));
  } catch {
    // Nothing to do if storage is unavailable.
  }
}
