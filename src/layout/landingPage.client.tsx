"use client";

import { useCallback, useEffect, useState, type FC, type PropsWithChildren } from "react";
import Head from "next/head";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import Button from "@cp/button.client";

import "./landingPage.css";


interface ILandingPageProps {
  coverSrc: string;
}

const LandingPage: FC<PropsWithChildren<ILandingPageProps>> = ({ coverSrc, children }) => {
  const scrollDown = useCallback(() => {
    const body = document.getElementById('body');
    if (body) {
      body.scroll({
        behavior: 'instant',
        left: 0,
        top: window.innerHeight,
      });
    }
  }, []);

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const body = document.getElementById('body');
    if (body) {
      const cb = () => {
        setScrollY(body.scrollTop);
      };
      body.addEventListener('scroll', cb);
      return () => {
        body.removeEventListener('scroll', cb);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" href={coverSrc} as="image"></link>
      </Head>
      <main className="w-full overflow-x-hidden">
        <div className="w-full h-screen overflow-hidden relative z-0">
          <div className="full-size-cover relative -z-10" style={{ backgroundImage: `url(${coverSrc})`, transform: `translateY(${0.5 * scrollY}px)` }} />
        </div>
        <div className="z-10 absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center text-background">
          <Button
            className="flex-none inline-block cursor-pointer mr-0 relative z-0 group"
            aria-label="next"
            onTrigger={scrollDown}
          >
            <ChevronDownIcon
              width="1.8em" height="1.8em"
              stroke="currentColor"
              role="presentation"
              aria-hidden="true"
              className="m-1 pointer-events-none select-none opacity-75 group-hover:opacity-100 group-focus:opacity-100"
            />
          </Button>
        </div>
        <div className="w-full overflow-hidden shadow-2xl">
          {children}
        </div>
      </main>
    </>
  );
};


export default LandingPage;
