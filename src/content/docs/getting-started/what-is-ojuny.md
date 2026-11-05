---
title: What is Ojuny?
description: The project, the layers, the audience, and the boundaries.
sidebar:
  order: 1
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny is a flexible set of Nix configurations that makes Nix, Linux, and tiling
window managers approachable. The public label is **Unapologetically
dotfiles**. The technical relationship is a wrapper around NixOS.

It is not a fork of NixOS, a separate package manager, a new compositor, or a
new desktop shell. It is not a competitor to NixOS or its upstream projects. It
is a configuration and packaging layer over upstream projects. The compositor
is [MangoWM](https://github.com/mangowm/mango) and the desktop shell is
[Dux Modular Shell](https://github.com/duxlabs-dev/dux-shell). Runtime identifiers still
use the shorter `dms` name.

Status: pre-release. There is no release schedule. The `ojuny` CLI is pending:
parts of its designed command surface are not implemented.

## Why it exists

The usual Linux desktop is hard to hand to another person: a wiki, a folder of
dotfiles, machine-specific values, and a troubleshooting ritual. Ojuny wants a
desktop that can be read by someone who did not write it, rebuilt by someone
who has never seen the machine, and handed over without a folder of secrets.

Two rules follow from that:

- Personal and machine data is generated, not committed.
- Everything a normal user would want as a setting is exposed through a GUI
  page, with advanced, hidden, and unexposed options kept separate.

The project also takes a position on AI-assisted software. The detailed design
is human. AI is used as a tool for debugging, analysis, testing, and code
translation, not as an author or decision maker. The rule is to read the diff.
Core Ojuny ships no agent or chatbot.

## Why Nix

The argument is about system state, not syntax preference.

Imperative mutable distributions change state over time as the user uses them,
which produces instability. Imperative immutable or atomic distributions
prevent some mutation but make modification harder. Nix gives immutable,
atomic system management while keeping the customization of a rolling-release
system.

The claim is not that Nix is easy. The tradeoff is that the whole system can be
changed from one declarative configuration, and those changes can be traced and
reverted. The settings menu exists to make that tradeoff tolerable for users
who do not want to learn Nix on day one.

This model also makes AI-assisted troubleshooting safer. An agent can read and
propose changes to Nix configuration instead of guessing at random system state
files. Changes are reviewable and revertible.

## The pieces

Ojuny is split across six public repositories.

| Piece | Repository | Role |
| --- | --- | --- |
| Desktop | [ojuny-desktop](https://github.com/ojuny-project/ojuny-desktop) | MangoWM and Dux Modular Shell, generated configuration, NixOS and Home Manager modules, nested runner |
| Template | [ojuny-template](https://github.com/ojuny-project/ojuny-template) | Forkable NixOS flake, settings pages, setup script, generated machine data |
| CLI | [ojuny-cli](https://github.com/ojuny-project/ojuny-cli) | `ojuny` runtime and flake commands, `ojuny-patches` patch manager |
| Installer | [ojuny-installer](https://github.com/ojuny-project/ojuny-installer) | Attended Calamares main, discovery, and offline ISOs; unattended online, offline, and discovery ISOs; persistent image builder |
| Patches | [ojuny-patches](https://github.com/ojuny-project/ojuny-patches) | Patch interface and default registry; patches are third-party content |
| Site | [ojuny-site](https://github.com/ojuny-project/ojuny-site) | Public documentation and color-scheme previews |

The desktop layer is consumed by the template. The installer produces a
template-based system. The CLI operates on an installed template. Patches
extend it without forking it.

## What a normal user gets

- A Wayland desktop session with MangoWM.
- Dux Modular Shell with a bar, launcher, dashboard, control center, notifications,
  clipboard history, on-screen display, sounds, lock and power controls, and an
  application menu. The dock is available but off by default.
- Master, dwindle, and scroller layouts, workspaces and tags, window rules, and
  structured keybinds.
- A generated keybind cheatsheet from the same definitions that configure the
  session.
- A base16 theme system driven by `pkgs.base16-schemes`, with Everforest Dark
  Hard as the default.
- A settings menu that presents user-facing options as pages and writes changes
  back to the Nix files.
- A flake they own, with generated hardware, user, and host modules.
- Hardware detection from a generated `facter.json`, with an automatic or
  manual `nixos-hardware` profile on the hardware page.
- An optional UEFI Secure Boot setup through Lanzaboote, off by default and
  configured from the settings menu.
- A user-driven update workflow based on flake inputs and NixOS generations.
- Nix and nixpkgs, Flatpak through a patch, and flakes for third-party
  software. No AUR.
- Optional patches for development tools, Flatpak, Docker, virtualization,
  Nix shell aliases, secrets, password managers, and remote desktop.

## What is not included

Ojuny deliberately leaves out personal infrastructure and personal workflow
tooling. There is no G13 driver, core secrets store, Hydra instance, binary
cache, server host configuration, or personal user split. Secrets and password
managers are opt-in third-party patches: `patch-secrets` and
`patch-password-manager`. There is no AUR, no proprietary subscription app by
default, no telemetry, and no AI-generated images, videos, animations, or
audio.

Secure Boot is optional and UEFI-only, and it is not a security guarantee. Core
Ojuny otherwise makes no security overclaims: it promises secure defaults and
no self-inflicted vulnerabilities, not that a modified system stays secure.

Ojuny has no package repositories or distribution infrastructure of its own. It
has no own git host, Hydra build server, or Nix cache. It uses NixOS
repositories, Flathub, and GitHub. A binary cache is a future infrastructure
goal, not a shipped service.

Core Ojuny is not a company, foundation, or paid product. It has no funding, no
support team, and no formal governance structure. It is maintainer-led with an
explicit intent to become community-maintained.

## Who it is for

The initial release targets experienced and intermediate users. An intermediate
user is willing to use the terminal, knows basic commands such as `ls`, `cd`,
`cat`, and `grep`, is willing to troubleshoot, and enjoys basic tinkering.

New Linux users are a future target, not the first-release target. Developers
are the secondary audience: NixOS and tiling window managers provide
reproducible environments, good terminal workflows, and a system that can be
versioned like code.

Ojuny is not for users who want a different compositor, a different shell, KDE,
or GNOME as a supported core mode. A patch can introduce another desktop, but
that is an extension with its own support burden.

## Release and support

There is no release schedule. The project publishes when the components are
presentable, and the status page records what is tested.

Ojuny comes with no warranty and no support contract. Support is limited to
opening an issue on GitHub. There is no support team. Community answers in
Ojuny, NixOS, Dux Modular Shell, and MangoWM spaces are best effort and not a promise.

## Ownership

The user owns the system and its configuration. Ojuny owns only the published
source repositories and the main patch repository. After install, interactions
with Ojuny-owned components are transient and largely optional.

> When you install ojuny, that is not my desktop. It is yours.

If it needs to persist, it goes in the flake. The forked git repository is the
durable artifact. An Ojuny install can be converted back into a normal NixOS
installation, and the reverse is also true.

## Terms

- **Ojuny**: the project and the desktop experience. Capitalized in prose.
- **`ojuny`**: the command and code prefix.
- **Dux Modular Shell**: the desktop shell, consumed from upstream.
- **`dms`**: the lowercase runtime identifiers retained by Dux Modular Shell in its
  binary, directories, service, and IPC.
- **Desktop layer**: `ojuny-desktop`, the package and modules that expose
  options under `desktop.ojuny.*`, including `desktop.ojuny.dux.*`.
- **Template**: `ojuny-template`, the forkable NixOS flake.
- **Patch**: an optional Nix module installed from a git repository.
- **Settings menu**: the GUI provided by `nix-settings-gui`.
- **Dendritic**: the flake composition pattern using flake-parts and
  import-tree.

## The doctrine

The project publishes seven rules as the
[Ojuny Doctrine](/doctrine/): generalized, settings-menu first, one file per
page, dendritic, names carry ordering, generated not committed, and upstream
first.

## Where to go next

- [Requirements](/getting-started/requirements/) for the platform and Nix
  setup.
- [Installation](/getting-started/installation/) for the install paths.
- [Template layout](/configuration/template-layout/) for the repository shape.
- [Desktop overview](/desktop/overview/) for the desktop experience.
