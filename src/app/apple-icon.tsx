import { ImageResponse } from "next/og";
import { colors } from "@/lib/brand";
import { MARK } from "@/components/ui/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as the site logo (see components/ui/Logo.tsx), as a PNG for iOS home screens.
// Also the logo image in the team's email signatures: keep this URL (/apple-icon) working.
export default function AppleIcon() {
  const { size: s, radius: r } = MARK;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: colors.navy }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <g transform="translate(16 16) scale(0.74) translate(-16 -14.25)">
            {MARK.blocks.map(([x, y], i) => (
              <rect key={i} x={x} y={y} width={s} height={s} rx={r} fill={colors.cream} />
            ))}
            <rect x={MARK.ahead[0]} y={MARK.ahead[1]} width={s} height={s} rx={r} fill={colors.copper} />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
