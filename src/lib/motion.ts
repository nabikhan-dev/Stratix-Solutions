/**
 * The site's motion vocabulary. Every animation on every page draws its
 * easing, distance, duration and trigger point from here, so the whole site
 * moves as one thing instead of each section inventing its own timing.
 *
 * Reduced motion is handled centrally by `MotionProvider`, which switches
 * transform animations off for anyone who asks the OS for that.
 */

/**
 * One easing everywhere: ease-out-cubic.
 *
 * This was expo-out — `[0.16, 1, 0.3, 1]` — which front-loads so hard that it
 * covers half the travel in the first tenth of the duration and 88% by the
 * third. That made the duration almost decorative: raising it lengthened an
 * invisible settle at the end while the part the eye actually follows stayed
 * under 300ms, so the entrances read as fast no matter what the number said.
 *
 * Ease-out-cubic spreads the same travel far more evenly — 90% of it takes
 * roughly 55% of the duration — so `DUR` now controls what a viewer perceives.
 * It is also the curve bitnomial.com uses for its own reveals.
 */
export const EASE = [0.33, 1, 0.68, 1] as const;

/** Three durations. Anything outside this is an outlier worth questioning. */
export const DUR = {
  /** State changes the eye should barely notice: accordions, tabs, hovers.
   *  Left short on purpose — a panel that takes as long to open as a section
   *  takes to arrive reads as lag, not as calm. */
  fast: 0.35,
  /** The default: content arriving on scroll. */
  base: 1.4,
  /** Ambient background washes that should never draw attention. Kept well
   *  clear of `base` so they still read as atmosphere, not as an entrance. */
  slow: 2.2,
} as const;

/** How far something travels as it arrives. Small items move less. */
export const RISE = {
  /** Labels, list rows, single lines. */
  sm: 12,
  /** Headings, paragraphs, cards. */
  base: 20,
  /** Full-width blocks and hero media. */
  lg: 32,
} as const;

/** The beat between items in a staggered group, and between stacked lines. */
export const STAGGER = 0.14;

/**
 * The same beat in milliseconds, for effects driven outside framer-motion —
 * `RevealScroll` takes ms rather than seconds. Derived here rather than
 * written out again, so a CSS-driven stagger cannot drift away from the
 * framer-driven one; `RevealScroll` had already drifted once.
 */
export const STAGGER_MS = STAGGER * 1000;

/**
 * Shared scroll trigger. Firing every section at the same point is most of
 * what makes a page feel composed rather than twitchy — the default fires
 * only once an element is fully in view, which reads as late.
 */
export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

/** The standard entrance transition. */
export function enter(delay = 0, duration: number = DUR.base) {
  return { duration, delay, ease: EASE };
}

/** Entrance for item `i` of a staggered group, optionally after a lead-in. */
export function enterAt(i: number, offset = 0) {
  return enter(i * STAGGER + offset);
}
