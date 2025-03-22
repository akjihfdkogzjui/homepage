import path from "path";
import { existsSync } from "fs";
import { readFile, stat } from "fs/promises";
import matter from "gray-matter";
import type { NextRequest } from "next/server";

import { NEWS_DIR } from "./list/utils";


export interface IGetNewsPayload {
  id: string;
}

export interface IGetNewsResult {
  title: string;
  atime: number;
  ctime: number;
  cover?: string;
  raw: string;
}

export const GET = async (req: NextRequest): Promise<Response> => {
  const sp = req.nextUrl.searchParams;
  const id = sp.get("id");
  try {
    const filename = path.join(NEWS_DIR, `${id}.md`);
    if (!existsSync(filename)) {
      throw new Error("file not found");
    }
    const file = await stat(filename);
    const raw = await readFile(filename, { encoding: "utf-8" });
    const { content, data } = matter(raw);
    const { title, cover } = data;
    return new Response(JSON.stringify({
      title,
      atime: file.atime.valueOf(),
      ctime: file.ctime.valueOf(),
      cover,
      raw: content,
    } satisfies IGetNewsResult), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ reason: `${error}` }), { status: 500 });
  }
};
