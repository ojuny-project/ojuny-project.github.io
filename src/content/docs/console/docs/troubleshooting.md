---
title: Console troubleshooting
description: Failure cases for the console session, the recovery command, and which user services to inspect.
sidebar:
  order: 5
type: how-to
audience: operator
appliesTo: ojuny-console-desktop
source: ~/repos/ojuny-future-repos/ojuny-console-desktop/docs/recovery.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Console is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The gaming session has five failure cases.

## Failure cases

| Failure | Result | Recovery |
| --- | --- | --- |
| gamescope fails to start | Session exits non-zero | `session.recoveryCommand` runs, then the display manager returns |
| Steam fails to start | gamescope exits non-zero | Same |
| Steam exits normally | Session ends with status 0 | Display manager returns |
| Millennium breaks Steam | Steam may exit or show a broken UI | Disable `millennium.enable`, rebuild, restart the session |
| Theme enrollment fails | Steam starts with the default theme | `systemctl --user status ojuny-console-theme` |

## Recovery command

`session.recoveryCommand` is a shell command run by the session wrapper after a non-zero exit. Leave it empty to let the display manager handle the return.

A useful command switches to the desktop target:

```nix
desktop.ojuny.console.session.recoveryCommand = "systemctl --user start graphical-session.target";
```

The exact command depends on how the desktop target is registered. The [sessions page](/console/docs/sessions/) covers the target and the auto-login interaction.

## Auto-login loop

With auto-login enabled and no recovery command, a failed session can return to the greeter and log in again. Disable auto-login while debugging:

```nix
desktop.ojuny.console.autoLogin.enable = false;
```

## Manual checks

From a TTY or the desktop session, run:

```sh
systemctl --user status ojuny-console-theme
systemctl --user status ojuny-console-shortcut
journalctl --user -u ojuny-console-theme -b
journalctl --user -u ojuny-console-shortcut -b
ls ~/.steam/steam/millennium/themes
cat ~/.config/millennium/config.json
```

Steam's own log is under `~/.steam/steam/logs/`.

## Disable Millennium

If Steam fails after a Steam update, turn off the overlay and rebuild:

```nix
desktop.ojuny.console.millennium.enable = false;
```

The session then uses `pkgs.steam` and the standard Steam UI. See [Steam](/console/docs/steam/) for what the theme and shortcut services write.

## Next

- [Sessions](/console/docs/sessions/)
- [Steam state](/console/docs/steam/)
- [Requirements](/console/docs/requirements/)
