import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionCtaButton from "@/components/layout/SectionCtaButton";
import TierCards from "@/components/pricing/TierCards";
import { sections } from "@/data/copy";
import { listPricingTiers } from "@/lib/dashboard/store";

export default async function PricingPlans() {
  const tiers = await listPricingTiers();

  return (
    <section id="pricing" className="bg-surface py-16 sm:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        <SectionHeading
          align="center"
          eyebrow={sections.homePricing.eyebrow}
          title={sections.homePricing.title}
          description={sections.homePricing.description}
        />

        <div className="mt-10">
          <TierCards tiers={tiers} />
        </div>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <SectionCtaButton href="/pricing">See full pricing</SectionCtaButton>
        </Reveal>
      </div>
    </section>
  );
}
