import { useCallback } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { HOME_ROUTE, resolveBack } from "@/lib/back-navigation";

/**
 * The header back arrow. Resolves to the same destination as the hardware back
 * button (see setupAndroidBackButton) so both "backs" agree.
 *
 * In practice that means a nested screen returns to wherever it was opened from
 * — opening a member from the family tree and pressing back goes to the tree —
 * while a bottom-nav tab collapses to Home.
 */
export function useGoBack(fallback: "/home" | "/" = "/home") {
  const router = useRouter();
  const navigate = useNavigate();

  return useCallback(() => {
    const action = resolveBack(router.state.location.pathname, router.history.canGoBack());
    if (action === "history") {
      router.history.back();
      return;
    }
    // A header arrow never closes the app, so "exit" lands on the fallback.
    void navigate({ to: action === "home" ? HOME_ROUTE : fallback });
  }, [router, navigate, fallback]);
}
