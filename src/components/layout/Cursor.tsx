"use client";

import { useEffect, useRef, useState } from "react";

/** Idle box size, in px — the small four-bracket point that trails the pointer. */
const IDLE_SIZE = 22;
/** Breathing room between a locked element's edge and the brackets, in px. */
const FRAME_PAD = 14;
/** Lerp factor for the follow/expand animation. */
const EASE = 0.2;

const FRAME_SELECTOR = "button:not([disabled]), a[href], [data-cursor-frame]";
const NATIVE_CURSOR_SELECTOR = "input, textarea, select, [contenteditable='true']";

export default function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time capability check on mount, not derivable from props/state
    setEnabled(isFine);
    if (!isFine) return;

    let pointerX = 0;
    let pointerY = 0;
    let x = 0;
    let y = 0;
    let w = IDLE_SIZE;
    let h = IDLE_SIZE;
    let moved = false;
    let frame = 0;
    let locked: HTMLElement | null = null;

    /** Latch onto (or release) a button matching FRAME_SELECTOR. */
    function lockTo(el: HTMLElement | null) {
      if (el === locked) return;
      locked = el;
      const root = rootRef.current;
      if (!root) return;
      if (el) {
        if (tagRef.current) {
          // Opt-in value wins, otherwise label it with the element's own tag.
          const label = el.getAttribute("data-cursor-frame")?.trim();
          tagRef.current.textContent = label || `<${el.tagName.toLowerCase()}>`;
        }
        root.setAttribute("data-locked", "true");
      } else {
        root.removeAttribute("data-locked");
      }
    }

    function onMove(e: MouseEvent) {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (!moved) {
        // Snap to the first known position, then fade in.
        moved = true;
        x = pointerX;
        y = pointerY;
      }
      const target = e.target as HTMLElement | null;

      if (target?.closest?.(NATIVE_CURSOR_SELECTOR)) {
        rootRef.current?.removeAttribute("data-visible");
        lockTo(null);
        return;
      }

      rootRef.current?.setAttribute("data-visible", "true");
      lockTo(target?.closest?.<HTMLElement>(FRAME_SELECTOR) ?? null);
    }

    function raf() {
      const root = rootRef.current;
      if (root) {
        // Release a locked element that has since left the DOM.
        if (locked && !document.contains(locked)) lockTo(null);

        let destX = pointerX;
        let destY = pointerY;
        let destW = IDLE_SIZE;
        let destH = IDLE_SIZE;

        if (locked) {
          // Re-read each frame so the brackets track scroll and entry motion.
          const rect = locked.getBoundingClientRect();
          destX = rect.left + rect.width / 2;
          destY = rect.top + rect.height / 2;
          destW = rect.width + FRAME_PAD * 1;
          destH = rect.height + FRAME_PAD * 1;
        }

        x += (destX - x) * EASE;
        y += (destY - y) * EASE;
        w += (destW - w) * EASE;
        h += (destH - h) * EASE;

        root.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        root.style.width = `${w}px`;
        root.style.height = `${h}px`;
      }
      frame = requestAnimationFrame(raf);
    }

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(raf);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="cursor-point" aria-hidden="true">
      <span className="cursor-point__corner cursor-point__corner--tl" />
      <span className="cursor-point__corner cursor-point__corner--tr" />
      <span className="cursor-point__corner cursor-point__corner--bl" />
      <span className="cursor-point__corner cursor-point__corner--br" />

    </div>
  );
}
