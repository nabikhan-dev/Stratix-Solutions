"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/dashboard/session";
import { updateSettings } from "@/lib/dashboard/store";

export type SettingsFormState = { error?: string; savedAt?: number } | undefined;

export async function updateSettingsAction(_prevState: SettingsFormState, formData: FormData): Promise<SettingsFormState> {
  await requireSession();

  const siteTitle = String(formData.get("siteTitle") ?? "").trim();
  const siteDescription = String(formData.get("siteDescription") ?? "").trim();
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();

  if (!siteTitle) return { error: "Site title is required." };
  if (!siteDescription) return { error: "Site description is required." };
  if (!contactEmail.includes("@")) return { error: "Enter a valid contact email." };

  updateSettings({
    siteTitle,
    siteDescription,
    ogImage: String(formData.get("ogImage") ?? "").trim(),
    contactEmail,
    responseTime: String(formData.get("responseTime") ?? "").trim(),
    serving: String(formData.get("serving") ?? "").trim(),
    contactNote: String(formData.get("contactNote") ?? "").trim(),
  });

  // Same caveat as services/pricing: this updates the dashboard's own copy
  // only. layout.tsx's <Metadata> and content.ts's `contact` still drive
  // the live site until they're wired to read from this store.
  revalidatePath("/dashboard/settings");
  return { savedAt: Date.now() };
}
