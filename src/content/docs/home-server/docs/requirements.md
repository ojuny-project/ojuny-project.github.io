---
title: Requirements
description: Platform limits and machine assumptions for the home server.
sidebar:
  order: 4
type: reference
audience: operator
appliesTo: ojuny-home-server-installer
source: ~/repos/ojuny-future-repos/ojuny-home-server-installer/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Home Server is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny Home Server runs on `x86_64-linux` only, as one home server rather than a high-availability cluster, with no GlusterFS, etcd, Patroni or Galera cluster support.

## Hardware

The install guide covers the minimum hardware for a machine. [Storage and shares](/home-server/docs/storage/) covers disk roles and the safety rules around them.

## Network

The panel is reachable by IP and port on first boot, which means a browser on the same network for the first-run wizard. DNS stays optional and off until you enable it from the panel.

Automatic port forwarding is not part of the product. The VPN needs a forwarded port unless you choose an overlay that does not require one.

## Install media

An attended online ISO is one of the five images, and an attended offline ISO with the Home Server closure is another, while a discovery ISO uses local Ojuny cache peers. The other two are an unattended ISO with a declarative answer file and a raw disk image for dedicated small-form-factor hardware.

The unattended path wipes the selected system disk and does not configure Wi-Fi. Data disks survive a factory reset by default, and [recovery](/home-server/docs/recovery/) describes that rule.

## Limits

Cloud backup is not the default target, and disk hot-plug and enterprise storage certification are outside the product, while media acquisition automation that bypasses licensing is not included.

The panel does not guarantee that every service can be configured from it. [Installation](/home-server/docs/installation/) covers the flow, and [configuration](/home-server/docs/configuration/) covers the panel itself.
