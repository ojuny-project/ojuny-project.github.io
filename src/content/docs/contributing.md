---
title: Contributing
description: Repositories, documentation sources, public copy rules, and site development.
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

## Where things live

| Area | Repository |
| --- | --- |
| Desktop and options | [ojuny-desktop](https://github.com/ojuny-project/ojuny-desktop) |
| Template | [ojuny-template](https://github.com/ojuny-project/ojuny-template) |
| Settings menu and supporting GUI tools | [nix-settings-gui](https://github.com/ojuny-project/nix-settings-gui), [nix-shell-gui](https://github.com/ojuny-project/nix-shell-gui), [nix-regedit](https://github.com/ojuny-project/nix-regedit), [simple-nix-update-gui](https://github.com/ojuny-project/simple-nix-update-gui) |
| CLI and patch manager | [ojuny-cli](https://github.com/ojuny-project/ojuny-cli) |
| Installer | [ojuny-installer](https://github.com/ojuny-project/ojuny-installer) |
| Patch registry | [ojuny-patches](https://github.com/ojuny-project/ojuny-patches) |
| Site | [ojuny-site](https://github.com/ojuny-project/ojuny-site) |

Open issues in the repository that owns the affected code. Security issues in a
patch go to the repository that publishes the patch. Security issues caused by an
upstream project go to that project privately.

## Documentation sources

The site combines two sources:

- The component repositories for implementation details, commands, paths, and
  options. Each component repository also owns its own documentation.
- A private project documentation set for project intent, architecture, scope,
  UX, security, AI policy, naming, upstream policy, and the maintainer
  interview. It is not published.

The maintainer interview is authoritative for intent where older repository
documents disagree. The repositories remain the implementation source. The site
is the public entry point. The component repositories, the manual, and the
canon each own their own content.

The patch registry is the source of truth for patch modules. The template keeps
seven pre-included example copies; new patches belong in the registry.

There is no release schedule. See the status page for what is tested.

## Public copy rules

- Prefer **wrapper around NixOS**, **dotfiles**, **desktop**, or
  **configuration**. Avoid **distro**, **OS**, and **platform** in public copy.
- Do not directly call out competing projects on public pages. Use subtle
  references and similarities, not direct comparisons.
- Do not describe Ojuny as a fork of NixOS, a package repository, a new
  compositor, or a new shell.
- Do not claim Ojuny has its own git host, Hydra, or Nix cache. It uses NixOS
  repositories, Flathub, and GitHub.
- Do not describe Ojuny as a company, foundation, paid product, or
  enterprise-supported product.
- Do not make bold security claims. Ojuny is secure by default, not a
  security-focused product.
- Do not claim Ojuny is anti-AI or 100 percent AI-free.
- Do not claim AI-generated images, videos, animations, or audio.
- Do not describe patches as part of core Ojuny. Patches are third-party
  content; Ojuny provides the interface and the default registry.
- Do not claim patches are sandboxed.
- Do not claim Ojuny ships a built-in AI agent or chatbot.

## AI policy

- Design and all decisions are human.
- AI is used for debugging, code analysis, testing, and code translation.
- AI does not make decisions.
- AI is used for static, targeted security analysis now; sandboxed penetration
  testing is a future possibility.
- The rule is not "trust the model"; it is "read the diff."
- Core Ojuny ships no explicit AI features. The development patch includes
  `opencode`; other patches may add more.
- Patches that are vibe-coded must be marked in the registry.
- Responsibility for an AI-assisted patch stays with the person who made it.
- Contributor disclosure rules are not decided. A disclosure policy takes effect
  when the project starts accepting pull requests.

## Funding and support

Ojuny has no funding, no donation link, no paid tier, and no support team.
Support is community-bound and best effort. Support comes from the Ojuny, NixOS,
Dux Modular Shell, and MangoWM communities.

The binary cache is a future infrastructure goal, not a shipped service. Install
time on low-end systems is the acknowledged weak point.

## Site development

The site is Astro 7 and Starlight. The development shell provides Node 24, git,
Python 3, and nixfmt.

```sh
git clone https://github.com/ojuny-project/ojuny-site
cd ojuny-site
nix develop
npm ci
npm run dev
```

Useful commands:

```sh
npm run build
npm run preview
npm run check
npm run og
npm run wallpaper:preview
npm run update:base16
```

`npm run update:base16` refreshes the pinned base16 scheme data.
`npm run wallpaper:preview` regenerates the wallpaper source used by the live
theme preview. `npm run og` regenerates the OpenGraph image. These are manual
maintenance steps, not part of the normal build.

Pull requests run `npm ci`, `npm run check`, and `npm run build` through GitHub
Actions. Pushes to `main` deploy `dist/` to GitHub Pages. The component
repositories currently have no CI workflows; run the checks defined in each
repository before opening a pull request.

## Content

Documentation lives in `src/content/docs/`. Homepage sections are in
`src/components/Home*.astro`; docs pages are Markdown or MDX.

Keep commands, option names, and paths aligned with the component
repositories. If a page is adapted from another repository, add a source note
and link.

## Style

- Use the base16 CSS variables, not hard-coded colors.
- Keep the default palette as Everforest Dark Hard.
- Keep headings and command examples consistent with the existing pages.
- Test both a dark and a light scheme in the palette picker.
- Check keyboard navigation and mobile layout for interactive components.
- Keep public copy within the public copy rules above.

## License

The site and the component repositories are GPL-3.0. GPL-3.0 was chosen because
many upstream projects are GPL-3.0. Base16 scheme data is MIT licensed and
attributed in `THIRD_PARTY.md`. Credit the upstream projects:
NixOS, nixpkgs, flake-parts, import-tree, Home Manager, MangoWM, Dux Modular Shell,
Stylix, base16-schemes, Calamares, disko, and the supporting Nix GUI tools.
