"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/data/content";
import SectionCtaButton from "@/components/layout/SectionCtaButton";
import { RISE, STAGGER, VIEWPORT, enter, enterAt } from "@/lib/motion";
import { sections } from "@/data/copy";


const TINTS = ["#7C3AED", "#5D66E7", "#3E91E2", "#1FBDDC", "#00D4FF"];


const DWELL = 2400;

export default function ProcessOverview() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || held) return;
    const id = setInterval(() => setActive((i) => (i + 1) % processSteps.length), DWELL);
    return () => clearInterval(id);
  }, [reduced, held]);

  return (
    <div className="p-2">
      <section id="process" className="relative rounded-2xl bg-dark py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 lg:px-8">
          {/* Masthead — one centred stack: eyebrow, claim, the process in
              a line. */}
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <motion.span
              initial={{ opacity: 0, y: RISE.sm }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              className="mb-4 block font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal"
            >
              {sections.homeProcess.eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: RISE.base }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={enter(STAGGER)}
              className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
            >
{sections.homeProcess.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: RISE.base }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={enter(STAGGER * 2)}
              className="flex flex-col items-center"
            >
              <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-white/50">
                {sections.homeProcess.description}
              </p>
            </motion.div>
          </div>

        
          <ol
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5"
            onMouseLeave={() => setHeld(false)}
          >
            {processSteps.map((step, i) => {
              const tint = TINTS[i];
              const on = active === i;

              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: RISE.base }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={enterAt(i)}
                  onMouseEnter={() => {
                    setActive(i);
                    setHeld(true);
                  }}
                  className={`relative bg-white/[0.09] overflow-hidden rounded-2xl border p-6 transition-all duration-500
                    ease-[cubic-bezier(0.33,1,0.68,1)] sm:last:col-span-2 lg:p-7 lg:last:col-span-1 ${
                    on ? "bg-white/[0.09] lg:-translate-y-1.5" : "bg-white/[0.02]"
                  }`}
                  style={{
                    borderColor: on ? tint : "rgba(255,255,255,0.10)",
    
                    boxShadow: on ? `0 24px 60px -34px ${tint}` : "none",
                  }}
                >
        
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle, ${tint} 0%, transparent 70%)`,
                      opacity: on ? 0.35 : 0,
                    }}
                  />

                  {/* Oversized step number: a watermark in the top-right corner,
                      behind the copy. It is absolutely positioned, so it takes no
                      layout space and the card keeps its original size. */}
                  <span
                    className="pointer-events-none absolute -top-3 right-3 z-0 text-[76px] font-bold leading-none tracking-[-0.05em] transition-opacity duration-500 lg:-top-4 lg:right-4 lg:text-[88px]"
                    style={{ color: tint, opacity: on ? 0.22 : 0.13 }}
                  >
                    {step.number}
                  </span>

                  <h3
                    className={`relative text-[22px] font-semibold tracking-[-0.03em] transition-colors duration-500 ${
                      on ? "text-white" : "text-white/70"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`relative mt-2 text-[14px] leading-relaxed transition-colors duration-500 ${
                      on ? "text-white/65" : "text-white/40"
                    }`}
                  >
                    {step.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>

          <motion.div
            initial={{ opacity: 0, y: RISE.base }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={enter(STAGGER * 3)}
            className="mt-14 flex justify-center lg:mt-20"
          >
            <SectionCtaButton href={sections.homeProcess.cta.href}>
              {sections.homeProcess.cta.label}
            </SectionCtaButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
