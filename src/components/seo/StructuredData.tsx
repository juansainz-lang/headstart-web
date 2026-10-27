import { content, type Lang } from "@/lib/content";
import { site } from "@/lib/site";

// schema.org JSON-LD: tells search engines and AI assistants who we are, what we offer
// and in which industries, and answers the FAQ in a machine-readable way.
export default function StructuredData({ lang }: { lang: Lang }) {
  const t = content[lang];
  const page = `${site.url}${t.path === "/" ? "" : t.path}`;
  const org = `${site.url}/#organization`;

  const graph = [
    {
      "@type": "Organization",
      "@id": org,
      name: site.name,
      url: site.url,
      logo: `${site.url}/apple-icon`,
      description: t.company.summary,
      email: site.contactEmail,
      areaServed: ["United States", "Spain", "Latin America"],
      founder: [
        { "@type": "Person", name: "Nacho" },
        { "@type": "Person", name: "Juan" },
      ],
      knowsAbout: [
        ...t.services.cards.map((s) => s.tech),
        ...t.industries.items.map((i) => i.name),
        "AI automation",
        "Business process automation",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.contactEmail,
        availableLanguage: ["English", "Spanish"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${page}/#website`,
      url: page,
      name: site.name,
      description: t.company.summary,
      publisher: { "@id": org },
      inLanguage: lang === "en" ? "en-US" : "es",
    },
    ...t.services.cards.map((s) => ({
      "@type": "Service",
      "@id": `${page}/#svc-${s.id}`,
      name: s.name,
      serviceType: s.tech,
      description: s.pitch,
      url: `${page}/#svc-${s.id}`,
      provider: { "@id": org },
      audience: { "@type": "BusinessAudience", audienceType: t.industries.items.map((i) => i.name).join(", ") },
    })),
    {
      "@type": "FAQPage",
      "@id": `${page}/#faq`,
      inLanguage: lang === "en" ? "en-US" : "es",
      mainEntity: t.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
