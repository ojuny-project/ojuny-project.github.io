---
title: Template flake install
description: Fork the template, run the setup script, and rebuild.
sidebar:
  order: 3
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The template is a complete NixOS flake designed around the settings GUI. You
fork it, run the setup script, and keep the resulting git repository as your
system configuration.

This is the fastest full-system path on an existing NixOS install. Use the
[interactive ISO](/install/iso/) for a fresh machine, or the
[NixOS or Home Manager module](/install/modules/) if you only want the desktop.

The full procedure is in the manual's
[template install chapter](/ojuny-manual/install/template/).

## Before you start

- An existing NixOS installation with `git` and `nixos-rebuild`.
- Nothing on the target disk needs to be wiped. The template adds packages and
  modules to the existing system and does not use disko.
- Flakes enabled:

```ini
experimental-features = nix-command flakes
```

## Run the setup

```sh
nix run github:ojuny-project/ojuny-template#setup
```

The app asks for the fork URL, the clone directory (default
`~/repos/nix-flake`), the account details, and the hostname. It writes the
hardware module and `facter.json`, generates the account and host modules, and
stages them in git. It does not rebuild unless you choose a rebuild option.

On a rebuild it pre-builds the compiled targets one at a time with
`nix build --max-jobs 1`, then runs `nixos-rebuild boot`.

The clone directory can be set with `OJUNY_CLONE_DIR`, and a branch with
`OJUNY_BRANCH` or `--branch`. The build needs about 4 GB of memory.

## Generated files

| File | Contents |
| --- | --- |
| `modules/07-system/00-hardware.nix` | Filesystems, swap, kernel modules, CPU microcode, host platform, bootloader, and LUKS unlock lines |
| `modules/07-system/facter.json` | The `nixos-facter` hardware report used for profile detection |
| `modules/07-system/00-hardware-quirks.nix` | The selected `nixos-hardware` profile import |
| `modules/01-users/01-user.nix` | Account, groups, shell, hashed password, SSH keys, home settings |
| `modules/07-system/00-host.nix` | The `nixosConfigurations.<hostname>` registration |
| `modules/07-system/00-imports.nix` | The host import list |

`00-hardware.nix` and `00-hardware-quirks.nix` carry no `@menu`, so they do not
appear in the settings GUI. The user module does, so the account can be edited
from the GUI later.

## Rebuild

If you declined the rebuild prompt:

```sh
sudo nixos-rebuild boot --flake ~/repos/nix-flake#<host>
```

Use `boot` for the first switch, then reboot. After that, `switch` is fine for
normal changes.

## Next

- [Post-install tasks](/install/post-install/)
- [Template layout](/configuration/template-layout/)
