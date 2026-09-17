"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Animates a number counting up from 0 the first time it scrolls into
 * view, then renders the original string exactly as given (so "10+" —
 * including any suffix — is preserved on the final frame).
 *
 * A four-digit year is rendered as-is: ramping "2026" from 0 flashes
 * unrelated numbers ("644") that read as a broken stat rather than a date.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState("0");

  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const isYear = /^\s*[12]\d{3}\s*$/.test(value);

  useEffect(() => {
    if (!inView || reduced || isYear || Number.isNaN(numeric)) return;
    const duration = 1100;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numeric * eased);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- numeric/suffix are derived from value each render; re-running on inView is what starts the animation
  }, [inView, reduced, isYear]);

  const shown = reduced || isYear || Number.isNaN(numeric) ? value : display;

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
