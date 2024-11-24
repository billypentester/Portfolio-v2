import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { data } from '@/data/config'
import { API_URL } from "@/config";

export const dynamic = 'force-dynamic'

const fontOptions = Inter({
  weight: '400',
  style: 'normal',
  display: 'auto',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: data.seo.title,
  description: data.seo.description,
  keywords: data.seo.keywords,
  robots: data.seo.robots,
  openGraph: {
    title: data.seo.title,
    description: data.seo.description,
    type: "website",
    locale: "en_US",
    url: data.seo.url,
    siteName: data.seo.site_name,
    images: [
      {
        url: data.seo.url + '/portfolio.webp',
        width: 1200,
        height: 630,
        alt: data.first_name + ' ' + data.last_name + ' Portfolio'
      }
    ]
  },
  icons: [
    { rel: "icon", url: "/images/favicon.png" }, 
    { rel: "apple-touch-icon", url: "/images/apple-touch-icon.png" }
  ]
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  let res = await fetch(API_URL)
  let data = await res.json()

  let themeClass = "dark"
  if(data[0].theme) {
    themeClass = data[0].theme
  }

  return (
    <html lang="en" className={themeClass}>
      <body className={`${fontOptions.className} antialiased bg-background`}>
        {children}
      </body>
    </html>
  );
}
