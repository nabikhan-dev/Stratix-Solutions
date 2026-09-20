import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/layout/SectionHeading";
import TierCards from "@/components/pricing/TierCards";
import FaqAccordion from "@/components/agency-landing/FaqAccordion";
import CinematicHeading from "@/components/layout/CinematicHeading";
import { pricingFaqs } from "@/data/content";
import { pageHeroes, sections } from "@/data/copy";

export const metadata: Metadata = {
  title: { absolute: "Pricing | Fixed-Price MVP Builds — Stratix Solution" },
  description:
    "MVPs from $5k, fixed price, shipped in 2–8 weeks. Pick a plan, lock the scope on a free call, and pay for outcomes — not hours.",
  alternates: { canonical: "/pricing" },
};


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow={pageHeroes.pricing.eyebrow}
        title={<CinematicHeading text={pageHeroes.pricing.title} as="h1" dark />}
        description={pageHeroes.pricing.description}
      />

      <section className="container-px bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              align="center"
              eyebrow={sections.pricingTiers.eyebrow}
              title={sections.pricingTiers.title}
              description={sections.pricingTiers.description}
            />

            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted">
                {sections.pricingTiers.rationale}
              </p>
            </Reveal>
          </div>

          <div className="mt-12">
            <TierCards />
          </div>
        </div>
      </section>

      <FaqAccordion
        items={pricingFaqs}
        eyebrow={sections.pricingFaq.eyebrow}
        title={sections.pricingFaq.title}
      />
    </>
  );
}
