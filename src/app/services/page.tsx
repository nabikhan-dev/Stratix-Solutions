import type { Metadata } from "next";
import ServiceSwitcher from "@/components/services/ServiceSwitcher";

import SectionHeading from "@/components/layout/SectionHeading";
import PageHero from "@/components/layout/PageHero";
import SectionCtaButton from "@/components/layout/SectionCtaButton";
import Reveal from "@/components/motion/Reveal";

import CinematicHeading from "@/components/layout/CinematicHeading";
import { pageHeroes, sections } from "@/data/copy";

export const metadata: Metadata = {
  title: "Services | AI, App, Web & UI/UX  Stratix Solution",
  description:
    "AI development, UI/UX design, mobile apps, and web platforms  delivered by one product engineering team with scoped milestones and weekly demos.",
  keywords: [
    "AI development services",
    "UI/UX design services",
    "mobile app development services",
    "web development services",
    "product engineering services",
  ],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow={pageHeroes.services.eyebrow}
        title={<CinematicHeading text={pageHeroes.services.title} as="h1" dark />}
        description={pageHeroes.services.description}
        
      />

      <section className="py-16 sm:py-20">
        <div className="container-px mx-auto max-w-[1400px]">
          <SectionHeading
            align="center"
            eyebrow={sections.servicesDisciplines.eyebrow}
            title={sections.servicesDisciplines.title}
            description={sections.servicesDisciplines.description}
          />
          <div className="mt-12">
            <ServiceSwitcher />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 sm:py-24">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="glass flex flex-col items-center gap-4 rounded-3xl p-10 text-center sm:p-16">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-primary">
                {sections.servicesClosingCta.title}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="max-w-2xl text-muted text-lg">
                {sections.servicesClosingCta.description}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-2">
              <SectionCtaButton href={sections.servicesClosingCta.cta.href}>
                {sections.servicesClosingCta.cta.label}
              </SectionCtaButton>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}



