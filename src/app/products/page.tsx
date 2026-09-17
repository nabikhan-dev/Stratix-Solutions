import type { Metadata } from "next";
import { BrainCircuit, Paintbrush, Smartphone, Globe } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/layout/SectionHeading";
import SupportingServices from "@/components/products/SupportingServices";

import { primaryServices } from "@/data/content";
import { pageHeroes, sections } from "@/data/copy";

export const metadata: Metadata = {
  title: "Solutions",
  description: "AI development, UI/UX design, app development, and web development solutions from Stratix Solutions.",
};

const icons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  ai: BrainCircuit,
  uiux: Paintbrush,
  app: Smartphone,
  web: Globe,
};

export default function ProductsPage() {
  const featured = primaryServices.find((s) => s.id === "ai") ?? primaryServices[0];
  const supporting = primaryServices.filter((s) => s.id !== featured.id);
  const FeaturedIcon = icons[featured.id] ?? Globe;

  return (
    <>
      <PageHero
        eyebrow={pageHeroes.products.eyebrow}
        title={
          <>
            {pageHeroes.products.title}{" "}
            <span className="text-signal">{pageHeroes.products.titleAccent}</span>
          </>
        }
        description={pageHeroes.products.description}
      />

      <section className="py-16 sm:py-20">
        <div className="container-px mx-auto max-w-[1400px]">
          <SectionHeading
            align="center"
            eyebrow={sections.productsGrid.eyebrow}
            title={sections.productsGrid.title}
            description={sections.productsGrid.description}
          />

          {/* Featured service — the flagship, most "AI" offering gets its own row */}
          <Reveal>
            <article className="group relative mt-12 overflow-hidden rounded-2xl border border-signal/30 bg-signal/[0.05] p-8 transition-shadow duration-500 hover:shadow-xl hover:shadow-signal/[0.1] sm:p-10 lg:p-12">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, var(--signal) 0%, transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-void transition-all duration-500 group-hover:scale-105 group-hover:border-signal group-hover:bg-signal">
                      <FeaturedIcon className="h-5 w-5 text-signal transition-colors duration-500 group-hover:text-white" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-xs text-faint">{featured.number} · Featured</span>
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-0.04em] leading-tight text-primary transition-colors duration-300 group-hover:text-signal sm:text-4xl">
                    {featured.title}
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-[16px] leading-relaxed text-muted">{featured.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.motifWords.map((word) => (
                      <span key={word} className="rounded-full border border-line-strong px-3 py-1 text-xs text-muted">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Supporting services — tighter, smaller row underneath */}
          <SupportingServices services={supporting} />
        </div>
      </section>
    </>
  );
}
