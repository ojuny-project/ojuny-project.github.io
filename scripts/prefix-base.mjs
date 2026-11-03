import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const base = process.env.SITE_BASE ?? "/";
const basePath = base.endsWith("/") ? base : `${base}/`;
const baseWithoutSlash = basePath.replace(/\/$/, "");

if (basePath === "/") {
  console.log("SITE_BASE is root, no link rewriting needed");
  process.exit(0);
}

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const attribute = /\b(href|src)="(\/(?!\/)[^"]*)"/g;

async function rewrite(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewrite(path);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;

    const html = await readFile(path, "utf8");
    const updated = html.replace(attribute, (match, name, value) => {
      if (value.startsWith(basePath)) return match;
      if (value === baseWithoutSlash || value === "/") return `${name}="${basePath}"`;
      return `${name}="${basePath}${value.slice(1)}"`;
    });

    if (updated !== html) await writeFile(path, updated);
  }
}

await rewrite(root);
console.log(`Prefixed root-relative links with ${basePath}`);
