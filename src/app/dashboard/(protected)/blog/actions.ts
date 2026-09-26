// Client-side blog mutations — no "use server", no Server Actions.
// All Firestore writes go through the client SDK in store.ts.

import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/lib/dashboard/store";
import { parseSections } from "@/lib/dashboard/sections";
import { type BlogCategory } from "@/data/blog";

export type BlogFormState = { error?: string } | undefined;

function calcReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function readBlogFormData(formData: FormData) {
  const category = String(formData.get("category") ?? "").trim();
  if (!category) throw new Error("Category is required.");

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  if (!title) throw new Error("Title is required.");
  if (!excerpt) throw new Error("Excerpt is required.");

  const sectionsRaw = String(formData.get("sections") ?? "");
  const sections = parseSections(sectionsRaw);

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

export async function createBlogPostAction(formData: FormData): Promise<{ error?: string; slug?: string }> {
  try {
    const input = readBlogFormData(formData);
    const requestedSlug = String(formData.get("slug") ?? "").trim();
    const post = await createBlogPost({ ...input, slug: requestedSlug || undefined });
    return { slug: post.slug };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't create the post." };
  }
}

export async function updateBlogPostAction(formData: FormData): Promise<{ error?: string }> {
  const slug = String(formData.get("slug") ?? "");
  try {
    const input = readBlogFormData(formData);
    await updateBlogPost(slug, input);
    return {};
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save the post." };
  }
}

export async function deleteBlogPostAction(slug: string): Promise<void> {
  await deleteBlogPost(slug);
}
