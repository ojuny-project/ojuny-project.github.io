---
title: ojuny CLI
description: Quickstart for the ojuny command and where to read the reference.
sidebar:
  order: 1
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

:::caution
Ojuny is pre-release. The CLI is incomplete: parts of its designed surface are
not implemented, and commands may be missing or change. Do not treat a command
as stable because it appears on this page.
:::

`ojuny` wraps the tools that already own a feature. It does not store
configuration and does not edit Nix files. Most commands change the running
session only; a rebuild or a reload may discard the change.

## Quickstart

```sh
ojuny doctor
ojuny network status
ojuny workspace view 2
ojuny layout set dwindle
ojuny settings open displays
ojuny flake validate
```

`ojuny doctor` is read-only. It prints the resolved flake and host, the Dux
Shell config directory, the backend commands it expects, and the patch state.

The usage line is:

```text
ojuny [options] <category> <command> [arguments]
```

`--dry-run` is accepted for commands that support it and prints the actions
instead of changing state. `--flake <path>` and `--host <name>` select the flake
and host. `ojuny help <category>` lists the commands in a category.

## Flake commands

```sh
ojuny flake update <input>
ojuny flake validate
ojuny flake build
ojuny flake activate-boot
ojuny flake activate-now
```

Use `activate-boot` for large updates. It makes the new generation the default
on the next boot and leaves the running system untouched.

## Read more

- [CLI usage in the manual](/ojuny-manual/usage/cli/)
- `man ojuny`
- [ojuny-cli repository](https://github.com/ojuny-project/ojuny-cli)
- [Project status](/status/)
- [ojuny-patches CLI](/cli/ojuny-patches/)
