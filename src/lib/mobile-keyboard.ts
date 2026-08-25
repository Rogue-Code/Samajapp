const INPUT_SELECTOR = "input, textarea, select";

let pendingFrame = 0;
let lastInset = -1;

function measureKeyboardInset() {
  const viewport = window.visualViewport;
  if (!viewport) return 0;

  return Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
}

function syncKeyboardInset() {
  // Only ever report what we can actually measure. An earlier version guessed an
  // inset on Android (45% of the viewport) when the measurement came back as
  // zero, then fed that guess into padding-bottom — a layout-affecting value
  // derived from nothing. The measurement is the platform's job now; see
  // MainActivity's window insets listener.
  if (pendingFrame) return;

  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = 0;

    const inset = Math.round(measureKeyboardInset());
    if (inset === lastInset) return;
    lastInset = inset;

    document.documentElement.style.setProperty("--keyboard-inset", `${inset}px`);
    document.documentElement.toggleAttribute("data-keyboard-open", inset > 80);
  });
}

function scrollFocusedFieldIntoView() {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement) || !active.matches(INPUT_SELECTOR)) return;

  // Deliberately not "smooth" — a smooth scroll emits visualViewport events for
  // its whole duration, right when the keyboard is animating in.
  active.scrollIntoView({ block: "center", inline: "nearest" });
}

export function setupMobileKeyboardViewport() {
  if (typeof window === "undefined") return;

  const viewport = window.visualViewport;
  syncKeyboardInset();

  viewport?.addEventListener("resize", syncKeyboardInset);
  viewport?.addEventListener("scroll", syncKeyboardInset);
  window.addEventListener("orientationchange", syncKeyboardInset);

  document.addEventListener("focusin", (event) => {
    if (!(event.target instanceof HTMLElement) || !event.target.matches(INPUT_SELECTOR)) return;
    window.setTimeout(scrollFocusedFieldIntoView, 300);
  });
}
