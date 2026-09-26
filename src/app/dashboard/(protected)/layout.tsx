import type { Metadata } from "next";
import type { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// Authentication is enforced by Edge Middleware (src/proxy.ts) which redirects
// unauthenticated requests before they reach this layout.
// With output:"export", next/headers is unavailable so requireSession() is
// intentionally removed — middleware is the auth gate.
export default function ProtectedDashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
