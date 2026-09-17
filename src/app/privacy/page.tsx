import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/layout/PageHero";
import { contact } from "@/data/content";
import { pageHeroes } from "@/data/copy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Stratix Solutions collects, uses, and protects information submitted through this site.",
};

const sections = [
  {
    title: "What we collect",
    body: "When you use the contact form on this site, we collect the information you choose to submit: your name, email address, project type, budget range, and message. We do not use tracking cookies or analytics scripts that identify you personally beyond what's needed to operate the site.",
  },
  {
    title: "How we use it",
    body: "Information submitted through the contact form is used only to respond to your inquiry — to reply by email, prepare a proposal, or schedule a call. We don't sell, rent, or share your information with third parties for marketing purposes.",
  },
  {
    title: "How long we keep it",
    body: "We retain inquiry details for as long as reasonably necessary to respond to you and, if you become a client, for the duration of our engagement and any legal or accounting requirements that follow it.",
  },
  {
    title: "Your choices",
    body: `You can ask us to delete information you've submitted, or ask what we hold about you, at any time by emailing ${contact.email}.`,
  },
  {
    title: "Contact",
    body: `Questions about this policy can be sent to ${contact.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow={pageHeroes.privacy.eyebrow} title={pageHeroes.privacy.title} />

      <section className="container-px pb-24 sm:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="text-sm text-faint">Last updated July 2026.</p>
          </Reveal>

          <div className="mt-10 max-w-2xl divide-y divide-line border-y border-line">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={0.05 + i * 0.04}>
                <div className="grid grid-cols-1 gap-2 py-7 sm:grid-cols-[2rem_1fr]">
                  <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-primary">{s.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
