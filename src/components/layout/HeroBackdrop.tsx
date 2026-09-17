"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DUR, enter } from "@/lib/motion";

/**
 * The hero panel's full backdrop: the rule grid, the violet bloom behind the
 * headline, the pulsing orbit arc with its blurred glow passes, the light
 * flare, and the star field. Shared by Home's HeroSection and PageHero.
 *
 * `arc` draws the glowing curve. Home's full-height panel has the room for
 * it; the shorter page mastheads set `arc={false}`, where the curve would cut
 * straight through the headline.
 */
export default function HeroBackdrop({ arc = true }: { arc?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="absolute inset-0 h-full w-full pointer-events-none "
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      <div className="absolute inset-x-0 top-0 z-0 flex justify-center">
        <div
          style={{
            width: "1300px",
            height: "700px",
            background:
              "radial-gradient(ellipse 60% 60% at 50% -10%, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.15) 40%, rgba(124,58,237,0) 80%)",
            filter: "blur(12px)",
            transform: "translateY(-40%)",
          }}
        />
      </div>

      {arc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={enter(0.2, DUR.slow)}
          className="absolute left-1/2 top-110 flex h-full w-full -translate-x-1/2 justify-center"
        >
          <div className="w-fit">
            <svg
              width="1951"
              height="1806"
              viewBox="0 0 1951 1806"
              fill="none"
              overflow="visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.g
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ filter: "drop-shadow(0 0 14px rgba(124,58,237,0.85))" }}
              >
                <path
                  d="M975.5 255C1402.88 255 1749 569.029 1749 956C1749 1342.97 1402.88 1657 975.5 1657C548.119 1657 202 1342.97 202 956C202 569.029 548.119 255 975.5 255Z"
                  stroke="url(#p0_hero)"
                  strokeWidth="4"
                />
                <path
                  opacity="0.4"
                  d="M975.5 253.5C1403.57 253.5 1750.5 568.065 1750.5 956C1750.5 1343.93 1403.57 1658.5 975.5 1658.5C547.432 1658.5 200.5 1343.93 200.5 956C200.5 568.065 547.432 253.5 975.5 253.5Z"
                  stroke="url(#p1_hero)"
                />
              </motion.g>
              <g style={{ filter: "blur(12px)", mixBlendMode: "plus-lighter" }}>
                <path
                  d="M975.5 255C1402.88 255 1749 569.029 1749 956C1749 1342.97 1402.88 1657 975.5 1657C548.119 1657 202 1342.97 202 956C202 569.029 548.119 255 975.5 255Z"
                  stroke="url(#p2_hero)"
                  strokeWidth="4"
                />
              </g>
              <g
                opacity="0.4"
                style={{ filter: "blur(30px)", mixBlendMode: "plus-lighter" }}
              >
                <path
                  d="M975.5 255C1398.3 255 1739 565.452 1739 946C1739 1326.55 1398.3 1637 975.5 1637C552.695 1637 212 1326.55 212 946C212 565.452 552.695 255 975.5 255Z"
                  stroke="url(#p3_hero)"
                  strokeWidth="24"
                />
              </g>
              <g
                opacity="0.4"
                style={{ filter: "blur(40px)", mixBlendMode: "plus-lighter" }}
              >
                <path
                  d="M975.5 255C1398.3 255 1739 565.452 1739 946C1739 1326.55 1398.3 1637 975.5 1637C552.695 1637 212 1326.55 212 946C212 565.452 552.695 255 975.5 255Z"
                  stroke="url(#p4_hero)"
                  strokeWidth="24"
                />
              </g>
              <g
                opacity="0.4"
                style={{ filter: "blur(100px)", mixBlendMode: "plus-lighter" }}
              >
                <path
                  d="M975.5 212C1398.3 212 1739 522.452 1739 903C1739 1283.55 1398.3 1594 975.5 1594C552.695 1594 212 1283.55 212 903C212 522.452 552.695 212 975.5 212Z"
                  stroke="url(#p5_hero)"
                  strokeWidth="24"
                />
              </g>
              <defs>
                <linearGradient
                  id="p0_hero"
                  x1="976"
                  y1="108.5"
                  x2="976"
                  y2="313.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="p1_hero"
                  x1="976"
                  y1="108.5"
                  x2="976"
                  y2="582"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="p2_hero"
                  x1="975.5"
                  y1="253"
                  x2="976"
                  y2="392"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="p3_hero"
                  x1="975.5"
                  y1="243"
                  x2="976"
                  y2="468.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="p4_hero"
                  x1="975.5"
                  y1="243"
                  x2="976"
                  y2="334"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="p5_hero"
                  x1="975.5"
                  y1="200"
                  x2="976"
                  y2="780.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={enter(0.4, DUR.slow)}
        className="absolute bottom-52 left-1/2 z-[5] flex h-full w-full -translate-x-1/2 justify-center"
      >
        <div className="w-fit">
          <svg
            width="1424"
            height="651"
            viewBox="0 0 1424 651"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              filter="url(#flare0_hero)"
              style={{ mixBlendMode: "plus-lighter" }}
            >
              <path
                d="M611.5 51L495 -188H959L849.5 51H611.5Z"
                fill="#7C3AED"
                fillOpacity="0.1"
              />
            </g>
            <g
              filter="url(#flare1_hero)"
              style={{ mixBlendMode: "plus-lighter" }}
            >
              <path
                d="M611.5 219L495 -188H959L849.5 219H611.5Z"
                fill="#7C3AED"
              />
            </g>
            <g
              filter="url(#flare2_hero)"
              style={{ mixBlendMode: "plus-lighter" }}
            >
              <path
                d="M656.49 43L568 -219H829L768.219 43H656.49Z"
                fill="#7C3AED"
                fillOpacity="0.8"
              />
            </g>
            <defs>
              <filter
                id="flare0_hero"
                x="-105"
                y="-788"
                width="1664"
                height="1439"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="300"
                  result="effect1_foregroundBlur"
                />
              </filter>
              <filter
                id="flare1_hero"
                x="95"
                y="-588"
                width="1264"
                height="1207"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="200"
                  result="effect1_foregroundBlur"
                />
              </filter>
              <filter
                id="flare2_hero"
                x="408"
                y="-379"
                width="581"
                height="582"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="80"
                  result="effect1_foregroundBlur"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </motion.div>

      <StarDots />
    </div>
  );
}

