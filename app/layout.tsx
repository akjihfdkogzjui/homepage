import { type FC, type PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";

import NavBar from "@cp/navBar";
import LayoutBody from "@cp/layout-body";
import Footer from "@cp/footer";
import BackToTopButton from "@cp/back-to-top-button";
import siteData from "@constant/site.json";
import profileData from "@constant/profile.json";
import { font, globalTheme } from "@/src/theme";

import "./globals.css";


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
      index: process.env.DEPLOY_MODE === 'public',
      follow: process.env.DEPLOY_MODE === 'public',
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

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: globalTheme.background,
};


const Layout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body
      className={`${font.notoSans.className} ${font.standardSans.variable} ${font.standardMono.variable} antialiased w-screen min-h-screen overflow-x-hidden overflow-y-scroll bg-background text-foreground`}
      style={{
        // @ts-expect-error css variables
        '--background': globalTheme.background,
        '--foreground': globalTheme.foreground,
      }}
      id="body"
    >
      <NavBar homeLabel={`${profileData.fullName}, ${profileData.title}`} />
      <div className="relative w-full h-full mt-16 mb-0 overflow-hidden scroll-style-none py-0">
        <div className="w-full overflow-x-hidden" id="main">
          <LayoutBody>
            {children}
          </LayoutBody>
        </div>
        <Footer />
      </div>
      <BackToTopButton />
      <Analytics />
    </body>
  </html>
);


export default Layout;
