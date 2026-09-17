import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Github } from "../SocialIcons";

export default function AgencyFooter() {
  const links = {
    Company: [
      { label: "About Us", href: "/about" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Our Work", href: "/work" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    Services: [
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
    ],
    Legal: [{ label: "Privacy Policy", href: "/privacy" }],
  };

  return (
 <div className="p-2">
    <footer className="bg-dark text-white pt-28 pb-10 overflow-hidden border-t rounded-2xl border-white/10">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">

        {/* Top section: brand blurb + links, asymmetric split instead of a stacked block.
            `data-reveal` rather than a motion component so the footer stays a
            server component — RevealScroll picks it up from the root layout. */}
        <div
          data-reveal
          data-reveal-duration="1000"
          data-reveal-stagger="90"
          className="grid grid-cols-1 gap-14 pb-16 border-b border-white/10 mb-12 lg:grid-cols-12 lg:gap-8"
        >
          <div data-reveal-stagger-child className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-white.png"
                alt="Stratix Solutions"
                width={1331}
                height={177}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/50 text-[15px] leading-relaxed mt-6 max-w-sm">
              We design and build websites that drive results and help your business grow. No calls. No BS. Just results.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {Object.entries(links).map(([category, items]) => (
              <div key={category} data-reveal-stagger-child className="flex flex-col gap-5">
                <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                  {category}
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          data-reveal
          data-reveal-delay="120"
          data-reveal-duration="1000"
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-white/40 text-[13px]">
            © 2026 Stratix Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {[
              { Icon: Twitter, label: "Twitter", href: "#" },
              { Icon: Linkedin, label: "LinkedIn", href: "#" },
              { Icon: Github, label: "GitHub", href: "#" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={`Stratix Solutions on ${label}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-white/25 hover:text-white"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
    </div>
  );
}
