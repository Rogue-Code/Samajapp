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

    if (canGoBack && window.history.length > 1) {
      window.history.back();
      return;
    }

    // Nothing left to go back to — this is a root screen, so exit rather than
    // sitting on a dead button.
    void App.exitApp();
  });
}
