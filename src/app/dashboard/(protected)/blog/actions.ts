"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/dashboard/session";
import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/lib/dashboard/store";
import { parseSections } from "@/lib/dashboard/sections";
import { blogCategories, type BlogCategory } from "@/data/blog";

export type BlogFormState = { error?: string } | undefined;

function readBlogFormData(formData: FormData) {
  const category = String(formData.get("category") ?? "");
  if (!(blogCategories as readonly string[]).includes(category) || category === "All Insights") {
    throw new Error("Choose a valid category.");
  }

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  if (!title) throw new Error("Title is required.");
  if (!excerpt) throw new Error("Excerpt is required.");

  return {
    title,
    excerpt,
    category: category as BlogCategory,
    date: String(formData.get("date") ?? "").trim(),
    readTime: String(formData.get("readTime") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    featured: formData.get("featured") === "on",
    author: {
      name: String(formData.get("authorName") ?? "").trim(),
      role: String(formData.get("authorRole") ?? "").trim(),
    },
    sections: parseSections(String(formData.get("sections") ?? "")),
  };
}

export async function createBlogPostAction(_prevState: BlogFormState, formData: FormData): Promise<BlogFormState> {
  await requireSession();

  let slug: string;
  try {
    const input = readBlogFormData(formData);
    const requestedSlug = String(formData.get("slug") ?? "").trim();
    const post = createBlogPost({ ...input, slug: requestedSlug || undefined });
    slug = post.slug;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't create the post." };
  }

  revalidatePath("/dashboard/blog");
  revalidatePath("/dashboard");
  redirect(`/dashboard/blog/${slug}`);
}

export async function updateBlogPostAction(_prevState: BlogFormState, formData: FormData): Promise<BlogFormState> {
  await requireSession();

  const slug = String(formData.get("slug") ?? "");
  try {
    const input = readBlogFormData(formData);
    updateBlogPost(slug, input);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save the post." };
  }

  revalidatePath("/dashboard/blog");
  revalidatePath(`/dashboard/blog/${slug}`);
  revalidatePath("/dashboard");
  return { error: undefined };
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireSession();
  const slug = String(formData.get("slug") ?? "");
  deleteBlogPost(slug);
  revalidatePath("/dashboard/blog");
  revalidatePath("/dashboard");
  redirect("/dashboard/blog");
}
