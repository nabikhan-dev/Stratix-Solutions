import { PageHeader, Card } from "@/components/dashboard/ui";
import ProjectForm from "../ProjectForm";
import { createProjectAction } from "../actions";

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader title="New project" description="Add a case study to /work." />
      <Card>
        <ProjectForm mode="create" action={createProjectAction} />
      </Card>
    </div>
  );
}
