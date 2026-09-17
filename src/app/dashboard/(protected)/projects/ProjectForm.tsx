"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Field, inputClass, FormError, buttonGhostClass } from "@/components/dashboard/ui";
import SubmitButton from "@/components/dashboard/SubmitButton";
import ImageUrlField from "@/components/dashboard/ImageUrlField";
import type { Project } from "@/data/projects";
import type { ProjectFormState } from "./actions";

export default function ProjectForm({
  mode,
  project,
  action,
}: {
  mode: "create" | "edit";
  project?: Project;
  action: (state: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
}) {
  const [state, formAction] = useActionState<ProjectFormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {mode === "edit" && project && <input type="hidden" name="id" value={project.id} />}

      <Field label="Title" htmlFor="title">
        <input id="title" name="title" required defaultValue={project?.title} className={inputClass} />
      </Field>

      <Field label="Description" htmlFor="description">
        <textarea id="description" name="description" required rows={3} defaultValue={project?.description} className={inputClass} />
      </Field>

      <Field label="Tags" htmlFor="tags" hint="Comma-separated, e.g. Figma Design, Next.js, Tailwind CSS">
        <input id="tags" name="tags" defaultValue={project?.tags.join(", ")} className={inputClass} />
      </Field>

      <ImageUrlField id="image" name="image" label="Cover image" defaultValue={project?.image} required />

      <Field label="Gallery images" htmlFor="gallery" hint="One image URL per line.">
        <textarea id="gallery" name="gallery" rows={4} defaultValue={project?.gallery.join("\n")} className={`${inputClass} font-mono text-[13px]`} />
      </Field>

      <Field label="Results" htmlFor="results" hint="One result per line, e.g. Increased conversion by 340%">
        <textarea id="results" name="results" rows={5} defaultValue={project?.results.join("\n")} className={inputClass} />
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

      <FormError message={state?.error} />

      <div className="flex items-center gap-3">
        <SubmitButton pendingLabel={mode === "create" ? "Creating…" : "Saving…"}>
          {mode === "create" ? "Create project" : "Save changes"}
        </SubmitButton>
        <Link href="/dashboard/projects" className={buttonGhostClass}>
          Cancel
        </Link>
      </div>

      {mode === "edit" && state && !state.error && <p className="text-[13px] text-calm">Saved.</p>}
    </form>
  );
}
