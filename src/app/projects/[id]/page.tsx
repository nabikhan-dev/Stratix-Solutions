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
    <article className="relative overflow-hidden pt-36 pb-16 sm:pt-44">
      <div className="container-px relative z-10 mx-auto w-full max-w-[1440px]">
        <div className="max-w-5xl">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to projects
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={
                    index === 0
                      ? "inline-flex items-center rounded-full bg-signal px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                      : "inline-flex items-center rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-primary"
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-primary sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-4xl text-pretty text-lg leading-8 text-muted">
              {project.description}
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.25}>
        <div className="container-px mx-auto mt-12 w-full max-w-[1440px]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] border border-line shadow-xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1440px) 1248px, 90vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>

      {project.gallery && project.gallery.length > 0 && (
        <div className="container-px relative z-10 mx-auto mt-16 w-full max-w-[1440px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.gallery.map((img, idx) => (
              <Reveal
                key={idx}
                delay={idx * STAGGER}
                className="group relative aspect-video overflow-hidden rounded-[20px] border border-line"
              >
                <Image
                  src={img}
                  alt={`${project.title} gallery image ${idx + 1}`}
                  fill
                  sizes="(min-width: 1440px) 612px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {project.results && project.results.length > 0 && (
        <div className="container-px relative z-10 mx-auto mt-16 w-full max-w-[1440px]">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div>
                <h2 className="mb-5 text-2xl font-semibold tracking-[-0.03em] text-primary">
                  Results &amp; Impact
                </h2>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                  {project.results.map((result, idx) => (
                    <Reveal as="li" key={idx} delay={idx * STAGGER} className="flex items-start gap-3">
                      <CircleCheckBig className="mt-1 h-5 w-5 shrink-0 text-signal" strokeWidth={2.5} />
                      <span className="text-[17px] leading-8 text-muted">
                        {result}
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      )}
    </article>
  );
}
