---
title: Minimal overview
description: The smallest valid Ojuny template and the terminal installer that installs it.
sidebar:
  order: 1
type: explanation
audience: user
appliesTo: ojuny-minimal-template, ojuny-minimal-installer
source: ~/repos/ojuny-future-repos/ojuny-minimal-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Minimal is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny Minimal is the smallest template that meets the Ojuny install and boot contract. It is a dendritic NixOS flake with a base system configuration, three generated machine modules, a setup script, and a static check. It carries nothing that the install and boot path does not need.

The variant is split into two repositories, so that the template stays forkable and the installer stays generic. The `ojuny-minimal-template` repository is the starter a user forks. The `ojuny-minimal-installer` repository holds the reference terminal installer for every Ojuny template, including this one.

## Position in the project

The full `ojuny-template` remains the desktop template with settings pages, the desktop layer, and patches. Minimal is the base a person starts from when that template contains too much. Pro, Console, and Home Server are separate products that follow the same template shape, not derivatives this repository tracks.

## What the template contains

- A dendritic flake built from `nixpkgs`, `flake-parts`, and `import-tree`.
- Base configuration for the hostname, state version, locale, keymap, NetworkManager, and flakes.
- Generated hardware, bootloader, user, and host modules.
- The setup and generator scripts, a check app, and a static `checks.template`.

## What it leaves to the fork

The starter has no desktop, compositor, settings GUI, application catalog, patch switch, secrets store, or binary cache. It also has no Home Manager input, no multi-host shape, and no installer implementation, which lives in the companion repository, and the starter makes no promise of a comfortable daily-driver desktop.

## Install and boot

Installation runs through the setup app on an existing NixOS system or through the terminal installer ISO on a blank machine. The installed system boots to a console login and leaves desktops, settings GUIs, applications, and patches to the fork.

## Next

For the next step, read [installation](/minimal/docs/installation/), then [configuration](/minimal/docs/configuration/), or go straight to [requirements](/minimal/docs/requirements/) and [limits](/minimal/docs/limits/).
