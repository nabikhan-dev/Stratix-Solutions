"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Hides its children on routes under `hideOnPrefix` (e.g. the dashboard's
 * own shell replaces the marketing chrome). A thin client wrapper so the
 * children themselves — e.g. AgencyFooter — can stay Server Components
 * instead of needing "use client" just to check the pathname.
 */
export default function RouteVisible({ hideOnPrefix, children }: { hideOnPrefix: string; children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith(hideOnPrefix)) return null;
  return children;
}
