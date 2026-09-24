"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/dashboard/session";
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

export async function createTestimonialAction(_prevState: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
  await requireSession();

  let id: string;
  try {
    const testimonial = await createTestimonial(readTestimonialFormData(formData));
    id = testimonial.id;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't create the testimonial." };
  }

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/dashboard");
  redirect(`/dashboard/testimonials/${id}`);
}

export async function updateTestimonialAction(_prevState: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
  await requireSession();

  const id = String(formData.get("id"));
  try {
    await updateTestimonial(id, readTestimonialFormData(formData));
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save the testimonial." };
  }

  revalidatePath("/dashboard/testimonials");
  revalidatePath(`/dashboard/testimonials/${id}`);
  revalidatePath("/dashboard");
  return { error: undefined };
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id"));
  await deleteTestimonial(id);
  revalidatePath("/dashboard/testimonials");
  revalidatePath("/dashboard");
  redirect("/dashboard/testimonials");
}
