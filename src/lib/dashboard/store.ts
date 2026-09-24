import "server-only";

import { getAdminDb } from "@/lib/firebase-admin";

import type { BlogPost } from "@/data/blog";
import type { Project } from "@/data/projects";
import type { Testimonial } from "@/data/testimonials";
import type { PrimaryService, PricingTier } from "@/data/content";
import type { PricingCategory } from "@/data/pricing";

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  ogImage: string;
  contactEmail: string;
  responseTime: string;
  serving: string;
  contactNote: string;
  // About page stats
  stat1Label: string;
  stat1Value: string;
  stat1Desc: string;
  stat2Label: string;
  stat2Value: string;
  stat2Desc: string;
  stat3Label: string;
  stat3Value: string;
  stat3Desc: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── Blog ────────────────────────────────────────────────────────────────

export async function listBlogPosts(): Promise<BlogPost[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("blogPosts").get();
  return snapshot.docs.map((d) => d.data() as BlogPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const db = getAdminDb();
  const snapshot = await db.collection("blogPosts").doc(slug).get();
  return snapshot.exists ? (snapshot.data() as BlogPost) : undefined;
}

export async function createBlogPost(
  input: Omit<BlogPost, "slug"> & { slug?: string }
): Promise<BlogPost> {
  const db = getAdminDb();
  const slug = input.slug?.trim() || slugify(input.title);
  const ref = db.collection("blogPosts").doc(slug);
  const snapshot = await ref.get();
  if (snapshot.exists) {
    throw new Error(`A post with slug "${slug}" already exists.`);
  }
  const post = { ...input, slug } as BlogPost;
  await ref.set(post);
  return post;
}

export async function updateBlogPost(
  slug: string,
  input: Partial<Omit<BlogPost, "slug">>
): Promise<BlogPost> {
  const db = getAdminDb();
  const ref = db.collection("blogPosts").doc(slug);
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error(`No post found with slug "${slug}".`);
  await ref.update(input);
  return { ...snapshot.data(), ...input } as BlogPost;
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const db = getAdminDb();
  await db.collection("blogPosts").doc(slug).delete();
}

// ── Projects ────────────────────────────────────────────────────────────

export async function listProjects(): Promise<Project[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("projects").get();
  return snapshot.docs.map((d) => d.data() as Project);
}

export async function getProject(id: number): Promise<Project | undefined> {
  const db = getAdminDb();
  const snapshot = await db.collection("projects").doc(id.toString()).get();
  return snapshot.exists ? (snapshot.data() as Project) : undefined;
}

export async function createProject(
  input: Omit<Project, "id">
): Promise<Project> {
  const db = getAdminDb();
  const projects = await listProjects();
  const nextId = projects.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const project = { ...input, id: nextId } as Project;
  await db.collection("projects").doc(nextId.toString()).set(project);
  return project;
}

export async function updateProject(
  id: number,
  input: Partial<Omit<Project, "id">>
): Promise<Project> {
  const db = getAdminDb();
  const ref = db.collection("projects").doc(id.toString());
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error(`No project found with id ${id}.`);
  await ref.update(input);
  return { ...snapshot.data(), ...input } as Project;
}

export async function deleteProject(id: number): Promise<void> {
  const db = getAdminDb();
  await db.collection("projects").doc(id.toString()).delete();
}

// ── Testimonials ────────────────────────────────────────────────────────

export async function listTestimonials(): Promise<Testimonial[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("testimonials").get();
  return snapshot.docs.map((d) => d.data() as Testimonial);
}

export async function getTestimonial(
  id: string
): Promise<Testimonial | undefined> {
  const db = getAdminDb();
  const snapshot = await db.collection("testimonials").doc(id).get();
  return snapshot.exists ? (snapshot.data() as Testimonial) : undefined;
}

export async function createTestimonial(
  input: Omit<Testimonial, "id">
): Promise<Testimonial> {
  const db = getAdminDb();
  const id = Date.now().toString();
  const testimonial = { ...input, id } as Testimonial;
  await db.collection("testimonials").doc(id).set(testimonial);
  return testimonial;
}

export async function updateTestimonial(
  id: string,
  input: Partial<Omit<Testimonial, "id">>
): Promise<Testimonial> {
  const db = getAdminDb();
  const ref = db.collection("testimonials").doc(id);
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error(`No testimonial found with id ${id}.`);
  await ref.update(input);
  return { ...snapshot.data(), ...input } as Testimonial;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const db = getAdminDb();
  await db.collection("testimonials").doc(id).delete();
}

// ── Services ────────────────────────────────────────────────────────────

export async function listServices(): Promise<PrimaryService[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("services").get();
  return snapshot.docs.map((d) => d.data() as PrimaryService);
}

export async function getService(
  id: string
): Promise<PrimaryService | undefined> {
  const db = getAdminDb();
  const snapshot = await db.collection("services").doc(id).get();
  return snapshot.exists ? (snapshot.data() as PrimaryService) : undefined;
}

export async function updateService(
  id: string,
  input: Partial<Omit<PrimaryService, "id">>
): Promise<PrimaryService> {
  const db = getAdminDb();
  const ref = db.collection("services").doc(id);
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error(`No service found with id "${id}".`);
  await ref.update(input);
  return { ...snapshot.data(), ...input } as PrimaryService;
}

// ── Pricing tiers ───────────────────────────────────────────────────────

export async function listPricingTiers(): Promise<PricingTier[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("pricingTiers").get();
  return snapshot.docs.map((d) => d.data() as PricingTier);
}

export async function updatePricingTier(
  id: string,
  input: Partial<Omit<PricingTier, "id">>
): Promise<PricingTier> {
  const db = getAdminDb();
  const ref = db.collection("pricingTiers").doc(id);
  const snapshot = await ref.get();
  if (!snapshot.exists)
    throw new Error(`No pricing tier found with id "${id}".`);
  await ref.update(input);
  return { ...snapshot.data(), ...input } as PricingTier;
}

// ── Feature categories/options ──────────────────────────────────────────

export async function listFeatureCategories(): Promise<PricingCategory[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("featureCategories").get();
  return snapshot.docs.map((d) => d.data() as PricingCategory);
}

export async function getFeatureCategory(
  categoryId: string
): Promise<PricingCategory | undefined> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("featureCategories")
    .doc(categoryId)
    .get();
  return snapshot.exists ? (snapshot.data() as PricingCategory) : undefined;
}

