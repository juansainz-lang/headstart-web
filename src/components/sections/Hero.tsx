"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/site";
import type { Content } from "@/lib/content";
import Magnetic from "@/components/ui/Magnetic";
import { RevealLines } from "@/components/ui/Reveal";
import Safe from "@/components/ui/Safe";

const HeroFlow = dynamic(() => import("@/components/demos/HeroFlow"), { ssr: false });

function useIsMobile() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

// Full-screen "chaos → order" hero: tangled lines on the left become perfectly ordered on
// the right; a huge centered headline sits over a calm band. On every screen size the hero
// is pinned for a short stretch: scrolling orders everything and the statement takes over.
// (Reduced motion: a normal, unpinned hero with no scroll effects.)
export default function Hero({ t, cta }: { t: Content["hero"]; cta: string }) {
  const mobile = useIsMobile();
  const reduced = !!useReducedMotion();
  const hero = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end end"] });
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0.12, 0.42], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const statementOpacity = useTransform(scrollYProgress, [0.45, 0.62], [0, 1]);
  const statementY = useTransform(scrollYProgress, [0.45, 0.62], [40, 0]);
  const statementClicks = useTransform(statementOpacity, (v) => (v > 0.6 ? "auto" : "none"));
  const textStyle = reduced ? undefined : { y: textY, opacity: textOpacity };
  const long = t.lines.length > 2;

  return (
    <section ref={hero} id="top" className="relative h-[180svh] bg-navy-deep text-cream motion-reduce:h-auto lg:h-[170vh]">
      <div className="grain sticky top-0 isolate h-[100svh] min-h-[560px] overflow-hidden motion-reduce:relative motion-reduce:h-auto lg:min-h-[640px]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,#15243a_0%,#0f1b2d_45%,#0a1320_100%)]"
        />

        {mobile !== null && (
          <Safe>
            <HeroFlow mobile={mobile} reduced={reduced} hero={hero} />
          </Safe>
        )}

        {/* A calm pool behind the headline keeps it readable over the lines. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgb(10_19_32/0.88)_0%,rgb(10_19_32/0.55)_55%,transparent_85%)] max-md:bg-[radial-gradient(ellipse_95%_50%_at_50%_50%,rgb(10_19_32/0.9)_0%,rgb(10_19_32/0.6)_60%,transparent_95%)]"
        />

        <m.div
          style={textStyle}
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 pt-20 pb-16 text-center motion-reduce:min-h-[100svh] sm:px-6 lg:pt-24 lg:pb-24"
        >
          <div className="fade-up">
            <p className="label mb-6 flex items-center justify-center gap-2 text-cream/60">
              <span className="relative inline-flex size-2">
                <span className="animate-ping-soft absolute inset-0 rounded-full bg-copper" />
                <span className="relative size-2 rounded-full bg-copper" />
              </span>
              {t.label}
            </p>
          </div>
          <RevealLines
            as="h1"
            onLoad
            className={`display ${long ? "text-[clamp(2.5rem,6vw,6.2rem)]" : "text-[clamp(2.9rem,7.6vw,7.8rem)]"}`}
            lines={t.lines}
            highlight={t.highlight}
          />
          <div className="fade-up" style={{ animationDelay: "0.4s" }}>
            <p className="mx-auto mt-7 max-w-2xl text-lg text-cream/75 md:text-xl">{t.sub}</p>
          </div>
          <div className="fade-up mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4" style={{ animationDelay: "0.5s" }}>
            <Magnetic>
              <a href={site.bookingUrl} data-book className="btn-copper text-lg shadow-[0_10px_40px_-10px_rgb(184_115_51/0.7)]">
                {cta} <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <a href="#how" className="label text-cream/65 underline decoration-copper/60 underline-offset-[6px] hover:text-cream">
              {t.how}
            </a>
          </div>
          <p className="fade-up label mt-8 hidden text-cream/40 sm:block" style={{ animationDelay: "0.6s" }}>
            {t.footnote}
          </p>
        </m.div>

        {!reduced && (
          <m.div
            style={{ opacity: statementOpacity, y: statementY, pointerEvents: statementClicks }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 text-center"
          >
            <p className="display text-[clamp(2.8rem,7vw,7.2rem)] drop-shadow-[0_4px_30px_rgb(10_19_32/0.9)]">
              {t.statement[0]}
              <br />
              <span className="text-copper">{t.statement[1]}</span>
            </p>
            <Magnetic className="mt-8 lg:mt-10">
              <a href={site.bookingUrl} data-book className="btn-copper text-lg shadow-[0_10px_40px_-10px_rgb(184_115_51/0.7)]">
                {cta} <span aria-hidden>→</span>
              </a>
            </Magnetic>
          </m.div>
        )}

        <m.div
          aria-hidden
          style={reduced ? undefined : { opacity: cueOpacity }}
          className="label pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] text-cream/45 md:flex"
        >
          {t.scroll}
          <span className="scroll-cue relative block h-10 w-px overflow-hidden bg-cream/15" />
        </m.div>
      </div>
    </section>
  );
}
