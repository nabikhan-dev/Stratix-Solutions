"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card } from "@/components/dashboard/ui";
import ProjectForm from "../ProjectForm";
import { listProjects } from "@/lib/dashboard/store";

export default function NewProjectPage() {
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listProjects().then((projects) => {
      setExistingCategories(
        Array.from(new Set(projects.map((p) => p.category).filter(Boolean) as string[])).sort()
      );
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;

  return (
    <div>
      <PageHeader title="New project" description="Add a case study to /work." />
      <Card>
        <ProjectForm mode="create" existingCategories={existingCategories} />
      </Card>
    </div>
  );
}
