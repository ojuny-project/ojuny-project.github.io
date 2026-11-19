---
title: Troubleshooting
description: Failure behavior, network failures, and operational boundaries for Fleet.
sidebar:
  order: 5
type: how-to
audience: operator
appliesTo: ojuny-fleet-controller, ojuny-fleet-manager
source: ~/repos/ojuny-future-repos/ojuny-fleet-controller/DRAFT.md, ~/repos/ojuny-future-repos/ojuny-fleet-manager/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Fleet is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Fleet reports failures through the manager and the controller logs, and a failed deployment leaves the endpoint on its previous generation. This page covers the failure behavior an operator can rely on and the network conditions that change it.

## Deployment failures

A failed deployment leaves the endpoint on its previous generation, which keeps the prior system bootable. Failed builds and failed deployments are recorded with logs, and the deploy page shows the build result before a push is queued. The controller records what it built and what it pushed for each deployment.

## Save and option errors

A rejected save leaves the working tree unchanged. Saves are all-or-nothing: a parse check with `rnix` and a format with `nixfmt` run before an atomic write and a commit. A list-nested option is reported as unsupported rather than silently edited, which points back to the module shape rules on the [configuration page](/fleet/docs/configuration/) in full.

## Controller state

A controller restart preserves the deployment queue and the audit log. The cache serves a path that Hydra built, and a backup restore round-trips a home directory. The controller test set checks each of these conditions against a running service in a VM.

## Network failures

Endpoints reach the controller over the VPN, so a broken tunnel removes the management path as well as the deployment path. The controller prefers a closed-port design and requires any forwarded port to be documented per deployment. Not every network permits a port-free VPN, which makes the network a deployment-specific constraint rather than a fixed fleet assumption.

## Operational boundaries

- Account actions and endpoint actions require an explicit role and are audited.
- Secrets for the VPN, cache signing and deployment stay outside the Nix store and never enter the managed repository.
- Recovery access is documented and tested.
- Rotation applies to the controller CA, the VPN credentials and the cache signing key.

[Requirements](/fleet/docs/requirements/) lists the service dependencies, and [Security](/fleet/docs/security/) records the trust boundary. [The controller](/fleet/docs/controller/) lists the services behind these behaviors.
