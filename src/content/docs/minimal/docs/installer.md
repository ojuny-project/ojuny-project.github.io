---
title: Minimal installer reference
description: The console screens, the seven engine phases, and the writes the installer makes to a template.
sidebar:
  order: 7
type: reference
audience: operator
appliesTo: ojuny-minimal-installer
source: ~/repos/ojuny-future-repos/ojuny-minimal-installer/docs/install-engine.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Minimal is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The terminal installer is the reference implementation for any Ojuny template, and it is the console counterpart of the Calamares `ojuny-installer`. It has one online ISO, no desktop environment, and no discovery or offline variant. It never edits the hand-written pages of the template it installs, and it is written in Python 3 with the standard library only.

## Build and run

```sh
nix build .#ojuny-minimal-iso     # the live ISO
nix run .#install                 # the installer on an existing NixOS system
nix develop                       # python3, qemu, OVMF, formatters
```

Images land in `result/iso/*.iso`, and the ISO is held under 1.6 GB, with the size check printing the final figure. The ISO base is `installation-cd-minimal.nix`, so the desktop, Calamares, Qt, plymouth, and the debug SSH probe are not imported.

## Screens

| Screen | Contents |
| --- | --- |
| Welcome | Machine model, firmware, memory, CPU count, network state, and the number of eligible disks. |
| Template | `Template source` is `bundled` or `prepared`, with an optional access token and branch. |
| Git origin | An optional origin URL and token for the installed configuration, where empty means no remote. |
| System | Locale, console keymap, timezone, hostname, username, full name, password, confirmation, and shell. |
| Disk | Firmware, target disk, disk mode, free space, filesystem, swap, LUKS2 root, passphrase, serial console, and final action. |
| Summary | A read-only recap of every value that reaches the engine, followed by the final confirmation. |
| Progress | Current phase, completed phases, a rolling log tail, and a store path counter. |
| Failure | The error, the log path, and an offer to start a root shell while the target stays mounted. |
| Finished | The configuration path and the install log location, then reboot or power off. |

Validation runs when a screen advances and only reports problems that belong to that screen, so an error appears next to the value that caused it.

## Keys

| Key | Action |
| --- | --- |
| `up`, `k` / `down`, `j` | previous or next row |
| `enter` | edit the row, accept the prompt, or advance an information row |
| `left`, `h` / `right`, `l` | change a choice or toggle |
| `n`, `tab` / `p` | next or previous screen |
| `q`, `ctrl-c` | quit to a root shell |
| `esc` / `ctrl-u` | cancel or clear the current text prompt |

## Engine phases

| Phase | What happens |
| --- | --- |
| Check the target | The target check refuses a missing, mounted, non-block, or sub-30-GiB disk, and the network wait retries the cache endpoint for two minutes. |
| Prepare the template | The clone or copy happens before anything is written, so a bad URL or token fails without wiping a disk. |
| Partition and format | The sector planner and the per-filesystem tools write the chosen layout. |
| Generate hardware | `nixos-generate-config` runs against `/mnt`, or the bundled input's `regenerate-hardware` when that helper exists. |
| Install NixOS | `nixos-install --no-root-passwd --root /mnt --flake <staging>#<host>` streams line by line into the progress screen. |
| Finish the configuration | The staging tree is copied to `/mnt/home/<user>/repos/nix-flake`, the origin and credential helper are set, and the log and report are copied. |
| Unmount and sync | The target is unmounted and the install ends at the Finished screen. |

The hardware phase writes the `system-hardware` and `system-bootloader` modules, keys the LUKS device lines by the encrypted parent UUID, writes the facter report, and updates the host imports module. On UEFI the engine snapshots `efibootmgr` and restores the recorded `BootOrder` after the install, then moves `Linux Boot Manager` above the first internal entry.

## Bootloader rules

UEFI gets systemd-boot with `canTouchEfiVariables` and the ESP mounted at `/boot`. BIOS gets GRUB on the target disk with `useOSProber`, and a btrfs root also sets `fsIdentifier = "provided"`.

BIOS with a LUKS2 root writes `/boot/crypto_keyfile.bin` at 512 bytes and mode 0600, adds `boot.initrd.secrets`, enables `boot.loader.grub.enableCryptodisk`, and adds a key-file line per mapper. The engine also converts the keyslot to PBKDF2 so GRUB can open it without a typed passphrase.

An existing internal ESP triggers `flake_structure.ensure_multiboot`, and a template without a multiboot module logs a warning and continues. Prepared installs keep the repository's own user, hostname, and configuration modules, while bundled installs take the account values from the System screen.

## Writes to the template

The installer writes only the generated modules the contract defines: system configuration, users, host registration, hardware, bootloader, host imports, and the facter report. Hand-written pages are never edited, which keeps a fork's own pages intact across an install.

## Next

For the next step, read [requirements](/minimal/docs/requirements/), then the [template shape](/minimal/docs/template-shape/), or finish with [limits](/minimal/docs/limits/).