const STAR_POSITIONS = [
  { cx: 1, cy: 12, r: 1 },
  { cx: 122, cy: 113, r: 1 },
  { cx: 108, cy: 57, r: 1 },
  { cx: 510, cy: 96, r: 1 },
  { cx: 700, cy: 93, r: 1 },
  { cx: 625, cy: 126, r: 1 },
  { cx: 821, cy: 32, r: 1 },
  { cx: 203.5, cy: 157.5, r: 0.5 },
  { cx: 167.5, cy: 94.5, r: 0.5 },
  { cx: 76.5, cy: 81.5, r: 0.5 },
  { cx: 157.5, cy: 8.5, r: 0.5 },
  { cx: 240.5, cy: 80.5, r: 0.5 },
  { cx: 256.5, cy: 64.5, r: 0.5 },
  { cx: 273.5, cy: 84.5, r: 0.5 },
  { cx: 285.5, cy: 57.5, r: 0.5 },
  { cx: 227.5, cy: 114.5, r: 0.5 },
  { cx: 202.5, cy: 55.5, r: 0.5 },
  { cx: 156.5, cy: 65.5, r: 0.5 },
  { cx: 330.5, cy: 88.5, r: 0.5 },
  { cx: 363.5, cy: 102.5, r: 0.5 },
  { cx: 476.5, cy: 80.5, r: 0.5 },
  { cx: 438.5, cy: 107.5, r: 0.5 },
  { cx: 422.5, cy: 77.5, r: 0.5 },
  { cx: 455.5, cy: 56.5, r: 0.5 },
  { cx: 488.5, cy: 35.5, r: 0.5 },
  { cx: 313.5, cy: 66.5, r: 0.5 },
  { cx: 231.5, cy: 0.5, r: 0.5 },
  { cx: 270.5, cy: 108.5, r: 0.5 },
  { cx: 573, cy: 103, r: 0.5 },
  { cx: 501.5, cy: 150.5, r: 0.5 },
  { cx: 456.5, cy: 156.5, r: 0.5 },
  { cx: 659.5, cy: 77.5, r: 0.5 },
  { cx: 746, cy: 52, r: 0.5 },
  { cx: 591.5, cy: 1.5, r: 0.5 },
  { cx: 389, cy: 123, r: 1 },
  { cx: 40, cy: 72, r: 1 },
];

function StarDots() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={enter(0.6, DUR.slow)}
      className="absolute -bottom-10 left-1/2 z-0 flex h-full w-full -translate-x-1/2 justify-center"
    >
      <div className="w-fit">
        <svg
          width="822"
          height="158"
          viewBox="0 0 822 158"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {STAR_POSITIONS.map((s, i) => (
            <circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="white"
              opacity="0.2"
            />
          ))}
        </svg>
      </div>
    </motion.div>
  );
}
