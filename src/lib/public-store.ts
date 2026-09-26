import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import type { BlogPost } from "@/data/blog";
import type { Project } from "@/data/projects";
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

export async function listBlogPosts(): Promise<BlogPost[]> {
  const snapshot = await getDocs(collection(db, "blogPosts"));
  return snapshot.docs.map((d) => d.data() as BlogPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const snapshot = await getDoc(doc(db, "blogPosts", slug));
  return snapshot.exists() ? (snapshot.data() as BlogPost) : undefined;
}

export async function listProjects(): Promise<Project[]> {
  const snapshot = await getDocs(collection(db, "projects"));
  return snapshot.docs.map((d) => d.data() as Project);
}

export async function getProject(id: number): Promise<Project | undefined> {
  const snapshot = await getDoc(doc(db, "projects", id.toString()));
  return snapshot.exists() ? (snapshot.data() as Project) : undefined;
}

export async function listServices(): Promise<PrimaryService[]> {
  const snapshot = await getDocs(collection(db, "services"));
  return snapshot.docs.map((d) => d.data() as PrimaryService);
}

export async function listPricingTiers(): Promise<PricingTier[]> {
  const snapshot = await getDocs(collection(db, "pricingTiers"));
  return snapshot.docs.map((d) => d.data() as PricingTier);
}

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
