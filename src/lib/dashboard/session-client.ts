// Client-side auth for the dashboard.
// Since static export cannot use next/headers, authentication is:
//   1. Edge Middleware (proxy.ts) - redirects unauthenticated requests before they reach the page
//   2. Client-side password check via API — login POSTs to /api/auth, which sets the cookie
//
// For static export, login/logout are handled entirely client-side using
// the DASHBOARD_PASSWORD env var check done server-side in middleware only.
// The login form submits to /api/auth (a route handler — NOT a Server Action).

export const DASHBOARD_COOKIE_NAME = "dashboard_session";
export const SESSION_TTL_DAYS = 7;

/** Read the session cookie from the browser (client-side only). */
export function getClientSession(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((row) => row.startsWith(`${DASHBOARD_COOKIE_NAME}=`));
}

/** Clear the session cookie client-side and redirect to login. */
export function logoutClient() {
  document.cookie = `${DASHBOARD_COOKIE_NAME}=; Max-Age=0; path=/`;
  window.location.href = "/dashboard/login";
}
