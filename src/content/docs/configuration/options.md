---
title: Reading desktop options
description: How to read the generated desktop.ojuny.* option reference.
sidebar:
  order: 4
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The desktop option reference is maintained in the desktop repository:

[ojuny-desktop/options.md](https://github.com/ojuny-project/ojuny-desktop/blob/main/options.md)

That file is the reference for `desktop.ojuny.*`. The module declarations are
the authority for a type or a default; the reference states them and the
settings menu renders controls from them.

## Where to look

| Question | Page |
| --- | --- |
| What does this option do, and what is its default? | [ojuny-desktop/options.md](https://github.com/ojuny-project/ojuny-desktop/blob/main/options.md) |
| How do I change a setting on a running system? | [Settings menu](/ojuny-manual/usage/settings/) |
| What are the desktop parts and how do they fit? | [Desktop overview](/desktop/overview/) |
| How is the module used in a NixOS configuration? | [ojuny-desktop README](https://github.com/ojuny-project/ojuny-desktop) |

## Reading an entry

An option is written as its full path, its type, its default, and one sentence
about the effect:

```text
desktop.ojuny.wallpaper.preset (enum, default: everforest)
```

The namespace is `desktop.ojuny`. Runtime identifiers for the shell still use
`dms`, so the option path and the binary name do not match. The template's own
`ojuny.*` options are separate and are described in the
[template layout](/configuration/template-layout/).

Some defaults are Ojuny overrides, not upstream defaults. A MangoWM key such as
`tag_num` follows that rule. The repository reference records the value that the
Ojuny module sets.

This site does not keep a second copy of the option table. The previous
1,054-line page was a hand copy with no generator and no way to stay in sync.
