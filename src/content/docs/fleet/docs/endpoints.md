---
title: Endpoints
description: The integrated endpoint template, its enrollment path, and what an enrolled machine receives.
sidebar:
  order: 8
type: explanation
audience: operator
appliesTo: ojuny-fleet-controller
source: ~/repos/ojuny-future-repos/ojuny-fleet-controller/DRAFT.md, ~/repos/ojuny-future-repos/ojuny-fleet-manager/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Fleet is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

An endpoint is a machine enrolled in a fleet. Fleet deploys its own integrated `ojuny-endpoint` template to those machines, and that template belongs to the controller repository's managed configuration. There is no separate endpoint repository or standalone endpoint flake.

## Endpoint configuration

Endpoint configuration covers the NixOS system, hardware data and device-bound policies. A server uses the same model with a server-oriented default structure and container support, so the difference between an endpoint and a server sits in the default shape rather than in a second management system.

The [configuration page](/fleet/docs/configuration/) explains how those files are stored and edited. The manager exposes the endpoint declaration, its hardware data and its policies on one page, with deploy, live statistics and remote SSH actions next to them.

## Enrollment

An endpoint joins the fleet, trusts the controller CA and receives its first configuration. Endpoints connect out to the controller over the VPN, the controller deploys over the VPN address, and the endpoint does not need a public address.

The reverse proxy terminates TLS with a controller-generated CA that enrolled endpoints trust. Internal DNS resolves controller services for those endpoints, and the fleet cache is served over the same VPN. Accounts and roles declared in Nix govern fleet actions on the machine.

## Deployment and recovery

Deploy-rs is used for an existing NixOS target, and nixos-anywhere is used for a machine that boots the prepared live ISO. A deployment builds from a commit, and the controller records what was built and pushed. A failed deployment leaves the endpoint on its previous generation, which keeps the prior system bootable.

Pre-addressed live ISOs carry a unique identifier and a controller address, and one image can be retargeted instead of reflashing the USB device. The [installation page](/fleet/docs/installation/) covers that media model and the two deployment paths.

## Fleet services at the endpoint

Enrolled machines use the controller's shared services: internal DNS, the binary cache, NFS shares with device-level and user-level access, and centralized incremental backup. The backup scope covers endpoint home directories while excluding hidden state directories, with retention and scope policies set by the controller. Live statistics and remote SSH are available when the endpoint and the controller allow them.

## Limits

- No Windows endpoint management.
- No guarantee that every network permits a port-free VPN.
- No multi-controller high availability in the first scope.
- No public multi-tenant service, since one controller manages one fleet.

[Security](/fleet/docs/security/) covers the trust boundary between the controller and an endpoint. [Troubleshooting](/fleet/docs/troubleshooting/) records the failure behavior, and [the controller](/fleet/docs/controller/) lists the services an endpoint uses.
