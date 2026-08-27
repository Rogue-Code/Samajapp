import { App } from "@capacitor/app";
import type { AnyRouter } from "@tanstack/react-router";

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
 * Without this Capacitor falls back to WebView history, which ignores open
 * sheets — pressing back while the village picker was up navigated the page
 * underneath instead of closing the picker. Order is: dismiss a sheet, else step
 * back through history, else leave the app.
 */
export function setupAndroidBackButton(router: AnyRouter) {
  if (typeof window === "undefined") return;

  void App.addListener("backButton", () => {
    if (closeOpenSheet()) return;

    // The router's own stack is the only accurate source here. Capacitor reports
    // canGoBack from the WebView's *document* history, which does not reliably
    // track client-side navigations — on Login → Sign Up it read false, so back
    // fell through to exitApp and dropped the member on the launcher one screen
    // into the app. window.history.length is no better: a replace leaves it at 1.
    if (router.history.canGoBack()) {
      router.history.back();
      return;
    }

    // A root screen with nothing behind it — leave the app rather than sitting
    // on a dead button.
    void App.exitApp();
  });
}
