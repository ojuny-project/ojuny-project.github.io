---
title: Minimal installation
description: Install the Minimal template with the setup app or from the terminal installer ISO.
sidebar:
  order: 2
type: how-to
audience: user
appliesTo: ojuny-minimal-template
source: ~/repos/ojuny-future-repos/ojuny-minimal-template/README.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Minimal is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The template installs in one of two ways: run the setup app from a fork on an existing NixOS system, or boot the terminal installer ISO and let it write the flake to a disk. Both paths end at a system that boots to a console login, because the starter ships no desktop session.

## Set up a fork

Run `nix run .#setup` from the repository root, and the app clones your fork, generates the hardware, user, and host modules, and offers a rebuild, so the machine data never has to be written by hand.

The setup app writes three generated modules under `modules/`, named `00-hardware.nix`, `00-host.nix`, and `00-user.nix`, and `minimal-system.nix` keeps the base configuration. Read [Configuration](/minimal/docs/configuration/) for the generator scripts behind them.

## Check a fork first

Run `nix run .#check` to verify the required module names, the required scripts, and at least one `nixosConfigurations` host before you install anything. Add `-- --system` to evaluate the system toplevel after the hardware module has been generated, or `-- --static` to skip Nix evaluation entirely.

## Install from the ISO

In the installer repository, `nix build .#ojuny-minimal-iso` produces the live ISO and leaves the image under `result/iso/`. The installer expects an 8 GB USB key, 3.5 GB of RAM on the target machine, a 30 GB target disk, and a wired network.

Boot the ISO and answer the screens, then confirm the summary. With an empty repository URL the installer writes the bundled `ojuny-minimal-template`, and any repository URL installs that fork instead, which is how the same ISO serves every Ojuny template.

On a headless machine, boot with `console=ttyS0`, because the installer runs on the console and the live image disables automatic getties. The [installer reference](/minimal/docs/installer/) lists every screen and key.

## After installation

The configuration is written to `/home/<user>/repos/nix-flake`, committed to git, and given an optional origin. The files `~/ojuny-install.log` and `~/install-report.json` are copied into the installed system, and the Finished screen shows the configuration path and the log location before reboot or power off.

## Next

For the next step, read [requirements](/minimal/docs/requirements/), then [configuration](/minimal/docs/configuration/), or work through [troubleshooting](/minimal/docs/troubleshooting/) and [limits](/minimal/docs/limits/).
