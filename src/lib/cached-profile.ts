/**
 * A tiny, deliberately narrow exception to "nothing is cached on-device"
 * (see AGENTS.md): just enough to remember a member's own display name and
 * avatar across a failed fetch, so Home's greeting can keep showing *them*
 * instead of falling back to a generic "there" / "?" the moment they're
 * offline — which reads exactly like a different, anonymous account, not
 * like their own account with a temporarily unreachable server. See
 * home.lazy.tsx's `load()`.
 *
 * Keyed by user id so a stale entry from a previous account on a shared or
 * re-used device can never surface under a different, currently signed-in
 * one — the read only ever looks up the *current* session's own id.
 */

type CachedProfile = { full_name: string | null; avatar_url: string | null };

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

export function setCachedProfile(userId: string, profile: CachedProfile): void {
  try {
    localStorage.setItem(key(userId), JSON.stringify(profile));
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
