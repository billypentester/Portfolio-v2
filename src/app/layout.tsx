import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/src/components/layout/SiteHeader";
import SiteFooter from "@/src/components/layout/SiteFooter";
import ThemeScript from "@/src/components/layout/ThemeScript";
import ContactSection from "@/src/components/contact/ContactSection";
import { UmamiAnalytics } from "@/src/components/shared/umami";
import { SITE_URL, fullName } from "@/src/content/profile";
import { SITE_DESCRIPTION, SITE_TITLE, buildMetadata } from "@/src/lib/seo";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${fullName}` },
  applicationName: fullName,
  authors: [{ name: fullName, url: SITE_URL }],
  creator: fullName,
  keywords: [
    "Bilal Ahmad",
    "Software Engineer",
    "Backend Engineer",
    "Full Stack Developer",
    "NestJS Developer",
    "Next.js Developer",
    "Software Engineer in Lahore",
    "Software Engineer in Pakistan",
  ],
  robots: { index: true, follow: true },
  icons: [
    { rel: "icon", url: "/images/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/images/apple-touch-icon.png" },
  ],
  ...buildMetadata({ description: SITE_DESCRIPTION, path: "/" }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1012" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="fixed left-4 top-3 z-50 -translate-y-20 rounded-control bg-fg px-4 py-2 text-sm font-medium text-canvas transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          {children}
          <ContactSection />
        </main>
        <SiteFooter />
        <UmamiAnalytics />
      </body>
    </html>
  );
}
