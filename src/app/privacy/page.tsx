import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/layout/PageHero";
import BlogViewPreference from "@/components/privacy/BlogViewPreference";
import { contact } from "@/data/content";
import { pageHeroes } from "@/data/copy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Stratix Solutions handles inquiry details, technical data, browser storage, and privacy requests.",
};

type PrivacySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const sections: PrivacySection[] = [
  {
    title: "Who we are",
    paragraphs: [
      `Stratix Solutions operates stratixsolutions.com and is responsible for the personal information described in this notice. You can contact us about privacy at ${contact.email}.`,
    ],
  },
  {
    title: "Information we handle",
    paragraphs: [
      "When you contact us by email or send a project inquiry, we may receive your name, email address, company details, project type, budget range, message, and any other information you choose to include.",
      "Our website and hosting infrastructure may also process limited technical information needed to deliver and protect the site, such as your IP address, browser and device type, requested pages, timestamps, and referring page. We do not ask for sensitive personal information through this website.",
    ],
  },
  {
    title: "How and why we use information",
    paragraphs: [
      "We use information only for clear business and website-operating purposes. Depending on the circumstances, our legal basis is taking steps at your request before a contract, performing a contract, complying with a legal obligation, or our legitimate interests in answering inquiries and running a secure business website.",
    ],
    bullets: [
      "Respond to inquiries, arrange calls, understand project requirements, and prepare proposals.",
      "Provide services and maintain business, tax, accounting, and legal records if you become a client.",
      "Operate, secure, troubleshoot, and improve the website.",
      "Measure aggregate readership without profiling individual visitors.",
    ],
  },
  {
    title: "Cookies, storage, and third-party resources",
    paragraphs: [
      "The public website does not use advertising cookies or third-party behavioural analytics. Blog articles use first-party session storage to remember that a specific article was viewed in the current browser session, preventing repeat views in the same tab from inflating the aggregate counter. The marker contains only the article identifier, expires with the browser session, and is not used to identify you or track you across websites. If you opt out below, we store that preference in first-party local storage so it persists until you re-enable counting or clear your browser storage.",
      "A signed, strictly necessary session cookie is used only when an authorised team member signs in to the private administration dashboard. Public visitors do not receive this admin cookie.",
      "Fonts are loaded from Google Fonts. When your browser requests those files, Google receives connection information such as your IP address and browser details under its own privacy terms.",
    ],
  },
  {
    title: "Sharing and international transfers",
    paragraphs: [
      "We do not sell or rent personal information, and we do not share it for cross-context behavioural advertising. We may share limited information with service providers that help us operate the website, email, hosting, security, and business systems; with professional advisers; or when required by law or necessary to protect legal rights.",
      "Some providers may process information in countries other than yours. Where data-protection law requires it, we use an approved transfer mechanism or other appropriate safeguard.",
    ],
  },
  {
    title: "How long we keep information",
    paragraphs: [
      "We keep inquiry information only while we respond and for as long as reasonably needed for follow-up, record-keeping, or legal claims. If an inquiry becomes a client engagement, relevant records are kept for the engagement and for any period required by tax, accounting, or other applicable law.",
      "The blog-view marker lasts only for the browser session. Aggregate article counts do not identify individual visitors. Technical logs are retained according to the security and retention settings of our hosting providers.",
    ],
  },
  {
    title: "Your privacy rights",
    paragraphs: [
      `Depending on where you live, you may have rights to access, correct, delete, restrict, or receive a copy of your personal information, or to object to certain uses. You may also complain to your local data-protection authority. To make a request, email ${contact.email}. We may need to verify your identity before completing it.`,
    ],
  },
  {
    title: "Security and children",
    paragraphs: [
      "We use reasonable technical and organisational safeguards designed to protect the information we handle. No internet transmission or storage system can be guaranteed completely secure.",
      "This website and our services are intended for businesses and adults. We do not knowingly collect personal information from children through the public website. If you believe a child has provided information, contact us so we can review and delete it where appropriate.",
    ],
  },
  {
    title: "Changes and contact",
    paragraphs: [
      `We may update this notice when our website, services, or legal obligations change. The date at the top shows the latest revision. Questions or privacy requests can be sent to ${contact.email}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow={pageHeroes.privacy.eyebrow}
        title={pageHeroes.privacy.title}
        description="A clear explanation of what information we handle, why we use it, and the choices available to you."
      />

      <section className="container-px py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-signal">
                Last updated September 21, 2026
              </p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                This notice applies when you browse our website, read our blog, contact us about a project, or work with us as a client.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 divide-y divide-line border-y border-line">
            {sections.map((section, index) => (
              <Reveal key={section.title} delay={Math.min(0.04 + index * 0.025, 0.2)}>
                <article className="grid grid-cols-1 gap-4 py-9 sm:grid-cols-[3rem_1fr] sm:gap-7 sm:py-12">
                  <span className="font-mono text-xs font-medium text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-primary">
                      {section.title}
                    </h2>

                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-[15px] leading-7 text-muted sm:text-base sm:leading-8">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets && (
                      <ul className="mt-5 space-y-3">
                        {section.bullets.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-muted sm:text-base">
                            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.title === "Cookies, storage, and third-party resources" && (
                      <BlogViewPreference />
                    )}

                    {(section.title === "Who we are" || section.title === "Your privacy rights" || section.title === "Changes and contact") && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-5 inline-flex text-sm font-semibold text-signal underline decoration-signal/30 underline-offset-4 transition-colors hover:text-signal-hover"
                      >
                        {contact.email}
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
