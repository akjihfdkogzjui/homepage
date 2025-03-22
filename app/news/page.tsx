import type { FC } from "react";

import { PageTitle } from "@cp/layout-body";
import type { IListNewsPayload } from "@/app/api/news/list/route";

import SearchResultBody from "./body";


export const dynamic = 'force-dynamic';

const NewsListPage: FC<{ searchParams: Promise<{ [key in keyof IListNewsPayload]?: string | undefined }> }> = async ({ searchParams }) => {
  const query = await searchParams as IListNewsPayload;
  const listNewsReqPath = new URL("/api/news/list", process.env.NEXT_PUBLIC_DEPLOY_DOMAIN);
  if (query.pageIndex) {
    listNewsReqPath.searchParams.set("pageIndex", `${query.pageIndex}`);
  }
  if (query.pageSize) {
    listNewsReqPath.searchParams.set("pageSize", `${query.pageSize}`);
  }
  const res = await fetch(listNewsReqPath, { method: "GET" });
  const data = await res.json();
  
  return (
    <>
      <PageTitle>News</PageTitle>
      <SearchResultBody initSearch={query} initResult={data} />
    </>
  );
};


export default NewsListPage;
