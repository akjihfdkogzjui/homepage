import type { MDXComponents } from "mdx/types";

 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-4xl font-bold text-gray-900 my-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold text-gray-800 my-5">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-medium text-gray-700 my-4">{children}</h3>,
    p: ({ children }) => <p className="text-base text-gray-600 leading-7 my-3">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
    li: ({ children }) => <li className="mb-2">{children}</li>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-sm text-gray-800 px-1 py-0.5 rounded">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto my-4">{children}</pre>
    ),
    table: ({ children }) => (
      <table className="table-auto w-full border-collapse border border-gray-300">{children}</table>
    ),
    th: ({ children }) => (
      <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left">{children}</th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-300 px-4 py-2">{children}</td>
    ),
    a: ({ children, href }) => (
      <a href={href} className="text-blue-600 hover:text-blue-800 underline">
        {children}
      </a>
    ),
    ...components,
  };
};
