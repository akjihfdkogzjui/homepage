import { type FC, type PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";

import siteData from "@constant/site.json";
import profileData from "@constant/profile.json";

import "./globals.css";
import Link from "next/link";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title: NonNullable<Metadata['title']> = {
  absolute: siteData.title,
  template: `%s | ${siteData.title}`
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const siteUrl = `${requestHeaders.get('x-forwarded-proto') || 'http'}://${requestHeaders.get('host')}`;
  const currentUrl = `${siteUrl}${requestHeaders.get('url') || ''}`;
  const imageUrl = `${siteUrl}/${siteData.ogImage.replace(/^\//, '')}`;

  return {
    title,
    description: siteData.description,
    applicationName: siteData.appName,
    authors: [
      {
        name: "Shinto Yanagi",
        url: "https://github.com/AntoineYANG",
      },
      {
        name: profileData.fullName,
        url: siteUrl,
      },
    ],
    generator: "Next.js",
    keywords: siteData.keywords,
    referrer: "strict-origin-when-cross-origin",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "profile",
      title,
      description: siteData.description,
      siteName: siteData.title,
      url: currentUrl,
      images: [{
        url: imageUrl,
      }],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: siteData.seoName,
      description: siteData.description,
      images: [{
        url: imageUrl,
      }],
    },
    appleWebApp: {
      title: siteData.title,
    },
  };
}

const theme = {
  background: "#f9f9f9",
  foreground: "#161616",
} as const;

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: theme.background,
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  // TODO: move this in a client component

  const curPath = "/aaa/bbb";
  let curSeg = "aaa";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          // @ts-ignore css variables
          '--background': theme.background,
          '--foreground': theme.foreground,
        }}
      >
        {/* Navbar */}
        <header className="w-full">
          <nav className="bg-background flex justify-center items-center w-full text-xl py-2">
            <div className="grid grid-flow-col gap-x-4">
              <Link
                className={`block px-2 after-line ${
                  curSeg === "aaa" ? "" : "opacity-85 hover:opacity-100 focus:opacity-100"
                }`}
                href="#"
              >
                <span className="inline-block">About</span>
              </Link>
              <Link
                className={`block px-2 after-line ${
                  curSeg === "Portfolio" ? "" : "opacity-85 hover:opacity-100 focus:opacity-100"
                }`}
                href="#"
              >
                <span className="inline-block">Portfolio</span>
              </Link>
              <Link
                className={`block px-2 after-line ${
                  curSeg === "" ? "" : "opacity-85 hover:opacity-100 focus:opacity-100"
                }`}
                href="#"
              >
                <span className="inline-block">Blog</span>
              </Link>
              <Link
                className={`block px-2 after-line ${
                  curSeg === "" ? "" : "opacity-85 hover:opacity-100 focus:opacity-100"
                }`}
                href="#"
              >
                <span className="inline-block">Contact</span>
              </Link>
            </div>
          </nav>
          {/* Mobile menu */}
          {/* {isMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
              <div className="flex justify-end p-4">
                <button onClick={toggleMenu} className="text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <a href="#" className="text-white text-lg">Home</a>
                <a href="#about" className="text-white text-lg">About</a>
                <a href="#blog" className="text-white text-lg">Blog</a>
                <a href="#contact" className="text-white text-lg">Contact</a>
              </div>
            </div>
          )} */}
        </header>
        {children}
      </body>
    </html>
  );
};


export default RootLayout;
