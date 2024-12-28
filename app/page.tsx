"use client";

import LandingPage from "@/src/layout/landingPage.client";

import siteData from "@constant/site.json";

import Content from "@articles/home.md";


const Layout = LandingPage({ coverSrc: siteData.ogImage });

export default function Home() {

  return (
    <Layout>
      <Content />
    </Layout>
  );
}
