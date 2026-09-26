import { Suspense } from "react";
import EditProjectRoute from "./EditProjectRoute";

function EditProjectFallback() {
  return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;
}

export default function EditProjectPage() {
  return (
    <Suspense fallback={<EditProjectFallback />}>
      <EditProjectRoute />
    </Suspense>
  );
}
