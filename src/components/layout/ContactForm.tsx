"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { contact } from "@/data/content";
import SectionCtaButton from "@/components/layout/SectionCtaButton";
import SelectField from "@/components/layout/SelectField";
import { contactPage } from "@/data/copy";
import { RISE } from "@/lib/motion";

type Status = "idle" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!projectType) nextErrors.projectType = "Select a project type.";
    if (!budget) nextErrors.budget = "Select a budget range.";
    if (!message || message.length < 10) nextErrors.message = "Tell us a little more (10+ characters).";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("success");
    formEl.reset();
    setProjectType("");
    setBudget("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="name" error={errors.name}>
          <input {...fieldProps("name", errors.name)} type="text" autoComplete="name" placeholder="John Doe" />
        </Field>
        <Field label="Email Address" htmlFor="email" error={errors.email}>
          <input {...fieldProps("email", errors.email)} type="email" autoComplete="email" placeholder="john@example.com" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Project Type" htmlFor="projectType" error={errors.projectType}>
          <SelectField
            id="projectType"
            name="projectType"
            value={projectType}
            onChange={setProjectType}
            options={contact.projectTypes}
            placeholder="Select a project type"
            className={inputClass(!!errors.projectType)}
            error={errors.projectType}
          />
        </Field>
        <Field label="Budget Range" htmlFor="budget" error={errors.budget}>
          <SelectField
            id="budget"
            name="budget"
            value={budget}
            onChange={setBudget}
            options={contact.budgetRanges}
            placeholder="Select a budget range"
            className={inputClass(!!errors.budget)}
            error={errors.budget}
          />
        </Field>
      </div>

      <Field label="Your Message" htmlFor="message" error={errors.message}>
        <textarea
          {...fieldProps("message", errors.message)}
          rows={5}
          placeholder="Tell us about your AI, UI/UX, app, or web project — what it does, who it’s for, and any deadline you’re working toward."
        />
      </Field>

      <SectionCtaButton type="submit" fullWidth className="mt-2">
        Send Message
      </SectionCtaButton>

      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: RISE.sm }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="text-sm text-calm"
        >
          {contactPage.form.success}
        </motion.p>
      )}
      {status === "error" && Object.keys(errors).length > 0 && (
        <motion.p
          initial={{ opacity: 0, y: RISE.sm }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="text-sm text-amber"
        >
          Please fix the highlighted fields and try again.
        </motion.p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-xs text-muted">
        {label} *
      </label>
      {children}
      {error && (
        <span id={`${htmlFor}-error`} className="text-xs text-amber" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-void px-4 py-4 text-sm text-primary placeholder:text-faint outline-none transition focus:border-signal ${
    hasError ? "border-amber" : "border-line"
  }`;
}

/**
 * Everything a control needs to wire itself to its label and its error text.
 * Kept in one place so a field can't drift into being styled but not announced
 * — which is how the two selects ended up without `aria-invalid`.
 */
function fieldProps(name: string, error?: string) {
  return {
    id: name,
    name,
    required: true,
    className: inputClass(!!error),
    "aria-invalid": !!error,
    "aria-describedby": error ? `${name}-error` : undefined,
  };
}
