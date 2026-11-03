import { readFile } from "node:fs/promises";
import sharp from "sharp";

const palette = [
  "#272e33",
  "#2e383c",
  "#414b50",
  "#859289",
  "#9da9a0",
  "#d3c6aa",
  "#edeada",
  "#fffbef",
  "#e67e80",
  "#e69875",
  "#dbbc7f",
  "#a7c080",
  "#83c092",
  "#7fbbb3",
  "#d699b6",
  "#9da9a0",
];

const bars = palette
  .map(
    (color, index) =>
      `<rect x="${80 + index * 65}" y="500" width="60" height="16" rx="4" fill="${color}" />`,
  )
  .join("");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#272e33" />
  <circle cx="910" cy="250" r="150" fill="none" stroke="#7fbbb3" stroke-width="48" opacity="0.28" />
  <circle cx="910" cy="250" r="42" fill="#7fbbb3" opacity="0.28" />
  <rect x="80" y="72" width="96" height="96" rx="22" fill="#2e383c" />
  <circle cx="128" cy="120" r="29" fill="none" stroke="#7fbbb3" stroke-width="10" />
  <circle cx="128" cy="120" r="8" fill="#7fbbb3" />
  <text x="202" y="140" fill="#fffbef" font-family="sans-serif" font-size="54" font-weight="700">Ojuny</text>
  <text x="80" y="290" fill="#d3c6aa" font-family="sans-serif" font-size="46" font-weight="700">NixOS desktop, built from Nix.</text>
  <text x="80" y="350" fill="#9da9a0" font-family="sans-serif" font-size="28">MangoWM, Dux Shell, a settings menu, and base16 themes.</text>
  ${bars}
  <text x="80" y="570" fill="#859289" font-family="monospace" font-size="22">github.com/ojuny-project</text>
  <text x="1120" y="570" fill="#859289" font-family="monospace" font-size="22" text-anchor="end">everforest-dark-hard</text>
</svg>
`;

const logo = await readFile("src/assets/logo.svg", "utf8");

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
await sharp(Buffer.from(logo)).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(Buffer.from(logo)).resize(32, 32).png().toFile("public/favicon-32.png");

console.log("Wrote public/og.png, public/apple-touch-icon.png, public/favicon-32.png");
