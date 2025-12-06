import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { data } from '@/src/config/data'
import Navbar from "@/src/components/shared/navbar";
import Footer from "@/src/components/shared/footer";
import Contact from "@/src/components/shared/contact";
import { headers } from 'next/headers';
import { isMobile } from "../utils";
import Dialog from "../components/shared/dialog";

export const dynamic = 'force-dynamic'

const fontOptions = Inter({
  weight: '400',
  style: 'normal',
  display: 'auto',
  subsets: ['latin']
})

export const metadata: Metadata = data.seo

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobileDevice = isMobile(userAgent);

  const { identity_keyword, active_theme } = data

  return (
    <html lang="en" data-theme={active_theme}>
      <body className={`${fontOptions.className} antialiased`}>
        <Navbar identity_keyword={identity_keyword} isMobileDevice={isMobileDevice} />
        <div className="page-container">
          {children}
          <Contact />
        </div>
        <Footer identity_keyword={identity_keyword} />
        <Dialog />
      </body>
    </html>
  );
}
