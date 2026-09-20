import Reveal from "@/components/motion/Reveal";
import SectionCtaButton from "@/components/layout/SectionCtaButton";

/** The filled signal-purple card every marketing page closes on. */
export default function ClosingCta({
  title,
  description,
  closer,
  cta,
  className = "",
}: {
  title: string;
  description: string;
  /** Optional second line, set a touch heavier than the description. */
  closer?: string;
  cta: { href: string; label: string };
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="container-px mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-signal p-10 text-center sm:p-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="max-w-2xl text-lg text-white/80">{description}</p>
          </Reveal>

          {closer && (
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-lg font-medium text-white">{closer}</p>
            </Reveal>
          )}

          <Reveal delay={closer ? 0.15 : 0.1} className="mt-2">
            <SectionCtaButton href={cta.href} tone="inverse">
              {cta.label}
            </SectionCtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
