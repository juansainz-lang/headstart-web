import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: site.url, es: `${site.url}/es` };
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${site.url}/es`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
    { url: `${site.url}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
