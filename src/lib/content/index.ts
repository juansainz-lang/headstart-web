// All site copy, one file per language. The page, the structured data (JSON-LD) and
// /llms.txt read from here, so visitors, search engines and AI assistants see the same words.
import { en } from "./en";
import { es } from "./es";

export type Lang = "en" | "es";
export type Content = typeof en;

export const content: Record<Lang, Content> = { en, es };
