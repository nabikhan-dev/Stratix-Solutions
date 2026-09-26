"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Field, inputClass, FormError, buttonGhostClass, textareaClass } from "@/components/dashboard/ui";
import ImageUrlField from "@/components/dashboard/ImageUrlField";
import CategoryCombobox from "@/components/dashboard/CategoryCombobox";
import type { Project } from "@/data/projects";
import { createProjectAction, updateProjectAction } from "./actions";

export default function ProjectForm({
  mode,
  project,
  existingCategories = [],
}: {
  mode: "create" | "edit";
  project?: Project;
  existingCategories?: string[];
}) {
  const [error, setError] = useState<string | undefined>();
  const [galleryUrls, setGalleryUrls] = useState<string[]>(project?.gallery ?? [""]);
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
        const result = await createProjectAction(formData);
        if (result.error) {
          setError(result.error);
        } else {
          router.push(`/dashboard/projects/edit/?id=${result.id}`);
        }
      } else {
        const result = await updateProjectAction(formData);
        if (result.error) {
          setError(result.error);
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {mode === "edit" && project && <input type="hidden" name="id" value={project.id} />}

      <Field label="Title" htmlFor="title">
        <input id="title" name="title" required defaultValue={project?.title} className={inputClass} />
      </Field>

      <Field label="Description" htmlFor="description">
        <textarea id="description" name="description" required rows={3} defaultValue={project?.description} className={textareaClass} data-lenis-prevent="true" />
      </Field>

      <Field label="Tags" htmlFor="tags" hint="Comma-separated, e.g. Figma Design, Next.js, Tailwind CSS">
        <input id="tags" name="tags" defaultValue={project?.tags.join(", ")} className={inputClass} />
      </Field>

      <Field label="Category" htmlFor="category" hint='e.g. Websites, Mobile Apps, Digital Strategy'>
        <CategoryCombobox defaultValue={project?.category} existingCategories={existingCategories} />
      </Field>

      <Field label="Live URL" htmlFor="url" hint="Optional link to the live project (e.g. https://example.com)">
        <input id="url" name="url" type="url" defaultValue={project?.url} className={inputClass} />
      </Field>

      <ImageUrlField id="image" name="image" label="Cover image" defaultValue={project?.image} required />

      <div className="flex flex-col gap-3">
        <label className="text-[14px] font-medium text-primary">Gallery images</label>
        {galleryUrls.map((url, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="flex-1">
              <ImageUrlField
                id={`gallery-${index}`}
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

      <Field label="Results" htmlFor="results" hint="One result per line, e.g. Increased conversion by 340%">
        <textarea id="results" name="results" rows={5} defaultValue={project?.results?.join("\n")} className={textareaClass} data-lenis-prevent="true" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Metric value" htmlFor="metricValue" hint='e.g. "+45%"'>
          <input id="metricValue" name="metricValue" defaultValue={project?.metric.value} className={inputClass} />
        </Field>
        <Field label="Metric label" htmlFor="metricLabel" hint='e.g. "CONVERSION RATE"'>
          <input id="metricLabel" name="metricLabel" defaultValue={project?.metric.label} className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Background class" htmlFor="bg" hint='Tailwind class, e.g. "bg-[#3a3a3a]" or "bg-white"'>
          <input id="bg" name="bg" defaultValue={project?.bg} className={`${inputClass} font-mono text-[13px]`} />
        </Field>
        <Field label="Grid span class" htmlFor="span" hint='Tailwind class, e.g. "lg:col-span-7"'>
          <input id="span" name="span" defaultValue={project?.span} className={`${inputClass} font-mono text-[13px]`} />
        </Field>
      </div>

      <label className="flex items-center gap-2.5 text-[14px] font-medium text-primary">
        <input type="checkbox" name="light" defaultChecked={project?.light} className="size-4 rounded accent-signal" />
        Light card (use dark text on this background)
      </label>

      <FormError message={error} />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-4 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (mode === "create" ? "Creating…" : "Saving…") : (mode === "create" ? "Create project" : "Save changes")}
        </button>
        <Link href="/dashboard/projects" className={buttonGhostClass}>
          Cancel
        </Link>
      </div>

      {mode === "edit" && !isPending && !error && <p className="text-[13px] text-calm">Saved.</p>}
    </form>
  );
}
