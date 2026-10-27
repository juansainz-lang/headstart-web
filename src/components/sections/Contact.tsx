import type { Content } from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import Wave from "@/components/ui/Wave";

// Closing call to action: the free diagnosis, or plain email.
export default function Contact({ t, cta }: { t: Content["contact"]; cta: string }) {
  return (
    <section id="contact" className="dot-grid-dark relative scroll-mt-16 bg-navy-deep py-20 text-cream md:pt-32">
      <Wave tone="navy-deep" />
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <p className="label mb-5 text-copper-light">{t.label}</p>
        <RevealLines className="display text-[clamp(2.6rem,7vw,6rem)]" lines={t.lines} highlight={t.highlight} />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream/70">{t.body}</p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a href={site.bookingUrl} data-book className="btn-copper text-lg">
              {cta} <span aria-hidden>→</span>
            </a>
            <a href={`mailto:${site.contactEmail}`} className="label text-cream/50 hover:text-cream">
              {t.orEmail} {site.contactEmail}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
