---
title: Minimal template shape
description: The repository tree, the module contract, and the minimum a template must satisfy.
sidebar:
  order: 6
type: reference
audience: contributor
appliesTo: ojuny-minimal-template
source: ~/repos/ojuny-future-repos/ojuny-minimal-template/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Minimal is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The template definition is behavioral rather than a versioned schema: the installer can install it correctly, the setup script can install it correctly, and the installed system boots and runs. Everything else is optional, so a desktop, an application set, a settings GUI, and a patch switch can all be added after forking without touching the contract.

## Repository tree

```text
ojuny-minimal-template/
  flake.nix                  dendritic entrypoint
  flake.lock
  modules/
    minimal-system.nix       host imports, configuration and networking
    00-host.nix              default host and generated host
    00-hardware.nix          generated hardware and bootloader
    00-user.nix              generated user module
  scripts/                   setup, generators and the template check
```

The tree stays as small as possible, because a file that the install and boot path does not need does not belong in the starter. The generated files are flat under `modules/`, since the module-name contract makes the numbered directory shape of the full template unnecessary.

## Minimum requirements

A template is valid when it meets eight conditions:

1. An `x86_64-linux` flake that exposes at least one buildable `nixosConfigurations.<host>` output.
2. A build that needs no hand-edited machine data in tracked files.
3. Generated hardware, user, and host modules at the documented paths.
4. Flake apps for setup and for the generators.
5. No personal names, hostnames, disk UUIDs, keys, or password hashes.
6. An install path that works with `nixos-install --flake` against the generated modules.
7. The ability to accept an injected user, hostname, and hardware profile from an installer without editing hand-written pages.
8. A system that boots and runs after installation.

Conditions seven and eight are the ones a file check cannot prove, because they depend on the installer and on real hardware. A settings GUI, a patch switch, a desktop, and an application catalog are not requirements, and a template can add them as long as the install and boot path does not depend on them.

## Flake outputs

- `nixosConfigurations.<host>`: the buildable `x86_64-linux` system.
- `apps.setup`: the host setup app.
- `apps.generate-hw`, `apps.generate-user`, `apps.create-new-system`.

Optional outputs such as `nixosModules.default` are added only when they help a consumer, so the minimum does not include them.

## Module contract

| Content | Module | Fallback |
| --- | --- | --- |
| System settings | `flake.modules.nixos.system-configuration` | `modules/00-configuration.nix` |
| User account | `flake.modules.nixos.users` | `modules/00-user.nix` |
| Host registration | `flake.nixosConfigurations.<host>` | `modules/00-host.nix` |
| Hardware | `flake.modules.nixos.system-hardware` | `modules/00-hardware.nix` |
| Bootloader | `flake.modules.nixos.system-bootloader` | same hardware file |
| Host imports | `flake.modules.nixos.host-imports` | `modules/00-imports.nix` |
| Facter report | none | `modules/facter.json` |

The users module carries the `@menu` and `@option` header the settings GUI expects, and the hardware module has no such header and never appears as a settings page. The installer resolves a module name first and otherwise uses the documented fallback path.

## Validation

Run `nix run .#check` to check the required module names, the required scripts, and the host, and use `nix flake check` for the static check that CI runs. A VM boot test and an installer-driven install belong to the consuming product, which for this variant is the terminal installer.

The check app does not prove that the system boots. It proves that the shape is present, so the boot proof belongs to the installer test or to the person installing the fork.

## Next

For the next step, read [configuration](/minimal/docs/configuration/), then the [installer reference](/minimal/docs/installer/), or finish with [limits](/minimal/docs/limits/).
