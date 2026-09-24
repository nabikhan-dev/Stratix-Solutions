export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  headline: "From first idea to a product people can use",

  sub: "We are a product engineering company. We take your idea through strategy, design, engineering, and launch  then stay as your product partner. AI solutions, mobile apps, web platforms, and UI/UX. Fixed scope. Fixed price. Weekly demos.",
  primaryCta: { label: "Book a Free Call", href: "/contact" },
  secondaryCta: { label: "See Our Work", href: "/work" },

};

export type PrimaryService = {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  motifWords: string[];
  isActive?: boolean;
};

export const primaryServices: PrimaryService[] = [
  {
    id: "ai",

    number: "01",
    title: "AI Development",
    short: "AI tools that solve practical business problems.",
    description:
      "We help you find where AI creates real business value, then build the right solution  an internal assistant, an automated workflow, a document-processing tool, a support experience, or an intelligent feature inside your existing product. Every AI build ships with evaluation, guardrails, and human review where it matters. No demos that die in a slide deck. Working AI, in production.",
    motifWords: ["AI assistants", "Automation", "Knowledge bases", "Prompt systems", "Human review"],
  },
  {
    number: "02",
    id: "uiux",
    title: "UI/UX Design",
    short: "Clear, intuitive experiences designed around your users.",
    description:
      "Design decides whether people trust your product in the first ten seconds. We run research, map user flows, wireframe every screen, and deliver a design system your team can actually maintain. The result: interfaces that feel premium, reduce support tickets, and convert. Design is never decoration here  it's how the product works.",
    motifWords: ["User research", "Wireframes", "Design systems", "Prototyping", "Usability testing"],
  },
  {
    number: "03",
    id: "app",
    title: "App Development",
    short: "Mobile apps built for real users and real-world use.",
    description:
      "iOS and Android apps from one codebase, built with Flutter or React Native. Authentication, notifications, payments, analytics, and offline support  engineered in, not bolted on. We handle store submission and review, and your app launches with the plumbing a real product needs. Built to pass review the first time and scale after it.",
    motifWords: ["Flutter", "React Native", "iOS & Android", "Store submission", "App analytics"],
  },
  {
    number: "04",
    id: "web",
    title: "Web Development",
    short: "Modern web experiences that are fast, useful, and easy to maintain.",
    description:
      "Web platforms and SaaS products that load fast and hold up under growth. Modern stacks  Next.js, Node.js, TypeScript  with clean APIs, admin portals, and infrastructure that doesn't fall over at your first traffic spike. We measure success in business outcomes: signups, sales, retention. Not page views.",
    motifWords: ["Next.js", "SaaS platforms", "REST & GraphQL APIs", "Admin portals", "Performance"],
  },
];

export const processSteps = [
  {
    id: "scope",
    number: "01",
    title: "Scope",
    description:
      "We define the product together on a free call. Features, timeline, and a fixed price  agreed before any work starts.",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description:
      "Wireframes first, then polished UI. You approve every screen before we write production code.",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description:
      "Daily code pushes. Weekly demos. You watch the product take shape instead of waiting for a big reveal.",
  },
  {
    id: "ship",
    number: "04",
    title: "Ship",
    description:
      "QA, store submission, and launch handled by us. Your product goes live, properly.",
  },
  {
    id: "support",
    number: "05",
    title: "Support",
    description:
      "30 days of post-launch support included. After that, we stay on as your product partner  if you want us to.",
  },
];

