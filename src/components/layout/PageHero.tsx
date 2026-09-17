"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import HeroBackdrop from "@/components/layout/HeroBackdrop";
import HeroWordmark from "@/components/layout/HeroWordmark";

/**
 * Dark masthead used by every page except Home (which keeps its own bespoke
 * HeroSection). Same panel as Home's hero — rounded black card, rule grid,
 * centered stack, oversized wordmark on the bottom edge — so every masthead
 * on the site reads as one thing. Heights are `min-h` rather than fixed so a
 * long description grows the panel instead of clipping out of it.
 */
export default function PageHero({
  title,
  description,
  visual,
  watermark,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Small supporting graphic below the description — used sparingly (Services only). */
  visual?: ReactNode;
  /** Overrides the wordmark on the panel's bottom edge, which otherwise reads the page's own name. */
  watermark?: string;
}) {
  const pathname = usePathname();
  // "/how-we-work" → "HOW WE WORK", "/blog/some-post" → "BLOG".
  const segment = pathname?.split("/").filter(Boolean)[0];
  const pageName = watermark ?? (segment ? segment.replace(/-/g, " ").toUpperCase() : "STRATIX SOLUTIONS");

  return (
    <section className="flex max-w-screen flex-col items-center justify-center overflow-x-hidden p-2">
      <div className="min-h-[60vh] w-full md:min-h-screen">
        <div className="relative flex min-h-[98vh] w-full flex-col overflow-hidden rounded-3xl bg-black text-white">
          <HeroBackdrop arc={false} />

          <div className="relative z-10 mx-auto mt-12 flex w-full max-w-[1440px] flex-1 flex-col px-4">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <Reveal delay={0.05}>
                <div className="mx-auto mt-8 max-w-6xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  {title}
                </div>
              </Reveal>

              {description && (
                <Reveal delay={0.12}>
                  <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg lg:text-xl">
{description}
                  </p>
                </Reveal>
              )}

              {visual && (
                <Reveal delay={0.18}>
                  <div className="mt-8 flex justify-center">{visual}</div>
                </Reveal>
              )}
            </div>

            <HeroWordmark text={pageName} />
          </div>
        </div>
      </div>
    </section>
  );
}
