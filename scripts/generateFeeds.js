/* eslint-disable @typescript-eslint/no-require-imports */
const { writeFileSync, existsSync, mkdirSync, readdirSync, statSync, readFileSync } = require("fs");
const path = require('path');

const baseDir = path.resolve(path.dirname(__filename), '..');
const appDir = path.resolve(baseDir, 'app');

const outputDir = path.resolve(baseDir, 'public', 'build');
const jsonFileName = path.resolve(outputDir, 'all-routes.json');

/**
 * @param {string} dir 
 * @param {(item: import('../src/utils/site').RouteNode) => void} cb 
 */
function recurse(dir, cb) {
  const seg = dir.split(path.sep);
  /** @type import('../src/utils/site').RouteNode */
  const data = {
    id: `/${path.relative(appDir, dir).replaceAll(/\\/g, '/')}`,
    name: seg[seg.length - 1],
  };
  data.name = data.name.slice(0, 1).toUpperCase() + data.name.slice(1);
  const ls = readdirSync(dir);
  for (const name of ls) {
    const fn = path.resolve(dir, name);
    const stat = statSync(fn);
    if (stat.isDirectory()) {
      recurse(fn, item => {
        data.children = (data.children || []).concat([item]);
      });
    } else {
      if (name.match(/^page\.(tsx|jsx?|mdx?)$/)) {
        cb(data);
      } else if (name === "meta.json") {
        try {
          const { level, hidden } = JSON.parse(readFileSync(fn, { encoding: 'utf-8' }));
          if (typeof level === 'number') {
            data.level = level;
          }
          if (hidden) {
            data.hidden = true;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
}

function main() {
  /** @type {import('../src/utils/site').RouteNode} */
  let routeTree = {};

  recurse(appDir, item => {
    routeTree = item;
  });

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  writeFileSync(jsonFileName, JSON.stringify(routeTree, undefined, 2), { encoding: 'utf-8' });
}


if (require.main === module) {
  main();
}