export const practices = [
  {
    id: "jira",
    cadence: "Real-time",
    title: "Jira board, shared from day one",
    description:
      "You get full access to the same Jira board the engineers use  not a sanitized client view. Every feature is a ticket with a status, an owner, and an estimate, so \"how is it going?\" is a question you can answer yourself at 2am.",
    youGet: "Live board access, sprint plan per milestone",
  },
  {
    id: "demos",
    cadence: "Every week",
    title: "Weekly demo videos",
    description:
      "Every Friday you receive a screen-recorded walkthrough of the app running on a real device, narrated by the engineer who built it. No slide decks, no \"trust us\"  working software you can forward to your co-founder or investors.",
    youGet: "Recorded demo + build you can install",
  },
  {
    id: "standups",
    cadence: "Daily",
    title: "Daily standups",
    description:
      "A short written or call-based standup every working day: what shipped yesterday, what's next, what's blocked. You're invited but never required  the notes land in Slack either way.",
    youGet: "Standup notes in your Slack channel",
  },
  {
    id: "sync",
    cadence: "Daily",
    title: "Daily team sync",
    description:
      "Internally, the engineers and the founder sync every day on architecture decisions and risk. Problems get caught while they cost hours, not weeks  this is a big part of why 90% of our projects land on time.",
    youGet: "Risks flagged to you early, not at the deadline",
  },
  {
    id: "git",
    cadence: "Daily",
    title: "Daily git pushes",
    description:
      "Code is pushed to a repository you own or have access to, every single day. If we disappeared tomorrow, you would lose nothing. This is also your insurance against the classic agency failure mode: a final-week \"big reveal\" that misses the mark.",
    youGet: "Full commit history in your repo",
  },
  {
    id: "slack",
    cadence: "Instant",
    title: "Direct Slack access",
    description:
      "A shared Slack channel with the actual engineers  not an account manager relaying messages. Questions get answered in minutes during working hours, and decisions are written down where everyone can see them.",
    youGet: "Shared channel, typical response under 1 hour",
  },
  {
    id: "qa",
    cadence: "Every 2 days",
    title: "QA reports every two days",
    description:
      "Structured QA passes on real iOS and Android devices throughout the build  not a single test crunch at the end. Each report lists what was tested, what broke, and what was fixed, so quality is visible long before launch week.",
    youGet: "Written QA report with device matrix",
  },
];

export const weekByWeek = [
  {
    week: "Week 0",
    title: "Discovery & Scoping",
    description:
      "A free call to define the feature list together. We write a fixed-price scope with milestones. You sign off before anything starts.",
  },
  {
    week: "Week 1",
    title: "Design",
    description:
      "Flows and wireframes first, then high-fidelity screens. You review and approve the designs  changes are cheap here and expensive later, so we get this right before code.",
  },
  {
    week: "Weeks 2\u20134",
    title: "Build",
    description:
      "Core development in milestone-sized chunks. Daily pushes you can watch, weekly demos you can react to. Feedback lands mid-build, not after it.",
  },
  {
    week: "Week 5",
    title: "QA & Hardening",
    description:
      "Testing across devices, edge cases, performance, and security. We fix before we ship \u2014 not after your users find it.",
  },
  {
    week: "Week 6",
    title: "Ship & Support",
    description:
      "Store submission, release, and monitoring. Then 30 days of included support while your first real users arrive.",
  },
];

export type PricingTier = {
  id: string;
  price: string;
  name: string;
  timeline: string;
  /** One-line positioning sentence under the package name on the plan card. */
  description: string;
  /** Fine print under the plan card's CTA  how the price is actually billed. */
  note: string;
  /** Rendered as the card's "Build with:" group, below the feature checklist. */
  stack: string[];
  features: string[];
  isActive?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "lean",
    price: "$5k",
    name: "Lean MVP",
    timeline: "2–3 weeks",
    description: "Get your first app in front of real users. Best for validating one core idea.",
    note: "Fixed price, split across 3 milestones. If the build runs long, that's on us, not your invoice.",
    stack: ["Flutter or React Native", "Firebase or Supabase"],
    features: [
      "One target platform",
      "3–5 essential features",
      "Firebase or Supabase backend",
      "Launch and store submission support",
    ],
  },
  {
    id: "standard",
    price: "$8k",
    name: "Standard MVP",
    timeline: "4–6 weeks",
    description: "Ship on both stores with the plumbing a real product needs. Our most-picked scope.",
    note: "Fixed price, split across 4 milestones. Weekly demos, daily progress, no change-order games.",
    stack: ["Flutter or React Native", "Firebase or Supabase", "REST or GraphQL APIs"],
    features: [
      "iOS and Android",
      "Launch and store submission support",
      "Authentication, notifications, and analytics",
      "Backend and API integration",
      "30 days of post-launch support",
    ],
  },
  {
    id: "full",
    price: "$12k",
    name: "Full MVP",
    timeline: "6–8 weeks",
    description: "Custom backend, admin portal, and deeper integrations for a product that has to scale.",
    note: "Fixed price, split across 5 milestones. Source code, documentation, and IP transfer are yours.",
    stack: ["Flutter or React Native", "Custom backend and APIs", "Next.js admin portal"],
    features: [
      "iOS and Android",
      "Launch and store submission support",
      "30 days of post-launch support",
      "Advanced third-party integrations",
      "Custom backend and admin portal",
    ],
  },
];

