---
title: Requirements
description: The service dependencies, network expectations, and test boundary for a Fleet deployment.
sidebar:
  order: 4
type: reference
audience: operator
appliesTo: ojuny-fleet-controller
source: ~/repos/ojuny-future-repos/ojuny-fleet-controller/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Fleet is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

A Fleet deployment runs on a headless NixOS host with Nix flakes, Git, and a set of shared services for connectivity, naming, caching, storage and deployment. The controller repository carries the host configuration and the service modules that provide those dependencies.

## Dependencies

| Dependency | Role in the deployment |
| --- | --- |
| NixOS host | The controller repository is a template flake that provides a headless NixOS system |
| Nix flakes and Git | The managed configuration is a multi-system flake or one flake per endpoint, stored in Git |
| VPN | Endpoints connect out to the controller, and the controller deploys over the VPN address |
| Internal DNS | Controller services get stable names for enrolled endpoints |
| Reverse proxy and CA | TLS terminates at the proxy with a controller-generated CA that enrolled endpoints trust |
| Binary cache | Hydra and `nix-serve-ng` serve the fleet cache over the VPN |
| Storage and backup | NFS shares plus centralized incremental backup of endpoint home directories |
| Deployment tools | Deploy-rs for existing NixOS targets, nixos-anywhere for a machine booting a prepared ISO |
| Git host | An optional service for the managed flake and endpoint repositories |

## Network expectations

The controller prefers a closed-port design with no port forwarding. If the chosen VPN technology requires a forwarded port, the requirement is documented per deployment. Firewall defaults deny inbound traffic except the documented service ports.

Endpoints do not need a public address under this model. They connect out to the controller over the VPN, and deployment traffic returns over the same path. Not every network permits a port-free VPN, so the network is a deployment-specific constraint rather than a fixed fleet assumption.

## Test boundary

The test set is a VM and service checklist, not a hardware certification program. It requires the server flake to evaluate and build, each service to start in a VM and answer on its expected address, and an endpoint to enroll, pull a configuration and receive a deployment. Backup and restore must round-trip a home directory, and a generated install ISO must target the correct controller address.

## Deployment constraints

- One controller manages one fleet.
- Multi-controller high availability is outside the first scope.
- Windows endpoints are not managed.
- A VPN that needs a forwarded port requires that port to be documented for the deployment.
- The fleet uses either one multi-system flake or a repository per endpoint, chosen for the deployment.

See [Installation](/fleet/docs/installation/) for the deployment paths and [Security](/fleet/docs/security/) for the trust boundary. The [controller page](/fleet/docs/controller/) lists the services behind these dependencies.
