import { PageHeader, Card } from "@/components/dashboard/ui";
import BlogForm from "../BlogForm";
import { createBlogPostAction } from "../actions";
import { listBlogPosts } from "@/lib/dashboard/store";

export default async function NewBlogPostPage() {
  const existingCategories = Array.from(
    new Set((await listBlogPosts()).map((p) => p.category).filter(Boolean))
  ).sort();

  return (
    <div>
      <PageHeader title="New blog post" description="Publish a new post to /blog." />
      <Card>
        <BlogForm mode="create" action={createBlogPostAction} existingCategories={existingCategories} />
      </Card>
    </div>
  );
}
