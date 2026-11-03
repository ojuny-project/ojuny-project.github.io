---
title: Dux Shell
description: The desktop shell Ojuny configures, and where to read the rest.
sidebar:
  order: 3
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

[Dux Shell](https://github.com/duxlabs-dev/dux-shell) provides the bar, dock,
launcher, dashboard, control center, notifications, clipboard, lock screen, and
power controls around MangoWM. Ojuny generates its configuration from
`desktop.ojuny.dux.*`.

Runtime identifiers still use `dms`: the binary, `~/.config/dms`, the `DMS_`
environment prefix, `dms.service`, and `dms ipc call ...`. The option namespace
is `desktop.ojuny.dux`.

## What Ojuny sets

- The dock is off by default. The bar, launcher, dashboard, control center, and
  application menu are in use by default.
- Bar layouts are selected with `desktop.ojuny.dux.barPreset`. The bundled
  presets are `default`, `taskbar`, `status`, `caelestia`, `goth`,
  `simple-island`, `simple-bar`, and `none`, plus `custom`. The default is
  `default`.
- The bar, dock, control center, dashboard, and widget layouts are id-keyed
  sets. Each entry has an `_order` field.
- Session state lives in `~/.local/state/dms`. Generated shell files are
  symlinked into `~/.config/dms`; the directory stays writable.
- Scalar settings can be applied live from the settings menu. Collection
  layouts need a rebuild.

`desktop.ojuny.dux.barPresets` holds the preset definitions and is internal.

## Read more

- [Desktop usage in the manual](/ojuny-manual/usage/desktop/)
- [Settings menu in the manual](/ojuny-manual/usage/settings/)
- [Desktop option reference](https://github.com/ojuny-project/ojuny-desktop/blob/main/options.md)
- [Dux Shell upstream](https://github.com/duxlabs-dev/dux-shell)

## Next

- [Keybinds](/desktop/keybinds/)
- [Theming](/desktop/theming/)
- [Applications](/desktop/apps/)
