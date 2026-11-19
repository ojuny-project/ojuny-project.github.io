---
title: Troubleshooting
description: How Pro is checked, what the support boundary is, and where to look for behavior.
sidebar:
  order: 5
type: how-to
audience: user
appliesTo: ojuny-pro-template
source: ~/repos/ojuny-future-repos/ojuny-pro-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Pro is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Pro is checked at three layers: the template, the GNOME desktop, and the installer. Those checks define the behavior a user can expect.

## Template checks

- The flake evaluates and the GNOME system builds.
- Each layout preset produces a valid session.
- The setup script produces a bootable configuration.
- The installer installs this template through the generic path.
- A no-gaming check and a no-untrusted-input check pass.

## Desktop checks

- Both modules evaluate.
- Each preset produces a valid set of dconf values.
- A headless GNOME session starts with the generated configuration.
- The extension allowlist contains no unpinned source.
- A rebuild changes the session without requiring a new account.

## Installer checks

- Each ISO boots in QEMU.
- A Pro install reaches GDM with each layout preset.
- An offline install completes without network access.
- An attended install of a non-Pro Ojuny template succeeds.
- An encrypted install prompts correctly and boots.

## Support boundary

Pro offers no certification and no enterprise support. The core project has no support team, and support comes from the Ojuny community and the NixOS community.

For the behavior of each security control, read the [security baseline](/pro/docs/security/). For platform and media constraints, read [requirements](/pro/docs/requirements/). For the install flow, read [Install Pro](/pro/docs/installation/).

## Next

- [Requirements](/pro/docs/requirements/)
- [Security](/pro/docs/security/)
- [Pro overview](/pro/docs/overview/)
