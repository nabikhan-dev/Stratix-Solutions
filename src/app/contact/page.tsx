import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/layout/PageHero";
import CinematicHeading from "@/components/layout/CinematicHeading";
import ContactForm from "@/components/layout/ContactForm";
import SectionCtaButton from "@/components/layout/SectionCtaButton";
import { contact } from "@/data/content";
import { contactPage, pageHeroes } from "@/data/copy";

export const metadata: Metadata = {
  // `absolute` keeps the root layout's "— Stratix Solutions" suffix off this
  // one, which would otherwise push the title past the 60-char budget.
  title: {
    absolute: "Contact | Stratix Solution — Reply Within One Business Day",
  },
  description: `Send your brief or email ${contact.email}. You’ll hear back with next steps within one business day. Remote-first, clients in 15+ countries.`,
  keywords: [
    "contact Stratix Solution",
    "hire product engineering company",
    "app development quote",
  ],
};

export default function ContactPage() {
  const emailBriefHref = `mailto:${contact.email}?subject=${encodeURIComponent(contactPage.emailBriefSubject)}`;

  return (
    <>
      <PageHero
        eyebrow={pageHeroes.contact.eyebrow}
        title={<CinematicHeading text={pageHeroes.contact.title} as="h1" dark />}
        description={pageHeroes.contact.description}
      />

      <section className="relative bg-surface">
      <div className="container-px py-16 sm:py-20">

        {/* Light composition — info column on white, form in a bordered card;
            inputs stay bg-void so the fields still read inside the white card */}
        <div className="mx-auto grid max-w-[1600px] grid-cols-10 gap-10 lg:gap-8">
          <div className="col-span-10 lg:col-span-4">
            <Reveal delay={0.15}>
              <div className="flex flex-col gap-5 sm:gap-6">
                <div className="rounded-2xl border border-line p-5 sm:p-6">
                  <dl className="flex flex-col gap-2">
                    {contact.businessHours.map((row) => (
                      <div key={row.days} className="flex items-center justify-between gap-4 text-sm">
                        <dt className="text-muted">{row.days}</dt>
                        <dd className="text-primary">{row.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-2xl border border-line p-5 sm:p-6">
                  <a
                    href={`mailto:${contact.email}`}
                    className="block font-display text-xl text-primary hover:text-signal"
                  >
                    {contact.email}
                  </a>
                  <p className="mt-2 text-sm text-muted">{contact.serving}</p>
                  <p className="mt-1 text-xs text-faint">{contact.responseTime} · {contact.note}</p>
                </div>

                <SectionCtaButton href={emailBriefHref} fullWidth>
                  {contactPage.emailBriefLabel}
                </SectionCtaButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="col-span-10 lg:col-span-6">
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-xl shadow-black/5 sm:p-10">
              <h2 className="font-display text-xl font-semibold tracking-[-0.04em] text-primary">{contactPage.form.title}</h2>
              <p className="mt-2 text-sm text-muted">
                {contactPage.form.description}
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      </section>
    </>
  );
}
