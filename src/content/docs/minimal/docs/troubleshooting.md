---
title: Minimal troubleshooting
description: Read a failed template check, a stopped installer, a refused disk, and a failed install.
sidebar:
  order: 5
type: how-to
audience: operator
appliesTo: ojuny-minimal-installer
source: ~/repos/ojuny-future-repos/ojuny-minimal-installer/docs/testing.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Minimal is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Most failures here come from the template check, the preflight, or the disk planner, and each one reports its reason on the screen that owns the value. The installer writes a timestamped line per phase to `/tmp/ojuny-install.log`, which becomes `~/ojuny-install.log` in the installed system.

## The template check fails

Run `nix run .#check` before installing, because it fails when the required module names, the required scripts, or the `nixosConfigurations` host are missing. Add `-- --system` to catch evaluation errors after the hardware module exists, and `-- --static` to check only the file layout while skipping Nix evaluation.

The check app is part of the template, so it reads the fork it runs in rather than a fixed path. A fork that moved a generated module away from its documented path fails the check even when the system would build.

## The installer stops on the Welcome screen

The Welcome screen stops the installer when a required command is missing or the machine has less than 3.5 GiB of RAM. It also reports the network state, and a machine without a network is asked to retry instead of being looped. A wired connection is the reliable fix.

## The installer refuses the disk

The target check refuses a disk that is missing, already mounted, not a block device, or smaller than 30 GiB, and in free mode the Disk screen shows the largest region that fits the minimum. An existing NTFS partition must be shrunk in Windows first, because the installer never resizes it.

## The username or hostname was ignored

A prepared install keeps the repository's own user, hostname, and configuration modules, and the installer regenerates only the hardware and bootloader modules, writes the host imports, and installs. The account values on the System screen apply to bundled installs, so a prepared fork must carry the account it wants.

## Reading a failed install

The Failure screen shows the error and the log path, offers a root shell, and leaves the target mounted for inspection. The report is also available as `~/install-report.json` inside the installed system, and the Progress screen cannot cancel an install that is already running.

## Serial console

Boot the ISO with `console=ttyS0` on a headless machine, because the live image disables automatic getties and hands the console to the installer. The Serial console option adds `console=tty0 console=ttyS0` to the installed system, which starts a getty on ttyS0.

## Reproduce a problem

Run `nix run .#install -- --check` to print the model, firmware, memory, CPU count, network state, eligible disks, and every skipped disk with its reason, all without installing. The script `scripts/qemu-test.sh` installs into a 40 GiB qcow2 disk and waits for a login prompt, and it accepts `ISO`, `INSTALL_TIMEOUT`, and `BOOT_TIMEOUT` overrides.

The QEMU procedure installs into a 40 GiB qcow2 disk with the fixture settings and waits for a login prompt, which gives a reproducible install without touching real hardware. A hardware-specific failure can be compared against that run, and the install log and report carry the detail a report needs.

## Next

For the next step, read [requirements](/minimal/docs/requirements/), then the [installer reference](/minimal/docs/installer/), or finish with [limits](/minimal/docs/limits/).
