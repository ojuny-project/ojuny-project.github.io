---
title: Security model
description: The trust boundary, account model, audit scope, and network posture for Fleet.
sidebar:
  order: 9
type: explanation
audience: operator
appliesTo: ojuny-fleet-controller, ojuny-fleet-manager
source: ~/repos/ojuny-future-repos/ojuny-fleet-controller/DRAFT.md, ~/repos/ojuny-future-repos/ojuny-fleet-manager/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Fleet is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Fleet places the controller at the center of trust. The controller owns the host, the services, the network and the deployment engine, while the manager is a web interface that edits the managed configuration tree. Enrolled endpoints trust a controller-generated CA and accept configuration from the controller.

## Trust boundary

Accounts, groups and roles are declared in Nix and deployed with the controller configuration, with no SSO, LDAP or Kerberos dependency. An endpoint accepts configuration and TLS material from the controller, and the controller records what it built and pushed. The trust boundary therefore runs between the controller host and every enrolled endpoint.

## Accounts and roles

The controller recognizes four roles: administrator, operator, auditor and read-only. Endpoint actions require an explicit role and are audited. The manager prohibits editing outside the managed configuration root and keeps read-only mode available for review and audit.

Accounts and roles are declared in Nix, so a change follows the same review and rebuild flow as the rest of the configuration. There is no external identity provider in the model.

## Audit

Every write, build, deployment and login is audited. A controller restart preserves the deployment queue and the audit log, and the manager records failed builds and deployments with logs. Audit entries live in the controller's audit module and appear on the manager logs page.

## Secrets and certificates

Secrets for the VPN, cache signing and deployment are stored outside the Nix store and never written to the managed repository. The manager never renders secrets into the browser, logs or diffs.

TLS terminates at the reverse proxy with a controller-generated CA that enrolled endpoints trust. Certificate, VPN and cache-key rotation are operational tasks handled on the controller.

## Network posture

Firewall defaults deny inbound traffic except the documented service ports. The design prefers a closed-port setup with no port forwarding, and any forwarded port that a VPN technology requires is documented per deployment. Not every network permits a port-free VPN, and Fleet sends no telemetry outside the fleet.

## Project posture

The project scope says Ojuny is not a security-focused distribution. Its rule is that upstreams are secure by default and Ojuny does not break that, with secure defaults such as a firewall, sandboxed builds and rollback. The project does not make bold security claims and names malicious patches as the main introduced threat. See [Patch security](/patches/security/) and the [project doctrine](/doctrine/).

## Limits and boundaries

- Not a drop-in Entra ID or Intune replacement, and not a general-purpose MDM.
- No Windows endpoint management.
- No multi-controller high availability in the first scope.
- No built-in support team or certification program.
- No SSO, LDAP or Kerberos integration.
- Secure defaults are not a guarantee of security.

[Endpoints](/fleet/docs/endpoints/) covers what a managed machine receives, and [the controller](/fleet/docs/controller/) lists the services in this boundary. [Troubleshooting](/fleet/docs/troubleshooting/) records recovery and rotation behavior.
