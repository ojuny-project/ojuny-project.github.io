---
title: Updates
description: User-driven updates, the update GUI, and rollback limits.
sidebar:
  order: 3
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Updates are up to the user. Ojuny has no built-in auto-update. A patch could add
auto-updating, but it is not core behavior.

## What can be updated independently

- The template, by merging upstream into your fork.
- Packages, with `nix flake update` or `ojuny flake update <input>`.
- Flake inputs pinned in `flake.lock`, with the same commands.
- The system configuration, with `simple-nix-update-gui` or a manual rebuild.

What gets updated together is up to you. Holding a version means not running a
flake update.

## CLI workflow

```sh
ojuny flake update <input>
ojuny flake validate
ojuny flake build
ojuny flake activate-boot
ojuny flake activate-now
```

`ojuny flake update <input>` updates one named flake input. Use
`nix flake update` to update every input at once. `validate` checks the flake
and prints the context block, including the flake path, host, Git revision, Nix
version, input revisions, result, and patch state. `build` evaluates the
configuration without switching. `activate-boot` makes the new generation the
default on the next boot, and `activate-now` switches immediately.

Use `activate-boot` for large updates. It leaves the running system untouched
until you reboot.

## Update GUI

The update GUI is a repo-sync checker, not a package updater. It keeps an
installed system in sync with the remote flake repository the flake is on. It is
primarily for multi-user or multi-system flakes with one primary maintainer.

It is disabled by default, so its daemon and tray do not run. The shipped DMS
updater policy also starts no check, sends no notification, and updates nothing
automatically. DMS has no single enable key; changing any of its advanced keys
is your own choice.

The checker compares the active system path with the evaluated system
derivation for the configured flake URI and system name. When they differ, an
update is available. Notifications are sent the first time an update is seen
and again when the state changes from no update to update; the daemon itself
sends none. Update checking only reports that the installed system differs from
the remote. It is not a fifth update path, and `ojuny flake` does not create
one.

The workflow:

1. The primary maintainer edits the flake with nix-settings-gui.
2. They sync the changes from the settings GUI.
3. Other users get a notification that the repository has a new version of
   their system.

When the checker is enabled, the Updates page exposes the flake URI override,
the clone path override, a check interval of 30 minutes, 1 hour, 6 hours,
12 hours, or 1 day, notification on or off, `nix-output-monitor` build
graphing, and tray autostart. The default interval is 1 hour.

A rebuild first clones or pulls the flake repository as the invoking user, then
runs `nixos-rebuild` against the local path. `build` runs unprivileged; `boot`
and `switch` prompt for a password in the embedded terminal.

`nix-settings-gui` supports multiple flakes on the system and can switch between
editing them. That is what makes the shared-flake workflow possible.

In `nix-monitor`, the Rebuild button opens `nix-settings-gui`; it does not
rebuild the system. The monitor reports the launch as completed when that
window closes, not when any work finishes, and Cancel closes the launcher.
`nix-settings-gui` itself rebuilds only when
`~/.config/nix-settings-gui/config.json` contains `rebuild_command`, which the
installer and `setup.sh` write. Without that file, the rebuild stays unavailable
until Configure writes one.

## Update tooling

The template includes:

