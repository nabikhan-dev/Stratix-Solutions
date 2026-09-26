# Stratix Solutions — website

A futuristic, animated marketing site for Stratix Solutions. The site is
built around AI development, app development, and web development services
using Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and
Lenis smooth scroll.

## What's in here

- **10 pages**: Home, Services, Solutions, Our Work, How We Work, Pricing,
  About, Contact, FAQ, Privacy Policy.
- **Working pricing calculator** (`/pricing`) — the Auth category uses the
  real per-feature prices from your content and updates a live total by
  platform (iOS / Android / Both). Every other feature category (Core, Chat,
  Payments, Marketplace, etc.) is shown with its real supplied feature
  count; since the source content didn't include per-item prices for those
  categories, the calculator is honest about that and defers exact pricing
  to a scoping call rather than inventing numbers.
- **Company capability section**: AI services, app development, and web
  development presented without individual profiles.
- **Solutions page**: service-focused cards for AI systems, mobile apps,
  responsive websites, dashboards, and portals.
- **Interactive comparison tables** (Stratix Solutions vs. agency vs.
  freelancer, and Stratix Solutions vs. solo freelancer vs. offshore mill)
  with an accessible stacked layout on mobile.
- Custom cursor (desktop only, disabled on touch devices and under
  `prefers-reduced-motion`), magnetic buttons, scroll reveals, a signature
  animated "trajectory" motif in the hero (idea → design → build → app
  store), and a scroll-progress process timeline on **How We Work**.
- Contact form with real client-side validation. **It does not currently
  send email anywhere** — see the integration note below.

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

Run `npm run lint` and `npm run build` before shipping changes.

## Assets you should provide

Nothing here uses fake stock photography or invented logos, but a few real
assets will make the site feel finished:

- **Brand mark** — add a real Stratix Solutions logo/mark when available.
- **Service visuals** — the current service visuals use abstract SVG/CSS
  treatments. Replace them with real screenshots or case-study visuals when
  available.
- **Favicon** — replace `src/app/favicon.ico` with a real mark.

## Form & Calendly integration

- **Contact form** (`src/components/layout/ContactForm.tsx`): validation is
  real, but submission is not wired to a backend. The component has a clear
  `INTEGRATION POINT` comment at the top — connect it to Formspree, Resend,
  a Next.js API route, or your own backend. Until then it only shows an
  on-screen confirmation, and never claims to have sent an email.
- **Calendly / scheduling**: the Calendly link lives in `contact.calendly`
  in `src/data/content.ts` and is used by the "Book a Call" link on
  `/contact`. Update it there, or drop a Calendly inline embed into
  `src/app/contact/page.tsx`, once you have a real scheduling link.

## Deploying to Vercel

```bash
npm i -g vercel
vercel
```

Or connect the GitHub repo at vercel.com/new — no special configuration is
needed beyond the default Next.js preset.

## Project structure

```
src/
  app/                 route segments (one folder per page) + layout, globals.css
  components/
    agency-landing/    hero, services, tech stack, projects, process,
                        testimonials, pricing, FAQ, footer — the sections
                        that make up the homepage, and the shared footer
                        rendered globally from the root layout
    layout/            GlobalNavbar, Cursor, SmoothScroll, SectionHeading,
                        PageHero, ComparisonBlock, ContactForm
    motion/             Reveal, Magnetic — shared animation primitives
    services/           service switcher (used on /services)
    pricing/            calculator, tier cards (used on /pricing)
    work/               work-portfolio grid, process timeline, week-by-week
  data/content.ts       all site copy, numbers, and pricing — single source of truth
  lib/utils.ts          small cn() classname helper
```

Every page shares the same navbar (`GlobalNavbar`) and footer (`AgencyFooter`)
from the root layout. Standalone pages (contact, faq, how-we-work, pricing,
privacy, products, services) open with the shared `PageHero` component and
use `SectionHeading` for the sections below it, so the eyebrow/heading style
only has to be defined once.

## Notes on content

Core copy now presents Stratix Solutions as a service company for AI, app
development, and web development. Replace placeholder contact details,
brand assets, and case-study visuals with final company materials before a
public launch.
