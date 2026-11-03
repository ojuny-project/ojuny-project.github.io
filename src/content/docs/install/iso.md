---
title: Installer ISO
description: Build or boot the Calamares live ISO and install Ojuny.
sidebar:
  order: 1
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The Ojuny installer is a Calamares live ISO. It boots the Ojuny desktop from
`ojuny-desktop`, runs a rebranded Calamares, partitions and mounts the target,
copies the pinned template, generates the hardware, user, and host modules, and
finishes with `nixos-install --flake`.

It is the normal path for a guided install on a fresh machine. The full
procedure, including the QEMU test command, is in the manual's
[attended install chapter](/ojuny-manual/install/attended/).

Status: untested. No attended QEMU run or hardware install has been completed.

## Variants

- Main (`.#ojuny-iso`, `nixos/iso.nix`). The standard online installer.
- Discovery (`.#ojuny-iso-discovery`, `nixos/discovery-iso.nix`). The same
  attended install, using the local cache discovery daemon.
- Offline (`.#ojuny-iso-offline`, `nixos/full-iso.nix`). A full-system image
  that carries the target closure and the flake inputs.

## Requirements

- `x86_64-linux` target.
- 4 GB of RAM minimum.
- A target disk. Calamares partitions and mounts it.
- Network access for the main and discovery ISOs. `nixos-install` fetches the
  template's flake inputs.
- No network is needed to install from the offline ISO, within its limits.

The offline ISO targets under 8,000,000,000 bytes so an 8 GB USB stick can hold
it.

## Build

From the installer repository:

```sh
git clone https://github.com/ojuny-project/ojuny-installer
cd ojuny-installer
nix build .#ojuny-iso
```

Discovery and offline use their own package names. To build an ISO around a
modified template:

```sh
nix build .#ojuny-iso \
  --override-input ojuny-template path:$HOME/repos/my-template
```

The ISO includes the compiled Ojuny GUI packages from the template's locked
nixpkgs.

## Install

The Calamares pages choose the template mode (bundled or prepared), the optional
git origin, the disk, and the account. Bundled mode uses the template pinned in
the ISO. Prepared mode clones the repository at the URL, branch, and optional
token entered on the page, and requires `modules/07-system/00-host.nix` with a
`nixosConfigurations` entry. A clone or git setup failure stops the install with
a blocking error.

## What the installer writes

- Configuration at `/home/<user>/repos/nix-flake`, initialized as a git
  repository.
- `modules/07-system/00-hardware.nix` from the target mounts.
- `modules/07-system/facter.json` from the live hardware report.
- `modules/01-users/01-user.nix` from the Calamares account page.
- `modules/07-system/00-host.nix`, which registers
  `nixosConfigurations.<hostname>` and points the update GUI at the installed
  flake.

The attended installer does not write a disk module. The unattended installer
writes its disko layout into the same generated
`modules/07-system/00-hardware.nix`, including an optional LUKS2 root.

LUKS2 root encryption is supported in the attended partition page. On BIOS with
an encrypted root or boot partition, the installer generates
`/boot/crypto_keyfile.bin` and enables GRUB cryptodisk.

## Limits

- `x86_64-linux` only.
- UEFI uses systemd-boot. BIOS uses GRUB.
- The offline ISO covers the default full system and common install choices.
  Out-of-tree drivers, unusual hardware modules, and optional patches still
  need the network.
- The ISO installs the template revision it was built with.
- There is no support team and no support beyond GitHub issues.

For a pre-configured automatic install, see the
[unattended ISO](/install/unattended-iso/).

## Next

- [First boot](/getting-started/first-boot/)
- [Post-install tasks](/install/post-install/)
