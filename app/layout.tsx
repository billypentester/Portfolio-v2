import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter } from 'next/font/google'
import "./globals.css";
import { data } from '@/data/config'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const fontOptions = Inter({
  weight: '400',
  style: 'normal',
  display: 'auto',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: data.seo.title,
  description: data.seo.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" className="light">
      <body className={`${fontOptions.className} antialiased bg-background`}>
        {children}
      </body>
    </html>
  );
}
