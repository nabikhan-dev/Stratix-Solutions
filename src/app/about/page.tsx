import type { Metadata } from "next";
import Image from "next/image";
import { CircleCheckBig } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import ClosingCta from "@/components/layout/ClosingCta";
import CinematicHeading from "@/components/layout/CinematicHeading";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import { STAGGER } from "@/lib/motion";
import { aboutPage, pageHeroes } from "@/data/copy";
import { getSettings } from "@/lib/dashboard/store";

export const metadata: Metadata = {
  // `absolute` keeps the root layout's "— Stratix Solutions" suffix off this
  // one, which would otherwise push the title well past the 60-char budget.
  title: {
    absolute: "About Us | Stratix Solution — Product Engineering Company",
  },
  description:
    "Founded in 2026. 10+ digital products shipped. Meet the product engineering team behind Stratix Solution — and how we work.",
  keywords: [
    "about Stratix Solution",
    "product engineering team",
    "software product partner",
  ],
};

export default async function AboutPage() {
  const settings = await getSettings();

  const stats = [
    { label: settings.stat1Label, value: settings.stat1Value, desc: settings.stat1Desc },
    { label: settings.stat2Label, value: settings.stat2Value, desc: settings.stat2Desc },
    { label: settings.stat3Label, value: settings.stat3Value, desc: settings.stat3Desc },
  ];

  return (
    <div className="text-primary min-h-screen pb-0 font-sans selection:bg-[var(--signal-soft)] overflow-hidden">
      <PageHero
        eyebrow={pageHeroes.about.eyebrow}
        title={<CinematicHeading text={pageHeroes.about.title} as="h1" dark />}
        description={pageHeroes.about.description}
      />

      {/* 2. Stats — light band, one continuous strip with hairline dividers instead of three equal cards */}
      <section className="py-16 sm:py-20">
        <div className="container-px w-full max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * STAGGER}
                className="flex flex-col gap-3 py-8 sm:px-10 sm:py-10 sm:first:pl-0 sm:last:pr-0"
              >
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-faint">{s.label}</span>
                <span className="font-display text-[56px] font-semibold leading-none tracking-tight text-primary sm:text-[64px] tabular-nums">
                  <CountUp value={s.value} />
                </span>
                <p className="max-w-[28ch] text-[14px] leading-relaxed text-muted">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <section className="pb-16 md:pb-20">
        <div className="container-px w-full max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-20 items-center">
            <Reveal className="w-full md:w-5/12 aspect-[4/3] relative rounded-2xl overflow-hidden border border-line">
              <Image
                src={aboutPage.mission.image}
                alt={aboutPage.mission.imageAlt}
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </Reveal>

            <Reveal delay={STAGGER} className="w-full md:w-7/12 flex flex-col justify-center">
              <span className="mb-4  font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal">
                {aboutPage.mission.eyebrow}
              </span>
              <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] mb-6  text-primary">
                {aboutPage.mission.title}
              </h2>
              <p className="text-[16px] md:text-[18px] text-muted leading-relaxed mb-8 ">
                {aboutPage.mission.body}
              </p>

              <ul className="space-y-6">
                {aboutPage.mission.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-4">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-signal md:mt-3" />
                    <span className="text-[16px] leading-7 text-muted md:text-[18px] md:leading-8">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>


      {aboutPage.features.map((feature, i) => {
        const dark = i % 2 === 0;
        return (
          <section key={feature.id} className={`py-16 md:py-20 ${dark ? "bg-dark" : ""}`}>
            <div className="container-px w-full max-w-[1600px] mx-auto">
              <div
                className={`flex flex-col gap-12 lg:gap-20  ${
                  dark ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <Reveal
                  className={`w-full md:w-5/12 aspect-[4/3] relative rounded-2xl overflow-hidden border ${
                    dark ? "border-white/10" : "border-line"
                  }`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    sizes="(min-width: 768px) 42vw, 100vw"
                    className="object-cover"
                  />
                </Reveal>

                <Reveal delay={STAGGER} className="w-full md:w-7/12 flex flex-col justify-center">
                  <span className="mb-4  font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal">
                    {feature.eyebrow}
                  </span>
                  <h3
                    className={`text-[32px] md:text-[44px] font-semibold tracking-[-0.04em] mb-5  ${
                      dark ? "text-white" : "text-primary"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-[16px] md:text-[18px] leading-relaxed mb-8 max-w-xl  ${
                      dark ? "text-white/60" : "text-muted"
                    }`}
                  >
                    {feature.body}
                  </p>

                  <ul className="space-y-6">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-start gap-4">
                        <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-signal" strokeWidth={2.5} />
                        <span
                          className={`text-[16px] font-medium leading-6 ${
                            dark ? "text-white" : "text-primary"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* Vision + closing CTA — same card the Services page closes on. */}
      <ClosingCta
        title={aboutPage.closingCta.title}
        description={aboutPage.closingCta.description}
        closer={aboutPage.closingCta.closer}
        cta={aboutPage.closingCta.cta}
      />
    </div>
  );
}
