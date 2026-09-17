"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { hero, nav } from "@/data/content";
import SectionCtaButton from "@/components/layout/SectionCtaButton";
import TextRoll from "@/components/motion/TextRoll";

// Runs before paint on the client so the correct logo variant is in the first
// frame; falls back to useEffect on the server, where layout effects warn.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function GlobalNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const [onDark, setOnDark] = useState(true);


  useIsoLayoutEffect(() => {
    let raf = 0;

    // Walks what is painted under one point and reports whether it is dark.
    function isDarkAt(x: number, y: number) {
      for (const el of document.elementsFromPoint(x, y)) {
        if (navRef.current?.contains(el)) continue;
        const parts = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
        if (!parts) continue;
        const [r, g, b] = parts.map(Number);
        const alpha = parts.length > 3 ? Number(parts[3]) : 1;
        if (alpha < 0.5) continue; // see-through — keep looking behind it
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
      }
      return false; // nothing opaque found: the page ground is light
    }

    function sample() {
      raf = 0;
      const logo = logoRef.current;
      if (!logo) return;
      const box = logo.getBoundingClientRect();
      const y = box.top + box.height / 2;

      // Any dark reading wins: the lockup must never be black-on-black.
      setOnDark([0.15, 0.5, 0.85].some((t) => isDarkAt(box.left + box.width * t, y)));
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(sample);
    }

    sample(); // synchronous first read — deferring to rAF would paint the wrong variant
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  // The dashboard has its own sidebar/shell — the marketing nav doesn't belong there.
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <>
      <nav ref={navRef} className="fixed inset-x-0 top-4 z-100">
        <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">

         
        
            <Link ref={logoRef} href="/" className="z-10 flex shrink-0 items-center">
              <span className="relative block h-5 aspect-[1331/177] sm:h-7">
                <Image
                  src="/logo-white.png"
                  alt="Stratix Solutions"
                  fill
                  sizes="(min-width: 640px) 211px, 150px"
                  priority
                  className={`object-contain transition-opacity duration-300 ${
                    onDark ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Image
                  src="/logo-black.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  priority
                  sizes="(min-width: 640px) 211px, 150px"
                  className={`object-contain transition-opacity duration-300 ${
                    onDark ? "opacity-0" : "opacity-100"
                  }`}
                />
              </span>
            </Link>

            {/* Desktop — centered pill */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-white/20 bg-dark/60 backdrop-blur-xl shadow-lg">
                {nav.map(({ label, href }) => {
                  const isActive =
                    href === "/"
                      ? pathname === "/"
                      : pathname === href || pathname?.startsWith(href + "/");
                  return (
                    <Link
                      key={label}
                      href={href}
                      data-roll-group
                      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "bg-signal text-white"
                          : "text-white/80 hover:text-white hover:bg-signal/40"
                      }`}
                    >
                      <TextRoll text={label} trigger="group" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block shrink-0 z-10">
              <SectionCtaButton href={hero.primaryCta.href} size="sm">
                {hero.primaryCta.label}
              </SectionCtaButton>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-full border border-white/20 bg-dark/60 backdrop-blur-xl text-white/80 hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="mx-4 mb-4 rounded-2xl border border-white/20 bg-dark/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="p-4 flex flex-col gap-1">
              {nav.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  data-roll-group
                  className="px-4 py-3 text-sm font-medium rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <TextRoll text={label} trigger="group" />
                </Link>
              ))}
              <SectionCtaButton
                href={hero.primaryCta.href}
                size="sm"
                fullWidth
                className="mt-2"
                onClick={() => setMobileOpen(false)}
              >
                {hero.primaryCta.label}
              </SectionCtaButton>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
