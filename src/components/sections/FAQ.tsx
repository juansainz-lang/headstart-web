"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import type { Content } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Wave from "@/components/ui/Wave";

// Accordion: one answer open at a time (the first starts open).
export default function FAQ({ t }: { t: Content["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="dot-grid relative scroll-mt-16 bg-cream py-20 md:py-32">
      <Wave tone="cream" flip />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] [&>*]:min-w-0">
        <div>
          <SectionHeader label={t.label} lines={t.lines} titleClassName="text-[clamp(2.3rem,5vw,4rem)]" />
        </div>
        <Reveal>
          <ul className="border-t border-ink/15">
            {t.items.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-b border-ink/15">
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold tracking-tight md:text-xl"
                    >
                      {f.q}
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full border border-ink/20 text-lg transition-transform duration-300 ${
                          isOpen ? "rotate-45 border-copper bg-copper text-white" : ""
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-ink/70">{f.a}</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
