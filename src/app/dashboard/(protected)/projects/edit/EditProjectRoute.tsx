"use client";

import { useSearchParams } from "next/navigation";
import EditProjectClient from "./EditProjectClient";

export default function EditProjectRoute() {
  const rawId = useSearchParams().get("id");
  const id = rawId ? Number(rawId) : Number.NaN;

  if (!Number.isInteger(id) || id < 1) {
    return <p className="py-12 text-center text-[13.5px] text-muted">Project not found.</p>;
  }

  return <EditProjectClient id={String(id)} />;
}
