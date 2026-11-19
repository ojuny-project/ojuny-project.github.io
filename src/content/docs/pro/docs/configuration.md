---
title: Configure Pro
description: The Pro option surface, settings pages, and compatibility with the core template.
sidebar:
  order: 3
type: reference
audience: user
appliesTo: ojuny-pro-template
source: ~/repos/ojuny-future-repos/ojuny-pro-desktop/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Pro is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Pro configuration runs through one option surface, shared by the NixOS module and the Home Manager module.

## Option surface

The surface covers:

- Layout preset selection.
- Dock and panel behavior, overview behavior, and workspace behavior.
- Keybinding preset selection.
- GDM and login behavior.
- Theme, accent color, wallpaper, fonts, and cursor.
- Reviewed extension enablement and per-extension settings.
- Default browser and default applications owned by the desktop layer.
- Lock screen and screen blanking policy.
- Reduced animation and accessibility defaults.

## Settings pages

Pro groups its settings into these pages:

- Users and shared user settings.
- GNOME desktop, layout preset, displays, input, and appearance.
- Browser, office, mail and calendar, VPN, and remote desktop.
- Security baseline, firewall, disk encryption status, and update policy.
- Networking, hardware report, boot, and recovery.

Page files declare their own NixOS and Home Manager modules and carry `@menu` and `@option` comments. The settings GUI follows the import graph.

## Presets and extensions

A layout preset is a complete, versioned set of GNOME settings and extension configuration. A preset can be selected at install and changed later on the desktop page. Presets do not change the application set, the security baseline, or the account model.

GNOME extensions are limited to a reviewed allowlist. Extension sources are pinned in the flake. Arbitrary extension installation and a theme marketplace are out of scope. See [GNOME layout presets](/pro/docs/gnome-presets/).

## Compatibility

Pro keeps the same top-level flake outputs, generated file paths, setup prompts and generator behavior, annotation rules, patch switch behavior, and installer injection interface as the core template. A host built from it is consumed by the installer, the CLI, and lifecycle scripts without special cases. Fleet is the exception: it does not consume Pro.

## Next

- [GNOME layout presets](/pro/docs/gnome-presets/)
- [Security](/pro/docs/security/)
- [Pro overview](/pro/docs/overview/)
