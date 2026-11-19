---
title: Install the CI server
description: Provision a fresh host, install on an existing device, or deploy over SSH.
sidebar:
  order: 2
type: how-to
audience: operator
appliesTo: ojuny-ci-server
source: ~/repos/ojuny-ci-server/docs/setup.md; ~/repos/ojuny-ci-server/docs/pre-deployment.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Infrastructure is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The CI server installs from its own flake, driven from a workstation. A fresh
machine uses `nixos-anywhere` through the `provision` app, while an existing
NixOS or Ojuny device uses `install`, which runs `nixos-rebuild switch`. Both
paths read the target disk and the host settings from the flake, and the
optional `--disk` flag only confirms the disk value.

## Prepare the flake

1. Fork the repository and run the setup app with `nix run .#setup`. The app
   clones the fork, writes the admin account and SSH keys, sets the hostname and
   target disk, and prints the provision and install commands.
2. Pin the inputs with `nix flake lock` and commit `flake.lock`.
3. Open the flake in `nix-settings-gui` on the workstation and fill in the
   required settings. The
   [configuration page](/infrastructure/docs/configuration/) lists them.
4. Evaluate with `nix run .#check` and `nix flake check`, then build with
   `nix build .#nixosConfigurations.ci.config.system.build.toplevel`. A failure
   here is cheaper to fix than a failure during provisioning.

## Provision a fresh server

The disk comes from `ci.disk.device` in the flake. The optional `--disk` flag
confirms that value, and a mismatch aborts the run.

```console
$ nix run .#provision -- --target root@server --dry-run
$ nix run .#provision -- --target root@server
```

The script prints the target and disk, asks for the word `PROVISION`, and then
runs `nixos-anywhere`. The target disk is destroyed. Provisioning needs SSH
access to the target and the real disk name, which the
[requirements page](/infrastructure/docs/requirements/) covers.

## Install on an existing device

Run this from the device or from the workstation:

```console
$ nix run .#install -- --target root@server
```

The script asks for the word `INSTALL` and then runs
`nixos-rebuild switch --flake .#ci` against the existing machine. The install
path uses the `ci` configuration from the same flake.

## Deploy and prepare over SSH

Two more apps follow the standard Ojuny deploy surfaces, so the same commands
work on the other Ojuny templates:

```console
$ nix run .#remote-setup -- --target root@server
$ nix run .#remote-install -- --target root@server --disk /dev/vda
$ nix run .#prepare-remote-repository -- --disk /dev/vda
```

`remote-setup` updates a machine that already runs NixOS or Ojuny through
deploy-rs. `remote-install` prepares a disko repository with
`prepare-remote-repository` first, then installs a fresh machine.

## Proxmox image

```console
$ nix run .#proxmox-image -- --output result
```

Import the image into Proxmox and boot it. The image uses the same disk layout
and the same settings as the other paths.

## First boot

SSH in with the configured key, then check the services:

```console
$ systemctl status hydra hydra-queue-runner nix-cache-discovery ojuny-ci-jobsets
$ curl http://127.0.0.1:3000
$ curl http://127.0.0.1:5055/nix-cache-info
```

Open `http://<host>:3000` from the LAN and confirm that the `ojuny` project and
its jobset exist. If the jobset is missing, start `ojuny-ci-jobsets` and read
its journal, as the
[troubleshooting page](/infrastructure/docs/troubleshooting/) describes.

## Next

- [Configuration](/infrastructure/docs/configuration/)
- [Requirements](/infrastructure/docs/requirements/)
- [Troubleshooting](/infrastructure/docs/troubleshooting/)
