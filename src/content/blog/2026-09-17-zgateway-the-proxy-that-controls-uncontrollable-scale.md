---
title: "ZGateway: The Proxy That Controls Uncontrollable Scale"
description: "How Meta's ZGateway proxy layer solved the connection mesh problem at billion-operation scale by moving complexity from clients to infrastructure."
date: 2026-09-17 12:00:20 +0530
tags: rollup, software-engineering, distributed-systems, infrastructure, database-architecture
image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070"
featured: false
---

When you have a million clients talking to half a million database hosts, you don't have a scaling problem. You have a topology problem.

Meta's ZippyDB is the company's foundational key-value store, handling billions of operations per second across their global fleet. For years it operated with direct client-to-database connections, which seemed reasonable at smaller scales. Then the client population kept growing, and the topology turned into a dense many-to-many mesh of TLS connections that was simultaneously wasteful, fragile, and increasingly catastrophic when things went wrong.

Enter ZGateway: a stateless proxy tier that sits between ZippyDB clients and the database fleet. On paper, it's a simple architectural pattern - interpose a managed service between uncoordinated clients and a shared backend. In practice, it solves a structural problem that can't be fixed by tuning client libraries alone.

## The Connection Mesh Problem

I find it useful to model this as a probability problem. Imagine throwing balls (shards a client touches) into bins (database hosts). The number of distinct bins you hit is your fan-out. Multiply that across your entire client population and you get your fan-in: the number of incoming connections each database host sees.

With direct access, fan-in scales linearly with your client population. Every new cohort of clients makes every database host worse. You can't decouple the two fleets because they're directly coupled - like jumping between two moving cars while they're both accelerating.

Each database host was accepting tens of thousands of inbound connections. Each client was holding tens of thousands of outbound ones, mostly idle. Memory, CPU, and file descriptors were being consumed for connections that weren't even being used. Worse, when client fleets restarted or deployed, the sudden drop in connection reuse sent a connection storm through the entire database fleet.

One incident made this explicit: a routing bug caused every client to open one connection per shard. Database hosts hit their file descriptor limit and fell into a reboot loop. The fleet cascaded down because the failure domain was too large to contain.

With ZGateway, that storm hits a fleet you control and can harden centrally. The connection management doesn't disappear; it moves to the one place where it can actually be solved.

## The Asymmetry of Managed Tiers

The architecture achieves something elegant: each client needs only a sticky connection pool to its regional ZGateway hosts. Each database host only sees connections from ZGateway, whose size the infrastructure team controls. With rough numbers, persistent connections drop by roughly 19x end-to-end.

But the real win isn't the one-time reduction. It's the change in scaling behavior. Fan-in moves from being linear in client population to being independent of it, scaled only by regions and shard density per host. An unbounded number driven by everyone else becomes a bounded number you own.

This is why proxies keep showing up in large distributed systems. A <a href="https://mgks.dev/tags/proxy-patterns/">proxy sits in the path of many clients at once</a>, giving it a shared vantage point that no single client can have. The tradeoff is one more hop and one more tier to operate. That tradeoff pays off when your client population is large, diverse, and not yours to change.

## Beyond Connection Management

Once traffic flows through a managed tier, you can move capabilities there that would otherwise live in a million client binaries. ZGateway's batching system is the clearest example.

On the client side, a batcher can only merge its own process's requests. A shared batcher at the proxy can collapse requests across unrelated callers headed for the same shard. It groups requests by use case and physical destination, merging them into single backend RPCs. Every RPC carries fixed overhead - serialization, shard lookup, authorization, syscalls - so batching amortizes all of it across more operations.

The second benefit is subtle: under hot keys, thousands of simultaneous callers collapse into a single backend read. A hot key can never become a stampede against one replica. This is only possible with a shared tier.

For years, customers who wanted cross-client batching had to run fragile client-side libraries that were CPU-hungry and individually tuned. ZGateway let Meta retire that entire category of complexity.

## The Price of Diversity

ZGateway handles >1 billion operations per second and carries about 40% of all ZippyDB traffic while adding only 6% computational overhead. But it does this while serving hundreds of different use cases simultaneously, which creates its own problems.

One misbehaving tenant can't starve the others. ZGateway uses Discriminant Load Shedding to map each request to a per-tenant bucket, drained round-robin. When one tenant floods the system, its bucket fills and excess requests are shed while other tenants keep executing. In testing at >90% CPU, only 6 actual noisy neighbors were shedding requests while ~1,344 other tenants executed 99.9% of their requests with zero rejections.

This is control theory applied to infrastructure: dynamic load balancing that adjusts per-host weights based on CPU utilization in real time, with guardrails that prevent weights from drifting or thrashing too frequently.

The deeper lesson here is that <a href="https://mgks.dev/tags/distributed-systems/">distributed systems architecture is about choosing where to concentrate complexity</a>, and whether that choice actually buys you control over your failure modes.