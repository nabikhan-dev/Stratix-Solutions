"use client";

import { useEffect } from "react";

import { DUR, EASE, RISE, STAGGER_MS } from "@/lib/motion";

/**
 * The site-wide scroll-reveal scanner.
 *
 * Mounted once in the root layout. Anything marked `data-reveal` anywhere in
 * the tree starts offset and transparent and settles into place the first
 * time it scrolls into view — no import, no wrapper element, no `"use client"`
 * on the section that wants it. That last part is the point: server
 * components get the entrance without becoming client components.
 *
 * Per-element overrides, all optional:
 *   data-reveal-delay="200"        lead-in, ms
 *   data-reveal-duration="600"     ms
 *   data-reveal-distance="60"      px travelled
 *   data-reveal-origin="left"      bottom | top | left | right
 *   data-reveal-stagger="80"       ms between staggered children
 *   data-reveal-stagger-child      on each child that should stagger
 */

/**
 * Read off the shared vocabulary rather than written out again, so a
 * `data-reveal` entrance and a framer-motion one cannot end up on different
 * timings — they had: this file drifted to 700ms against `DUR.base`.
 */
const DEFAULTS = {
  duration: DUR.base * 1000,
  delay: 0,
  origin: "bottom",
  stagger: STAGGER_MS,
  /** Phones get a shorter travel — the same distance reads as a lurch there. */
  distance: () => (window.innerWidth < 769 ? RISE.base : RISE.lg),
};

/** The site's one easing, as CSS spells it. */
const EASING = `cubic-bezier(${EASE.join(", ")})`;

function offsetFor(origin: string, distance: number) {
  switch (origin) {
    case "top":
      return `translateY(-${distance}px)`;
    case "left":
      return `translateX(-${distance}px)`;
    case "right":
      return `translateX(${distance}px)`;
    default:
      return `translateY(${distance}px)`;
  }
}

export default function RevealScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SELECTOR = "[data-reveal]";
    const seen = new WeakSet<Element>();

    /** Put an element in its pre-reveal state. */
    function arm(el: HTMLElement) {
      const origin = el.dataset.revealOrigin || DEFAULTS.origin;
      const distance = Number(el.dataset.revealDistance) || DEFAULTS.distance();
      const offset = offsetFor(origin, distance);

      el.style.opacity = "0";
      el.style.transform = offset;
      el.style.transition = `transform ${EASING}, opacity ${EASING}`;
      el.style.willChange = "transform, opacity";

      if (el.dataset.revealStagger !== undefined) {
        const step = Number(el.dataset.revealStagger) || DEFAULTS.stagger;
        el.querySelectorAll<HTMLElement>("[data-reveal-stagger-child]").forEach((child, i) => {
          child.style.opacity = "0";
          child.style.transform = offset;
          child.style.transition = `transform ${EASING}, opacity ${EASING}`;
          child.style.transitionDelay = `${i * step}ms`;
        });
      }
    }

    /** Release it — and its staggered children, which keep their own delays. */
    function reveal(el: HTMLElement) {
      const duration = Number(el.dataset.revealDuration) || DEFAULTS.duration;
      const delay = Number(el.dataset.revealDelay) || DEFAULTS.delay;

      el.style.transitionDuration = `${duration}ms`;
      el.style.transitionDelay = `${delay}ms`;
      el.style.opacity = "1";
      el.style.transform = "translate(0)";

      if (el.dataset.revealStagger !== undefined) {
        el.querySelectorAll<HTMLElement>("[data-reveal-stagger-child]").forEach((child) => {
          child.style.transitionDuration = `${duration}ms`;
          child.style.opacity = "1";
          child.style.transform = "translate(0)";
        });
      }

      // Nothing left to composite once it has landed.
      const total = duration + delay;
      setTimeout(() => {
        el.style.willChange = "";
      }, total + 50);
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          obs.unobserve(entry.target);
          reveal(entry.target as HTMLElement);
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );

    /** Arm and observe anything not already handled. */
    function scan(root: ParentNode = document) {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        arm(el);
        observer.observe(el);
      });
    }

    scan();

    // Client-side navigation swaps the whole page under us, so new sections
    // have to be picked up as they arrive rather than only on mount.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          const el = node as HTMLElement;
          if (el.matches(SELECTOR) && !seen.has(el)) {
            seen.add(el);
            arm(el);
            observer.observe(el);
          }
          scan(el);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
