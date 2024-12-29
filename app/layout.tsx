import { type FC, type PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";

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

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: globalTheme.background,
};


const EmptyLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body
      className={`${font.standardSans.variable} ${font.standardMono.variable} antialiased w-screen h-screen overflow-hidden bg-background text-foreground`}
      style={{
        // @ts-expect-error css variables
        '--background': globalTheme.background,
        '--foreground': globalTheme.foreground,
      }}
    >
      {children}
    </body>
  </html>
);


export default EmptyLayout;
