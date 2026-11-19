---
title: Console tools
description: The Ojuny-specific tools included with Ojuny Console.
sidebar:
  order: 9
type: reference
audience: user
appliesTo: ojuny-console-template
source: ~/repos/ojuny-future-repos/ojuny-console-desktop/README.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Console is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Console includes a controller-first settings frontend, the desktop tools, the command-line tools, and an optional browser management surface.

## Console tools

### `ojuny-console-settings`

The controller-first GTK4 frontend over `nix-settings-backend`. It exposes display, audio, controllers, power, and session settings from the couch.

- [Configuration](/console/docs/configuration/)
- [Controllers](/console/docs/controllers/)

### Console session

The `ojuny-console` session starts Steam Big Picture under gamescope. It leaves the standard Steam desktop entry untouched and keeps the desktop as a second target.

- [Sessions](/console/docs/sessions/)
- [Steam](/console/docs/steam/)

## Management tools

### `nix-web-gui`

The browser settings surface. It can be offered as an optional management service so another device can edit the console flake. This tool is still in development.

- [Console configuration](/console/docs/configuration/)
- [Repository](https://github.com/ojuny-project/nix-web-gui)

## Desktop tools

### `nix-settings-gui`

Renders `@menu` and `@option` comments as an editable settings window for the desktop target.

- [Site guide](/configuration/settings-gui/)
- [Options reference](https://github.com/ojuny-project/nix-settings-gui/blob/main/OPTIONS.md)

### `nix-shell-gui`

Browses nixpkgs and launches a package with `nix run` or `nix shell` on the desktop target.

- [Options reference](https://github.com/ojuny-project/nix-shell-gui/blob/main/OPTIONS.md)

### `simple-nix-update-gui`

Checks whether the running console flake matches its remote and starts a rebuild from the result.

- [Site guide](/configuration/updates/)
- [Options reference](https://github.com/ojuny-project/simple-nix-update-gui/blob/main/OPTIONS.md)

## Command-line tools

### `ojuny`

Wraps the tools that already own a feature: display, network, audio, media, flakes, services, and diagnostics.

- [Site guide](/cli/ojuny/)
- [Options reference](https://github.com/ojuny-project/ojuny-cli/blob/main/docs/cli-reference.md)

### `ojuny-patches`

Manages git-backed patch repositories for the console template.

- [Site guide](/cli/ojuny-patches/)
- [Options reference](https://github.com/ojuny-project/ojuny-cli/blob/main/docs/patches.md)

## Install tools

### Console installer

The attended ISO, the unattended ISO, the raw disk image, and the module path for an existing NixOS system.

- [Installation](/console/docs/installation/)
- [Sessions](/console/docs/sessions/)
