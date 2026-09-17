import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import DashboardNav from "./DashboardNav";
import SubmitButton from "./SubmitButton";
import { logout } from "@/app/dashboard/actions";

export default function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-void">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-64 flex-col overflow-hidden bg-dark px-4 py-6 lg:flex">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 100% 60% at 50% 0%, black 20%, transparent 90%)",
              WebkitMaskImage: "radial-gradient(ellipse 100% 60% at 50% 0%, black 20%, transparent 90%)",
            }}
          />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-70"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0) 70%)",
              filter: "blur(20px)",
            }}
          />

          <Link href="/dashboard" className="relative z-10 mb-8 flex flex-col gap-2 px-2">
            <Image
              src="/logo-white.png"
              alt="Stratix Solutions"
              width={1331}
              height={177}
              className="h-7 w-auto self-start"
            />
            <p className="text-[11px] text-white/40">Admin dashboard</p>
          </Link>

          <div className="relative z-10 flex flex-1 flex-col">
            <DashboardNav />

            <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
              <Link
                href="/"
                target="_blank"
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-white/50 transition hover:bg-white/5 hover:text-white"
              >
                View live site ↗
              </Link>
              <form action={logout}>
                <SubmitButton
                  pendingLabel="Signing out…"
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  <LogOut className="size-4" strokeWidth={1.75} />
                  Log out
                </SubmitButton>
              </form>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
