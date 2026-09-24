"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import ViewBadge from "@/components/blog/ViewBadge";
import { type BlogFilter, type BlogPost } from "@/data/blog";
import { RISE, VIEWPORT, enter, enterAt } from "@/lib/motion";
import { sections } from "@/data/copy";

function AuthorAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-signal text-xs font-bold text-white"
    >
      {initials}
    </div>
  );
}

export default function BlogExplorer({ blogPosts }: { blogPosts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<BlogFilter>("All Insights");

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const featured = sortedPosts.find((post) => post.featured) || sortedPosts[0];
  const rest = sortedPosts.filter((post) => post !== featured);

  const filteredPosts = rest.filter(
    (post) => activeCategory === "All Insights" || post.category === activeCategory,
  );

  // Derive categories dynamically from actual post data
  const usedCategories = Array.from(new Set(blogPosts.map(p => p.category))).sort();
  const dynamicCategories = ["All Insights", ...usedCategories];

  return (
    <section className="pb-32 bg-void relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        {/* Category filters */}
        {blogPosts.length > 0 && dynamicCategories.length > 1 && (
          <div className="flex justify-center pb-16 pt-8">
            <motion.div
              initial={{ opacity: 0, y: RISE.base }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-line bg-deep p-1.5 no-scrollbar"
            >
              {dynamicCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-signal text-white shadow-lg shadow-(--signal-soft)"
                      : "text-muted hover:bg-deep hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        )}

        {/* Featured post */}
        {featured && (
          <motion.article
            initial={{ opacity: 0, y: RISE.base }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={enter()}
            className="group relative mb-16 grid overflow-hidden rounded-[32px] border border-line bg-surface shadow-xl lg:grid-cols-2"
          >
            <div className="relative min-h-[320px] lg:min-h-0">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-amber px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-dark">
                  {sections.blogExplorer.featuredBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-faint">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readTime}
                </span>
              </div>

              <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-primary sm:text-4xl">
                {featured.title}
              </h2>

              <p className="text-[15px] leading-relaxed text-muted">{featured.excerpt}</p>

              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <AuthorAvatar name={featured.author.name} />
                  <div>
                    <p className="text-sm font-semibold text-primary">{featured.author.name}</p>
                    <p className="text-xs uppercase tracking-widest text-faint">{featured.author.role}</p>
                  </div>
                </div>
              </div>

              <Link href={`/blog/${featured.slug}`} data-cursor="Read" className="absolute inset-0 z-10" aria-label={`Read ${featured.title}`} />
            </div>
          </motion.article>
        )}


        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.article
                layout
                key={post.slug}
                initial={{ opacity: 0, y: RISE.lg }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={enterAt(i)}
                className="group relative flex flex-col"
              >
                <div className="relative mb-5 w-full overflow-hidden rounded-[24px] border border-line">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-signal px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
                    {post.category}
                  </span>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="mb-3 flex items-center gap-3 text-xs font-medium text-faint">
                  <span>{post.date}</span>
                  <span aria-hidden>•</span>
                  <ViewBadge slug={post.slug} />
                </div>

                <h3 className="mb-2 text-xl font-semibold leading-tight tracking-[-0.03em] text-primary">
                  {post.title}
                </h3>
                <p className="mb-5 line-clamp-2 text-[14px] leading-relaxed text-muted">{post.excerpt}</p>

                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-signal">
                  {sections.blogExplorer.readLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <Link href={`/blog/${post.slug}`} data-cursor="Read" className="absolute inset-0" aria-label={`Read ${post.title}`} />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <p className="py-16 text-center text-muted">{sections.blogExplorer.empty}</p>
        )}
      </div>
    </section>
  );
}
