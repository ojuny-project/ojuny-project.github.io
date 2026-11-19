---
title: Installing Console
description: How to add the console session layer to NixOS or Home Manager, and how the console install media work.
sidebar:
  order: 2
type: how-to
audience: user
appliesTo: ojuny-console-installer
source: ~/repos/ojuny-future-repos/ojuny-console-installer/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Console is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny Console installs in two ways. You can add the console session layer as a Nix module on an existing system, or you can install the console system from its own media. Both paths end in the same gaming session.

Read [Requirements](/console/docs/requirements/) before you start. HDR, VRR and controller behavior depend on hardware that Ojuny does not certify.

## Add the session layer on NixOS

Add the flake input and the NixOS module. The options sit under `desktop.ojuny.console.*`:

```nix
{
  inputs.ojuny-console-desktop.url = "github:ojuny-project/ojuny-console-desktop";

  outputs = { nixpkgs, ojuny-console-desktop, ... }: {
    nixosConfigurations.console = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        ojuny-console-desktop.nixosModules.default
        {
          nixpkgs.config.allowUnfree = true;

          desktop.ojuny.console = {
            enable = true;
            autoLogin.enable = true;
            autoLogin.user = "player";

            settings = {
              enable = true;
              root = "/home/player/repos/nix-flake";
            };

            millennium.enable = true;
          };
        }
      ];
    };
  };
}
```

`allowUnfree` is required because Steam comes from nixpkgs. `autoLogin.user` must name a real account, and `settings.root` must point at the flake or configuration directory the frontend edits. The theme is optional.

Do not enable `programs.steam.gamescopeSession`. That option writes `steam.desktop` and claims the `steam` session id, so the module refuses the configuration with an assertion. See [Sessions](/console/docs/sessions/) for the reason.

## Add it with Home Manager

Home Manager installs the user-level session pieces:

```nix
{
  imports = [ ojuny-console-desktop.homeManagerModules.default ];

  desktop.ojuny.console = {
    enable = true;
    settings.enable = true;
    settings.root = "/home/player/repos/nix-flake";
  };
}
```

The session file lands in `~/.local/share/wayland-sessions`. GDM and LightDM do not scan the user profile, so link it into `/usr/share/wayland-sessions` or configure the display manager. `autoLogin` and `power` are NixOS-only options and are ignored here.

## Run the settings frontend

The runner opens the frontend against the current directory:

```sh
nix run github:ojuny-project/ojuny-console-desktop
```

Saving writes the files through the backend. If `settings.applyCommand` is set, the frontend offers to run it after saving. That command is not privileged.

## The console install media

The console installer turns a generic `x86_64` machine into a living-room console with the minimum number of prompts: boot, choose a disk, create the console account, install, then reboot into Steam Big Picture Mode. It installs the Console template by default and keeps the generic installer behavior, so another Ojuny template can still be installed from the same media.

The media come in five forms:

- An attended online ISO.
- An attended offline ISO with the Console closure.
- An attended discovery ISO that uses local Ojuny cache peers.
- An unattended ISO with a declarative answer file.
- A raw disk image for dedicated console hardware, when the persistent image path is used.

The install flow has eight steps:

1. Boot the media. The console template is selected by default.
2. Detect the target disk and confirm the destructive install.
3. Optionally encrypt the disk. The console account password is still required for recovery.
4. Create the console account and enable auto-login.
5. Choose the display mode: TV, monitor or automatic.
6. Install, reboot and start Steam Big Picture.
7. Pair a controller and sign in to Steam on first boot.
8. Optionally enable `nix-web-gui` and print its URL and access token.

## First boot

Steam starts in Big Picture Mode without a desktop. A controller pairing screen appears when no controller is detected. A short console setup page covers display, audio and network. The desktop target is explained, not forced. The management URL is shown only when `nix-web-gui` is enabled.

The installer also provides a recovery image or recovery entry that restores the console to the installed state without reinstalling.

## Limits

- The installer targets `x86_64-linux` only.
- The unattended path wipes the selected disk.
- The unattended path does not configure Wi-Fi.
- The installer does not provision a Steam account or install games.
- The installer does not enroll Secure Boot keys.
- There is no console hardware certification and no handheld support.
- No game is guaranteed to work under Proton.

## Next

- [Configuration](/console/docs/configuration/)
- [Sessions](/console/docs/sessions/)
- [Troubleshooting](/console/docs/troubleshooting/)
