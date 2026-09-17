"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/content";
import { DUR, RISE, STAGGER, VIEWPORT, enter } from "@/lib/motion";
import { sections } from "@/data/copy";

/**
 * `showHeading` defaults to true for the home page, where this section has
 * no PageHero above it. The standalone /faq page passes `showHeading={false}`
 * since its PageHero already renders the same title.
 *
 * `dark` swaps the section onto `--bg-dark` — used wherever a page's
 * light/dark section rhythm needs this block to land on the dark beat.
 */
export default function FaqAccordion({
  showHeading = true,
  dark = false,
  items = faqs,
  eyebrow = sections.faq.eyebrow,
  title = sections.faq.title,
}: {
  showHeading?: boolean;
  dark?: boolean;
  /** Defaults to the site-wide list; /pricing passes its own money questions. */
  items?: readonly { q: string; a: string }[];
  eyebrow?: string;
  title?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const ink = dark ? "text-white" : "text-primary";
  const inkMuted = dark ? "text-white/60" : "text-muted";
  const line = dark ? "border-white/10" : "border-line";
  const divide = dark ? "divide-white/10" : "divide-line";

  return (
   
    <section className={`pb-32 pt-24 relative ${dark ? "bg-dark" : "bg-void"}`}>
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {showHeading && (
          <div className="mb-14 flex flex-col gap-2">
            <span className="font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal">
              {eyebrow}
            </span>
            <motion.h2
              initial={{ opacity: 0, y: RISE.base }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={enter(STAGGER)}
              className={`text-4xl font-semibold tracking-[-0.04em] sm:text-5xl ${ink}`}
            >
{title}
            </motion.h2>
          </div>
        )}
        <div className={`flex flex-col divide-y border-y ${divide} ${line}`}>
          {items.map((faq, idx) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: RISE.sm }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={enter(Math.min(idx * STAGGER, 0.3))}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
              >
                <span className={`text-[16px] font-semibold tracking-[-0.03em] transition-colors ${
                  openIndex === idx ? "text-signal" : `${ink} group-hover:text-signal`
                }`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 45 : 0 }}
                  transition={enter(0, DUR.fast)}
                  className={`shrink-0 transition-colors ${
                    openIndex === idx ? "text-signal" : `${inkMuted} group-hover:text-signal`
                  }`}
                >
                  <Plus className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={enter(0, DUR.fast)}
                  >
                    <div className={`px-4 pb-6 text-[15px] leading-relaxed pr-12 ${inkMuted}`}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    
  );
}
