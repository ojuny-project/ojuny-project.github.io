---
title: Storage and shares
description: Disk selection, pools and NFS shares.
sidebar:
  order: 7
type: explanation
audience: operator
appliesTo: ojuny-home-server-template
source: ~/repos/ojuny-future-repos/ojuny-home-server-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Home Server is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Storage is its own part of the server, with disk detection, pool creation and mount layout. The install flow treats the system disk and the data disks as separate choices, so a data disk is never selected by accident, and [installation](/home-server/docs/installation/) lists that choice among its steps.

## Disks and pools

The installer selects a system disk and offers optional encryption for it. Data disks for the storage pool are optional and selected as a separate step, and the first-run wizard creates the pool and the first share when a data disk was selected.

## Shares

NFS exports carry per-device and per-user access. A generated patch lets an Ojuny desktop or server mount the shares over both the local network and the VPN, and it is installed as an Ojuny patch on the client.

Each share carries a snapshot and backup policy. [Services](/home-server/docs/services/) covers the backup item and the NFS service as a toggle.

## Health and safety

Disk health and SMART reporting are part of the storage surface. The safety rule is absolute: no silent disk erasure, and every destructive action requires confirmation.

That rule extends to the install and reset paths. A factory reset reinstalls the system while leaving data disks untouched by default, and a disk replacement flow leaves the surviving data disks alone, with [recovery](/home-server/docs/recovery/) carrying both items.

## Limits

Disk hot-plug and enterprise storage certification are outside the product. No data recovery from a failed disk is promised, so the configured backup target is the recovery path.
