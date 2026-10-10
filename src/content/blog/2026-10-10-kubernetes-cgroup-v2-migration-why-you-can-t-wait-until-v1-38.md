---
title: "Kubernetes cgroup v2 Migration: Why You Can't Wait Until v1.38"
description: "Kubernetes is sunsetting cgroup v1. Here's what developers need to know about the migration timeline, the benefits of v2, and why waiting isn't an option."
date: 2026-10-10 18:00:21 +0530
tags: rollup, open-source, kubernetes, linux, container-runtime
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
featured: false
---

I've been watching the Kubernetes project move toward cgroup v2 for years, and the timeline just got a lot more urgent. Starting with Kubernetes v1.35, the failCgroupV1 flag defaults to true, which means kubelet won't even start on cgroup v1 nodes anymore. If you're still running v1 infrastructure, this is your wake-up call.

When Kubernetes launched in 2014, cgroups v1 was the only option. Linux kernel 4.5 introduced v2 in 2016, but adoption has been gradual. I understand the hesitation to migrate. Legacy infrastructure feels stable, and change introduces risk. But the Kubernetes project has decided: cgroup v1 is moving into maintenance mode, and removal is tracked in KEP-5573. If you're on v1.35 or later, every Linux node must run cgroup v2 or you need to explicitly set the temporary override.

## Why cgroup v2 Actually Matters

It's not just about following deprecation timelines. cgroup v2 offers real technical advantages that make your clusters better.

First, the architecture is fundamentally different. cgroup v1 has multiple independent hierarchies. You configure CPU shares separately from memory limits, and they don't always talk to each other cleanly. cgroup v2 provides a single unified hierarchy with a more consistent interface. This sounds abstract, but it means resource enforcement is more predictable and easier to reason about.

Second, v2 officially supports delegation to unprivileged users, which v1 explicitly warns against. Most rootless container implementations already rely on this. If you're thinking about moving toward rootless containers or tighter security boundaries, cgroup v2 is mandatory.

Third, and this matters for modern workloads, Memory QoS is only available on cgroup v2. This alpha feature (stable since v1.22, still in alpha in v1.36) separates memory throttling from reservation and adds tiered memory protection. When enabled with the MemoryQoS feature gate, it applies memory.high throttling to Burstable containers based on their requests and limits. You can't get this on v1.

There's also in-place Pod vertical scaling, which graduated to stable in v1.35. When Kubernetes v1.36 enabled Pod-level resource scaling by default, it required cgroup v2 for accurate aggregate enforcement. If you want to resize Pods without disruption, you need v2.

## The Migration Path Isn't as Scary as It Sounds

I've watched teams approach this migration with unnecessary anxiety. In reality, the path is straightforward if you plan ahead.

If you're using kubeadm, Kubernetes v1.35 introduces stricter preflight checks. The SystemVerification check returns an error during init, join, and upgrade when it detects cgroup v1 with kubelet v1.35 or later. This is actually helpful because it forces the conversation early rather than letting you deploy and discover issues later.

For kubeadm-managed clusters, the recommendation is clear: use the systemd cgroup driver. kubeadm manages kubelet as a systemd service, so this alignment just makes sense. Starting with Kubernetes v1.34, automatic cgroup driver detection through the CRI graduated to stable, which means if you're running containerd v2.0+ or CRI-O v1.28+, the kubelet detects the runtime's preferred driver automatically. If you're stuck with older runtimes that don't support RuntimeConfig CRI RPC, you can manually override the kubelet configuration.

The key step: migrate every Linux node to cgroup v2 before upgrading to v1.35. Or, if you're already past that version, confirm every node runs v2. Under default configuration, any remaining v1 nodes will fail kubelet startup.

## What You Need to Know About cgroup v2 Behavior

One detail I'd pay attention to: in cgroup v1, the kubelet treats active_file memory as non-reclaimable. For I/O-intensive workloads with large page caches, this can cause false memory pressure signals and Pod evictions. Migrating to v2 doesn't fix this by itself, but the workaround is well-documented: set equal memory requests and limits for I/O-intensive containers after measuring appropriate values.

CPU scheduling also changes subtly. cgroup v1 uses cpu.shares while v2 uses cpu.weight. Newer OCI runtimes like crun v1.23 and runc v1.3.2 implement an improved non-linear conversion that preserves default priority and gives small CPU requests better granularity. If you've built monitoring or policy tools that predict exact cpu.weight values, they'll need updates after runtime upgrades.

OOM behavior is another point to consider. On cgroup v2 nodes, kubelet defaults singleProcessOOMKill to false, which means when OOM happens, all processes in a container are killed together rather than one at a time. This prevents partially functioning multi-process containers from lingering.

## The Timeline Is Real

I want to be direct about this: the removal of cgroup v1 support is scheduled for Kubernetes v1.38. The current release is v1.36. That's maybe eighteen months away depending on when you read this. If you haven't started planning your migration, now is the time.

The Kubernetes project isn't being aggressive here. v2 has been stable for over a year, and Linux kernel support is mature. The deprecation policy exists specifically to give teams like yours a clear runway.

What will your cluster look like when v1.38 arrives?