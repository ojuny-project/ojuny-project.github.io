---
title: Infrastructure overview
description: The server line for automated pentesting and CI, and the workflows that run its checks.
sidebar:
  order: 1
type: explanation
audience: operator
appliesTo: ojuny-pentest-server, ojuny-ci-server, ojuny-ci-workflows
source: ~/repos/ojuny-future-repos/ojuny-pentest-server/DRAFT.md; ~/repos/ojuny-ci-server/README.md; ~/repos/ojuny-ci-workflows/README.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Infrastructure is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny Infrastructure is the server line. It holds two servers and the
repository that describes their CI workflows. The line is kept apart from the
desktop and home-server variants.

## The three repositories

| Repository | Role |
| --- | --- |
| `ojuny-pentest-server` | Automated security testing lab for Ojuny configurations. |
| `ojuny-ci-server` | One headless NixOS host running Hydra and `nix-cache-discovery`. |
| `ojuny-ci-workflows` | Runner tiers, manifest and shared workflows for Ojuny CI. |

## Pentest server

The pentest server builds an isolated lab, boots a target Ojuny system, lets a
local AI agent probe it, and produces verified findings for a person to triage.
It is not a service for testing third-party systems, and it does not disclose
findings automatically.

Read [Pentest server](/infrastructure/docs/pentest-server/) for the lab
components, the target variants and the stated limits.

## CI server

The CI server runs Hydra and `nix-cache-discovery` on one host. You configure it
with `nix-settings-gui` on a workstation, then provision or update the server.
It has no graphical interface and no SSH proxy for the settings GUI.

Its documentation covers deploy methods, settings, jobs, cache, storage,
operations, sizing, security and troubleshooting. Read
[CI server](/infrastructure/docs/ci-server/) for the service list.

## CI workflows

The workflows repository defines three runner tiers and a manifest at
`repos.json`. Fast checks run on every pull request and push, Nix checks build
packages and run unit tests, and heavy checks cover system builds, VM tests, ISO
builds and reproducibility. Heavy checks run on Hydra, nightly and on tags, and
they are advisory.

The coverage matrix pairs each surface with the fast, Nix and heavy tiers. Read
[CI workflows](/infrastructure/docs/ci-workflows/) for the tier table and the
manifest commands.

## Where to start

- [Installation](/infrastructure/docs/installation/) for the CI server paths.
- [Configuration](/infrastructure/docs/configuration/) for the settings
  workflow.
- [Requirements](/infrastructure/docs/requirements/) for sizing and KVM.
- [Security](/infrastructure/docs/security/) for the exposure defaults and the
  lab boundaries.
