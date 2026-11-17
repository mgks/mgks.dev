---
title: "Kubernetes Deprecates IPVS kube-proxy: What You Need to Know"
description: "IPVS is being deprecated in Kubernetes 1.35 and removed by 1.40. Learn why the experiment failed and how to migrate to nftables or iptables."
date: 2026-11-17 18:00:20 +0530
tags: rollup, open-source, kubernetes, networking, devops
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
featured: false
---

# When Good Experiments End: The IPVS Story

Kubernetes just deprecated the IPVS backend for kube-proxy, and if you're running it in production, you need to start planning your migration now. The project will remove IPVS entirely by Kubernetes 1.40, so this isn't optional. But beyond the practical migration concerns, this deprecation tells us something important about infrastructure decisions and the long-term costs of architectural mismatches.

I find the IPVS story fascinating because it's a textbook example of a well-intentioned optimization that looked great on paper but fell apart when meeting reality.

## Why IPVS Existed

Back in 2017, the Kubernetes team identified two serious performance problems with the iptables backend. First, data plane latency was sluggish because every new connection had to traverse an O(n) series of rules. Second, control plane latency was catastrophic because kube-proxy would rewrite the entire ruleset on every service or endpoint change. In massive clusters, kube-proxy burned 100% CPU just keeping up with updates.

IPVS seemed like the perfect solution. The kernel IPVS subsystem uses hash tables instead of linear rule matching, and its API didn't support batch operations (which sounds like a limitation, but actually forced the design to make smaller, incremental updates rather than rewriting everything).

For a while, it worked. Early adopters saw real performance gains, and IPVS gained traction in large deployments. The promise was genuine.

## The Cracks Appeared

But maintaining IPVS proved difficult. The original authors moved on, and as larger clusters started using it, new scaling problems emerged. Here's where it gets interesting: IPVS still needed iptables and ipset for features beyond basic load balancing, which meant it couldn't fully escape the scaling problems it was supposed to solve. And when you need to make many changes at once, IPVS without batch operations became *slower* than iptables, not faster.

There's also a maintenance burden nobody anticipated. Since IPVS depends on the iptables API, and Red Hat is removing iptables from RHEL entirely, IPVS inheritance that sunset problem automatically. A deprecated underlying API means your optimization layer becomes unmaintainable.

Then there's the scheduler complexity. Users were excited about IPVS schedulers beyond random selection, but kube-proxy's distributed nature breaks most scheduler assumptions. Each node's kube-proxy makes endpoint decisions independently without coordinating with other nodes, so sophisticated load balancing strategies like Maglev Hashing can't actually work as intended.

## The Real Lesson

The IPVS story teaches me that architectural fit matters more than raw performance. A feature that solves the immediate problem but misaligns with your system's design philosophy creates long-term debt. The Kubernetes team recognized this and built nftables as the real solution.

## What You Should Do

If you're on Kubernetes 1.36 or later with kernel 5.13+, switch to nftables. It's fully supported, feature-complete, and performs as well as or better than IPVS. The migration is straightforward: update your kube-proxy ConfigMap and restart the pods.

For older clusters that can't use nftables, migrate to iptables instead. This might surprise you, but the iptables backend has improved dramatically since 2017. The Kubernetes team optimized ruleset generation, eliminated redundant rules, implemented incremental updates, and reduced CPU/memory usage. Performance and scaling are genuinely better now.

The key insight is that sometimes the best optimization is the one that fits your architecture properly rather than fighting against it. iptables is boring and unsexy, but it evolved to handle modern scale in ways that work with kube-proxy's design. That's worth more than a cutting-edge technology that doesn't quite fit.

For deeper context on how these proxying backends work, check out the [Kubernetes networking fundamentals](https://mgks.dev/tags/networking/) or explore what the [cloud-native ecosystem](https://mgks.dev/tags/infrastructure/) is standardizing around these days.

The deprecation timeline is clear: 1.40 removes IPVS entirely. That's your deadline to act, but honestly, if you're comfortable with infrastructure changes, there's no good reason to wait. The question isn't whether to migrate, but whether you're ready to admit that sometimes the more elegant solution is also the simpler one.