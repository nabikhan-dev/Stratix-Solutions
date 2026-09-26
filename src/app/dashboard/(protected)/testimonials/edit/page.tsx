import { Suspense } from "react";
import EditTestimonialRoute from "./EditTestimonialRoute";

function EditTestimonialFallback() {
  return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;
}

export default function EditTestimonialPage() {
  return (
    <Suspense fallback={<EditTestimonialFallback />}>
      <EditTestimonialRoute />
    </Suspense>
  );
}
