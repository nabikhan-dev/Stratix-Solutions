"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Bug, GitBranch, LayoutGrid, MessageSquare, RefreshCw, Users, Video } from "lucide-react";
import { practices } from "@/data/content";
import { RISE, VIEWPORT, enterAt } from "@/lib/motion";
import { sections } from "@/data/copy";

/**
 * Each practice carries its own tint — the channels are distinct things, and
 * one colour per row makes the list scannable at a glance instead of seven
 * identical cards. Every tint is light enough to take the navy glyph, so the
 * tiles stay legible as a set.
 */
const meta: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; tint: string }> = {
  jira: { label: "Jira", icon: LayoutGrid, tint: "#60A5FA" },
  demos: { label: "Weekly Demos", icon: Video, tint: "#A78BFA" },
  standups: { label: "Standups", icon: Users, tint: "#5EEAD4" },
  sync: { label: "Team Sync", icon: RefreshCw, tint: "#FCD34D" },
  git: { label: "Git Pushes", icon: GitBranch, tint: "#86EFAC" },
  slack: { label: "Slack", icon: MessageSquare, tint: "#F0ABFC" },
  qa: { label: "QA Reports", icon: Bug, tint: "#FDA4AF" },
};

export default function FullVisibilityTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // The rail is literally the row colours, top to bottom, so the line the eye
  // follows previews what it is about to reach.
  const rail = `linear-gradient(180deg, ${practices.map((p) => meta[p.id].tint).join(", ")})`;

  return (
    <div className="p-2">
    <section className="relative rounded-2xl bg-dark py-14 sm:py-16">
      <div className="relative z-10 mx-auto max-w-5xl px-4">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal">
            {sections.workVisibility.eyebrow}
          </span>
          <motion.h2
            initial={{ opacity: 0, y: RISE.base }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
          >
            {sections.workVisibility.title}
          </motion.h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Static faint rail */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-white/10 sm:block" />
          {/* Animated draw-in rail */}
          <motion.div
            style={{ scaleY: lineScaleY, background: rail }}
            className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 origin-top rounded-full sm:block"
          />

          <div className="flex flex-col gap-8 sm:gap-10">
            {practices.map((p, i) => {
              const m = meta[p.id];
              const Icon = m.icon;
              const rightSide = i % 2 === 1;

              return (
                <div key={p.id} className="relative flex items-center">
                  {/* Halo breathing out from the node */}
                  <motion.span
                    aria-hidden="true"
                    animate={{ scale: [1, 2.6, 1], opacity: [0.45, 0, 0.45] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                    style={{ backgroundColor: m.tint }}
                    className="absolute left-1/2 top-1/2 z-0 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[3px] sm:block"
                  />

                  {/* Dot on the center line */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={VIEWPORT}
                    transition={{ type: "spring", stiffness: 400, damping: 18, delay: i * 0.05 + 0.15 }}
                    style={{ backgroundColor: m.tint }}
                    className="absolute left-1/2 top-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dark sm:block"
                  />

                  {/* Branch connector */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT}
                    transition={enterAt(i, 0.2)}
                    className={`absolute top-1/2 z-0 hidden h-px w-10 -translate-y-1/2 bg-white/10 sm:block ${
                      rightSide ? "left-1/2 origin-left" : "right-1/2 origin-right"
                    }`}
                  />

                  <motion.div
                    initial={{ opacity: 0, x: rightSide ? RISE.base : -RISE.base }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={enterAt(i)}
                    className={`group w-full sm:w-[calc(50%-2.5rem)] ${rightSide ? "sm:ml-auto" : ""}`}
                  >
                    <div
                      style={{ "--tint": m.tint } as React.CSSProperties}
                      className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] hover:-translate-y-1.5 hover:border-(--tint) hover:bg-white/[0.07] hover:shadow-[0_24px_50px_-24px_var(--tint)]"
                    >
                      {/* Tint bloom, lit from behind the icon */}
                      <div
                        aria-hidden="true"
                        style={{ background: `radial-gradient(circle, ${m.tint} 0%, transparent 70%)` }}
                        className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                      />
                      {/* Light sweeping across the card as it lifts */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]"
                      />

                      {/* Icon tile — one tint per practice, navy glyph on all of them */}
                      <div
                        style={{ backgroundColor: m.tint, boxShadow: `0 10px 26px -10px ${m.tint}` }}
                        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-rotate-6 group-hover:scale-110"
                      >
                        <Icon className="h-5 w-5 text-brand" />
                      </div>
                      <div className="relative flex-1">
                        <div className="font-display text-base font-semibold tracking-[-0.03em] text-white">
                          {m.label}
                        </div>
                        <div className="mt-0.5 text-sm text-white/50">{p.cadence}</div>
                      </div>
                      <span
                        style={{ color: m.tint, borderColor: `${m.tint}33`, backgroundColor: `${m.tint}14` }}
                        className="relative hidden shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105 sm:block"
                      >
                        {p.cadence}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
