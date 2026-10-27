# Headstart — website

The marketing site for [headstartsales.com](https://headstartsales.com), in English (`/`) and Spanish (`/es`).
Next.js (App Router), React, Tailwind CSS v4 and Motion. No other runtime dependencies.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run check` | Lint + type-check (run before every deploy) |

Requires Node.js 20.9 or newer.

## Where things live

```
src/
├── app/                      Routes and site-wide files
│   ├── (en)/                 English site: layout, page (/), privacy page, error screen
│   ├── (es)/                 Spanish site: layout, es/page (/es), error screen
│   ├── globals.css           Brand tokens, shared styles (.label, .display, buttons…), keyframes
│   ├── icon.svg, apple-icon  Browser and home-screen icons
│   └── sitemap, robots, manifest, llms.txt   SEO and answer-engine files
├── components/
│   ├── Landing.tsx           The page: every section, in order
│   ├── sections/             One file per page section (Hero → Contact)
│   ├── demos/                Interactive pieces: HeroFlow (canvas), AutomationFlow, TimeCalculator
│   ├── layout/               Site chrome: Nav, Footer, BookingModal, Analytics, RootShell…
│   ├── ui/                   Small reusable building blocks (SectionHeader, Reveal, Swipe, Logo…)
│   └── seo/                  StructuredData (schema.org JSON-LD)
└── lib/
    ├── content/              ALL copy: en.ts and es.ts (same shape, checked by TypeScript)
    ├── site.ts               Contact email, Calendly link, Analytics ID
    ├── brand.ts              Brand colors for code that can't read CSS
    ├── motion.ts             Shared animation curves
    └── metadata.ts, fonts.ts, analytics.ts, motion-features.ts
```

Two English and Spanish root layouts (route groups) give each language the right `<html lang>`.

## Editing

- **Any text on the page:** `src/lib/content/en.ts` and `src/lib/content/es.ts`. The same copy feeds the
  page, the JSON-LD and `/llms.txt`, so they never drift apart.
- **Email, booking link, analytics:** `src/lib/site.ts`.
- **A new section:** add a file in `components/sections/`, its copy in both content files, place it in
  `Landing.tsx`, and add its id to `titles` (the live browser-tab title) in the content files.

## Conventions

- Animation always through Motion's `m.*` components (`<LazyMotion strict>` keeps the first load small).
- Every section and demo sits inside `<Safe>` (an error boundary): one failure never blanks the page.
- Client components receive their copy as props; they never import `lib/content` (keeps it out of the browser bundle).
- Phones first: carousels use `ui/Swipe`, tap targets are at least 44px, small labels never go below ~11px.
- Respect reduced motion everywhere. Example data is fictional and always labeled "Example".

## Deploying

Hosted on Netlify (`netlify.toml`). `netlify deploy --build` makes a private draft; add `--prod` to publish.

## License

© 2026 Headstart. All rights reserved. This code is public so it can be read; it may not be copied, modified or reused without written permission.
