"use client";

import { useState, useTransition } from "react";
import { Card, Field, inputClass, FormError, textareaClass, labelClass } from "@/components/dashboard/ui";
import { updateSettingsAction } from "./actions";
import type { SiteSettings } from "@/lib/dashboard/store";

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [error, setError] = useState<string | undefined>();
  const [savedAt, setSavedAt] = useState<number | undefined>();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(undefined);
    setSavedAt(undefined);
    startTransition(async () => {
      const result = await updateSettingsAction(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.savedAt) {
        setSavedAt(result.savedAt);
      }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      {/* ── Site metadata ───────────────────────────── */}
      <Card className="max-w-2xl">
        <h2 className="mb-5 text-[15px] font-semibold text-primary">Site metadata</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" id="settings-form">
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
              className={textareaClass}
              data-lenis-prevent="true"
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
            <textarea id="contactNote" name="contactNote" rows={3} defaultValue={settings.contactNote} className={textareaClass} data-lenis-prevent="true" />
          </Field>

          {/* ── About page stats ─────────────────────── */}
          <div className="border-t border-line pt-5">
            <p className="mb-4 text-[14px] font-semibold text-primary">About page — stats strip</p>
            <p className="mb-5 text-[12.5px] text-faint">These three numbers appear in the strip below the hero on the About page.</p>

            {/* Stat 1 */}
            <div className="mb-5 rounded-xl border border-line bg-deep/40 p-4">
              <p className={`${labelClass} mb-3 text-signal`}>Stat 1</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Label" htmlFor="stat1Label">
                  <input id="stat1Label" name="stat1Label" defaultValue={settings.stat1Label} className={inputClass} />
                </Field>
                <Field label="Value" htmlFor="stat1Value" hint='e.g. "2026" or "10+"'>
                  <input id="stat1Value" name="stat1Value" defaultValue={settings.stat1Value} className={inputClass} />
                </Field>
                <Field label="Description" htmlFor="stat1Desc">
                  <input id="stat1Desc" name="stat1Desc" defaultValue={settings.stat1Desc} className={inputClass} />
                </Field>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="mb-5 rounded-xl border border-line bg-deep/40 p-4">
              <p className={`${labelClass} mb-3 text-aurora`}>Stat 2</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Label" htmlFor="stat2Label">
                  <input id="stat2Label" name="stat2Label" defaultValue={settings.stat2Label} className={inputClass} />
                </Field>
                <Field label="Value" htmlFor="stat2Value" hint='e.g. "10+"'>
                  <input id="stat2Value" name="stat2Value" defaultValue={settings.stat2Value} className={inputClass} />
                </Field>
                <Field label="Description" htmlFor="stat2Desc">
                  <input id="stat2Desc" name="stat2Desc" defaultValue={settings.stat2Desc} className={inputClass} />
                </Field>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="rounded-xl border border-line bg-deep/40 p-4">
              <p className={`${labelClass} mb-3 text-amber`}>Stat 3</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Label" htmlFor="stat3Label">
                  <input id="stat3Label" name="stat3Label" defaultValue={settings.stat3Label} className={inputClass} />
                </Field>
                <Field label="Value" htmlFor="stat3Value" hint='e.g. "8+"'>
                  <input id="stat3Value" name="stat3Value" defaultValue={settings.stat3Value} className={inputClass} />
                </Field>
                <Field label="Description" htmlFor="stat3Desc">
                  <input id="stat3Desc" name="stat3Desc" defaultValue={settings.stat3Desc} className={inputClass} />
                </Field>
              </div>
            </div>
          </div>

          <FormError message={error} />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-4 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Saving…" : "Save changes"}
            </button>
            {!isPending && savedAt && <p className="text-[13px] text-calm">Saved.</p>}
          </div>
        </form>
      </Card>
    </div>
  );
}
