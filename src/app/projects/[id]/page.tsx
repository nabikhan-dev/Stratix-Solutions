import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CircleCheckBig } from "lucide-react";
import { projects } from "@/data/projects";
import Reveal from "@/components/motion/Reveal";
import { STAGGER } from "@/lib/motion";

export function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id.toString(),
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-void flex flex-col">
      <div className="flex flex-col px-4 pt-28 pb-16 md:px-8 lg:px-40 lg:pt-36 lg:pb-24 gap-12 md:gap-16">

        {/* Back Link */}
        <div className="w-full">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to projects
          </Link>
        </div>

        {/* Hero Split Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            <div className="flex gap-2 flex-wrap">
              {project.tags.map(tag => (
                <div key={tag} className="text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full border border-line whitespace-nowrap">
                  {tag}
                </div>
              ))}
            </div>
            <h1 className="text-primary text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed mt-2 max-w-2xl">
              {project.description}
            </p>
          </div>

          {/* Right Main Image */}
          <div className="flex-1 w-full aspect-[16/10] relative rounded-2xl overflow-hidden border border-line">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Gallery Grid Section */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {project.gallery.map((img, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * STAGGER}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-line group"
                >
                  <Image
                    src={img}
                    alt={`${project.title} gallery image ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Results & Impact Section */}
        {project.results && project.results.length > 0 && (
          <Reveal className="w-full rounded-2xl border border-line p-6 md:p-12 flex flex-col gap-6 md:gap-8 mb-10">
            <h3 className="text-primary text-2xl md:text-3xl font-semibold tracking-[-0.04em]">
              Results & Impact
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {project.results.map((result, idx) => (
                <Reveal as="li" key={idx} delay={idx * STAGGER} className="flex items-start gap-3">
                  <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-signal" strokeWidth={2.5} />
                  <span className="text-muted font-medium text-base leading-relaxed">
                    {result}
                  </span>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        )}

      </div>
    </main>
  );
}
