---
title: Patches overview
description: Third-party flake-parts modules that extend the flake.
sidebar:
  order: 1
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

A patch is a flake-parts module with nix-settings-gui annotations, designed for
easy integration with Ojuny. It is not a script and not a plugin with a private
API. It is NixOS configuration.

Patches are third-party content. Ojuny provides the interface and the default
registry; what users publish is up to them.

## What a patch can do

A patch can change anything a flake-parts module can change:

- Add packages.
- Enable services.
- Change existing options.
- Define new options.
- Add a settings page with `@menu` and `@option` annotations.
- Introduce a whole new desktop, if you want to carry that support burden.

There is no special patch sandbox and no separate patch API.

## Why patches instead of forks

Patches work like game modding. You place a file in a directory and the patch
engine picks it up. Each patch is self-contained, so patches do not create merge
conflicts with each other or with your configuration.

That is much simpler than maintaining a fork for one feature.

## The default registry

The default registry is
[ojuny-patches](https://github.com/ojuny-project/ojuny-patches). It is reviewed
for quality and security. It currently contains 43 patches, each a module plus
a metadata entry. The count comes from the generated
[CATALOGUE.md](https://github.com/ojuny-project/ojuny-patches/blob/main/CATALOGUE.md).
Examples include `patch-development`, `patch-flatpak`, `patch-docker`,
`patch-virtualization`, `patch-nixshell`, `patch-remote-desktop`,
`patch-secrets`, and `patch-password-manager`.

## Pre-included patches in the template

The template pre-includes seven patches. They are copies of modules from the
registry and are kept in sync with it. The registry is the source of truth for
names, metadata, and content; do not treat a pre-included copy as authoritative.
`patch-impermanence` is the exception: it is not in the registry, and the
nearest registry patch is `patch-home-snapshots`.

| Patch | Adds |
| --- | --- |
| `patch-development` | VSCodium, language servers, formatters, coding agents, and the project picker |
| `patch-flatpak` | Flatpak and the Bazaar app store |
| `patch-docker` | Docker daemon, pruning, and declarative containers |
| `patch-virtualization` | libvirt, QEMU settings, virt-manager, and a QEMU hook |
| `patch-nixshell` | Shell aliases that open `nix shell` with preset packages |
| `patch-remote-desktop` | RustDesk, Waypipe, WayVNC, and general VNC clients |
| `patch-impermanence` | Opt-in impermanence support |

`patch-secondary-desktop` lives in the registry and is not pre-included. That
is compatible with Ojuny not being natively multi-desktop: it is a patch, not
a core default.

## Install and enable

```sh
ojuny-patches sync
ojuny-patches list available
ojuny-patches install patch-development
```

Installation copies one module into your flake. It does not enable the patch or
rebuild. Enable it in the settings GUI under Patches, then rebuild.

Patches are disabled by default. Installation and removal are CLI-only; the
settings menu shows installed patches and lets you enable or disable them.

## Where they live

Installed patches live in the local flake:

```text
<local_repository>/<patch_directory>/<id>.nix
```

The defaults are `~/repos/nix-flake` and `modules/patches`. Both can be changed
with `ojuny-patches configure`.

## Dependencies

Patches can declare dependencies in their metadata. `ojuny-patches install`
checks the local patch directory for each dependency and installs missing ones
first. Cycles are rejected.

## Remove a patch

Turn it off in the settings GUI, rebuild, then remove the file, and rebuild
again:

```sh
ojuny-patches remove patch-development
```

Removing the file while the switch is still on leaves an option set without a
declaration and fails evaluation. If another installed patch lists this one as
a dependency, remove the dependent patch first.

## Trust

Patches are the primary security risk that Ojuny introduces. They are Nix code
with build privileges and no sandbox.

The patch manager is backed by git, and installation is one file copy. There
are no hashes or signatures, so the repository you sync and the module you
install are the trust boundary.

- Only add repositories you trust.
- Read the module before enabling it.
- Review changes when a repository updates.
- Do not put secrets in a patch repository.
- Remove patches you no longer use.

The default registry is reviewed, but the final trust decision belongs to you.
Third-party repositories carry their own trust. Patches that are vibe-coded must
be marked in the registry.

## Authorship and freedom

Patches are maintained by their authors. Nix configurations age slowly, so a
patch does not need a heavy release cadence to stay useful.

The patch interface is free and open source forever, in the freedom sense. Users
may publish closed-source or paid patches. Ojuny itself will not. Another user
can relatively easily replicate a closed-source patch.

## Next

- [Creating patches](/patches/creating/)
- [Patch security](/patches/security/)
- [ojuny-patches CLI](/cli/ojuny-patches/)
