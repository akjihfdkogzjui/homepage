import { readFile } from "fs/promises";
import type { NextRequest } from "next/server";

import { extractContent, type News } from "@utils/news";
import { getAllNews } from "./utils";


const DEFAULT_PAGE_SIZE = 20;
const MIN_PAGE_SIZE = 4;
const MAX_PAGE_SIZE = 100;

const PREVIEW_LEN = 400;

export interface IListNewsPayload {
  pageSize?: number;
  /** from 1 */
  pageIndex?: number;
}

export interface IListNewsResult {
  items: News[];
  count: number;
  pageSize: number;
  /** from 1 */
  pageIndex: number;
}

export const GET = async (req: NextRequest): Promise<Response> => {
  const sp = req.nextUrl.searchParams;
  const _psr = sp.get("pageSize");
  const _ps = _psr ? Number(_psr) : DEFAULT_PAGE_SIZE;
  const _pir = sp.get("pageIndex");
  const _pi = _pir ? Number(_pir) : 1;
  const pageSize = Math.max(MIN_PAGE_SIZE, Math.min(MAX_PAGE_SIZE, _ps));
  const md = await getAllNews();
  const count = md.length;
  const pageIndex = Math.max(1, Math.min(count, _pi));
  const page = md.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
  const list = await Promise.all(page.map<Promise<News>>(async f => {
    const { title, cover, date, content } = await extractContent(await readFile(f.filename, { encoding: "utf-8" }));
    let ctime = f.stat.ctime.valueOf();
    let atime = f.stat.atime.valueOf();
    if (date) {
      try {
        const d = new Date(date);
        ctime = d.valueOf();
        atime = d.valueOf();
      } finally {}
    }
    return {
      id: f.id,
      title,
      ctime,
      atime,
      cover,
      preview: content.slice(0, PREVIEW_LEN),
    };
  }));

  return new Response(JSON.stringify({
    items: list,
    count,
    pageSize,
    pageIndex,
  } satisfies IListNewsResult), { status: 200 });
};
