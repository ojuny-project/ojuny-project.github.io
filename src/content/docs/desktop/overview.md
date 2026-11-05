---
title: Desktop overview
description: What the Ojuny desktop feels like and how the pieces fit together.
sidebar:
  order: 1
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The Ojuny desktop is a wrapped Wayland session built from
[MangoWM](https://github.com/mangowm/mango) and
[Dux Modular Shell 2.0](https://github.com/duxlabs-dev/dux-shell). It is not a copy of
a dotfiles directory. Every setting is generated from `desktop.ojuny.*` Nix
options.

The code and runtime identifiers still use the shorter `dms` name for the shell. Options live under `desktop.ojuny.dux`.

## What it feels like

Ojuny is a tiling desktop, but it is not meant to feel like extra effort just
to use. It should feel intentional, calm, and novel to someone who has not used
a tiling window manager. The goal is to feel like home within the first day.

The style is simple, rounded, and material, with little visual noise and
unobtrusive animations. The default palette is Everforest Dark Hard.

The first-hour bar is simple: no kernel panic and no desktop crash. The desktop
goal is to reproduce the maintainer's own stable MangoWM setup without
degradation through any install method. The reference is a real daily-use
desktop, not a mockup.

## Session and login

The desktop is registered as a Wayland session named Ojuny. The session starts
MangoWM with the generated configuration, then brings up Dux Modular Shell.

The template provides a graphical greeter through dux-greeter and sets the
Ojuny session as the default. The login page exists in the settings menu but is
hidden from the default view. It holds the greeter, compositor, and auto-login
settings.

## Shell surfaces

Dux Modular Shell provides several distinct surfaces, all configured from the same
option tree. Every surface is optional. The dock is off by default. The bar,
launcher, dashboard, control center, and application menu are in use by
default.

- **Bar**: a configurable bar with left, center, and right widget groups. It
  ships island presets, including taskbar and status layouts, plus a custom bar
  editor and placement on any screen edge. The default preset includes
  workspaces, a layout indicator, a scratchpad helper, media, clock, weather,
  system tray, clipboard, developer utilities, local services, Nix monitor,
  and a control center button. The taskbar and status presets add the world
  clock.
- **Dock**: available but disabled by default. It can be enabled with pinned
  apps, an app grid, overflow, magnification, autohide, and per-monitor
  behavior.
- **Launcher**: a searchable island-style launcher with an app drawer and
  plugin triggers for clipboard, power, QR generation, and settings search.
- **Dashboard**: a full-screen overview with clock, weather, calendar, media,
  system monitoring, network, notifications, and user information cards. Tabs
  cover media, notifications, wallpaper, weather, and wellbeing; the overview
  tab is off by default.
- **Control center**: a quick-tile group plus a widget grid for volume,
  brightness, Wi-Fi, Bluetooth, battery, night mode, idle inhibition,
  do-not-disturb, disk usage, VPN, lock, power, the user tile, and running
  apps.
- **Application menu**: the shell's bundled menu or a Nix-managed menu tree.
- **Notifications**: configurable animation, timeout bar, font sizes, compact
  mode, and monitor focus behavior.
- **Clipboard**: persistent history with configurable limits and auto-clear.
- **On-screen display**: feedback for volume, media playback, microphone, caps
  lock, power profile, and workspace changes.
- **Sounds**: system event sounds.
- **Lock and power**: session actions, lock-screen widgets, fingerprint and
  security-key authentication, and power controls.
- **Wallpaper**: bundled presets and a user wallpaper directory, with
  interval or time-based cycling, random order, and transitions in Dux Modular Shell.
  Bundled presets are recolored with the active palette and can be included in
  or excluded from cycling.
- **World clock**: the `worldClock` plugin provides multiple cities and time
  zones, with cycling, 24-hour, and icon-only display. The template enables it
  by default and places it on the taskbar and status presets.
- **Night light**: a manual toggle and an automatic schedule with color
  temperature, location, fullscreen pause, and excluded applications.
- **Screensaver**: an optional ASCII screensaver that runs before the lock
  screen. It is off by default.
- **Accessibility**: an Accessibility page covers the Orca screen reader,
  BRLTTY braille, the on-screen keyboard plugin, high-contrast palettes, an ICC
  color profile, mono audio, a coordinated reduce-motion switch, accessibility
  keybinds, and a ydotool-backed mouse mode. Screen magnification is not part of
  the current set.

Sounds, OSD, notifications, clipboard, lock screen, and power controls are
core. They are not optional extras.

The default plugin set is deliberate, not the whole registry. The desktop layer
enables the application menu, KDE Connect integration, a Nix monitor, a local
services viewer, a scratchpad helper, and developer utilities because the
default layout references them. The template enables a few more on its plugins
page, including the world clock, on-screen keyboard, calendar agenda, emoji
launcher, command runner, web search, and screenshot toolbar. Other registry
plugins are available but off.

## Settings menu

The settings menu is the primary interface for changing the desktop. It should
feel like a control panel, similar in spirit to the settings panels on KDE and
GNOME. It is not a simple preferences window and not a separate configuration
store.

- It has custom widgets, including a graphical monitor configuration tool.
- It can apply many scalar settings live and temporarily, so you can tune
  visuals before committing. Collection edits such as bar, dock, and dashboard
  layouts require a rebuild.
- It shows descriptions from `nixd` and from the `@option` annotations.
- It supports normal, advanced, hidden, and unexposed options. Unexposed
  options do not appear in the menu at all.
- It validates edits with `rnix`, `nixd`, and other checks, and writes
  atomically.
- The normal tier is curated so its settings should not prevent the system from
  starting fully. Validation guarantees parseable, formatted Nix that matches
  the control type; it does not evaluate the configuration or test boot.
  Advanced, hidden, and unexposed options are outside that claim.

Without touching Nix, you can fully configure the visuals of MangoWM, the
theming of the whole desktop, and the visuals and layouts of the Dux Modular Shell bar,
dock, dashboard, and control center. Ojuny can stop feeling like base Ojuny
within an hour after install.

## Window management

MangoWM is a tiling compositor. The default layout is `dwindle`, a recursive
split layout. The supported layout families are scroller, vertical-scroller,
master-stack, monocle, and dwindle. The template exposes four settings pages:

- Master and stack (`tile`): a main window plus a stack, with configurable
  counts and ratios.
- Dwindle: a recursive split layout.
- Scroller: a horizontally scrolling layout.
- Monocle and deck: tabbed full-screen and stacked layouts.

Changing the default is a dropdown with full layout names, backed by the
underlying tag rules.

Workspaces and tags are the same concept. Think of them as compartmentalization:
windows can be spread across tags to match a workflow. Tags also allow a window
to be on multiple workspaces at once and multiple workspaces to be viewed at
once.

Window rules are Nix values. Common rules have a settings page; complex rules
can be written directly.

Displays are configured with monitor rules. A fresh system starts with two
generated generic rules, `eDP-1` and `HDMI-A-1`, so the first session is
predictable; replace them with the real outputs. On the display page you set
position, resolution, refresh rate, scale, tearing, HDR, gamma, and contrast;
the monitor widget arranges outputs graphically. Multiple monitors, HDR, and
scaling are MangoWM features. Trackpad gestures are trackpad-only and are
configured on their own page. The input page covers keyboard layout and repeat,
mouse and trackpad behavior, touch, and Fcitx5 input methods.

Hardware detection writes a facter report, and the Hardware profile page selects
a matching `nixos-hardware` profile with an automatic or manual choice and shows
the detected model. Coverage is a checked-in profile list; most entries are
untested on Ojuny hardware.

## Keybinds

The default keyboard model is SUPER-based. Only one key has to be memorized:
`SUPER+K` opens the keybind menu. It is searchable, filterable, and
categorized, and it lists every keybind.

Bind modes are triggered with `SUPER+F1` through `SUPER+F3`:

- Default: WASD changes focus, numbers change workspaces.
- `F1` move mode: WASD moves windows, numbers move them to workspaces.
- `F2` group mode: WASD group-joins windows, numbers toggle multi-workspace view.
- `F3` resize mode: WASD resizes the focused window.

Keybinds are structured data, not strings. Each bind has a modifier list, keys,
a dispatcher, arguments, a description, a group, and a subcat. `group` is the
cheatsheet's top-level category; `subcat` sorts entries within it. The same
definitions generate the MangoWM configuration and the keybind cheatsheet JSON,
so the cheatsheet cannot drift from the session.

The same bind structure covers mouse buttons, axis events, and trackpad
gestures.
Trackpad gestures are trackpad-only. The template ships default gestures for
workspace switching, the launcher, and the menu.

## Applications and defaults

Ojuny's application model is Nix plus Flatpak, with Flatpak provided as a patch,
and flakes for third-party software. It does not use the AUR.

| Source | Role |
| --- | --- |
| Nix and nixpkgs | System packages, reproducible builds, dependency management |
| Flatpak | Sandboxed consumer applications, provided as a patch |
| Flakes | Third-party software from the source repository |

Firefox, Ghostty, dux-files, and Steam ship by default in the template, along
with small utilities and the KDE Connect integration. The wider suite is
opt-in: multimedia, office and creative tools, Vesktop, web apps, and shell
plugins. Steam is the only supported gaming client.

The template adds the Nix GUI tools for settings, temporary apps, flake
editing, and updates. KDE Connect integration is part of the default plugin
set.

## Store-derived configuration

The MangoWM configuration is rendered as TOML and launched with
`-c ~/.config/mango/ojuny.toml`. That path is a stable symlink into the Nix
store.

The Dux Modular Shell configuration tree is generated in the store and each file is
symlinked into `~/.config/dms`. The directory stays writable so the shell can
create and update its own files. The session file is seeded into
`~/.local/state/dms` and stays writable, so runtime state such as wallpaper
cycling works. On NixOS, the `ojuny-config` oneshot repoints the generated links
during activation, so a switch updates the config without a relogin. Restart DMS afterward to reload the shell and MangoWM.

## The namespace

Everything is under `desktop.ojuny.*`:

| Option | Purpose |
| --- | --- |
| `enable` | Enable the desktop layer |
| `mango.*` | Global settings, environment, rules, key binds, mouse binds, axis binds, switch binds, and trackpad gestures |
| `dux.*` | Shell settings, session settings, clipboard settings, plugin settings, bar, dock, control center, dashboard |
| `dankMenu.*` | Structured application menu |
| `stylix.enable` | Map the stylix palette into MangoWM and Dux Modular Shell |
| `defaultApps` | Packages added to the session PATH |

See [reading desktop options](/configuration/options/) for where the reference lives.

## Try it

```sh
nix run github:ojuny-project/ojuny-desktop
```

The runner uses temporary `XDG_CONFIG_HOME`, `XDG_STATE_HOME`,
`XDG_CACHE_HOME`, and `XDG_DATA_HOME` directories, runs the same linker as the
modules, and does not touch your real shell configuration.

## Boundaries

- Installing and removing patches is CLI-only. Installed patches expose their
  options in the GUI.
- Advanced Nix functionality is Nix-only.
- The desktop is one shape: MangoWM plus Dux Modular Shell. Alternate desktops exist
  only as patches, which are extensions with their own support burden.
- The desktop must never become bloated.

## Next

- [MangoWM](/desktop/mango/)
- [Dux Modular Shell](/desktop/dux-shell/)
- [Keybinds](/desktop/keybinds/)
- [Theming](/desktop/theming/)
- [Applications](/desktop/apps/)
