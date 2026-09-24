"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/dashboard/session";
import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/lib/dashboard/store";
import { parseSections } from "@/lib/dashboard/sections";
import { type BlogCategory } from "@/data/blog";

export type BlogFormState = { error?: string } | undefined;

function calcReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function readBlogFormData(formData: FormData) {
  const category = String(formData.get("category") ?? "").trim();
  if (!category) throw new Error("Category is required.");

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  if (!title) throw new Error("Title is required.");
  if (!excerpt) throw new Error("Excerpt is required.");

  const sectionsRaw = String(formData.get("sections") ?? "");
  const sections = parseSections(sectionsRaw);

  // Auto-calculate read time from all text content
  const allText = [excerpt, ...sections.map((s) => [s.heading ?? "", s.body].join(" "))].join(" ");
  const readTime = calcReadTime(allText);

  return {
    title,
    excerpt,
    category: category as BlogCategory,
    date: String(formData.get("date") ?? "").trim(),
    readTime,
    image: String(formData.get("image") ?? "").trim(),
    gallery: formData.getAll("gallery").map(String).map((u) => u.trim()).filter(Boolean),
    featured: formData.get("featured") === "on",
    author: {
      name: String(formData.get("authorName") ?? "").trim(),
      role: String(formData.get("authorRole") ?? "").trim(),
    },
    sections,
  };
}

export async function createBlogPostAction(_prevState: BlogFormState, formData: FormData): Promise<BlogFormState> {
  await requireSession();

  let slug: string;
  try {
    const input = readBlogFormData(formData);
    const requestedSlug = String(formData.get("slug") ?? "").trim();
    const post = await createBlogPost({ ...input, slug: requestedSlug || undefined });
    slug = post.slug;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't create the post." };
  }

  revalidatePath("/dashboard/blog");
  revalidatePath("/dashboard");
  revalidatePath("/", "layout");
  redirect(`/dashboard/blog/${slug}`);
}

export async function updateBlogPostAction(_prevState: BlogFormState, formData: FormData): Promise<BlogFormState> {
  await requireSession();

  const slug = String(formData.get("slug") ?? "");
  try {
    const input = readBlogFormData(formData);
    await updateBlogPost(slug, input);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save the post." };
  }

  revalidatePath("/dashboard/blog");
  revalidatePath(`/dashboard/blog/${slug}`);
  revalidatePath("/dashboard");
  revalidatePath("/", "layout");
  return { error: undefined };
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireSession();
  const slug = String(formData.get("slug") ?? "");
  await deleteBlogPost(slug);
  revalidatePath("/dashboard/blog");
  revalidatePath("/dashboard");
  revalidatePath("/", "layout");
  redirect("/dashboard/blog");
}
