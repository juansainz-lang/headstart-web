import { colors } from "@/lib/brand";

// Headstart mark: an "H" built from data blocks, with one copper block
// out ahead of the rest — the one that gets there first.
// Geometry is shared with app/icon.svg and app/apple-icon.tsx (32-unit grid).
export const MARK = {
  size: 6.5,
  radius: 1.6,
  blocks: [
    [4, 11],
    [4, 19.5],
    [12.75, 19.5],
    [21.5, 11],
    [21.5, 19.5],
  ] as const,
  ahead: [21.5, 2.5] as const,
};

// Blocks use currentColor (cream on dark, ink on light); the block ahead is always copper.
export function LogoMark({ className = "" }: { className?: string }) {
  const { size, radius } = MARK;
  return (
    <svg viewBox="0 0 32 32" className={`shrink-0 overflow-visible ${className}`} aria-hidden>
      {MARK.blocks.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={size}
          height={size}
          rx={radius}
          fill="currentColor"
          className="logo-block"
          style={{ animationDelay: `${0.1 + i * 0.06}s` }}
        />
      ))}
      <rect x={MARK.ahead[0]} y={MARK.ahead[1]} width={size} height={size} rx={radius} fill={colors.copper} className="logo-ahead" />
    </svg>
  );
}

// Mark + "Headstart". Wrap in a `group` element to get the hover motion.
export default function Logo({ className = "", textClassName = "" }: { className?: string; textClassName?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-8" />
      <span className={`text-[1.08rem] leading-none tracking-[-0.02em] whitespace-nowrap sm:text-[1.22rem] ${textClassName}`}>
        <span className="font-bold">Headstart</span>
      </span>
    </span>
  );
}
