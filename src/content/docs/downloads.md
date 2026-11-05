---
title: Downloads
description: Repositories, install paths, and the source-first release model.
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny is distributed as source flakes. There is no package archive, binary
channel, or paid tier. There is no release schedule. No ISO release exists yet.

Ojuny has no package repositories or distribution infrastructure of its own. It
has no own git host, Hydra build server, or Nix cache. It uses NixOS
repositories, Flathub, and GitHub.

## Repositories

| Component | Repository |
| --- | --- |
| Desktop | [ojuny-project/ojuny-desktop](https://github.com/ojuny-project/ojuny-desktop) |
| Template | [ojuny-project/ojuny-template](https://github.com/ojuny-project/ojuny-template) |
| CLI | [ojuny-project/ojuny-cli](https://github.com/ojuny-project/ojuny-cli) |
| Installer | [ojuny-project/ojuny-installer](https://github.com/ojuny-project/ojuny-installer) |
| Patch registry | [ojuny-project/ojuny-patches](https://github.com/ojuny-project/ojuny-patches) |
| This site | [ojuny-project/ojuny-site](https://github.com/ojuny-project/ojuny-site) |

## Try the desktop

```sh
nix run github:ojuny-project/ojuny-desktop
```

The runner uses temporary config and state directories and does not touch your
existing shell configuration.

## Add the desktop to an existing system

Use the NixOS or Home Manager module. See
[NixOS and Home Manager modules](/install/modules/).

## Install the full system

From the template:

```sh
nix run github:ojuny-project/ojuny-template#setup
```

The installer family is built from source. Clone the installer repository once,
then choose an output:

```sh
git clone https://github.com/ojuny-project/ojuny-installer
cd ojuny-installer
```

The attended Calamares ISOs are:

| Variant | Build command |
| --- | --- |
| Main | `nix build .#ojuny-iso` |
| Discovery | `nix build .#ojuny-iso-discovery` |
| Offline | `nix build .#ojuny-iso-offline` |

Each attended image is written to `result/iso/*.iso`. The main image boots the
Ojuny desktop and runs Calamares. The discovery image runs the same install
using the local cache discovery daemon. The offline image carries the full
system runtime closure and the build inputs needed by `nixos-install`, so it can
install the default system without network access. See the
[installer ISO guide](/install/iso/).

The Calamares install supports optional LUKS2 root encryption. Encrypted BIOS
boot uses a generated GRUB keyfile.

## Unattended installer

The unattended installer is built for a specific template fork and target disk.
It wipes the disk without an interactive installer. Build it through the
settings generator:

```sh
nix run github:ojuny-project/ojuny-installer#make-unattended-iso -- \
  --flake "$HOME/repos/my-template" \
  --disk /dev/disk/by-id/...
```

From an installer checkout, the equivalent is
`nix run .#make-unattended-iso -- ...`.

The script prompts for firmware, account, password, SSH keys, and the remaining
settings. It copies the ISO to `result-unattended/`. Use `--dry-run` to inspect
the settings and build command without building.

The script selects one of three outputs:

| Variant | Flag | Flake output |
| --- | --- | --- |
| Online | none | `unattended-iso` |
| Offline | `--offline` | `unattended-iso-offline` |
| Discovery | `--discovery` | `unattended-iso-discovery` |

Add `--encrypt` to enable LUKS2 root encryption. The passphrase is stored on the
live ISO with mode `0600`. The online variants need network access. The offline
variant installs without network access for the default system. See the
[unattended ISO guide](/install/unattended-iso/).

## Persistent image

The installer also builds a base persistent raw image. It has a GPT disk with an
ESP and an ext4 partition labelled `ojuny-persist`. At boot, `/` is tmpfs and
`/home` persists on that partition. Package updates and system changes written
to `/nix` live in a tmpfs overlay until reboot.

```sh
nix run github:ojuny-project/ojuny-installer#make-persistent-image
```

From an installer checkout, use `nix run .#make-persistent-image`.

The image is written to `ojuny-persistent.img` in the current directory. Use
`--output DIR` to choose another directory and `--qcow2` to also write a qcow2
copy. Write the raw image with Etcher or Rufus in DD mode.

## Requirements

- `x86_64-linux` target.
- 4 GB of RAM minimum for the Calamares and unattended ISOs.
- 4 GB of RAM for `nix run .#setup` from the template, because it builds the
  compiled packages from source.
- Network access for the online install paths. The offline ISOs do not need it.
- A target disk for the ISOs. Calamares partitions and mounts it; the
  unattended ISO wipes the configured disk. The persistent image is a raw disk
  image.

The unattended ISO does not configure Wi-Fi. Use a wired connection.

## Releases

There is no release schedule. Release artifacts will be listed on the
repository release pages when they exist.

No ISO release exists yet. Repository release pages are where release artifacts
will be listed when they exist:

- [Installer releases](https://github.com/ojuny-project/ojuny-installer/releases)
- [CLI releases](https://github.com/ojuny-project/ojuny-cli/releases)
- [Template releases](https://github.com/ojuny-project/ojuny-template/releases)

## Support

There is no support team and no paid support. Support is best effort from the
Ojuny, NixOS, Dux Modular Shell, and MangoWM communities. Reproducibility helps a helper
rebuild a configuration from a repository URL, but it is not a support contract.
There is no obligation to support arbitrary modified systems.

## Build time

Most of the ISO build time is spent pre-building six compiled applications.
The current installer timings are:

- Calamares ISO install with LUKS2 root and XFS on a Ryzen 3 3200U with 24 GB
  RAM and a 256 GB NVMe SSD: 18 minutes.
- Full clean ISO build: 51 minutes.
- ISO rebuild with reused dependencies, rebuilding only the squashfs: 15
  minutes.

The ISO has been confirmed to boot with 4 GB RAM and 2 threads. Install time on
that configuration has not been measured yet. Switching can still be slow
because some components build from source. A binary cache is a future
infrastructure goal.

## Test status

As of 2026-11-03, the attended ISO test runs are written but none has been
completed. The offline hardware matrix and the unattended installs are left to
the user for hardware verification. The persistent image has not been
hardware-tested. Treat these paths as implemented but not yet verified on
hardware.

## Verify what you build

Flakes pin their inputs in `flake.lock`. Review the lock file and build from a
commit you trust. The installer ISO installs the template revision it was built
with. A prepared repository keeps its own lock and may rebuild the compiled
packages.

## License

Ojuny is GPL-3.0. It builds on NixOS, nixpkgs, flake-parts, import-tree, Home
Manager, MangoWM, Dux Modular Shell, Stylix, base16-schemes, Calamares, disko, and the
supporting Nix GUI tools. Credit the upstream projects.

There is no donation link and no paid tier. Support upstream instead.
