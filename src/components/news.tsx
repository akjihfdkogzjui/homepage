import type { FC } from "react";
import Link from "next/link";

import { getZJUNews } from "@utils/news";


const News: FC = async () => {
  const news = await getZJUNews();
  
  return (
    <ul className="list-style-none border-t">
      {news.map(n => {
        return (
          <li key={n.url} className="py-2 border-b">
            <Link href={n.url} target="_blank" className="hover:underline focus:underline">
              {n.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};


export default News;
