# ojuny-site

The public site for the Ojuny project. It covers the desktop, the template,
the installer, the CLI, patches, downloads, and troubleshooting.

Ojuny is a configuration layer for
[MangoWM](https://github.com/mangowm/mango) and
[Dux Modular Shell](https://github.com/duxlabs-dev/dux-shell). The site says so plainly:
we package and configure upstream projects instead of rewriting them.

## Stack

- Astro 7 and Starlight
- Markdown and MDX content
- Pagefind search
- Base16 palettes from the Tinted Theming collection
- GitHub Pages through GitHub Actions
- Nix dev shell with Node 24

## Development

```sh
nix develop
npm ci
npm run dev
```

Useful commands:

```sh
npm run build          # production build to dist/
npm run preview        # preview the built site
npm run check          # Astro and TypeScript checks
npm run og                # regenerate the OpenGraph image
npm run wallpaper:preview # regenerate the wallpaper preview source
npm run update:base16     # refresh the pinned base16 scheme data
```

## Content

All documentation lives in `src/content/docs/` as Markdown or MDX. Adding a
page is one file:

```text
src/content/docs/getting-started/new-page.md
```

```markdown
---
title: New page
description: A short description for search and social previews.
sidebar:
  order: 5
---

Page content.
```

The sidebar uses Starlight autogenerate groups, so a new file in an existing
folder appears automatically. Use `sidebar.order` to control the position. The
Project group at the root is explicit because those pages are not in a folder.

The landing page header links to the docs, the manual, and the tools hub. The
tools hub at `src/content/docs/tools/index.md` links each tool to the options
reference owned by its repository.

The landing page is `src/content/docs/index.mdx`. It composes the `Home*.astro`
section components in `src/components/`. Homepage copy lives in the frontmatter
arrays of those components, so the page stays easy to edit without touching the
layout. The docs themselves remain Markdown.

The homepage is a full tour: a full-height wordmark image over an animated
hexagon field, a typewriter headline, a doctrine quote, a screenshot gallery
with an interactive layout tour, six install paths, a NixOS benefits section,
hardware, patches, optional agents, 360 themes, developer notes, gaming,
virtualization, news, figures, the upstream stack, the no-funding section, and
community links.

Root-relative links in Markdown, such as `/getting-started/requirements/`, are
rewritten to the configured base path after the Astro build. Author links as
root-relative and let `scripts/prefix-base.mjs` handle the deployment path.

## Theme system

The site uses base16 palettes instead of a plain dark/light toggle.

- `src/data/base16.json` contains 360 schemes pinned from
  `tinted-theming/schemes`.
- `src/scripts/theme.ts` applies a scheme, persists it in `localStorage`, and
  dispatches `ojuny:theme-change`.
- `src/components/ThemeProvider.astro` applies a stored scheme before first
  paint.
- `src/components/ThemeSelect.astro` is the searchable palette picker in the
  header.
- `src/components/PaletteGrid.astro` powers the color schemes page.
- `src/components/PalettePreview.astro` shows the live palette and recolors the
  wallpaper in the browser with the same source-fill mapping as
  `lib/recolor-wallpaper.py` in `ojuny-desktop`.
- `src/components/ThemeRail.astro` and `src/components/HomeThemes.astro` add the
  homepage theme rail and the `T` keyboard shortcut.
- `src/components/BrandImage.astro` and the script in `SiteTitle.astro` recolor
  the header logo, hero wordmark, and quote badge with the active palette.
- `src/components/HexagonField.astro` draws the animated, theme-aware hexagon
  field behind the hero wordmark.
- `scripts/make-wallpaper-preview.mjs` generates the small wallpaper source
  used by the live preview.
- `src/styles/base16.css` maps `base00` through `base0F` to Starlight, Pagefind,
  and Shiki variables.
- `scripts/update-base16.mjs` refreshes the vendored data from the pinned
  upstream commit.

The default is `everforest-dark-hard`. If JavaScript is unavailable, the
static CSS fallback is the same palette.

## Deployment

The deploy workflow runs on every push to `main` and publishes `dist/` to
GitHub Pages. In the repository settings, set **Pages > Build and deployment >
Source** to **GitHub Actions**.

The current deployment target is:

```text
https://ojuny-project.github.io/
```

The repository lives under the `ojuny-project` GitHub account and is named
`ojuny-project.github.io`, so the site is served from the domain root, not a
sub-path.

The workflow reads two repository variables:

| Variable | Default |
| --- | --- |
| `SITE_URL` | `https://ojuny-project.github.io` |
| `SITE_BASE` | `/` |

Set both variables only if the deployment target changes.

## Repository layout

```text
src/
  assets/           brand PNGs, logo, wallpaper source
  components/       homepage sections, header override, theme picker, palette grid
  content/docs/     Markdown documentation, including the tools hub
  data/base16.json  vendored palette data
  scripts/          theme, typewriter, and copy-code clients
  styles/           base16 mapping, homepage, layout, code styles
public/             favicon, wallpaper preview, OG image, manifest
scripts/            base16 refresh, wallpaper preview, OG generation
.github/workflows/  Pages deploy and pull request checks
```

## Content sources

The documentation is adapted from:

- `~/repos/ojuny-docs` for intent, architecture, UX, scope, security, AI
  policy, naming, upstream policy, and the maintainer interview
- `ojuny-template/docs`
- `ojuny-desktop/README.md`, `DESIGN.md`, and `options.md`
- `ojuny-cli/README.md` and `docs/`
- `ojuny-installer/README.md`
- the Calamares branding in `ojuny-installer`

The maintainer interview in `ojuny-docs` is authoritative for intent where
older repository documents disagree. The component repositories remain the
implementation source.

## License and credits

The site is GPL-3.0. Base16 palette data is MIT licensed and attributed in
[`THIRD_PARTY.md`](./THIRD_PARTY.md).

Ojuny is written with AI in the loop. The code is still read, tested, and
reviewed. The rule is not "trust the model"; it is "read the diff."

