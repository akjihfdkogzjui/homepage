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
  // Sort by date-encoded id (YYYYMMDDNN) descending so newest posts come first.
  // (File atime is unreliable: a fresh git checkout/deploy resets all timestamps.)
  const md = files.filter(f => f.stat.isFile() && f.filename.endsWith(".md")).toSorted((a, b) => b.id.localeCompare(a.id));
  return md;
};
