import { spawn } from "child_process";

import type { NextConfig } from "next";
import NextMDX from "@next/mdx";

import { throttle } from "./src/utils/functions";


const withMDX = NextMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack(config, { dev, isServer }) {
    const cmdUpdateFeeds = 'node scripts/generateFeeds.js';
    
    if (isServer) {
      const executeCLICommand = throttle((stage: 'HMR' | 'Build') => {
        const child = spawn(cmdUpdateFeeds, { shell: true });
  
        child.stdout.on('data', (data) => {
          process.stdout.write(`[CLI Output] ${data}`);
        });
  
        child.stderr.on('data', (data) => {
          process.stderr.write(`[CLI Error] ${data}`);
        });
  
        child.on('exit', (code) => {
          console.log(`[${stage}] CLI command exited with code: ${code}`);
        });
      }, 1_000);
  
      if (dev) {
        // HMR hook
        config.plugins.push({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          apply: (compiler: any) => {
            compiler.hooks.beforeCompile.tapAsync('CLICommandPlugin', (_: unknown, cb: () => void) => {
              executeCLICommand('HMR');
              cb();
            });
          },
        });
      } else {
        config.plugins.push({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          apply: (compiler: any) => {
            compiler.hooks.beforeCompile.tapAsync('CLICommandPlugin', (_: unknown, cb: () => void) => {
              executeCLICommand('Build');
              cb();
            });
          },
        });
      }
    }

    return config;
  },
};


export default withMDX(nextConfig);
