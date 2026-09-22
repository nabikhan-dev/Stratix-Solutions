import type { MetadataRoute } from "next";

const routes = [
  "",
  "/services",
  "/work",
  "/blog",
  "/how-we-work",
  "/pricing",
  "/about",
  "/contact",
  "/faq",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://stratixsolutions.com";
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