export const costFactors = [
  {
    title: "Platforms and devices",
    description:
      "A product built for web, iOS, Android, or several platforms requires different levels of design, testing, and release work. Shared technology can reduce duplication, but each platform still needs careful attention.",
  },
  {
    title: "Features and user journeys",
    description:
      "Features such as authentication, payments, messaging, maps, and offline syncing each add design and engineering work. A focused MVP with 3–5 essential features is usually closer to $5k, while larger products with custom flows can move toward $12k.",
  },
  {
    title: "Backend and integrations",
    description:
      "Firebase or Supabase can keep a straightforward product efficient. Custom APIs, admin dashboards, payment systems, CRMs, ERPs, and other third-party services require additional backend planning and development.",
  },
  {
    title: "Visual design and interaction detail",
    description:
      "Every project includes thoughtful interface design. Custom animation, a large design system, advanced interactions, or a completely new visual language requires more design and implementation time.",
  },
];

export const noPayItems = [
  {
    title: "Discovery and project scoping",
    description: "Your initial call and written proposal are free, even when you decide not to move forward.",
  },
  {
    title: "Fixes for issues caused by our work",
    description:
      "If a bug is caused by something we built, we fix it at no extra cost during the project and for 30 days after launch.",
  },
  {
    title: "Source code and full ownership",
    description:
      "You receive the source code and ownership rights included in the engagement, with no hidden licensing fees or unnecessary vendor lock-in.",
  },
  {
    title: "Project communication and reporting",
    description:
      "Daily updates, weekly demos, project-board access, and direct communication with the team are included in the agreed project price.",
  },
];

export const comparisonPricing = {
  headers: ["Stratix Solutions", "Large agency", "Solo freelancer"],
  rows: [
    { label: "Typical MVP cost", values: ["$5k–$12k, fixed", "$50k–$150k+", "$3k–$15k, variable"] },
    { label: "Pricing model", values: ["Fixed scope with milestone payments", "Often hourly or retainer-based", "Varies by individual and scope"] },
    { label: "Timeline", values: ["2–8 weeks, with 90% on-time delivery", "Often several months with larger teams", "Depends heavily on one person’s availability"] },
    { label: "Team", values: ["Vetted engineers with a technical lead", "Larger delivery team with account management", "One person covering every responsibility"] },
    { label: "UI/UX, QA & launch support", values: ["Included", "May be billed separately", "Depends on the freelancer’s service range"] },
    { label: "Code & IP", values: ["Full source code and IP ownership", "Terms vary by agency contract", "Terms vary and may be informal"] },
  ],
};

