import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import ViewBadge from "@/components/blog/ViewBadge";
import { blogPosts } from "@/data/blog";
import Reveal from "@/components/motion/Reveal";
import ClosingCta from "@/components/layout/ClosingCta";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  };
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="relative overflow-hidden pt-36 pb-16 sm:pt-44">
      <div className="container-px relative z-10 mx-auto w-full max-w-[1440px]">
        <div className="max-w-5xl">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to insights
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-signal px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                {post.category}
              </span>
              <span className="text-xs font-medium text-faint">{post.date}</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-faint">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <ViewBadge slug={post.slug} record className="inline-flex items-center gap-1.5 text-xs font-medium text-faint" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-primary sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-4xl text-pretty text-lg leading-8 text-muted">{post.excerpt}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex max-w-4xl items-center gap-3 border-t border-line pt-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal text-sm font-bold text-white">
                {initials(post.author.name)}
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">{post.author.name}</p>
                <p className="text-xs uppercase tracking-widest text-faint">{post.author.role}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.25}>
        <div className="container-px mx-auto mt-12 w-full max-w-[1440px]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] border border-line shadow-xl">
            <Image src={post.image} alt={post.title} fill sizes="(min-width: 1440px) 1248px, 90vw" priority className="object-cover" />
          </div>
        </div>
      </Reveal>

      <div className="container-px relative z-10 mx-auto mt-16 w-full max-w-[1440px]">
        <div className="mx-auto flex max-w-4xl flex-col gap-10">
          {post.sections.map((section, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
              <div>
                {section.heading && (
                  <h2 className="mb-3 text-2xl font-semibold tracking-[-0.03em] text-primary">
                    {section.heading}
                  </h2>
                )}
                <p className="text-[17px] leading-8 text-muted">{section.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <ClosingCta
        title="Have a project this made you think about?"
        description="Book a free scoping call and we'll tell you what it would take to build it, with no obligation."
        cta={{ href: "/contact", label: "Book a Free Call" }}
        className="relative z-10 pb-0"
      />

      {related.length > 0 && (
        <div className="container-px relative z-10 mx-auto mt-24 w-full max-w-[1440px]">
          <Reveal>
            <h3 className="mb-10 text-2xl font-semibold tracking-[-0.03em] text-primary">Keep reading</h3>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link href={`/blog/${p.slug}`} className="group flex flex-col">
                  <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-line">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1440px) 400px, (min-width: 640px) 30vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <span className="mb-2 text-[11px] font-bold uppercase tracking-widest text-signal">
                    {p.category}
                  </span>
                  <h4 className="text-base font-semibold leading-snug tracking-[-0.02em] text-primary">
                    {p.title}
                  </h4>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
