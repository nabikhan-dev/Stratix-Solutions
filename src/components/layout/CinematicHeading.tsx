import { useId } from "react";

export default function CinematicHeading({
  text,
  dark = false,
  as = "h1",
}: {
  text: string;
  dark?: boolean;
  as?: "h1" | "span";
}) {
  const words = text.split(" ");

  // Calculate stagger timing
  const totalChars = text.replace(/ /g, "").length;
  const PER_CHAR_DELAY = 2.6 / totalChars;
  const FILL_DURATION  = 0.85;
  const START_DELAY    = 0.2;

  let charIndex = 0;

  // Unique per instance so two headings on the same page never fight over
  // the same @keyframes name.
  const animationName = `charReveal-${useId().replace(/:/g, "")}`;
  // rgb(255,255,255) on dark surfaces, or the theme's --text-primary (#111827) on light ones.
  const rgb = dark ? "255, 255, 255" : "17, 24, 39";
  const Tag = as;

  return (
    <>
      <style>{`
        @keyframes ${animationName} {
          0%   { opacity: 1; -webkit-text-stroke-color: rgba(${rgb}, 0.65); color: transparent; }
          45%  { -webkit-text-stroke-color: rgba(${rgb}, 0.3); color: rgba(${rgb}, 0.35); }
          100% { -webkit-text-stroke-color: transparent; color: rgba(${rgb}, 1); }
        }
      `}</style>

      <Tag
        className={
          as === "h1"
            ? `mx-auto mt-8 max-w-6xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] ${dark ? "text-white" : "text-primary"} sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl`
            : undefined
        }
        aria-label={text}
      >
        {words.map((word, wi) => {
          const wordEl = (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((char) => {
                const delay = START_DELAY + charIndex * PER_CHAR_DELAY;
                charIndex++;
                return (
                  <span
                    key={charIndex}
                    aria-hidden="true"
                    style={{
                      display: "inline-block",
                      color: "transparent",
                      WebkitTextStroke: `1px rgba(${rgb}, 0.65)`,
                      animation: `${animationName} ${FILL_DURATION}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both`,
                    } as React.CSSProperties}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
          return wi < words.length - 1
            ? [wordEl, <span key={`sp-${wi}`} aria-hidden="true">&nbsp;</span>]
            : wordEl;
        })}
      </Tag>
    </>
  );
}
