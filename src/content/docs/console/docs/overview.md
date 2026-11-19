---
title: Console overview
description: What Ojuny Console is, which repository does what, and how the session behaves.
sidebar:
  order: 1
type: explanation
audience: user
appliesTo: ojuny-console-template
source: ~/repos/ojuny-future-repos/ojuny-console-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Console is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny Console is the living-room edition of the Ojuny template. The machine behaves like a console first and a desktop second. It boots into Steam Big Picture Mode by default, can log in automatically, and still exposes a desktop target for management and non-Steam use.

The console targets a TV, a controller and a single local account. It is not a general desktop template with Steam added.

## The three repositories

| Repository | Role |
| --- | --- |
| `ojuny-console-template` | The forkable console system template: console account, session selection, console pages, patch switch |
| `ojuny-console-desktop` | The session layer: gaming session, Millennium theme, settings frontend, non-Steam shortcut |
| `ojuny-console-installer` | Install media that installs the Console template by default |

The template satisfies the minimum template requirements defined by `ojuny-minimal-template`. The generated hardware, host and user paths, the setup prompts, the installer injection, the patch switch and the settings annotation rules match the other templates.

## What the session layer provides

The session layer installs:

- `ojuny-console.desktop`, with the session id `ojuny-console`.
- A gamescope wrapper that runs `steam -steamos -pipewire-dmabuf -gamepadui`.
- Millennium with a generated Big Picture theme, when it is enabled.
- `ojuny-console-settings`, a GTK4 controller-first frontend over `nix-settings-backend`.
- An idempotent non-Steam shortcut for the frontend in Steam's `shortcuts.vdf`.

It exports a NixOS module, a Home Manager module and standalone packages. It does not contain a host, a user, an installer or an application catalog.

## Steam keeps its own session entry

The standard `steam.desktop` entry is never written, replaced or claimed. The console session is a separate file with its own session id. `programs.steam.gamescopeSession` is refused by an assertion because that option emits `steam.desktop` and claims the `steam` session id. The fix is to disable the option, not to rename the generated file.

## Limits

- HDR and VRR depend on the GPU, kernel, Mesa and the display.
- Big Picture theming depends on Millennium and on Steam's internal class names, so a Steam update can break the theme or the injector.
- There is no game compatibility guarantee, no Steam account handling and no hardware certification.

## Next

- [Installation](/console/docs/installation/)
- [Configuration](/console/docs/configuration/)
- [Requirements](/console/docs/requirements/)
- [Sessions](/console/docs/sessions/)
- [Controllers](/console/docs/controllers/)
- [Steam](/console/docs/steam/)
- [Troubleshooting](/console/docs/troubleshooting/)
