"use client";

import { buttonDangerClass } from "./ui";
import SubmitButton from "./SubmitButton";

/** A tiny <form> that confirms before submitting a delete Server Action. */
export default function DeleteForm({
  action,
  hiddenFields,
  confirmMessage,
  label = "Delete",
}: {
  action: (formData: FormData) => void;
  hiddenFields: Record<string, string>;
  confirmMessage: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <SubmitButton pendingLabel="Deleting…" className={buttonDangerClass}>
        {label}
      </SubmitButton>
    </form>
  );
}
