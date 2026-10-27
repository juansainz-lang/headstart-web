"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "motion/react";
import type { Content } from "@/lib/content";
import { ease, easeInOut } from "@/lib/motion";
import { site } from "@/lib/site";
import Logo from "@/components/ui/Logo";
import Magnetic from "@/components/ui/Magnetic";

// Top bar: transparent over the hero, cream after it, with a reading-progress line.
// Below lg the links move into a full-screen menu.
export default function Nav({ t }: { t: Content["nav"] }) {
  const links = t.links;
  const [scrolled, setScrolled] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    // Measure the hero only on resize; scroll handling stays a cheap comparison.
    let heroH = window.innerHeight;
    const measure = () => {
      heroH = document.getElementById("top")?.offsetHeight ?? window.innerHeight;
      onScroll();
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setOnHero(window.scrollY < heroH - 64);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const dark = onHero || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
        open
          ? "text-cream"
          : onHero
            ? scrolled
              ? "bg-navy-deep/70 text-cream backdrop-blur-md"
              : "text-cream"
            : "bg-cream/85 text-ink shadow-[0_1px_0_rgb(17_17_17/0.08)] backdrop-blur-md"
      }`}
    >
      <nav className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" onClick={() => setOpen(false)} className="group" aria-label={t.home}>
          {/* Very narrow phones (<380px) show the mark only, so the bar never overflows. */}
          <Logo textClassName="max-[379px]:sr-only" />
        </a>

        <div className={`hidden items-center gap-7 text-sm font-medium lg:flex ${dark ? "text-cream/75" : "text-ink/70"}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`transition-colors ${dark ? "hover:text-cream" : "hover:text-ink"}`}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={t.switchTo.href}
            hrefLang={t.switchTo.short.toLowerCase()}
            aria-label={t.switchTo.label}
            title={t.switchTo.label}
            className={`label relative grid size-9 place-items-center rounded-full border text-[0.68rem] transition-colors after:absolute after:-inset-1 after:rounded-full sm:h-9 sm:w-auto sm:min-w-9 sm:px-3 sm:text-[0.62rem] ${
              dark ? "border-cream/20 text-cream/80 hover:border-cream/60" : "border-ink/15 text-ink/70 hover:border-ink/40"
            }`}
          >
            {t.switchTo.short}
          </a>
          <Magnetic strength={0.2}>
            <a href={site.bookingUrl} data-book className="btn-copper shrink-0 !px-3 !py-2 text-[0.78rem] whitespace-nowrap sm:!px-4 sm:text-sm">
              {t.book}
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.closeMenu : t.openMenu}
            className="-mr-2.5 grid size-11 place-items-center rounded-full lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Reading progress */}
      <m.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-[2px] origin-left bg-copper"
        style={{ scaleX: progress }}
      />

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className="fixed inset-0 flex flex-col justify-between bg-navy-deep px-4 pt-24 pb-10 text-cream sm:px-6 lg:hidden"
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <m.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-[2.4rem] font-bold tracking-tight"
                  >
                    <span className="label text-[0.65rem] text-copper">0{i + 1}</span>
                    {l.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="space-y-4">
              <a href={t.switchTo.href} hrefLang={t.switchTo.short.toLowerCase()} className="btn-ghost w-full text-cream/80">
                {t.switchTo.label}
              </a>
              <a href={site.bookingUrl} data-book onClick={() => setOpen(false)} className="btn-copper w-full text-lg">
                {t.book} →
              </a>
              <p className="label text-center text-cream/40">{t.promise}</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
