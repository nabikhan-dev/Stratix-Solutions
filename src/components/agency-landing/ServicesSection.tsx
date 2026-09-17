"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Smartphone, Globe, BrainCircuit, Paintbrush, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionCtaButton from "@/components/layout/SectionCtaButton";
import { RISE, STAGGER, VIEWPORT, enter, enterAt } from "@/lib/motion";
import { sections } from "@/data/copy";

const services = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "iOS and Android apps built with Flutter or React Native. One codebase, native performance, and store submission handled for you. Built to scale from first users to first thousand.",
  },
  {
    icon: Globe,
    title: "Web App Development",
    desc: "Fast, responsive web platforms and SaaS products. Built on modern stacks, measured on real business outcomes  signups, sales, and retention, not just page views.",
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    desc: "Practical AI, not demos. Assistants, automated workflows, document processing, and intelligent features inside your existing product  with human review where it matters.",
  },
  {
    icon: Paintbrush,
    title: "UI/UX Design",
    desc: "Interfaces people understand in seconds. Research, wireframes, and polished design systems that make your product feel premium and stay consistent as it grows.",
  },
];

export default function ServicesSection() {
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

type Service = (typeof services)[number];


function ServiceCard({ service: s, index }: { service: Service; index: number }) {
  const Icon: LucideIcon = s.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: RISE.base }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={enterAt(index)}
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.22)] sm:p-8"
    >
      {/* Icon tile  soft cyan square, dark glyph, exactly as in the catalogue cards */}
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-signal">
        <Icon className="h-[22px] w-[22px] text-white" strokeWidth={1.75} />
      </div>

      <h3 className="mt-6 text-[21px] font-bold leading-snug tracking-[-0.02em] text-primary">
        {s.title}
      </h3>

      <p className="mt-4 text-[15px] leading-[1.65] text-muted">{s.desc}</p>

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
