import { PageHeader, Card } from "@/components/dashboard/ui";
import ProjectForm from "../ProjectForm";
import { createProjectAction } from "../actions";
import { listProjects } from "@/lib/dashboard/store";

export default async function NewProjectPage() {
  const existingCategories = Array.from(
    new Set((await listProjects()).map((p) => p.category).filter(Boolean) as string[])
  ).sort();

  return (
    <div>
      <PageHeader title="New project" description="Add a case study to /work." />
      <Card>
        <ProjectForm mode="create" action={createProjectAction} existingCategories={existingCategories} />
      </Card>
    </div>
  );
}
