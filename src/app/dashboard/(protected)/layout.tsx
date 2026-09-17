import type { Metadata } from "next";
import type { ReactNode } from "react";
import { requireSession } from "@/lib/dashboard/session";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// Every route in this (protected) group renders behind requireSession().
// proxy.ts already redirects unauthenticated requests before they reach
// here — this is the second, non-optimistic check every render still needs
// (see the note in session.ts and the Server Actions security guide).
export default async function ProtectedDashboardLayout({ children }: { children: ReactNode }) {
  await requireSession();
  return <DashboardShell>{children}</DashboardShell>;
}
