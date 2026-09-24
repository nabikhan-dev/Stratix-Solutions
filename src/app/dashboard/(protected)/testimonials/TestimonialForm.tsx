"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Field, inputClass, FormError, buttonGhostClass, textareaClass} from "@/components/dashboard/ui";
import SubmitButton from "@/components/dashboard/SubmitButton";
import ImageUrlField from "@/components/dashboard/ImageUrlField";
import type { Testimonial } from "@/data/testimonials";
import type { TestimonialFormState } from "./actions";

export default function TestimonialForm({
  mode,
  testimonial,
  action,
}: {
  mode: "create" | "edit";
  testimonial?: Testimonial;
  action: (state: TestimonialFormState, formData: FormData) => Promise<TestimonialFormState>;
}) {
  const [state, formAction] = useActionState<TestimonialFormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-6">
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

      <FormError message={state?.error} />

      <div className="flex items-center gap-3">
        <SubmitButton pendingLabel={mode === "create" ? "Creating…" : "Saving…"}>
          {mode === "create" ? "Create testimonial" : "Save changes"}
        </SubmitButton>
        <Link href="/dashboard/testimonials" className={buttonGhostClass}>
          Cancel
        </Link>
      </div>

      {mode === "edit" && state && !state.error && <p className="text-[13px] text-calm">Saved.</p>}
    </form>
  );
}
