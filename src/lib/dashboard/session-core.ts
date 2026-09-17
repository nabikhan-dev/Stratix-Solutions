import { createHmac, timingSafeEqual } from "crypto";

// Pure, runtime-agnostic HMAC cookie signing — no `server-only` and no
// `next/headers`, so both session.ts (Server Components/Actions) and
// proxy.ts (which reads/writes cookies via NextRequest/NextResponse
// directly, not the cookies() API) can share one implementation instead
// of each carrying its own copy of the signing logic.

export const DASHBOARD_COOKIE_NAME = "dashboard_session";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export type SessionPayload = {
  role: "admin";
  issuedAt: number;
  expiresAt: number;
};

function getSecret(): string {
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "DASHBOARD_SESSION_SECRET is not set. Add it to your environment (see .env.example) before using /dashboard."
    );
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function encodeSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function decodeSession(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (payload.role !== "admin" || typeof payload.expiresAt !== "number") return null;
    if (Date.now() > payload.expiresAt) return null;
    return payload;
  } catch {
    return null;
  }
}
