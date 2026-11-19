---
title: Install Pro
description: The Pro install media, the guided install flow, and the choices presented during install.
sidebar:
  order: 2
type: how-to
audience: operator
appliesTo: ojuny-pro-installer
source: ~/repos/ojuny-future-repos/ojuny-pro-installer/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Pro is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The Pro installer installs the Pro template by default and keeps the generic installer behavior, so an organization can point it at another Ojuny template.

## Install media

Pro provides four images:

- An attended online ISO.
- An attended offline ISO with the full Pro closure.
- An attended discovery ISO that uses local Ojuny cache peers.
- An unattended ISO with a declarative answer file.

The image reuses the install engine from the terminal installer. It does not own a separate partitioning or user-generation path.

## Install flow

1. Choose the template. Pro is the default; another Ojuny template is allowed.
2. Choose the GNOME layout preset: default, Windows-like, or macOS-like.
3. Choose the disk, optional LUKS2 encryption, and bootloader mode.
4. Create the administrator account and hostname.
5. Review the security baseline and any disabled control.
6. Install, then reboot into GDM.

The preset choice is also changeable after install from the settings GUI. See [GNOME layout presets](/pro/docs/gnome-presets/) for what each preset changes.

## Security choices

Encryption is presented as recommended, not silently forced. Secure Boot enrollment is offered after install, within the documented hardware limits. The install summary lists firewall, SSH, remote desktop, and update policy.

The installer makes no telemetry, cloud account, or remote management connection. A Pro install is not enrolled in Fleet.

## Limits

The installer is limited to `x86_64-linux`. Unattended installs do not configure Wi-Fi. There is no NTFS resizing and no Windows BitLocker handling.

## Next

- [Requirements](/pro/docs/requirements/)
- [Security](/pro/docs/security/)
- [Troubleshooting](/pro/docs/troubleshooting/)
