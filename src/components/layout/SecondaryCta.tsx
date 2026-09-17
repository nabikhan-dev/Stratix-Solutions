"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/data/content";
import TextRoll from "@/components/motion/TextRoll";

/**
 * The outlined twin of SectionCtaButton — same pill, same dimensions, same
 * icon, transparent fill — so a hero can show two CTAs that read as one pair
 * without inventing a second button style. Reads its label and href from
 * `hero.secondaryCta`, so the CTA changes in one place.
 *
 * Sits on the dark hero panels only, hence the white border and label.
 * Its label rolls up under the pointer in step with its filled twin.
 */
export default function SecondaryCta({
  fullWidth = false,
  className = "",
  onClick,
}: {
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={hero.secondaryCta.href}
      onClick={onClick}
      data-cursor-frame="<button>"
      data-roll-group
      className={`group inline-flex ${
        fullWidth ? "w-full" : "w-fit"
      } cursor-pointer items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white/10 ${className}`}
    >
      <TextRoll text={hero.secondaryCta.label} trigger="group" />
      <ArrowUpRight className="w-5 h-5 transition-transform duration-[400ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
