---
title: Patch security
description: Patches are Nix code and run with build privileges.
sidebar:
  order: 3
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

A patch is not a sandboxed plugin. It is a Nix module that is evaluated during
a rebuild with the same privileges as the rest of the configuration.

Patches are the primary security risk that Ojuny introduces. They are
third-party Nix code with build privileges. There is no sandbox.

## Trust model

The default registry is reviewed for quality and security. Third-party
repositories carry their own trust, just as Ojuny's does. It is up to you
whether to trust a repository and its review process, or to read the diff
yourself.

Patches that are vibe-coded must be marked in the registry. Responsibility for
an AI-assisted patch stays with the person who made it.

## Rules

1. Only add repositories you trust.
2. Read the module before enabling it.
3. Pin or review the repository revision when it changes.
4. Do not put secrets in a patch repository.
5. Remove patches you no longer use.

## What a patch can do

A patch can add packages, enable services, change system settings, add
activation scripts, and define new options. It can also change the behaviour of
existing modules. Review the whole module, not only its name.

## Supply chain

`ojuny-patches` is backed by git. It clones each repository into a local cache,
and installing a patch copies the file into your local patch directory. There is
no hash verification, signature check, or provenance check for a patch, a
repository, or a dependency. These are current limits of the tool, not
guarantees.

## Dependencies

Dependencies are resolved by file presence in the local patch directory. A
missing dependency is installed recursively. A cycle is rejected, but a
dependency can still pull in code you did not expect. The check confirms that a
file exists; it does not verify what the file contains. Review the metadata and
the dependency modules.

## Updates

`ojuny-patches sync` updates the local clone of the patch repository only. It
does not update installed patches. An installed patch changes only when you
reinstall it. Review the diff before reinstalling.

## Secrets

Do not put secrets in a patch repository. Keep vaults and keys outside tracked
files by default; an encrypted vault committed to a repository is an exception,
not the default. `patch-secrets` decrypts files at runtime from a key kept
outside the repository and the Nix store. It does not make secrets in a tracked
file safe.

## Reporting

Report security issues in a patch to the repository that publishes it. Report
issues in the patch manager to
[ojuny-cli](https://github.com/ojuny-project/ojuny-cli/issues).

Ojuny is not a security-focused distribution and does not make bold security
guarantees. Its promise is that its upstreams are secure by default and that
Ojuny does not weaken those defaults. Patches are the part where the final trust
decision is yours.

## Next

- [Patches overview](/patches/overview/)
- [Creating patches](/patches/creating/)
