"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card } from "@/components/dashboard/ui";
import BlogForm from "../BlogForm";
import { listBlogPosts } from "@/lib/dashboard/store";

export default function NewBlogPostPage() {
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listBlogPosts().then((posts) => {
      setExistingCategories(
        Array.from(new Set(posts.map((p) => p.category).filter(Boolean))).sort()
      );
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;

  return (
    <div>
      <PageHeader title="New blog post" description="Publish a new post to /blog." />
      <Card>
        <BlogForm mode="create" existingCategories={existingCategories} />
      </Card>
    </div>
  );
}
