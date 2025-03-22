import Link from "next/link";
import Image from "next/image";
import type { FC } from "react";

import type { IListNewsResult } from "@/app/api/news/list/route";


const LatestNews: FC = async () => {
  const listNewsReqPath = new URL("/api/news/list", process.env.NEXT_PUBLIC_DEPLOY_DOMAIN);
  listNewsReqPath.searchParams.set("pageSize", `${4}`);
  const res = await fetch(listNewsReqPath, { method: "GET" });
  const data = await res.json() as IListNewsResult;

  return (
    <ol className="overflow-x-hidden overflow-y-auto scroll-style-none divide-y landscape:pl-4">
      {data.items.slice(0, 3).map((res, i) => (
        <li key={i} className="pl-2 border-l-2 border-black">
          <Link href={`/news/${res.id}`} title={res.title} className="flex space-x-6 portrait:space-x-3 px-2 landscape:px-4 py-3 opacity-90 hover:opacity-100 focus-within:opacity-100 hover:bg-gray-400/10 focus:bg-gray-400/10">
            {res.cover && (
              <div className="flex-none landscape:w-[16%] landscape:max-w-[240px] landscape:min-h-10 landscape:max-h-[96px] portrait:w-0 portrait:-mr-3">
                <Image
                  src={res.cover}
                  alt="cover"
                  width={240}
                  height={96}
                  draggable={false}
                  className="block w-full h-full overflow-hidden object-cover object-center"
                />
              </div>
            )}
            <div className="flex-1 pointer-events-none !space-y-2">
              <p className="capitalize text-base text-gray-950 text-ellipsis line-clamp-1 !leading-6">{res.title}</p>
              <p className="text-sm !leading-5 text-gray-700 line-clamp-3">{res.preview}</p>
            </div>
            <div className="text-gray-800 text-sm leading-6">
              <time>{new Date(res.ctime).toLocaleDateString()}</time>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
};


export default LatestNews;
