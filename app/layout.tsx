import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { data } from '@/data/config'
import { API_URL } from "@/config";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
    { rel: "icon", url: "/images/favicon.svg" }, 
    { rel: "apple-touch-icon", url: "/images/apple-touch-icon.png" }
  ]
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  let res = await fetch(API_URL)
  const resData = await res.json()

  let themeClass = "dark"
  if(resData[0].theme) {
    themeClass = resData[0].theme
  }

  const { identity_keyword } = data

  return (
    <html lang="en" className={themeClass}>
      <body className={`${fontOptions.className} antialiased bg-background`}>
        <Navbar identity_keyword={identity_keyword} />
        {children}
        <Footer identity_keyword={identity_keyword} />
      </body>
    </html>
  );
}
