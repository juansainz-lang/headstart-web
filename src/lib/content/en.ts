// English copy (the site at /). Same shape as es.ts.

export const en = {
  htmlLang: "en",
  locale: "en_US",
  path: "/",

  meta: {
    title: "Headstart | Tailor-made AI Automation for Businesses",
    description:
      "Stop doing work software should do. Headstart builds tailor-made AI automation on the tools your company already uses. Start with a free diagnosis.",
    keywords: [
      "AI automation agency",
      "business process automation",
      "workflow automation",
      "AI assistants for business",
      "custom integrations",
      "automated reporting",
      "small business automation",
      "AI for med spas, restaurants, real estate, law firms and e-commerce",
      "beverage alcohol sales automation",
    ],
  },

  // The one call to action, everywhere on the page.
  cta: "Get your free diagnosis",

  nav: {
    links: [
      { href: "#services", label: "Services" },
      { href: "#how", label: "How it works" },
      { href: "#about", label: "About us" },
      { href: "#industries", label: "Industries" },
      { href: "#faq", label: "FAQ" },
    ],
    book: "Free diagnosis",
    home: "Headstart — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    promise: "Your tools · your data · no new apps",
    switchTo: { href: "/es", short: "ES", label: "Ver en español" },
  },

  hero: {
    label: "Tailor-made AI automation",
    lines: ["Stop doing work", "software should do."],
    highlight: "software",
    sub: "Tailor-made AI automation for companies tired of manual processes. Built on the tools you already use.",
    how: "How it works",
    footnote: "Your tools · your data · no new apps · no training",
    statement: ["Your business,", "on autopilot."],
    scroll: "Scroll",
  },

  marquee: [
    "Tasks that run themselves",
    "AI that answers for you",
    "Your tools, connected",
    "Your numbers, always up to date",
    "Your data stays yours",
    "Free diagnosis",
  ],

  pains: {
    label: "The problem",
    lines: ["Sound familiar?"],
    highlight: "familiar?",
    sub: "Every company is different. The busywork is the same.",
    items: [
      ["Your team copies data from one place to another.", "From email to spreadsheet, from spreadsheet to software. Every single day."],
      ["Customers write in and nobody answers in time.", "And whoever answers late, loses the customer."],
      ["To know how the business is doing, someone has to build a report.", "Always late, always by hand."],
    ],
    calcLead: "How many hours is it costing you? Do the math.",
  },

  calc: {
    numberLocale: "en-US",
    yourNumbers: "Your numbers",
    people: "People on your team",
    personUnit: "person",
    peopleUnit: "people",
    hours: "Hours of manual work per person, per week",
    note: "Data entry, emails, reports, invoices. Based on {weeks} working weeks a year.",
    result: "hours a year your team spends on manual work.",
    weeksLead: "That's",
    weeksTail: "full work weeks",
    every: "Every year.",
    weekTitle: "A typical week · who does the busywork?",
    weekAria: "Who does the busywork",
    yourTeam: "Your team",
    ai: "Headstart AI",
    person: "Person",
    aiLane: "AI",
    idle: "Idle",
    focus: "Real work",
    aiLine: "The busywork still gets done — your team just isn't the one doing it.",
    teamLine: "{focus} h on real work, {hours} h on busywork. Every week.",
    tasks: ["Data entry", "Emails", "Reports", "Invoices"],
  },

  services: {
    label: "Services",
    lines: ["What we do", "for your company."],
    highlight: "your company.",
    intro: "Every build is tailor-made, on the tools you already use. Four ways we give your team its time back.",
    cards: [
      {
        id: "workflows",
        n: "01",
        name: "Tasks that run themselves",
        tech: "Workflow automation",
        pitch: "Everything your team repeats every day — moving data, sending emails, asking for approvals — running on its own.",
      },
      {
        id: "agents",
        n: "02",
        name: "AI assistants that answer for you",
        tech: "AI agents",
        pitch: "They read emails, messages and forms, understand what's being asked, and reply or pass it to the right person. Any time of day.",
      },
      {
        id: "integrations",
        n: "03",
        name: "Your tools, connected",
        tech: "Custom integrations",
        pitch: "Your CRM, invoicing, website and spreadsheets talking to each other. No more copy-paste.",
      },
      {
        id: "intelligence",
        n: "04",
        name: "Your numbers, always up to date",
        tech: "Operational intelligence",
        pitch: "Reports and alerts that build themselves. Know how the business is doing without asking anyone.",
      },
    ],
    promise: ["Built on your tools", "Your data stays yours", "No training needed"],
  },

  flow: {
    label: "See it work",
    lines: ["A request comes in.", "Nobody touches it."],
    highlight: "Nobody",
    intro: "Pick a request and watch it resolve itself: classified, extracted, acted on and logged.",
    pick: "Pick a request",
    inbox: "Inbox",
    steps: ["Request arrives", "AI classifies", "Data extracted", "Action triggered", "Logged & reported"],
    replay: "Replay",
    exampleTag: "Example",
    footnote: "Example · fictional companies and data",
    done: "Done in seconds. Nobody copy-pasted anything.",
    examples: [
      {
        id: "clinic",
        tab: "Med spa",
        from: "maria.g@email.com",
        subject: "Appointment for lip filler next week?",
        body: "Hi! I'd like to book a lip filler consultation next Tuesday or Wednesday afternoon. First time with you. Thanks, María",
        intent: "New booking",
        priority: "High · new client",
        fields: [
          ["Treatment", "Lip filler consultation"],
          ["Preferred", "Tue / Wed, afternoon"],
          ["Client", "New · María G."],
        ],
        actions: ["Slot offered: Tue 4:30 pm", "Intake form sent", "Lead added to CRM"],
        report: "Bookings this week: 38 · from email: 12",
      },
      {
        id: "hotel",
        tab: "Hotel",
        from: "events@northbridge-co.com",
        subject: "Group booking — 24 rooms, March 12–14",
        body: "We're planning our annual offsite: 24 rooms for 2 nights plus a meeting room for 30. Can you send a quote by Friday?",
        intent: "Group quote",
        priority: "High · deadline Friday",
        fields: [
          ["Rooms", "24 × 2 nights"],
          ["Dates", "Mar 12–14"],
          ["Extras", "Meeting room, 30 pax"],
        ],
        actions: ["Availability checked", "Quote drafted for review", "Sales manager alerted"],
        report: "Group requests this month: 9 · avg. reply: 14 min",
      },
      {
        id: "distributor",
        tab: "Distributor",
        from: "orders@riverside-market.com",
        subject: "PO #4471 — weekly order",
        body: "Please find attached this week's order: 18 cases Cabernet 750ml, 12 cases Rosé 750ml. Delivery Thursday.",
        intent: "Purchase order",
        priority: "Normal · delivery Thu",
        fields: [
          ["PO", "#4471"],
          ["Items", "18 cs Cabernet · 12 cs Rosé"],
          ["Delivery", "Thursday"],
        ],
        actions: ["Order logged in ERP", "Confirmation sent", "Stock reserved"],
        report: "POs processed today: 27 · errors: 0",
      },
    ],
  },

  how: {
    label: "How it works",
    lines: ["Three steps.", "Zero hassle."],
    highlight: "Zero hassle.",
    intro: "From the first call to a system that runs on its own.",
    steps: [
      {
        phase: "Step 01",
        name: "Free diagnosis",
        title: "We find what to automate first.",
        body: "We talk about how your company works and show you where you're losing the most time. No commitment.",
      },
      {
        phase: "Step 02",
        name: "We build it",
        title: "On the tools you already use.",
        body: "We design and build the automations around your business. You approve every step.",
      },
      {
        phase: "Step 03",
        name: "It runs and improves",
        title: "You get your time back.",
        body: "We launch it, measure the hours you save and keep fine-tuning it.",
      },
    ],
  },

  about: {
    label: "About us",
    lines: ["We've seen how the giants win.", "Now it's your turn."],
    highlight: "your turn.",
    paragraphs: [
      "We're Nacho and Juan, two young founders passionate about business and technology. For years we worked for multinationals in China, Saudi Arabia, the United States, London and Spain. We saw from the inside how big corporations really work — and we learned something nobody tells you.",
      "They don't win because they have better people. They win because they have systems doing the work for them: armies of engineers and millions invested so that no one wastes time on what a machine can do.",
      "Meanwhile, we watched small businesses full of talent putting out fires until 11 pm. Answering emails, moving data, chasing invoices. Competing with one hand tied behind their back.",
      "That has changed. AI has put within reach of any company what only the biggest could afford. For the first time, a team of five can work with the power of a team of five thousand.",
      "That's why we started Headstart. A head start is exactly what we want to give you. We don't sell software or templates: we sit down with you, understand your business and build what you need, so you and your team can get back to the work that really matters.",
    ],
    quote: "AI isn't just for giants anymore. It's your turn.",
    more: "Read the full story",
    signature: "Nacho & Juan, founders",
    countriesLabel: "Where we learned",
    countries: ["China", "Saudi Arabia", "United States", "London", "Spain"],
  },

  industries: {
    label: "Industries",
    lines: ["Every industry.", "Same problems."],
    highlight: "Same problems.",
    intro: "We work with companies in every industry, because the busywork repeats. A few examples:",
    pick: "Choose an industry",
    items: [
      { id: "beverage", name: "Beverage alcohol", sub: "Wine, beer & spirits", example: "Every distributor's report in one dashboard, with an alert when an account stops reordering." },
      { id: "clinics", name: "Med spas & clinics", sub: "Medical aesthetics and wellness", example: "Inquiries from Instagram and your website answered in minutes and turned into booked appointments." },
      { id: "hospitality", name: "Hospitality", sub: "Restaurants, hotels and bars", example: "Group and event requests quoted the same day, and supplier invoices filed without retyping." },
      { id: "real-estate", name: "Real estate", sub: "Agencies and property managers", example: "Portal leads answered and qualified in minutes, and viewings scheduled on their own." },
      { id: "professional", name: "Professional services", sub: "Law firms and accountants", example: "Client onboarding and document requests sent and tracked automatically." },
      { id: "ecommerce", name: "E-commerce & retail", sub: "Online and multi-channel stores", example: "An AI assistant answering order and return questions 24/7, with stock synced across channels." },
    ],
    popularLabel: "Most requested, in every industry",
    popular: [
      ["Website with AI assistant", "Answers every visitor 24/7, personally, and hands warm leads to your team."],
      ["Invoices", "Captured, checked and sent to accounting. Yours issued and chased automatically."],
      ["Quotes", "Drafted in minutes from each request, with your prices and conditions."],
      ["Quote follow-up", "Every open quote followed up at the right moment, until it's a yes or a no."],
      ["No more no-shows", "Confirmations, reminders and easy rescheduling."],
      ["External work tracking", "Subcontractors and suppliers coordinated: who's doing what, by when, and what's late."],
    ],
  },

  faq: {
    label: "FAQ",
    lines: ["Straight", "answers."],
    items: [
      {
        q: "What exactly do you do?",
        a: "We build AI automation for companies: tasks that run themselves, AI assistants that answer for you, your tools connected, and your numbers always up to date. All tailor-made.",
      },
      {
        q: "Is it for my company?",
        a: "If your team spends hours on repetitive work — data entry, emails, quotes, invoices, bookings, reports — yes. We work with companies in every industry.",
      },
      {
        q: "Do I need new software or training?",
        a: "No. We build on the tools you already use. Nobody has to learn a new app.",
      },
      {
        q: "What happens to my data?",
        a: "It stays yours. The automations run inside your own systems and accounts.",
      },
      {
        q: "How much does it cost?",
        a: "The diagnosis is free. After that, you get a fixed quote before anything starts.",
      },
    ],
  },

  contact: {
    label: "Free · No commitment",
    lines: ["How much time would", "your team get back?"],
    highlight: "get back?",
    body: "Find out in one call. The diagnosis is free and there's no commitment.",
    orEmail: "or email",
  },

  footer: {
    tag: "Your tools · your data · examples clearly marked",
    privacy: "Privacy",
  },

  booking: {
    pick: "Pick a time that works for you",
    title: "Book your free diagnosis",
    loading: "Loading available times…",
    iframe: "Choose a time for your call",
    close: "Close",
    tz: "Times are shown in your time zone.",
    openTab: "Open the calendar in a new tab",
    booked: "You're booked.",
    bookedBody: "Check your inbox for the calendar invite. Talk soon.",
    back: "Back to the site",
  },


  titles: [
    ["pains", "Sound familiar?"],
    ["services", "Services"],
    ["demo", "See it work"],
    ["how", "How it works"],
    ["about", "About us"],
    ["industries", "Industries"],
    ["faq", "FAQ"],
    ["contact", "Free diagnosis"],
  ] as [string, string][],

  company: {
    summary:
      "Headstart builds tailor-made AI automation for companies tired of manual processes: tasks that run themselves, AI assistants that answer for them, connected tools and always-up-to-date reporting — built on the tools each company already uses. Founded by Nacho and Juan.",
    promise:
      "Every engagement starts with a free diagnosis of how the company works. We automate the tools it already has: no new apps, no training, and the client's data stays in its own systems.",
  },
};
