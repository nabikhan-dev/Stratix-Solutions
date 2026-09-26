import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import WorkPortfolio from "@/components/work/WorkPortfolio";
import TestimonialsSection from "@/components/agency-landing/TestimonialsSection";
import FullVisibilityTimeline from "@/components/work/FullVisibilityTimeline";
import WeekByWeek from "@/components/work/WeekByWeek";
import CinematicHeading from "@/components/layout/CinematicHeading";
import { pageHeroes } from "@/data/copy";
import { listProjects } from "@/lib/public-store";

export const metadata: Metadata = {
  title: "Our Work | Shipped Products & Results  Stratix Solution",
  description:
    "Real products, real numbers: AI platforms, mobile apps, fintech dashboards, and e-commerce builds  with daily git pushes and 90% on-time delivery.",
  keywords: [
    "product engineering case studies",
    "app development portfolio",
    "AI project case study",
    "MVP examples",
    "software project results",
  ],
};

export default async function WorkPage() {
  const projects = await listProjects();

  return (
    <div className="min-h-screen bg-surface">
      <main>
        {/* ── Hero ── */}
        <PageHero
          eyebrow={pageHeroes.work.eyebrow}
          title={<CinematicHeading text={pageHeroes.work.title} as="h1" dark />}
          description={pageHeroes.work.description}
        />

        <WorkPortfolio projects={projects} />
        <FullVisibilityTimeline />
        <WeekByWeek />

        <TestimonialsSection  />
      </main>
    </div>
  );
}
