---
title: Installation
description: The install journey and install media for the home server.
sidebar:
  order: 2
type: tutorial
audience: operator
appliesTo: ojuny-home-server-installer
source: ~/repos/ojuny-future-repos/ojuny-home-server-installer/DRAFT.md
---

<!-- unreleased-marker -->
> **Unreleased.** Ojuny Home Server is not released. This page is unreviewed, may contain placeholders, and is subject to change without notice.

The installer turns a blank machine into a running server without a shell: you burn the image to a USB, boot the machine, answer a small number of questions, and arrive at the web panel login.

Check [requirements](/home-server/docs/requirements/) before you pick a machine, then read [configuration](/home-server/docs/configuration/) for what the panel does after the handoff.

## Install media

Five images cover different machines and networks:

- Attended online ISO.
- Attended offline ISO with the Home Server closure.
- Attended discovery ISO using local Ojuny cache peers.
- Unattended ISO with a declarative answer file.
- A raw disk image for dedicated small-form-factor hardware.

## The install flow

The install flow follows ten numbered steps, from the boot menu to the panel dashboard.

1. Boot the media and select the Home Server template.
2. Select the system disk, and never select a data disk by accident.
3. Optionally encrypt the system disk before the install writes to it.
4. Configure the hostname and the network settings for the machine.
5. Create the first administrator account for the panel.
6. Optionally select the data disks that will join the storage pool.
7. Install the system on the selected disk and reboot the machine.
8. Print or display the panel URL and a one-time setup token.
9. Complete the first-run wizard in the browser.
10. Enable services from the panel, where nothing beyond the panel is on by default.

## First-run wizard

The wizard confirms the administrator account and password, then creates the storage pool and first share if a data disk was selected. It shows every optional service as disabled and enables them one at a time, with DNS and the proxy offered as options.

The wizard also configures the VPN and shows the port-forward requirement where one applies. It ends on the service dashboard with every enabled service linked, and it explains how to add an Ojuny client share patch to a desktop or server.

## Limits

The installer targets `x86_64-linux` only, and the unattended path wipes the selected system disk and leaves Wi-Fi unconfigured.

Automatic port forwarding is not part of the install, and there is no high-availability or cluster install. No cloud account and no remote install service are involved.

## Next

- [Requirements](/home-server/docs/requirements/)
- [Configuration](/home-server/docs/configuration/)
- [Storage and shares](/home-server/docs/storage/)
- [Recovery](/home-server/docs/recovery/)
