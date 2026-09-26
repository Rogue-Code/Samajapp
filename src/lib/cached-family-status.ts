/**
 * Same narrow, deliberate exception as cached-profile.ts, for the small
 * read-only "Family Information" card on Account (family code, admin
 * status, member counts) — not the full /family management page, whose
 * every action (add, approve, remove a member) is a live write that needs a
 * connection to mean anything, so it has nothing useful to show cached.
 *
 * Keyed by user id — see cached-profile.ts for why.
 */

type FamilyStatus = {
  is_admin: boolean;
  family_code: string | null;
  family_id: string | null;
  admin_id: string | null;
  admin_name: string | null;
  admin_avatar_url: string | null;
  pending_request_id: string | null;
  pending_admin_name: string | null;
};

type FamilyCounts = { total: number; verified: number };

function statusKey(userId: string) {
  return `sangath.cached-family-status.${userId}`;
}

function countsKey(userId: string) {
  return `sangath.cached-family-counts.${userId}`;
}

export function getCachedFamilyStatus(userId: string): FamilyStatus | null {
  try {
    const raw = localStorage.getItem(statusKey(userId));
    return raw ? (JSON.parse(raw) as FamilyStatus) : null;
  } catch {
    return null;
  }
}

export function setCachedFamilyStatus(userId: string, status: FamilyStatus): void {
  try {
    localStorage.setItem(statusKey(userId), JSON.stringify(status));
  } catch {
    // Best effort, same as cached-profile.ts.
  }
}

export function getCachedFamilyCounts(userId: string): FamilyCounts | null {
  try {
    const raw = localStorage.getItem(countsKey(userId));
    return raw ? (JSON.parse(raw) as FamilyCounts) : null;
  } catch {
    return null;
  }
}

export function setCachedFamilyCounts(userId: string, counts: FamilyCounts): void {
  try {
    localStorage.setItem(countsKey(userId), JSON.stringify(counts));
  } catch {
    // Best effort, same as cached-profile.ts.
  }
}

export function clearCachedFamilyStatus(userId: string): void {
  try {
    localStorage.removeItem(statusKey(userId));
    localStorage.removeItem(countsKey(userId));
  } catch {
    // Nothing to do if storage is unavailable.
  }
}
