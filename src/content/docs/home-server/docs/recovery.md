---
title: Recovery
description: Panel recovery, factory reset and restore.
sidebar:
  order: 8
type: how-to
audience: operator
appliesTo: ojuny-home-server-installer
source: ~/repos/ojuny-future-repos/ojuny-home-server-installer/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Home Server is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny Home Server has four recovery behaviors: a panel recovery mode, a factory reset, a disk replacement flow and a restore from the backup target.

## Panel recovery mode

Recovery mode starts the panel and SSH only. The panel starts even when the rest of the service stack does not. That is the whole surface: the panel for service control and SSH for direct access, with no other service started. The checks for the panel and services sit in [troubleshooting](/home-server/docs/troubleshooting/).

## Factory reset

A factory reset reinstalls the system and leaves data disks untouched by default, and the first-run wizard rebuilds the pool and the first share, while [storage](/home-server/docs/storage/) states the confirmation rule for every destructive action.

## Disk replacement

A disk replacement flow keeps the surviving data disks intact. It sits under the same safety rule as the reset path, and disk hot-plug is not supported.

## Restore

A restore from the configured backup target recovers a share, and the backup scope and retention belong to the backup service that [services](/home-server/docs/services/) lists.

## What recovery cannot do

Data recovery from a failed disk is not part of the product. The configured backup target is the product's path for lost data, so recovery depends on that target staying reachable, and everything else here assumes the disks themselves are readable.
