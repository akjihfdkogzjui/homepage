import Image from "next/image";
import Link from "next/link";
import { BuildingOfficeIcon, EnvelopeIcon, ClockIcon, MapPinIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import { CopyButton } from "@cp/button.client";
import LocalTime from "@cp/localTime.client";

import profileData from "@constant/profile.json";
import linksData from "@constant/links.json";


const aside = (
  <div className="bg-white px-14 xl:px-4 py-8 xl:py-16 space-y-8">
    <div className="flex flex-row xl:flex-col space-x-6 xl:space-x-0 xl:space-y-4">
      <div className="flex-none">
        <Image alt={profileData.fullName} src="/MengZhang-rect.jpg" width="512" height="512" className="max-w-36 portrait:max-w-[30vw] mx-auto rounded-full overflow-hidden" draggable="false" />
      </div>
      <div className="flex-1 text-start xl:text-center flex flex-col items-start xl:items-center justify-center">
        <p className="my-1 text-base xl:text-sm leading-8 xl:leading-5 text-gray-950"><b>{profileData.fullName}</b></p>
        <p className="my-1 text-xs leading-4 text-gray-600 whitespace-nowrap">{profileData.label}</p>
      </div>
    </div>
    <div className="px-4">
      <dl className="text-sm leading-6 text-start text-gray-800">
        <dt>
          <BuildingOfficeIcon aria-label="City" title="City" className="inline-block select-none w-4 h-4 opacity-80" />
        </dt>
        <dd>
          {profileData.city}
        </dd>
        <dt>
          <ClockIcon aria-label="Local time" title="Local time" className="inline-block select-none w-4 h-4 opacity-80" />
        </dt>
        <dd className="min-h-6">
          <LocalTime z={8} />
        </dd>
        <dt>
          <MapPinIcon aria-label="Access" title="Access" className="inline-block select-none w-4 h-4 opacity-80" />
        </dt>
        <dd>
          <Link href="/contact#Access" target="_self" className="hover:underline">Access</Link>
        </dd>
        <dt>
          <EnvelopeIcon aria-hidden="true" title="E-mail" className="inline-block select-none w-4 h-4 opacity-80" />
        </dt>
        <dd className="space-x-4">
          <span>E-mail</span>
          <div className="flex flex-row items-center justify-center space-x-1">
            <Link href={`mailto:${linksData.contact.email}`} target="_blank" aria-label="Edit-message" className="flex-none text-white bg-gray-600/40 hover:bg-blue-600/40 focus:bg-blue-600/40 w-5 h-5 rounded flex flex-row items-center justify-center">
              <PaperAirplaneIcon aria-label="Edit-message" title="Edit message" className="inline-block select-none w-4 h-4" />
            </Link>
            <CopyButton className="flex-none text-white bg-gray-600/40 hover:bg-blue-600/40 focus:bg-blue-600/40 w-5 h-5 rounded flex flex-row items-center justify-center" text={profileData.email} />
          </div>
        </dd>
        <dt>
          <svg aria-label="GitHub" className="inline-block select-none w-4 h-4 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.15 6.84 9.47.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.14-1.11-1.44-1.11-1.44-.91-.62.07-.61.07-.61 1.01.07 1.54 1.03 1.54 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.29.1-2.7 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.8c.85.004 1.71.12 2.52.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.41.2 2.44.1 2.7.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.91.68 1.84 0 1.33-.01 2.4-.01 2.73 0 .26.17.58.67.48A10.002 10.002 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
          </svg>
        </dt>
        <dd>
          <Link href={linksData.external.GitHub} target="_blank" className="hover:underline">GitHub</Link>
        </dd>
        <dt>
          <AcademicCapIcon aria-label="Google Scholar" title="Google Scholar" className="inline-block select-none w-4 h-4 opacity-80" />
        </dt>
        <dd>
          <Link href={linksData.external.google_scholar} target="_blank" className="hover:underline">Google Scholar</Link>
        </dd>
      </dl>
    </div>
  </div>
);


export default aside;
