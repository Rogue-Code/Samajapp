import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Role = "member" | "committee" | "admin";

/**
 * The signed-in member's role. Purely for showing/hiding UI — the database
 * policies are what actually enforce permissions.
 */
export function useProfileRole(session: Session | null) {
  const [role, setRole] = useState<Role>("member");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();
      if (cancelled) return;
      const value = data?.role;
      setRole(value === "admin" || value === "committee" ? value : "member");
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  return {
    role,
    loading,
    canPublish: role === "committee" || role === "admin",
    isAdmin: role === "admin",
  };
}
