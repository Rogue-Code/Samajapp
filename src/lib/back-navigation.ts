/** The bottom nav's start destination. */
export const HOME_ROUTE = "/home";

/**
 * The other bottom-nav destinations.
 *
 * Back from one of these goes to Home rather than retracing which tabs were
 * visited: Facilities → Fundraiser → back belongs on Home, because the order
 * someone happened to tap tabs in is not a history worth walking. This is what
 * Android's navigation guidance specifies and what the large social apps do.
 */
const TAB_ROUTES = new Set(["/facilities", "/fundraiser", "/account"]);

/**
 * Screens reached before a session exists, plus the one-time profile setup.
 * Home is not a valid destination from here — it would bounce to login, or skip
 * setup — so with nothing behind them, back leaves the app.
 */
const PRE_SESSION_ROUTES = new Set([
  "/",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/profile",
]);

export type BackAction = "home" | "history" | "exit";

/**
 * What a back gesture should do from `pathname`.
 *
 * Nested screens — a facility, a member, the news feed, the admin console — step
 * back to wherever they were opened from, which is the page the member actually
 * came from. Only the tab bar's own destinations collapse to Home.
 */
export function resolveBack(pathname: string, canGoBack: boolean): BackAction {
  if (pathname === HOME_ROUTE) return "exit";
  if (TAB_ROUTES.has(pathname)) return "home";
  if (canGoBack) return "history";
  // Nothing behind us: a cold start straight into a nested route, or a deep link.
  return PRE_SESSION_ROUTES.has(pathname) ? "exit" : "home";
}
