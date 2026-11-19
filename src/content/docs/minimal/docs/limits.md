---
title: Minimal limits
description: What the starter template and the terminal installer deliberately do not do.
sidebar:
  order: 8
type: explanation
audience: user
appliesTo: ojuny-minimal-template, ojuny-minimal-installer
source: ~/repos/ojuny-future-repos/ojuny-minimal-installer/docs/limits.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Minimal is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Minimal is deliberately narrow, and the installer documents its limits so a missing feature is read as a boundary instead of a bug. Each limit below describes how the product behaves, and the template keeps the same posture at a smaller scale.

## Installer limits

| Limit | Meaning |
| --- | --- |
| Architecture | `x86_64-linux` only. |
| Network | One online ISO, with no offline closure, discovery cache, persistent image, or unattended product variant. |
| Disk modes | Erase-disk and free-space installs only. The installer never shrinks a filesystem and never resizes NTFS. |
| ESP | The installer always creates its own 4 GiB ESP. It never reuses a Windows ESP and never writes an entry next to `EFI/Microsoft`. |
| Encryption | LUKS2 covers the root partition only, swap is not encrypted, and hibernate is not wired. |
| Secure boot | No key enrollment. |
| Block devices | No LVM, no RAID, and no ZFS. |
| Wi-Fi | No Wi-Fi configuration, so the install needs a wired connection. |
| Hardware profiles | No nixos-hardware profile detection. A template that ships `system-hardware-quirks` keeps whatever it ships. |
| Prepared installs | The repository's own user, hostname, and configuration are kept, so the account values on the System screen apply to bundled installs. |
| Progress | Phase based plus a count of store activity lines, not the item-completion counter of the Calamares installer. |
| Console | Serial operation follows `/dev/console`, and the live image disables automatic getties so the installer owns the console. |

The BIOS key file is one exception worth naming. With an encrypted root on BIOS, the installer writes a key file to the unencrypted ESP so GRUB can open the root device without a typed passphrase, which matches the reference attended installer.

## Template limits

| Limit | Meaning |
| --- | --- |
| Desktop | No desktop environment and no graphical session in the starter. |
| Home Manager | No Home Manager input. The generators and the installer omit the user block when the target flake does not declare it. |
| Applications | No application catalog beyond the base system. |
| Installer | No installer implementation, which lives in the companion repository. |
| Server features | No fleet, server, NAS, or gaming features. |
| Infrastructure | No secrets store, no binary cache, and no Hydra. |
| Hosts | No multiple-host shape in the starter. |
| Comfort | No promise that the starter is a comfortable daily-driver desktop. |

## Verification

The ISO image is 1.39 GiB, and the static checks cover formatting, Python parsing, the installer wrapper, fixed paths, the contract parser, the sector planner, settings validation, and ISO size. The QEMU procedure builds the test fixture ISO, creates a 40 GiB qcow2 disk, and installs with the fixture settings. It then boots the installed disk with the same OVMF NVRAM and waits for a login prompt.

The file `nixos/test.nix` is a scripted test fixture for that QEMU run, not a supported image. The installer help check proves the wrapper starts and imports every module, and the layout check proves the sector planner handles both modes, both firmwares, every swap choice, and 4k sectors.

## Why the limits exist

Each limit follows from the reference role: the installer installs any conforming template, so it cannot assume a desktop, a profile database, or a particular partition scheme. A user who needs encryption beyond the root partition, hibernation, Wi-Fi configuration, or a reused ESP has to prepare the disk or the configuration outside this installer.

The starter keeps the same logic at a smaller scale. It is a base for building a system, and a fork that needs a desktop, a settings GUI, or patches adds them on top of the boot path instead of inside it.

## Next

For the next step, read the [overview](/minimal/docs/overview/), then [installation](/minimal/docs/installation/), or work through the [installer reference](/minimal/docs/installer/) and [troubleshooting](/minimal/docs/troubleshooting/).
