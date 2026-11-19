---
title: Home Server tools
description: The Ojuny-specific tools included with Ojuny Home Server.
sidebar:
  order: 9
type: reference
audience: user
appliesTo: ojuny-home-server-template
source: ~/repos/ojuny-future-repos/ojuny-home-server-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Home Server is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Home Server includes its own appliance panel, the workstation tools for editing the flake, and the installer. The GTK tools run on a workstation, not on the server.

## Server tools

### Home Server panel

The dashboard for enabled services, health, storage, network, and backup. It also drives service enable and disable, DNS, and the reverse proxy.

- [Services](/home-server/docs/services/)
- [Storage](/home-server/docs/storage/)

### First-run wizard

Confirms the administrator, creates the first storage pool and share, and enables services one at a time.

- [Installation](/home-server/docs/installation/)
- [Recovery](/home-server/docs/recovery/)

### `nix-cache-discovery`

Runs a LAN binary-cache proxy for the home network. It discovers peers, serves the local store, and proxies paths it does not hold.

- [Site guide](/configuration/updates/#lan-cache)
- [Options reference](https://github.com/ojuny-project/nix-cache-discovery/blob/main/OPTIONS.md)

## Desktop tools

These tools run on the workstation that manages the server.

### `nix-settings-gui`

Renders `@menu` and `@option` comments as an editable settings window for the server flake.

- [Site guide](/configuration/settings-gui/)
- [Options reference](https://github.com/ojuny-project/nix-settings-gui/blob/main/OPTIONS.md)

### `nix-shell-gui`

Browses nixpkgs and launches a package with `nix run` or `nix shell` from the workstation.

- [Options reference](https://github.com/ojuny-project/nix-shell-gui/blob/main/OPTIONS.md)

### `simple-nix-update-gui`

Checks whether the server flake matches its remote and starts a rebuild from the result.

- [Site guide](/configuration/updates/)
- [Options reference](https://github.com/ojuny-project/simple-nix-update-gui/blob/main/OPTIONS.md)

## Install tools

### Home Server installer

The attended ISO, the unattended ISO, the raw disk image, and the module path for an existing NixOS system.

- [Installation](/home-server/docs/installation/)
- [Storage](/home-server/docs/storage/)

The server does not run a desktop, so the GTK tools are not installed on the appliance. Nix Web GUI is not the appliance panel and is not required.
