---
title: "Kubernetes v1.38: Breaking Changes Every DevOps Team Should Know"
description: "Kubernetes v1.38 brings significant deprecations and removals. Here's what developers need to change before December 2026."
date: 2026-11-26 00:00:20 +0530
tags: rollup, open-source, kubernetes, devops, cloud-native
image: "https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070"
featured: false
---

Kubernetes v1.38 is shaping up to be one of those releases that demands attention. While it brings some nice features like stable pod-level resources and the EvictionRequest API, the real story here is the cleanup happening under the hood. I'm seeing several deprecations that will force teams to actually do work before upgrading, and I think that's healthy for the ecosystem.

## The WebSocket Transition is Finally Complete

Let me start with something that feels overdue: kubectl is ditching SPDY for WebSockets, and the escape hatches are closing. Since v1.30, kubectl has preferred WebSockets for exec, attach, and cp operations. If your team has been setting `KUBECTL_REMOTE_COMMAND_WEBSOCKETS` or `KUBECTL_PORT_FORWARD_WEBSOCKETS` environment variables to disable this, that's stopping in v1.38.

I get it, legacy environments exist. But here's the thing: this transition has been coming for years. WebSockets are more reliable, better supported by proxies, and frankly, SPDY is ancient history. If you haven't already, audit your CI/CD pipelines and automation scripts now. Any hardcoded environment variables disabling this behavior need to go. The good news? WebSockets will still fall back to SPDY if needed, so you're not losing compatibility, just predictability.

## cgroup v1 is on Borrowed Time

This one matters if you're running production Kubernetes. Support for cgroup v1 has been the walking zombie of the Kubernetes project for too long. Since v1.35, the kubelet requires you to explicitly set `failCgroupV1: false` to run on cgroup v1 systems. In v1.38, that option still exists, but I'd treat it as a band-aid, not a solution.

The project is planning to remove cgroup v1 support entirely in a future release. If your infrastructure team hasn't already started the migration to cgroup v2, this is your wake-up call. This isn't something you can procrastinate on. Test your workloads on cgroup v2 now, build migration runbooks, and get ahead of this before you're forced to upgrade mid-cycle.

## The Container Runtime Must Be Ready

One of the more subtle but impactful changes in v1.38 concerns how the kubelet discovers the cgroup driver from your container runtime. The old configuration mechanism is being deprecated, and the kubelet now requires the runtime to report this information via the CRI RuntimeConfig RPC.

This has real consequences. Your container runtime must be running and responding before the kubelet starts. If the runtime can't report the cgroup driver, the kubelet exits with an error before even registering the node. For most teams running modern container runtimes, this is fine. But if you're running anything outdated or custom, you need to test this scenario immediately.

The `cgroupDriver` field in kubelet configuration is also being deprecated, and it will be rejected unless you enable the temporary `LegacyCgroupDriverFallback` feature gate. If you're using kubeadm, it will stop setting `cgroupDriver` to systemd by default. This is part of a larger philosophical shift: let the runtime tell Kubernetes what it supports, rather than the other way around.

## kuberc Finally Grows Up

On the positive side, kuberc is graduating from beta to stable in v1.38. This is the separate configuration file for kubectl user preferences, aliases, and credential plugin policies. If you've been using the beta `kubectl.config.k8s.io/v1beta1` API and have allowlist entries using the `name` field as an alias for `command`, you need to migrate them to use `command` directly.

The stable API won't include the `name` field at all, so this change is non-negotiable. If you're managing many kubectl configurations across your organization, audit them now and update any affected entries. It's a small change, but it's easy to miss in a large infrastructure.

## Pod-Level Resources and Swap Limits

Pod-level resources are graduating to stable, which is excellent for workload orchestration. But there's a behavioral change worth highlighting: on Linux nodes using cgroup v2 with LimitedSwap enabled, the kubelet in v1.38 will start enforcing swap limits based on pod-level memory settings.

This means if a pod's memory request equals its memory limit, it gets zero swap, even if individual containers have headroom. If you're running workloads that depend on swap behavior, test this extensively before upgrading. Check the official release notes for detailed guidance.

The industry seems to be moving toward a more explicit, declarative approach to resource management. That's good for predictability and debugging, but it demands more precision from operators.

Kubernetes v1.38 isn't revolutionary, but it's decisive. The project is cleaning house, removing legacy compatibility layers, and pushing teams toward modern configurations. How ready is your infrastructure for change?