---
title: Infrastructure tools
description: The Ojuny-specific tools included with Ojuny Infrastructure.
sidebar:
  order: 10
type: reference
audience: operator
appliesTo: ojuny-ci-server
source: ~/repos/ojuny-ci-server/README.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Infrastructure is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Infrastructure includes two tool sets: the pentest lab and the CI server. Both are headless, and neither uses the desktop settings tools on the server itself.

## Pentest tools

### Pentest controller and verifier

Starts the lab, validates tool requests, records the action log, verifies reports, and destroys the VMs. It is not reachable from the agent.

- [Pentest server](/infrastructure/docs/pentest-server/)
- [Repository](https://github.com/ojuny-project/ojuny-pentest-server)

### Mediated tool runner

Runs one requested package in a network namespace that can reach only the target. Arguments go directly to `execve`, never through a shell.

- [Pentest server](/infrastructure/docs/pentest-server/)

### AI VM agent

Runs the local model, the agent loop, the web client, and the write-only report channel. It has no internet, no Nix, and no host mounts.

- [Pentest server](/infrastructure/docs/pentest-server/)

### Report view

Presents verified findings for human triage. It never discloses findings automatically.

- [Pentest server](/infrastructure/docs/pentest-server/)
- [Security](/infrastructure/docs/security/)

## CI tools

### Ojuny CI runner

Runs the fast, Nix, and heavy tiers from the repository manifest, with flake, script, and meta checks.

- [CI workflows](/infrastructure/docs/ci-workflows/)
- [Repository](https://github.com/ojuny-project/ojuny-ci-workflows)

### `nix-cache-discovery`

Publishes and discovers the Hydra cache for the trusted LAN.

- [Site guide](/configuration/updates/#lan-cache)
- [Options reference](https://github.com/ojuny-project/nix-cache-discovery/blob/main/OPTIONS.md)

### `nix-settings-gui`

Edits the CI server flake on a workstation. The server has no graphical interface.

- [Site guide](/configuration/settings-gui/)
- [Options reference](https://github.com/ojuny-project/nix-settings-gui/blob/main/OPTIONS.md)

## Install tools

### CI install media

`nixos-anywhere`, existing-device, and Proxmox install paths generated from the server flake.

- [CI server](/infrastructure/docs/ci-server/)
- [Installation](/infrastructure/docs/installation/)

The CI host has no web settings GUI and no SSH proxy. Nix Web GUI is not part of the CI server, and the pentest lab uses its own controller instead.
