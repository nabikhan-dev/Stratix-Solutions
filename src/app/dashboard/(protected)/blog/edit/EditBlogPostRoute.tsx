"use client";

import { useSearchParams } from "next/navigation";
import EditBlogPostClient from "./EditBlogPostClient";

export default function EditBlogPostRoute() {
  const slug = useSearchParams().get("slug")?.trim();

  if (!slug) {
    return <p className="py-12 text-center text-[13.5px] text-muted">Post not found.</p>;
  }

  return <EditBlogPostClient slug={slug} />;
}
