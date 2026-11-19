---
title: Configuration model
description: How Fleet stores entities, policies, and settings as Nix files edited through the manager.
sidebar:
  order: 3
type: how-to
audience: operator
appliesTo: ojuny-fleet-manager
source: ~/repos/ojuny-future-repos/ojuny-fleet-manager/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Fleet is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Fleet configuration is Nix files in Git, not database records. Every entity is a Nix file or a set of Nix files, and the interface edits the file rather than a record that is later exported. Git and the Nix files are authoritative, and the controller and manager read and write that tree.

## Managed tree

The controller manages one multi-system flake or one flake per endpoint, stored in Git and edited by the manager. The data model covers users, groups, endpoints, servers, applications, policies and templates. A deployment is reproducible from a commit, and the controller records what it built and what it pushed.

## Entities and policies

Policies are Nix modules that can be bound at the user, group, device or application level. Precedence between those bindings is explicit and testable, which makes policy order part of the configuration contract rather than a hidden rule in the interface. Endpoint configuration includes the NixOS system, hardware data and device-bound policies, while server configuration reuses the same model with a server-oriented default structure and container support.

## Annotations and option shape

The manager uses `@menu` and `@option` annotations to drive pages and controls exactly as in `nix-settings-gui`, where an `@option` comment attaches rendering metadata to an assignment rather than declaring the option itself.

Options must be declared at the top level of a module's `options` attribute. Options inside `lib.mkMerge`, a list of attribute sets, `map`, `forEach` or `lib.optionalAttrs` are not reliably visible and must not be used. A freeform value that is not a module option uses a descriptor sidecar. This is the same documented scanner limitation that the [settings GUI](/configuration/settings-gui/) carries, and the fix for an invisible option is always to change the module shape.

## Saving and review

Every manager page offers a raw Nix editor for the whole file. Saves are all-or-nothing: parse check with `rnix`, format with `nixfmt`, write atomically, then commit. A diff preview appears before a save and before a deploy, and a rejected save leaves the working tree unchanged.

The manager does not merge conflicting changes automatically. Conflicts are shown to a person, who resolves them in the managed tree. [Security](/fleet/docs/security/) covers the trust boundary around these edits, and [endpoints](/fleet/docs/endpoints/) covers the files that describe a machine.
