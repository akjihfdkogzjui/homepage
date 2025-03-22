import Link from "next/link";
import Image from "next/image";
import type { FC } from "react";

import type { News } from "@utils/news";


export interface IPostListProps {
  items: News[];
}

const PostList: FC<IPostListProps> = ({ items }) => {
  return (
    <ol className="overflow-x-hidden overflow-y-auto scroll-style-none divide-y">
      {items.map((res, i) => (
        <li key={i}>
          <Link href={`/news/${res.id}`} title={res.title} className="flex portrait:flex-col landscape:space-x-6 portrait:space-y-4 px-2 landscape:px-4 py-3 opacity-90 hover:opacity-100 focus-within:opacity-100 hover:bg-gray-400/10 focus:bg-gray-400/10">
            {res.cover && (
              <div className="flex-none landscape:w-[20%] landscape:max-w-[300px] landscape:min-h-12 landscape:max-h-[120px]">
                <Image
                  src={res.cover}
                  alt="cover"
                  width={300}
                  height={120}
                  draggable={false}
                  className="block w-full h-full overflow-hidden object-cover object-center"
                />
              </div>
            )}
            <div className="flex-1 pointer-events-none !space-y-0.5">
              <p className="font-semibold capitalize text-ellipsis !leading-6">{res.title}</p>
              <p className="font-thin text-[96%] !leading-5 line-clamp-3">{res.preview}</p>
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


export default PostList;
