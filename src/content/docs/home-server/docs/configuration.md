---
title: Configuration
description: The web panel, dashboard and account model.
sidebar:
  order: 3
type: explanation
audience: operator
appliesTo: ojuny-home-server-template
source: ~/repos/ojuny-future-repos/ojuny-home-server-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Home Server is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Configuration happens in the web panel rather than in the flake. The panel and dashboard are required parts of the server, reachable by IP and port on first boot, and [installation](/home-server/docs/installation/) ends at that panel login.

## The dashboard

The dashboard is one page that lists every enabled service and its status, with each entry linking to that service's own web panel. When DNS is enabled, each service gets a generated DNS name, and when DNS is off the link uses an IP and port instead. The dashboard also carries storage, network and backup health summaries.

A service toggle updates DNS and the proxy together when those services are enabled, and [services](/home-server/docs/services/) lists what each toggle covers.

## Updates and health

Updates and a service health page are required parts of the server, and the health page only lists services that are enabled, so a default install shows almost nothing.

## Accounts

The authentication model is:

- Local accounts declared in Nix, shared across services where the service supports it.
- The first administrator account created during setup.
- Service accounts that are not login accounts.
- No SSO, LDAP or Kerberos dependency.
- No default password and no anonymous administrative access.

Central authentication is not guaranteed for every service, and account handling can differ between services. Service accounts stay separate from login accounts by design.

## Limits

The panel does not guarantee that every service can be configured from it. A factory reset and a disk replacement both preserve data disks by default, and [storage](/home-server/docs/storage/) states the confirmation rule that guards every destructive action.

