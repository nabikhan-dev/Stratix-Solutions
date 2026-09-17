"use client";

import { useActionState } from "react";
import { Card, Field, inputClass, FormError } from "@/components/dashboard/ui";
import SubmitButton from "@/components/dashboard/SubmitButton";
import { updateSettingsAction, type SettingsFormState } from "./actions";
import type { SiteSettings } from "@/lib/dashboard/store";

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction] = useActionState<SettingsFormState, FormData>(updateSettingsAction, undefined);

  return (
    <Card className="max-w-2xl">
      <form action={formAction} className="flex flex-col gap-5">
        <Field label="Site title" htmlFor="siteTitle" hint="Used as the default <title> and Open Graph title.">
          <input id="siteTitle" name="siteTitle" required defaultValue={settings.siteTitle} className={inputClass} />
        </Field>

        <Field label="Site description" htmlFor="siteDescription">
          <textarea
            id="siteDescription"
            name="siteDescription"
            required
            rows={3}
            defaultValue={settings.siteDescription}
            className={inputClass}
          />
        </Field>

        <Field label="Open Graph image path" htmlFor="ogImage" hint="Relative to /public, e.g. /og-image.png (1200×630).">
          <input id="ogImage" name="ogImage" defaultValue={settings.ogImage} className={inputClass} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Contact email" htmlFor="contactEmail">
            <input id="contactEmail" name="contactEmail" type="email" required defaultValue={settings.contactEmail} className={inputClass} />
          </Field>
          <Field label="Response time" htmlFor="responseTime" hint='e.g. "Replies within one business day"'>
            <input id="responseTime" name="responseTime" defaultValue={settings.responseTime} className={inputClass} />
          </Field>
        </div>

        <Field label="Serving area" htmlFor="serving">
          <input id="serving" name="serving" defaultValue={settings.serving} className={inputClass} />
        </Field>

        <Field label="Contact form note" htmlFor="contactNote">
          <textarea id="contactNote" name="contactNote" rows={3} defaultValue={settings.contactNote} className={inputClass} />
        </Field>

        <FormError message={state?.error} />

        <div className="flex items-center gap-3">
          <SubmitButton pendingLabel="Saving…">Save changes</SubmitButton>
          {state?.savedAt && <p className="text-[13px] text-calm">Saved.</p>}
        </div>
      </form>
    </Card>
  );
}
