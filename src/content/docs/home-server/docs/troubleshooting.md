---
title: Troubleshooting
description: Panel access, service checks and data safety.
sidebar:
  order: 5
type: how-to
audience: operator
appliesTo: ojuny-home-server-template
source: ~/repos/ojuny-future-repos/ojuny-home-server-installer/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Home Server is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Recovery when the panel or a service fails starts with access. The install prints the panel URL and a one-time setup token, and the panel carries password recovery for the administrator account. [Recovery](/home-server/docs/recovery/) covers the panel recovery mode, which starts the panel and SSH only.

## Panel access

The panel is reachable by IP and port from the first boot, and it keeps its own login separate from service accounts. The one-time setup token completes the first-run wizard, and the administrator password can be reset from the documented panel flow.

If the panel does not start, recovery mode brings up the panel and SSH together, so service control returns before the rest of the stack does.

## Service checks

A working service layer satisfies these properties:

- A default install exposes only the panel and no optional service.
- Enabling DNS makes it resolve every enabled service.
- Enabling the reverse proxy makes it reach each enabled service.
- A service toggle survives a reboot.
- Disabling a service removes its DNS record and proxy route.
- A share mounts from a test Ojuny client over the LAN.
- `nix-cache-discovery` serves a path to a peer when enabled.
- Hydra builds a test job and the cache serves it when enabled.
- Backup and restore round-trip a share.

Each check maps to a feature in [services](/home-server/docs/services/), where the same behaviour is described.

## Data loss

The installer separates the system disk from the data disks. A factory reset leaves data disks untouched by default, and a disk replacement flow keeps the surviving disks intact. [Storage and shares](/home-server/docs/storage/) states the confirmation rule for destructive actions.

No data recovery from a failed disk is promised. The configured backup target is the recovery path, and [recovery](/home-server/docs/recovery/) describes the restore item.
