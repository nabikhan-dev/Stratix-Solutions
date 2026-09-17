"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/dashboard/session";
import { createProject, deleteProject, updateProject } from "@/lib/dashboard/store";

export type ProjectFormState = { error?: string } | undefined;

function linesToList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readProjectFormData(formData: FormData) {
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
    image: String(formData.get("image") ?? "").trim(),
    gallery: linesToList(formData.get("gallery")),
    results: linesToList(formData.get("results")),
    metric: {
      value: String(formData.get("metricValue") ?? "").trim(),
      label: String(formData.get("metricLabel") ?? "").trim(),
    },
    bg: String(formData.get("bg") ?? "").trim() || "bg-white",
    span: String(formData.get("span") ?? "").trim() || "lg:col-span-6",
    light: formData.get("light") === "on",
  };
}

export async function createProjectAction(_prevState: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  await requireSession();

  let id: number;
  try {
    const project = createProject(readProjectFormData(formData));
    id = project.id;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't create the project." };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  redirect(`/dashboard/projects/${id}`);
}

export async function updateProjectAction(_prevState: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  await requireSession();

  const id = Number(formData.get("id"));
  try {
    updateProject(id, readProjectFormData(formData));
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Couldn't save the project." };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${id}`);
  revalidatePath("/dashboard");
  return { error: undefined };
}

export async function deleteProjectAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  deleteProject(id);
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  redirect("/dashboard/projects");
}
