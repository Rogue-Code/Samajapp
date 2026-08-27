import { useCallback } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";

/**
 * Back navigation that returns to wherever the member actually came from.
 *
 * Screens used to hard-code `navigate({ to: "/home" })` on their back arrow, so
 * opening a member from the family tree and pressing back dumped you on Home
 * instead of the tree. This steps back through history instead, falling back to
 * a sensible screen when there is nothing to step back to — which happens on a
 * cold start straight into a route, where `back()` would otherwise leave the app.
 */
export function useGoBack(fallback: "/home" | "/" = "/home") {
  const router = useRouter();
  const navigate = useNavigate();

  return useCallback(() => {
    if (router.history.canGoBack()) {
      router.history.back();
      return;
    }
    void navigate({ to: fallback });
  }, [router, navigate, fallback]);
}
