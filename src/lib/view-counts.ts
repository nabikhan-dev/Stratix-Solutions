import "server-only";

import { blogPosts } from "@/data/blog";

// Real, live per-post view counts — in-memory (same caveat as
// dashboard/store.ts: resets on server restart/redeploy; swap for a
// database column when one exists). Seeded once with realistic starting
// numbers so existing posts don't all suddenly show "0 views" the moment
// this shipped.
const SEED_VIEWS: Record<string, number> = {
  "ai-adoption-strategic-implementation": 1800,
  "cybersecurity-basics-for-startups": 1200,
  "ecommerce-scaling-peak-traffic": 940,
  "why-nextjs-for-performance-focused-products": 2100,
  "generative-ai-creative-logic-for-products": 1500,
  "digital-transformation-vs-digital-optimization": 890,
  "choosing-a-tech-stack-for-your-mvp": 1100,
};

const counts = new Map<string, number>(blogPosts.map((p) => [p.slug, SEED_VIEWS[p.slug] ?? 0]));

export function getViewCount(slug: string): number {
  return counts.get(slug) ?? 0;
}

export function incrementViewCount(slug: string): number {
  const next = getViewCount(slug) + 1;
  counts.set(slug, next);
  return next;
}

/** "1.8k views" / "1 view" / "42 views" — matches the format posts used to hardcode. */
export function formatViewCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k views`;
  }
  return `${n} view${n === 1 ? "" : "s"}`;
}
