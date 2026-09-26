import type { Metadata } from "next";

import HeroSection from "@/components/agency-landing/HeroSection";
import TechStackSection from "@/components/agency-landing/TechStackSection";

import ServicesSection from "@/components/agency-landing/ServicesSection";
import ProjectsPortfolio from "@/components/agency-landing/ProjectsPortfolio";
import ProcessOverview from "@/components/agency-landing/ProcessOverview";
import { listProjects, listServices } from "@/lib/public-store";

import TestimonialsSection from "@/components/agency-landing/TestimonialsSection";

import PricingPlans from "@/components/pricing/PricingPlans";
import FaqAccordion from "@/components/agency-landing/FaqAccordion";

export const metadata: Metadata = {
  title: "Stratix Solutions | Product Engineering Company",
  description:
    "A product engineering company that ships AI tools, mobile apps & web platforms at a fixed price. Weekly demos, scoped milestones, 90% on-time delivery. Book a free call.",
};

export default async function Home() {
  const projects = await listProjects();
  const services = (await listServices()).filter(s => s.isActive !== false);

  return (
    <div className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] font-sans selection:bg-[var(--signal-soft)]">
      <main>
        <HeroSection />
        <ServicesSection services={services} />
        <TechStackSection />
        <ProjectsPortfolio projects={projects} />
        <ProcessOverview />
        <TestimonialsSection />
        <PricingPlans />
        <FaqAccordion />
      </main>
    </div>
  );
}
