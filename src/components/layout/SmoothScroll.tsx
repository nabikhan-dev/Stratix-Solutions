"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      // A long glide on the same expo-out curve the rest of the site's motion
      // uses (see lib/motion EASE), so a flick of the wheel carries and
      // settles instead of stopping dead. Short durations here are what make
      // smooth scrolling read as stutter rather than weight.
      duration: 1.1,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Trackpads already send smooth deltas; re-smoothing them lags the page
      // behind the fingers.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
