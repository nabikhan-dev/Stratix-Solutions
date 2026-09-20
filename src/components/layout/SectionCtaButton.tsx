"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import TextRoll from "@/components/motion/TextRoll";

export default function SectionCtaButton({
  href,
  type,
  children,
  size = "md",
  tone = "signal",
  fullWidth = false,
  className = "",
  onClick,
}: {

  href?: string;

  type?: "button" | "submit";
  children: ReactNode;

  size?: "sm" | "md";
  /** "inverse" is the white pill used on signal-coloured panels. */
  tone?: "signal" | "inverse";
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const toneClass =
    tone === "inverse"
      ? "bg-white text-signal shadow-lg shadow-black/10 hover:bg-white/90"
      : "bg-signal text-white shadow-lg shadow-(--signal-soft) hover:bg-signal-hover";

  const pillClass = `group inline-flex ${fullWidth ? "w-full" : ""} items-center justify-center gap-2 rounded-full ${
    size === "sm" ? "px-5 py-2 text-sm" : "px-8 py-4 text-[15px]"
  } font-bold transition-colors ${toneClass} ${className}`;

  const label = (
    <>
      {typeof children === "string" ? (
   
        <TextRoll text={children} trigger="group" />
      ) : (
        children
      )}
      <ArrowUpRight
        className={`${size === "sm" ? "w-4 h-4" : "w-5 h-5"} transition-transform duration-[400ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
      />
    </>
  );


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
