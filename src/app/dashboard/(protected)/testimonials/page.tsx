"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader, Table, Th, Td, EmptyState, buttonPrimaryClass, buttonGhostClass } from "@/components/dashboard/ui";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { listTestimonials } from "@/lib/dashboard/store";
import { deleteTestimonialAction } from "./actions";
import type { Testimonial } from "@/data/testimonials";

export default function DashboardTestimonialsListPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    listTestimonials().then((data) => {
      setTestimonials(data);
      setLoading(false);
    });
  }, []);

  function handleDelete(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      await deleteTestimonialAction(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setDeletingId(null);
      router.refresh();
    });
  }

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

      {loading ? (
        <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>
      ) : testimonials.length === 0 ? (
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
                    <DeleteButton
                      onDelete={() => handleDelete(testimonial.id)}
                      confirmMessage={`Delete "${testimonial.author}"? This can't be undone.`}
                      isPending={deletingId === testimonial.id}
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
