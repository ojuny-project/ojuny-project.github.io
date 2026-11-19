---
title: Security
description: The Pro security baseline and the claims it does not make.
sidebar:
  order: 6
type: explanation
audience: operator
appliesTo: ojuny-pro-template
source: ~/repos/ojuny-future-repos/ojuny-pro-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Pro is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Pro treats security and a small trusted input set as first-class requirements.

## Trusted inputs

Every flake input must come from a trusted organization. Ojuny-owned repositories count as trusted. Personal forks and arbitrary third-party flakes are not allowed by default.

Application sources are restricted to nixpkgs and an approved Flatpak remote where a Flatpak is required. Pro ships a reviewed patch switch, and a no-untrusted-input check guards the build.

## Baseline controls

Pro applies these settings:

- Nixpkgs stable by default, on the 26.11 release.
- A firewall with a default-deny policy.
- SSH off by default.
- No remote desktop listener unless it is explicitly enabled.
- Disk encryption offered at install and recommended by the security page.
- Secure Boot supported through the existing post-install path, with the same limits as the core template.
- Audit, update, and integrity settings on one Security page with a readable baseline.
- No gaming stack, no launcher integrations, and no Windows runtime by default.

Disk encryption is recommended, not silently forced. Secure Boot enrollment happens after install and is not automatic.

## Desktop defaults

The GNOME desktop layer adds these defaults:

- No remote access listener.
- Screen lock enabled by default.
- Extension sources pinned in the flake and reviewed.
- No shell integration that executes unverified code at login.
- No telemetry and no online account integration.

## Install summary

The installer review step lists the security baseline and any disabled control. The install summary lists firewall, SSH, remote desktop, and update policy. The installer makes no telemetry, cloud account, or remote management connection, and a Pro install is not enrolled in Fleet.

## What Pro does not claim

Pro keeps several limits explicit.

- No certification and no enterprise support.
- No general-purpose MDM or Entra ID replacement claim.
- No secrets architecture. Pro is an individualized template.
- No custom package repository and no untrusted third-party binary cache.
- No Fleet server implementation and no Fleet enrollment.

Core Ojuny is not a security-focused distribution and does not make bold security claims. Upstreams are secure by default and Ojuny does not undo that. Patches are Nix code evaluated with build privileges and are not sandboxed, so a patch remains trusted code.

## Next

- [Install Pro](/pro/docs/installation/)
- [GNOME layout presets](/pro/docs/gnome-presets/)
- [Pro overview](/pro/docs/overview/)
