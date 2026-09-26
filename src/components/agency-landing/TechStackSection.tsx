"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RISE, STAGGER, VIEWPORT, enter } from "@/lib/motion";
import { publicPath } from "@/lib/public-path";
import { sections } from "@/data/copy";

type Tech = {
  name: string;
  icon: string;
  ai?: boolean;
  invert?: boolean;
};

const ROW_1: Tech[] = [
  { name: "Next.js", icon: "/icons/nextjs_icon_dark.svg" },
  { name: "React", icon: "/icons/react_light.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  { name: "HTML5", icon: "/icons/html5.svg" },
  { name: "CSS3", icon: "/icons/css_old.svg" },
  { name: "Sass", icon: "/icons/sass.svg" },
  { name: "Bootstrap", icon: "/icons/bootstrap.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "Python", icon: "/icons/python.svg" },
  { name: "Git", icon: "/icons/git.svg" },
  { name: "GitHub", icon: "/icons/github_light.svg", invert: true },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "AWS", icon: "/icons/aws_light.svg", invert: true },
  { name: "Cloudflare", icon: "/icons/cloudflare.svg" },
  { name: "Figma", icon: "/icons/figma.svg" },
  { name: "LottieFiles", icon: "/icons/lottiefiles.svg" },
];

const ROW_2: Tech[] = [
  { name: "OpenAI", icon: "/icons/openai.svg", ai: true, invert: true },
  { name: "Claude", icon: "/icons/claude-ai-icon.svg", ai: true },
  { name: "Gemini", icon: "/icons/gemini.svg", ai: true },
  { name: "Antigravity", icon: "/icons/antigravity.svg", ai: true },
  { name: "TensorFlow", icon: "/icons/tensorflow-icon-light.svg", ai: true },
  { name: "Supabase", icon: "/icons/supabase.svg" },
  { name: "Firebase", icon: "/icons/firebase.svg" },
  { name: "Firebase Studio", icon: "/icons/firebase-studio.svg" },
  { name: "Appwrite", icon: "/icons/appwrite.svg" },
  { name: "MongoDB", icon: "/icons/mongodb-icon-light.svg", invert: true },
  { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
  { name: "Clerk", icon: "/icons/clerk-icon-light.svg" },
  { name: "Dotenvx", icon: "/icons/dotenvx.svg" },
  { name: "Google Maps", icon: "/icons/googleMaps.svg" },
  { name: "Android", icon: "/icons/android-icon.svg" },
  { name: "App Store", icon: "/icons/appstore.svg" },
  { name: "Google Play", icon: "/icons/googleplay.svg" },
  { name: "WordPress", icon: "/icons/wordpress.svg" },
];

/* ─── TechPill ─── */
function TechPill({ name, icon, ai, invert }: Tech) {
  return (
    <div
      className="inline-flex items-center gap-2.5 shrink-0 border border-white/10 bg-white/[0.04]"
      style={{
        borderRadius: "100px",
        padding: "10px 18px",
        userSelect: "none",
      }}
    >
      <Image
        src={publicPath(icon)}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 shrink-0 object-contain"
        style={invert ? { filter: "brightness(0) invert(1)" } : undefined}
        draggable={false}
      />
      <span
        className="text-white"
        style={{
          fontSize: "14px",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
      {ai && (
        <span
          className="border border-white/10 bg-white/[0.06] text-white/50"
          style={{
            fontSize: "10px",
            fontWeight: 600,
            borderRadius: "100px",
            padding: "1px 7px",
            letterSpacing: "0.05em",
          }}
        >
          AI
        </span>
      )}
    </div>
  );
}

/* ─── Marquee Row — pure CSS animation ─── */
function MarqueeRow({
  items,
  direction,
  speed = 40,
}: {
  items: Tech[];
  direction: "left" | "right";
  speed?: number;
}) {
  // Duplicate items to create seamless loop
  const doubled = [...items, ...items, ...items];
  const duration = (items.length * speed) / 10;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black , black , transparent 100%)",
      }}
    >
      <div
        data-marquee
        className="flex gap-3"
        style={{
          width: "max-content",
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <TechPill key={`${item.name}-${i}`} {...item} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Main Component ─── */
export default function TechStackSection() {
  return (
    <div className="p-2">

    <section id="tech-stack" className="relative overflow-hidden bg-dark rounded-2xl" style={{ padding: "80px 0" }}>
   
      <motion.div
        initial={{ opacity: 0, y: RISE.base }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={enter()}
        className="text-center mb-14 px-6 relative z-10"
        >
        <span className="mb-4 block font-mono text-[14px] font-medium uppercase tracking-[0.2em] text-signal">{sections.homeTech.eyebrow}</span>
        <h2
          className="font-semibold tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.1 }}
          >
{sections.homeTech.title}
        </h2>
        <p
          className="mt-4 text-white/50 mx-auto"
          style={{ fontSize: "15px", maxWidth: "480px", lineHeight: 1.7 }}
          >
          {sections.homeTech.description}
        </p>
      </motion.div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0, y: RISE.base }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={enter(STAGGER * 2)}
        className="flex flex-col gap-4 relative z-10 [&:hover_[data-marquee]]:[animation-play-state:paused]"
      >
        {/* Row 1 — left → right */}
        <MarqueeRow items={ROW_1} direction="left" speed={45} />
        {/* Row 2 — right → left */}
        <MarqueeRow items={ROW_2} direction="right" speed={40} />
      </motion.div>
    </section>
          </div>
  );
}
