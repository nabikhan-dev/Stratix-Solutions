"use client";

import { buttonDangerClass } from "./ui";

/** A button that confirms before calling an async delete function. */
export default function DeleteButton({
  onDelete,
  confirmMessage,
  label = "Delete",
  isPending = false,
}: {
  onDelete: () => void | Promise<void>;
  confirmMessage: string;
  label?: string;
  isPending?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={isPending}
      className={buttonDangerClass}
      onClick={() => {
        if (window.confirm(confirmMessage)) {
          onDelete();
        }
      }}
    >
      {isPending ? "Deleting…" : label}
    </button>
  );
}
