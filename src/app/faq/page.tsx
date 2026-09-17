import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import FaqAccordion from "@/components/agency-landing/FaqAccordion";
import CinematicHeading from "@/components/layout/CinematicHeading";
import { pageHeroes } from "@/data/copy";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about timelines, pricing, technology, and how Stratix Solutions works.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow={pageHeroes.faq.eyebrow}
        title={<CinematicHeading text={pageHeroes.faq.title} as="h1" dark />}
        description={pageHeroes.faq.description}
      />
      <FaqAccordion showHeading={false} />
    </>
  );
}
