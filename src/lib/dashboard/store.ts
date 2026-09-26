import "server-only";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import type { BlogPost } from "@/data/blog";
import type { Project } from "@/data/projects";
import type { Testimonial } from "@/data/testimonials";
import type { PrimaryService, PricingTier } from "@/data/content";
import type { PricingCategory } from "@/data/pricing";
import type { SiteSettings } from "@/lib/public-store";
export type { SiteSettings };

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── Blog ────────────────────────────────────────────────────────────────

export async function listBlogPosts(): Promise<BlogPost[]> {
  const snapshot = await getDocs(collection(db, "blogPosts"));
  return snapshot.docs.map((d) => d.data() as BlogPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const snapshot = await getDoc(doc(db, "blogPosts", slug));
  return snapshot.exists() ? (snapshot.data() as BlogPost) : undefined;
}

export async function createBlogPost(
  input: Omit<BlogPost, "slug"> & { slug?: string }
): Promise<BlogPost> {
  const slug = input.slug?.trim() || slugify(input.title);
  const ref = doc(db, "blogPosts", slug);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    throw new Error(`A post with slug "${slug}" already exists.`);
  }
  const post = { ...input, slug } as BlogPost;
  await setDoc(ref, post);
  return post;
}

export async function updateBlogPost(
  slug: string,
  input: Partial<Omit<BlogPost, "slug">>
): Promise<BlogPost> {
  const ref = doc(db, "blogPosts", slug);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) throw new Error(`No post found with slug "${slug}".`);
  await updateDoc(ref, input);
  return { ...snapshot.data(), ...input } as BlogPost;
}

export async function deleteBlogPost(slug: string): Promise<void> {
  await deleteDoc(doc(db, "blogPosts", slug));
}

// ── Projects ────────────────────────────────────────────────────────────

export async function listProjects(): Promise<Project[]> {
  const snapshot = await getDocs(collection(db, "projects"));
  return snapshot.docs.map((d) => d.data() as Project);
}

export async function getProject(id: number): Promise<Project | undefined> {
  const snapshot = await getDoc(doc(db, "projects", id.toString()));
  return snapshot.exists() ? (snapshot.data() as Project) : undefined;
}

export async function createProject(
  input: Omit<Project, "id">
): Promise<Project> {
  const projects = await listProjects();
  const nextId = projects.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const project = { ...input, id: nextId } as Project;
  await setDoc(doc(db, "projects", nextId.toString()), project);
  return project;
}

export async function updateProject(
  id: number,
  input: Partial<Omit<Project, "id">>
): Promise<Project> {
  const ref = doc(db, "projects", id.toString());
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) throw new Error(`No project found with id ${id}.`);
  await updateDoc(ref, input);
  return { ...snapshot.data(), ...input } as Project;
}

export async function deleteProject(id: number): Promise<void> {
  await deleteDoc(doc(db, "projects", id.toString()));
}

// ── Testimonials ────────────────────────────────────────────────────────

export async function listTestimonials(): Promise<Testimonial[]> {
  const snapshot = await getDocs(collection(db, "testimonials"));
  return snapshot.docs.map((d) => d.data() as Testimonial);
}

export async function getTestimonial(
  id: string
): Promise<Testimonial | undefined> {
  const snapshot = await getDoc(doc(db, "testimonials", id));
  return snapshot.exists() ? (snapshot.data() as Testimonial) : undefined;
}

export async function createTestimonial(
  input: Omit<Testimonial, "id">
): Promise<Testimonial> {
  const id = Date.now().toString();
  const testimonial = { ...input, id } as Testimonial;
  await setDoc(doc(db, "testimonials", id), testimonial);
  return testimonial;
}

export async function updateTestimonial(
  id: string,
  input: Partial<Omit<Testimonial, "id">>
): Promise<Testimonial> {
  const ref = doc(db, "testimonials", id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) throw new Error(`No testimonial found with id ${id}.`);
  await updateDoc(ref, input);
  return { ...snapshot.data(), ...input } as Testimonial;
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, "testimonials", id));
}