export async function updateFeatureOption(
  categoryId: string,
  optionId: string,
  input: { name?: string; price?: number }
): Promise<void> {
  const db = getAdminDb();
  const ref = db.collection("featureCategories").doc(categoryId);
  const snapshot = await ref.get();
  if (!snapshot.exists) return;
  const cat = snapshot.data() as PricingCategory;
  const newOptions = cat.options.map((opt) =>
    opt.id === optionId ? { ...opt, ...input } : opt
  );
  await ref.update({ options: newOptions });
}

export async function createFeatureOption(
  categoryId: string,
  name: string,
  price: number
): Promise<void> {
  const db = getAdminDb();
  const id = slugify(name) || `option-${Date.now()}`;
  const ref = db.collection("featureCategories").doc(categoryId);
  const snapshot = await ref.get();
  if (!snapshot.exists) return;
  const cat = snapshot.data() as PricingCategory;
  if (cat.options.some((o) => o.id === id)) {
    throw new Error(`"${name}" already exists in ${cat.name}.`);
  }
  await ref.update({ options: [...cat.options, { id, name, price }] });
}

export async function deleteFeatureOption(
  categoryId: string,
  optionId: string
): Promise<void> {
  const db = getAdminDb();
  const ref = db.collection("featureCategories").doc(categoryId);
  const snapshot = await ref.get();
  if (!snapshot.exists) return;
  const cat = snapshot.data() as PricingCategory;
  await ref.update({
    options: cat.options.filter((o) => o.id !== optionId),
  });
}

// ── Site settings ───────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSettings> {
  const db = getAdminDb();
  const snapshot = await db.collection("settings").doc("main").get();
  const data = (snapshot.data() ?? {}) as Partial<SiteSettings>;
  return {
    siteTitle: data.siteTitle ?? "",
    siteDescription: data.siteDescription ?? "",
    ogImage: data.ogImage ?? "",
    contactEmail: data.contactEmail ?? "",
    responseTime: data.responseTime ?? "",
    serving: data.serving ?? "",
    contactNote: data.contactNote ?? "",
    stat1Label: data.stat1Label ?? "Founded",
    stat1Value: data.stat1Value ?? "2026",
    stat1Desc: data.stat1Desc ?? "A modern product engineering company built for how software is made now.",
    stat2Label: data.stat2Label ?? "Products shipped",
    stat2Value: data.stat2Value ?? "10+",
    stat2Desc: data.stat2Desc ?? "High-performance applications delivered to production globally.",
    stat3Label: data.stat3Label ?? "Engineers and designers",
    stat3Value: data.stat3Value ?? "8+",
    stat3Desc: data.stat3Desc ?? "A lean senior team — no juniors learning on your budget.",
  };
}

export async function updateSettings(
  input: Partial<SiteSettings>
): Promise<SiteSettings> {
  const db = getAdminDb();
  const ref = db.collection("settings").doc("main");
  const snapshot = await ref.get();
  const current = snapshot.exists ? (snapshot.data() as SiteSettings) : ({} as SiteSettings);
  const updated = { ...current, ...input };
  await ref.set(updated);
  return updated;
}
