import { notFound } from "next/navigation";
import { PageHeader, Card } from "@/components/dashboard/ui";
import DeleteForm from "@/components/dashboard/DeleteForm";
import BlogForm from "../BlogForm";
import { deleteBlogPostAction, updateBlogPostAction } from "../actions";
import { getBlogPost } from "@/lib/dashboard/store";

export default async function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div>
      <PageHeader
        title="Edit post"
        description={post.title}
        actions={
          <DeleteForm
            action={deleteBlogPostAction}
            hiddenFields={{ slug: post.slug }}
            confirmMessage={`Delete "${post.title}"? This can't be undone.`}
          />
        }
      />
      <Card>
        <BlogForm mode="edit" post={post} action={updateBlogPostAction} />
      </Card>
    </div>
  );
}
