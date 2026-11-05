---
title: Project status
description: Release state, test coverage, support policy, and known limitations.
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny is pre-release. There is no release date and no ISO release yet. The
software is usable from the repositories, but parts are incomplete and most
paths have not been run on hardware.

This page applies to the repository state on 2026-11-03. It is the one place
that states release status for the project.

## Support policy

- There is no release schedule. The project does not commit to a date.
- There is no warranty.
- Support is limited to opening an issue on
  [GitHub](https://github.com/ojuny-project). There is no support team and no
  paid support.
- Modified systems are not covered. A bug report about a modified system may
  not be reproducible.

## What works today

These words have fixed meanings:

| Word | Means |
| --- | --- |
| tested | A named person ran it on a named system and date, and the result is recorded |
| untested | The code exists and the page describes it, but nobody ran this path |
| unsupported | It may work; the project does not answer questions about it |
| pending | Work is scheduled, not complete |
| not measured | A number exists as an estimate or not at all |

| Component | State | Note |
| --- | --- | --- |
| Desktop session, MangoWM and Dux Modular Shell | untested | The modules exist; no end-to-end hardware run is recorded for this pass |
| Attended ISO | untested | Test runs are written, none completed as of 2026-11-03 |
| Unattended ISO, online and offline | untested | Not run on hardware |
| Offline ISO | untested | The offline hardware matrix is not complete |
| Persistent image | untested | Not hardware-tested |
| Template setup | untested | No recorded full run for this pass |
| CLI | pending | Incomplete; commands may be missing or change |
| Patch registry | untested | The catalogue lists 43 patches; no patch test matrix is recorded |
| Hardware profiles | untested | 114 untested patterns, 4 unsupported, no tested row |

The attended ISO boots with 4 GB of RAM and 2 threads. Install time on the
minimum configuration is not measured. See [Downloads](/downloads/) for the
recorded timings.

## Known limitations

- The CLI is incomplete. Do not assume a documented command exists.
- There is no ISO release and no release schedule.
- There is no binary cache. Some components build from source, which can take
  up to an hour on a low-end machine.
- The desktop is one shape: MangoWM plus Dux Modular Shell. Alternate desktops are
  patches with their own support burden.
- Patches are third-party Nix code with build privileges and no sandbox.
- Runtime changes made through the shell are not persistent. Save the change to
  the flake.
- Hardware profile coverage is a checked-in list, not a certification program.
  See [Hardware coverage](/hardware/).

## Where to report a problem

The only support channel is a GitHub issue on the repository that owns the
component. For the desktop and this site, that is
[github.com/ojuny-project](https://github.com/ojuny-project). An install report
is easier to reproduce with the output of `ojuny doctor`.

## Related

- [Downloads](/downloads/)
- [Hardware coverage](/hardware/)
- [Troubleshooting](/troubleshooting/)
- [What is Ojuny?](/getting-started/what-is-ojuny/)
