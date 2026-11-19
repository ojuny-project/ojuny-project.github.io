#!/usr/bin/env node
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DOCS_ROOT = "src/content/docs";
const REGISTRY = "src/data/variants.json";
const PALETTES = "src/data/base16.json";
const CORE_DIRECTORIES = new Set([
  "cli",
  "configuration",
  "desktop",
  "getting-started",
  "install",
  "patches",
  "tools",
]);
const CONTENT_EXTENSIONS = new Set([".md", ".mdx"]);

const failures = [];

function fail(message) {
  failures.push(message);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)));
    } else if (CONTENT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(entryPath.split(path.sep).join("/"));
    }
  }

  return files;
}

function frontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  return match ? match[1] : "";
}

function hasField(block, name) {
  return new RegExp(`^${name}:\\s*\\S`, "m").test(block);
}

async function main() {
  const variants = JSON.parse(await readFile(REGISTRY, "utf8"));
  const palettes = JSON.parse(await readFile(PALETTES, "utf8"));
  const schemeIds = new Set(palettes.schemes.map((scheme) => scheme.id));

  const topLevel = (await readdir(DOCS_ROOT, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const slugs = new Set(variants.map((variant) => variant.slug));

  for (const directory of topLevel) {
    if (!slugs.has(directory) && !CORE_DIRECTORIES.has(directory)) {
      fail(`${DOCS_ROOT}/${directory}: content directory is neither core docs nor a variant slug`);
    }
  }

  for (const variant of variants) {
    const slug = variant.slug;
    const root = `${DOCS_ROOT}/${slug}`;
    const hero = `${root}/index.mdx`;
    const docs = `${root}/docs`;

    if (!variant.slug || !variant.name || !variant.defaultScheme) {
      fail(`${REGISTRY}: ${slug || "(missing slug)"} needs slug, name, and defaultScheme`);
      continue;
    }

    if (!schemeIds.has(variant.defaultScheme)) {
      fail(`${REGISTRY}: ${slug} uses missing base16 scheme ${variant.defaultScheme}`);
    }

    if (!(await exists(hero))) {
      fail(`${hero}: missing variant hero page`);
    } else {
      const source = await readFile(hero, "utf8");
      const block = frontmatter(source);
      if (!hasField(block, "title") || !hasField(block, "description")) {
        fail(`${hero}: frontmatter needs title and description`);
      }
      if (!/template:\s*splash/.test(block)) {
        fail(`${hero}: hero page must use template: splash`);
      }
      if (!/VariantHero/.test(source) || !new RegExp(`slug=["']${slug}["']`).test(source)) {
        fail(`${hero}: hero page must render VariantHero with slug="${slug}"`);
      }
    }

    if (!(await exists(docs))) {
      fail(`${docs}: missing variant documentation directory`);
      continue;
    }

    const pages = await walk(docs);
    if (pages.length === 0) {
      fail(`${docs}: variant needs at least one documentation page`);
    }

    if (!pages.some((page) => page.endsWith("/overview.md") || page.endsWith("/overview.mdx"))) {
      fail(`${docs}: variant needs an overview page`);
    }

    if (!(await exists(`${docs}/tools.md`))) {
      fail(`${docs}: variant needs a tools page`);
    }

    for (const page of pages) {
      const source = await readFile(page, "utf8");
      const block = frontmatter(source);
      if (!hasField(block, "title") || !hasField(block, "description")) {
        fail(`${page}: frontmatter needs title and description`);
      }
      for (const field of ["type", "audience", "appliesTo", "source"]) {
        if (!hasField(block, field)) {
          fail(`${page}: frontmatter needs ${field}`);
        }
      }
      if (!/sidebar:\n(?: {2,}.*\n)*? {2}order:/m.test(block)) {
        fail(`${page}: frontmatter needs sidebar.order`);
      }
      if (!source.includes("unreleased-marker")) {
        fail(`${page}: missing unreleased marker`);
      }
    }
  }

  if (failures.length > 0) {
    for (const failure of failures) console.error(`variant check: ${failure}`);
    process.exit(1);
  }

  console.log(`variant check: ${variants.length} variants OK`);
}

await main();
