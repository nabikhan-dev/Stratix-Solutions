import Link from "next/link";
import { PageHeader, Table, Th, Td, EmptyState, buttonPrimaryClass, buttonGhostClass } from "@/components/dashboard/ui";
import DeleteForm from "@/components/dashboard/DeleteForm";
import { listTestimonials } from "@/lib/dashboard/store";
import { deleteTestimonialAction } from "./actions";

export default async function DashboardTestimonialsListPage() {
  const testimonials = await listTestimonials();

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage the client testimonials shown on the landing pages."
        actions={
          <Link href="/dashboard/testimonials/new" className={buttonPrimaryClass}>
            New testimonial
          </Link>
        }
      />

      {testimonials.length === 0 ? (
        <EmptyState
          title="No testimonials yet"
          action={
            <Link href="/dashboard/testimonials/new" className={buttonPrimaryClass}>
              New testimonial
            </Link>
          }
        />
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Author</Th>
              <Th>Role</Th>
              <Th>Quote</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <Td className="font-medium">{testimonial.author}</Td>
                <Td className="text-muted">{testimonial.role}</Td>
                <Td className="text-muted max-w-xs truncate"><span title={testimonial.quote}>{testimonial.quote}</span></Td>
                <Td className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/testimonials/${testimonial.id}`} className={buttonGhostClass}>
                      Edit
                    </Link>
                    <DeleteForm
                      action={deleteTestimonialAction}
                      hiddenFields={{ id: String(testimonial.id) }}
                      confirmMessage={`Delete "${testimonial.author}"? This can't be undone.`}
                    />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
