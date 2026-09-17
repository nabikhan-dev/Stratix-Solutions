"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Minus, Sparkles } from "lucide-react";
import { DUR, STAGGER, enter } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";
import { pricingTiers, type PricingTier } from "@/data/content";

/**
 * Every feature named by any tier, in the order the tiers introduce them.
 * Each card renders this same list so the rows line up across the row of
 * cards — a tick where that tier includes the line, a dash where it doesn't —
 * instead of three lists of different lengths that can't be compared.
 */
const allFeatures = Array.from(new Set(pricingTiers.flatMap((t) => t.features)));

/** Only ever rendered on the light band of /pricing. The recommended middle tier is the dark, highlighted card. */
export default function TierCards() {
  return (
    <div className="grid items-start gap-5 md:grid-cols-3">
      {pricingTiers.map((t, i) => (
        <Reveal key={t.id} delay={i * STAGGER}>
          <TierCard tier={t} featured={i === 1} />
        </Reveal>
      ))}
    </div>
  );
}

function TierCard({ tier, featured }: { tier: PricingTier; featured: boolean }) {
  const included = new Set(tier.features);

  return (
    <motion.div
      transition={enter(0, DUR.fast)}
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-shadow duration-500 sm:p-7 ${
        featured
          ? "border-signal/40 bg-dark shadow-xl shadow-signal/20 hover:shadow-2xl hover:shadow-signal/30 md:-my-4 md:py-11"
          : "border-line bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-xl hover:shadow-signal/[0.08]"
      }`}
    >
      {/* Violet wash across the top of the highlighted card, as in a featured plan column */}
      {featured && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64"
          style={{ background: "radial-gradient(120% 100% at 50% 0%, rgba(124,58,237,0.45) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
      )}

      {/* Header row — plan name, and the timeline pill in the badge slot */}
      <div className="relative flex items-start justify-between gap-3">
        <h3
          className={`flex items-center gap-1.5 font-display text-[20px] font-bold tracking-[-0.03em] ${
            featured ? "text-white" : "text-primary"
          }`}
        >
          {featured && <Sparkles className="h-4 w-4 text-signal" strokeWidth={2.25} />}
          {tier.name}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
            featured ? "bg-signal text-white" : "bg-signal/10 text-signal"
          }`}
        >
          {featured ? `Most picked • ${tier.timeline}` : tier.timeline}
        </span>
      </div>

      <p className={`relative mt-3 text-[15px] leading-relaxed ${featured ? "text-white/70" : "text-muted"}`}>
        {tier.description}
      </p>

      {/* Price block */}
      <div className="relative mt-6">
        <p className={`text-[13px] ${featured ? "text-white/50" : "text-faint"}`}>Fixed price</p>
        <p
          className={`mt-1 font-display text-[40px] font-bold leading-none tracking-[-0.045em] ${
            featured ? "text-white" : "text-primary"
          }`}
        >
          {tier.price}
          <span className={`ml-0.5 text-[16px] font-semibold ${featured ? "text-white/60" : "text-muted"}`}>
            /project
          </span>
        </p>
      </div>

      <Link
        href="/contact"
        className={`relative mt-6 block rounded-lg py-3.5 text-center text-[15px] font-bold transition-colors duration-300 ${
          featured
            ? "bg-signal text-white hover:bg-signal-hover"
            : "border border-signal/40 text-signal hover:bg-signal hover:text-white"
        }`}
      >
        Choose plan
      </Link>

      <p className={`relative mt-4 text-[13px] leading-relaxed ${featured ? "text-white/50" : "text-muted"}`}>
        {tier.note}
      </p>

      <hr className={`relative my-6 border-t ${featured ? "border-white/10" : "border-line"}`} />

      {/* Feature checklist — same rows on every card, ticked or dashed */}
      <ul className="relative flex flex-col gap-3">
        {allFeatures.map((f) => {
          const on = included.has(f);
          return (
            <li key={f} className="flex items-start gap-2.5 text-[14px] leading-snug">
              {on ? (
                <Check
                  className={`mt-px h-4 w-4 shrink-0 ${featured ? "text-aurora" : "text-calm"}`}
                  strokeWidth={2.5}
                />
              ) : (
                <Minus
                  className={`mt-px h-4 w-4 shrink-0 ${featured ? "text-white/25" : "text-line-strong"}`}
                  strokeWidth={2.5}
                />
              )}
              <span
                className={
                  on
                    ? featured
                      ? "text-white/90"
                      : "text-primary"
                    : featured
                      ? "text-white/35"
                      : "text-faint"
                }
              >
                {f}
              </span>
            </li>
          );
        })}
      </ul>

      <p className={`relative mt-7 text-[14px] font-bold ${featured ? "text-white" : "text-primary"}`}>Build with:</p>
      <ul className="relative mt-3 flex flex-col gap-3">
        {tier.stack.map((s) => (
          <li key={s} className="flex items-start gap-2.5 text-[14px] leading-snug">
            <Check
              className={`mt-px h-4 w-4 shrink-0 ${featured ? "text-aurora" : "text-calm"}`}
              strokeWidth={2.5}
            />
            <span className={featured ? "text-white/90" : "text-primary"}>{s}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
