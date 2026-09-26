"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/dashboard/ui";
import TestimonialForm from "../TestimonialForm";
import { getTestimonial } from "@/lib/dashboard/store";
import type { Testimonial } from "@/data/testimonials";

export default function EditTestimonialClient({ id }: { id: string }) {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonial(id).then((t) => {
      setTestimonial(t ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;
  if (!testimonial) return <p className="py-12 text-center text-[13.5px] text-muted">Testimonial not found.</p>;

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Edit Testimonial"
        description="Update an existing testimonial."
        backLink="/dashboard/testimonials"
        backLabel="Testimonials"
      />
      <div className="mt-8">
        <TestimonialForm mode="edit" testimonial={testimonial} />
      </div>
    </div>
  );
}
