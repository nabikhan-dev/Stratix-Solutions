// Client-side testimonial mutations — no "use server", no Server Actions.

import { createTestimonial, deleteTestimonial, updateTestimonial } from "@/lib/dashboard/store";

export type TestimonialFormState = { error?: string } | undefined;

function readTestimonialFormData(formData: FormData) {
  const quote = String(formData.get("quote") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  if (!quote) throw new Error("Quote is required.");
  if (!author) throw new Error("Author is required.");

  return {
    quote,
    author,
    role: String(formData.get("role") ?? "").trim(),
    avatar: String(formData.get("avatar") ?? "").trim(),
  };
}

export async function createTestimonialAction(formData: FormData): Promise<{ error?: string; id?: string }> {
  try {
    const testimonial = await createTestimonial(readTestimonialFormData(formData));
    return { id: testimonial.id };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't create the testimonial." };
  }
}

export async function updateTestimonialAction(formData: FormData): Promise<{ error?: string }> {
  const id = String(formData.get("id"));
  try {
    await updateTestimonial(id, readTestimonialFormData(formData));
    return {};
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save the testimonial." };
  }
}

export async function deleteTestimonialAction(id: string): Promise<void> {
  await deleteTestimonial(id);
}
