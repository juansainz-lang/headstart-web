import type { Content } from "@/lib/content";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";

// Site footer: brand, the four services, contact email and the privacy page.
export default function Footer({ t, services }: { t: Content["footer"]; services: Content["services"]["cards"] }) {
  return (
    <footer className="dot-grid-dark bg-navy-deep pb-12 text-sm text-cream/45">
      <div className="mx-auto max-w-7xl border-t border-cream/10 px-4 pt-8 pb-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <a href="#top" className="group flex items-center gap-3 text-cream/70 transition-colors hover:text-cream">
            <LogoMark className="size-6 text-cream" />
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
          </a>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-5">
            {services.map((s) => (
              <a key={s.id} href={`#svc-${s.id}`} className="hover:text-cream">
                {s.name}
              </a>
            ))}
          </nav>
          <a href={`mailto:${site.contactEmail}`} className="hover:text-cream">
            {site.contactEmail}
          </a>
        </div>
        <p className="label mt-6 text-center text-[0.58rem] text-cream/35">
          {t.tag} ·{" "}
          {/* A plain link on purpose: next/link would add its router code to the landing page. */}
          <a href="/privacy" className="underline underline-offset-2 hover:text-cream">
            {t.privacy}
          </a>
        </p>
      </div>
    </footer>
  );
}
