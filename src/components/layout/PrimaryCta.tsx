"use client";

import Link from "next/link";
import { hero } from "@/data/content";
import TextRoll from "@/components/motion/TextRoll";

/**
 * The site's one primary CTA — the hero's animated "Book a Free Call" lockup,
 * shared so the hero, the desktop nav and the mobile menu all render the same
 * button instead of three unrelated pills. Reads its label and href from
 * `hero.primaryCta`, so the CTA changes in one place.
 *
 * On hover the icon box slides to the far edge and the label slides the other
 * way, swapping sides, while a white wipe crosses the button and the label
 * rolls up to its twin.
 */

/** The "S" mark's dot grid, lit pixel by pixel. */
const ROWS = [
  [false, false, true, false, false],
  [false, false, false, true, false],
  [true, true, true, true, true],
  [false, false, false, true, false],
  [false, false, true, false, false],
];

export default function PrimaryCta({
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
      href={hero.primaryCta.href}
      onClick={onClick}
      data-cursor-frame="<button>"
      data-roll-group
      className={`group relative flex ${
        fullWidth ? "w-full" : "w-fit"
      } cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-brand py-2 pr-4 pl-11 tracking-tight ${className}`}
    >
      {/* Sliding icon box */}
      <span
        aria-hidden="true"
        className="
          absolute inset-y-0 left-1 z-40 my-auto flex size-8 flex-col items-center justify-center gap-px rounded-[5px]
          transition-all duration-[400ms] ease-out
          group-hover:left-[calc(100%-2.3rem)] group-hover:rotate-180
        "
        style={{ backgroundColor: "rgba(124,58,237,0.8)" }}
      >
        {/* Dot grid — visible when not hovered */}
        <span className="flex flex-col gap-px group-hover:hidden">
          {ROWS.map((row, ri) => (
            <span key={ri} className="flex gap-px">
              {row.map((bright, ci) => (
                <span
                  key={ci}
                  className={`inline-block size-0.75 shrink-0 rounded-full ${
                    bright ? "bg-white" : "bg-white/25"
                  }`}
                />
              ))}
            </span>
          ))}
        </span>

        {/* Resolves into the mark on hover */}
        <span
          className="
            hidden size-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500
            blur-sm transition-all duration-[400ms] ease-out
            group-hover:flex group-hover:blur-none
          "
        >
          <span className="text-[7px] font-bold text-white">S</span>
        </span>
      </span>

      {/* Wipe */}
      <span
        aria-hidden="true"
        className="
          absolute -inset-px rounded-lg bg-white/20
          transition-[clip-path] duration-[400ms] ease-out
          [clip-path:inset(0_100%_0_0)]
          group-hover:[clip-path:inset(0_0%_0_0)]
        "
      />

      <span className="inline-block text-white transition-transform duration-[400ms] group-hover:-translate-x-8">
        <TextRoll text={hero.primaryCta.label} trigger="group" />
      </span>
    </Link>
  );
}
