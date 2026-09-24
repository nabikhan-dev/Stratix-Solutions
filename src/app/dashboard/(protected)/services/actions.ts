"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/dashboard/session";
import { updateService } from "@/lib/dashboard/store";

export type ServiceFormState = { error?: string; savedAt?: number } | undefined;

export async function updateServiceAction(_prevState: ServiceFormState, formData: FormData): Promise<ServiceFormState> {
  await requireSession();

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const short = String(formData.get("short") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const motifWords = String(formData.get("motifWords") ?? "")
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean);
  const isActive = formData.get("isActive") === "true";

  if (!title) return { error: "Title is required." };
  if (!short) return { error: "Short description is required." };
  if (!description) return { error: "Description is required." };

  try {
    await updateService(id, { title, short, description, motifWords, isActive });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save this service." };
  }

  // Revalidate entire site so public pages reflect the dashboard edits immediately.
  revalidatePath("/", "layout");
  return { savedAt: Date.now() };
}
