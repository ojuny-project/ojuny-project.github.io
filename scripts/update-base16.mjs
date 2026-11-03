import { mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { x } from "tar";
import { parse } from "yaml";

const COMMIT = "3ac91137e879502c442ab89ba0f1a98077d0da9d";
const SOURCE = "https://github.com/tinted-theming/schemes";
const REF = "spec-0.11";
const OUTPUT = "src/data/base16.json";

const archiveUrl = `https://codeload.github.com/tinted-theming/schemes/tar.gz/${COMMIT}`;
const workdir = await mkdtemp(join(tmpdir(), "ojuny-base16-"));
const archive = join(workdir, "schemes.tar.gz");

const response = await fetch(archiveUrl);
if (!response.ok) {
  throw new Error(`Could not download ${archiveUrl}: ${response.status}`);
}
await writeFile(archive, Buffer.from(await response.arrayBuffer()));
await x({ file: archive, cwd: workdir });

const root = (await readdir(workdir)).find((entry) => entry.startsWith("schemes-"));
if (!root) throw new Error("Could not find extracted schemes directory");

const themeDir = join(workdir, root, "base16");
const files = (await readdir(themeDir)).filter((file) => file.endsWith(".yaml"));
const schemes = [];

for (const file of files.sort()) {
  const id = file.replace(/\.yaml$/, "");
  const data = parse(await readFile(join(themeDir, file), "utf8"));
  const palette = data?.palette ?? {};
  const colors = {};

  for (let index = 0; index < 16; index += 1) {
    const key = `base0${index.toString(16).toUpperCase()}`;
    const value = palette[key];
    if (typeof value !== "string" || !/^#[0-9a-fA-F]{6}$/.test(value)) {
      throw new Error(`${id}: missing or invalid ${key}`);
    }
    colors[key] = value.toLowerCase();
  }

  schemes.push({
    id,
    name: data.name ?? id,
    author: data.author ?? "",
    variant: data.variant === "light" ? "light" : "dark",
    palette: colors,
  });
}

schemes.sort((a, b) => a.name.localeCompare(b.name));

const output = {
  source: SOURCE,
  ref: REF,
  commit: COMMIT,
  generated: new Date().toISOString(),
  default: "everforest-dark-hard",
  schemes,
};

await writeFile(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${schemes.length} schemes to ${OUTPUT}`);
