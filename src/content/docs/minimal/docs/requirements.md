---
title: Minimal requirements
description: The build host, live installer, target disk, and firmware requirements for Minimal.
sidebar:
  order: 4
type: reference
audience: user
appliesTo: ojuny-minimal-template, ojuny-minimal-installer
source: ~/repos/ojuny-future-repos/ojuny-minimal-installer/README.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Minimal is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The requirements divide into what a build host needs, what the live installer needs, and what the target disk must offer. The template itself builds an `x86_64-linux` system and adds no requirement beyond Nix with flakes enabled.

## Build and install host

| Requirement | Detail |
| --- | --- |
| Architecture | `x86_64-linux` with Nix and flakes enabled. |
| Network | A wired connection on the machine that runs the installer, because `nixos-install` fetches the flake inputs. |
| Memory | 3.5 GB on the machine that boots the ISO. The Welcome screen stops the installer below that figure. |
| Target disk | 30 GB, which is also the minimum free region for an install alongside another system. |
| Install media | An 8 GB USB key for the ISO, which is 1.39 GiB. |

## Disk layout

The planner works in sectors and supports two modes: erase the whole disk, or use the largest unallocated region of at least 30 GiB. It never shrinks a filesystem and never resizes NTFS, so a Windows partition is shrunk in Windows Disk Management before an install alongside it.

| Role | Size | Type | Filesystem |
| --- | --- | --- | --- |
| `bios-boot` | 1 MiB | `EF02` | none |
| `esp` | 4 GiB | `EF00` | vfat, mounted at `/boot` |
| `swap` | none, 4 GiB, or RAM rounded up to GiB | `8200` | swap |
| `root` | remainder, at least 20 GiB | `8300` | ext4, btrfs, xfs, or f2fs |

Every partition starts and ends on a 2048-sector boundary, and the layout is checked against the region before anything is written. A region that cannot hold the fixed partitions plus a 20 GiB root stops with an error instead of leaving a half-written disk.

## Firmware

UEFI installs systemd-boot with the ESP mounted at `/boot`, while BIOS installs GRUB on the target disk and a btrfs root also sets `fsIdentifier = "provided"` for the boot loader. Both firmwares use the same screens, and the firmware shown on the Disk screen comes from the live environment.

## Encryption and swap

LUKS2 can wrap the root partition only, and the mapper is always `cryptroot`, while swap can be omitted, fixed at 4 GiB, or sized to RAM rounded up to a GiB. Hibernate is not wired, so choosing suspend gives a swap partition with no resume, and the [limits page](/minimal/docs/limits/) covers what encryption does not reach.

## Next

For the next step, read [installation](/minimal/docs/installation/), then the [installer reference](/minimal/docs/installer/), or finish with [limits](/minimal/docs/limits/).
