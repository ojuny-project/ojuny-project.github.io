---
title: Creating patches
description: Repository layout, metadata, and the module shape.
sidebar:
  order: 2
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

A patch repository contains one or more patches and their metadata.

A patch is a flake-parts module with nix-settings-gui annotations. It is not
Ojuny-exclusive: the annotations do not affect how the module functions, so the
same module can be used standalone on any NixOS install. Any flake-parts module
can become a patch with minor modifications.

The best practice is a global enable toggle plus settings GUI annotations. A
patch can change anything a flake-parts module can change, and there is no
special patch API or sandbox.

## Layout

```text
modules/patches/<id>.nix
<id>/metadata.md
```

The ID includes the `patch-` prefix. Use lowercase letters, digits, and single
dashes, for example `patch-distrobox`.

An existing legacy install named `<NN>-<id>.nix`, including the older
`<NN>-patch-<name>.nix` form, is upgraded to `<id>.nix`. Installation refuses
when the current file and a legacy file both exist, or when more than one
legacy file matches.

## Metadata

```text
name: Distrobox
id: patch-distrobox
description: Container-based distro environments backed by Podman
dependencies:
version: 1
```

`name`, `description`, `version`, and `id` are required. The value of `id` must
match the directory and file name. `dependencies` is optional. It is a
comma-separated list of patch IDs.

The dependency check looks for files in the local patch directory; it does not
compare versions. Missing dependencies are installed first, recursively.
Dependency cycles are rejected. The check confirms that a file exists; it does
not verify its contents.

## Why patches instead of forks

Patches work like game modding. Each patch is a self-contained file, so patches
do not create merge conflicts with each other or with your configuration. That
is much simpler than maintaining a fork for one feature.

## Module shape

The installed module must define `flake.modules.nixos.patch-<name>` or
`flake.modules.homeManager.patch-<name>`. The attribute is the full `patch-`
prefixed ID:

```nix
{ self, ... }:
{
  flake.modules.nixos.patch-distrobox =
    { config, lib, ... }:
    {
      options.ojuny.patch.distrobox.enable = lib.mkEnableOption "the Distrobox patch";

      # @option widget = "switch"; label = "Distrobox patch"; group = "Patches"; description = "Enable Podman and install Distrobox.";
      config.ojuny.patch.distrobox.enable = false;

      imports = [ self.modules.nixos.distrobox-backend ];
    };

  flake.modules.nixos.distrobox-backend =
    { config, lib, pkgs, ... }:
    let
      active = config.ojuny.patch.distrobox.enable && (config.ojuny.patches or true);
    in
    {
      config = lib.mkIf active {
        environment.systemPackages = [ pkgs.distrobox ];
      };
    };
}
```

The installer rejects a module that defines neither attribute. The template
imports every `patch-*` module while `ojuny.patches` is enabled, and it also
gates Home Manager patch modules on the host's `ojuny.patches`. The
`config.ojuny.patches or true` expression keeps the patch usable standalone,
where the template option may not exist.

## Add options to the settings GUI

A patch can be a normal settings page. Add an `@menu` header and `@option`
comments if you want it to appear in the GUI:

```nix
/* @menu
   displayname = "Distrobox";
   icon = "application-x-executable-symbolic";
   order = 32;
   description = "Container-based distro environments backed by Podman";
   category = "Patches";
   systems = [ "all" ];
*/
```

The `@menu` header is file-level and must appear before the first
`flake.modules.*` binding. `@option` binds to the assignment directly below it.
Place annotated assignments directly in a module body, in a plain
`config = { ... }` set, or in a `lib.mkIf`-wrapped set. Do not put them inside
`lib.mkMerge`, a list literal, `map`, `forEach`, or `lib.optionalAttrs`; the
scanner does not descend into those shapes. Inside an annotated submodule, an
unannotated child is still rendered, so set `hidden = true` on that child when
it must stay out of the GUI.

Editor patches declare an off-by-default `defaultEditor` switch instead of
writing `EDITOR` unconditionally. The template owns the global editor default
(`micro`, at `mkDefault` priority), so an editor patch switch overrides it. The
template asserts that at most one of the nixvim, emacs, helix, and zed
`defaultEditor` switches is enabled.

Installation does not enable the patch, but the page can still be shown so the
user can turn it on. Patches are disabled by default.

## Test a patch

Add the repository, sync it, and install the patch by ID:

```sh
ojuny-patches repo add https://github.com/<you>/<repo>
ojuny-patches sync
ojuny-patches list available
ojuny-patches install <id>
```

Enable it in the settings GUI, rebuild, and confirm that disabling it removes
the packages and services cleanly. Turn the patch off and rebuild before
removing it; removing a module while its options are still set fails
evaluation.

The registry keeps the annotation check at `tests/annotations.py`. Run it from
the repository root before publishing:

```sh
python3 tests/annotations.py
```

## Publish

Push the repository to a git host and add its URL, or a local clone path:

```sh
ojuny-patches repo add https://github.com/<you>/<repo>
ojuny-patches sync
```

The default registry is
[ojuny-patches](https://github.com/ojuny-project/ojuny-patches). Document the
patches, their dependencies, and any manual steps in the repository README.
Authors maintain their own patches.

Patches that are vibe-coded must be marked in the registry. Responsibility for
an AI-assisted patch stays with the person who made it.

## Next

- [Patch security](/patches/security/)
- [ojuny-patches CLI](/cli/ojuny-patches/)
