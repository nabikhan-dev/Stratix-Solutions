
export const pageHeroes = {
  about: {
    eyebrow: "About Stratix",
    title: "We build products, not just software.",
    description:
      "Stratix Solution is a product engineering company. We take ideas from strategy to launch  design, engineering, AI, and support in one team  so businesses ship faster, with more clarity and less friction.",
  },
  services: {
    eyebrow: "What we do",
    title: "AI, UI/UX, app, and web  engineered to launch.",
    description:
      "Stratix Solution helps teams turn ideas into working AI tools, product interfaces, mobile apps, and responsive web platforms. Every build runs on a transparent process: scoped milestones, daily progress, weekly demos, QA, release, and support.",
  },
  work: {
    eyebrow: "Our work",
    title: "Proven results. Full transparency.",
    description:
      "Explore how we've helped brands launch digital products  and see exactly how we build them. Daily standups, weekly demos, daily git pushes. 90% on-time delivery.",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Transparent pricing, every time.",
    description:
      "No “contact us for a quote” games. See real numbers below, or read exactly how we price fixed-scope product builds, app-store launches, and ongoing engineering support.",
  },
  products: {
    eyebrow: "Solutions",
    /** Rendered with `titleAccent` in signal colour on the second half. */
    title: "Practical services,",
    titleAccent: "built around your business.",
    description:
      "Stratix Solutions focuses on service delivery: AI systems, UI/UX design, mobile apps, and responsive web platforms designed for your workflow, customers, and launch goals.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Stratix Solutions",
    description:
      "Deep dives into the technology, strategy, and product logic shaping the way we build. Practical lessons from real engagements, not theory.",
  },
  faq: {
    eyebrow: "Support",
    title: "Frequently asked questions",
    description:
      "Everything you need to know about timelines, pricing, technology, and working with us.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Send your brief, or drop us an email.",
    description:
      "Tell us about your project using the form, or email us directly. Either way, you’ll hear back with next steps within one business day.",
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
  },
} as const;

/** Copy for each section masthead, keyed by the section it belongs to. */
export const sections = {
  homeServices: {
    eyebrow: "WHAT WE BUILD",
    title: "A complete product suite, built into everything we ship.",
    description:
      "Every product gets the same foundation: clear strategy, clean design, solid engineering, and support after launch.",
    cardLink: "Learn more",
    cta: { label: "Explore Services", href: "/services" },
  },
  homeTech: {
    eyebrow: "OUR STACK",
    title: "Technologies and AI we master.",
    description:
      "We choose proven tools, not trends. React, Next.js, Node.js, TypeScript, Python, Firebase, Supabase, PostgreSQL, and leading AI models  selected per product, never by habit.",
  },
  homeProjects: {
    eyebrow: "SELECTED WORK",
    title: "Products that shipped. Results you can check.",
    description:
      "A short list of recent products  what we built, and what changed for the business after launch.",
    cta: { label: "View All Projects", href: "/work" },
  },
  homeProcess: {
    eyebrow: "HOW WE WORK",
    title: "How we turn ideas into products.",
    description: "Five steps. No mystery. You see progress every single day.",
    cta: { label: "See Our Full Process", href: "/work#process" },
  },
  homeTestimonials: {
    eyebrow: "CLIENT FEEDBACK",
    title: "Don't just take our word for it.",
    description: "What founders and product leaders say after working with us.",
  },
  homePricing: {
    eyebrow: "PRICING",
    title: "Fixed price for scoped builds.",
    description:
      "Most MVPs land between $5,000 and $12,000 and ship in 2–8 weeks. We lock the scope and the price on a free call  and if the build runs long, that's our cost, not yours.",
  },
  faq: {
    eyebrow: "QUESTIONS",
    title: "Frequently asked questions.",
  },
  workVisibility: {
    eyebrow: "How we work",
    title: "Full visibility, every day",
  },
  workWeekByWeek: {
    eyebrow: "BUILD TIMELINE",
    title: "Week by week: a typical 6-week MVP.",
    /** Split around an inline link to the pricing page. */
    descriptionLead:
      "Every project is scoped individually  lean MVPs ship in 2–3 weeks, complex ones take up to 8  but a standard build follows this shape. See",
    descriptionLinkLabel: "pricing",
    descriptionLinkHref: "/pricing",
    descriptionTail: "for what each tier includes.",
  },
  servicesDisciplines: {
    eyebrow: "WHAT WE DO",
    title: "Four disciplines, one delivery team.",
    description:
      "Select a service to see how we approach the build. Same team, same process, same standard  across all four.",
  },
  servicesClosingCta: {
    title: "Not sure which service fits?",
    description:
      "Most products need more than one. Tell us what you’re building on a free call and we’ll map the shortest path to launch  with a fixed price attached.",
    cta: { label: "Book a Free Call", href: "/contact" },
  },
  productsGrid: {
    eyebrow: "Our products",
    title: "Choose the build your team needs",
    description:
      "Each engagement starts with clear scope, practical milestones, and a delivery path that fits the product.",
  },
  pricingTiers: {
    eyebrow: "PRICING",
    title: "Fixed price for scoped builds. Hourly for ongoing support.",
    description:
      "We price product work around clear scope. For fixed-price builds, we define the feature list together on a free call, lock the price, and split it into milestones. If the build takes longer than estimated, that’s our problem, not your invoice. Most MVPs land between $5,000 and $12,000 and ship in 2–8 weeks.",
    rationale:
      "Why are we priced below US or EU firms quoting $50k+ for the same product? Efficient cross-platform stacks, a lean senior team, and ruthless scoping before we quote. Same quality. Less overhead.",
  },
  /** The money questions, below the plans on /pricing. */
  pricingFaq: {
    eyebrow: "Pricing FAQ",
    title: "How much does an app cost?",
  },
  blogExplorer: {
    featuredBadge: "Featured Article",
    readLabel: "Read Article",
    empty: "No articles in this category yet  check back soon.",
  },
} as const;

