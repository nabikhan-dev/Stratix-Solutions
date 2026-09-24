import { notFound } from "next/navigation";
import { PageHeader, Card } from "@/components/dashboard/ui";
import DeleteForm from "@/components/dashboard/DeleteForm";
import ProjectForm from "../ProjectForm";
import { deleteProjectAction, updateProjectAction } from "../actions";
import { getProject, listProjects } from "@/lib/dashboard/store";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(Number(id));
  if (!project) notFound();

  const existingCategories = Array.from(
    new Set((await listProjects()).map((p) => p.category).filter(Boolean) as string[])
  ).sort();

  return (
    <div>
      <PageHeader
        title="Edit project"
        description={project.title}
        actions={
          <DeleteForm
            action={deleteProjectAction}
            hiddenFields={{ id: String(project.id) }}
            confirmMessage={`Delete "${project.title}"? This can't be undone.`}
          />
        }
      />
      <Card>
        <ProjectForm mode="edit" project={project} action={updateProjectAction} existingCategories={existingCategories} />
      </Card>
    </div>
  );
}
