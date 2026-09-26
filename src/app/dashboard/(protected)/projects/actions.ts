// Client-side project mutations — no "use server", no Server Actions.

import { createProject, deleteProject, updateProject } from "@/lib/dashboard/store";

export type ProjectFormState = { error?: string } | undefined;

function linesToList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function readProjectFormData(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!title) throw new Error("Title is required.");
  if (!description) throw new Error("Description is required.");

  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    title,
    description,
    tags,
    category: String(formData.get("category") ?? "").trim() || undefined,
    image: String(formData.get("image") ?? "").trim(),
    gallery: formData.getAll("gallery").map(String).map((u) => u.trim()).filter(Boolean),
    results: linesToList(formData.get("results")),
    metric: {
      value: String(formData.get("metricValue") ?? "").trim(),
      label: String(formData.get("metricLabel") ?? "").trim(),
    },
    bg: String(formData.get("bg") ?? "").trim() || "bg-white",
    span: String(formData.get("span") ?? "").trim() || "lg:col-span-6",
    light: formData.get("light") === "on",
    url: String(formData.get("url") ?? "").trim(),
  };
}

export async function createProjectAction(formData: FormData): Promise<{ error?: string; id?: number }> {
  try {
    const project = await createProject(readProjectFormData(formData));
    return { id: project.id };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't create the project." };
  }
}

export async function updateProjectAction(formData: FormData): Promise<{ error?: string }> {
  const id = Number(formData.get("id"));
  try {
    await updateProject(id, readProjectFormData(formData));
    return {};
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save the project." };
  }
}

export async function deleteProjectAction(id: number): Promise<void> {
  await deleteProject(id);
}
