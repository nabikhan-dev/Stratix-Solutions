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

  if (!title) return { error: "Title is required." };
  if (!short) return { error: "Short description is required." };
  if (!description) return { error: "Description is required." };

  try {
    updateService(id, { title, short, description, motifWords });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save this service." };
  }

  // Note: only revalidates the dashboard's own view. The public /services
  // page still imports primaryServices directly from src/data/content.ts,
  // so this edit won't appear there yet — see the note on the overview
  // page about wiring a real data layer.
  revalidatePath("/dashboard/services");
  return { savedAt: Date.now() };
}
