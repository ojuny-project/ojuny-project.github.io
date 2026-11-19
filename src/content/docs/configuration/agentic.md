---
title: Agentic Ojuny
description: The optional agent patch, the safety boundary, and why Ojuny is agent-ready without shipping an agent.
sidebar:
  order: 5
type: explanation
audience: user
appliesTo: ojuny-template
source: ~/repos/ojuny-template/docs/11-agent.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny is agent-ready without shipping an agent. The default install is fully
AI-free out of the box: no model server, no agent, no assistant, and no
telemetry. `patch-ojuny-agent` adds a full agentic workflow for users who want
it.

## Why the flake is the boundary

The agent works on the Nix flake, not on the running system. Every change is a
normal file change that can be shown with `git diff`, validated, and reverted.
The user owns the rebuild and the resulting generation.

This is the difference between an agent that can propose a system change and an
agent with broad shell access. Ojuny does not give the agent `sudo`, package
installation, service control, or the ability to activate a generation.

## The two agents

### `ojuny-agent`

The maintenance agent. It can read the flake, the documentation, and the
`ojuny` CLI. It can propose a settings change and apply it only after explicit
approval. It can edit files inside the flake, validate the edit, show the diff,
revert a change, and sync the flake git.

It cannot rebuild, activate a generation, use `sudo`, install packages, or
change services. Runtime `ojuny` commands are denied by default. The optional
`Allow runtime actions` switch makes mutating `ojuny` commands approval-gated.
`sudo`, rebuilds, and package changes stay denied.

### `ojuny-assist`

The read-only explainer. It answers questions about Ojuny, the settings menu,
patches, the flake, and the `ojuny` CLI. It can read files and run read-only
diagnostics. It cannot edit, sync, revert, lock, rebuild, or mutate anything.
Network clients are denied.

## The `ojuny-agent-cli`

The patch installs `ojuny-agent-cli`. It is read-only by default.

Read-only commands:

```sh
ojuny-agent-cli guide
ojuny-agent-cli status
ojuny-agent-cli settings list
ojuny-agent-cli settings show <page>
ojuny-agent-cli patches list
ojuny-agent-cli patches show <id>
ojuny-agent-cli diagnose
ojuny-agent-cli docs
ojuny-agent-cli diff
ojuny-agent-cli validate
ojuny-agent-cli sync --status
ojuny-agent-cli sync --dry-run
```

Mutating commands require `--yes`:

```sh
ojuny-agent-cli sync
ojuny-agent-cli sync --continue
ojuny-agent-cli sync --abort
ojuny-agent-cli revert <path>
ojuny-agent-cli revert --all
ojuny-agent-cli lock
```

Mutating commands never accept `--flake`. They always use the configured Ojuny
flake, so the CLI cannot be pointed at another repository. The CLI never pushes
and never rewrites history.

## Install the patch

```sh
ojuny-patches sync
ojuny-patches install patch-ojuny-agent
```

Installing copies one Nix module and enables nothing. Open the settings GUI, go
to Patches, turn on Ojuny agent, confirm that Development and its OpenCode agent
are enabled, then rebuild.

`patch-ojuny-agent` depends on `patch-development` and its OpenCode agent. The
agent patch does not enable them itself. For a fully local model stack, install
`patch-local-llm` as well.

To remove the patch, turn Ojuny agent off, rebuild, run
`ojuny-patches remove patch-ojuny-agent`, and rebuild again.

## Editing a setting

1. Ask for a change.
2. The agent finds the page with `ojuny-agent-cli settings show <page>`.
3. It reads the module and the governing documents.
4. It proposes the file, line, old value, new value, and validation plan.
5. The user approves the edit.
6. The agent applies the edit inside the flake.
7. It runs `ojuny-agent-cli validate`.
8. If validation fails, it fixes the change with a new approval or reverts it.
9. It shows `ojuny-agent-cli diff`.
10. The user rebuilds.

Generated files are denied even inside the flake: `flake.lock`, the generated
hardware files, `facter.json`, the hardware quirks file, and the generated user
module.

## Validation and git sync

`ojuny-agent-cli validate` checks whitespace, parses and formats changed Nix
files, runs `nix flake check --no-build`, and evaluates the host configuration.
It does not build or activate the system.

`ojuny-agent-cli sync --status` and `sync --dry-run` are read-only. A real sync
requires a clean worktree and `--yes`. The CLI creates a backup ref, fetches,
then fast-forwards or prepares a no-commit merge. It never pushes and never
rewrites history. Conflicts are never resolved automatically.

## The default install

The default install ships no agent, no model, and no assistant. It is fully
AI-free out of the box. Ojuny uses AI as a tool in its own development and does
not claim to be 100 percent AI-free.

The optional patches are the whole agentic surface:

| Patch | Adds |
| --- | --- |
| `patch-development` | Development tools and the OpenCode agent |
| `patch-ojuny-agent` | `ojuny-agent`, `ojuny-assist`, and `ojuny-agent-cli` |
| `patch-local-llm` | Local model server, harness, and LSP wiring |

## Limits

- The agents require `patch-development` and its OpenCode agent.
- The agents do not replace the settings GUI. Both edit the same modules.
- The agents do not push. Push remains a manual Git action.
- The agents do not rebuild. The user runs the rebuild.
- Patch trust is the same as any other patch. Read the diff.
