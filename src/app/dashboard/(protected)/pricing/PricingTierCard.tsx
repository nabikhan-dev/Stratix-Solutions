"use client";

import { useState, useTransition } from "react";
import { Field, inputClass, Card, FormError } from "@/components/dashboard/ui";
import { updatePricingTierAction } from "./actions";
import type { PricingTier } from "@/data/content";

export default function PricingTierCard({ tier, allFeatures }: { tier: PricingTier; allFeatures: string[] }) {
  const [error, setError] = useState<string | undefined>();
  const [savedAt, setSavedAt] = useState<number | undefined>();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(undefined);
    setSavedAt(undefined);
    startTransition(async () => {
      const result = await updatePricingTierAction(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.savedAt) {
        setSavedAt(result.savedAt);
      }
    });
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={tier.id} />

        <Field label="Package name" htmlFor={`name-${tier.id}`}>
          <input id={`name-${tier.id}`} name="name" required defaultValue={tier.name} className={inputClass} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Price" htmlFor={`price-${tier.id}`} hint='e.g. "$5k"'>
            <input id={`price-${tier.id}`} name="price" required defaultValue={tier.price} className={inputClass} />
          </Field>
          <Field label="Timeline" htmlFor={`timeline-${tier.id}`} hint='e.g. "2-3 weeks"'>
            <input id={`timeline-${tier.id}`} name="timeline" defaultValue={tier.timeline} className={inputClass} />
          </Field>
        </div>

        <Field label="Features" htmlFor={`features-${tier.id}`} hint="Check to enable, and edit text if needed.">
          <div className="flex flex-col gap-2">
            {allFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={`feature_enabled_${i}`}
                  value="true"
                  defaultChecked={tier.features.includes(feature)}
                  className="h-4 w-4 shrink-0 rounded border-line text-signal focus:ring-signal"
                />
                <input
                  type="text"
                  name={`feature_text_${i}`}
                  defaultValue={feature}
                  className={`${inputClass} flex-1 py-1.5 text-[13px]`}
                />
              </div>
            ))}
            <div className="mt-1 flex items-center gap-2">
              <div className="h-4 w-4 shrink-0" />
              <input
                type="text"
                name="newFeature"
                placeholder="Add a new feature..."
                className={`${inputClass} flex-1 py-1.5 text-[13px]`}
              />
            </div>
          </div>
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
