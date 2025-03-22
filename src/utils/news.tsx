import { isValidElement, type ReactElement } from "react";
import * as runtime from "react/jsx-runtime";
import matter from "gray-matter";
import { compile, run } from "@mdx-js/mdx";


export type News = {
  id: string;
  title: string;
  cover?: string;
  ctime: number;
  atime: number;
  preview: string;
};

const extractTextFromParagraphs = (el: ReactElement, insideP: boolean = false): string => {
  let result = '';

  if (typeof el.type === "function") {
    // @ts-expect-error checked
    return result += extractTextFromParagraphs(el.type(el.props), insideP);
  }

  if (Array.isArray(el)) {
    el.forEach(child => {
      result += extractTextFromParagraphs(child, insideP);
    });
  } else if (isValidElement(el) && typeof el.props === 'object' && el.props && "children" in el.props) {
    const isP = el.type === 'p';
    result += extractTextFromParagraphs(el.props.children as ReactElement, insideP || isP);
  } else if (typeof el === 'string' || typeof el === 'number') {
    if (insideP) {
      result += `${el}`;
    }
  }
  
  return result;
};

export const extractContent = async (raw: string): Promise<{ title: string; cover?: string; date?: string; content: string }> => {
  const { content, data } = matter(raw);
  
  const code = String(
    await compile(content, { outputFormat: "function-body" })
  );
  const { default: MDXContent } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });
  return {
    title: data.title ?? "(Untitled)",
    cover: data.cover as string | undefined,
    date: data.date as string | undefined,
    content: extractTextFromParagraphs(<MDXContent />),
  };
};
