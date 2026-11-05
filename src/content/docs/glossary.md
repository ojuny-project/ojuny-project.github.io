---
title: Glossary
description: The words Ojuny uses for its project, desktop, configuration, and patches.
sidebar:
  order: 4
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

This page defines the terms used across the site. Code spellings appear in
monospace. When a page and this glossary disagree about a word, the glossary is
the reference.

## Project

**Ojuny**: The project and the desktop experience it provides. Capitalize it in
prose.

**`ojuny`**: The lowercase spelling used in commands, option prefixes, and
repository names.

**Wrapper around NixOS**: The most accurate short description. Ojuny is a
configuration and packaging layer, not a fork of NixOS.

**Dotfiles**: The public framing. Ojuny is a dotfiles setup that can also build
an ISO, deploy a machine, and provide a settings menu.

**SDG / `ojuny-project`**: SDG makes Ojuny. The public repositories are
published under the `ojuny-project` organization on GitHub.

## Desktop

**MangoWM**: The upstream Wayland compositor. Ojuny configures it and does not
fork it.

**Dux Modular Shell**: The desktop shell product, consumed from `duxlabs-dev/dux-shell`.
DMS is the accepted shorthand after the first mention.

**DMS**: The shorthand and runtime identifier for Dux Modular Shell. It remains in
the `dms` binary, the `dms.service` unit, paths such as `~/.config/dms`, the
`DMS_` environment prefix, and commands such as `dms ipc call`.

**dux suite**: The upstream projects Ojuny consumes: dux-shell, dux-files,
dux-gop, dux-search, dux-calendar, and dux-greeter.

**Island**: The default style for the bar and the launcher.

**Master layout**: The default tiling layout, matching MangoWM.

**Tag**: The MangoWM term for a workspace. Ojuny treats the two words as the
same concept.

**Bind mode**: A temporary keyboard mode for moving, grouping, or resizing
windows. `SUPER+F1` selects move, `F2` selects group, and `F3` selects resize.

## Configuration

**Flake**: A pinned set of Nix inputs and outputs.

**Dendritic**: The pattern of building a flake from many small modules.

**Home Manager**: The user-level configuration system used alongside NixOS.

**Generated files**: The hardware, user, and host modules created for one
machine. They are the only tracked files that may contain personal values.

**Generation**: A NixOS system version that can be selected at boot.

**Rollback**: Returning to an earlier generation. It restores system state, not
user files or changes made outside the configuration.

**Durable state**: Data that must survive a rebuild, so it belongs in the flake.

**Disposable state**: Data that can be lost without preventing the system from
booting.

## Settings

**Settings menu**: The GUI provided by `nix-settings-gui`. It edits annotated
Nix files.

**`@menu`**: The annotation that marks a file as a settings page.

**`@option`**: The annotation that describes one control.

**Normal option**: A default setting that should never be able to break the
system.

**Advanced option**: A setting a typical user may want, kept in a folded
section at the bottom of a page.

**Hidden option**: A power-user setting placed behind a toggle.

**Unexposed option**: A setting that the menu does not show at all.

**Live apply**: A setting that changes the running session immediately while
still being written to Nix.

## CLI and patches

**`ojuny`**: The command-line tool for troubleshooting, runtime state, flake
operations, and patch management.

**`ojuny-patches`**: The command-line patch manager.

**Patch**: A flake-parts module with settings-menu annotations. Patches are not
exclusive to Ojuny.

**Patch registry**: The default source for patches. Entries are reviewed, but
each patch remains third-party content.

**Third-party content**: Patches, including those in the default registry.
Ojuny provides the interface and does not own the patches.

**No forks**: Ojuny configures upstream projects rather than maintaining its own
copies of them.

## Install

**Interactive ISO**: The Calamares live image for trying the desktop and
installing with a graphical installer.

**Unattended ISO**: A generated image for an automatic install, intended for
advanced users who want a pre-configured deployment.

**Template setup script**: The full-system install path on an existing NixOS
machine.

**`nix run`**: The trial path that runs Ojuny without installing it.
