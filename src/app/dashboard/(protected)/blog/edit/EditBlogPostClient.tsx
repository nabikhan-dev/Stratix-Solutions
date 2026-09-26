"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PageHeader, Card } from "@/components/dashboard/ui";
import DeleteButton from "@/components/dashboard/DeleteButton";
import BlogForm from "../BlogForm";
import { deleteBlogPostAction } from "../actions";
import { getBlogPost, listBlogPosts } from "@/lib/dashboard/store";
import type { BlogPost } from "@/data/blog";

export default function EditBlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    Promise.all([getBlogPost(slug), listBlogPosts()]).then(([p, all]) => {
      setPost(p ?? null);
      setExistingCategories(
        Array.from(new Set(all.map((x) => x.category).filter(Boolean))).sort()
      );
      setLoading(false);
    });
  }, [slug]);

  function handleDelete() {
    setIsDeleting(true);
    startTransition(async () => {
      await deleteBlogPostAction(slug);
      router.push("/dashboard/blog");
    });
  }

  if (loading) return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;
  if (!post) return <p className="py-12 text-center text-[13.5px] text-muted">Post not found.</p>;

  return (
    <div>
      <PageHeader
        title="Edit post"
        description={post.title}
        actions={
          <DeleteButton
            onDelete={handleDelete}
            confirmMessage={`Delete "${post.title}"? This can't be undone.`}
            isPending={isDeleting}
          />
        }
      />
      <Card>
        <BlogForm mode="edit" post={post} existingCategories={existingCategories} />
      </Card>
    </div>
  );
}
