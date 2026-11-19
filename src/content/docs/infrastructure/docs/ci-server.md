---
title: CI server
description: One headless NixOS host running Hydra, a cache and a generated jobset.
sidebar:
  order: 7
type: explanation
audience: operator
appliesTo: ojuny-ci-server
source: ~/repos/ojuny-ci-server/README.md; ~/repos/ojuny-ci-server/docs/jobs.md; ~/repos/ojuny-ci-server/docs/cache.md; ~/repos/ojuny-ci-server/docs/operations.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Infrastructure is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The CI server is a self-hostable, headless NixOS host. It runs Hydra and
`nix-cache-discovery` on one machine, and you configure it with
`nix-settings-gui` on a workstation before provisioning or updating it.

The server has no graphical interface. A web GUI or SSH proxy for the settings
GUI is out of scope, because either one turns a local edit into a remote
privileged interface.

## What it provides

- Hydra with a declarative jobset generated from the flake settings.
- `nix-cache-discovery` for the server store and LAN peers.
- PostgreSQL for Hydra.
- Optional extra filesystems for artifacts, release staging and archival.
- Optional remote builders.
- `nixos-anywhere`, existing-device and Proxmox install paths.

## Services

Four units carry the work. `hydra` serves the web interface on port 3000,
`hydra-queue-runner` runs the builds, `nix-cache-discovery` serves the cache on
port 5055, and `ojuny-ci-jobsets` creates the administrator, ensures the `ojuny`
project and applies the declarative jobset. The jobsets service runs after Hydra
and PostgreSQL, and its timer repeats the work daily.

## Jobs

The jobset comes from `ci.jobs.*` and the repository list. The groups are checks,
VM tests, ISOs, persistent image, reproducibility, acceptance and install
report. Checks, VM tests and the install report are on by default; the other four
are off.

The standard repository list lives in `lib/jobsets.nix` and includes the Ojuny
product repositories and `ojuny-ci-server`. Each jobset points at a flake and
uses its `hydraJobs` output, and the jobset name is `<group>-<repository>`.
[Configuration](/infrastructure/docs/configuration/) covers the settings that
change the list.

## Cache

The cache listens on `ci.cache.port`, default 5055, at
`http://<ci.hostName>:5055`. On a LAN with discovery, clients usually do not need
the URL. Discovery uses the connected subnet and the client allowlist by
default, and `ci.cache.discovery.ranges` applies when automatic discovery is off.

The cache is LAN-only by default and there is no project signing key. The module
trusts local peers by network membership, and it never opens the port to internet
addresses. After the local store and live LAN peers, `nix-cache-discovery` can
proxy upstream caches, and the module defaults to `cache.nixos.org`.

## Storage

The server works on a single disk, with artifacts under
`ci.storage.artifactsPath`, default `/var/lib/ojuny-ci/artifacts`. The Nix store
and PostgreSQL stay on local block storage.

Extra mounts are declared in `ci.storage.mounts`, with `path`, `device`,
`fsType`, `options` and `enable`. GlusterFS, NFS, SMB and a second local disk all
fit the same table, and network filesystems need `_netdev`. The module rejects
network filesystems on `/nix`, `/var/lib/postgresql` and `/var/lib/hydra`.

## Operations

The server is a rolling flake, and the lock is the snapshot. Upgrade with
`nix flake update` and `nix run .#install -- --target root@server`.

Rollback uses a NixOS generation at the bootloader, or
`sudo nixos-rebuild switch --rollback`. Back up the flake repository and its
lock, the Hydra PostgreSQL database and the artifacts path if it is not already
on redundant storage. Do not back up the Nix store, which is reproducible from
the flake.

`nix.gc` runs weekly and deletes generations older than 30 days. Adjust it in
`modules/system.nix` if the ISO jobs need a longer window. There is no
auto-update.

## Health checks

```console
$ systemctl status hydra
$ systemctl status nix-cache-discovery
$ systemctl status ojuny-ci-jobsets
$ curl http://<host>:3000
$ curl http://<host>:5055/nix-cache-info
```

Logs come from `journalctl -u hydra -u hydra-queue-runner -u ojuny-ci-jobsets`
and `journalctl -u nix-cache-discovery`.

## Related pages

- [Installation](/infrastructure/docs/installation/)
- [Configuration](/infrastructure/docs/configuration/)
- [Requirements](/infrastructure/docs/requirements/)
- [Troubleshooting](/infrastructure/docs/troubleshooting/)
- [Security](/infrastructure/docs/security/)
- [CI workflows](/infrastructure/docs/ci-workflows/)
