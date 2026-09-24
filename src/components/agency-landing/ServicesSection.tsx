"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MobileProgramming01Icon,
  WebDesign02Icon,
  BrushIcon,
  AiNetworkIcon,
} from "@hugeicons/core-free-icons";
import SectionCtaButton from "@/components/layout/SectionCtaButton";
import { RISE, STAGGER, VIEWPORT, enter, enterAt } from "@/lib/motion";
import { sections } from "@/data/copy";

import { type PrimaryService } from "@/data/content";

export default function ServicesSection({ services }: { services: PrimaryService[] }) {
  return (
    <section id="services" className="relative py-16 sm:py-20 bg-void">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col items-center gap-4 mb-10 max-w-2xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: RISE.sm }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            className="font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal"
          >
            {sections.homeServices.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: RISE.base }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={enter(STAGGER)}
            className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-primary"
          >
{sections.homeServices.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: RISE.sm }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={enter(STAGGER * 2)}
            className="text-[16px] leading-[1.7] text-muted max-w-xl"
          >
            {sections.homeServices.description}
          </motion.p>
        </div>

        {/* Four services, one consistent card style */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: RISE.sm }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          className="mt-10 flex justify-center"
        >
          <SectionCtaButton href={sections.homeServices.cta.href}>
            {sections.homeServices.cta.label}
          </SectionCtaButton>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service: s, index }: { service: PrimaryService; index: number }) {
  // Map icons based on the ID, fallback to WebDesign
  const icons: Record<string, any> = {
    ai: AiNetworkIcon,
    uiux: BrushIcon,
    app: MobileProgramming01Icon,
    web: WebDesign02Icon,
  };
  const icon = icons[s.id] || WebDesign02Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: RISE.base }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={enterAt(index)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow,background-color] duration-500 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-20 before:bg-linear-to-r before:from-signal/[0.08] before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:border-signal/30 hover:bg-signal/[0.02] hover:shadow-[0_18px_40px_-18px_var(--signal-soft)] hover:before:opacity-100 sm:p-8"
    >
      {/* Icon tile  soft cyan square, dark glyph, exactly as in the catalogue cards */}
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-signal">
        <HugeiconsIcon icon={icon} size={22} className="text-white" strokeWidth={1.75} />
      </div>

      <h3 className="mt-6 text-[21px] font-bold leading-snug tracking-[-0.02em] text-primary">
        {s.title}
      </h3>

      <p className="mt-4 text-[15px] leading-[1.65] text-muted">{s.short || s.description}</p>

      {/* Bottom row  the card's action */}
      <div className="mt-auto pt-8">
        <Link
          href="/services"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-3 text-[14px] font-bold text-black transition-colors duration-300 "
        >
          {sections.homeServices.cardLink}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
