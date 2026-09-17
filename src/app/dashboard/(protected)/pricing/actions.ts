"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/dashboard/session";
import {
  updatePricingTier,
  createFeatureOption,
  updateFeatureOption,
  deleteFeatureOption,
} from "@/lib/dashboard/store";

export type PricingFormState = { error?: string; savedAt?: number } | undefined;

export async function updatePricingTierAction(_prevState: PricingFormState, formData: FormData): Promise<PricingFormState> {
  await requireSession();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const features = String(formData.get("features") ?? "")
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);

  if (!name) return { error: "Name is required." };
  if (!price) return { error: "Price is required." };

  try {
    updatePricingTier(id, { name, price, timeline, features });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save this tier." };
  }

  revalidatePath("/dashboard/pricing");
  return { savedAt: Date.now() };
}

export async function updateFeatureOptionAction(formData: FormData) {
  await requireSession();
  const categoryId = String(formData.get("categoryId") ?? "");
  const optionId = String(formData.get("optionId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));

  if (categoryId && optionId && name && Number.isFinite(price)) {
    updateFeatureOption(categoryId, optionId, { name, price });
  }
  revalidatePath("/dashboard/pricing");
}

export async function createFeatureOptionAction(formData: FormData) {
  await requireSession();
  const categoryId = String(formData.get("categoryId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));

  if (categoryId && name && Number.isFinite(price)) {
    createFeatureOption(categoryId, name, price);
  }
  revalidatePath("/dashboard/pricing");
}

export async function deleteFeatureOptionAction(formData: FormData) {
  await requireSession();
  const categoryId = String(formData.get("categoryId") ?? "");
  const optionId = String(formData.get("optionId") ?? "");
  deleteFeatureOption(categoryId, optionId);
  revalidatePath("/dashboard/pricing");
}
