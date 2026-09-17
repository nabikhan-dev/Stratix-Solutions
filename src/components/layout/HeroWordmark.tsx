
/**
 * The oversized, near-invisible wordmark on the hero panel's bottom edge — a
 * left-to-right white fade clipped to the text. Home signs off with the
 * company name, every other page with its own name.
 */
export default function HeroWordmark({ text = "STRATIX SOLUTIONS" }: { text?: string }) {
  return (
    <div className="relative h-20 sm:h-32 md:h-48 lg:h-64">
      <p
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2
          whitespace-nowrap
          text-center
          font-semibold
          leading-none
          -tracking-[0.04em]
          select-none
          bg-gradient-to-r
          from-white/10
          via-white/5
          to-transparent
          bg-clip-text
          text-transparent
          text-[70px]
          sm:text-[100px]
          md:text-[140px]
          lg:text-[160px]
        "
      >
        {text}
      </p>
    </div>
  );
}
