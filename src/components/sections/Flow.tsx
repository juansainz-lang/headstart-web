import type { Content } from "@/lib/content";
import AutomationFlow from "@/components/demos/AutomationFlow";
import { Reveal } from "@/components/ui/Reveal";
import Safe from "@/components/ui/Safe";
import SectionHeader from "@/components/ui/SectionHeader";
import Wave from "@/components/ui/Wave";

// "See it work": one automation from the inside.
export default function Flow({ t }: { t: Content["flow"] }) {
  return (
    <section id="demo" className="dot-grid relative scroll-mt-16 bg-cream py-20 md:py-32">
      <Wave tone="cream" flip />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader label={t.label} lines={t.lines} highlight={t.highlight} intro={t.intro} />
        <Reveal className="mt-12 md:mt-14">
          <Safe>
            <AutomationFlow t={t} />
          </Safe>
        </Reveal>
      </div>
    </section>
  );
}
