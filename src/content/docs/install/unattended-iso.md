---
title: Unattended ISO
description: Build a pre-configured installer that wipes a disk and installs without prompts.
sidebar:
  order: 4
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The unattended ISO is a separate installer built for a specific machine and
disk. It boots a minimal console, partitions the target with disko, copies the
template fork to `/home/<user>/repos/nix-flake`, regenerates the hardware data,
and runs `nixos-install --flake` without user interaction.

This is an advanced path. It wipes the configured disk. The full procedure is in
the manual's [unattended install chapter](/ojuny-manual/install/unattended/).

Status: untested. No QEMU or hardware run has been recorded.

## Variants

All three share `nixos/unattended-common.nix`, which provides the disko layout,
the install service, and the settings assertions.

- **Online** (`.#unattended-iso`). The default. The live environment and
  `nixos-install` need network access.
- **Offline** (`.#unattended-iso-offline`). A full-system image that carries the
  target closure and the build inputs. It installs without network access.
- **Discovery** (`.#unattended-iso-discovery`). The online image plus the
  `nix-cache-discovery` daemon and cache client settings.

## Requirements

- `x86_64-linux` target.
- 4 GB of RAM minimum.
- A target disk of at least 8 GiB, preferably a stable `/dev/disk/by-id/...`
  path.
- A wired network connection for the online and discovery variants. The
  unattended service does not configure Wi-Fi.
- No network for the offline variant.

## Build

```sh
nix run github:ojuny-project/ojuny-installer#make-unattended-iso -- \
  --flake https://github.com/ojuny-project/ojuny-template \
  --disk /dev/disk/by-id/...
```

The script is a flake app. It passes the template URL or local path to the build
with `--override-input`, so the fork is used directly and no clone is made. Add
`--offline` or `--discovery` for those variants; the two flags are mutually
exclusive. Add `--dry-run` to inspect the settings and build command without
building.

The script accepts firmware, mode, account, password, SSH keys, timezone,
locale, keymap, swap size, confirmation delay, and final action options. Build
output is copied to `result-unattended/`.

## Modes

- **prepared**: use the fork as-is. The installer detects the user and host from
  the flake and regenerates only the hardware data.
- **bundled**: copy the fork and run `prepare-repo` with the installer settings
  to generate the user, host, and configuration values.

## Install flow

1. The live ISO boots to a console and starts `ojuny-unattended-install`.
2. The service waits for the target disk and optionally counts down before
   wiping it.
3. `disko` creates a GPT layout with a BIOS boot partition, an ESP, an ext4 root
   or a LUKS2-encrypted ext4 root, and an optional swap partition.
4. The flake snapshot is copied to `/mnt/home/<user>/repos/nix-flake`.
5. `regenerate-hardware` writes `modules/07-system/00-hardware.nix` and
   `facter.json` for the target disk and bootloader, and the installer adds the
   disko layout to the same hardware module.
6. The copy is initialized as a git repository and committed, then
   `nixos-install --flake /mnt/home/<user>/repos/nix-flake#<host>` installs it.
7. The machine reboots or powers off.

On failure the service prints the error and starts a root shell on tty1. The
target is not rebooted automatically.

## Limits

- Destructive: the configured disk is wiped without an interactive installer.
- `x86_64-linux` only.
- UEFI and BIOS are separate builds. The firmware setting is fixed at ISO build
  time.
- Wi-Fi is not configured. The offline variant needs no network.
- The installed flake is modified before install, so it is the configuration
  that was installed, not a pristine copy of the fork.
- There is no automatic revert. Use the NixOS generation menu to roll back.
- There is no support team and no support beyond GitHub issues.

## Related

- The persistent raw image is a separate artifact. See
  [Downloads](/downloads/#persistent-image) and the installer's
  [persistent image document](https://github.com/ojuny-project/ojuny-installer/blob/main/docs/persistent-image.md).
- Remote deployment of an installed system is covered in
  [post-install tasks](/install/post-install/#remote-deployment).

## Next

- [Installer ISO](/install/iso/)
- [Post-install tasks](/install/post-install/)
