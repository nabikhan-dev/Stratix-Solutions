"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Project } from "@/data/projects";
import SectionCtaButton from "@/components/layout/SectionCtaButton";
import { RISE, STAGGER, VIEWPORT, enter, enterAt } from "@/lib/motion";
import { publicPath } from "@/lib/public-path";
import { sections } from "@/data/copy";

export default function ProjectsPortfolio({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    return (project.category ?? "Uncategorized") === activeCategory;
  });

  const usedCategories = Array.from(new Set(projects.map(p => p.category ?? "Uncategorized"))).sort();
  const dynamicCategories = ["All", ...usedCategories];

  return (
    <section id="projects" className="py-20 bg-void relative overflow-hidden">


      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-8 mb-12 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: RISE.sm }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              className="mb-4 block font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal"
            >
              {sections.homeProjects.eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: RISE.base }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={enter(STAGGER)}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-primary mb-6"
            >
{sections.homeProjects.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: RISE.base }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={enter(STAGGER * 2)}
              className="text-[16px] md:text-[18px] text-muted leading-relaxed max-w-xl mx-auto"
            >
              {sections.homeProjects.description}
            </motion.p>
          </div>

          {/* Filters */}
          {projects.length > 0 && dynamicCategories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: RISE.sm }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={enter(STAGGER * 3)}
              className="flex items-center gap-1 p-1.5 rounded-full bg-deep border border-line shrink-0 overflow-x-auto no-scrollbar"
            >
              {dynamicCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-[var(--signal)] text-white shadow-lg shadow-[var(--signal-soft)]"
                      : "text-muted hover:text-primary hover:bg-deep"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, 4).map((project, i) => {
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: RISE.lg }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={enterAt(i)}
                  key={project.id}
                  className="group relative flex flex-col cursor-pointer"
                >
                  {/* Full-card invisible link overlay */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="absolute inset-0 z-30"
                    aria-label={`View ${project.title} case study`}
                  />

                  {/* Image Container */}
                  <div
                    className={`relative w-full rounded-[32px] overflow-hidden border border-line ${project.bg} mb-6`}
                  >
                    <img
                      src={publicPath(project.image)}
                      alt={project.title}
                      className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    {/* Subtle dark tint on hover only */}
                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/15 transition-colors duration-500 pointer-events-none" />
                  </div>

                  {/* Title + Category */}
                  <div className="flex items-end justify-between gap-4 px-2">
                    <div className="flex flex-col">
                      <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted mb-2">
                        {project.category ?? ""}
                      </p>
                      <h3 className="text-2xl font-semibold text-primary tracking-[-0.03em] group-hover:text-signal transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-line bg-surface text-muted group-hover:border-signal group-hover:text-signal group-hover:bg-signal/10 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: RISE.sm }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          className="mt-16 flex justify-center"
        >
          <SectionCtaButton href={sections.homeProjects.cta.href}>
            {sections.homeProjects.cta.label}
          </SectionCtaButton>
        </motion.div>
      </div>
    </section>
  );
}
