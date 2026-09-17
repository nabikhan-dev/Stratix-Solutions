"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { RISE, STAGGER, VIEWPORT, enter } from "@/lib/motion";
import { sections } from "@/data/copy";

/** `dark` swaps the section onto `--bg-dark` — used wherever a page's light/dark section rhythm needs this block on the dark beat. */
export default function TestimonialsSection({ dark = false }: { dark?: boolean }) {
  const testimonials = [
    {
      quote: "The speed and quality of delivery are unmatched. They didn't just build a website, they built a scalable product foundation that our internal team now uses every day.",
      author: "Sarah Jenkins",
      role: "CTO at Creme Digital",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop"
    },
    {
      quote: "Working with this team felt like having an elite engineering squad in-house. No hand-holding required. They understood our complex requirements immediately and shipped weeks ahead of schedule.",
      author: "David Chen",
      role: "Founder, Acme AI",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&auto=format&fit=crop"
    },
    {
      quote: "Our conversion rate doubled after the redesign. The attention to detail in the micro-interactions and animations sets our brand apart from every competitor in the space.",
      author: "Elena Rodriguez",
      role: "VP of Marketing, FlowState",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop"
    },
    {
      quote: "I've worked with dozens of agencies over the years. This is the first time I've experienced zero pushback on revisions and true pixel-perfect implementation of Figma designs.",
      author: "Marcus Thorne",
      role: "Product Lead, Quantum",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop"
    },
    {
      quote: "They took our messy MVP and turned it into an enterprise-ready platform. The architecture choices they made saved us months of technical debt.",
      author: "James Wilson",
      role: "CEO, DataStream",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop"
    },
    {
      quote: "The most seamless agency experience I've ever had. Transparent pricing, clear timelines, and the final result exceeded our extremely high expectations.",
      author: "Priya Patel",
      role: "Head of Design, Vertex",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&auto=format&fit=crop"
    }
  ];

  // Duplicate for infinite scroll
  const scrollItems = [...testimonials, ...testimonials];

  const bg = dark ? "bg-dark" : "bg-[var(--bg-void)]";
  const ink = dark ? "text-white" : "text-[var(--text-primary)]";
  const inkMuted = dark ? "text-white/50" : "text-[var(--text-muted)]";
  const line = dark ? "border-white/10" : "border-[var(--line)]";
  const lineStrong = dark ? "hover:border-white/20" : "hover:border-line-strong";
  const cardBg = dark ? "bg-white/[0.03]" : "bg-surface";
  const fadeFrom = dark ? "from-dark" : "from-[var(--bg-void)]";

  return (
    <section id="testimonials" className={`py-20 ${bg} ${ink} border-y ${line} overflow-hidden relative`}>
      {/* Gradients to fade edges */}
      <div className={`absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r ${fadeFrom} to-transparent z-20 pointer-events-none`} />
      <div className={`absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l ${fadeFrom} to-transparent z-20 pointer-events-none`} />

      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 relative z-10 mb-10">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: RISE.sm }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            className="mb-4 block font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal"
          >
            {sections.homeTestimonials.eyebrow}
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: RISE.base }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={enter(STAGGER)}
            className={`text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] ${ink} relative z-10 mb-6`}
          >
{sections.homeTestimonials.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: RISE.base }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={enter(STAGGER * 2)}
            className={`text-[18px] ${inkMuted} max-w-2xl`}
          >
            {sections.homeTestimonials.description}
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: RISE.base }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={enter(STAGGER * 3)}
        className="flex whitespace-nowrap [&:hover_.marquee-track]:[animation-play-state:paused]"
      >
        <div
          className="marquee-track flex w-max gap-5 px-4"
          style={{ animation: "testimonial-marquee 90s linear infinite" }}
        >
          {scrollItems.map((testimonial, idx) => (
            <div
              key={idx}
              className={`relative flex w-[420px] flex-col gap-7 whitespace-normal rounded-2xl border ${line} ${cardBg} p-9 transition-colors duration-300 ${lineStrong}`}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${dark ? "fill-white/80 text-white/80" : "fill-yellow-400 text-yellow-400"}`} />
                ))}
              </div>

              <p className={`text-[15px] ${ink} leading-relaxed font-medium`}>
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="flex items-center gap-3.5 mt-auto pt-1">
                <div className={`relative w-10 h-10 rounded-full overflow-hidden border ${line}`}>
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className={`${ink} font-semibold text-[14px]`}>{testimonial.author}</p>
                  <p className={`text-[12px] ${inkMuted}`}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes testimonial-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
