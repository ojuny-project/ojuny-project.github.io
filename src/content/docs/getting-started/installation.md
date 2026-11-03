---
title: Installation overview
description: The install paths and which one to choose.
sidebar:
  order: 3
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny has several install paths. They serve different commitments. The
attended Calamares ISO family and the template setup script are the primary
full-system methods.

## Choose a path

| Path | Audience | What you get |
| --- | --- | --- |
| [`nix run`](/desktop/overview/) | Anyone | Try the nested desktop without installing anything |
| [NixOS or Home Manager module](/install/modules/) | Intermediate users | Add the desktop to an existing NixOS or Nix-capable system |
| [Template setup script](/install/manual-template/) | Intermediate users | Deploy the full system on an existing NixOS install |
| [Attended Calamares ISO](/install/iso/) | All users | Guided full-system install: main, discovery, or offline |
| [Unattended ISO](/install/unattended-iso/) | Advanced users | Automatic full-system install: online, offline, or discovery |
| [Persistent raw image](/downloads/#persistent-image) | Anyone | Boot a full system from a written image; only `/home` persists |
| Remote setup and remote install | Advanced users | Deploy to a running system with deploy-rs, or install a bare machine with nixos-anywhere (experimental). See [remote deployment](/install/post-install/#remote-deployment) |

## Primary full-system paths

The attended Calamares ISO family and the template setup script both produce a
NixOS system built from the Ojuny template, with the configuration stored in a
git repository under the user's home directory.

- Use an ISO when the machine does not already run NixOS, or when you want a
  guided install. The main image is the default, discovery adds the local cache
  discovery daemon, and offline carries the system closure for a network-free
  install.
- Use the setup script when you already run NixOS and want the faster,
  lower-overhead full-system path.

The unattended ISO family performs the same full-system install without prompts.
It is an advanced path because it wipes the configured disk. Online, offline,
and discovery variants exist.

The persistent raw image boots the full system from a written image. Only
`/home` persists; package and system changes live in a temporary overlay until
reboot.

Each full-system path has a complete procedure in the manual:

- [Attended install](/ojuny-manual/install/attended/)
- [Unattended install](/ojuny-manual/install/unattended/)
- [Template install](/ojuny-manual/install/template/)

## Desktop-only paths

Use `nix run` to try the desktop, or the NixOS and Home Manager modules to add
the desktop to an existing system without adopting the full template.

```sh
nix run github:ojuny-project/ojuny-desktop
```

The Home Manager module is intended for other distributions that support Nix.
The documented release path is NixOS on `x86_64-linux`.

## Experimental paths

Remote setup with deploy-rs and remote install with nixos-anywhere are available
as template apps. They are experimental and not a release path. The site guide is
[remote deployment](/install/post-install/#remote-deployment); the full procedure
is in the installer's
[remote deployment document](https://github.com/ojuny-project/ojuny-installer/blob/main/docs/remote-deployment.md).

```sh
nix run github:ojuny-project/ojuny-template#remote-setup
nix run github:ojuny-project/ojuny-template#remote-install
```

Use remote setup on a target that already runs NixOS. Use remote install on a
machine that does not.

## What gets generated

The full-system paths generate the machine-specific and personal files:

| File | Contents |
| --- | --- |
| `modules/07-system/00-hardware.nix` | Filesystems, swap, kernel modules, CPU microcode, host platform; on unattended installs also the disko layout and bootloader |
| `modules/07-system/facter.json` | Hardware report from `nixos-facter` |
| `modules/07-system/00-hardware-quirks.nix` | Selected `nixos-hardware` profile import, when a profile matches |
| `modules/01-users/01-user.nix` | Account, groups, shell, hashed password, SSH keys, home settings |
| `modules/07-system/00-host.nix` | The `nixosConfigurations.<hostname>` registration |

The tracked template contains no personal data. A fresh fork has a neutral
account placeholder, not a real user.

## Verification status

Status: untested. The attended ISO test scripts are written, but no attended run
has been completed. The offline matrix, unattended installs, persistent image,
and remote paths are pending hardware verification. Treat implemented paths as
unverified on hardware.

## After installation

An installed system is a git repository. Keep it in git, commit after every
successful rebuild, and make changes through the settings menu or the Nix
files.

- [First boot](/getting-started/first-boot/)
- [Post-install tasks](/install/post-install/)
- [Updates](/configuration/updates/)
