---
title: First boot
description: Log in, connect, fix the displays, and orient yourself.
sidebar:
  order: 4
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

When the system boots for the first time, log in with the account created by
the installer or the setup script. The
[manual's first boot chapter](/ojuny-manual/install/first-boot/) covers the full
desktop tour.

## Connect and open settings

Use the NetworkManager applet, the control center, or the CLI:

```sh
ojuny network open
ojuny network status
```

The annotation-driven settings menu is the primary place to change user-facing
options. Open it from the application menu. `ojuny settings open <page>` opens a
Dux Shell runtime page instead:

```sh
ojuny settings open displays
ojuny settings open network
```

Normal options should never break the system. Advanced options live in a
fold-out at the bottom of a page, hidden options are behind a toggle, and some
options are not exposed at all. Options marked with an icon apply to the running
session immediately. The rest are written to the Nix files and take effect on
Save & rebuild.

`nix-shell-gui` and `nix-regedit` are installed. Bazaar is installed only when
the Flatpak patch is enabled, and that patch is off by default.

## Check the displays

Ojuny generates a default display configuration. If the monitor layout is
wrong, set the resolution, refresh rate, scale, and position before tuning the
bar, gaps, or borders. If the detected machine is wrong, choose a profile on the
Hardware profile page and apply it without a full probe:

```sh
nix run .#regenerate-hardware -- --profile-only
```

Stage the generated quirks file before rebuilding:

```sh
git add modules/07-system/00-hardware-quirks.nix
```

## Review the keybinds

`SUPER+K` opens the searchable keybind menu. Bind modes are triggered with
`SUPER+F1` through `SUPER+F3`: move, group, and resize. The cheatsheet is
generated from the same bind definitions that configure MangoWM.

## Know the power defaults

The Power page sets the lid policy to `suspend`, `ignore`, or `clamshell`. The
setting writes all three logind lid keys and needs a rebuild. `clamshell`
suspends with an external display and ignores the lid when logind reports a dock
or an enabled external output.

## Update when you choose

Ojuny has no built-in auto-update.

```sh
ojuny flake update nixpkgs
ojuny flake validate
ojuny flake build
ojuny flake activate-boot
```

`activate-boot` leaves the running system untouched until reboot. Use
`activate-now` when you want the change immediately.

## Change the password if needed

`users.mutableUsers` is `false` by default. The account password is a hash in
the Nix configuration. Change it in the user page and rebuild.

## Enroll Secure Boot only if you need it

Secure Boot is an optional UEFI flow for systems that boot with systemd-boot.
See [post-install tasks](/install/post-install/#secure-boot).

## Commit the result

```sh
cd ~/repos/nix-flake
git status
git add -A
git commit -m "configure ojuny"
```

Commit after every successful rebuild so the next update and any patches remain
reviewable.
