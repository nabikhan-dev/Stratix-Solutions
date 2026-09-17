export const blogCategories = [
  "All Insights",
  "AI Development",
  "UI/UX Design",
  "App Development",
  "Web Development",
  "Business Growth",
] as const;

export type BlogFilter = (typeof blogCategories)[number];
export type BlogCategory = Exclude<BlogFilter, "All Insights">;

export type BlogSection = {
  heading?: string;
  body: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  author: { name: string; role: string };
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-adoption-strategic-implementation",
    title: "Navigating the AI Frontier: Strategic Implementation for Growing Teams",
    excerpt:
      "Understanding the shift from reactive to proactive workflows as AI becomes a core part of everyday operations, and how to roll it out without disrupting what already works.",
    category: "AI Development",
    date: "Aug 2, 2026",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    featured: true,
    author: { name: "Youssef Nabhan", role: "Founder & Lead Engineer" },
    sections: [
      {
        heading: "From feature to operating system",
        body: "Most teams still treat AI as a feature bolted onto an existing product: a chat widget, a summarizer, a smart suggestion box. The teams that get real value from it treat it differently — as an operating layer that touches support, onboarding, internal tooling, and decision-making all at once. That shift in framing changes almost everything about how a rollout should be scoped.",
      },
      {
        heading: "Start where the data already lives",
        body: "The fastest wins come from processes that already generate structured signal: support tickets, sales calls, onboarding forms, internal documentation. Pointing a well-scoped model at data you already collect beats building a novel AI-native feature from scratch, because you are automating a decision your team already makes today instead of inventing a new one.",
      },
      {
        heading: "Keep a human in the loop on the first pass",
        body: "Every successful rollout we have shipped kept a person reviewing AI output for the first few weeks in production, not because the model was unreliable, but because that review period is where you learn the actual failure modes of your data — the edge cases no spec anticipated. Removing the human step too early is the single most common reason AI projects get rolled back.",
      },
      {
        heading: "Measure adoption, not just accuracy",
        body: "A model that is 95% accurate but ignored by the team using it has delivered zero value. Track how often people actually rely on the AI-assisted path versus falling back to the manual one — that adoption curve tells you more about whether the implementation is working than any benchmark score.",
      },
    ],
  },
  {
    slug: "cybersecurity-basics-for-startups",
    title: "Cybersecurity for Startups: A Non-Technical Guide",
    excerpt:
      "Protecting your product doesn't require an enterprise budget, just a strategic mindset and the right foundation before you scale.",
    category: "Web Development",
    date: "Jul 30, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop",
    author: { name: "Youssef Nabhan", role: "Founder & Lead Engineer" },
    sections: [
      {
        heading: "Security is a process, not a product",
        body: "Founders often ask what tool will make their product secure. The honest answer is that no single tool does — security is a set of habits baked into how the team ships: how secrets are stored, how access is granted, how dependencies are updated. Getting those habits right early costs almost nothing and prevents the expensive fires later.",
      },
      {
        heading: "The four things to get right before launch",
        body: "Enforce authentication and role-based access from day one rather than retrofitting it. Keep secrets out of the codebase and in an environment manager. Patch dependencies on a schedule instead of waiting for a CVE alert. And log enough to reconstruct what happened after an incident, without logging so much that you are storing data you never needed.",
      },
      {
        heading: "What actually gets exploited in practice",
        body: "In our experience, breaches on small products rarely involve a sophisticated exploit. They involve a leaked API key in a public repository, an admin panel with no rate limiting, or a third-party integration granted more access than it needed. A short checklist review before every release catches almost all of these.",
      },
    ],
  },
  {
    slug: "ecommerce-scaling-peak-traffic",
    title: "The E-Commerce Scaling Playbook: Handling Peak Traffic Without Breaking",
    excerpt:
      "How growing storefronts handle massive traffic surges during launches and sales events while keeping the experience fast and reliable.",
    category: "Business Growth",
    date: "Jul 24, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    author: { name: "Layla Haddad", role: "Head of Product Design" },
    sections: [
      {
        heading: "Traffic spikes are a design problem too",
        body: "It is tempting to treat peak-traffic readiness as purely an infrastructure question, but a large share of checkout failures during a sale come from interface decisions: pages that re-render too much, forms that don't tolerate slow network responses gracefully, and flows with no clear loading state that make anxious shoppers double-click a purchase button.",
      },
      {
        heading: "Cache aggressively, checkout carefully",
        body: "Product listings, category pages, and marketing content can be cached hard at the edge with very short revalidation windows. Cart and checkout state cannot — that is where you invest engineering time, in keeping the payment path lean, minimizing round trips, and pre-warming the services it depends on before a known traffic event.",
      },
      {
        heading: "Rehearse the event before it happens",
        body: "Every retailer we have worked with that avoided a launch-day outage did one thing in common: they load-tested the exact user journey, not just the homepage, days before the real event, and fixed what broke while it was still cheap to fix.",
      },
    ],
  },
  {
    slug: "why-nextjs-for-performance-focused-products",
    title: "Why Next.js Is Becoming the Default for Performance-Focused Products",
    excerpt:
      "Server-side rendering, edge caching, and the App Router are reshaping how modern products are built, and what it means for your SEO and load times.",
    category: "Web Development",
    date: "Jul 18, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    author: { name: "Youssef Nabhan", role: "Founder & Lead Engineer" },
    sections: [
      {
        heading: "The shift back to the server",
        body: "For years, the default assumption was to ship a client-heavy single-page app and let the browser do the work. That trade-off made sense when server rendering was painful to maintain. It makes far less sense now that frameworks handle streaming, caching, and partial rendering for you — the pendulum has swung back toward doing more on the server, closer to the data.",
      },
      {
        heading: "What this actually changes for your product",
        body: "Pages render meaningfully faster on a first visit, which matters most for the visitors who never come back if that first load is slow. Search engines see fully rendered content instead of an empty shell. And because rendering logic lives in one place, the same product can serve a fast marketing site and a data-heavy dashboard without maintaining two separate architectures.",
      },
      {
        heading: "Where it still takes real engineering judgment",
        body: "Server rendering is not a free win. Deciding what runs on the server versus the client, where to cache, and how to handle authentication across that boundary still requires a team that has done it before. The framework removes boilerplate; it does not remove the need for architecture decisions.",
      },
    ],
  },
  {
    slug: "generative-ai-creative-logic-for-products",
    title: "Generative AI: Building Creative Logic Into Your Product",
    excerpt:
      "A practical look at weaving generative AI into product workflows without losing the human judgment that makes a brand feel like itself.",
    category: "AI Development",
    date: "Jul 11, 2026",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    author: { name: "Layla Haddad", role: "Head of Product Design" },
    sections: [
      {
        heading: "Generation is the easy part",
        body: "Any team can wire up a model that generates copy, images, or code. The hard part — and the part that actually differentiates a product — is constraining that generation so it stays on-brand, stays accurate, and fails in predictable ways when it doesn't know the answer.",
      },
      {
        heading: "Design the guardrails before the prompt",
        body: "The prompt is the last thing to write, not the first. Before that, define what the feature is allowed to say, what tone it should hold, and what it should do when it is uncertain — a well-designed fallback state does more for user trust than a marginally better model.",
      },
      {
        heading: "Treat output as a draft, not a decision",
        body: "The products that use generative AI well position it as a fast first draft that a person refines, not a final answer delivered with false confidence. That framing alone prevents most of the brand and trust issues we see teams run into after shipping their first AI feature.",
      },
    ],
  },
  {
    slug: "digital-transformation-vs-digital-optimization",
    title: "Digital Transformation vs. Digital Optimization: What's the Difference?",
    excerpt:
      "Distinguishing between making old processes faster and rethinking them entirely, and how to know which one your business actually needs.",
    category: "Business Growth",
    date: "Jul 4, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    author: { name: "Layla Haddad", role: "Head of Product Design" },
    sections: [
      {
        heading: "Two different problems, one budget line",
        body: "Digital optimization takes an existing process — a spreadsheet-based approval flow, a manual reporting cycle — and makes it faster without changing its shape. Digital transformation questions whether the process should exist in that shape at all. Both are legitimate, but they call for different teams, timelines, and success metrics, and conflating them is why a lot of internal tooling projects stall.",
      },
      {
        heading: "How to tell which one you need",
        body: "If the current process works but is slow or error-prone, you likely need optimization: automate the manual steps, add validation, cut the handoffs. If the process exists mainly because of a historical constraint that no longer applies, you likely need transformation: a rebuild that starts from what the business needs today, not from the shape of the old system.",
      },
      {
        heading: "Sequence them, don't run them together",
        body: "The teams that get the best results optimize first to buy breathing room, then use what they learned from that process to scope the larger transformation properly. Running both at once tends to produce a rebuild based on the same assumptions as the system it was meant to replace.",
      },
    ],
  },
  {
    slug: "choosing-a-tech-stack-for-your-mvp",
    title: "Choosing a Tech Stack for Your MVP: A Founder's Checklist",
    excerpt:
      "The framework, backend, and platform decisions that matter in week one, and the ones that are safe to defer until after you have real users.",
    category: "App Development",
    date: "Jun 27, 2026",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    author: { name: "Youssef Nabhan", role: "Founder & Lead Engineer" },
    sections: [
      {
        heading: "Optimize for speed to real feedback",
        body: "The purpose of an MVP stack is not to be the stack you run at scale — it is to get a working product in front of real users as fast as possible. Choices like Firebase or Supabase over a custom backend, or a cross-platform framework over two native codebases, are not compromises. They are the correct choice for a product that does not yet know its own requirements.",
      },
      {
        heading: "Decisions worth getting right early",
        body: "Data modeling, authentication strategy, and your core navigation architecture are expensive to change later, so they deserve real thought before week one ends. Everything else — exact hosting provider, analytics vendor, design polish — can be swapped without touching the product's foundation.",
      },
      {
        heading: "Decisions safe to defer",
        body: "Skip the custom admin dashboard, the elaborate design system, and the multi-region infrastructure until you have paying users who need them. Every hour spent on infrastructure your first hundred users will never notice is an hour not spent finding out whether the product solves a real problem.",
      },
    ],
  },
];
