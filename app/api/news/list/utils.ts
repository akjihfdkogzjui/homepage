import path from "path";
import { readdir, stat } from "fs/promises";
import type { Stats } from "fs";


export const NEWS_DIR = path.join(process.cwd(), "articles", "news");

export const getAllNews = async (): Promise<{
  id: string;
  filename: string;
  stat: Stats;
}[]> => {
  const raw = await readdir(NEWS_DIR);
  const files = await Promise.all(raw.map(async name => {
    const filename = path.join(NEWS_DIR, name);
    return {
      id: name.replace(/\.md$/, ""),
      filename,
      stat: await stat(filename),
    };
  }));
  const md = files.filter(f => f.stat.isFile() && f.filename.endsWith(".md")).toSorted((a, b) => b.stat.atime.valueOf() - a.stat.atime.valueOf());
  return md;
};
