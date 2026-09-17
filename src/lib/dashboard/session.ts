import "server-only";

import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import {
  DASHBOARD_COOKIE_NAME,
  SESSION_TTL_MS,
  decodeSession,
  encodeSession,
  type SessionPayload,
} from "./session-core";

// ─────────────────────────────────────────────────────────────────────────
// Minimal signed-cookie session for the internal /dashboard admin area.
//
// There's no database or user table behind this yet — it's a single shared
// password (DASHBOARD_PASSWORD) gating a single "admin" session. The cookie
// payload is a JSON blob + an HMAC signature (see session-core.ts) so it
// can't be forged or tampered with client-side, but it is NOT encrypted —
// don't put anything sensitive in the payload.
//
// This intentionally avoids adding an auth/session library (jose, iron-session,
// etc.) as a new dependency for a one-password gate. Swap this out if/when
// real user accounts are introduced.
// ─────────────────────────────────────────────────────────────────────────

/** Checks a submitted password against DASHBOARD_PASSWORD using a constant-time compare. */
export function verifyPassword(candidate: string): boolean {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    throw new Error(
      "DASHBOARD_PASSWORD is not set. Add it to your environment (see .env.example) before using /dashboard."
    );
  }
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  // Length check first: timingSafeEqual throws on mismatched-length buffers.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Sets the signed session cookie on the current response. Call after verifyPassword() succeeds. */
export async function createSession() {
  const issuedAt = Date.now();
  const token = encodeSession({ role: "admin", issuedAt, expiresAt: issuedAt + SESSION_TTL_MS });
  const cookieStore = await cookies();
  cookieStore.set(DASHBOARD_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(DASHBOARD_COOKIE_NAME);
}

/** Reads and validates the session cookie. Does NOT redirect — use requireSession() for that. */
export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(DASHBOARD_COOKIE_NAME)?.value);
});

/**
 * Call at the top of every protected Server Component render AND every
 * dashboard Server Action — Proxy is only an optimistic first line of
 * defense (see proxy.ts), each mutation must check for itself too.
 */
export const requireSession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session) redirect("/dashboard/login");
  return session;
});
