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
  
  const features: string[] = [];
  
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("feature_enabled_") && value === "true") {
      const index = key.replace("feature_enabled_", "");
      const text = String(formData.get(`feature_text_${index}`) ?? "").trim();
      if (text && !features.includes(text)) {
        features.push(text);
      }
    }
  }

  const newFeature = String(formData.get("newFeature") ?? "").trim();
  if (newFeature && !features.includes(newFeature)) {
    features.push(newFeature);
  }

  if (!name) return { error: "Name is required." };
  if (!price) return { error: "Price is required." };

  try {
    await updatePricingTier(id, { name, price, timeline, features });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save this tier." };
  }

  revalidatePath("/", "layout");
  return { savedAt: Date.now() };
}

export async function updateFeatureOptionAction(formData: FormData) {
  await requireSession();
  const categoryId = String(formData.get("categoryId") ?? "");
  const optionId = String(formData.get("optionId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));

  if (categoryId && optionId && name && Number.isFinite(price)) {
    await updateFeatureOption(categoryId, optionId, { name, price });
  }
  revalidatePath("/", "layout");
}

export async function createFeatureOptionAction(formData: FormData) {
  await requireSession();
  const categoryId = String(formData.get("categoryId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));

  if (categoryId && name && Number.isFinite(price)) {
    await createFeatureOption(categoryId, name, price);
  }
  revalidatePath("/", "layout");
}

export async function deleteFeatureOptionAction(formData: FormData) {
  await requireSession();
  const categoryId = String(formData.get("categoryId") ?? "");
  const optionId = String(formData.get("optionId") ?? "");
  await deleteFeatureOption(categoryId, optionId);
  revalidatePath("/", "layout");
}
