---
title: Post-install tasks
description: Log in, update, and find the procedures that moved to the manual.
sidebar:
  order: 5
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Both install paths leave you with a git repository. That repository is the
system. This page covers first login and updates. The longer procedures are in
the [Ojuny manual](/ojuny-manual/) and the repository documents.

## First login

Log in with the account created by the installer or the setup script. Connect to
the network, then open the settings menu from the application menu. Changes made
there are written to the flake and applied with a rebuild.

Commit the initial state once:

```sh
cd ~/repos/nix-flake
git status
git add -A
git commit -m "initial ojuny configuration"
```

Commit after every successful rebuild. For the desktop tour, see
[first boot](/getting-started/first-boot/).

## Update inputs

Updates are up to you. Ojuny has no built-in auto-update.

```sh
ojuny flake update nixpkgs
ojuny flake validate
ojuny flake build
ojuny flake activate-boot
```

`activate-boot` sets the new generation for the next boot. Use `activate-now`
when you want the change immediately. Holding a version means not running a
flake update.

`simple-nix-update-gui` keeps an installed system in sync with the remote flake
repository. It does not update package versions; use
`ojuny flake update <input>` for one input or `nix flake update` for all inputs.

## Secure Boot

Secure Boot is an optional UEFI step that replaces systemd-boot with Lanzaboote;
the full flow, including the BitLocker warning, is in the template's
[Secure Boot guide](https://github.com/ojuny-project/ojuny-template/blob/main/docs/06-secure-boot.md).

## Remote deployment

Remote deployment is experimental: enable `ojuny.network.deploy-rs.enable` for
deploy-rs, disko, nixos-anywhere, git, and OpenSSH, then follow the installer's
[remote deployment document](https://github.com/ojuny-project/ojuny-installer/blob/main/docs/remote-deployment.md).

## Disk layout and impermanence

An unattended install writes the disko layout into the generated
`modules/07-system/00-hardware.nix`; keep that file, because redeployment and
`nixos-anywhere` reuse it. Impermanence is the opt-in `patch-impermanence` module
with `ojuny.patch.impermanence.enable`, declared in the template's
[impermanence patch](https://github.com/ojuny-project/ojuny-template/blob/main/modules/patches/patch-impermanence.nix).

## Add patches

Patches are opt-in Nix modules installed by `ojuny-patches` from the
[default registry](https://github.com/ojuny-project/ojuny-patches); the
[patch overview](/patches/overview/) covers installation and enabling.

## Change the account

The account page writes `users.users.<name>.*` and the home-manager home.
`users.mutableUsers` stays `false`, so a password change is a configuration
change and needs a rebuild.

## Rebuild after a hardware change

After a disk change, a new GPU, or a moved installation, run
`nix run .#regenerate-hardware` and review the diff before rebuilding, as
described in the [template layout](/configuration/template-layout/) page.

## Recover from a failed switch

If a new generation does not boot, select the previous generation in the
bootloader; the manual's
[troubleshooting chapter](/ojuny-manual/troubleshooting/) covers the recovery
paths.

## Remove Ojuny

There is no uninstaller: Ojuny is a NixOS configuration, not an application, so
stopping means switching to another NixOS flake or reinstalling the system,
which the manual's [template chapter](/ojuny-manual/install/template/) covers.
