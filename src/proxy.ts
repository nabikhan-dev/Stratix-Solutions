import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DASHBOARD_COOKIE_NAME, decodeSession } from "@/lib/dashboard/session-core";

// Optimistic auth check for the /dashboard admin area. This only reads the
// signed session cookie (no DB round-trip) — every Server Action under
// /dashboard must still call requireSession() itself; see session.ts.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginRoute = pathname === "/dashboard/login";
  const session = decodeSession(request.cookies.get(DASHBOARD_COOKIE_NAME)?.value);

  if (!isLoginRoute && !session) {
    const loginUrl = new URL("/dashboard/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
