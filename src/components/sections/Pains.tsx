import type { Content } from "@/lib/content";
import TimeCalculator from "@/components/demos/TimeCalculator";
import { Reveal } from "@/components/ui/Reveal";
import Safe from "@/components/ui/Safe";
import SectionHeader from "@/components/ui/SectionHeader";
import Swipe from "@/components/ui/Swipe";

// "Sound familiar?": three everyday pains any company recognises, then the hours they cost
// (the calculator, built only from the visitor's own numbers).
export default function Pains({ t, calc }: { t: Content["pains"]; calc: Content["calc"] }) {
  return (
    <section id="pains" className="dot-grid relative scroll-mt-16 bg-cream pt-16 pb-20 md:pt-28 md:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader label={t.label} lines={t.lines} highlight={t.highlight} titleClassName="text-[clamp(2.6rem,6vw,5.2rem)]" />
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg text-ink/65 md:text-xl">{t.sub}</p>
        </Reveal>

        <div className="mt-10 md:mt-12">
          <Swipe as="ol" className="md:grid-cols-3 md:gap-4">
            {t.items.map(([title, body], i) => (
              <li key={title} className="w-[84%] shrink-0 md:w-auto">
                <Reveal delay={i * 0.08} className="h-full rounded-3xl border border-ink/10 bg-white/70 p-6 md:p-7">
                  <span className="label text-[0.62rem] text-wine">0{i + 1}</span>
                  <p className="mt-4 font-display text-[1.35rem] leading-snug font-bold tracking-tight">{title}</p>
                  <p className="mt-3 text-ink/60">{body}</p>
                </Reveal>
              </li>
            ))}
          </Swipe>
        </div>

        <Reveal className="mt-12 md:mt-20">
          <p className="mb-6 font-display text-2xl font-bold tracking-tight md:text-3xl">{t.calcLead}</p>
          <Safe>
            <TimeCalculator t={calc} />
          </Safe>
        </Reveal>
      </div>
    </section>
  );
}
