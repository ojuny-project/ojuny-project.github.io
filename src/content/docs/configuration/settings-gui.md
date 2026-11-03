---
title: Settings menu
description: How annotated Nix modules become editable controls.
sidebar:
  order: 1
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The settings menu is the primary interface for changing an Ojuny system. It is
provided by [nix-settings-gui](https://github.com/ojuny-project/nix-settings-gui),
which scans the flake modules and renders one window of controls for each
annotated page.

It is a control panel, not a separate configuration store, a Nix editor, or a
patch installer. The Nix files stay the source of truth. Every edit changes a
value in an existing file; the GUI cannot create an option on its own.

## Open it

Launch the annotation-driven window from the desktop application menu. Its page
names come from the `@menu` headers in the flake, not from a command line.

The `ojuny settings open` command opens a Dux Shell settings page. The page name
is a Dux Shell page id or alias, and an unknown name is rejected:

```sh
ojuny settings open displays
ojuny settings open dankbar
ojuny settings open network
```

That command focuses the matching Dux Shell page. It does not start the
annotation-driven window.

## One file, one menu

A file becomes a menu only when it has an `@menu` comment before the first
`flake.modules.*` assignment:

```nix
{ self, inputs, ... }:
{
  /* @menu
     displayname = "Bluetooth";
     icon = "bluetooth-symbolic";
     order = 40;
     description = "Bluetooth devices and power";
     category = "07-System";
  */
  flake.modules.nixos.system-bluetooth = { config, pkgs, ... }: {
    /* @option widget = "switch"; label = "Enable Bluetooth"; */
    hardware.bluetooth.enable = true;
  };
}
```

Files without `@menu` are ignored by the scanner. They are used for
under-the-hood settings and generated files.

## Option placement

An `@option` comment sits directly above the assignment it describes, in the
same attribute set, and binds to that assignment:

```nix
/* @option widget = "dropdown"; label = "Color palette"; group = "Theme"; */
ojuny.style.palette = "everforest-dark-hard";
```

The comment adds rendering metadata; it does not declare the option. The option
must already exist in the module's option tree, declared at the top level of a
module's `options` attribute. An optional feature uses a thin
`flake.modules.nixos.patch-<id>` wrapper that declares the toggle and imports a
permanent backend, which declares the feature's options and gates its `config`
with `lib.mkIf`.

An `@option` above an attribute set configures the whole subtree. Inside such a
submodule, unannotated children are still scanned and rendered, so a child that
should stay out of the menu needs `hidden = true`.

Annotations inside `lib.mkMerge`, a list literal, `map`, `forEach`, or
`lib.optionalAttrs` are dropped, so the control is missing or loses its label,
group, order, and gate. That is intentional; fix the module shape instead of
the scanner. `lib.mkIf` is supported, and an annotation may sit directly inside
a `lib.mkIf`-wrapped attribute set.

## Option tiers

The menu has four levels of exposure:

- **Normal**: the default view. These are settings a normal user would want, and
  they should not be able to break the system. A bootloader toggle is not a
  normal option.
- **Advanced**: settings a normal user may still want, but which would be noise
  in the normal view. They live in a fold-out at the bottom of the page. Set
  `advanced = true`.
- **Hidden**: power-user settings, shown only while the Advanced toggle is on.
  Set `hidden = true`.
- **Unexposed**: options that are not in the menu at all. Leave them without an
  `@option` comment.

A whole menu can be hidden with `hidden = true` in its `@menu` header. Tiers are
an editorial boundary, not a security boundary: the value is still present in
the Nix file.

Live-applied items are marked with an icon when live apply is enabled.
Descriptions explain the setting; documentation is a broader infobase.

## Widgets

The standard widgets are `switch`, `dropdown`, `radio`, `spin`, `slider`,
`text`, `multiline`, `path`, `package`, `packages`, `list`, `color`,
`submodule`, `nixosModules`, `hmModules`, and `raw`.

The custom widgets are `bar`, `dock`, `menu`, `monitors`, `plugins`,
`keybinds`, `theme`, `horizontal-submodule`, `table-attrset`, `table-list`, and
`grid-configuration`. The specialized pickers `font`, `icon-theme`,
`cursor-theme`, `wallpaper`, `file`, `users`, and `secureboot` are also
available.

Custom widgets hard-code the shape of one configuration and edit it as a whole.
For example, `bar` and `dock` edit a name-keyed set of widget lists, `monitors`
renders a draggable layout, `keybinds` edits a bind table, and `theme` shows
color swatches. `table-attrset` and `table-list` edit rows of a set or a list.
`horizontal-submodule` lays its children side by side and does not nest.

## Metadata and validation

Type, default, and choices come from `nixd`. When `nixd` is unavailable or
returns nothing, the GUI falls back to `nix eval`, so the module does not repeat
them. A module supplies the assignment and the annotation; absence of type data
usually narrows the control to `raw`.

On save, the GUI patches the value spans as text, checks the result with
`rnix`, formats it with `nixfmt`, and writes atomically. The write is
all-or-nothing: if any affected file fails to parse, nothing is written. Values
come from typed controls rather than free-form text as the primary input.

That is the validation boundary. It guarantees parseable, formatted Nix that
matches the control's type. It does not evaluate the configuration and does not
test boot. A parseable value can still be semantically wrong, so the normal tier
is curated to avoid settings that break a session or a boot, and no tier
replaces testing.

## Apply commands and reload toggles

Some settings can be applied to the running session without a rebuild:

```nix
/* @option widget = "switch"; label = "Reduce motion";
   applyCommand = "dms ipc call settings set reduceMotion %%val%%"; */
desktop.ojuny.dux.settings.reduceMotion = false;
```

`%%val%%` is replaced by the option's plain value and passed as one shell
argument. The command runs in the flake root, is debounced, and runs one at a
time. It runs only while **Apply changes immediately** is on, which is the
default. A live-applied item shows a bolt icon while that toggle is on.

Not every option is live. A command exists only where the running service
exposes an IPC call or reload path. Settings that the module system alone can
apply have none and wait for a rebuild.

Applying a value does not save the file. The edit is staged in memory, **Save**
writes it to Nix, and the next rebuild makes it durable. An unsaved change
disappears after a reboot, so the apply command is a preview of the running
session, not a replacement for the rebuild.

Two reload toggles in the app menu run after a successful rebuild:

- **Reload mango after rebuild** appends `mmsg dispatch reload_config`.
- **Reload DMS after rebuild** appends `dms kill && mmsg dispatch spawn_shell,dms run`.

The `&&` keeps each reload conditional on a clean rebuild. Both are off unless
the GUI config enables them; the Ojuny setup script enables the DMS reload. They
are convenience for the transition after a rebuild, not live apply.

## Categories and order

The `@menu category` string is printed verbatim and sorted as a string, so
prefixes such as `01-Users` and `07-System` control the section order. The
`order` value controls the page order inside a category. Folder names do not
affect the menu.

## What a normal user can change without Nix

A normal user can configure system, desktop, applications, networking, users,
updates, and enabling or disabling installed patches without touching Nix.

The GUI is not a Nix editor and not a patch installer. It edits annotated value
spans, not arbitrary modules. Its only patch action is enable and disable. Patch
installation and removal are CLI-only; the GUI shows installed patches and lets
you enable or disable them.

Nix is needed only for writing patches and advanced troubleshooting. Advanced
Nix usage is Nix-only.

## Generated files

`modules/07-system/00-hardware.nix` is generated and has no `@menu`. The user
module is generated but does have a menu, so the account can be edited later.

## Next

- [Template layout](/configuration/template-layout/)
- [Reading desktop options](/configuration/options/)
