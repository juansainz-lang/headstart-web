import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles information from visitors to ${new URL(site.url).hostname}.`,
  alternates: { canonical: "/privacy" },
};

const updated = "October 6, 2026";

const link = "text-copper underline underline-offset-2 hover:text-ink";

export default function Privacy() {
  return (
    <div className="dot-grid min-h-svh bg-cream text-ink">
      <header className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-6 sm:px-6">
        <Link href="/" className="group" aria-label={`${site.name} home`}>
          <Logo />
        </Link>
        <Link href="/" className="label text-ink/55 hover:text-ink">
          <span aria-hidden>←</span> Back to site
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6 md:pt-16">
        <p className="label text-copper">Last updated · {updated}</p>
        <h1 className="display mt-4 text-[clamp(2.6rem,7vw,4.5rem)]">Privacy</h1>
        <p className="mt-6 text-lg text-ink/70">
          Short version: we measure how people use this site, we use your details only to set up and hold the call you
          book, and we never sell your information.
        </p>

        <div className="mt-14 space-y-12 text-ink/80 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-ink [&_p]:mt-4">
          <section>
            <h2>Site analytics</h2>
            <p>
              We use Google Analytics to understand how visitors use the site: which pages and sections they see, how
              they found us, their device and approximate location (city or region), and whether they open or complete
              a call booking. Google Analytics sets cookies to do this. We use the reports to improve the site, not to
              identify you, and Google Analytics does not log or store IP addresses.
            </p>
            <p>
              Learn{" "}
              <a href="https://policies.google.com/technologies/partner-sites" className={link} target="_blank" rel="noopener noreferrer">
                how Google uses information from sites that use its services
              </a>
              . You can block cookies in your browser settings or use the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" className={link} target="_blank" rel="noopener noreferrer">
                Google Analytics opt-out add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2>Booking a call</h2>
            <p>
              Calls are scheduled through Calendly. The details you enter there (such as your name, email and any notes)
              are handled under{" "}
              <a href="https://calendly.com/privacy" className={link} target="_blank" rel="noopener noreferrer">
                Calendly&apos;s privacy policy
              </a>{" "}
              and shared with us so we can hold and prepare the call.
            </p>
          </section>

          <section>
            <h2>Email</h2>
            <p>If you email us, we keep the conversation so we can reply and follow up on your request.</p>
          </section>

          <section>
            <h2>Hosting</h2>
            <p>
              The site is hosted by Netlify, which processes technical data such as IP addresses to deliver the site and
              keep it secure.
            </p>
          </section>

          <section>
            <h2>What we don&apos;t do</h2>
            <p>
              We don&apos;t sell or rent your personal information, we don&apos;t use it for advertising, and we only ask
              for what we need to book and run a call.
            </p>
          </section>

          <section>
            <h2>Questions or requests</h2>
            <p>
              To ask what we hold about you, or to have it corrected or deleted, email{" "}
              <a href={`mailto:${site.contactEmail}`} className={link}>
                {site.contactEmail}
              </a>
              . If this policy changes, we&apos;ll update the date at the top of this page.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
