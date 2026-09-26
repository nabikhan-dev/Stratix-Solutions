import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/ui";
import TestimonialForm from "../TestimonialForm";
import { updateTestimonialAction } from "../actions";
import { getTestimonial, listTestimonials } from "@/lib/dashboard/store";

export async function generateStaticParams() {
  const testimonials = await listTestimonials();
  return testimonials.map((t) => ({ id: String(t.id) }));
}

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await getTestimonial(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Edit Testimonial"
        description="Update an existing testimonial."
        backLink="/dashboard/testimonials"
        backLabel="Testimonials"
      />
      <div className="mt-8">
        <TestimonialForm mode="edit" testimonial={testimonial} action={updateTestimonialAction} />
      </div>
    </div>
  );
}
