---
title: Troubleshooting
description: First-boot and install failures, and where the detailed entries live.
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

This page covers failures during installation and first boot. Detailed
troubleshooting for the desktop, updates, patches, and recovery is in the
manual:

[Troubleshooting in the manual](/ojuny-manual/troubleshooting/)

## Flakes are disabled

```text
experimental Nix feature 'nix-command' is disabled
```

Enable the features before running any flake command:

```ini
experimental-features = nix-command flakes
```

Add the line to `/etc/nix/nix.conf` or your existing NixOS configuration. On a
fresh install the features are often off.

## The installer cannot fetch inputs

The online installer paths run `nixos-install --flake`, which fetches the
template's flake inputs. Connect the machine to the network before starting an
online install.

The installer comes in six forms: attended main, attended discovery, attended
offline, unattended online, unattended offline, and unattended discovery. The
two offline forms carry the full system runtime closure and install without
network access. The discovery forms use the local cache discovery daemon to
reuse store paths on the LAN.

The offline store covers the default full system and common install choices. It
does not include unusual hardware modules, out-of-tree drivers, optional
patches, or the full build-dependency closure. If an offline install reports a
missing store path, use an online install or build an offline image that
includes that path.

## The build runs out of memory

The attended ISO needs 4 GB of RAM minimum. The unattended ISO also needs 4 GB.
The template setup app needs 4 GB because it builds the compiled packages from
source. More RAM helps when several large builds run at once.

The setup script pre-builds compiled targets one at a time to avoid running out
of memory. If you build manually, avoid running several large Nix builds at
once.

## Installation is slow

Some Ojuny software is not in nixpkgs and builds from source because there is
no binary cache yet. On low-end systems this can add up to an hour.

The ISO pre-builds those components and copies them at install time, trading
ISO build speed for a faster install. The recorded Calamares install with LUKS2
root and XFS is 18 minutes on a Ryzen 3 3200U with 24 GB RAM and a 256 GB NVMe
SSD. Switching can still be slow. The timings are listed in
[Downloads](/downloads/).

## The unattended ISO has no network

The unattended service does not configure Wi-Fi. Use a wired connection for the
online unattended ISO. The offline unattended ISO skips the network check, but
it does not configure Wi-Fi either.

## The display is broken in QEMU

The virtual machine needs accelerated virtio graphics. Use `virtio-vga-gl` with
`-display gtk,gl=on`. Plain VGA, QXL, and 2D `virtio-vga` render the Wayland
session incorrectly.

To test an offline image without network access, replace the user-mode
networking arguments with `-nic none`.

## The display layout is wrong

Ojuny generates a default display configuration. Set the correct resolution,
refresh rate, scale, and position in the display settings before tuning gaps,
borders, or the bar. Fixing the display first makes everything else easier.

## The theme does not change

Change `ojuny.style.palette` and rebuild. Restart Dux Shell and MangoWM
afterward so both reload the generated configuration.

## Password changes do not work

`users.mutableUsers` is `false` by default. Change the hashed password in the
user page and rebuild. Runtime password changes are intentionally not the
supported path.

## Collect diagnostics

```sh
ojuny doctor
```

`doctor` checks the flake, host, patch state, and expected backend tools. Include
its output when reporting an issue. Report issues on
[GitHub](https://github.com/ojuny-project).

## Related

- [Project status](/status/)
- [Hardware coverage](/hardware/)
- [Install overview](/install/iso/)
- [Troubleshooting in the manual](/ojuny-manual/troubleshooting/)
