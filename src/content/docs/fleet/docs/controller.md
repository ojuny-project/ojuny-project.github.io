---
title: The controller
description: The Ojuny Fleet Controller host, its services, and its deployment engine.
sidebar:
  order: 6
type: reference
audience: operator
appliesTo: ojuny-fleet-controller
source: ~/repos/ojuny-future-repos/ojuny-fleet-controller/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Fleet is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The Ojuny Fleet Controller is the server side of the fleet line, shortened to OFC. It is a template flake for a headless NixOS host that carries the management stack, the deployment path and the shared services which keep endpoints reachable, patched and backed up.

## Repository layout

| Path | Purpose |
| --- | --- |
| `flake.nix` | Server host and service modules |
| `modules/fleet/` | Controller service and data paths |
| `modules/ofm/` | Web interface service |
| `modules/vpn/` | Endpoint connectivity |
| `modules/cache/` | Hydra and `nix-serve-ng` |
| `modules/storage/` | NFS and backup targets |
| `modules/dns/` | Internal DNS and reverse proxy |
| `modules/deploy/` | Deploy-rs and nixos-anywhere orchestration |
| `modules/endpoint/` | Integrated `ojuny-endpoint` template |
| `modules/auth/` | Nix-declared accounts and roles |
| `modules/audit/` | Action and access logs |
| `modules/images/` | Install media generation |
| `docs/` | Architecture, network, security and operations |
| `tests/` | VM and service checks |

## Services

The controller service owns the managed configuration tree, policy evaluation and the deployment queue. The manager runs behind the internal reverse proxy and shares the account declarations with the controller.

The remaining services provide shared infrastructure for enrolled machines. The VPN keeps endpoints reachable without inbound ports where the network allows it, and the cache pair of Hydra and `nix-serve-ng` serves builds over that VPN. NFS shares carry device-level and user-level access, while centralized incremental backup copies endpoint home directories with retention and scope policies. Internal DNS and an HTTP(S) proxy give services stable names, and an optional Git host can hold the managed flake and endpoint repositories.

## Deployment engine

The deployment engine builds and pushes with deploy-rs for an existing NixOS target, and provisions new machines with nixos-anywhere. An install-media builder produces pre-addressed live ISOs, one per concurrent deployment target, so a USB device does not need to be reflashed for every machine. The controller records what was built and what was pushed for each deployment.

## Network model

Endpoints connect out to the controller over the VPN, and the controller deploys over the VPN address, so an endpoint does not need a public address. The design prefers a closed-port setup with no port forwarding, and any forwarded port that a VPN technology requires is documented per deployment. Firewall defaults deny inbound traffic except the documented service ports.

Internal DNS resolves controller services for enrolled endpoints, and the reverse proxy terminates TLS with a controller-generated CA that enrolled endpoints trust. The operations documentation covers the network diagram, the open ports and the certificate rotation steps.

## Accounts and audit

Accounts, groups and roles are declared in Nix and deployed with the controller configuration. There is no SSO, LDAP or Kerberos dependency. The controller recognizes four roles: administrator, operator, auditor and read-only.

Every write, build, deployment and login is audited. Secrets for VPN, cache signing and deployment are stored outside the Nix store and never written to the managed repository. Recovery access is documented and tested.

## Limits and non-goals

- Not a drop-in Entra ID or Intune replacement.
- No cloud service, because the controller is self-hosted.
- No Windows endpoint management.
- No guarantee that every network permits a port-free VPN.
- No multi-controller high availability in the first scope.
- No automatic policy authoring by AI and no automatic remediation.
- No telemetry sent outside the fleet.
- No built-in support team or certification program.

## Read next

[The manager](/fleet/docs/manager/) covers the web interface, and [endpoints](/fleet/docs/endpoints/) covers the machines this controller manages. [Requirements](/fleet/docs/requirements/) lists the dependencies, while [Security](/fleet/docs/security/) covers the trust boundary and [Troubleshooting](/fleet/docs/troubleshooting/) records the failure behavior.
