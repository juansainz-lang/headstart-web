"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import type { Content } from "@/lib/content";
import { ease } from "@/lib/motion";
import { CheckIcon } from "@/components/ui/Check";
import { Reveal } from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Swipe from "@/components/ui/Swipe";
import Wave from "@/components/ui/Wave";

// Industries: one example per industry (pick one), then what every industry asks for most.
export default function Industries({ t }: { t: Content["industries"] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const item = t.items[active];

  return (
    <section id="industries" className="dot-grid-dark relative scroll-mt-16 bg-navy-deep py-20 text-cream md:py-32">
      <Wave tone="navy-deep" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader dark label={t.label} lines={t.lines} highlight={t.highlight} intro={t.intro} />

        <Reveal className="mt-10">
          <div role="tablist" aria-label={t.pick} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {t.items.map((x, i) => {
              const on = i === active;
              return (
                <button
                  key={x.id}
                  role="tab"
                  id={`ind-tab-${x.id}`}
                  aria-selected={on}
                  aria-controls="ind-panel"
                  onClick={() => setActive(i)}
                  className={`relative min-h-11 shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                    on ? "border-copper bg-copper text-white" : "border-cream/15 text-cream/75 hover:border-cream/40 hover:text-cream"
                  }`}
                >
                  {x.name}
                </button>
              );
            })}
          </div>

          <div
            id="ind-panel"
            role="tabpanel"
            aria-labelledby={`ind-tab-${item.id}`}
            className="mt-5 min-h-[9.5rem] rounded-[2rem] border border-cream/12 bg-gradient-to-br from-navy to-navy-deep p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              <m.div
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                <p className="label text-[0.6rem] text-cream/50">{item.sub}</p>
                <p className="mt-3 max-w-3xl font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-snug font-bold tracking-tight">
                  <span className="text-copper-light">→ </span>
                  {item.example}
                </p>
              </m.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20">
          <p className="label mb-6 text-copper-light">{t.popularLabel}</p>
          <Swipe dots="dark" className="md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {t.popular.map(([title, body], i) => (
              <li key={title} className="w-[84%] shrink-0 md:w-auto">
                <Reveal
                  delay={(i % 3) * 0.08}
                  className="flex h-full flex-col rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 transition-colors duration-300 hover:border-copper/50"
                >
                  <p className="flex items-start gap-2 font-display text-lg font-bold tracking-tight">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-copper-light" />
                    {title}
                  </p>
                  <p className="mt-2 text-[0.95rem] text-cream/65">{body}</p>
                </Reveal>
              </li>
            ))}
          </Swipe>
        </div>
      </div>
    </section>
  );
}
