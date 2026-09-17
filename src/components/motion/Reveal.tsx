"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { RISE, VIEWPORT, enter } from "@/lib/motion";

/**
 * The canonical scroll entrance. Reduced motion is handled site-wide by
 * `MotionProvider`, which switches the transform off and leaves the fade.
 */
export default function Reveal({
  children,
  delay = 0,
  y = RISE.base,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const Component = motion[as as "div"];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={enter(delay)}
    >
      {children}
    </Component>
  );
}
