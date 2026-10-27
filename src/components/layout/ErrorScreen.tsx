import { site } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";

// Last-resort screen if a whole page fails to render (see app/(en)/error.tsx and app/(es)/error.tsx).
export default function ErrorScreen({
  title,
  body,
  reload,
  reset,
}: {
  title: string;
  body: string;
  reload: string;
  reset: () => void;
}) {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-navy-deep px-6 text-center text-cream">
      <div>
        <LogoMark className="mx-auto size-12 text-cream" />
        <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]">{title}</h1>
        <p className="mx-auto mt-4 max-w-md text-cream/70">{body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button onClick={reset} className="btn-copper">
            {reload}
          </button>
          <a href={`mailto:${site.contactEmail}`} className="label text-cream/60 hover:text-cream">
            {site.contactEmail}
          </a>
        </div>
      </div>
    </main>
  );
}
