---
title: "Kubernetes Deprecates IPVS kube-proxy Backend in 1.35"
description: "The IPVS backend for kube-proxy is officially deprecated as of Kubernetes 1.35 and will be removed in 1.40. Learn why and how to migrate."
date: 2026-11-21 18:00:20 +0530
tags: rollup, open-source, kubernetes, networking, devops
image: "https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070"
featured: false
---

# The End of an Era for IPVS in Kubernetes

Kubernetes SIG Network just announced the official deprecation of the IPVS backend for kube-proxy as of version 1.35, with removal planned for 1.40. If you've been running IPVS in your clusters, this is your signal to start planning a migration strategy. I want to walk you through what happened, why it matters, and what your options are.

## Why IPVS Seemed Like the Future

Back in 2017, the iptables backend was causing real pain at scale. I'm talking about clusters where kube-proxy would consume 100% of a CPU core just processing service updates. The problem was architectural: every service change meant rewriting the entire iptables ruleset from scratch, and with hundreds or thousands of endpoints, this became prohibitively expensive.

IPVS promised a better way. It uses hash tables instead of linear rule matching, which meant both connection establishment latency and control plane update latency improved dramatically. For large-scale deployments, IPVS genuinely solved a pressing problem. The kernel IPVS subsystem also offered advanced scheduling options that iptables simply couldn't match.

But here's the thing about open source projects: the people who champion a solution often move on to other things. When the original IPVS maintainers did, the cracks started showing.

## The Technical Reality Check

IPVS had two fundamental problems that became increasingly obvious over time.

First, the kernel IPVS API itself has architectural mismatches with how Kubernetes implements services. Without batch update operations, IPVS's advantage evaporates when you're making large numbers of changes at once. Additionally, IPVS simply couldn't implement all the edge cases of Kubernetes Service functionality, so kube-proxy had to fall back to iptables anyway. This meant you weren't actually escaping the scaling problems you were trying to avoid.

Second, those fancy IPVS schedulers everyone got excited about? They don't actually work well in kube-proxy's distributed architecture. Each node runs its own kube-proxy instance without shared state. Advanced schedulers like Maglev Hashing were designed for specific two-layer load balancer designs that kube-proxy simply isn't structured to provide. You get random selection regardless.

Adding to this is the long-term support problem: Red Hat is planning to remove the iptables API entirely from RHEL, which means the IPVS backend dies with it.

## The Renaissance of iptables (Yes, Really)

Meanwhile, something interesting happened with the iptables backend. Instead of accepting its limitations, the Kubernetes community systematically optimized it. The generated rulesets got trimmed of redundancies. The code that generates them was rewritten to be more efficient, reducing CPU and memory spikes during resyncs. Most importantly, kube-proxy switched from reading the entire ruleset before updating it to assuming correctness and only verifying on failure. This single change was massive because reading iptables at scale is genuinely slow.

More recently, kube-proxy now only updates rules for services and endpoints that actually changed, rather than rewriting everything. The 2026 iptables backend bears little resemblance to the 2017 version that inspired IPVS in the first place.

## nftables: The Right Abstraction

But the real winner here is the nftables backend, which became generally available in Kubernetes 1.33. I think of nftables as what you'd design if you sat down and asked: "what would a modern packet filtering framework look like if we were building it today?" It has batch operations, cleaner APIs, and performance characteristics that make both iptables and IPVS look comparable.

The good news for operators: the migration path is straightforward. If you're on Kubernetes 1.36+ with kernel 5.13+, you can switch to nftables by simply changing your kube-proxy ConfigMap from `mode: ipvs` to `mode: nftables` and restarting the pods. The performance is essentially equivalent to IPVS with better maintainability and full feature support.

If you can't upgrade to nftables yet, iptables is now genuinely viable. You'll need to reboot nodes rather than just restart kube-proxy, but the performance improvements over the years make it a solid option for most workloads.

## What This Means for You

If you're running IPVS, this deprecation window gives you roughly 3-4 years to plan your migration. That's plenty of time. For new deployments, there's simply no reason to choose IPVS anymore. For existing deployments, I'd prioritize upgrading to nftables if your infrastructure allows it.

The broader lesson here matters: sometimes the right solution isn't the one that performs best in initial benchmarks, but the one that's architecturally sound and built on abstractions that actually match your use case. IPVS optimized for a problem that didn't ultimately need that kind of optimization, while the real gains came from rethinking the entire approach at the iptables level and then eventually replacing it entirely.

One question lingers though: if we'd understood the tradeoffs better in 2017, would we have taken a completely different path to container networking, and would today's infrastructure look fundamentally different?