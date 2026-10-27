"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { Content } from "@/lib/content";
import { ease } from "@/lib/motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Wave from "@/components/ui/Wave";

// Three steps on a timeline that fills with copper as you scroll (vertical on phones).
export default function HowItWorks({ t }: { t: Content["how"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="how" className="dot-grid-dark relative scroll-mt-16 bg-navy py-20 text-cream md:py-32">
      <Wave tone="navy" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader dark label={t.label} lines={t.lines} highlight={t.highlight} intro={t.intro} />

        <div ref={ref} className="relative mt-16 md:mt-20">
          {/* Timeline line */}
          <div className="absolute top-0 left-[11px] h-full w-px bg-cream/15 md:top-[11px] md:left-0 md:h-px md:w-full" />
          <m.div
            className="absolute top-0 left-[11px] h-full w-px origin-top bg-copper md:hidden"
            style={reduce ? undefined : { scaleY: progress }}
          />
          <m.div
            className="absolute top-[11px] left-0 hidden h-px w-full origin-left bg-copper md:block"
            style={reduce ? undefined : { scaleX: progress }}
          />

          {/* On desktop every step spans the same 3 rows (subgrid): phase, title and body
              start at the same height in all three columns, whatever the text length. */}
          <ol className="grid gap-y-14 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
            {t.steps.map((s, i) => (
              <m.li
                key={s.phase}
                className="relative pl-10 md:row-span-3 md:grid md:grid-rows-subgrid md:pt-12 md:pl-0"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.12 }}
              >
                <span className="absolute top-0 left-0 grid size-[23px] place-items-center rounded-full border border-copper bg-navy">
                  <span className="size-2 rounded-full bg-copper" />
                </span>
                <p className="label flex items-baseline gap-3 text-copper-light">
                  <span>{s.phase}</span>
                  <span className="h-px w-6 self-center bg-copper/50" aria-hidden />
                  <span className="text-cream/80">{s.name}</span>
                </p>
                <h3 className="mt-4 font-display text-2xl leading-tight font-bold tracking-tight md:text-[1.7rem]">{s.title}</h3>
                <p className="mt-3 text-cream/70">{s.body}</p>
              </m.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
