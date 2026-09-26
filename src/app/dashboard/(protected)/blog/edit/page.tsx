import { Suspense } from "react";
import EditBlogPostRoute from "./EditBlogPostRoute";

function EditBlogPostFallback() {
  return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;
}

export default function EditBlogPostPage() {
  return (
    <Suspense fallback={<EditBlogPostFallback />}>
      <EditBlogPostRoute />
    </Suspense>
  );
}
