"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Briefcase,
  Sparkles,
  CircleDollarSign,
  Settings as SettingsIcon,
  MessageSquare,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/blog", label: "Blog", icon: Newspaper, exact: false },
  { href: "/dashboard/projects", label: "Projects", icon: Briefcase, exact: false },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: MessageSquare, exact: false },
  { href: "/dashboard/services", label: "Services", icon: Sparkles, exact: false },
  { href: "/dashboard/pricing", label: "Pricing", icon: CircleDollarSign, exact: false },
  { href: "/dashboard/settings", label: "Settings", icon: SettingsIcon, exact: false },
] as const;

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-medium transition ${
              active ? "text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
            style={
              active
                ? { background: "linear-gradient(90deg, rgba(124,58,237,0.22), rgba(124,58,237,0.03) 70%)" }
                : undefined
            }
          >
            {active && (
              <span
                className="absolute inset-y-1 left-0 w-0.75 rounded-full"
                style={{ background: "linear-gradient(180deg, var(--signal), var(--aurora))" }}
              />
            )}
            <Icon className={`size-4.5 ${active ? "text-aurora" : ""}`} strokeWidth={1.75} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
