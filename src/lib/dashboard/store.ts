import "server-only";

import { blogPosts as seedBlogPosts, type BlogPost } from "@/data/blog";
import { projects as seedProjects, type Project } from "@/data/projects";
import {
  primaryServices as seedPrimaryServices,
  pricingTiers as seedPricingTiers,
  contact as seedContact,
  type PrimaryService,
  type PricingTier,
} from "@/data/content";
import { featureCategories as seedFeatureCategories, type PricingCategory } from "@/data/pricing";

// ─────────────────────────────────────────────────────────────────────────
// In-memory content store for /dashboard.
//
// There is no database wired up yet (see the conversation that scoped this:
// "build the UI first, decide on persistence later"). Each collection below
// is a module-level array, seeded once from the same src/data/*.ts files the
// public site renders from, then mutated in place by dashboard Server
// Actions via revalidatePath.
//
// What that buys you: the dashboard actually works end-to-end in a running
// dev/prod server — create, edit, delete all visibly persist while you
// click around. What it does NOT do: survive a server restart, a redeploy,
// or serverless cold starts (each instance gets its own copy of this
// module). Treat this as a working prototype of the UI/UX, not a
// production data layer. Swapping in a real database means replacing the
// functions in this file with query calls — the dashboard pages and
// actions that call them shouldn't need to change shape.
// ─────────────────────────────────────────────────────────────────────────

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  ogImage: string;
  contactEmail: string;
  responseTime: string;
  serving: string;
  contactNote: string;
};

const state = {
  blogPosts: seedBlogPosts.map((p) => ({ ...p })) as BlogPost[],
  projects: seedProjects.map((p) => ({ ...p })) as Project[],
  services: seedPrimaryServices.map((s) => ({ ...s })) as PrimaryService[],
  pricingTiers: seedPricingTiers.map((t) => ({ ...t })) as PricingTier[],
  featureCategories: seedFeatureCategories.map((c) => ({ ...c, options: [...c.options] })) as PricingCategory[],
  settings: {
    siteTitle: "Stratix Solutions — AI, UI/UX, app, and web development",
    siteDescription:
      "AI development, UI/UX design, app development, and responsive web development services. Strategy, design, engineering, QA, release, and support handled by one focused team.",
    ogImage: "/og-image.png",
    contactEmail: seedContact.email,
    responseTime: seedContact.responseTime,
    serving: seedContact.serving,
    contactNote: seedContact.note,
  } satisfies SiteSettings,
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── Blog ────────────────────────────────────────────────────────────────

export function listBlogPosts(): BlogPost[] {
  return state.blogPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return state.blogPosts.find((p) => p.slug === slug);
}

export function createBlogPost(input: Omit<BlogPost, "slug"> & { slug?: string }): BlogPost {
  const slug = input.slug?.trim() || slugify(input.title);
  if (state.blogPosts.some((p) => p.slug === slug)) {
    throw new Error(`A post with slug "${slug}" already exists.`);
  }
  const post: BlogPost = { ...input, slug };
  state.blogPosts = [post, ...state.blogPosts];
  return post;
}

export function updateBlogPost(slug: string, input: Partial<Omit<BlogPost, "slug">>): BlogPost {
  const index = state.blogPosts.findIndex((p) => p.slug === slug);
  if (index === -1) throw new Error(`No post found with slug "${slug}".`);
  const updated = { ...state.blogPosts[index], ...input };
  state.blogPosts = state.blogPosts.map((p, i) => (i === index ? updated : p));
  return updated;
}

export function deleteBlogPost(slug: string): void {
  state.blogPosts = state.blogPosts.filter((p) => p.slug !== slug);
}

// ── Projects ────────────────────────────────────────────────────────────

export function listProjects(): Project[] {
  return state.projects;
}

export function getProject(id: number): Project | undefined {
  return state.projects.find((p) => p.id === id);
}

export function createProject(input: Omit<Project, "id">): Project {
  const nextId = state.projects.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const project: Project = { ...input, id: nextId };
  state.projects = [...state.projects, project];
  return project;
}

export function updateProject(id: number, input: Partial<Omit<Project, "id">>): Project {
  const index = state.projects.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`No project found with id ${id}.`);
  const updated = { ...state.projects[index], ...input };
  state.projects = state.projects.map((p, i) => (i === index ? updated : p));
  return updated;
}

export function deleteProject(id: number): void {
  state.projects = state.projects.filter((p) => p.id !== id);
}

// ── Services ────────────────────────────────────────────────────────────

export function listServices(): PrimaryService[] {
  return state.services;
}

export function getService(id: string): PrimaryService | undefined {
  return state.services.find((s) => s.id === id);
}

export function updateService(id: string, input: Partial<Omit<PrimaryService, "id">>): PrimaryService {
  const index = state.services.findIndex((s) => s.id === id);
  if (index === -1) throw new Error(`No service found with id "${id}".`);
  const updated = { ...state.services[index], ...input };
  state.services = state.services.map((s, i) => (i === index ? updated : s));
  return updated;
}

// ── Pricing tiers (MVP packages) ───────────────────────────────────────

export function listPricingTiers(): PricingTier[] {
  return state.pricingTiers;
}

export function updatePricingTier(id: string, input: Partial<Omit<PricingTier, "id">>): PricingTier {
  const index = state.pricingTiers.findIndex((t) => t.id === id);
  if (index === -1) throw new Error(`No pricing tier found with id "${id}".`);
  const updated = { ...state.pricingTiers[index], ...input };
  state.pricingTiers = state.pricingTiers.map((t, i) => (i === index ? updated : t));
  return updated;
}

// ── Pricing calculator categories/options ──────────────────────────────

export function listFeatureCategories(): PricingCategory[] {
  return state.featureCategories;
}

export function getFeatureCategory(categoryId: string): PricingCategory | undefined {
  return state.featureCategories.find((c) => c.id === categoryId);
}

export function updateFeatureOption(
  categoryId: string,
  optionId: string,
  input: { name?: string; price?: number }
): void {
  state.featureCategories = state.featureCategories.map((cat) => {
    if (cat.id !== categoryId) return cat;
    return {
      ...cat,
      options: cat.options.map((opt) => (opt.id === optionId ? { ...opt, ...input } : opt)),
    };
  });
}

export function createFeatureOption(categoryId: string, name: string, price: number): void {
  const id = slugify(name) || `option-${Date.now()}`;
  state.featureCategories = state.featureCategories.map((cat) => {
    if (cat.id !== categoryId) return cat;
    if (cat.options.some((o) => o.id === id)) {
      throw new Error(`"${name}" already exists in ${cat.name}.`);
    }
    return { ...cat, options: [...cat.options, { id, name, price }] };
  });
}

export function deleteFeatureOption(categoryId: string, optionId: string): void {
  state.featureCategories = state.featureCategories.map((cat) =>
    cat.id === categoryId ? { ...cat, options: cat.options.filter((o) => o.id !== optionId) } : cat
  );
}

// ── Site settings ───────────────────────────────────────────────────────

export function getSettings(): SiteSettings {
  return state.settings;
}

export function updateSettings(input: Partial<SiteSettings>): SiteSettings {
  state.settings = { ...state.settings, ...input };
  return state.settings;
}
