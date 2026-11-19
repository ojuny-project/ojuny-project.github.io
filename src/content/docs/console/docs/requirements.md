---
title: Console requirements
description: What the console session layer needs, and what Ojuny Console does not promise.
sidebar:
  order: 4
type: reference
audience: operator
appliesTo: ojuny-console-desktop
source: ~/repos/ojuny-future-repos/ojuny-console-desktop/README.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Console is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The session layer has five requirements.

| Requirement | Detail |
| --- | --- |
| NixOS or Home Manager with flakes | The flake exports a NixOS module, a Home Manager module and standalone packages |
| Steam from nixpkgs | Unfree packages must be allowed |
| gamescope and a Wayland display manager | The wrapper launches gamescope, and the session file is read by a display manager |
| A Steam account | Ojuny does not store one |
| An annotated configuration directory | The settings frontend reads pages from `@menu` and `@option` annotations |

The settings frontend talks to `nix-settings-backend --stdio`, so `settings.root` must point at a directory that carries the annotations the frontend should show.

## Platform

The session layer is written for NixOS and Home Manager. Auto-login and power behavior are NixOS-only. The console template and installer target `x86_64-linux` only.

The console template targets a TV, a controller and a single local account. Multi-user console mode is not supported. Handheld hardware support is not included.

## Steam is required

Steam is required for the primary experience. Ojuny does not circumvent DRM and does not guarantee game compatibility. Proton results vary by title, and the installer does not install games for you.

## Hardware-dependent features

The options pass gamescope flags, and the hardware decides what happens next.

- HDR and VRR depend on the GPU, kernel, Mesa and the display.
- Big Picture theming depends on Millennium and on Steam's internal class names, so a Steam update can break the theme or the injector.
- Controller mapping in the frontend depends on the device being visible through libmanette, which sees the virtual controller that Steam Input exposes inside a Big Picture session.

Ojuny does not certify hardware, does not replace SteamOS update channels and does not provide Valve certification.

## Network and management

`nix-web-gui` is an optional management service so the machine can be configured from a phone or another computer. It is opt-in, and there is no always-on remote management listener. The installer shows the management URL only when the service is enabled.

## Next

- [Installation](/console/docs/installation/)
- [Configuration](/console/docs/configuration/)
- [Controllers](/console/docs/controllers/)
- [Troubleshooting](/console/docs/troubleshooting/)
