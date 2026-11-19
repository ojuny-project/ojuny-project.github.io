---
title: GNOME layout presets
description: The three Pro layout presets, what they change, and the extension policy behind them.
sidebar:
  order: 7
type: explanation
audience: user
appliesTo: ojuny-pro-desktop
source: ~/repos/ojuny-future-repos/ojuny-pro-desktop/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Pro is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny Pro uses GNOME as its only desktop and provides three layout presets.

## The three presets

| Preset | Layout |
| --- | --- |
| Default | Stock GNOME behavior with Ojuny branding and defaults |
| Windows-like | Bottom panel, application menu, and a taskbar-style window list |
| macOS-like | Top status bar and a bottom dock, with a global menu where the extension set supports it |

Each preset is a complete, versioned set of GNOME settings and extension configuration.

## What a preset changes

A preset controls panel placement, dock behavior, overview behavior, and keybindings. It does not change the application set, the security baseline, or the account model.

## Selecting a preset

The install flow asks for the preset after the template choice. It is also changeable from the settings GUI, on the desktop page.

## Extensions and GDM

GNOME extensions are limited to a reviewed allowlist. Extension sources are pinned in the flake, per-extension settings belong to the option surface, and the desktop check verifies that the allowlist contains no unpinned source. Arbitrary extension installation and a theme marketplace are out of scope.

GDM is the display manager, with the same account and login contract as the core template. A Home Manager session entry may not be scanned by GDM, as documented for the core desktop. The NixOS module is the primary path.

## Next

- [Configure Pro](/pro/docs/configuration/)
- [Security](/pro/docs/security/)
- [Install Pro](/pro/docs/installation/)
