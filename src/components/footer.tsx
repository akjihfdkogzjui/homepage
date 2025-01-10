import type { FC } from "react";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon, RssIcon } from "@heroicons/react/24/outline";

import { font } from "@/src/theme";
import linksData from "@constant/links.json";
import profileData from "@constant/profile.json";


const Footer: FC = () => {
  return (
    <>
      <hr />
      <footer className="flex flex-col items-center bg-gray-50/40 pb-4 landscape:pb-8">
        <div className="flex-none w-full my-12 portrait:my-6 mx-auto px-8 flex flex-row flex-wrap items-start justify-center">
          <dl className={`flex-none mx-4 my-6 portrait:my-2 flex flex-col items-center space-y-4 portrait:space-y-1 ${font.serif.className}`}>
            <dt className="text-lg portrait:text-base">External Links</dt>
            <dd className="flex flex-col items-center space-y-0.5">
              {Object.entries(linksData.external).map(([id, href]) => {
                return (
                  <Link
                    key={id}
                    href={href}
                    target="_blank"
                    className="hover:underline inline-flex items-center space-x-2 group portrait:my-0.5 portrait:text-sm"
                  >
                    <span className="flex-none ml-6 text-gray-800">
                      {id.replaceAll(/_/g, ' ').replaceAll(/(^|\W)[a-z]/g, v => v.toLocaleUpperCase())}
                    </span>
                    <ArrowTopRightOnSquareIcon aria-hidden="true" role="presentation" className="w-3 h-3 flex-none stroke-gray-700" />
                  </Link>
                );
              })}
            </dd>
          </dl>
          <dl className={`flex-none mx-4 my-6 portrait:my-2 flex flex-col items-center space-y-4 portrait:space-y-1 ${font.serif.className}`}>
            <dt className="text-lg portrait:text-base">Official Website</dt>
            <dd className="flex flex-col items-center space-y-0.5">
              {Object.entries(linksData.office).map(([id, href]) => {
                return (
                  <Link
                    key={id}
                    href={href}
                    target="_blank"
                    className="hover:underline inline-flex items-center space-x-2 group portrait:my-0.5 portrait:text-sm"
                  >
                    <span className="flex-none ml-6 text-gray-800">
                      {id.replaceAll(/_/g, ' ').replaceAll(/(^|\W)[a-z]/g, v => v.toLocaleUpperCase())}
                    </span>
                    <ArrowTopRightOnSquareIcon aria-hidden="true" role="presentation" className="w-3 h-3 flex-none stroke-gray-700" />
                  </Link>
                );
              })}
            </dd>
          </dl>
        </div>
        <hr className="flex-none w-full border-[1.2px]" />
        <div className="flex-none w-full mt-12 portrait:mt-6 mb-8 portrait:mb-4 space-y-4 portrait:space-y-1.5">
          <div className="w-full flex flex-row items-center justify-center space-x-8 text-sm portrait:text-xs text-gray-600 px-6">
            <Link href="/rss.xml" target="_blank" title="RSS" className="inline-flex items-center space-x-1.5 hover:underline">
              <RssIcon aria-hidden="true" className="w-3 h-3" />
              <span>RSS</span>
            </Link>
            <Link href="/sitemap.xml" target="_blank" className="hover:underline">
              <span>Sitemap</span>
            </Link>
            <Link href="/robots.txt" target="_blank" className="hover:underline">
              <span>Robots.txt</span>
            </Link>
          </div>
          <div className="w-full text-center">
            <p className="text-gray-400 text-xs">Copyright © {new Date(Date.now()).getFullYear()} {profileData.fullName}. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};


export default Footer;
