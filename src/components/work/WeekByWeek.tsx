"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { weekByWeek } from "@/data/content";
import { RISE, STAGGER, VIEWPORT, enter, enterAt } from "@/lib/motion";
import { sections } from "@/data/copy";


export default function WeekByWeek() {
  return (
    <section className="bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: RISE.sm }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          className="mb-4 block font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal"
        >
          {sections.workWeekByWeek.eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: RISE.sm }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={enter(STAGGER)}
          className="text-2xl font-semibold tracking-[-0.04em] text-primary sm:text-3xl"
        >
          {sections.workWeekByWeek.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: RISE.sm }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={enter(STAGGER * 2)}
          className="mx-auto mt-4 text-[15px] leading-relaxed text-muted"
        >
          {sections.workWeekByWeek.descriptionLead}{" "}
          <Link
            href={sections.workWeekByWeek.descriptionLinkHref}
            className="font-medium text-signal underline underline-offset-2 hover:text-signal-hover"
          >
            {sections.workWeekByWeek.descriptionLinkLabel}
          </Link>{" "}
          {sections.workWeekByWeek.descriptionTail}
        </motion.p>

        </div>

        <div className="relative mt-10">

          <div className="absolute bottom-6 left-4 top-6 w-px bg-line sm:left-5" aria-hidden="true" />

          <div className="flex flex-col gap-6">
            {weekByWeek.map((w, i) => (
              <motion.div
                key={w.week}
                initial={{ opacity: 0, y: RISE.sm }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={enterAt(i)}
                className="group relative flex items-start gap-5 sm:gap-7"
              >
                <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[11px] font-bold text-signal shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-white sm:size-10 sm:text-[13px]">
                  {i + 1}
                </span>

                <div className="relative flex-1 overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow,background-color] duration-500 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-20 before:bg-linear-to-r before:from-signal/[0.08] before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 group-hover:border-signal/30 group-hover:bg-signal/[0.02] group-hover:shadow-[0_18px_40px_-18px_var(--signal-soft)] group-hover:before:opacity-100">
                  <span className="relative font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-signal">
                    {w.week}
                  </span>
                  <h3 className="relative mt-2 font-display text-lg font-semibold tracking-[-0.03em] text-primary">
                    {w.title}
                  </h3>
                  <p className="relative mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">
                    {w.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