- [nix-settings-gui](https://github.com/ojuny-project/nix-settings-gui) for the
  settings menu.
- [nix-regedit](https://github.com/ojuny-project/nix-regedit) for a registry-editor
  style flake editor.
- [nix-shell-gui](https://github.com/ojuny-project/nix-shell-gui) for temporary
  `nix run` and `nix shell` applications.
- [simple-nix-update-gui](https://github.com/ojuny-project/simple-nix-update-gui) for
  keeping an installed system in sync with its remote flake.
- [nix-cleaner](https://github.com/ojuny-project/nix-cleaner) for inspecting store
  usage and cleaning garbage collection roots.
- [nix-cache-discovery](https://github.com/ojuny-project/nix-cache-discovery) for a
  shared binary cache on the LAN.

The [ojuny CLI](https://github.com/ojuny-project/ojuny-cli) provides the
`ojuny flake` commands. The Updates and Nix settings pages for these tools both
live under Core in the settings menu.

## LAN cache

The Nix settings page exposes the LAN cache. It is off by default. When enabled,
every host runs the same daemon on the same port, serves its own Nix store,
finds the other daemons, and proxies anything it does not have locally. A path
built once on one host can then be substituted by the others instead of being
rebuilt.

The exposed controls:

- **Detect LAN automatically** uses the subnet of the interface that carries the
  default route. Fixed ranges are ignored while it is on, and the ranges field
  is hidden. It is on by default when the cache is enabled.
- **LAN cache port** must match on every device. The template uses 5055.
- **LAN cache scan interval** is seconds between scans for other devices. The
  template uses 600 seconds, or 10 minutes.
- **Use only the LAN cache** makes the local daemon the only substituter. It
  fetches missing paths from the fallback substituters itself, so the
  substituter list is hidden and unused. The fallback list and fallback
  signature checking appear instead.

A request is served from the local store, then from discovered peers, then from
the fallback substituters. Fallback narinfos are verified against the trusted
public keys before they are proxied. With the LAN cache as the only substituter,
Nix no longer checks signatures for caches configured outside the module; the
local daemon is the trust boundary. The cache has no user authentication, so
treat the configured ranges as the trust boundary.

The subnet is resolved at startup. After joining a network, restart the service.

## Garbage collection

`nix.gc.automatic` runs scheduled collection with a calendar expression and
options such as `--delete-older-than 30d`. Both are exposed on the Nix settings
page.

`nix-cleaner` is the manual path. It groups store paths by package, lists GC
roots and their generations, and shows the closure and solo savings for a root.
Roots that keep the running system, the booted system, the active generation,
the newest three generations, or an active profile alive are protected and
cannot be selected.

The GUI never changes roots itself. It writes a plan and asks the privileged
helper to verify it against a fresh scan. Cleaning unlinks the selected root
links and runs garbage collection through the installed polkit action
`dev.den.nix-cleaner.clean` with `pkexec`, never `sudo`. A dry run stages the
links and restores them; cleaning is irreversible only after collection
succeeds. In `nix-monitor`, the GC button opens `nix-cleaner`.

## Upstream and the template

Ojuny tests flake updates before pushing the template. After that, whether to
update is your choice. You can merge upstream template changes, ignore them, or
detach completely.

Upstream config changes are Ojuny's responsibility. When an upstream format
changes, Ojuny releases the adapter and updates the flake inputs. A user who
tracks upstream directly takes on that work themselves.

## Rollback

Every switch creates a generation. Rollback restores system state, not user
files or imperative state changes.

- Flatpaks do not roll back.
- Passwords do not roll back when mutable users are enabled.
- User files do not roll back.
- System state does, as long as you have not deleted all older generations.

If an update breaks, reboot, select the previous generation in the boot menu,
and you are back to the setup from before the break. You can also roll back from
a terminal with:

```sh
sudo nixos-rebuild switch --rollback --flake <repo>#<host>
```

Ojuny has no imperative components that can make the system unworkable.

## State versions

`system.stateVersion` and `home.stateVersion` are written once by the installer
or setup script. They are not exposed in the settings GUI and should not be
changed casually. They describe the release the state was created with, not the
current release.

## Build time and the binary cache

Some Ojuny software is not in nixpkgs and must be built from source. Ojuny does
not yet ship its own binary cache. On low-end systems this can add up to an hour.

The LAN cache reduces repeat builds across machines on the same network, but it
only serves paths that one of those machines has already built. It is not a
public binary cache.

The ISO pre-builds those components and copies them at install time, trading ISO
build speed for a faster install. The recorded Calamares install with LUKS2 root
and XFS is 18 minutes on a Ryzen 3 3200U with 24 GB RAM and a 256 GB NVMe SSD.
Switching can still be slow. The timings are listed in
[Downloads](/downloads/).

A binary cache and Hydra build server are the desired broader fix. A design that
keeps the cache alive without donations and without depending on the maintainer
has not been made. This is the honest weak point in the release story.

## If it needs to persist

Save it to the flake. Runtime changes are not persistent. Anything persistent
and core requires a rebuild. The system must always be able to be rolled back
through NixOS generations.

## Next

- [Settings menu](/configuration/settings-gui/)
- [Patches](/patches/overview/)
