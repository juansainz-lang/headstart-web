import type { Metadata, Viewport } from "next";
import { colors } from "@/lib/brand";
import { content, type Lang } from "@/lib/content";
import { site } from "@/lib/site";

// Page metadata per language, with hreflang links so search engines pair / and /es.
export function metadataFor(lang: Lang): Metadata {
  const t = content[lang];
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s · ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    keywords: t.meta.keywords,
    publisher: site.name,
    category: "business",
    alternates: {
      canonical: t.path,
      languages: { en: "/", es: "/es", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: `${site.url}${t.path === "/" ? "" : t.path}`,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: t.locale,
      alternateLocale: lang === "en" ? ["es_ES"] : ["en_US"],
    },
    twitter: { card: "summary", title: t.meta.title, description: t.meta.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    formatDetection: { telephone: false, address: false },
  };
}

export const viewport: Viewport = { themeColor: colors.navyDeep };
