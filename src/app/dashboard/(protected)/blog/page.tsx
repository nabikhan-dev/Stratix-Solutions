import Link from "next/link";
import { PageHeader, Table, Th, Td, Badge, EmptyState, buttonPrimaryClass, buttonGhostClass } from "@/components/dashboard/ui";
import DeleteForm from "@/components/dashboard/DeleteForm";
import { listBlogPosts } from "@/lib/dashboard/store";
import { deleteBlogPostAction } from "./actions";

export default function DashboardBlogListPage() {
  const posts = listBlogPosts();

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

      {posts.length === 0 ? (
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
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Date</Th>
              <Th></Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug}>
                <Td className="font-medium">{post.title}</Td>
                <Td className="text-muted">{post.category}</Td>
                <Td className="text-muted">{post.date}</Td>
                <Td>{post.featured && <Badge tone="signal">Featured</Badge>}</Td>
                <Td className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/blog/${post.slug}`} className={buttonGhostClass}>
                      Edit
                    </Link>
                    <DeleteForm
                      action={deleteBlogPostAction}
                      hiddenFields={{ slug: post.slug }}
                      confirmMessage={`Delete "${post.title}"? This can't be undone.`}
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
