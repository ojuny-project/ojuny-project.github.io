---
title: Steam state and the theme
description: Which files Nix owns, which files Steam owns, and how the non-Steam shortcut and Millennium theme are reconciled.
sidebar:
  order: 8
type: explanation
audience: user
appliesTo: ojuny-console-desktop
source: ~/repos/ojuny-future-repos/ojuny-console-desktop/docs/steam-state.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Console is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Nix owns the session, the theme files and the shortcut definition. Steam owns the account, the library and the userdata directory. The boundary is explicit.

## What this repository writes

| Path | Owner | Reconcile policy |
| --- | --- | --- |
| `~/.steam/steam/millennium/themes/<name>` | Nix | Symlink, replaced on rebuild |
| `~/.config/millennium/config.json` | Steam and Nix | `themes.activeTheme` is set only when absent |
| `~/.local/share/Steam/userdata/<id>/config/shortcuts.vdf` | Steam and Nix | One entry is added or updated while Steam is stopped |
| `~/.local/state` and Steam logs | Steam | Not managed |

The session entry follows the same rule as the rest of the console layer. It is `ojuny-console.desktop`, and the standard `steam.desktop` is never written or replaced. See [Sessions](/console/docs/sessions/).

## The non-Steam shortcut

The shortcut entry is stored as binary VDF. The app id is the CRC32 of the executable and name with the high bit set. The reconciler:

1. Finds numeric userdata directories.
2. Parses each `shortcuts.vdf`.
3. Matches an entry by app name or app id.
4. Updates or appends one entry.
5. Writes a temporary file and replaces the original atomically.

It refuses to write while `steam` is running. The user service runs at `default.target` before `graphical-session.target`, which is also before Steam starts, so the normal path is safe.

Removal uses the same matcher and deletes only the entry this repository owns. `--remove` is available on `ojuny-console-shortcut`.

The shortcut points at `ojuny-console-settings`, the controller-first frontend. `shortcut.name` sets the library name and defaults to `"Ojuny Settings"`. The shortcut requires `settings.root`, because the frontend needs a configuration directory to edit.

## Millennium configuration

The theme is active when `themes.activeTheme` equals the theme directory name, which defaults to `"ojuny-console"`. The enrollment service never overwrites an existing value, so a theme selected in Millennium survives a rebuild.

If Millennium has never run, the service creates a minimal `config.json`. If the file is invalid JSON, the service leaves it alone and prints the parse error. Enrollment runs at login. After the first enrollment, restart Steam once so Millennium picks up the theme.

Millennium is optional. The theme is generated from the Stylix palette when Stylix is imported, and from the built-in Tokyo Night palette otherwise. A Steam update can break the theme or the injector, so keep `millennium.enable = false` as the recovery switch.

## Steam login

Ojuny never stores a Steam account. The first launch asks for a login. The shortcut reconciler skips systems with no userdata directory and runs again on the next login.

## Controller state

Steam Input stores controller layouts under the Steam userdata directory. Ojuny does not manage them. The frontend reads the virtual controller that Steam exposes to a launched non-Steam application. The [controllers page](/console/docs/controllers/) covers the input path and the frontend key map.

## Next

- [Sessions](/console/docs/sessions/)
- [Controllers](/console/docs/controllers/)
- [Troubleshooting](/console/docs/troubleshooting/)
