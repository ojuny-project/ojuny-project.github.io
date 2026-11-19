---
title: CI workflows
description: Runner tiers, the repo manifest, the build matrix and the acceptance flows.
sidebar:
  order: 8
type: reference
audience: contributor
appliesTo: ojuny-ci-workflows
source: ~/repos/ojuny-ci-workflows/README.md; ~/repos/ojuny-ci-workflows/docs/build-matrix.md; ~/repos/ojuny-ci-workflows/docs/acceptance-playbook.md; ~/repos/ojuny-ci-workflows/docs/coverage-matrix.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Infrastructure is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The workflows repository holds the runner and the shared workflows for Ojuny CI.
It also records which checks exist and where they run.

## Tiers

- **Fast**: formatting, pure evaluation, static checks and generated-file drift.
  Runs on every pull request and push.
- **Nix**: package builds and unit tests. Runs on pull requests and push for the
  touched repositories.
- **Heavy**: system builds, VM tests, ISO builds and reproducibility. Runs on
  Hydra, nightly and on tags. Advisory, not a required status.

## Manifest

`repos.json` lists every repository, its kind, its systems and its checks per
tier. `schemas/repos.schema.json` describes the shape. A check is a flake
attribute, a `script:` command or a `meta:` check, such as
`checks.x86_64-linux.hardware-profile`, `hydraJobs`, `meta:check-inventory` or
`script:npm run check`.

Every repository exposes `apps.ci` and runs its own fast and Nix checks. The
aggregate runner uses the same flake attributes.

## Running checks

```console
$ nix run .#ci -- list
$ nix run .#ci -- run --tier fast --repo ojuny-template
$ nix run .#ci -- run --tier nix --changed
$ nix run .#ci -- run --tier all --json-file result.json --junit junit.xml
```

Exit codes:

| Code | Meaning |
| --- | --- |
| `0` | All selected checks passed |
| `1` | At least one check failed |
| `2` | Usage or manifest error |
| `3` | Missing dependency |
| `4` | Every selected check was skipped |

## Workflows and branch protection

`.github/workflows/reusable-ci.yml` is the reusable caller, and
`.github/workflows/ci.yml` runs the runner on this repository. Require the fast
and Nix jobs in every product repository, and leave Hydra advisory. Fork pull
requests use a read-only token, no secrets and no self-hosted runners.

## Build matrix

`x86_64-linux` is the primary release platform, and the one ARM target for
generic `aarch64-linux`. Specialized targets such as T2, Apple Silicon,
Snapdragon, Raspberry Pi and NVIDIA are outside this matrix.

| Surface | x86_64-linux | aarch64-linux | Tier |
| --- | --- | --- | --- |
| Fast checks | all repositories | evaluation only | Fast |
| Package builds | all repositories | supported packages | Nix |
| System builds | fixture host | fixture host when supported | Heavy |
| ISO builds | all variants | generic ISO when supported | Heavy |
| VM tests | yes | when a runner is available | Heavy |
| Acceptance | yes | no | Heavy |
| Install report | yes | no | Nix |
| Install time | yes | no | Manual |

The manifest records `x86_64-linux` for every repository, including
`ojuny-welcome`, and both systems for `ojuny-ci-workflows`. The generic aarch64
target needs a runner and a measured list of supported attributes.

## Acceptance flows

The acceptance flows run as heavy-tier jobs when KVM and ISO artifacts are
available.

| Flow | Job | Install path | Manual |
| --- | --- | --- | --- |
| Unattended install | `acceptance.install` | Offline unattended ISO | no |
| Template setup install | `acceptance.setup` | Template setup on a minimal NixOS VM | no |
| Session | `acceptance.session` | Installed target | no |
| Rollback | `acceptance.rollback` | Installed target with two generations | no |
| Chained install to session | `acceptance.chained` | Installed target | no |
| Attended Calamares | manual | ISO | yes |

KVM is required, and without it the job is skipped with exit code 4. The session
uses a graphical VM with `virtualisation.graphics = true`, and the Wayland
session uses `virtio-vga-gl`. Resolution and font size are pinned for OCR.

The session assertions cover the display manager, a fixture user login, the bar,
the launcher with a known application, the Ojuny menu, the settings GUI with a
known page, one notification, failed systemd units below the agreed threshold,
and a clean shutdown. Each OCR assertion repeats five times across separate
session runs, and the failure rate decides whether it is a flake, an
inconsistent issue or a deterministic problem.

Artifacts are the serial log, screenshots, OCR text, journal and failed unit
list, generation list, install report and first-boot log. Attended Calamares,
real hardware sessions, vendor hardware reports, the physical install-time track
and unreleased-marker review stay manual.

## Coverage matrix

The coverage matrix pairs each surface with the fast, Nix and heavy tiers and
records the checks that belong to each tier. A check that needs KVM, ISO
artifacts, a fixture host or physical hardware is listed with that requirement.

## Related pages

- [CI server](/infrastructure/docs/ci-server/)
- [Infrastructure overview](/infrastructure/docs/overview/)
