"use client";

import { useSearchParams } from "next/navigation";
import EditTestimonialClient from "./EditTestimonialClient";

export default function EditTestimonialRoute() {
  const id = useSearchParams().get("id")?.trim();

  if (!id) {
    return <p className="py-12 text-center text-[13.5px] text-muted">Testimonial not found.</p>;
  }

  return <EditTestimonialClient id={id} />;
}
