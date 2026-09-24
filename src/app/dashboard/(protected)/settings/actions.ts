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

  await updateSettings({
    siteTitle,
    siteDescription,
    ogImage: String(formData.get("ogImage") ?? "").trim(),
    contactEmail,
    responseTime: String(formData.get("responseTime") ?? "").trim(),
    serving: String(formData.get("serving") ?? "").trim(),
    contactNote: String(formData.get("contactNote") ?? "").trim(),
    // About page stats
    stat1Label: String(formData.get("stat1Label") ?? "").trim(),
    stat1Value: String(formData.get("stat1Value") ?? "").trim(),
    stat1Desc:  String(formData.get("stat1Desc")  ?? "").trim(),
    stat2Label: String(formData.get("stat2Label") ?? "").trim(),
    stat2Value: String(formData.get("stat2Value") ?? "").trim(),
    stat2Desc:  String(formData.get("stat2Desc")  ?? "").trim(),
    stat3Label: String(formData.get("stat3Label") ?? "").trim(),
    stat3Value: String(formData.get("stat3Value") ?? "").trim(),
    stat3Desc:  String(formData.get("stat3Desc")  ?? "").trim(),
  });

  revalidatePath("/dashboard/settings");
  revalidatePath("/about");
  return { savedAt: Date.now() };
}
