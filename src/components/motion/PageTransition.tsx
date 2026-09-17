"use client";

import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { DUR, RISE, enter } from "@/lib/motion";

/**
 * Fades each route in as it arrives, so navigation settles instead of
 * snapping. The first paint is deliberately exempt: `initial` stays `false`
 * until a navigation has actually happened, so server-rendered content is
 * never delivered at opacity 0 and never waits on JS to become visible.
 *
 * The flag lives at module scope rather than in state or a ref: it is only
 * ever written from an effect, so it stays `false` on the server (where the
 * module is shared between requests) and simply records, on the client,
 * whether this session has navigated yet. Nothing needs to re-render to read
 * it — keying on `pathname` already remounts the element, and that mount is
 * what replays the entrance.
 */
let hasNavigated = false;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFirstPaint = !hasNavigated;

  useEffect(() => {
    // Runs after each route renders; the first run is the initial load.
    hasNavigated = true;
  }, [pathname]);

  return (
    <motion.main
      id="main-content"
      key={pathname}
      initial={isFirstPaint ? false : { opacity: 0, y: RISE.sm }}
      animate={{ opacity: 1, y: 0 }}
      transition={enter(0, DUR.fast)}
    >
      {children}
    </motion.main>
  );
}
