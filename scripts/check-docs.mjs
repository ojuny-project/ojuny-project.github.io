#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_ROOT = "src/content/docs";
const CONTENT_EXTENSIONS = new Set([".md", ".mdx"]);

const EXTERNAL_ROOT_PREFIXES = ["/ojuny-manual/"];

const PLACEHOLDERS = [
  { pattern: /your-org/gi, label: "your-org" },
  { pattern: /github:you\//gi, label: "github:you/" },
  { pattern: /\bTBD\b/g, label: "TBD" },
  { pattern: /\bTODO\b/g, label: "TODO" },
  { pattern: /coming soon/gi, label: "coming soon" },
  { pattern: /see defaults\/schema/gi, label: "see defaults/schema" },
];

async function walk(directory, root = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath, root)));
    } else if (CONTENT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(path.relative(root, entryPath).split(path.sep).join("/"));
    }
  }
  return files;
}

function cleanValue(raw) {
  const value = raw.trim();
  if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1);
  return value;
}

function parseFrontmatter(source) {
  const normalized = source.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: normalized, bodyLineOffset: 0 };

  const data = {};
  let section = null;
  for (const line of match[1].split("\n")) {
    if (/^\s*(?:#.*)?$/.test(line)) continue;
    const top = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (top) {
      section = top[1] === "sidebar";
      if (section) continue;
      data[top[1]] = cleanValue(top[2]);
      continue;
    }
    const nested = line.match(/^\s+([A-Za-z][\w-]*):\s*(.*)$/);
    if (nested && section) {
      data[`sidebar.${nested[1]}`] = cleanValue(nested[2]);
    }
  }

  const consumed = match[0];
  return {
    data,
    body: normalized.slice(consumed.length),
    bodyLineOffset: (consumed.match(/\n/g) ?? []).length,
  };
}

function lineAt(source, index) {
  if (index < 0) return 0;
  return source.slice(0, index).split("\n").length;
}

function linkTargets(source) {
  const targets = [];
  const pattern = /!?\[[^\[\]]*?\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g;
  for (const match of source.matchAll(pattern)) {
    targets.push({ target: match[1], index: match.index });
  }
  return targets;
}

function isExternal(target) {
  return (
    target === "" ||
    target.startsWith("#") ||
    target.startsWith("//") ||
    /^(?:https?:|mailto:|tel:|data:)/i.test(target)
  );
}

function probePaths(candidate) {
  const normalized = path.posix.normalize(candidate);
  const trimmed = normalized.replace(/^\/+|\/+$/g, "");
  if (trimmed === "" || trimmed === ".") {
    return ["index.md", "index.mdx"];
  }
  const base = trimmed.replace(/\/+$/g, "");
  return [
    trimmed,
    base,
    `${base}.md`,
    `${base}.mdx`,
    `${base}/index.md`,
    `${base}/index.mdx`,
  ];
}

function resolves(target, file, files) {
  const clean = target.split("#")[0].split("?")[0];
  if (clean === "") return true;

  let candidate;
  if (clean.startsWith("/")) {
    candidate = clean.slice(1);
  } else {
    candidate = path.posix.join(path.posix.dirname(file), clean);
  }

  return probePaths(candidate).some((probe) => files.has(probe));
}

function placeholderHits(source) {
  const hits = [];
  for (const { pattern, label } of PLACEHOLDERS) {
    pattern.lastIndex = 0;
    for (const match of source.matchAll(pattern)) {
      hits.push({ label, line: lineAt(source, match.index) });
    }
  }
  return hits;
}

async function main() {
  const root = process.argv[2] ?? DEFAULT_ROOT;
  const files = await walk(root);
  const fileSet = new Set(files);
  const failures = [];
  const stats = {
    files: files.length,
    links: 0,
    externalRootLinks: 0,
    placeholders: 0,
    frontmatter: 0,
    order: 0,
  };

  const orders = new Map();

  for (const file of files) {
    const source = await readFile(path.join(root, file), "utf8");
    const { data, body } = parseFrontmatter(source);

    if (!data.title || !data.description) {
      stats.frontmatter += 1;
      failures.push({
        file,
        line: 1,
        message: `frontmatter needs title and description (${[
          !data.title ? "title" : null,
          !data.description ? "description" : null,
        ]
          .filter(Boolean)
          .join(", ")})`,
      });
    }

    for (const { target, index } of linkTargets(body)) {
      if (isExternal(target)) continue;
      stats.links += 1;

      if (
        EXTERNAL_ROOT_PREFIXES.some(
          (prefix) =>
            target === prefix.replace(/\/$/, "") || target.startsWith(prefix),
        )
      ) {
        stats.externalRootLinks += 1;
        continue;
      }

      if (!resolves(target, file, fileSet)) {
        failures.push({
          file,
          line: lineAt(body, index),
          message: `link does not resolve: ${target}`,
        });
      }
    }

    const hits = placeholderHits(source);
    stats.placeholders += hits.length;
    for (const hit of hits) {
      failures.push({
        file,
        line: hit.line,
        message: `placeholder string: ${hit.label}`,
      });
    }

    const order = data["sidebar.order"];
    const hidden = data["sidebar.hidden"] === "true";
    if (order !== undefined && order !== "" && !hidden) {
      const directory = path.posix.dirname(file);
      if (!orders.has(directory)) orders.set(directory, new Map());
      const byOrder = orders.get(directory);
      if (!byOrder.has(order)) byOrder.set(order, []);
      byOrder.get(order).push(file);
    }
  }

  for (const [directory, byOrder] of orders) {
    for (const [order, group] of byOrder) {
      if (group.length > 1) {
        stats.order += group.length;
        failures.push({
          file: directory === "." ? "." : `${directory}/`,
          line: 0,
          message: `duplicate sidebar order ${order}: ${group.join(", ")}`,
        });
      }
    }
  }

  for (const failure of failures) {
    const location =
      failure.line > 0 ? `${failure.file}:${failure.line}` : failure.file;
    console.log(`${location} ${failure.message}`);
  }

  console.log(
    `check-docs: ${stats.files} page(s), ${stats.links} internal link(s), ` +
      `${stats.externalRootLinks} cross-site link(s), ` +
      `${stats.placeholders} placeholder(s), ` +
      `${stats.frontmatter} frontmatter problem(s), ` +
      `${stats.order} duplicate order(s).`,
  );

  if (failures.length > 0) {
    console.log(`check-docs: ${failures.length} failure(s).`);
    return 1;
  }

  console.log("check-docs: ok.");
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`check-docs: ${error.message}`);
    process.exit(2);
  });
