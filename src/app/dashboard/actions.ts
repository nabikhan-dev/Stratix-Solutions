// Client-side login logic.
// With static export, there's no Node server to safely verify passwords
// or securely sign cookies. We use a simple client-side check that matches
// the NEXT_PUBLIC_DASHBOARD_PASSWORD hash, or falls back if not configured.

import { DASHBOARD_COOKIE_NAME } from "@/lib/dashboard/session-client";

export type LoginState = { error?: string } | undefined;

// Simple client-side hash function for the static login gate
async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function loginAction(formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!password) {
    return { error: "Enter the dashboard password." };
  }

  // On static export without a backend, we check against a public hash.
  // In a real production environment with static export, you should use Firebase Auth instead.
  const expectedHash = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD_HASH;
  
  if (expectedHash) {
    const inputHash = await sha256(password);
    if (inputHash !== expectedHash) {
      return { error: "Incorrect password." };
    }
  } else {
    // If no hash is configured for the static export, we allow any password 
    // that matches the original env var (if accessible at build time/client)
    // or just pass through. Firestore rules are the real security layer.
    if (process.env.NEXT_PUBLIC_DEV_PASSWORD && password !== process.env.NEXT_PUBLIC_DEV_PASSWORD) {
       return { error: "Incorrect password." };
    }
  }

  // Set a client-side cookie
  document.cookie = `${DASHBOARD_COOKIE_NAME}=authenticated; path=/; max-age=604800; samesite=lax`;
  return undefined;
}
