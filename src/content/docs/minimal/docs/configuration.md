---
title: Minimal configuration
description: The generated modules, the generator apps, and how a fork changes the base system.
sidebar:
  order: 3
type: how-to
audience: user
appliesTo: ojuny-minimal-template
source: ~/repos/ojuny-future-repos/ojuny-minimal-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Minimal is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Minimal has no settings GUI, so configuration means editing the flake and running the generator scripts. The base system settings live in `modules/minimal-system.nix`, which holds the host imports, the base configuration, and the networking setup for the starter.

## Generated files

Three modules are generated rather than hand-written. `modules/00-hardware.nix` carries the hardware and bootloader settings, `modules/00-host.nix` registers the host, and `modules/00-user.nix` declares the user account. The setup app writes them, and the installer writes the same generated modules when it installs the bundled template. Hand-written pages are never edited by the installer.

## Generators

For day to day work, the flake exposes `apps.setup` and three generator apps, and the repository keeps the matching shell scripts under `scripts/`. The generator apps are `apps.generate-hw`, `apps.generate-user`, and `apps.create-new-system`, and the scripts are `generate-hw.sh`, `generate-user.sh`, `create-new-system.sh`, and `setup.sh`.

Each script owns one job: the hardware script writes the hardware module and `facter.json`, the user script writes the user module with a hashed password, and the host script sets the hostname and registers the host. The setup script runs the whole path, and it offers a rebuild instead of starting one.

## Changing base settings

Edit `modules/minimal-system.nix` for the hostname, locale, keymap, NetworkManager behaviour, and flake settings that the base system owns. Keep machine-specific values out of tracked files, because the template contract forbids personal names, hostnames, disk UUIDs, keys, and password hashes in them.

## Adding features

Additions are ordinary NixOS modules under `modules/`, imported the way the starter imports its own files, and the starter has no settings GUI to annotate for. The contract binds the generated paths and the flake apps, not the shape of the pages a fork adds. A fork can add a desktop, a settings GUI, a patch switch, or a Home Manager input.

The install and boot path must not depend on those additions, which is what makes the starter a valid template for any consuming installer, and a feature that cannot be removed without breaking the boot is outside the contract.

## Validation

Run `nix run .#check` after a change, and add `-- --system` when the change touches the evaluated system. The command `nix flake check` runs the static check that CI uses. The template leaves a VM boot test and an installer-driven install to the consuming product.

## Next

For the next step, read the [template shape](/minimal/docs/template-shape/), then [troubleshooting](/minimal/docs/troubleshooting/), or finish with [limits](/minimal/docs/limits/).
