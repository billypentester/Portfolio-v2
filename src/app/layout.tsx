import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/src/components/layout/SiteHeader";
import SiteFooter from "@/src/components/layout/SiteFooter";
import ThemeScript from "@/src/components/layout/ThemeScript";
import ThemeStyles from "@/src/components/layout/ThemeStyles";
import ContactSection from "@/src/components/contact/ContactSection";
import { UmamiAnalytics } from "@/src/components/shared/umami";
import PublicOnly from "@/src/components/layout/PublicOnly";
import { SITE_URL, fullName } from "@/src/content/profile";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/src/lib/seo";
import { getActiveTheme } from "@/src/lib/admin/settings";
import { toHex } from "@/src/utils/color";

// Self-hosted at build time as subsetted woff2, with metric-matched fallbacks to limit layout shift.
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Site-wide defaults only. Canonical URLs and page-specific social data are set by each page,
// so routes without their own metadata (such as the 404 page) never inherit the home page's.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${fullName}` },
  description: SITE_DESCRIPTION,
  applicationName: fullName,
  authors: [{ name: fullName, url: SITE_URL }],
  creator: fullName,
  icons: [
    { rel: "icon", url: "/images/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/images/apple-touch-icon.png" },
  ],
};

// Pages are prerendered and refreshed as soon as settings are saved in /admin. The hourly
// revalidation only recovers pages that were rendered with the fallback while Redis was unreachable.
export const revalidate = 3600;

export async function generateViewport(): Promise<Viewport> {
  const theme = await getActiveTheme();
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: toHex(theme.light.canvas) },
      { media: "(prefers-color-scheme: dark)", color: toHex(theme.dark.canvas) },
    ],
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeStyles />
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
          <PublicOnly>
            <ContactSection />
          </PublicOnly>
        </main>
        <SiteFooter />
        <PublicOnly>
          <UmamiAnalytics />
        </PublicOnly>
      </body>
    </html>
  );
}
