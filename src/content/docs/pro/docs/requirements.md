---
title: Requirements
description: The platform, media, network, and disk constraints for a Pro install.
sidebar:
  order: 4
type: reference
audience: operator
appliesTo: ojuny-pro-installer
source: ~/repos/ojuny-future-repos/ojuny-pro-installer/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Pro is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

## Platform

The Pro installer is limited to `x86_64-linux`.

## Install media

Pro provides four images:

- An attended online ISO, which downloads the template inputs during install.
- An attended offline ISO, which carries the full Pro closure.
- An attended discovery ISO, which uses local Ojuny cache peers.
- An unattended ISO with a declarative answer file.

The offline image installs without the network access the online image needs. The unattended image does not configure Wi-Fi, so use a wired connection.

## Disk and encryption

The install flow asks for a disk, optional LUKS2 encryption, and a bootloader mode. Encryption is recommended but not silently forced.

Pro does not resize NTFS partitions and does not handle Windows BitLocker.

## Secure Boot

Secure Boot enrollment is offered after install, within the documented hardware limits. Pro uses the existing post-install path and has the same limits as the core template. It does not enroll keys automatically.

## Account and login

The install flow creates the administrator account and hostname. GDM is the display manager, with the same account and login contract as the core template.

## Next

- [Install Pro](/pro/docs/installation/)
- [Security](/pro/docs/security/)
- [Troubleshooting](/pro/docs/troubleshooting/)
