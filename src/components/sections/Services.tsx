import type { Content } from "@/lib/content";
import { CheckIcon } from "@/components/ui/Check";
import { Reveal } from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Swipe from "@/components/ui/Swipe";
import Wave from "@/components/ui/Wave";

// The four services in plain language (technical name small underneath), then the promise.
export default function Services({ t }: { t: Content["services"] }) {
  return (
    <section id="services" className="dot-grid-dark relative scroll-mt-16 bg-navy py-20 text-cream md:py-32">
      <Wave tone="navy" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader dark label={t.label} lines={t.lines} highlight={t.highlight} intro={t.intro} />

        <div className="mt-10 md:mt-14">
          <Swipe as="div" dots="dark" className="md:grid-cols-2 md:gap-5 xl:grid-cols-4">
            {t.cards.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.1} className="h-full w-[84%] shrink-0 md:w-auto">
                <SpotlightCard
                  id={`svc-${s.id}`}
                  className="flex h-full flex-col rounded-3xl border border-cream/12 bg-cream/[0.04] p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-copper/60 md:p-8"
                >
                  <p className="label text-copper-light">{s.n}</p>
                  <h3 className="mt-6 font-display text-[1.55rem] leading-tight font-bold tracking-tight">{s.name}</h3>
                  <p className="label mt-2 text-[0.58rem] text-cream/40">{s.tech}</p>
                  <p className="mt-4 text-cream/70">{s.pitch}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </Swipe>
        </div>

        <Reveal>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {t.promise.map((p) => (
              <li key={p} className="flex items-center gap-2.5 font-display text-lg font-bold">
                <CheckIcon className="size-5 text-copper-light" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
