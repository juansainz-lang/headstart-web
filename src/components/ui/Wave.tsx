// Soft wavy divider. Place it at the top of a section, in that section's color: it overlaps
// the section above, like a page being turned.
const fills = { cream: "fill-cream", navy: "fill-navy", "navy-deep": "fill-navy-deep" } as const;

export default function Wave({ tone, flip = false }: { tone: keyof typeof fills; flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 -translate-y-[99%] leading-[0] ${flip ? "-scale-x-100" : ""}`}
    >
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={`h-10 w-full md:h-16 ${fills[tone]}`}>
        <path d="M0,48 C180,80 360,16 560,32 C760,48 900,78 1100,56 C1260,38 1360,24 1440,30 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}
