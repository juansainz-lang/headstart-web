"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import type { Content } from "@/lib/content";
import { track } from "@/lib/analytics";
import { colors } from "@/lib/brand";
import { ease } from "@/lib/motion";
import { site } from "@/lib/site";
import { CheckIcon } from "@/components/ui/Check";

const CALENDLY_ORIGIN = "https://calendly.com";

// Calendly's inline-embed URL, styled to match the site.
function embedUrl() {
  const u = new URL(site.calendlyUrl);
  u.searchParams.set("embed_domain", window.location.host);
  u.searchParams.set("embed_type", "Inline");
  u.searchParams.set("hide_gdpr_banner", "1");
  u.searchParams.set("background_color", colors.cream.slice(1));
  u.searchParams.set("text_color", colors.ink.slice(1));
  u.searchParams.set("primary_color", colors.copper.slice(1));
  return u.toString();
}

// Booking popup. Any link with `data-book` opens it (event delegation, so buttons can
// stay server-rendered). Calendly loads only when someone actually clicks — zero cost
// on page load. Without JS, or with a modified click, the link opens Calendly directly.
export default function BookingModal({ t }: { t: Content["booking"] }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [booked, setBooked] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!site.calendlyUrl) return;

    // Warm up the connection the first time someone hovers or focuses a booking button.
    const warm = (e: Event) => {
      if (!(e.target as Element | null)?.closest?.("a[data-book]")) return;
      if (document.head.querySelector("link[data-calendly]")) return;
      const link = Object.assign(document.createElement("link"), { rel: "preconnect", href: CALENDLY_ORIGIN });
      link.dataset.calendly = "";
      document.head.appendChild(link);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[data-book]") as HTMLElement | null;
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      opener.current = a;
      // Which button: the section it sits in (top, about, contact…) or the nav bar.
      track("book_call_open", { placement: a.closest("section[id]")?.id ?? "nav" });
      setBooked(false);
      setLoaded(false);
      setOpen(true);
    };
    // Calendly tells the page when its calendar is on screen, and when a meeting is booked.
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== CALENDLY_ORIGIN) return;
      const event = e.data?.event;
      if (event === "calendly.event_type_viewed" || event === "calendly.profile_page_viewed") setLoaded(true);
      if (event === "calendly.event_scheduled") {
        setBooked(true);
        track("generate_lead", { method: "calendly" });
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("focusin", warm);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  // While open: lock page scroll, close on Escape, and give focus back afterwards.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener.current?.focus();
    };
  }, [open, close]);

  if (!site.calendlyUrl) return null;

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm" onClick={close} aria-hidden />

          <m.div
            className="relative flex h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-cream text-ink shadow-[0_40px_120px_-30px_rgb(0_0_0/0.6)] sm:h-[min(780px,90svh)] sm:rounded-3xl"
            initial={reduce ? false : { y: 40, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={reduce ? undefined : { y: 30, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-5 py-4 sm:px-6">
              <div>
                <p className="label text-[0.58rem] text-copper">{t.pick}</p>
                <h2 id="booking-title" className="font-display text-xl font-bold tracking-tight">
                  {t.title}
                </h2>
              </div>
              <button
                ref={closeBtn}
                onClick={close}
                aria-label={t.close}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
              >
                <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {booked ? (
              <div className="grid flex-1 place-items-center px-6 text-center">
                <div>
                  <CheckIcon className="mx-auto size-14 text-copper" />
                  <p className="display mt-5 text-[clamp(2rem,5vw,3rem)]">{t.booked}</p>
                  <p className="mx-auto mt-3 max-w-sm text-ink/65">{t.bookedBody}</p>
                  <button onClick={close} className="btn-copper mt-8">
                    {t.back}
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative flex-1">
                {/* Sits BEHIND the (transparent until painted) calendar: visible until Calendly
                    draws, then covered — no blank window, no matter how long Calendly takes. */}
                <div className="absolute inset-0 grid place-items-center" aria-hidden={loaded}>
                  <div className="text-center">
                    <span className="mx-auto block size-8 animate-spin rounded-full border-2 border-copper/25 border-t-copper" />
                    <p className="label mt-4 text-[0.6rem] text-ink/50">{t.loading}</p>
                  </div>
                </div>
                <iframe
                  title={t.iframe}
                  src={embedUrl()}
                  onLoad={() => setLoaded(true)}
                  className="relative h-full w-full bg-transparent"
                />
              </div>
            )}

            <p className="border-t border-ink/10 px-5 py-2.5 text-center text-xs text-ink/45 sm:px-6">
              {t.tz}{" "}
              <a href={site.calendlyUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
                {t.openTab}
              </a>
            </p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
