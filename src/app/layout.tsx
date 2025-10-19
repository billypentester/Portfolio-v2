import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { data } from '@/src/config/data'
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import Contact from "@/src/components/contact";

export const dynamic = 'force-dynamic'

const fontOptions = Inter({
  weight: '400',
  style: 'normal',
  display: 'auto',
  subsets: ['latin']
})

export const metadata: Metadata = data.seo

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const { identity_keyword, active_theme } = data

  return (
    <html lang="en" data-theme={active_theme}>
      <body className={`${fontOptions.className} antialiased`}>
        <Navbar identity_keyword={identity_keyword} />
        <div className="page-container">
          {children}
          <Contact />
        </div>
        <Footer identity_keyword={identity_keyword} />
      </body>
    </html>
  );
}
