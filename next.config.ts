import type { NextConfig } from "next";
import NextMDX from "@next/mdx";


const withMDX = NextMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};


export default withMDX(nextConfig);
