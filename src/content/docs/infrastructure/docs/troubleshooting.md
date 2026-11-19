---
title: CI server troubleshooting
description: Diagnose Hydra, jobset, cache discovery, mount and provisioning failures.
sidebar:
  order: 5
type: how-to
audience: operator
appliesTo: ojuny-ci-server
source: ~/repos/ojuny-ci-server/docs/troubleshooting.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Infrastructure is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The failures below come from the server's troubleshooting page. Each one starts
with the service or file that reports the problem, so start with the journal when
the symptom is not listed here.

## Hydra does not start

```console
$ systemctl status hydra
$ journalctl -u hydra -u postgresql
```

Check that PostgreSQL is running and that the Hydra database exists. A missing
database or a stopped PostgreSQL unit keeps Hydra from serving on port 3000.

## The jobset does not appear

```console
$ systemctl status ojuny-ci-jobsets
$ journalctl -u ojuny-ci-jobsets
```

The service creates the admin user, the `ojuny` project and the declarative
jobset. A failing `hydra-create-user` is a warning; a failing `psql` or
`hydra-prepare-declarative-jobset` is an error. Read the journal line that names
the command before changing the flake.

## The jobset is stale

The timer runs daily. Trigger the service manually:

```console
$ sudo systemctl start ojuny-ci-jobsets
```

The service also runs after Hydra and PostgreSQL at boot, so a settings change is
picked up without a reboot once the timer fires.

## The cache is not discovered

- Check that `ci.cache.port` is the same on every host.
- Check that the hosts are on the same subnet or in `ci.cache.discovery.ranges`.
- Check the firewall on `ci.network.interface`.
- Run `curl http://<host>:5055/nix-cache-info` from a peer.

Discovery uses the connected subnet when `ci.cache.discovery.auto` is on, and
the configured ranges when it is off. The port is opened to private, link-local
and unique-local ranges only.

## A mount fails

- Check `device`, `fsType` and `options`.
- Network filesystems need `_netdev`.
- The module rejects network filesystems on `/nix` and PostgreSQL.

The storage table takes `path`, `device`, `fsType`, `options` and `enable`, and
the options string is space-separated.

## Settings do not appear in the GUI

The `@option` comment must sit above an assignment in a plain attribute set or a
`lib.mkIf` set. It cannot be inside `lib.mkMerge`, a list, `map` or `forEach`.
The `options-coverage` check catches this shape, so run the check before
deploying a page that lost controls.

## Provision fails

- Check SSH access to the target.
- Check the disk name against `ci.disk.device`.
- Use `--dry-run` to print the command.
- Check the `nixos-anywhere` output for the failing phase.

A disk mismatch aborts the run before anything is written, so read the printed
disk first. The [installation page](/infrastructure/docs/installation/) lists the
full sequence.

## Next

- [Requirements](/infrastructure/docs/requirements/)
- [CI server](/infrastructure/docs/ci-server/)
