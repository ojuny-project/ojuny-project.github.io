---
title: Console sessions
description: The gaming session file, the gamescope launch path, the desktop target, and auto-login.
sidebar:
  order: 6
type: explanation
audience: user
appliesTo: ojuny-console-desktop
source: ~/repos/ojuny-future-repos/ojuny-console-desktop/docs/sessions.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Console is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The session layer registers a Wayland session and points the display manager at it. The console template supplies the surrounding session paths and the desktop target.

## The gaming session

The module registers one session package with `services.displayManager.sessionPackages`:

```text
/run/current-system/sw/share/wayland-sessions/ojuny-console.desktop
```

The desktop file carries `providedSessions = [ "ojuny-console" ]`. Its Exec line runs `ojuny-console-session`, which starts:

```text
gamescope --steam -f <display flags> -- steam -steamos -pipewire-dmabuf -gamepadui
```

The display flags come from `desktop.ojuny.console.display.*`. The option page lists them in [Configuration](/console/docs/configuration/).

## steam.desktop is untouched

The standard `steam.desktop` entry is never written, replaced or claimed. `programs.steam.gamescopeSession` is refused by an assertion because it emits that file and claims the `steam` session id. If a configuration enables it, evaluation fails with a message pointing at this rule. The fix is to disable the option, not to rename the generated file.

## Default session

`services.displayManager.defaultSession` is set to `desktop.ojuny.console.session.name`, which defaults to `ojuny-console`. The session layer therefore becomes the default session for the display manager.

## Desktop target

`desktop.ojuny.console.desktopSession` names the desktop session id. The session layer does not create that session. The console template supplies it, usually from `ojuny-desktop`. The option defaults to `"ojuny"`.

This split is the reason the desktop remains reachable. The gaming session is one session entry and the desktop is another, so a display manager can launch either one.

## Auto-login

On NixOS, `autoLogin.enable` and `autoLogin.user` set `services.displayManager.autoLogin`. When auto-login is disabled, the display manager greeter is used.

A failed console session with auto-login can loop. Set `session.recoveryCommand` or disable auto-login before relying on recovery. The [troubleshooting page](/console/docs/troubleshooting/) has the commands.

## Exit behavior

When Steam exits with status 0, the session ends and the display manager returns. When gamescope or Steam exits non-zero, the wrapper runs `session.recoveryCommand` if it is set.

## Session paths

The console template provides five session paths:

- A gaming session running Steam Big Picture under a gamescope compositor.
- A desktop session provided by the selected Ojuny desktop layer.
- A greeter path for choosing the session when auto-login is off.
- A first-boot path that creates the console account and starts Steam.
- A recovery path that boots the desktop or a terminal when the gaming session fails.

The desktop target is a separate session entry. The template makes it available when the gaming session ends or when the user picks it at the greeter.

## Next

- [Controllers](/console/docs/controllers/)
- [Steam state](/console/docs/steam/)
- [Troubleshooting](/console/docs/troubleshooting/)
