---
title: Fleet tools
description: The Ojuny-specific tools included with Ojuny Fleet.
sidebar:
  order: 10
type: reference
audience: operator
appliesTo: ojuny-fleet-controller
source: ~/repos/ojuny-future-repos/ojuny-fleet-manager/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Fleet is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Fleet includes the controller host, the web manager, the workstation tools, and the install media. The controller uses Ojuny Fleet Manager as its browser interface.

## Fleet tools

### `ojuny-fleet-manager`

The browser interface for users, groups, endpoints, servers, applications, policies, templates, deployments, and logs. It edits the Nix files, shows diffs, and queues deployments.

- [Manager reference](/fleet/docs/manager/)
- [Repository](https://github.com/ojuny-project/ojuny-fleet-manager)

### Fleet controller

The headless host that owns the deployment queue, VPN, cache, DNS, NFS, backup targets, and install media. It serves the manager behind the internal proxy.

- [Controller reference](/fleet/docs/controller/)
- [Repository](https://github.com/ojuny-project/ojuny-fleet-controller)

## Desktop tools

These tools run on the administrator workstation and edit the managed flake.

### `nix-settings-gui`

Renders `@menu` and `@option` comments as an editable settings window. It uses the same write path as the manager.

- [Site guide](/configuration/settings-gui/)
- [Options reference](https://github.com/ojuny-project/nix-settings-gui/blob/main/OPTIONS.md)

### `nix-regedit`

Presents the managed flake as a registry-editor tree and edits selected values in place.

- [Options reference](https://github.com/ojuny-project/nix-regedit/blob/main/OPTIONS.md)

### `nix-shell-gui`

Browses nixpkgs and launches a package with `nix run` or `nix shell` from the workstation.

- [Options reference](https://github.com/ojuny-project/nix-shell-gui/blob/main/OPTIONS.md)

### `simple-nix-update-gui`

Checks whether the managed flake matches its remote and starts a rebuild from the result.

- [Site guide](/configuration/updates/)
- [Options reference](https://github.com/ojuny-project/simple-nix-update-gui/blob/main/OPTIONS.md)

## Install tools

### Fleet install media

Controller and endpoint images, including pre-addressed live media for enrollment and the `nixos-anywhere` path for a fresh machine.

- [Installation](/fleet/docs/installation/)
- [Endpoints](/fleet/docs/endpoints/)

Fleet does not use the standalone Nix Web GUI. Ojuny Fleet Manager is the controller UI and the fleet-specific descendant of that surface.
