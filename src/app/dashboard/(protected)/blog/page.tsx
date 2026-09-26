"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PageHeader, Table, Th, Td, Badge, EmptyState, buttonPrimaryClass, buttonGhostClass } from "@/components/dashboard/ui";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { listBlogPosts } from "@/lib/dashboard/store";
import { publicPath } from "@/lib/public-path";
import { deleteBlogPostAction } from "./actions";
import type { BlogPost } from "@/data/blog";

export default function DashboardBlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    listBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  function handleDelete(slug: string) {
    setDeletingSlug(slug);
    startTransition(async () => {
      await deleteBlogPostAction(slug);
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      setDeletingSlug(null);
      router.refresh();
    });
  }

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Posts shown on /blog, newest first."
        actions={
          <Link href="/dashboard/blog/new" className={buttonPrimaryClass}>
            New post
          </Link>
        }
      />

      {loading ? (
        <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>
      ) : posts.length === 0 ? (
        <EmptyState
          title="No blog posts yet"
          description="Create your first post to see it here."
          action={
            <Link href="/dashboard/blog/new" className={buttonPrimaryClass}>
              New post
            </Link>
          }
        />
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Post</Th>
              <Th>Category</Th>
              <Th>Author</Th>
              <Th>Date</Th>
              <Th></Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug} className="group">
                <Td>
                  <div className="flex items-center gap-3 min-w-0">
                    {post.image && (
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-line bg-deep">
                        <Image
                          src={publicPath(post.image)}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium text-primary max-w-[260px]">{post.title}</p>
                      {post.excerpt && (
                        <p className="mt-0.5 truncate text-[12px] text-faint max-w-[260px]">{post.excerpt}</p>
                      )}
                    </div>
                  </div>
                </Td>

                <Td className="text-muted whitespace-nowrap">{post.category}</Td>

                <Td>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] text-primary max-w-[120px]">{post.author?.name}</p>
                    <p className="truncate text-[12px] text-faint max-w-[120px]">{post.author?.role}</p>
                  </div>
                </Td>

                <Td className="text-muted whitespace-nowrap text-[13px]">{post.date}</Td>

                <Td>{post.featured && <Badge tone="signal">Featured</Badge>}</Td>

                <Td className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/blog/${post.slug}`} className={buttonGhostClass}>
                      Edit
                    </Link>
                    <DeleteButton
                      onDelete={() => handleDelete(post.slug)}
                      confirmMessage={`Delete "${post.title}"? This can't be undone.`}
                      isPending={deletingSlug === post.slug}
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
