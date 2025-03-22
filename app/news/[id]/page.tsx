import Image from "next/image";
import type { Metadata } from "next";
import { readFile } from "fs/promises";
import { type FC } from "react";
import * as runtime from "react/jsx-runtime";
import matter from "gray-matter";
import { compile, run } from "@mdx-js/mdx";

import { mdxComponents } from "@cp/mdx";
import { getAllNews } from "@/app/api/news/list/utils";
import { IGetNewsResult } from "@/app/api/news/route";


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const list = await getAllNews();
  const which = list.find(w => w.id === id);
  if (!which) {
    return {};
  }
  const raw = await readFile(which.filename, { encoding: "utf-8" });
  const { data } = matter(raw);
  
  return {
    title: data.title ?? "Untitled News",
  };
}

const NewsDetailPage: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const { id } = await params;
  const r = await fetch(new URL(`/api/news?id=${id}`, process.env.NEXT_PUBLIC_DEPLOY_DOMAIN), { method: "GET" });
  if (r.status !== 200) {
    return (
      <>Not found.</>
    );
  }
  const res = await r.json() as IGetNewsResult;
  const { raw, title, cover, atime, ctime } = res;
  const { content } = matter(raw);
  const code = String(
    await compile(content, { outputFormat: 'function-body' })
  );
  const { default: MDXContent } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  const createdAt = new Date(ctime).toLocaleDateString();
  const modifiedAt = new Date(atime).toLocaleDateString();
  const edited = createdAt !== modifiedAt;

  return (
    <div className="text-center w-full pb-32">
      <div className="max-w-4xl mx-auto text-left">
        <section className={`md:px-12 pb-10 ${cover ? "-mt-8 xl:mt-0" : ""}`}>
          {cover && (
            <div className="relative w-full min-h-[20vh] max-h-60 md:max-h-80 overflow-hidden bg-gray-100 mb-6 md:mb-8">
              <Image
                src={cover}
                alt="cover"
                width={1200}
                height={400}
                draggable={false}
                className="block w-full h-full overflow-hidden object-cover object-center"
              />
              <div
                className="absolute inset-0 pointer-events-none shadow-inner"
                role="presentation"
                aria-hidden="true"
                style={{
                  // @ts-expect-error vars
                  "--tw-shadow": "inset 0 -6px 8px 0px rgb(0 0 0 / 0.05)",
                }}
              />
            </div>
          )}
          <h1 className={`text-xl leading-7 landscape:text-2xl landscape:leading-8 md:text-3xl md:leading-10 font-bold text-gray-900 tracking-widest text-center portrait:mt-4 my-6`}>
            {title}
          </h1>
          <div className="text-end text-gray-500 text-sm">
            <time>{createdAt}</time>
            {edited && (
              <>
                &nbsp;<span>(edited at</span><time>{modifiedAt}</time><span>)</span>
              </>
            )}
          </div>
          <article className="mt-10 pb-8 text-gray-700 text-lg leading-8" id="main">
            <MDXContent components={mdxComponents} />
          </article>
        </section>
      </div>
    </div>
  );
};


export default NewsDetailPage;
