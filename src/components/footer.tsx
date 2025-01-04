import type { FC } from "react";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon, RssIcon } from "@heroicons/react/24/outline";

import linksData from "@constant/links.json";
import profileData from "@constant/profile.json";


const Footer: FC = () => {
  return (
    <>
      <hr className="mx-auto portrait:mx-8 landscape:max-w-[840px]" />
      <footer className="my-16 flex flex-col items-center">
        <div className="my-4 landscape:max-w-[840px] px-8 space-y-12">
          <div className="landscape:divide-x portrait:flex portrait:flex-col portrait:items-center">
            {Object.entries(linksData.footer).map(([id, href]) => {
              return (
                <Link
                  key={id}
                  href={href}
                  target="_blank"
                  className="px-4 hover:underline focus:underline inline-flex items-center space-x-2 group portrait:my-1"
                >
                  <span className="flex-none ml-6 text-gray-800">
                    {id.replaceAll(/_/g, ' ').replaceAll(/(^|\W)[a-z]/g, v => v.toLocaleUpperCase())}
                  </span>
                  <ArrowTopRightOnSquareIcon aria-hidden="true" role="presentation" className="w-4 h-4 flex-none stroke-gray-700 opacity-0 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
          <hr className="mx-4 border-[1.2px]" />
          <div className="w-full flex flex-row items-center justify-center space-x-4 text-gray-700 px-6">
            <Link href="/rss.xml" target="_blank" className="mr-6" title="RSS">
              <RssIcon aria-label="RSS" className="w-4 h-4" />
            </Link>
            <Link href="/sitemap.xml" target="_blank">
              <span>Sitemap</span>
            </Link>
          </div>
          <div className="w-full text-center">
            <p className="text-gray-400 text-sm">Copyright © {new Date(Date.now()).getFullYear()} {profileData.fullName} All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};


export default Footer;
