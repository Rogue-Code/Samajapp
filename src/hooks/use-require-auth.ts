import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/** Redirects to login when there's no active session; otherwise exposes the session once known. */
export function useRequireAuth() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!data.session) {
        navigate({ to: "/" });
        return;
      }
      setSession(data.session);
      setChecking(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return { session, checking };
}
