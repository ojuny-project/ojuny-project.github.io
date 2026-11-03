import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import { createCssVariablesTheme } from "shiki/core";

const site = process.env.SITE_URL ?? "https://ojuny-project.github.io";
const base = process.env.SITE_BASE ?? "/";
const basePath = base.endsWith("/") ? base : `${base}/`;
const ogImage = new URL(`${basePath}og.png`, site).href;

const base16Theme = createCssVariablesTheme({
  name: "base16",
  variablePrefix: "--shiki-",
  variableDefaults: {},
});

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  markdown: {
    shikiConfig: {
      theme: base16Theme,
      wrap: true,
    },
  },
  integrations: [
    starlight({
      title: "Ojuny",
      description:
        "An opinionated NixOS desktop built on MangoWM and Dux Shell.",
      favicon: "/favicon.svg",
      customCss: [
        "./src/styles/base16.css",
        "./src/styles/ojuny.css",
        "./src/styles/home.css",
        "./src/styles/code.css",
      ],
      expressiveCode: false,
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ojuny-project",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/ojuny-project/ojuny-site/edit/main/",
      },
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
        ThemeProvider: "./src/components/ThemeProvider.astro",
        ThemeSelect: "./src/components/ThemeSelect.astro",
        PageTitle: "./src/components/PageTitle.astro",
      },
      pagefind: true,
      head: [
        {
          tag: "meta",
          attrs: { name: "theme-color", content: "#272e33" },
        },
        {
          tag: "meta",
          attrs: { property: "og:type", content: "website" },
        },
        {
          tag: "meta",
          attrs: { property: "og:site_name", content: "Ojuny" },
        },
        {
          tag: "meta",
          attrs: { property: "og:image", content: ogImage },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:width", content: "1200" },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:height", content: "630" },
        },
        {
          tag: "meta",
          attrs: { name: "twitter:card", content: "summary_large_image" },
        },
        {
          tag: "meta",
          attrs: { name: "twitter:image", content: ogImage },
        },
        {
          tag: "link",
          attrs: { rel: "apple-touch-icon", href: `${basePath}apple-touch-icon.png` },
        },
        {
          tag: "link",
          attrs: { rel: "icon", type: "image/png", sizes: "32x32", href: `${basePath}favicon-32.png` },
        },
        {
          tag: "link",
          attrs: { rel: "manifest", href: `${basePath}site.webmanifest` },
        },
      ],
      sidebar: [
        {
          label: "Getting started",
          items: [{ autogenerate: { directory: "getting-started" } }],
        },
        {
          label: "Install",
          items: [{ autogenerate: { directory: "install" } }],
        },
        {
          label: "Desktop",
          items: [{ autogenerate: { directory: "desktop" } }],
        },
        {
          label: "Configuration",
          items: [{ autogenerate: { directory: "configuration" } }],
        },
        {
          label: "CLI",
          items: [{ autogenerate: { directory: "cli" } }],
        },
        {
          label: "Patches",
          items: [{ autogenerate: { directory: "patches" } }],
        },
        {
          label: "Project",
          items: [
            { label: "Downloads", slug: "downloads" },
            { label: "Glossary", slug: "glossary" },
            { label: "Color schemes", slug: "color-schemes" },
            { label: "Doctrine", slug: "doctrine" },
            { label: "Troubleshooting", slug: "troubleshooting" },
            { label: "Contributing", slug: "contributing" },
          ],
        },
      ],
    }),
    sitemap(),
  ],
});
