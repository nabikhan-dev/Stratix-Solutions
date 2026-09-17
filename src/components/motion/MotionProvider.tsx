"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { DUR, EASE } from "@/lib/motion";

/**
 * Site-wide motion defaults. `reducedMotion="user"` switches transform
 * animations off for anyone whose OS asks for reduced motion — one line
 * here instead of a `useReducedMotion()` check in every component.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: DUR.base, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}
