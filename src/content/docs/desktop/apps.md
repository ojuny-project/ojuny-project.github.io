---
title: Applications
description: Default apps, the application list, and shipped desktop tools.
sidebar:
  order: 6
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny ships a desktop session, not a kitchen-sink application suite. Firefox,
Ghostty, dux-files, Steam, and small utilities ship by default. The wider suite,
including multimedia, office, Vesktop, web apps, and shell plugins, is available
as opt-in toggles.

The default file browser is dux-files, desktop id
`dev.duxlabs.files.desktop`. `desktop.ojuny.fileManager.package` selects
`dux-files`, `nautilus`, or `custom`. With `dux-files`, it registers the file
manager for directories, remote schemes, and archive types, and
`desktop.ojuny.fileManager.portal` registers the Dux Files FileChooser backend.
The `custom` option installs `customPackage` and uses `customCommand` without
MIME or portal wiring.

The application model is Nix plus Flatpak, with Flatpak provided as a patch,
and flakes for third-party software. It does not use the AUR. Proprietary
subscription-service applications are not installed by default.

## Default apps

`desktop.ojuny.defaultApps` adds packages to the session PATH:

```nix
desktop.ojuny.defaultApps = with pkgs; [
  ghostty
  firefox
];
```

The session uses these for the default terminal and launcher entries. The file
manager is installed and wired by `desktop.ojuny.fileManager`.

## Application sources

| Source | Role |
| --- | --- |
| Nix and nixpkgs | System packages, reproducible builds, dependency management |
| Flatpak | Sandboxed consumer applications, provided as a patch |
| Flakes | Third-party software from the source repository |

Flatpak is a patch because it does not adhere to the rebuild-and-rollback model
of core Ojuny. That is a deliberate boundary, not a rejection of Flatpak.

## Application pages

The template groups the application pages into two settings folders.

### 05-Applications

- **Installed applications** (`01-applist.nix`) installs the base command line
  and utility packages. It owns the file manager choice and the other MIME
  defaults for archives and text.
- **Multimedia** (`02-multimedia.nix`) groups viewers, tools, creative
  applications, and the calculator. Viewers are mpv, VLC, or Haruna for media,
  and imv, qimgv, or Gwenview for images. imv is the default. Tools are OBS
  Studio, Audacity, GIMP, ffmpeg, ImageMagick, yt-dlp, and satty. Creative
  toggles add Krita, Kdenlive, and Blender, all off by default. The calculator
  choice is none, GNOME Calculator, or Qalculate GTK, and associates no file
  type.
- **Office** (`03-office.nix`) adds LibreOffice, document format associations,
  the ArtCraft applications, and Obsidian. LibreOffice installs
  `libreoffice-fresh` with US English and German dictionaries. Its document
  associations cover OpenDocument, Microsoft Office, CSV, and RTF files and are
  written only while LibreOffice is on. The twelve craft app toggles are
  Photocraft, Vectorcraft, Lightcraft, PDFcraft, Effectcraft, Designcraft,
  Filmcraft, Gridcraft, Soundcraft, Cadcraft, Wordcraft, and Deckcraft. The
  all-apps switch and every individual switch are off by default. Obsidian is
  off because it is proprietary, and vault names opt in to per-vault theming.
- **Vesktop** (`04-vesktop.nix`) installs the Discord client when enabled. It
  also owns the Discord link association and stores its settings per user.
- **Gaming** (`05-steam.nix`) is the Steam page. Steam is enabled by default,
  with Windows compatibility tools, Proton GE, GameMode, Remote Play firewall
  rules, and LAN game transfers on. The gamescope session, Steam Input extest,
  the dedicated server firewall, and the Xbox wireless controller driver are
  off by default.
- **KDE Connect** (`06-kdeconnect.nix`) enables the Valent KDE Connect package
  and its phone integration. The page is hidden by default. It also enables
  gvfs and the SSH agent, and exports `SSH_AUTH_SOCK`, because the SFTP plugin
  mounts the device under `/run/user/<uid>/gvfs` and registers the device key
  with `ssh-add`. SFTP therefore needs a working gvfs mount and a reachable SSH
  agent.
- **Screenshots** (`07-screenshot.nix`) installs satty and the capture
  wrappers. Screenshot editing and OCR are on by default. OCR always includes
  English and accepts additional Tesseract language codes. The page also owns
  the region, fullscreen, window, scroll, QR, and OCR captures and their
  keybinds.

### 06-Utility

- **Dux tools** (`00-dux-tools.nix`) configures dsearch, Dux Files, Dux
  Calendar, and dgop. dsearch and Dux Calendar are on by default; the standalone
  dgop HTTP API is off. Nix owns only policy keys for Dux Files and Dux Calendar
  and merges them into each app's existing settings file at activation. Dux
  Calendar owns its initial view, so the page has no view control.
- **Web apps** (`01-webapps.nix`) installs Chromium-based web applications as
  desktop entries. YouTube is the default row, and rows can carry a name, URL,
  and optional icon.
- **Dux Shell plugins** (`02-plugins.nix`, titled DMS plugins) manages the
  plugin settings and installs the plugin set used by the shipped layout. The
  default set includes the application menu, emoji launcher, KDE Connect,
  world clock, Nix monitor, local services, scratchpad helper, developer
  utilities, screen capture toolbar, command runner, web search, virtual
  keyboard, and calendar agenda.

Each page is a normal Nix module with `@menu` and `@option` annotations. Turning
an application on adds the package and any required integration.

## Browser and MIME defaults

The browser page owns the default browser and its MIME associations. It selects
Firefox, Chrome, or Brave and exposes switches for HTML, HTTP, HTTPS, PDF, PNG,
and mail links through `xdg.mime.defaultApplications`. All but the PNG
association are on by default.

The application list owns the file manager and its directory, remote scheme,
and archive associations, plus the extra archive and text rows. The multimedia
page owns the default image viewer associations. The office page owns document
associations while LibreOffice is enabled, and the Vesktop page owns the Discord
link association.

## Gaming

Steam is the supported gaming path and is built into the desktop. Prism
Launcher, Lutris and Heroic through the gaming launchers patch, RetroArch,
Battle.net, and GeForce NOW are opt-in patches. Install a patch from the command
line, then enable it on the Patches page.

## Desktop tools

The desktop layer includes the tools needed by the shipped bar and menus:

- Dux Shell and its default plugin set.
- KDE Connect integration.
- `iproute2` and related session utilities.
- `ojuny-ghostty`.
- `nix-settings-gui`, `nix-regedit`, `nix-shell-gui`, and
  `simple-nix-update-gui`.

## Patches

Patch installation and removal are CLI-only. The settings menu shows installed
patches and lets you enable or disable them. Installing a patch copies one
module into the flake; it does not enable it.

## Next

- [Theming](/desktop/theming/)
- [Patches](/patches/overview/)
