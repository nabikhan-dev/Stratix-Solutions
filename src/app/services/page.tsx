import type { Metadata } from "next";
import ServiceSwitcher from "@/components/services/ServiceSwitcher";

import SectionHeading from "@/components/layout/SectionHeading";
import PageHero from "@/components/layout/PageHero";
import ClosingCta from "@/components/layout/ClosingCta";

import CinematicHeading from "@/components/layout/CinematicHeading";
import { pageHeroes, sections } from "@/data/copy";
import { listServices } from "@/lib/dashboard/store";

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

export default async function ServicesPage() {
  const services = (await listServices()).filter(s => s.isActive !== false);

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
            <ServiceSwitcher services={services} />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <ClosingCta
        title={sections.servicesClosingCta.title}
        description={sections.servicesClosingCta.description}
        cta={sections.servicesClosingCta.cta}
      />

    </div>
  );
}



