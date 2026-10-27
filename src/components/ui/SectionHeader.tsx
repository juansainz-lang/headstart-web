import { Reveal, RevealLines } from "@/components/ui/Reveal";

// How every section opens: a small label, a big headline revealed line by line (one word
// in copper) and an optional intro. `dark` is for navy sections.
export default function SectionHeader({
  label,
  lines,
  highlight,
  intro,
  dark = false,
  titleClassName = "max-w-4xl text-[clamp(2.3rem,5.5vw,4.6rem)]",
}: {
  label: string;
  lines: string[];
  highlight?: string;
  intro?: string;
  dark?: boolean;
  titleClassName?: string;
}) {
  return (
    <>
      <p className={`label mb-4 ${dark ? "text-cream/55" : "text-ink/55"}`}>{label}</p>
      <RevealLines className={`display ${titleClassName}`} lines={lines} highlight={highlight} />
      {intro && (
        <Reveal delay={0.1}>
          <p className={`mt-6 max-w-2xl text-lg ${dark ? "text-cream/65" : "text-ink/65"}`}>{intro}</p>
        </Reveal>
      )}
    </>
  );
}
