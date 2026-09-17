import type { ComponentType, ReactNode } from "react";
import Link from "next/link";

// Shared visual primitives for every /dashboard page. Centralizing these
// (instead of each page re-declaring its own card/input/button markup) is
// what keeps the dashboard's ~10 routes from duplicating the same styled
// <div>/<input>/<button> boilerplate.

export const inputClass =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[14px] text-primary placeholder:text-faint outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/15";

export const labelClass = "mb-1.5 block text-[13px] font-medium text-muted";

export const buttonPrimaryClass =
  "inline-flex items-center justify-center gap-1.5 rounded-lg bg-signal px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-60";

export const buttonGhostClass =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-line bg-surface px-4 py-2.5 text-[14px] font-semibold text-primary transition hover:border-line-strong hover:bg-deep disabled:cursor-not-allowed disabled:opacity-60";

export const buttonDangerClass =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-danger/30 bg-danger/5 px-4 py-2.5 text-[14px] font-semibold text-danger transition hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-60";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-[14px] text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-surface p-6 ${className}`}>
      {/* Hairline gradient top edge — the one recurring "unique" touch that
          ties every dashboard card back to the site's signal→aurora brand
          gradient, instead of a flat generic-admin border. */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-70"
        style={{ background: "linear-gradient(90deg, var(--signal), var(--aurora), transparent)" }}
      />
      {children}
    </div>
  );
}

/**
 * Accent tokens assigned to dashboard content categories in a fixed order
 * (never cycled/reassigned per instance) — Blog, Projects, Services,
 * Pricing map 1:1 to signal, aurora, amber, calm everywhere they appear
 * (nav icons, stat tiles) so color reliably means the same category.
 */
export const accentTokens = ["signal", "aurora", "amber", "calm"] as const;
export type AccentToken = (typeof accentTokens)[number];

const accentStyles: Record<AccentToken, { text: string; bg: string; ring: string }> = {
  signal: { text: "text-signal", bg: "bg-signal", ring: "ring-signal/15" },
  aurora: { text: "text-aurora", bg: "bg-aurora", ring: "ring-aurora/15" },
  amber: { text: "text-amber", bg: "bg-amber", ring: "ring-amber/15" },
  calm: { text: "text-calm", bg: "bg-calm", ring: "ring-calm/15" },
};

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[12.5px] text-faint">{hint}</p>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  href,
  accent,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  href?: string;
  accent: AccentToken;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  const { text, bg, ring } = accentStyles[accent];
  const content = (
    <>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-muted">{label}</p>
        {Icon ? (
          <span className={`grid size-7 shrink-0 place-items-center rounded-md ring-1 ${ring}`}>
            <Icon className={`size-3.5 ${text}`} strokeWidth={2} />
          </span>
        ) : (
          <span className={`size-1.5 shrink-0 rounded-full ${bg}`} />
        )}
      </div>
      {/* Proportional (non-tabular) figures — this is a standalone value,
          not a column of numbers that needs to align. */}
      <p className="mt-2.5 text-[28px] leading-none font-semibold tracking-tight text-primary">{value}</p>
    </>
  );
  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-2xl border border-line bg-surface p-5 transition hover:border-line-strong hover:bg-deep"
      >
        {content}
      </Link>
    );
  }
  return <div className="rounded-2xl border border-line bg-surface p-5">{content}</div>;
}

/** The one number a dashboard view leads with — see Overview. */
export function HeroFigure({ label, value, caption }: { label: string; value: string | number; caption?: string }) {
  return (
    <div>
      <p className="text-[13px] font-medium text-muted">{label}</p>
      <p className="mt-1 text-[52px] leading-none font-semibold tracking-tight text-primary">{value}</p>
      {caption && <p className="mt-2 text-[13.5px] text-faint">{caption}</p>}
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong py-16 text-center">
      <p className="text-[15px] font-medium text-primary">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-[13.5px] text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
      <table className="w-full border-collapse text-left text-[14px]">{children}</table>
    </div>
  );
}

export function Th({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <th className={`border-b border-line bg-deep/60 px-4 py-3 text-[12.5px] font-semibold uppercase tracking-wide text-muted ${className}`}>
      {children}
    </th>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`border-b border-line px-4 py-3.5 align-middle text-primary ${className}`}>{children}</td>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | AccentToken }) {
  const tones = {
    neutral: "bg-deep text-muted",
    signal: "bg-signal/10 text-signal",
    aurora: "bg-aurora/10 text-aurora",
    amber: "bg-amber/10 text-amber",
    calm: "bg-calm/10 text-calm",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="rounded-lg border border-danger/30 bg-danger/5 px-3.5 py-2.5 text-[13.5px] text-danger">
      {message}
    </div>
  );
}

export function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="rounded-lg border border-calm/30 bg-calm/5 px-3.5 py-2.5 text-[13.5px] text-calm">
      {message}
    </div>
  );
}
