"use client";

import { useState, useTransition } from "react";
import { Field, inputClass, scrollableInputClass, Card, FormError, textareaClass } from "@/components/dashboard/ui";
import { updateServiceAction } from "./actions";
import type { PrimaryService } from "@/data/content";

export default function ServiceEditCard({ service }: { service: PrimaryService }) {
  const [error, setError] = useState<string | undefined>();
  const [savedAt, setSavedAt] = useState<number | undefined>();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(undefined);
    setSavedAt(undefined);
    startTransition(async () => {
      const result = await updateServiceAction(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.savedAt) {
        setSavedAt(result.savedAt);
      }
    });
  }

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <span className="font-display text-[13px] text-faint">{service.number}</span>
        <h2 className="text-[15px] font-semibold text-primary">{service.title}</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <FormError message={error} />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-4 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Saving…" : "Save"}
          </button>
          {!isPending && savedAt && <p className="text-[13px] text-calm">Saved.</p>}
        </div>
      </form>
    </Card>
  );
}
