"use client";

import { LogOut } from "lucide-react";
import { logoutClient } from "@/lib/dashboard/session-client";

export default function LogoutButton() {
  return (
    <button
      onClick={() => logoutClient()}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
    >
      <LogOut className="size-4" strokeWidth={1.75} />
      Log out
    </button>
  );
}
