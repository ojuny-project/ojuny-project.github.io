---
title: Home Server overview
description: The headless home NAS and server template.
sidebar:
  order: 1
type: explanation
audience: user
appliesTo: ojuny-home-server-template
source: ~/repos/ojuny-future-repos/ojuny-home-server-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Home Server is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny Home Server is the headless home NAS and server variant for Ojuny users. It is a complete NixOS flake with a web panel for configuration, and it offers the services a home network usually needs as an optional stack.

That stack covers DNS, ad blocking, a reverse proxy, VPN, a build cache, media, file sharing and backup. The [services page](/home-server/docs/services/) lists each item and what it enables.

## The appliance model

Ojuny Home Server is appliance-like. You install the image, answer a few questions, and log in to the web panel. [Installation](/home-server/docs/installation/) describes that journey from the USB image to the panel login.

The required parts are narrow on purpose:

- Base NixOS system, networking and the firewall.
- Web panel and dashboard, reachable by IP and port on first boot.
- A first administrator account.
- Updates and a service health page that only lists enabled services.

Everything else is optional and disabled by default. After install the server does almost nothing until you turn services on from the web panel.

## Storage and clients

Storage is part of the server, with disk detection, pool creation and NFS exports. A generated patch lets an Ojuny desktop or server mount the shares over the local network and the VPN. [Storage and shares](/home-server/docs/storage/) covers that layout, and [recovery](/home-server/docs/recovery/) covers the failure paths.

## Boundaries

Ojuny Home Server is one home server, not a high-availability cluster. It has no GlusterFS, etcd, Patroni or Galera cluster support, and no public multi-tenant hosting.

Automatic port forwarding is not part of the product. The VPN needs a forwarded port unless you choose an overlay that does not require one.

Backup goes to a configured local target rather than a cloud provider by default. Disk hot-plug and enterprise storage certification are outside the product, and no data recovery from a failed disk is promised.

## Next

- [Installation](/home-server/docs/installation/)
- [Configuration](/home-server/docs/configuration/)
- [Requirements](/home-server/docs/requirements/)
- [Services](/home-server/docs/services/)
- [Storage and shares](/home-server/docs/storage/)
- [Recovery](/home-server/docs/recovery/)
- [Troubleshooting](/home-server/docs/troubleshooting/)