// ── Services ────────────────────────────────────────────────────────────

export async function listServices(): Promise<PrimaryService[]> {
  const snapshot = await getDocs(collection(db, "services"));
  return snapshot.docs.map((d) => d.data() as PrimaryService);
}

export async function getService(
  id: string
): Promise<PrimaryService | undefined> {
  const snapshot = await getDoc(doc(db, "services", id));
  return snapshot.exists() ? (snapshot.data() as PrimaryService) : undefined;
}

export async function updateService(
  id: string,
  input: Partial<Omit<PrimaryService, "id">>
): Promise<PrimaryService> {
  const ref = doc(db, "services", id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) throw new Error(`No service found with id "${id}".`);
  await updateDoc(ref, input);
  return { ...snapshot.data(), ...input } as PrimaryService;
}

// ── Pricing tiers ───────────────────────────────────────────────────────

export async function listPricingTiers(): Promise<PricingTier[]> {
  const snapshot = await getDocs(collection(db, "pricingTiers"));
  return snapshot.docs.map((d) => d.data() as PricingTier);
}

export async function updatePricingTier(
  id: string,
  input: Partial<Omit<PricingTier, "id">>
): Promise<PricingTier> {
  const ref = doc(db, "pricingTiers", id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists())
    throw new Error(`No pricing tier found with id "${id}".`);
  await updateDoc(ref, input);
  return { ...snapshot.data(), ...input } as PricingTier;
}

// ── Feature categories/options ──────────────────────────────────────────

export async function listFeatureCategories(): Promise<PricingCategory[]> {
  const snapshot = await getDocs(collection(db, "featureCategories"));
  return snapshot.docs.map((d) => d.data() as PricingCategory);
}

export async function getFeatureCategory(
  categoryId: string
): Promise<PricingCategory | undefined> {
  const snapshot = await getDoc(doc(db, "featureCategories", categoryId));
  return snapshot.exists() ? (snapshot.data() as PricingCategory) : undefined;
}

export async function updateFeatureOption(
  categoryId: string,
  optionId: string,
  input: { name?: string; price?: number }
): Promise<void> {
  const ref = doc(db, "featureCategories", categoryId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return;
  const cat = snapshot.data() as PricingCategory;
  const newOptions = cat.options.map((opt) =>
    opt.id === optionId ? { ...opt, ...input } : opt
  );
  await updateDoc(ref, { options: newOptions });
}

export async function createFeatureOption(
  categoryId: string,
  name: string,
  price: number
): Promise<void> {
  const id = slugify(name) || `option-${Date.now()}`;
  const ref = doc(db, "featureCategories", categoryId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return;
  const cat = snapshot.data() as PricingCategory;
  if (cat.options.some((o) => o.id === id)) {
    throw new Error(`"${name}" already exists in ${cat.name}.`);
  }
  await updateDoc(ref, { options: [...cat.options, { id, name, price }] });
}

export async function deleteFeatureOption(
  categoryId: string,
  optionId: string
): Promise<void> {
  const ref = doc(db, "featureCategories", categoryId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return;
  const cat = snapshot.data() as PricingCategory;
  await updateDoc(ref, {
    options: cat.options.filter((o) => o.id !== optionId),
  });
}

// ── Site settings ───────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSettings> {
  const snapshot = await getDoc(doc(db, "settings", "main"));
  const data = (snapshot.exists() ? snapshot.data() : {}) as Partial<SiteSettings>;
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
  const ref = doc(db, "settings", "main");
  const snapshot = await getDoc(ref);
  const current = snapshot.exists() ? (snapshot.data() as SiteSettings) : ({} as SiteSettings);
  const updated = { ...current, ...input };
  await setDoc(ref, updated);
  return updated;
}
