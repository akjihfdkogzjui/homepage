"use client";

import { useCallback, useEffect, useRef, useState, type FC } from "react";

import Pagination from "@cp/pagination.client";
import PostList from "@cp/post-list";
import type { IListNewsPayload, IListNewsResult } from "@/app/api/news/list/route";


export interface IPostListProps {
  initResult?: IListNewsResult;
  initQuery?: IListNewsPayload;
  onChange?: (value: { query: IListNewsPayload; result: IListNewsResult }) => void;
}

const NewsSearchView: FC<IPostListProps> = ({ initResult: initResult, initQuery: initQuery, onChange }) => {
  const initPropsRef = useRef(initQuery && initResult ? { query: initQuery, result: initResult } : null); // refers to the first props
  
  const [query, setQuery] = useState<Required<Pick<IListNewsPayload, "pageIndex">>>({
    pageIndex: initPropsRef.current?.query.pageIndex ?? 1,
  });

  const [busy, setBusy] = useState(false);

  const [result, setResult] = useState<IListNewsResult | null>(initPropsRef.current?.result ?? null);

  const total = result?.count ?? 0;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const releaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (releaseTimerRef.current) {
        clearTimeout(releaseTimerRef.current);
      }
    };
  }, []);

  const next = useCallback(async (q: typeof query) => {
    if (busy) {
      return;
    }
    setBusy(true);
    const listNewsReqPath = new URL("/api/news/list", process.env.NEXT_PUBLIC_DEPLOY_DOMAIN);
    if (q.pageIndex) {
      listNewsReqPath.searchParams.set("pageIndex", `${q.pageIndex}`);
    }
    const res = await fetch(listNewsReqPath, { method: "GET" });
    const data = await res.json();
    setQuery(q);
    setResult(data);
    releaseTimerRef.current = setTimeout(() => {
      setBusy(false);
    }, 60);
    return;
  }, [busy]);
  // const refresh = useCallback(() => next({ ...query }), [next, query]);
  const handlePaginate = useCallback((value: number) => next({ ...query, pageIndex: value }), [query, next]);

  useEffect(() => {
    if (result) {
      onChangeRef.current?.({ query, result });
    }
  }, [query, result]);

  return (
    <div className="w-full min-h-full h-[max-content] space-y-8">
      {result && (
        <>
          {result && (
            <>
              <div className="text-end text-gray-500">
                <p><span className="text-gray-800">{total}</span> articles in total</p>
              </div>
              <div className="w-full text-sm pb-4">
                <PostList items={result.items} />
              </div>
              <div className="flex-none w-full text-lg text-center">
                <Pagination
                  total={Math.ceil(total / result.pageSize)}
                  current={query.pageIndex - 1}
                  onChange={handlePaginate}
                  disabled={busy}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};


export default NewsSearchView;
