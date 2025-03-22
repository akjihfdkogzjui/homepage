"use client";

import { useEffect, useState, type FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import NewsSearchView from "@/src/components/news-search-view.client";
import type { IListNewsPayload, IListNewsResult } from "@/app/api/news/list/route";


export const dynamic = 'force-dynamic';

const SearchResultBody: FC<{ initSearch: IListNewsPayload; initResult: IListNewsResult }> = ({ initSearch: initPayload, initResult }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initPayload);

  useEffect(() => {
    const url = new URL(`/${pathname.replace(/^\//, '')}`, window.location.toString());
    const sp = url.searchParams;
    for (const [k, v] of searchParams.entries()) {
      sp.set(k, v);
    }
    const { pageSize, pageIndex } = query;
    if (pageSize) {
      sp.set('pageSize', `${pageSize}`);
    }
    if (pageIndex) {
      sp.set('pageIndex', `${pageIndex}`);
    }
    router.replace(url.toString());
  }, [router, pathname, query, searchParams]);
  
  return (
    <NewsSearchView
      initQuery={initPayload}
      initResult={initResult}
      onChange={({ query }) => setQuery(query)}
    />
  );
};


export default SearchResultBody;
