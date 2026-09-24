"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type PrimaryService } from "@/data/content";
import { DUR, RISE, VIEWPORT, enter, enterAt } from "@/lib/motion";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  MobileProgramming01Icon,
  WebDesign02Icon,
  BrushIcon,
  AiNetworkIcon,
} from "@hugeicons/core-free-icons";

const icons: Record<string, IconSvgElement> = {
  ai: AiNetworkIcon,
  uiux: BrushIcon,
  app: MobileProgramming01Icon,
  web: WebDesign02Icon,
};

export default function ServiceSwitcher({ services }: { services: PrimaryService[] }) {
  const [active, setActive] = useState(0);
  const service = services[active];
  
  // If there are no services, just render an empty div
  if (!service) return <div />;

  const icon = icons[service.id] ?? WebDesign02Icon;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <div className="border-y border-line">
          {services.map((s, i) => {
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
                  isActive ? "bg-[#7C3AED]/50" : "hover:bg-deep/50"
                }`}
              >
                <span className={`font-mono text-sm ${isActive ? "text-signal" : "text-faint"}`}>{s.number}</span>
                <span
                  className={`flex-1 font-display text-xl font-semibold tracking-[-0.03em] transition-colors sm:text-2xl ${
                    isActive ? "text-[#fff]" : "text-muted group-hover:text-primary"
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
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-[14px] bg-signal">
              <HugeiconsIcon icon={icon} size={22} className="text-white" strokeWidth={1.75} />
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
