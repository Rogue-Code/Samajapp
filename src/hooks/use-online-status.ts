import { useEffect, useState } from "react";

/**
 * `navigator.onLine` only reflects whether the device has *a* network
 * interface up (e.g. still true on Wi-Fi with no internet behind it), not
 * whether Supabase is actually reachable — but it does reliably flip to
 * `false` the moment Android's airplane mode or "no SIM/no Wi-Fi" kicks in,
 * which is the case this hook exists for: telling the member plainly that
 * nothing on screen can be trusted to be current, instead of leaving a
 * fetch that silently failed looking like an answer.
 */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine,
  );

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return online;
}
