---
title: The manager
description: The web interface for fleet entities, policies, deployments, and logs.
sidebar:
  order: 7
type: reference
audience: operator
appliesTo: ojuny-fleet-manager
source: ~/repos/ojuny-future-repos/ojuny-fleet-manager/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Fleet is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The Ojuny Fleet Manager is the web interface for the controller, shortened to OFM. It is the one place an administrator manages users, groups, endpoints, servers, applications, policies, templates, deployments and logs.

## Relation to other tools

OFM is the enterprise-geared version of `nix-web-gui`. Both reuse the `nix-settings-gui` backend directly, so the manager inherits the same comment-annotated Nix model, scanner, metadata lookup, span-patch write path, formatter and descriptor sidecars. It adds fleet pages, role-based access and remote actions on top of that shared backend.

## Repository layout

| Path | Purpose |
| --- | --- |
| `flake.nix` | Package, module and app outputs |
| `server/` | HTTP API over the shared `nix-settings-gui` backend |
| `server/fleet/` | Fleet entities, policies and controller client |
| `server/deploy/` | Deployment queue and controller calls |
| `server/auth/` | Nix-declared accounts, roles and audit |
| `frontend/` | Browser interface |
| `frontend/pages/` | Users, groups, endpoints, servers, applications |
| `frontend/components/` | Editors, tables, diffs and dialogs |
| `docs/` | API, roles, page reference and workflows |
| `tests/` | Backend, frontend and end-to-end checks |

## Pages

| Page | Scope |
| --- | --- |
| Users | List, add, edit details, group membership, user-bound policies and per-user settings |
| Groups | List, add, edit details, settings and group-bound policies |
| Endpoints | The NixOS declaration, hardware data and device-bound policies, plus deploy, live statistics and remote SSH |
| Servers | The same model with a server-oriented default structure and container configuration |
| Applications | List, add, package lists and application-bound policies |
| Policies | Nix files for system, user, device or application rules, with binding and precedence views |
| Templates | Template Nix files that can be filled in for a new endpoint |
| Settings | Controller settings, flake inputs, cache, VPN and certificate state |
| Logs | Controller, deployment, access and audit logs |
| Deploy | Build and download pre-addressed live ISOs, queue deployments and watch progress |

## Editing model

Every entity is a Nix file or a set of Nix files, and the interface edits the file rather than a database record. The manager uses `@menu` and `@option` annotations to drive pages and controls exactly as in `nix-settings-gui`, where an `@option` comment attaches metadata to an assignment rather than declaring the option.

The [configuration page](/fleet/docs/configuration/) records the module shape rules in full. The short version is that options must be declared at the top level of a module's `options` attribute, and a freeform value uses a descriptor sidecar. Every page offers a raw Nix editor for the whole file. Each save runs a parse check, a format, an atomic write and a commit after a diff preview.

## Deployment actions

A deploy action builds the endpoint configuration, shows the build result and queues a push through the controller. Deploy-rs handles an existing NixOS target, while nixos-anywhere handles a machine that boots the prepared live ISO. The deploy page can generate install media for several targets at once, with a unique identifier and a controller address in each image.

Live statistics and a remote SSH action are available per endpoint when the endpoint and controller allow it. Failed builds and failed deployments are recorded with logs, and the previous generation remains bootable.

## Roles, audit and API

Account and role declarations are shared with the controller through Nix, with no SSO, LDAP or Kerberos dependency. Endpoint actions require an explicit role and are audited. Secrets are never rendered into the browser, logs or diffs, and a read-only mode is available for review and audit.

The manager talks to the controller through an HTTP API, and the API contract is versioned. [The controller](/fleet/docs/controller/) describes the service this interface calls, and [Security](/fleet/docs/security/) covers the audit boundary.

## Limits and non-goals

- Not a general-purpose MDM and not a Microsoft Intune clone.
- No Windows endpoint management.
- No database as the source of truth, because Git and Nix files are authoritative.
- No editing outside the managed configuration root.
- No automatic merge of conflicting changes, which are shown to a person.
- No AI-written policies and no automatic remediation.
- No public multi-tenant service, since one controller manages one fleet.
- No SSO, LDAP or Kerberos integration.
- The same option-shape limitations as `nix-settings-gui`.
