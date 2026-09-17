"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import TextRoll from "@/components/motion/TextRoll";

/**
 * The site's button — filled signal pill with an arrow icon. Rendered at the
 * bottom of sections like ProjectsPortfolio and PricingPlans, in the hero
 * lockup (CtaGroup) and in the navbar, so every button on the site is this one
 * component instead of duplicated markup. Holds its position on hover — only
 * its fill changes.
 *
 * Renders a link by default. Pass `type` in place of `href` for the same pill
 * as a native <button> — that is how the contact form's submit stays on style
 * without a second set of button markup.
 *
 * A plain-string label rolls up under the pointer and rolls back when it
 * leaves. Anything richer than a string is left alone, since the roll needs
 * a second copy of the text to send up after the first.
 */
export default function SectionCtaButton({
  href,
  type,
  children,
  size = "md",
  fullWidth = false,
  className = "",
  onClick,
}: {
  /** Where the button goes. Omit it and pass `type` for a form button. */
  href?: string;
  /** Renders a native <button> instead of a link — for form submits. */
  type?: "button" | "submit";
  children: ReactNode;
  /** "sm" is the nav-scale pill; "md" is the section and hero default. */
  size?: "sm" | "md";
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const pillClass = `group inline-flex ${fullWidth ? "w-full" : ""} items-center justify-center gap-2 rounded-full bg-signal ${
    size === "sm" ? "px-5 py-2 text-sm" : "px-8 py-4 text-[15px]"
  } font-bold text-white shadow-lg shadow-(--signal-soft) transition-colors hover:bg-signal-hover ${className}`;

  const label = (
    <>
      {typeof children === "string" ? (
        // `group` so the whole pill drives the roll — hovering the arrow
        // should lift the label too.
        <TextRoll text={children} trigger="group" />
      ) : (
        children
      )}
      <ArrowUpRight
        className={`${size === "sm" ? "w-4 h-4" : "w-5 h-5"} transition-transform duration-[400ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
      />
    </>
  );

  // No href: a real <button>, which the custom cursor already frames and tags
  // `<button>` on its own — the data-cursor-frame opt-in is only for the link.
  if (href === undefined) {
    return (
      <button type={type ?? "button"} onClick={onClick} data-roll-group className={pillClass}>
        {label}
      </button>
    );
  }

  return (
    <Link href={href} onClick={onClick} data-cursor-frame="<button>" data-roll-group className={pillClass}>
      {label}
    </Link>
  );
}
