---
title: Fleet overview
description: What the Fleet controller, manager, and integrated endpoint role do.
sidebar:
  order: 1
type: explanation
audience: operator
appliesTo: ojuny-fleet-controller
source: ~/repos/ojuny-future-repos/ojuny-fleet-controller/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Fleet is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Ojuny Fleet is a self-hosted control plane for a set of Ojuny machines. The controller repository provides a template flake for the server host, and the manager repository provides the web interface that edits the managed configuration.

## The two repositories

| Repository | Role |
| --- | --- |
| `ojuny-fleet-controller` | The server host template, shared services, network, deployment engine and the integrated endpoint template |
| `ojuny-fleet-manager` | The web manager, its HTTP API and the fleet pages built on the shared `nix-settings-gui` backend |

The controller uses the short name OFC and the manager uses OFM. OFC owns the host, the services, the network and the deployment engine, while OFM is the web interface that talks to it.

## The control plane model

Fleet uses a model in the style of Entra ID and Intune. Users, groups, endpoints, servers, applications, policies and deployments are managed from one control plane. The implementation is Ojuny-native rather than a compatibility layer for Microsoft products.

Central account control is declarative and runs through Nix, not through SSO, LDAP or Kerberos. Accounts, groups and roles are declared in Nix and deployed with the controller configuration. This keeps the account model inside the same review and rebuild flow as the rest of the system.

## The endpoint role

Fleet deploys its own integrated `ojuny-endpoint` template to enrolled machines. That template is part of the controller repository's managed configuration, and there is no separate endpoint repository. Endpoint configuration covers the NixOS system, hardware data and device-bound policies, while server configuration uses the same model with a server-oriented default structure and container support.

## What Fleet does not manage

Fleet does not manage Ojuny Pro, Console or Home Server installations. It also sits outside the core Ojuny template, which excludes fleet deployment and server tooling from the project it hands to a desktop user. Fleet is a separate line with its own repositories.

## Read next

- [The controller](/fleet/docs/controller/) for the host services and deployment engine.
- [The manager](/fleet/docs/manager/) for the pages and editing model.
- [Endpoints](/fleet/docs/endpoints/) for the integrated template and enrollment.
- [Configuration](/fleet/docs/configuration/) for the policy and file model.
- [Security](/fleet/docs/security/) for the trust boundary.
