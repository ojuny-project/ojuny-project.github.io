---
title: Pro overview
description: What Ojuny Pro is, who it targets, and how it relates to the core template.
sidebar:
  order: 1
type: explanation
audience: user
appliesTo: ojuny-pro-template
source: ~/repos/ojuny-future-repos/ojuny-pro-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Pro is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny Pro is the workplace edition of the Ojuny template. It targets professional and workplace users rather than home, gaming, and development users. It uses GNOME instead of the MangoWM and Dux Modular Shell desktop.

Security and a small trusted input set are first-class requirements in Pro. The template stays interchangeable with the regular `ojuny-template`, so the installer, the settings GUI, and the patch system consume it without product-specific forks of their own logic.

## Repositories

Pro spans three repositories:

- `ojuny-pro-template`: the forkable workplace system template.
- `ojuny-pro-desktop`: the GNOME desktop layer, consumed by the template.
- `ojuny-pro-installer`: the install media, which installs the Pro template by default.

## Who it targets

Pro is built for a professional workstation. It keeps the core template shape: the same flake outputs, generated file paths, setup prompts, `@menu` and `@option` annotation rules, patch switch behavior, and installer injection interface.

A host built from Pro is consumed by the installer, the CLI, and the lifecycle scripts without special cases. It is not consumed by Fleet.

## Pro is individualized

Pro is individualized like the regular template. It is not fleet-managed and has no enrollment path of its own. Central management lives in `ojuny-fleet-controller` and `ojuny-fleet-manager`, and Fleet deploys its own integrated `ojuny-endpoint` template to managed devices.

## Relationship to core Ojuny

The core project's desktop remains MangoWM with Dux Modular Shell, and its scope document excludes alternate desktops for that line. Pro is a separate template line, and GNOME is its only desktop. The early COSMIC edition is not part of Pro.

## Next

- [Installation](/pro/docs/installation/)
- [GNOME layout presets](/pro/docs/gnome-presets/)
- [Security](/pro/docs/security/)
