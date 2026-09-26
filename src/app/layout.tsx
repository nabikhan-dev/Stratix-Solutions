import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import GlobalNavbar from "@/components/layout/GlobalNavbar";
import AgencyFooter from "@/components/agency-landing/AgencyFooter";
import AmbientGlowControl from "@/components/layout/AmbientGlowControl";
import RouteVisible from "@/components/layout/RouteVisible";
import MotionProvider from "@/components/motion/MotionProvider";
import PageTransition from "@/components/motion/PageTransition";
import RevealScroll from "@/components/motion/RevealScroll";
import { publicPath } from "@/lib/public-path";

// Fonts are loaded via <link> tags below (not next/font) so the build does
// not depend on reaching fonts.googleapis.com at build time. Falls back to
// the system stack defined in globals.css if the request is ever blocked.

export const metadata: Metadata = {
  metadataBase: new URL("https://nabikhan-dev.github.io"),
  title: {
    default: "Stratix Solutions — AI, UI/UX, app, and web development",
    template: "%s — Stratix Solutions",
  },
  description:
    "AI development, UI/UX design, app development, and responsive web development services. Strategy, design, engineering, QA, release, and support handled by one focused team.",
  icons: {
    icon: publicPath("/favicon.ico"),
    shortcut: publicPath("/favicon.ico"),
    apple: publicPath("/logo.png"),
  },
  openGraph: {
    title: "Stratix Solutions — AI, UI/UX, app, and web development",
    description:
      "AI tools, product interfaces, mobile apps, and responsive web platforms built by one focused technical team.",
    url: "https://nabikhan-dev.github.io/Stratix-Solutions/",
    siteName: "Stratix Solutions",
    images: [publicPath("/logo.png")],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stratix Solutions — AI, UI/UX, app, and web development",
    description:
      "AI tools, product interfaces, mobile apps, and responsive web platforms built by one focused technical team.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout is the correct place for this in the App Router */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-void"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll>
            <AmbientGlowControl />
            <RevealScroll />
            <Cursor />
            <GlobalNavbar />
            <PageTransition>{children}</PageTransition>
            <RouteVisible hideOnPrefix="/dashboard">
              <AgencyFooter />
            </RouteVisible>
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
