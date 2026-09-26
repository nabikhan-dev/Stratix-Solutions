// Server component wrapper — exports generateStaticParams for output:"export",
// then delegates all rendering to the client component.
import EditBlogPostClient from "./EditBlogPostClient";

export const dynamicParams = false;

export async function generateStaticParams() {
  // Return a placeholder so static export doesn't fail when no posts exist yet.
  // The actual data is fetched client-side by EditBlogPostClient.
  return [{ slug: "__placeholder__" }];
}

export default function EditBlogPostPage({ params }: { params: { slug: string } }) {
  return <EditBlogPostClient slug={params.slug} />;
}
