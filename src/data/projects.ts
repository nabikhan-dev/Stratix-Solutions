export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  gallery: string[];
  results: string[];
  metric: { value: string; label: string };
  bg: string;
  span: string;
  light?: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "AI Search Landing Page",
    description: "A conversion-focused landing page for an AI search product. We rebuilt the page around one clear message and measurable proof. Signup conversion rose 45% after launch.",
    tags: ["Figma Design", "Next.js Development", "Tailwind CSS", "OpenAI"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
    ],
    results: [
      "Increased landing page conversion rate by 340%",
      "Reduced bounce rate by 45% with interactive 3D elements",
      "Implemented seamless OpenAI integration for personalized copy",
      "Achieved a perfect 100/100 Lighthouse performance score",
      "Decreased average page load time to under 0.8 seconds"
    ],
    metric: { value: "+45%", label: "CONVERSION RATE" },
    bg: "bg-[#3a3a3a]",
    span: "lg:col-span-7",
  },
  {
    id: 2,
    title: "HPA Mobile App",
    description: "A premium iOS fitness app with biometric data tracking and personalized coaching. Built with wearable integrations, it passed store review first try and crossed 120,000 downloads.",
    tags: ["React Native", "UI Design", "HealthKit", "Node.js"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526506114620-1a6572eb0481?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
    ],
    results: [
      "Successfully integrated with Apple HealthKit and Google Fit",
      "Processed over 1M+ daily biometric data points in real-time",
      "Achieved 4.9/5 stars on the Apple App Store with 10k+ reviews",
      "Increased Daily Active Users (DAU) by 250% post-redesign",
      "Implemented a secure, HIPAA-compliant backend architecture"
    ],
    metric: { value: "120k", label: "DOWNLOADS" },
    bg: "bg-[#fafafa]",
    span: "lg:col-span-5",
    light: true,
  },
  {
    id: 3,
    title: "Workspace Onboarding",
    description: "A seamless onboarding flow for a B2B collaboration platform. We cut signup steps and rebuilt the first-run experience. New-user activation improved 3.2x.",
    tags: ["Web App", "UX Design", "Framer Motion", "React"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
    ],
    results: [
      "Reduced user drop-off during onboarding by 68%",
      "Increased Day-7 retention rate by 45% for new accounts",
      "Automated the workspace provisioning process, saving hours of manual work",
      "Designed a frictionless invite system that boosted viral growth",
      "Integrated product tours utilizing highly performant Framer Motion animations"
    ],
    metric: { value: "3.2x", label: "ACTIVATION RATE" },
    bg: "bg-white",
    span: "lg:col-span-6",
    light: true,
  },
  {
    id: 4,
    title: "Health Data Platform",
    description: "A health platform for monitoring biomarkers in real time. Designed for medical professionals  secure, fast, and compliant  it reached the top 5 in its category.",
    tags: ["Dashboard", "Data Viz", "D3.js", "TypeScript"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    ],
    results: [
      "Built interactive, real-time D3.js charts rendering 100k+ data points",
      "Ensured strict compliance with healthcare data regulations (HIPAA/GDPR)",
      "Reduced report generation time from hours to seconds",
      "Implemented granular role-based access control (RBAC)",
      "Created a unified design system tailored for high data density"
    ],
    metric: { value: "Top 5", label: "IN CATEGORY" },
    bg: "bg-[#d7cbc0]",
    span: "lg:col-span-6",
  },
  {
    id: 5,
    title: "Fintech Analytics",
    description: "An enterprise-grade financial data visualization suite for modern finance teams. Clearer data, faster decisions  daily engagement more than doubled.",
    tags: ["Next.js", "Framer Motion", "Stripe API", "GraphQL"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    ],
    results: [
      "Processed over $50M in simulated transaction data without latency",
      "Engineered a scalable GraphQL layer to unify 5 disparate legacy APIs",
      "Implemented a comprehensive charting library for financial modeling",
      "Achieved sub-200ms API response times utilizing Redis caching",
      "Integrated seamless export functionality for CSV and PDF reports"
    ],
    metric: { value: "+110%", label: "ENGAGEMENT" },
    bg: "bg-[#0f0f11]",
    span: "lg:col-span-7",
  },
  {
    id: 6,
    title: "E-commerce Redesign",
    description: "A complete storefront overhaul for a high-volume fashion brand. We optimized the full shopping journey, from product discovery to checkout. Revenue grew 2.5x.",
    tags: ["UI/UX", "Shopify", "Liquid", "Animations"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
    ],
    results: [
      "Increased mobile checkout completion rate by 42%",
      "Reduced cart abandonment via a redesigned, distraction-free checkout flow",
      "Boosted Average Order Value (AOV) through AI-driven upsell components",
      "Implemented a headless architecture for lightning-fast page transitions",
      "Designed an immersive, lookbook-style product detail page"
    ],
    metric: { value: "2.5x", label: "REVENUE" },
    bg: "bg-[#f5f0ea]",
    span: "lg:col-span-5",
    light: true,
  },
];
