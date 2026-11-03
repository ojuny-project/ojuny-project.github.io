---
title: ojuny-patches CLI
description: Quickstart for installing and removing patches.
sidebar:
  order: 2
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

:::caution
Ojuny is pre-release. The CLI is incomplete: parts of its designed surface are
not implemented, and commands may be missing or change.
:::

`ojuny-patches` manages patches. A patch is a flake-parts module with
nix-settings-gui annotations. Installing a patch copies one Nix module into your
flake. It does not enable the patch and does not rebuild.

## Quickstart

```sh
ojuny-patches sync
ojuny-patches list available
ojuny-patches install patch-development
ojuny-patches list installed
ojuny-patches info patch-development
```

Enable the patch in the settings menu under Patches, then rebuild. Patches are
disabled by default.

To remove a patch, disable it, rebuild, then run:

```sh
ojuny-patches remove patch-development
```

Removing a patch while its switch is still enabled leaves an option set without
a declaration and fails evaluation.

## Configure

The default flake is `~/repos/nix-flake` and the default patch directory is
`modules/patches`. Change them with:

```sh
ojuny-patches configure local_repository <path>
ojuny-patches configure patch_directory <path>
```

## Trust

Patches are third-party Nix code with build privileges. There is no sandbox.
Only add repositories you trust and read the module before enabling it.

## Read more

- [CLI usage in the manual](/ojuny-manual/usage/cli/)
- [Patches overview](/patches/overview/)
- [Patch security](/patches/security/)
- `man ojuny-patches`
- [ojuny-patches registry](https://github.com/ojuny-project/ojuny-patches)
- [Project status](/status/)
