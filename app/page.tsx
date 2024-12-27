"use client";

import LandingPage from "@/src/layout/landingPage.client";

import siteData from "@constant/site.json";

import Content from "@articles/home.md";


export default function Home() {

  return (
    <LandingPage coverSrc={siteData.ogImage}>
      <div className="grid grid3">
        <div className="hidden landscape:block" />
        <article className="landscape:max-w-[640px] px-8 py-16 mb-8">
          <Content />
        </article>
        <div className="hidden landscape:block" />
      </div>
    </LandingPage>
  );
}
