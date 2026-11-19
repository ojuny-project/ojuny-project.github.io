---
title: CI server requirements
description: Workstation tools, server sizing, KVM and network assumptions for the CI host.
sidebar:
  order: 4
type: reference
audience: operator
appliesTo: ojuny-ci-server
source: ~/repos/ojuny-ci-server/docs/sizing.md; ~/repos/ojuny-ci-server/README.md; ~/repos/ojuny-ci-server/docs/setup.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Infrastructure is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The CI server is one NixOS host on a trusted LAN. The sizing figures below come
from the sizing page, and they assume the fast and Nix checks as the baseline
workload.

## Workstation

- Nix with `nix-command` and `flakes` enabled.
- `nix-settings-gui` for editing the flake.
- SSH access to the target.
- The target disk name for a fresh install.

## Server minimum

| Resource | Minimum |
| --- | --- |
| CPU | 4 cores |
| Memory | 16 GiB |
| Storage | 256 GiB local SSD |
| Network | Wired LAN |

This is enough for the fast and Nix checks and a small VM test set. The server
also needs KVM for VM tests, and enough disk for the ISO jobs when those jobs are
enabled.

## Recommended

- 8 or more CPU cores.
- 32 GiB RAM or more.
- 1 TiB NVMe local storage.
- Wired LAN with a local cache peer.

The ISO jobs are the disk-heavy part. Offline ISOs are several gigabytes each,
and the build also needs store space for the closure. Keep at least 20 percent
free on the local disk, because Hydra, PostgreSQL and the Nix store all grow; set
`ci.hydra.maxOutputSize` and `nix.gc` to match the disk.

## Memory by job type

VM tests need KVM and enough RAM for the guest or guests. Acceptance runs a
graphical VM and is the heaviest single job. The
[CI workflows page](/infrastructure/docs/ci-workflows/) lists the acceptance
flows and their VM requirements.

## Network

Hydra and the cache are LAN-only by default. A remote builder needs SSH from the
server, and a public Hydra needs a reverse proxy and TLS, which are out of scope.
The cache port is never opened to internet addresses, and the
[security page](/infrastructure/docs/security/) covers the trust model.

## Storage

The server works on a single disk, and artifacts live under
`ci.storage.artifactsPath`, default `/var/lib/ojuny-ci/artifacts`. The Nix store
and PostgreSQL stay on local block storage. The storage module rejects network
filesystems on `/nix`, `/var/lib/postgresql` and `/var/lib/hydra`.

## Pentest server

The pentest server runs on a dedicated NixOS host with KVM, enough RAM for its
virtual machines, and an optional GPU for a larger local model. The model
runtime, model, tools, seeds and target sources are pinned. See
[Pentest server](/infrastructure/docs/pentest-server/) for the lab components.

## Next

- [Installation](/infrastructure/docs/installation/)
- [Configuration](/infrastructure/docs/configuration/)
- [Troubleshooting](/infrastructure/docs/troubleshooting/)
