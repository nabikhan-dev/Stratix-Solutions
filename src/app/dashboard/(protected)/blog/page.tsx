import Link from "next/link";
import Image from "next/image";
import { PageHeader, Table, Th, Td, Badge, EmptyState, buttonPrimaryClass, buttonGhostClass } from "@/components/dashboard/ui";
import DeleteForm from "@/components/dashboard/DeleteForm";
import { listBlogPosts } from "@/lib/dashboard/store";
import { deleteBlogPostAction } from "./actions";

export default async function DashboardBlogListPage() {
  const posts = await listBlogPosts();

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
                {/* Cover + title + excerpt */}
                <Td>
                  <div className="flex items-center gap-3 min-w-0">
                    {post.image && (
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-line bg-deep">
                        <Image
                          src={post.image}
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

                {/* Author */}
                <Td>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] text-primary max-w-[120px]">{post.author?.name}</p>
                    <p className="truncate text-[12px] text-faint max-w-[120px]">{post.author?.role}</p>
                  </div>
                </Td>

                <Td className="text-muted whitespace-nowrap text-[13px]">{post.date}</Td>

                {/* Featured badge */}
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
