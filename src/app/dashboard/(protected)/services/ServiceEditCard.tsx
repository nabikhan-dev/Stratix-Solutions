"use client";

import { useActionState } from "react";
import { Field, inputClass, scrollableInputClass, Card, FormError, textareaClass} from "@/components/dashboard/ui";
import SubmitButton from "@/components/dashboard/SubmitButton";
import { updateServiceAction, type ServiceFormState } from "./actions";
import type { PrimaryService } from "@/data/content";

export default function ServiceEditCard({ service }: { service: PrimaryService }) {
  const [state, formAction] = useActionState<ServiceFormState, FormData>(updateServiceAction, undefined);

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <span className="font-display text-[13px] text-faint">{service.number}</span>
        <h2 className="text-[15px] font-semibold text-primary">{service.title}</h2>
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={service.id} />

        <Field label="Title" htmlFor={`title-${service.id}`}>
          <input id={`title-${service.id}`} name="title" required defaultValue={service.title} className={inputClass} />
        </Field>

        <Field label="Short description" htmlFor={`short-${service.id}`}>
          <textarea id={`short-${service.id}`} name="short" required defaultValue={service.short} className={scrollableInputClass} data-lenis-prevent="true" />
        </Field>

        <Field label="Full description" htmlFor={`description-${service.id}`}>
          <textarea
            id={`description-${service.id}`}
            name="description"
            required
            rows={4}
            defaultValue={service.description}
            className={textareaClass}
            data-lenis-prevent="true"
          />
        </Field>

        <Field label="Motif words" htmlFor={`motifWords-${service.id}`} hint="Comma-separated.">
          <input
            id={`motifWords-${service.id}`}
            name="motifWords"
            defaultValue={service.motifWords.join(", ")}
            className={inputClass}
          />
        </Field>

        <Field label="Visibility" htmlFor={`isActive-${service.id}`}>
          <label className="flex items-center gap-2 text-[14px] text-primary">
            <input
              type="checkbox"
              id={`isActive-${service.id}`}
              name="isActive"
              value="true"
              defaultChecked={service.isActive !== false}
              className="h-4 w-4 rounded border-line text-signal focus:ring-signal"
            />
            Show this service on the public site
          </label>
        </Field>

        <FormError message={state?.error} />

        <div className="flex items-center gap-3">
          <SubmitButton pendingLabel="Saving…">Save</SubmitButton>
          {state?.savedAt && <p className="text-[13px] text-calm">Saved.</p>}
        </div>
      </form>
    </Card>
  );
}
