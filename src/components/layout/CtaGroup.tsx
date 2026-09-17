"use client";

import { hero } from "@/data/content";
import SectionCtaButton from "@/components/layout/SectionCtaButton";
import SecondaryCta from "@/components/layout/SecondaryCta";

/**
 * The site's CTA lockup — the same filled pill every section already ends with
 * (SectionCtaButton), paired with its outlined twin. Rendered by Home's hero
 * and by PageHero, so every masthead on the site shows the same two buttons in
 * the same style instead of one-off markup per page.
 */
export default function CtaGroup({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      <SectionCtaButton href={hero.primaryCta.href}>{hero.primaryCta.label}</SectionCtaButton>
      <SecondaryCta />
    </div>
  );
}
