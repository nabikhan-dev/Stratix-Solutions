import Reveal from "@/components/motion/Reveal";
import { STAGGER } from "@/lib/motion";

/**
 * Shared section masthead. The stack rises into place as the section arrives —
 * eyebrow, then title, then description, each a beat behind the last.
 * `eyebrow` is the small mono label above the title — 14px, signal-purple, on
 * both light and dark bands.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <Reveal>
          <span className="block font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={STAGGER}>
        <h2
          className={`text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl ${
            eyebrow ? "mt-3" : ""
          } ${dark ? "text-white" : "text-primary"}`}
        >
{title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={STAGGER * 2}>
          <p className={`mt-4 text-pretty text-base leading-8 ${dark ? "text-white/60" : "text-muted"}`}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
