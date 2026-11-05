---
title: Theming
description: The base16 palette, fonts, and wallpaper presets, and where to read the rest.
sidebar:
  order: 5
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny uses [stylix](https://github.com/nix-community/stylix) with a base16
palette. The default palette is `everforest-dark-hard`.

The palette is the template option `ojuny.style.palette`. It resolves against
`pkgs.base16-schemes`, and `stylix.base16Scheme` is derived from it. The desktop
module does not define a separate palette option.

MangoWM colors, the Dux Modular Shell theme, and the wallpapers are generated from that
palette. When `desktop.ojuny.stylix.enable` is on, stylix colors are mapped into
MangoWM and the shell. Without stylix, the desktop falls back to Everforest Dark
Hard and stays usable.

## Wallpaper presets

The template selector is `ojuny.style.wallpaperPreset`. It accepts `null`, a
preset name, or an image path. The bundled presets are `everforest` (label
Default), `floyd`, `stripes`, `waves`, `abstract`, `retro`, `logo`, and `city`.
The default is `everforest`.

The desktop options behind the selector are `desktop.ojuny.wallpaper.preset`,
`image`, `userDirectory`, and `cycleIncludeBuiltins`. An image path overrides
the preset and is not recolored.

## Fonts and applications

The default terminal face is CaskaydiaCove Nerd Font Mono. Stylix font roles and
locale fallbacks are template options. Application theming is described in the
manual.

## Read more

- [Settings menu in the manual](/ojuny-manual/usage/settings/)
- [Desktop usage in the manual](/ojuny-manual/usage/desktop/)
- [Desktop option reference](https://github.com/ojuny-project/ojuny-desktop/blob/main/options.md)

## Next

- [Applications](/desktop/apps/)
- [Desktop overview](/desktop/overview/)
