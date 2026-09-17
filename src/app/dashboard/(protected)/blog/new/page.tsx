import { PageHeader, Card } from "@/components/dashboard/ui";
import BlogForm from "../BlogForm";
import { createBlogPostAction } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <PageHeader title="New blog post" description="Publish a new post to /blog." />
      <Card>
        <BlogForm mode="create" action={createBlogPostAction} />
      </Card>
    </div>
  );
}
