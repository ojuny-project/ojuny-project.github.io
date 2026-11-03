---
title: Requirements
description: System, memory, network, and Nix requirements for each install path.
sidebar:
  order: 2
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

## Supported platform

The template and installer target `x86_64-linux`.

The desktop flake evaluates on the systems exposed by nixpkgs, and the Home
Manager module is intended to make the desktop usable on other distributions
that support Nix. The documented and tested release path is NixOS on
`x86_64-linux`.

The v1 hardware test set is whatever hardware the maintainer can get hands on:
various laptops from the last 10 years, UEFI and BIOS, Intel and AMD, plus QEMU
virtual machines. This is a test set, not a certification program. There is no
broad hardware support claim.

## Memory

| Path | Minimum | Notes |
| --- | --- | --- |
| Attended ISO (main, discovery, offline) | 4 GB | The installer's stated minimum; no attended run has been completed and install time is not measured |
| Unattended ISO (online, offline, discovery) | 4 GB | QEMU test configuration uses 4 GB |
| Template `nix run .#setup` | 4 GB | Builds the compiled packages from source |
| NixOS or Home Manager module | Not stated | Depends on the existing system and package set |
| Desktop-only `nix run` | Not stated | No published minimum; starts the nested desktop without installing |

The attended install runs are still pending. The 4 GB figures are the installer's
stated minimums.

## Nix requirements

You need Nix with flakes and the `nix` command enabled:

```ini
experimental-features = nix-command flakes
```

On a fresh NixOS install these are often disabled. Add the line to
`/etc/nix/nix.conf` or your NixOS configuration before running any flake
command. The common failure is:

```text
experimental Nix feature 'nix-command' is disabled
```

The setup script calls `nix` directly. It pre-builds the compiled targets with
`nix build --no-link --max-jobs 1` before the rebuild, so the flag is needed for
the `nix run` that starts the app and for those builds. `nixos-rebuild` enables
the flake features internally.

## Network

The online installer variants fetch the template's flake inputs during
`nixos-install`, so they need network access.

The offline attended and unattended ISOs carry the full system runtime closure
and the build inputs needed by `nixos-install`. They install without network
access for the default full system and common install choices. Unusual hardware
modules, out-of-tree drivers and optional patches still need network access.
The offline ISOs are significantly larger than the online ISOs.

The offline network-free install is covered by a manual hardware matrix and is
not yet verified on hardware.

The unattended ISO does not configure Wi-Fi. Use a wired connection.

## Installer path

There are three attended Calamares ISOs and three unattended variants.

- Attended: main, discovery and offline.
- Unattended: online, offline and discovery.

The discovery variants use the local cache discovery daemon.

An installer install needs:

- A machine that can boot the Ojuny ISO.
- A target disk. Calamares partitions the attended target; the unattended ISO
  wipes the configured disk without an interactive installer.
- At least the memory listed above.
- UEFI is recommended. BIOS is supported with GRUB.
- LUKS2 root encryption is optional and off by default in both installer paths.
  The unattended ISO enables it with `--encrypt`; the passphrase is stored on
  the live ISO with mode `0600`. Encrypted BIOS boot uses a generated GRUB
  keyfile and GRUB cryptodisk.

Secure Boot is optional and UEFI-only. The installer produces an unsigned
system and does not enroll keys. Enabling Secure Boot is a manual post-install
step that requires systemd-boot, so a BIOS install with GRUB cannot use it.

## Template path

- An existing NixOS installation.
- `git`.
- `nixos-generate-config` from the NixOS install.
- `nixos-facter`, provided by the setup app's `generate-hw` wrapper. It writes
  `modules/07-system/facter.json` and needs root; `generate-hw` runs it with
  `sudo` when it is not already root.
- `nixos-rebuild`.
- `mkpasswd` for hashing the account password.
- An existing partition layout. The template does not use disko.
- A fork of the template repository, or a local clone.
- At least 4 GB of memory for the build.

The setup app writes the hardware module and `facter.json`, and the
`regenerate-hardware` step selects a `nixos-hardware` profile into
`modules/07-system/00-hardware-quirks.nix`.

The setup app wraps the needed tools:

```sh
nix run github:ojuny-project/ojuny-template#setup
```

It prompts for the fork URL, clone directory, account details, hardware
generation, and whether to rebuild. The clone directory defaults to
`~/repos/nix-flake` and can be changed with `OJUNY_CLONE_DIR`.

## Desktop-only paths

`nix run github:ojuny-project/ojuny-desktop` starts the nested desktop without
installing anything. The NixOS and Home Manager modules add the desktop to an
existing configuration. See [Installation](/getting-started/installation/) for
the path comparison.

## Optional tools

- `direnv` for loading development shells automatically.
- `nixd` for editor completion and option metadata.
- A browser for the settings GUI documentation and the site.

## Next

- [Installation overview](/getting-started/installation/)
- [Install with the ISO](/install/iso/)
- [Install with the modules](/install/modules/)
