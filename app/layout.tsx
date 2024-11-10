import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter } from 'next/font/google'
import "./globals.css";

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
  title: "Bilal Ahmad: Software Engineer | Full Stack Web Developer | Security Expert",
  description: "Hi, I'm a skilled freelancer with 2 years of experience, offering services in full-stack web, database, and blockchain development. Let's bring your vision to life! 🚀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fontOptions.className} antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
