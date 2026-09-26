"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader, Table, Th, Td, EmptyState, buttonPrimaryClass, buttonGhostClass } from "@/components/dashboard/ui";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { listProjects } from "@/lib/dashboard/store";
import { deleteProjectAction } from "./actions";
import type { Project } from "@/data/projects";

export default function DashboardProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    listProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  function handleDelete(id: number) {
    setDeletingId(id);
    startTransition(async () => {
      await deleteProjectAction(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeletingId(null);
      router.refresh();
    });
  }

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

      {loading ? (
        <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>
      ) : projects.length === 0 ? (
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
                    <DeleteButton
                      onDelete={() => handleDelete(project.id)}
                      confirmMessage={`Delete "${project.title}"? This can't be undone.`}
                      isPending={deletingId === project.id}
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
