---
title: Keybinds
description: One source of truth for the session and the cheatsheet.
sidebar:
  order: 4
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Keybinds are defined once in Nix and rendered twice: into the MangoWM config and
into the Dux Shell keybind cheatsheet. The same definitions also drive the Binds
pages in the settings GUI.

## Default keyboard model

The default model is SUPER-based. Only one key has to be memorized: `SUPER+K`
opens the searchable, filterable, categorized keybind menu. It lists every
keybind.

Binds are grouped into modes. `common` binds are active in every mode and hold
the global shortcuts. The four user-facing modes are:

- `default`: WASD changes focus, numbers change workspaces.
- `movement` (`SUPER+F1`): WASD swaps windows, numbers send them to workspaces.
- `groups` (`SUPER+F2`): WASD joins windows into groups, H and L focus group
  members, Z leaves the group, B toggles the group bar, and numbers toggle
  workspace visibility. Press `Backspace` to return to default.
- `resize` (`SUPER+F3`): WASD resizes the focused window.

`SUPER+Backspace` also returns to default from any mode.

## Open the cheatsheet

Use the desktop menu, the `keybinds` bind, or the CLI:

```sh
ojuny keybinds
```

The cheatsheet is generated from the same bind definitions. Each entry keeps its
description, its top-level `group`, and its `subcat`.

## Define a bind

```nix
desktop.ojuny.mango.binds.common.launcher = {
  modifier = [ "SUPER" ];
  keys = [ "SPACE" ];
  dispatcher = "spawn";
  args = "dms ipc call spotlight toggle";
  description = "Toggle launcher";
  group = "Applications";
  subcat = "Launch";
};
```

The first attribute under `binds` is the mode: `common`, `default`, `movement`,
`groups`, or `resize`. `group` is the cheatsheet's top-level category and
defaults to `Other`. `subcat` sorts entries within that group. Both are read by
the same generator that writes the cheatsheet.

## Bind groups

The same structure is used for mouse, scroll-axis, and trackpad gesture binds:

- `desktop.ojuny.mango.mousebind`
- `desktop.ojuny.mango.axisbind`
- `desktop.ojuny.mango.gesturebind`

Mouse binds cover buttons, axis binds cover scroll directions, and gesture binds
cover trackpad swipes only. A gesture bind is a 3- or 4-finger trackpad swipe; it
does not apply to a touchscreen or a mouse. The template ships default 3-finger
gestures for workspace switching, the launcher, and the menu.

## Switch binds

Switch binds react to hardware switch events, not to keys or trackpad swipes:

```nix
desktop.ojuny.mango.switchbind.default = {
  fold = "spawn,COMMAND";
  unfold = "spawn,COMMAND";
};
```

`switchbind.default` selects the mode. Inside it, `fold` and `unfold` are the only
documented switch states; each value is a dispatcher and its arguments,
comma-separated. Use switch binds only for that documented lid behavior. If Mango
handles the lid, systemd logind must be configured to ignore the same events.

## Editing in the GUI

The Binds and Gestures pages in the settings GUI expose the common bind groups.
The underlying values remain Nix attributes, so advanced binds can still be
written directly.

## After a change

Rebuild to regenerate the session config and the cheatsheet. `SUPER+R` reloads
the MangoWM config at runtime, but it does not regenerate the cheatsheet. Restart
Dux Shell after a rebuild to load the updated cheatsheet.

## Next

- [Theming](/desktop/theming/)
- [CLI](/cli/ojuny/)
