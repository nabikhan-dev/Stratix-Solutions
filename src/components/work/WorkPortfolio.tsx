"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { RISE, VIEWPORT, enterAt } from "@/lib/motion";

type Category = "All Projects" | "Websites" | "Mobile Apps" | "Digital Strategy";

export default function WorkPortfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All Projects");

  const getCategory = (tags: string[]): "Websites" | "Mobile Apps" | "Digital Strategy" => {
    const mobileKeywords = ["react native", "swift", "flutter", "ios", "android", "healthkit"];
    const isMobile = tags.some((tag) =>
      mobileKeywords.some((keyword) => tag.toLowerCase().includes(keyword))
    );
    return isMobile ? "Mobile Apps" : "Websites";
  };

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All Projects") return true;
    return getCategory(project.tags) === activeCategory;
  });

  return (
    <section className="relative overflow-hidden bg-surface pt-16 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: RISE.base }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            className="flex items-center gap-1 p-1.5 rounded-full bg-deep border border-line shrink-0 overflow-x-auto no-scrollbar max-w-full"
          >
            {(["All Projects", "Websites", "Mobile Apps", "Digital Strategy"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-signal text-white shadow-lg shadow-signal-soft"
                    : "text-muted hover:bg-surface hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const categoryName = getCategory(project.tags);
              const isWebsite = categoryName === "Websites";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: RISE.lg }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={enterAt(i)}
                  key={project.id}
                  className="group flex flex-col cursor-pointer"
                >
                  {/* Image Container */}
                  <div className={`relative w-full aspect-[4/3] rounded-[32px] overflow-hidden border border-line ${project.bg} mb-6`}>
                    <div className="absolute top-6 left-6 z-10">
                      <span className="px-4 py-1.5 rounded-full bg-signal text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
                        {isWebsite ? "Website" : "Mobile App"}
                      </span>
                    </div>

                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-dark/0 transition-colors duration-500 group-hover:bg-dark/10" />

                    {/* Make the whole image area clickable to the case study */}
                    <Link
                      href={`/projects/${project.id}`}
                      data-cursor="View"
                      className="absolute inset-0 z-20"
                      aria-label={`View ${project.title}`}
                    />
                  </div>

                  {/* Decoupled Typography & Metrics */}
                  <div className="flex items-start justify-between gap-4 px-2">
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-[28px] font-semibold text-primary tracking-[-0.04em] mb-3">
                        {project.title}
                      </h3>
                      <p className="text-[14px] text-muted leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {project.metric && (
                      <div className="flex flex-col items-center justify-center py-4 px-5 rounded-2xl bg-dark border border-line min-w-[130px] shrink-0">
                        <span className="text-[26px] font-bold text-signal mb-1">
                          {project.metric.value}
                        </span>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-white/50 text-center leading-snug">
                          {project.metric.label}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
