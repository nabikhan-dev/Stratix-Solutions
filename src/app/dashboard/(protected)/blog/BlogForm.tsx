"use client";

import { useState, useTransition } from "react";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Field, inputClass, scrollableInputClass, FormError, buttonGhostClass, textareaClass } from "@/components/dashboard/ui";
import ImageUrlField from "@/components/dashboard/ImageUrlField";
import CategoryCombobox from "@/components/dashboard/CategoryCombobox";
import { serializeSections } from "@/lib/dashboard/sections";
import { type BlogPost } from "@/data/blog";
import Link from "next/link";
import { createBlogPostAction, updateBlogPostAction } from "./actions";

export default function BlogForm({
  mode,
  post,
  existingCategories = [],
}: {
  mode: "create" | "edit";
  post?: BlogPost;
  existingCategories?: string[];
}) {
  const [error, setError] = useState<string | undefined>();
  const [galleryUrls, setGalleryUrls] = useState<string[]>(post?.gallery ?? [""]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const addGalleryImage = () => setGalleryUrls([...galleryUrls, ""]);
  const removeGalleryImage = (index: number) => setGalleryUrls(galleryUrls.filter((_, i) => i !== index));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(undefined);
    startTransition(async () => {
      if (mode === "create") {
        const result = await createBlogPostAction(formData);
        if (result.error) {
          setError(result.error);
        } else {
          router.push(`/dashboard/blog/edit/?slug=${encodeURIComponent(result.slug ?? "")}`);
        }
      } else {
        const result = await updateBlogPostAction(formData);
        if (result.error) {
          setError(result.error);
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {mode === "edit" && post && <input type="hidden" name="slug" value={post.slug} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" htmlFor="title">
          <textarea id="title" name="title" required defaultValue={post?.title} className={scrollableInputClass} data-lenis-prevent="true" />
        </Field>

        {mode === "create" ? (
          <Field label="Slug" htmlFor="slug" hint="Leave blank to generate from the title.">
            <input id="slug" name="slug" placeholder="auto-generated-from-title" className={inputClass} />
          </Field>
        ) : (
          <Field label="Slug" htmlFor="slug-display" hint="Slugs can't be changed after a post is created.">
            <input id="slug-display" disabled value={post?.slug} className={`${inputClass} cursor-not-allowed opacity-60`} />
          </Field>
        )}

        <Field label="Category" htmlFor="category" hint='e.g. AI Development, Web Development'>
          <CategoryCombobox required defaultValue={post?.category} existingCategories={existingCategories} />
        </Field>

        <Field label="Date" htmlFor="date" hint='e.g. "Aug 10, 2026"'>
          <input id="date" name="date" required defaultValue={post?.date} className={inputClass} />
        </Field>
      </div>

      <ImageUrlField id="image" name="image" label="Cover image URL" defaultValue={post?.image} required />

      <div className="flex flex-col gap-3">
        <label className="text-[14px] font-medium text-primary">Gallery images</label>
        {galleryUrls.map((url, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="flex-1">
              <ImageUrlField
                id={`blog-gallery-${index}`}
                name="gallery"
                label=""
                defaultValue={url}
              />
            </div>
            {galleryUrls.length > 1 && (
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="mt-1 flex size-10.5 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-muted transition hover:border-danger hover:text-danger"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addGalleryImage}
          className="mt-2 flex w-max items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-medium text-primary transition hover:bg-surface"
        >
          <Plus className="size-4" /> Add Gallery Image
        </button>
      </div>

      <Field label="Excerpt" htmlFor="excerpt">
        <textarea id="excerpt" name="excerpt" required rows={2} defaultValue={post?.excerpt} className={textareaClass} data-lenis-prevent="true" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Author name" htmlFor="authorName">
          <input id="authorName" name="authorName" required defaultValue={post?.author.name} className={inputClass} />
        </Field>
        <Field label="Author role" htmlFor="authorRole">
          <input id="authorRole" name="authorRole" required defaultValue={post?.author.role} className={inputClass} />
        </Field>
      </div>

      <label className="flex items-center gap-2.5 text-[14px] font-medium text-primary">
        <input type="checkbox" name="featured" defaultChecked={post?.featured} className="size-4 rounded accent-signal" />
        Feature this post
      </label>

      <Field
        label="Body sections"
        htmlFor="sections"
        hint={'Start a line with "## " to begin a new section. Start a line with "IMAGE: https://..." to add an image. Plain paragraphs before the first "## " become a heading-less intro section.'}
      >
        <textarea
          id="sections"
          name="sections"
          required
          defaultValue={post ? serializeSections(post.sections) : ""}
          className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-primary placeholder:text-faint outline-none transition focus:border-signal focus-visible:!outline-none font-mono text-[13px] leading-relaxed resize-y overflow-y-auto h-96"
          placeholder={"## First section heading\nBody text for the first section.\n\n## Second section heading\nMore body text."}
          data-lenis-prevent="true"
        />
      </Field>

      <FormError message={error} />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-4 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (mode === "create" ? "Creating…" : "Saving…") : (mode === "create" ? "Create post" : "Save changes")}
        </button>
        <Link href="/dashboard/blog" className={buttonGhostClass}>
          Cancel
        </Link>
      </div>

      {mode === "edit" && !isPending && !error && (
        <p className="text-[13px] text-calm">Saved.</p>
      )}
    </form>
  );
}
