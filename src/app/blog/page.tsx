import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import BlogExplorer from "@/components/blog/BlogExplorer";
import CinematicHeading from "@/components/layout/CinematicHeading";
import { pageHeroes } from "@/data/copy";
import { listBlogPosts } from "@/lib/public-store";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Deep dives into AI, product design, and engineering from the Stratix Solutions team — practical insights on what actually works when building digital products.",
};

export default async function BlogPage() {
  const blogPosts = await listBlogPosts();

  return (
    <>
      <PageHero
        eyebrow={pageHeroes.blog.eyebrow}
        title={<CinematicHeading text={pageHeroes.blog.title} as="h1" dark />}
        description={pageHeroes.blog.description}
      />
      <BlogExplorer blogPosts={blogPosts} />
    </>
  );
}
