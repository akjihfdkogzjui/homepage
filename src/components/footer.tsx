import type { FC } from "react";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon, RssIcon } from "@heroicons/react/24/outline";

import { font } from "@/src/theme";
import linksData from "@constant/links.json";
import profileData from "@constant/profile.json";


const Footer: FC = () => {
  return (
    <>
      <hr className="border-[1.2px]" />
      <footer className="flex flex-col items-center">
        <div className="flex-none w-full my-12 mx-auto px-8 flex flex-row flex-wrap items-start justify-center">
          <dl className={`flex-none mx-4 my-6 flex flex-col items-center space-y-4 ${font.serif.className}`}>
            <dt className="text-lg">External Links</dt>
            <dd className="flex flex-col items-center space-y-0.5">
              {Object.entries(linksData.external).map(([id, href]) => {
                return (
                  <Link
                    key={id}
                    href={href}
                    target="_blank"
                    className="hover:underline inline-flex items-center space-x-2 group portrait:my-1"
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
          <dl className={`flex-none mx-4 my-6 flex flex-col items-center space-y-4 ${font.serif.className}`}>
            <dt className="text-lg">Official Website</dt>
            <dd className="flex flex-col items-center space-y-0.5">
              {Object.entries(linksData.office).map(([id, href]) => {
                return (
                  <Link
                    key={id}
                    href={href}
                    target="_blank"
                    className="hover:underline inline-flex items-center space-x-2 group portrait:my-1"
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
        <hr className="flex-none w-full" />
        <div className="flex-none w-full mt-12 mb-8 space-y-4">
          <div className="w-full flex flex-row items-center justify-center space-x-8 text-sm text-gray-600 px-6">
            <Link href="/rss.xml" target="_blank" title="RSS" className="inline-flex items-center space-x-2 hover:underline">
              <RssIcon aria-hidden="true" className="w-4 h-4" />
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
