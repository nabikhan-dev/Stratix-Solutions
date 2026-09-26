"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "../actions";
import { FormError } from "@/components/dashboard/ui";

export default function DashboardLoginPage() {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(undefined);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
      }
    });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark px-4">
      {/* Same grid + glow motif as the homepage hero — the login screen is
          the first thing an admin sees, worth it feeling on-brand rather
          than a bare centered form. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 85%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0) 70%)", filter: "blur(30px)" }}
      />

      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/3 p-8 backdrop-blur-xl">
        <Image
          src="/logo-white.png"
          alt="Stratix Solutions"
          width={1331}
          height={177}
          priority
          className="mb-6 h-8 w-auto"
        />
        <h1 className="mt-1.5 text-xl font-semibold text-white">Dashboard sign in</h1>
        <p className="mt-1.5 text-[13.5px] text-white/50">
          Internal admin area. Enter the shared dashboard password to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-white/60">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/30 outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/25"
              placeholder="••••••••"
            />
          </div>

          <FormError message={error} />

          <button
            type="submit"
            disabled={isPending}
            className="w-full justify-center rounded-lg bg-signal px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
