---
title: Minimal tools
description: The Ojuny-specific tools included with Ojuny Minimal.
sidebar:
  order: 9
type: reference
audience: user
appliesTo: ojuny-minimal-template
source: ~/repos/ojuny-future-repos/ojuny-minimal-installer/README.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Minimal is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Minimal is the terminal path. The tool set is the installer and the two template apps, with no desktop tools and no browser settings surface.

## Installer tools

### `ojuny-install`

The reference terminal installer. It checks the machine, acquires the template, partitions and formats, generates hardware, runs `nixos-install`, and finishes the configuration.

- [Installer reference](/minimal/docs/installer/)
- [Repository](https://github.com/ojuny-project/ojuny-minimal-installer)

## Template tools

### Setup app

`nix run .#setup` clones a fork, generates the hardware, host, and user modules, and offers a rebuild.

- [Template shape](/minimal/docs/template-shape/)
- [Repository](https://github.com/ojuny-project/ojuny-minimal-template)

### Check app

`nix run .#check` validates the module names, scripts, and configuration before an install. The `-- --system` and `-- --static` modes cover evaluation and file layout.

- [Template shape](/minimal/docs/template-shape/)
- [Limits](/minimal/docs/limits/)

## Not included

Minimal does not include `nix-settings-gui`, `nix-regedit`, `nix-shell-gui`, `simple-nix-update-gui`, `nix-cleaner`, `nix-cache-discovery`, Nix Web GUI, the Ojuny CLI, or `ojuny-patches`. Those are additions a fork can make.
