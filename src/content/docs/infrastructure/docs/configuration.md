---
title: Configure the CI server
description: Edit the flake on a workstation, then rebuild the headless server from the result.
sidebar:
  order: 3
type: how-to
audience: operator
appliesTo: ojuny-ci-server
source: ~/repos/ojuny-ci-server/docs/settings.md; ~/repos/ojuny-ci-server/docs/jobs.md; ~/repos/ojuny-ci-server/docs/pre-deployment.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Infrastructure is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The server is headless, and `nix-settings-gui` runs on the workstation. The GUI
edits the flake and the server receives the built system only. Every edit is a
normal flake change, and the change is reviewed before deployment.

## Settings workflow

1. Install `nix-settings-gui` on the workstation.
2. Open the repository in the GUI.
3. Change a setting and save.
4. Deploy with `nix run .#install -- --target root@server`, or provision with
   `nix run .#provision -- --target root@server --disk /dev/vda`.

The GUI writes the annotated defaults in `nixos/`. Option declarations and
annotated defaults sit in plain attribute sets so the controls render, while
`modules/` holds the flake-parts declarations that installers rewrite. Do not
run the GUI on the server, and do not expose a web GUI or SSH proxy for it.

An installer writes `networking.hostName`, `system.stateVersion` and
`ojuny.repoPath` into `modules/00-system.nix`. Those plain assignments take
precedence over the `lib.mkDefault` values that follow the GUI options, so keep
`ci.hostName` equal to the installed hostname when Hydra URLs must match it.

## Required settings

| Setting | Meaning |
| --- | --- |
| `ci.git.username` | Git user or organization for the standard repositories |
| `ci.ssh.authorizedKeys` | At least one real key; the shipped value is a comment placeholder |
| `ci.hydra.adminPasswordHash` | Hydra administrator hash, in Argon2id |
| `ci.network.interface` | The real network interface name |
| `ci.disk.device` | The target disk for a fresh install |
| `ci.hostName` | Host name, if the default is not suitable |

`ci.git.username` is the central setting. It is the only value needed when you
fork the Ojuny repositories under your own account or organization with the same
names.

If you renamed a repository, add a row to `ci.git.repositories`. The generator
uses `ci.git.repositories.<standard>.name or <standard>`:

```nix
ci.git.repositories = {
  "ojuny-template" = {
    name = "my-template";
  };
};
```

Other git settings are `ci.git.host`, which defaults to `github.com`,
`ci.git.protocol` for `https` or `ssh`, and `ci.git.tokenFile`, an optional
netrc file for private repositories. The administrator is set with
`ci.adminUser` and `ci.adminHashedPassword`, and SSH keys are the recommended
login method.

## Extra repositories

`ci.jobs.extraRepositories` adds a repository outside the standard list. Each row
carries a name, a flake ref or Git URL, an optional ref, and the job groups:

```nix
ci.jobs.extraRepositories = [
  {
    name = "my-ojuny-template";
    url = "github:me/ojuny-template";
    ref = "my-branch";
    groups = "checks vmTests";
  }
];
```

`ref` is appended to `github:`, `gitlab:` and `sourcehut:` refs, and passed as
`?ref=` for other URLs. `groups` is a space-separated list of job group names.
Duplicate names, an empty URL, an unknown group or an empty group list fail
evaluation, and the row appears under Jobs in the GUI.

## Jobs

The jobset is generated from `ci.jobs.*` and the repository list. The groups are
`checks`, `vmTests`, `isos`, `persistentImage`, `reproducibility`, `acceptance`
and `installReport`. Checks, VM tests and the install report are on by default;
ISO, persistent image, reproducibility and acceptance are off.

The standard list lives in `lib/jobsets.nix`, and each jobset points at a flake
and uses its `hydraJobs` output. The jobset name is `<group>-<repository>`.
`ojuny-ci-jobsets.service` creates the administrator, ensures the `ojuny`
project, and applies the declarative jobset, and its timer repeats the work
daily.

The [CI server page](/infrastructure/docs/ci-server/) covers the services and
the [security page](/infrastructure/docs/security/) covers exposure.
