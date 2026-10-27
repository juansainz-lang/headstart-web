import { content, type Lang } from "@/lib/content";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import SectionTitle from "@/components/layout/SectionTitle";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import Flow from "@/components/sections/Flow";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Industries from "@/components/sections/Industries";
import Marquee from "@/components/sections/Marquee";
import Pains from "@/components/sections/Pains";
import Services from "@/components/sections/Services";
import StructuredData from "@/components/seo/StructuredData";
import Safe from "@/components/ui/Safe";

// The whole landing page, in one language, sections in page order. Each one is wrapped
// in <Safe>: if one fails, the rest of the page still works.
export default function Landing({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <>
      <StructuredData lang={lang} />
      <SectionTitle titles={t.titles} />
      <Safe>
        <Nav t={t.nav} />
      </Safe>
      <main>
        <Safe>
          <Hero t={t.hero} cta={t.cta} />
        </Safe>
        <Safe>
          <Marquee facts={t.marquee} />
        </Safe>
        <Safe>
          <Pains t={t.pains} calc={t.calc} />
        </Safe>
        <Safe>
          <Services t={t.services} />
        </Safe>
        <Safe>
          <Flow t={t.flow} />
        </Safe>
        <Safe>
          <HowItWorks t={t.how} />
        </Safe>
        <Safe>
          <About t={t.about} cta={t.cta} />
        </Safe>
        <Safe>
          <Industries t={t.industries} />
        </Safe>
        <Safe>
          <FAQ t={t.faq} />
        </Safe>
        <Safe>
          <Contact t={t.contact} cta={t.cta} />
        </Safe>
      </main>
      <Footer t={t.footer} services={t.services.cards} />
    </>
  );
}
