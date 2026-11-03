---
title: Hardware coverage
description: Which machines have a hardware profile, and what each state means.
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny selects a `nixos-hardware` profile from a checked-in table. The table is
generated from `hardwareProfiles` in
`modules/07-system/10-hardware-profile.nix` in the template.

This is a test set, not a certification program. Coverage means that a profile
row exists, not that the machine was tested.

## States

| State | Means |
| --- | --- |
| tested | The profile was built and booted on that model |
| untested | The profile exists in `nixos-hardware` and is offered in the dropdown, but this repository has not verified it |
| unsupported | A profile exists, but the template does not select it automatically or offer it in the dropdown |

## Summary

| State | Rows |
| --- | ---: |
| tested | 0 |
| untested | 114 |
| unsupported | 4 |
| total | 118 |

No row is marked tested in this pass because no build was run. The maintainer's
test hardware is the Microsoft Surface Go and the Lenovo ThinkPad X1 Carbon.
Both are untested here.

The four unsupported rows are:

| Vendor | Product pattern | Profile |
| --- | --- | --- |
| dell | `.*xps 13 9343.*` | `dell-xps-13-9343` |
| dell | `.*xps 15 9550.*` | `dell-xps-15-9550` |
| samsung | `.*np900x3c.*` | `samsung-np900x3c` |
| toshiba | `.*satellite.*` | `toshiba-swanky` |

## How matching works

The profile table matches on the lowercased `smbios.system.product` string. The
Hardware profile page reads `facter.json` and selects the matching row. A manual
choice wins over automatic selection. An unmatched machine gets no profile
import.

The full table, with every vendor, pattern, and profile, is in the template
repository:

[Template hardware coverage](https://github.com/ojuny-project/ojuny-template/blob/main/docs/hardware-coverage.md)

## Related

- [Project status](/status/)
- [Template layout](/configuration/template-layout/)
- [First boot](/getting-started/first-boot/)
