"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";
import Magnetic from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Wave from "@/components/ui/Wave";

// About us: the founders' story, told as a story (why Headstart exists). On phones the
// first two paragraphs show, with a button for the rest; on larger screens it's all open.
export default function About({ t, cta }: { t: Content["about"]; cta: string }) {
  const [open, setOpen] = useState(false);
  return (
    <section id="about" className="dot-grid relative scroll-mt-16 bg-cream py-20 md:py-32">
      <Wave tone="cream" flip />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          label={t.label}
          lines={t.lines}
          highlight={t.highlight}
          titleClassName="max-w-5xl text-[clamp(2.4rem,5.6vw,5rem)]"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.42fr] lg:gap-16 [&>*]:min-w-0">
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-ink/75 md:text-[1.2rem]">
            {t.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.04 * i} className={i > 1 && !open ? "hidden md:block" : ""}>
                <p className={i === 0 ? "font-display text-[1.3rem] leading-snug font-semibold tracking-tight text-ink md:text-[1.6rem]" : ""}>{p}</p>
              </Reveal>
            ))}
            {!open && (
              <button
                onClick={() => setOpen(true)}
                className="label flex items-center gap-2 text-copper underline decoration-copper/50 underline-offset-[6px] md:hidden"
              >
                {t.more} <span aria-hidden>↓</span>
              </button>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="rounded-[2rem] bg-navy-deep p-8 text-cream shadow-[0_40px_100px_-40px_rgb(15_27_45/0.6)] md:p-10">
              <LogoMark className="size-10 text-cream" />
              <p className="mt-6 font-display text-[clamp(1.7rem,2.6vw,2.3rem)] leading-tight font-bold tracking-tight">
                {t.quote}
              </p>
              <p className="label mt-6 text-[0.62rem] text-copper-light">— {t.signature}</p>

              <p className="label mt-10 text-[0.58rem] text-cream/45">{t.countriesLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {t.countries.map((c) => (
                  <li key={c} className="rounded-full border border-cream/15 px-3 py-1 text-sm text-cream/80">
                    {c}
                  </li>
                ))}
              </ul>

              <Magnetic className="mt-10">
                <a href={site.bookingUrl} data-book className="btn-copper">
                  {cta} <span aria-hidden>→</span>
                </a>
              </Magnetic>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
