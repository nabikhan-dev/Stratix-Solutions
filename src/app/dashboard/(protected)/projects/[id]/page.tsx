// Server component wrapper — exports generateStaticParams for output:"export",
// then delegates all rendering to the client component.
import EditProjectClient from "./EditProjectClient";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: "__placeholder__" }];
}

export default function EditProjectPage({ params }: { params: { id: string } }) {
  return <EditProjectClient id={params.id} />;
}
