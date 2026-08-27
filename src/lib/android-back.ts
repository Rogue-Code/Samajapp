import { App } from "@capacitor/app";

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
export function setupAndroidBackButton() {
  if (typeof window === "undefined") return;

  void App.addListener("backButton", ({ canGoBack }) => {
    if (closeOpenSheet()) return;

    // Deliberately not gated on window.history.length: after a client-side
    // replace it can still read 1 on a route the member navigated to, which sent
    // this straight to exitApp and dropped them on the launcher mid-session.
    // canGoBack comes from the WebView itself and is the reliable signal; when
    // there is genuinely nothing behind, back() is a harmless no-op.
    if (canGoBack) {
      window.history.back();
      return;
    }

    // A root screen with nothing behind it — leave the app rather than sitting
    // on a dead button.
    void App.exitApp();
  });
}
