"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PageHeader, Card } from "@/components/dashboard/ui";
import DeleteButton from "@/components/dashboard/DeleteButton";
import ProjectForm from "../ProjectForm";
import { deleteProjectAction } from "../actions";
import { getProject, listProjects } from "@/lib/dashboard/store";
import type { Project } from "@/data/projects";

export default function EditProjectClient({ id }: { id: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    Promise.all([getProject(Number(id)), listProjects()]).then(([p, all]) => {
      setProject(p ?? null);
      setExistingCategories(
        Array.from(new Set(all.map((x) => x.category).filter(Boolean) as string[])).sort()
      );
      setLoading(false);
    });
  }, [id]);

  function handleDelete() {
    setIsDeleting(true);
    startTransition(async () => {
      await deleteProjectAction(Number(id));
      router.push("/dashboard/projects");
    });
  }

  if (loading) return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;
  if (!project) return <p className="py-12 text-center text-[13.5px] text-muted">Project not found.</p>;

  return (
    <div>
      <PageHeader
        title="Edit project"
        description={project.title}
        actions={
          <DeleteButton
            onDelete={handleDelete}
            confirmMessage={`Delete "${project.title}"? This can't be undone.`}
            isPending={isDeleting}
          />
        }
      />
      <Card>
        <ProjectForm mode="edit" project={project} existingCategories={existingCategories} />
      </Card>
    </div>
  );
}