/** The About page, section by section. */
export const aboutPage = {
  stats: [
    {
      label: "Founded",
      value: "2026",
      desc: "A modern product engineering company built for how software is made now.",
    },
    {
      label: "Products shipped",
      value: "10+",
      desc: "High-performance applications delivered to production globally.",
    },
    {
      label: "Engineers and designers",
      value: "8+",
      desc: "A lean senior team  no juniors learning on your budget.",
    },
  ],
  mission: {
    eyebrow: "Why we exist",
    title: "Our mission.",
    body: "Helping ambitious businesses transform ideas into scalable digital products. Most companies don’t fail at software because of code  they fail because strategy, design, engineering, and AI live in separate silos. We put them in one team, so products ship coherent, on time, and ready to grow.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Our Mission",
    bullets: [
      "One team for strategy, design, engineering, and AI  no handoffs between vendors.",
      "Full operational visibility: daily code pushes, live boards, weekly demos.",
      "Long-term partnership  we stay accountable after launch, not just until it.",
    ],
  },
  /** The two alternating feature bands below the mission. */
  features: [
    {
      id: "built-for-business",
      eyebrow: "What you get",
      title: "Built for how your business runs.",
      body: "From UI/UX design to robust backend architecture, we bring the engineering that usually lives across three vendors into one clear system  better visibility, stronger control, one accountable team.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      imageAlt: "Built for your business",
      items: [
        "Custom software and web platforms",
        "iOS and Android app development",
        "Generative AI and LLM integrations",
      ],
    },
    {
      id: "quality-and-speed",
      eyebrow: "Quality control",
      title: "Quality and speed, under control.",
      body: "Speed without quality is a rewrite waiting to happen. Every build runs on automated pipelines, pre-deployment checks, and performance audits  so shipping fast never means shipping fragile.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      imageAlt: "Quality Control",
      items: [
        "Automated CI/CD pipelines",
        "Smart pre-deployment checks",
        "End-to-end performance audits",
      ],
    },
  ],
  /** Closing vision band and the page's one CTA. */
  closingCta: {
    title: "Where we’re going.",
    description:
      "Our vision is simple: become one of the world’s most trusted product engineering companies  by building exceptional digital products and sharing what we learn with the global technology community.",
    closer: "Have an idea worth building? Let’s scope it together.",
    cta: { label: "Book a Free Call", href: "/contact" },
  },
} as const;

/** The Contact page's standing labels. Addresses and hours live in `contact`. */
export const contactPage = {
  emailBriefSubject: "Project brief",
  emailBriefLabel: "Email Your Brief",
  form: {
    title: "Or send your brief.",
    description:
      "Tell us about your product and we’ll reply within one business day  usually a few questions, then a proposal.",
    /** Shown in place of the form's status line once a brief validates. */
    success:
      "Got it. Your brief is with our team  expect a reply within one business day. Want to move faster? Book a free call and we’ll scope it live.",
  },
} as const;
