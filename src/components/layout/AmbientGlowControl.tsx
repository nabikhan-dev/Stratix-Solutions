"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Routes where the global ambient corner glow (globals.css `body::before`)
// should be hidden, per request — every other route keeps it.
const NO_GLOW_ROUTES = ["/services", "/how-we-work", "/pricing", "/blog", "/contact", "/dashboard"];

export default function AmbientGlowControl() {
  const pathname = usePathname();

  useEffect(() => {
    const hide = NO_GLOW_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
    document.body.classList.toggle("no-ambient-glow", hide);
  }, [pathname]);

  return null;
}
