// Server component wrapper — exports generateStaticParams for output:"export",
// then delegates all rendering to the client component.
import EditTestimonialClient from "./EditTestimonialClient";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: "__placeholder__" }];
}

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  return <EditTestimonialClient id={params.id} />;
}
