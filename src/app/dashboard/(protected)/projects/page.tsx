import Link from "next/link";
import { PageHeader, Table, Th, Td, EmptyState, buttonPrimaryClass, buttonGhostClass } from "@/components/dashboard/ui";
import DeleteForm from "@/components/dashboard/DeleteForm";
import { listProjects } from "@/lib/dashboard/store";
import { deleteProjectAction } from "./actions";

export default async function DashboardProjectsListPage() {
  const projects = await listProjects();

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Case studies shown on /work and the homepage portfolio."
        actions={
          <Link href="/dashboard/projects/new" className={buttonPrimaryClass}>
            New project
          </Link>
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          action={
            <Link href="/dashboard/projects/new" className={buttonPrimaryClass}>
              New project
            </Link>
          }
        />
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Tags</Th>
              <Th>Metric</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <Td className="font-medium">{project.title}</Td>
                <Td className="text-muted">{project.tags.slice(0, 2).join(", ")}{project.tags.length > 2 ? "…" : ""}</Td>
                <Td className="text-muted">
                  {project.metric.value} <span className="text-faint">{project.metric.label}</span>
                </Td>
                <Td className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/projects/${project.id}`} className={buttonGhostClass}>
                      Edit
                    </Link>
                    <DeleteForm
                      action={deleteProjectAction}
                      hiddenFields={{ id: String(project.id) }}
                      confirmMessage={`Delete "${project.title}"? This can't be undone.`}
                    />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
