"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Field, inputClass, FormError, buttonGhostClass, textareaClass } from "@/components/dashboard/ui";
import ImageUrlField from "@/components/dashboard/ImageUrlField";
import type { Testimonial } from "@/data/testimonials";
import { createTestimonialAction, updateTestimonialAction } from "./actions";

export default function TestimonialForm({
  mode,
  testimonial,
}: {
  mode: "create" | "edit";
  testimonial?: Testimonial;
}) {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(undefined);
    startTransition(async () => {
      if (mode === "create") {
        const result = await createTestimonialAction(formData);
        if (result.error) {
          setError(result.error);
        } else {
          router.push(`/dashboard/testimonials/${result.id}`);
        }
      } else {
        const result = await updateTestimonialAction(formData);
        if (result.error) {
          setError(result.error);
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {mode === "edit" && testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      <Field label="Author" htmlFor="author">
        <input id="author" name="author" required defaultValue={testimonial?.author} className={inputClass} />
      </Field>
      
      <Field label="Role" htmlFor="role">
        <input id="role" name="role" required defaultValue={testimonial?.role} className={inputClass} />
      </Field>

      <Field label="Quote" htmlFor="quote">
        <textarea id="quote" name="quote" required rows={4} defaultValue={testimonial?.quote} className={textareaClass} data-lenis-prevent="true" />
      </Field>

      <ImageUrlField id="avatar" name="avatar" label="Avatar URL" defaultValue={testimonial?.avatar} required />

      <FormError message={error} />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-4 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (mode === "create" ? "Creating…" : "Saving…") : (mode === "create" ? "Create testimonial" : "Save changes")}
        </button>
        <Link href="/dashboard/testimonials" className={buttonGhostClass}>
          Cancel
        </Link>
      </div>

      {mode === "edit" && !isPending && !error && <p className="text-[13px] text-calm">Saved.</p>}
    </form>
  );
}
