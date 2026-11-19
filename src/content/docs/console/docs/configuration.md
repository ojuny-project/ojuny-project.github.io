---
title: Console configuration
description: The desktop.ojuny.console options, their defaults, and which module reads them.
sidebar:
  order: 3
type: reference
audience: operator
appliesTo: ojuny-console-desktop
source: ~/repos/ojuny-future-repos/ojuny-console-desktop/docs/options.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Console is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Every option lives under `desktop.ojuny.console.*` and is shared by the NixOS and Home Manager modules. Defaults are listed with each option.

## Session

| Option | Type | Default | Meaning |
| --- | --- | --- | --- |
| `enable` | bool | `false` | Install the console session layer |
| `desktopSession` | string | `"ojuny"` | Session id of the desktop target |
| `session.name` | string | `"ojuny-console"` | Wayland session id and desktop file name |
| `session.steamArgs` | list of string | `[ "-steamos" "-pipewire-dmabuf" "-gamepadui" ]` | Arguments passed to Steam |
| `session.extraGamescopeArgs` | list of string | `[ ]` | Extra gamescope arguments |
| `session.recoveryCommand` | string | `""` | Command run when the gaming session exits non-zero |
| `autoLogin.enable` | bool | `false` | Enable display manager auto-login, NixOS only |
| `autoLogin.user` | null or string | `null` | Account used for auto-login |

The module always uses `ojuny-console.desktop`. It never writes, replaces or claims `steam.desktop`, and `programs.steam.gamescopeSession` is refused by an assertion for the same reason. The `desktopSession` value names a session that this repository does not create. The console template supplies it, usually from `ojuny-desktop`.

## Steam

| Option | Type | Default | Meaning |
| --- | --- | --- | --- |
| `steam.package` | null or package | `null` | Steam package. Null selects `millennium-steam` when Millennium is enabled, otherwise `pkgs.steam` |
| `steam.extraArgs` | list of string | `[ ]` | Extra Steam arguments appended to `session.steamArgs` |
| `steam.extraCompatPackages` | list of package | `[ ]` | Additional compatibility tools |
| `steam.remotePlay` | bool | `false` | Open the Steam Remote Play firewall ports |

## Display

| Option | Type | Default | Meaning |
| --- | --- | --- | --- |
| `display.hdr` | bool | `false` | Add `--hdr-enabled` to gamescope |
| `display.vrr` | bool | `false` | Add `--adaptive-sync` to gamescope |
| `display.width` | null or int | `null` | Add `-W`. Null uses the display mode |
| `display.height` | null or int | `null` | Add `-H` |
| `display.refresh` | null or int | `null` | Add `-r` |

These options only pass gamescope flags. HDR and VRR depend on the GPU, kernel, Mesa and the display.

## Audio and input

| Option | Type | Default | Meaning |
| --- | --- | --- | --- |
| `audio.sink` | null or string | `null` | Exported as `PULSE_SINK` |
| `audio.channelLayout` | null or string | `null` | Exported as `PULSE_CHANNEL_MAP` |
| `input.steamHardware` | bool | `true` | Enable `hardware.steam-hardware` |
| `input.extraUdevRules` | lines | `""` | Additional udev rules |

## Power

| Option | Type | Default | Meaning |
| --- | --- | --- | --- |
| `power.idleAction` | null or enum | `"ignore"` | Logind idle action |
| `power.idleDelay` | int | `300` | Seconds before the idle action runs |
| `power.lidSwitch` | enum | `"ignore"` | Logind lid switch action |

Power options are NixOS only. Home Manager ignores them.

## Millennium

| Option | Type | Default | Meaning |
| --- | --- | --- | --- |
| `millennium.enable` | bool | `false` | Apply the Millennium overlay and use `millennium-steam` |
| `millennium.theme` | bool | `true` | Install and enroll the generated Big Picture theme |
| `millennium.name` | string | `"ojuny-console"` | Theme directory name and `themes.activeTheme` value |
| `millennium.accent` | null or string | `null` | CSS accent. Null uses base0D |

The theme is generated from the Stylix palette when Stylix is imported, and from the built-in Tokyo Night palette otherwise. A Steam update can break the theme or the injector, so `millennium.enable = false` is the recovery switch. See [Steam](/console/docs/steam/) for the files this writes.

## Settings frontend

| Option | Type | Default | Meaning |
| --- | --- | --- | --- |
| `settings.enable` | bool | `false` | Install the console settings frontend |
| `settings.root` | null or string | `null` | Flake or configuration directory the frontend edits. The Steam shortcut requires it |
| `settings.applyCommand` | null or string | `null` | Command run after saving. Null leaves the rebuild to the user |
| `settings.package` | null or package | `null` | Override the frontend package |
| `shortcut.enable` | bool | `true` | Add the frontend as a non-Steam shortcut |
| `shortcut.name` | string | `"Ojuny Settings"` | Library name of the shortcut |

`settings.applyCommand` is not privileged. Use a polkit-backed helper in the template if the console account should rebuild without a password.

## Next

- [Sessions](/console/docs/sessions/)
- [Controllers](/console/docs/controllers/)
- [Steam state](/console/docs/steam/)
- [Troubleshooting](/console/docs/troubleshooting/)