export const comparisonServices = {
  headers: ["Stratix Solutions", "Solo freelancer", "High-volume agency"],
  rows: [
    { label: "Pricing model", values: ["Fixed scope with milestone payments", "Usually hourly with changing scope", "Often hourly across a larger delivery team"] },
    { label: "Timeline", values: ["2–8 weeks, with 90% on-time delivery", "Depends heavily on one person’s availability", "Timelines may extend across multiple handoffs"] },
    { label: "Team", values: ["Vetted engineers with a technical lead", "One person covering every responsibility", "A rotating team with mixed experience levels"] },
    { label: "Code & IP", values: ["Full source code and IP ownership", "Terms vary and may be informal", "Contract terms may include licensing restrictions"] },
    { label: "UI/UX, QA & launch support", values: ["Included", "Depends on the freelancer’s service range", "May be billed separately"] },
    { label: "Communication", values: ["Daily standups, weekly demos, Slack", "Communication depends on one person’s availability", "Communication often runs through account management"] },
    { label: "Bug fixes", values: ["Free during build + 30 days", "Fixes may be billed separately", "Usually handled through a billable change request"] },
  ],
};


export const contact = {
  email: "hello@stratixsolutions.com",
  responseTime: "Replies within one business day",
  serving: "Remote-first, working with clients across the US, UK, and 15+ countries.",
  note: "Tell us what you’re building, where you are in the process, and what support you need. We use your details only to respond to your inquiry.",
  businessHours: [
    { days: "Monday – Friday", hours: "9:00 AM – 5:00 PM" },
    { days: "Saturday – Sunday", hours: "Closed" },
  ],
  projectTypes: [
    "AI Solution",
    "Mobile App",
    "Web Platform / SaaS",
    "UI/UX Design",
    "Ongoing Engineering Support",
    "Not sure yet",
  ],
  budgetRanges: [
    "Under $5k",
    "$5k–$8k",
    "$8k–$12k",
    "$12k–$25k",
    "$25k+",
    "Not sure yet",
  ],
};

export const faqs = [
  {
    q: "How much does an MVP cost?",
    a: "Most MVPs we build cost between $5,000 and $12,000, fixed price. The final number depends on platforms, feature count, and backend needs. You get the exact price on a free scoping call  before any work starts, and it doesn't change mid-build.",
  },
  {
    q: "How long does a build take?",
    a: "A lean MVP ships in 2–3 weeks. A standard MVP takes 4–6 weeks. A full MVP with custom backend and admin portal takes 6–8 weeks. We agree on the timeline during scoping and track it with weekly demos.",
  },
  {
    q: "Why choose Stratix Solution over a larger agency?",
    a: "We are a product engineering company, not an agency selling hours. You get a senior team, a fixed price, daily code pushes, and weekly demos  at a fraction of US or EU agency rates. Same product quality, without the overhead you'd be paying for.",
  },
  {
    q: "What happens if a bug ships after launch?",
    a: "We fix it. Every build includes post-launch support, and critical bugs are handled first  at no extra cost during the support window.",
  },
  {
    q: "Do I own the source code?",
    a: "Yes. Full ownership. Source code, documentation, and IP transfer to you on final payment. No lock-in, no licensing games.",
  },
  {
    q: "Can I hire an engineer to join my existing team?",
    a: "Yes. Beyond fixed-scope builds, we offer ongoing engineering support on an hourly basis  useful when you need senior capacity inside your existing product team.",
  },
  {
    q: "What's included in every engagement?",
    a: "Scoping, design, engineering, QA, launch support, and 30 days of post-launch fixes. Plus full transparency: daily git pushes, weekly demos, and a shared progress board from day one.",
  },
  {
    q: "How do you communicate during the build?",
    a: "Daily updates through a shared board, weekly live demos, and direct access to the team on Slack or email. You never wonder where your product stands.",
  },
];

export const pricingFaqs = [
  {
    q: "What if my product doesn't fit these plans?",
    a: "Then we scope it individually. The plans cover most MVPs, but custom products get a custom fixed quote  same rules: locked price, milestones, weekly demos.",
  },
  {
    q: "What does ongoing support cost after launch?",
    a: "After the included 30 days, ongoing engineering support is billed hourly or as a monthly retainer  agreed in advance, with the same transparency as the build.",
  },
  {
    q: "Are there any hidden costs?",
    a: "No. Third-party costs  app store accounts, hosting, paid APIs  are listed in the scope before you sign. Our price doesn't move after that.",
  },
];
