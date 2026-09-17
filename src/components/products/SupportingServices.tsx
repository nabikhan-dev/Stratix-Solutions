"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Paintbrush, Smartphone, Globe } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import type { PrimaryService } from "@/data/content";
import { DUR, STAGGER, enter } from "@/lib/motion";

const icons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  ai: BrainCircuit,
  uiux: Paintbrush,
  app: Smartphone,
  web: Globe,
};

/** The 3 non-featured service cards on /products — a client component (motion.article needs one) so the page itself can stay a server component and keep its `metadata` export. */
export default function SupportingServices({ services }: { services: PrimaryService[] }) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-3">
      {services.map((service, i) => {
        const Icon = icons[service.id] ?? Globe;
        return (
          <Reveal key={service.id} delay={(i + 1) * STAGGER}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={enter(0, DUR.fast)}
              className="group relative h-full overflow-hidden rounded-2xl border border-line p-6 transition-[border-color,box-shadow] duration-500 hover:border-signal/40 hover:shadow-xl hover:shadow-signal/[0.08]"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, var(--signal) 0%, transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-void transition-all duration-500 group-hover:scale-105 group-hover:border-signal group-hover:bg-signal">
                <Icon className="h-4 w-4 text-muted transition-colors duration-500 group-hover:text-white" strokeWidth={1.75} />
              </div>
              <h3 className="relative mt-5 font-display text-lg font-semibold tracking-[-0.03em] text-primary transition-colors duration-300 group-hover:text-signal">
                {service.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted">{service.short}</p>
            </motion.article>
          </Reveal>
        );
      })}
    </div>
  );
}
