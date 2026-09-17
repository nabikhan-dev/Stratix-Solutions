"use client";

import { useActionState } from "react";
import { Field, inputClass, Card, FormError } from "@/components/dashboard/ui";
import SubmitButton from "@/components/dashboard/SubmitButton";
import { updatePricingTierAction, type PricingFormState } from "./actions";
import type { PricingTier } from "@/data/content";

export default function PricingTierCard({ tier }: { tier: PricingTier }) {
  const [state, formAction] = useActionState<PricingFormState, FormData>(updatePricingTierAction, undefined);

  return (
    <Card>
      <form action={formAction} className="flex flex-col gap-4">
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

        <Field label="Features" htmlFor={`features-${tier.id}`} hint="One per line.">
          <textarea
            id={`features-${tier.id}`}
            name="features"
            rows={5}
            defaultValue={tier.features.join("\n")}
            className={inputClass}
          />
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
