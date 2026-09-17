"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession, verifyPassword } from "@/lib/dashboard/session";

export type LoginState = { error?: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!password) {
    return { error: "Enter the dashboard password." };
  }

  let valid: boolean;
  try {
    valid = verifyPassword(password);
  } catch {
    return { error: "Dashboard auth isn't configured yet — set DASHBOARD_PASSWORD and DASHBOARD_SESSION_SECRET." };
  }

  if (!valid) {
    return { error: "Incorrect password." };
  }

  await createSession();
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/dashboard/login");
}
