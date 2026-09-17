"use client";

import { useActionState } from "react";
import { Field, inputClass, FormError, buttonGhostClass } from "@/components/dashboard/ui";
import SubmitButton from "@/components/dashboard/SubmitButton";
import ImageUrlField from "@/components/dashboard/ImageUrlField";
import { serializeSections } from "@/lib/dashboard/sections";
import { blogCategories, type BlogPost } from "@/data/blog";
import Link from "next/link";
import type { BlogFormState } from "./actions";

const categoryOptions = blogCategories.filter((c) => c !== "All Insights");

export default function BlogForm({
  mode,
  post,
  action,
}: {
  mode: "create" | "edit";
  post?: BlogPost;
  action: (state: BlogFormState, formData: FormData) => Promise<BlogFormState>;
}) {
  const [state, formAction] = useActionState<BlogFormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {mode === "edit" && post && <input type="hidden" name="slug" value={post.slug} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" htmlFor="title">
          <input id="title" name="title" required defaultValue={post?.title} className={inputClass} />
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

        <Field label="Category" htmlFor="category">
          <select id="category" name="category" required defaultValue={post?.category} className={inputClass}>
            <option value="" disabled>
              Choose a category…
            </option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Date" htmlFor="date" hint='e.g. "Aug 10, 2026"'>
          <input id="date" name="date" required defaultValue={post?.date} className={inputClass} />
        </Field>

        <Field label="Read time" htmlFor="readTime" hint='e.g. "7 min read"'>
          <input id="readTime" name="readTime" required defaultValue={post?.readTime} className={inputClass} />
        </Field>
      </div>

      <ImageUrlField id="image" name="image" label="Cover image URL" defaultValue={post?.image} required />

      <p className="-mt-2 text-[12.5px] text-faint">
        Views aren&apos;t set here anymore — each post now tracks real visits live (see the site&apos;s
        published post).
      </p>

      <Field label="Excerpt" htmlFor="excerpt">
        <textarea id="excerpt" name="excerpt" required rows={2} defaultValue={post?.excerpt} className={inputClass} />
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
        hint={'Start a line with "## " to begin a new (optionally headed) section. Plain paragraphs before the first "## " become a heading-less intro section.'}
      >
        <textarea
          id="sections"
          name="sections"
          required
          rows={16}
          defaultValue={post ? serializeSections(post.sections) : ""}
          className={`${inputClass} font-mono text-[13px] leading-relaxed`}
          placeholder={"## First section heading\nBody text for the first section.\n\n## Second section heading\nMore body text."}
        />
      </Field>

      <FormError message={state?.error} />

      <div className="flex items-center gap-3">
        <SubmitButton pendingLabel={mode === "create" ? "Creating…" : "Saving…"}>
          {mode === "create" ? "Create post" : "Save changes"}
        </SubmitButton>
        <Link href="/dashboard/blog" className={buttonGhostClass}>
          Cancel
        </Link>
      </div>

      {mode === "edit" && state && !state.error && (
        <p className="text-[13px] text-calm">Saved.</p>
      )}
    </form>
  );
}
