import type { MetadataRoute } from "next";
import { colors } from "@/lib/brand";
import { content } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Headstart",
    short_name: "Headstart",
    description: content.en.company.summary,
    start_url: "/",
    display: "browser",
    background_color: colors.cream,
    theme_color: colors.navyDeep,
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
