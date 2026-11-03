---
title: NixOS and Home Manager modules
description: Add the desktop to an existing system without adopting the template.
sidebar:
  order: 2
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The desktop layer can be consumed as a NixOS module or a Home Manager module.
This is the desktop-only path. It does not install the full Ojuny template,
generate a host, provide the settings pages, or manage your account.

Use the [template](/install/manual-template/) or [ISO](/install/iso/) if you
want the full system.

## NixOS module

The NixOS module wires the session, portals, polkit, XWayland, and the systemd
user session. It is the supported path on NixOS.

```nix
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    ojuny-desktop.url = "github:ojuny-project/ojuny-desktop";
  };

  outputs = { nixpkgs, ojuny-desktop, ... }: {
    nixosConfigurations.myhost = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        ojuny-desktop.nixosModules.default
        {
          desktop.ojuny.enable = true;
        }
      ];
    };
  };
}
```

## Home Manager module

The Home Manager module manages the user-level desktop configuration. It is
intended for other distributions that support Nix as well as NixOS.

The Home Manager module installs its session entry in the user profile at
`$profile/share/wayland-sessions/ojuny.desktop`. GDM and LightDM do not scan
the user profile by default. Symlink that file into
`/usr/share/wayland-sessions`, or point a display manager with a configurable
session directory at the profile path.

The host still needs a working Wayland session and the required system
services. The documented and tested release path is NixOS on `x86_64-linux`.
Home Manager on other distributions is intended, but it is not the tested
release path.

```nix
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    home-manager.url = "github:nix-community/home-manager";
    ojuny-desktop.url = "github:ojuny-project/ojuny-desktop";
  };

  outputs = { nixpkgs, home-manager, ojuny-desktop, ... }: {
    homeConfigurations.user = home-manager.lib.homeManagerConfiguration {
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      modules = [
        ojuny-desktop.homeManagerModules.default
        {
          desktop.ojuny.enable = true;
        }
      ];
    };
  };
}
```

## Common options

```nix
desktop.ojuny.enable = true;
desktop.ojuny.defaultApps = with pkgs; [ ghostty firefox ];
desktop.ojuny.stylix.enable = true; # requires the stylix module
desktop.ojuny.fileManager.package = "dux-files";
desktop.ojuny.wallpaper.preset = "everforest";
```

`desktop.ojuny.*` is shared by the NixOS and Home Manager modules. Shell
options live under `desktop.ojuny.dux.*`, while runtime identifiers still use
the shorter `dms` name.

The file manager is controlled by `desktop.ojuny.fileManager.*` and defaults
to `dux-files`. The wallpaper is controlled by `desktop.ojuny.wallpaper.*`;
`wallpaper.preset` selects a bundled preset and `wallpaper.image` overrides it
with a custom image.

See the [desktop options reference](/configuration/options/) for the full
surface.

## Boundaries

- The modules provide the desktop layer, not the full Ojuny system.
- The modules do not provide the full template, the settings pages, hardware
  generation, or host wiring.
- The modules do not install the `ojuny` CLI or the settings GUI.
- The modules do not create a package repository or a binary cache.
- The tested release path is NixOS on `x86_64-linux`. Home Manager on other
  distributions is intended but is not the tested release path.

## Next

- [Desktop overview](/desktop/overview/)
- [Desktop options reference](/configuration/options/)
- [Template flake install](/install/manual-template/)
