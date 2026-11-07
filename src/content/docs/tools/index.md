---
title: Tools
description: The command-line and desktop tools shipped with Ojuny, with links to each tool's options reference.
sidebar:
  order: 1
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny ships two command-line tools and six desktop tools. Each entry gives the
short version and links to the options reference owned by the tool's repository.

## Command-line tools

### `ojuny`

Wraps the tools that already own a feature: display, network, audio, media,
flakes, services, and diagnostics. It does not store configuration or edit Nix
files.

- [Site guide](/cli/ojuny/)
- [Options reference](https://github.com/ojuny-project/ojuny-cli/blob/main/docs/cli-reference.md)
- [Manual](https://ojuny-project.github.io/ojuny-manual/usage/cli/)

### `ojuny-patches`

Manages git-backed patch repositories. Installing a patch copies one Nix module
into the flake. It does not enable the patch or rebuild.

- [Site guide](/cli/ojuny-patches/)
- [Options reference](https://github.com/ojuny-project/ojuny-cli/blob/main/docs/patches.md)

## Desktop tools

### `nix-settings-gui`

Renders `@menu` and `@option` comments as an editable settings window. Each save
writes the change back to the Nix source.

- [Site guide](/configuration/settings-gui/)
- [Options reference](https://github.com/ojuny-project/nix-settings-gui/blob/main/OPTIONS.md)

### `nix-regedit`

Presents a flake as a registry-editor tree. It edits the selected values in
place.

- [Options reference](https://github.com/ojuny-project/nix-regedit/blob/main/OPTIONS.md)

### `nix-shell-gui`

Browses nixpkgs and launches a package with `nix run` or `nix shell`. The package
is not installed.

- [Options reference](https://github.com/ojuny-project/nix-shell-gui/blob/main/OPTIONS.md)

### `simple-nix-update-gui`

Checks whether the running system matches its remote flake. It starts a rebuild
from the result and is not a package updater.

- [Site guide](/configuration/updates/)
- [Options reference](https://github.com/ojuny-project/simple-nix-update-gui/blob/main/OPTIONS.md)

### `nix-cleaner`

Groups store paths by package and shows garbage-collection roots. Cleaning runs
through `pkexec` with a fresh scan check.

- [Site guide](/configuration/updates/#garbage-collection-and-the-store)
- [Options reference](https://github.com/ojuny-project/nix-cleaner/blob/main/OPTIONS.md)

### `nix-cache-discovery`

Runs a LAN binary-cache proxy. It discovers peers, serves the local store, and
proxies paths it does not hold.

- [Site guide](/configuration/updates/#lan-cache)
- [Options reference](https://github.com/ojuny-project/nix-cache-discovery/blob/main/OPTIONS.md)
