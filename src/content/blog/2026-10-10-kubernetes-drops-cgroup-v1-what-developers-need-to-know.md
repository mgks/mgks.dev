---
title: "Kubernetes Drops cgroup v1: What Developers Need to Know"
description: "Kubernetes v1.35 deprecates cgroup v1 by default. Here's what this means for your infrastructure and how to migrate before it's too late."
date: 2026-10-10 06:00:21 +0530
tags: rollup, open-source, kubernetes, container-orchestration, linux-kernel
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

I've watched container orchestration evolve for over a decade, and the transition from cgroup v1 to v2 represents one of those inflection points that feels gradual until it suddenly isn't. With Kubernetes v1.35, the project has made a hard call: cgroup v1 is moving out, and developers need to plan their migration now.

## The Deprecation That Changes Everything

Let me be direct about what's happening. Starting with Kubernetes v1.35, the `failCgroupV1` flag defaults to true, which means your kubelet simply won't start on nodes running cgroup v1. This isn't a warning or a soft deprecation. This is the Kubernetes project saying "this era is over."

For context, cgroups (control groups) are how Linux manages system resources at the kernel level. Kubernetes uses them to allocate CPU and memory to containers, ensuring your microservices don't starve each other. Version 1 of this system has been around since 2014, but cgroup v2 arrived with Linux kernel 4.5 in 2016. We're now nearly a decade into v2's existence, and Kubernetes is finally making the break.

If you're running Kubernetes v1.34 or earlier, you have breathing room, but not much. The project has committed to completely removing cgroup v1 support by Kubernetes v1.38. That's roughly two release cycles away. If you're still on older versions, the math is simple: migrate now or face forced upgrades under pressure.

## Why This Matters More Than You Think

I get it. Migrations feel expensive. You're thinking about your infrastructure, your testing, your potential downtime. But here's what you should actually be thinking about: cgroup v2 isn't just incrementally better. It's fundamentally different, and those differences unlock capabilities that v1 can't provide.

Cgroup v2 introduces a single unified hierarchy instead of v1's fragmented approach. More importantly for developers, it enables features like Memory QoS with tiered reservations, which is currently in alpha but represents the future of resource management in Kubernetes. If you want accurate memory protection for Guaranteed and Burstable pods, v2 is the only path.

There's also in-place pod vertical scaling, which graduated to stable in v1.35. This feature lets you adjust container resources without restarting pods, and it requires cgroup v2 for accurate enforcement. Staying on v1 means leaving these capabilities on the table.

## The Migration Path Forward

Let me give you the honest assessment: the migration isn't technically complex, but it requires planning. Every Linux node needs to move to cgroup v2 before you upgrade to v1.35. If you're using kubeadm, there's an added wrinkle: the SystemVerification preflight check will error out on cgroup v1 during `kubeadm init`, `kubeadm join`, and `kubeadm upgrade` when running kubelet v1.35 or later.

The tactical move is to configure your kubelet's cgroup driver properly. I recommend using the systemd driver, especially if you're managing your cluster with kubeadm. Modern container runtimes like containerd v2.0+ and CRI-O v1.28+ support automatic cgroup driver detection through the CRI, which graduated to stable in Kubernetes v1.34. This means less manual configuration and fewer surprises.

For developers working with containerized applications, understanding [kubernetes resource management](/tags/kubernetes/) becomes even more critical. You'll want to set appropriate memory requests and limits, particularly for I/O-intensive workloads where page cache behavior differs between cgroup versions.

## The CPU Scheduling Shift

One detail that often gets overlooked: cgroup v2 changed how CPU scheduling works. Where v1 used `cpu.shares`, v2 uses `cpu.weight` with an improved non-linear conversion that's been implemented in modern OCI runtimes like crun v1.23 and runc v1.3.2. This means old CPU share values don't map directly to new weights. If you have monitoring or policy tools predicting exact CPU values, you'll need updates.

This is why I always emphasize the importance of [understanding container fundamentals](/tags/container-orchestration/) before diving into advanced orchestration. The details matter.

## What You Should Do Today

If you haven't already, audit your infrastructure now. Check which cgroup version each Linux node is running. Create a migration plan that includes testing in non-production environments. Review your container runtime's compatibility matrix. If you're on v1.34 or earlier, schedule your upgrade before v1.35 stabilizes in your organization.

For new clusters, there's no debate: use cgroup v2 from day one. For existing deployments, treat this as a priority project rather than something to defer. The Kubernetes project is clearly signaling that this transition is non-negotiable, and waiting until v1.38 will only increase your migration pressure.

The deprecation timeline suggests the Kubernetes community believes cgroup v2 adoption has reached critical mass. The question isn't whether your infrastructure will move to v2. It's whether you'll move on your schedule or Kubernetes's.