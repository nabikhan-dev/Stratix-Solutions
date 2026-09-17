"use client";

import { useFormStatus } from "react-dom";
import { buttonPrimaryClass } from "./ui";

export default function SubmitButton({
  children,
  pendingLabel = "Saving…",
  className = buttonPrimaryClass,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}
