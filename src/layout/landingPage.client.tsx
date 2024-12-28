"use client";

import { useCallback, useEffect, useMemo, useState, type FC, type PropsWithChildren } from "react";
import Head from "next/head";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import Button from "@cp/button.client";
import NavBar from "@cp/navBar";
import YFloatable from "@cp/yFloatable";
import { throttle } from "@utils/functions";

import profileData from "@constant/profile.json";

import "./landingPage.css";


interface ILandingPageProps {
  coverSrc: string;
}

/**
 * Only works for client components.
 */
const LandingPage: (props: ILandingPageProps) => FC<PropsWithChildren> = ({ coverSrc }) => {
  const LandingPageLayout: FC<PropsWithChildren> = ({ children }) => {
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
    const updateScrollY = useMemo(() => throttle(setScrollY, 40), []);
    useEffect(() => {
      const body = document.getElementById('body');
      if (body) {
        const cb = () => {
          const y = body.scrollTop;
          if (y <= 0) {
            setScrollY(0);
          } else if (y < 1.05 * body.clientHeight) {
            updateScrollY(y);
          }
        };
        body.addEventListener('scroll', cb);
        return () => {
          body.removeEventListener('scroll', cb);
        }
      }
    }, [updateScrollY]);
    
    return (
      <>
        <Head>
          <link rel="preload" href={coverSrc} as="image"></link>
        </Head>
        <>
          <NavBar homeLabel={`${profileData.fullName}, ${profileData.title}`} transparentAtTop reverseTransparentTheme />
          <div className="relative w-full h-full overflow-x-hidden overflow-y-scroll scroll-style-none" id="body">
            <main className="w-full overflow-x-hidden">
              <div className="w-full h-screen overflow-hidden relative z-0">
                <YFloatable y={0.2 * scrollY} className="relative -z-10 transition-transform duration-[40ms]">
                  <div
                    className="full-size-cover"
                    style={{ backgroundImage: `url(${coverSrc})` }}
                  />
                </YFloatable>
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
                <div className="grid grid3">
                  <div className="hidden landscape:block" />
                  <article className="landscape:max-w-[640px] px-8 py-16 mb-8">
                    {children}
                  </article>
                  <div className="hidden landscape:block" />
                </div>
              </div>
            </main>
          </div>
        </>
      </>
    );
  };

  return LandingPageLayout;
};


export default LandingPage;
