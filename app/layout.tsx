import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { data } from '@/data/config'
import { fetchTheme } from '@/helpers/db'

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

  const themeClass = await fetchTheme().then((data) => { return data })

  return (
    <html lang="en" className={`${themeClass ? themeClass : "dark"}`}>
      <body className={`${fontOptions.className} antialiased bg-background`}>
        {children}
      </body>
    </html>
  );
}
