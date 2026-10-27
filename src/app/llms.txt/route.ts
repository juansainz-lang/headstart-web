import { content } from "@/lib/content";
import { site } from "@/lib/site";

// /llms.txt — a plain-text brief for AI answer engines (llmstxt.org convention).
// Built from the same copy as the page, so it never drifts from what visitors read.
export const dynamic = "force-static";

export function GET() {
  const t = content.en;
  const services = t.services.cards
    .map((s) => `- [${s.name} (${s.tech})](${site.url}/#svc-${s.id}): ${s.pitch}`)
    .join("\n");
  const industries = t.industries.items.map((i) => `- ${i.name} (${i.sub}): ${i.example}`).join("\n");
  const popular = t.industries.popular.map(([n, d]) => `- ${n}: ${d}`).join("\n");

  const body = `# ${site.name}

> ${t.company.summary}

${t.company.promise}

Website in English: ${site.url}/ · in Spanish: ${site.url}/es

## Services

${services}

## Industries

${industries}

### Most requested, in every industry

${popular}

## About

${t.about.paragraphs.join("\n\n")}

## How an engagement works

${t.how.steps.map((s, i) => `${i + 1}. ${s.name}: ${s.body}`).join("\n")}

## FAQ

${t.faq.items.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Contact

- Website: ${site.url}
- Free diagnosis (book a call): ${site.calendlyUrl || `${site.url}/#contact`}
- Email: ${site.contactEmail}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
