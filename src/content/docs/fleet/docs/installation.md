---
title: Installing and enrolling
description: Deployment paths, install media, and endpoint enrollment for Fleet.
sidebar:
  order: 2
type: how-to
audience: operator
appliesTo: ojuny-fleet-controller
source: ~/repos/ojuny-future-repos/ojuny-fleet-controller/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Fleet is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

Fleet installs endpoints through two paths: deploy-rs handles an existing NixOS target that already runs and can be reached over the network. Nixos-anywhere handles a machine that boots a prepared live ISO and needs a first installation. The controller owns both deployment paths and queues the work, while the manager shows the build result and asks the controller to push it to the target.

## Install media

The install-media builder produces pre-addressed live bootable ISOs, one per concurrent deployment target. Each ISO carries a unique identifier and a controller address. Reusing one USB device for a different deployment target is retargeting rather than reflashing, which avoids writing a new image for every machine.

## Enrollment

An endpoint joins the fleet, trusts the controller CA and receives its first configuration. Endpoints connect out to the controller over the VPN, and the controller deploys over the VPN address, so an enrolled endpoint does not need a public address. The reverse proxy terminates TLS with a controller-generated CA that enrolled endpoints trust.

## Deployment order

1. Prepare the controller host and its shared services, including the VPN, internal DNS and reverse proxy.
2. Confirm that a test endpoint can reach the controller over the VPN and trust its CA.
3. Build an install image for one target, or deploy to an existing NixOS machine.
4. Enroll the endpoint, pull a configuration and record the first deployment.

The endpoint file set carries the NixOS system, hardware data and device-bound policies. Account and network details come from the controller configuration rather than a separate endpoint image.

## Related pages

The [requirements page](/fleet/docs/requirements/) lists the service dependencies and network expectations. The [endpoints page](/fleet/docs/endpoints/) covers what an enrolled machine receives, and [troubleshooting](/fleet/docs/troubleshooting/) records the failure behavior.
