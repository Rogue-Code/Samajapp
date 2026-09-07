import { App } from "@capacitor/app";
import type { AnyRouter } from "@tanstack/react-router";
import { HOME_ROUTE, resolveBack } from "@/lib/back-navigation";

/** The layer PhoneFrame portals bottom sheets into. */
const SHEET_LAYER_ID = "sangath-sheet-layer";

/**
 * Close the topmost open bottom sheet, if there is one.
 *
 * Sheets are portalled into a single layer, so "is a sheet open" is just "does
 * that layer have children". Closing goes through the sheet's own dismiss
 * control rather than a shared registry, which keeps this out of every sheet
 * component's props — including ones this file does not own.
 */
function closeOpenSheet(): boolean {
  const layer = document.getElementById(SHEET_LAYER_ID);
  if (!layer || layer.childElementCount === 0) return false;

  const dismiss = layer.querySelector<HTMLElement>('[aria-label="Close"], [aria-label="Cancel"]');
  if (!dismiss) return false;

  dismiss.click();
  return true;
}

/**
 * Wire Android's hardware/gesture back button.
 *
 * Sheets come first regardless — pressing back while the village picker is up
 * has to close the picker, not navigate the page underneath. Beyond that the
 * destination is resolveBack's call; see back-navigation.ts for the reasoning.
 */
export function setupAndroidBackButton(router: AnyRouter) {
  if (typeof window === "undefined") return;

  void App.addListener("backButton", () => {
    if (closeOpenSheet()) return;

    // The router's own stack is the only accurate source of canGoBack. Capacitor
    // reports it from the WebView's *document* history, which does not reliably
    // track client-side navigations — on Login → Sign Up it read false, so back
    // fell through to exitApp and dropped the member on the launcher one screen
    // into the app.
    switch (resolveBack(router.state.location.pathname, router.history.canGoBack())) {
      case "history":
        router.history.back();
        return;
      case "home":
        void router.navigate({ to: HOME_ROUTE });
        return;
      case "exit":
        void App.exitApp();
    }
  });
}
