---
title: Services
description: The optional service stack and what each toggle enables.
sidebar:
  order: 6
type: reference
audience: operator
appliesTo: ojuny-home-server-template
source: ~/repos/ojuny-future-repos/ojuny-home-server-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Home Server is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Every service below is optional and off by default. The only required parts are the panel, the base system, the firewall and the first administrator account, so a fresh server runs almost nothing until you enable a service from the dashboard that [configuration](/home-server/docs/configuration/) describes.

| Service | What it does |
| --- | --- |
| DNS server | Configured automatically from the services you enable |
| Ad blocking DNS | AdGuard Home or Pi-hole |
| Reverse proxy | Generated virtual hosts for enabled services |
| VPN | WireGuard, with a documented port-forward requirement |
| Hydra | Build server that enables `nix-serve-ng` when a cache is not already present |
| `nix-cache-discovery` | A cache for a home LAN |
| ARR stack | Media services with Jellyfin and Jellyseerr |
| NFS shares | Exports plus a generated Ojuny patch that enables them on a device |
| ownCloud Infinite Scale | Cloud storage |
| Backup | Automatic, with retention and scope |

## DNS and proxy

DNS and the proxy are the two services other services depend on. DNS is generated from what you enable, and the proxy gets generated virtual hosts for the same set. When both are on, the dashboard uses a generated DNS name per service, and when DNS is off it uses an IP and port link instead.

Either AdGuard Home or Pi-hole covers ad blocking DNS.

## Media

The ARR stack gets a web page per service. Jellyfin and Jellyseerr are wired to the same library and indexers, and optional hardware transcoding appears when the GPU supports it. Storage paths belong to the media service accounts, and two rules apply to this group: no media is bundled, and no indexer credentials live in tracked files.

## Build services

Hydra brings `nix-serve-ng` as the cache when no cache is already present, and `nix-cache-discovery` serves a LAN cache when enabled. A precedence rule keeps only one cache as the primary substituter, and cache signing and trust are documented alongside it.

## Limits

Central authentication is not guaranteed for every service. GlusterFS, etcd, Patroni and Galera are outside the product, as are public multi-tenant hosting and media acquisition automation that bypasses licensing.

[Storage and shares](/home-server/docs/storage/) covers the shares, and [troubleshooting](/home-server/docs/troubleshooting/) lists the checks a working service layer satisfies.
