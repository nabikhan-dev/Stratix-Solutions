"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Paintbrush, Smartphone, Globe, ArrowRight } from "lucide-react";
import { primaryServices } from "@/data/content";
import { DUR, RISE, VIEWPORT, enter, enterAt } from "@/lib/motion";

const icons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  ai: BrainCircuit,
  uiux: Paintbrush,
  app: Smartphone,
  web: Globe,
};

/**
 * Index + detail layout: a numbered list of the four disciplines on the
 * left, a detail panel on the right that swaps to show that service's full
 * description and motif tags — real hierarchy instead of four identical
 * cards, and it surfaces `description`/`motifWords` from the data that the
 * old card grid never displayed. Sits on the light band between the dark
 * hero and the dark comparison table, so it's styled light directly.
 */
export default function ServiceSwitcher() {
  const [active, setActive] = useState(0);
  const service = primaryServices[active];
  const Icon = icons[service.id] ?? Globe;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <div className="border-y border-line">
          {primaryServices.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: RISE.sm }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={enterAt(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                data-cursor={isActive ? "" : "Select"}
                className={`group flex w-full items-center gap-5 border-b border-line py-5 text-left transition-colors last:border-b-0 sm:py-6 ${
                  isActive ? "" : "hover:bg-deep/40"
                }`}
              >
                <span className={`font-mono text-sm ${isActive ? "text-signal" : "text-faint"}`}>{s.number}</span>
                <span
                  className={`flex-1 font-display text-xl font-semibold tracking-[-0.03em] transition-colors sm:text-2xl ${
                    isActive ? "text-primary" : "text-muted group-hover:text-primary"
                  }`}
                >
                  {s.title}
                </span>
                <ArrowRight
                  className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                    isActive ? "translate-x-0 text-signal opacity-100" : "-translate-x-1 text-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: RISE.base }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={enterAt(2)}
        className="lg:col-span-7"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: RISE.sm }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={enter(0, DUR.fast)}
            className="flex h-full flex-col rounded-2xl border border-line bg-surface p-8 sm:p-10"
          >
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-void">
              <Icon className="h-5 w-5 text-signal" strokeWidth={1.75} />
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-primary">{service.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{service.description}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {service.motifWords.map((word) => (
                <span key={word} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {word}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
