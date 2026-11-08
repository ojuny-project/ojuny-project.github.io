---
title: Recovery
description: Optional recovery UKI and firmware boot order.
sidebar:
  order: 8
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The Recovery page has one switch, **Enable recovery UKI**. It is on by default.

When it is on, Ojuny builds a signed Unified Kernel Image from the current
generation and installs it to the ojuny ESP. A firmware entry named
`Ojuny Recovery` points to it. The entry boots the installed system directly,
without systemd-boot, rEFInd or the loader entries.

Turning the switch off removes the UKI, its service and its firmware entry. It
does not change the primary boot path.

## No-USB recovery

If systemd-boot or rEFInd is broken but the ojuny ESP is intact, reboot, open
the firmware boot menu and select `Ojuny Recovery`. The UKI boots NixOS, and
`nixos-rebuild boot` repairs the primary bootloader.

The UKI does not protect against a corrupted ojuny ESP. Use the firmware
boot-from-file option or a live USB in that case.

## Boot order

The boot order service asserts only that `Linux Boot Manager` and `Ojuny
Recovery` are the top two internal entries, in that order. External entries
keep their exact positions, other internal systems keep their relative order
below the two Ojuny entries, and nothing changes when the order is already
correct. If Windows resets the order, boot Ojuny once from the firmware menu and
the service restores it.

```console
$ ojuny recovery status
$ sudo ojuny recovery rebuild
$ ojuny bootorder status
$ sudo ojuny bootorder fix
```

## Limits

- The recovery UKI is x86_64 only.
- Secure Boot requires the UKI to be signed with an enrolled key.
- The UKI and the boot order service do not replace a corrupted ojuny ESP.
