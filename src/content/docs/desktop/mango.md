---
title: MangoWM
description: The compositor Ojuny configures, and where to read the rest.
sidebar:
  order: 2
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

MangoWM is the Wayland compositor. It is an upstream project. Ojuny configures
it from Nix and does not fork it. The generated TOML is launched from a stable
symlink.

The full walkthrough is in the manual. The option reference is in the desktop
repository.

## What Ojuny sets

- The default tag rule uses the `dwindle` layout.
- `tag_num` is 10. That is an Ojuny override; the MangoWM default is 9.
- Tag 0 is the special workspace, opened as an overlay.
- Keybinds are structured values under `desktop.ojuny.mango.binds`, grouped by
  mode. `SUPER+K` opens the keybind menu.
- Window, tag, layer, monitor, and device rules are lists under
  `desktop.ojuny.mango.rules`.
- Displays are monitor rules. The template ships two generic rules, `eDP-1` and
  `HDMI-A-1`.

The layout families are scroller, vertical-scroller, master-stack, monocle, and
dwindle. The settings menu exposes pages for the master, dwindle, scroller, and
monocle/deck groups plus workspaces. A per-workspace layout is a tag rule and
overrides the wildcard default for that tag.

MangoWM supports multiple monitors, scaling, HDR with the Vulkan renderer, and
trackpad gestures. Fix the display layout before tuning gaps, borders, or the
bar.

## Read more

- [Desktop usage in the manual](/ojuny-manual/usage/desktop/)
- [Settings menu in the manual](/ojuny-manual/usage/settings/)
- [Desktop option reference](https://github.com/ojuny-project/ojuny-desktop/blob/main/options.md)
- [MangoWM upstream](https://github.com/mangowm/mango)

## Next

- [Keybinds](/desktop/keybinds/)
- [Dux Shell](/desktop/dux-shell/)
