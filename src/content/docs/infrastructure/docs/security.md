---
title: Infrastructure security
description: Exposure defaults for the CI server and trust boundaries for the pentest lab.
sidebar:
  order: 9
type: explanation
audience: operator
appliesTo: ojuny-ci-server, ojuny-pentest-server
source: ~/repos/ojuny-ci-server/docs/security.md; ~/repos/ojuny-future-repos/ojuny-pentest-server/DRAFT.md; ~/repos/ojuny-docs/08-scope-and-non-goals.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Infrastructure is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The two servers carry different risks, so this page keeps them apart. The CI
server is a LAN-trusted build host, and the pentest server is a lab that is
supposed to contain hostile code.

## CI server defaults

- Hydra and the cache are opened only on `ci.network.interface`.
- SSH is the only globally opened port.
- Root SSH login is disabled.
- The administrator uses SSH keys.
- The Hydra administrator password is an Argon2id hash.

The cache is LAN-only and unsigned by default. Trust comes from network
membership, so do not route it over an untrusted network and do not expose the
cache port to the internet.

## Public exposure

Public Hydra is out of scope. If you expose it, put a reverse proxy with TLS in
front and restrict access. A public Hydra without that boundary is outside what
the documentation supports.

The server is headless, and `nix-settings-gui` runs on the workstation. A
web-based settings GUI and an SSH proxy for the GUI are explicitly out of scope,
because they turn a local edit into a remote privileged interface.

## Secrets on the CI server

- Git token: `ci.git.tokenFile` is a netrc file consumed by Nix.
- SSH keys: `ci.ssh.authorizedKeys`.
- Hydra admin: `ci.hydra.adminPasswordHash`.
- Builder keys: `ci.builders.*.sshKey`.

Do not commit plaintext secrets, and use files with restrictive permissions.
Updates go through the flake, a rebuild and a NixOS generation rollback. There is
no auto-update.

## Pentest lab boundaries

The pentest server exists to test Ojuny configurations. It does not test
third-party systems, public addresses or systems without authorization, and it
does not disclose findings automatically.

The lab has no cloud AI API and no central service. Findings are hypotheses that
a person reproduces and triages, and unverified output stays quarantined. The
design has no automatic patching, no exploit framework in the default toolset,
and no denial of service, persistence, data exfiltration or destructive actions.

The lab does not claim a perfect sandbox. Residual trust remains in the
hypervisor, kernel and pinned nixpkgs, and the escape suite is a required gate
rather than an optional test. Read
[Pentest server](/infrastructure/docs/pentest-server/) for the components and
the limits.

## Project position

Ojuny is not a security-focused distribution. Its rule is that upstreams are
secure by default and that Ojuny does not weaken those defaults. The primary
Ojuny-introduced threat is a malicious patch, because a patch is Nix code
evaluated with build privileges and no sandbox.

Security is secure by default but not guaranteed, and the user chooses their own
risk. The published scope document makes that position explicit, and this page
does not extend it into a guarantee for either server.

## Related pages

- [CI server](/infrastructure/docs/ci-server/)
- [CI workflows](/infrastructure/docs/ci-workflows/)
- [Requirements](/infrastructure/docs/requirements/)
