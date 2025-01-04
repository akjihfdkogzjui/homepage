# Meng Zhang's Homepage

## How to Run This Project

1. Make sure you've installed `node.js` (>= v20 suggested).
2. Run `npm install` to install all dependencies.
3. Edit. A server can be started at localhost with the `npm run dev` command.
4. If you need a production-environment product, run `npm run build`.
5. Use git to commit your update.

## Development

### Project Structure

```plain text
/app        -- the router for the Next.js app
/public     -- media assets
/src        -- directory of Next.js app source code
```

_More information about the top-level files, see [Next.js app project structure](https://nextjs.org/docs/app/getting-started/project-structure) for help._


### Implementing a Page

Create a corresponding directory in `/app/`. E.g., the directory `/app/foo/bar/` would be routed as a HTML page and the path would be `<you-hostname>/foo/bar`.
However, a page needs a `page.mdx` / `page.md` / `page.tsx` / `page.js` file to export the modules required.
You could also create nested directories.

The top-level routes of `/app/` would make a link rendered in the navigator as default. This behavior can be defined by a `meta.json` file in the same directory.

```JSON
{
  "level": 999,   // [optional]
                  // the links can be sorted by the "level" key,
                  // otherwise they'll be sorted by alphabet.
  "hidden": true  // [optional]
                  // a route with `hidden=true` will
                  // not appear in the navigator.
}
```
