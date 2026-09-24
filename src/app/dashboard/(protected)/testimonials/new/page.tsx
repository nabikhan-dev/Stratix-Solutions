import { PageHeader } from "@/components/dashboard/ui";
import TestimonialForm from "../TestimonialForm";
import { createTestimonialAction } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader
        title="New Testimonial"
        description="Add a new client testimonial to the landing page."
        backLink="/dashboard/testimonials"
        backLabel="Testimonials"
      />
      <div className="mt-8">
        <TestimonialForm mode="create" action={createTestimonialAction} />
      </div>
    </div>
  );
}
