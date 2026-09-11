---
title: "Why Proxies Win at Scale: ZGateway's Lessons for Platform Teams"
description: "How Meta's ZGateway proxy tier solved the connection mesh problem at scale, and what this teaches us about infrastructure design choices."
date: 2026-09-11 12:00:20 +0530
tags: rollup, software-engineering, proxy-architecture, distributed-systems, platform-engineering
image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070"
featured: false
---

I've spent enough time debugging distributed systems to know that the simplest design often breaks worst at scale. Direct access sounds right when you're building the first version. Everyone talks to everyone, no middleman. But Meta's ZGateway teaches us something crucial: sometimes adding a tier is the only way to remove complexity.

The problem ZGateway solves is deceptively simple. A million ZippyDB clients, each holding tens of thousands of outbound connections to hundreds of thousands of database hosts, creates a dense connection mesh. Each connection sits mostly idle, consuming memory, CPU, and file descriptors on both ends. When a client cohort restarts or deploys, the fleet gets hit with a reconnection storm. At scale, this isn't inefficiency—it's a reliability limit that kills the database.

The direct-access model made sense initially. Low latency, simple, nothing to operate. But adoption creates a scaling problem that no client-side fix can solve cleanly. Two systems are moving: the client fleet changes its pooling policies while the database fleet consolidates on its own schedule. Coupling them directly is like jumping between two moving trains.

## The Proxy Thesis

A proxy collapses that chaos into something bounded. ZGateway sits between clients and ZippyDB, reducing a many-to-many mesh into two controlled hops. This isn't just about connection count. It's about who owns the problem.

In the direct model, a reconnection bug that makes each client open one connection per shard can crash the entire database fleet. The bug propagates across a million binaries you can't change quickly. With ZGateway, that storm hits a fleet you control, observe, and can harden in real time. Connection management becomes a one-time infrastructure problem instead of a million-instance bug.

I think about this whenever I hear teams say "we can't add a proxy, it adds latency." They're not wrong about the hop. But at scale, that hop buys you something more valuable than microseconds: it buys you control. ZGateway adds only about 6% computational overhead while carrying 40% of all ZippyDB traffic. The math works because the alternative—dealing with a flaky, distributed client fleet—costs way more.

The asymmetry of connection counts is the key insight. Each client needs only a sticky pool to its regional gateway. Each database host sees connections only from the gateway tier, whose size you control. Fan-in—the load on each database host from all clients—shifts from being linear in your client population to being independent of it. An unbounded problem becomes a bounded one.

## Batching Across Clients

But the real magic of a shared tier is what only it can do: combine work across unrelated callers.

A client-side batcher can only merge its own process's requests. A shared batcher groups requests from thousands of simultaneous callers headed for the same shard and sends one RPC to the backend. The fixed overhead of each RPC—Thrift serialization, shard lookup, authorization—gets amortized across many operations. You get fewer, larger backend requests, lower QPS, steadier load.

For hot keys, this is transformative. Thousands of simultaneous callers collapse into a single backend read. A hot key can never become a stampede against one replica. For years, customers wanted this batching behavior, so they ran fragile client-side libraries that were CPU-hungry and individually tuned. ZGateway let Meta retire them. One shared batcher replaced a million custom implementations.

I'm struck by how this generalizes. Services with a shared connection tier naturally become the home for any capability that would otherwise require reimplementation across clients. Load shedding, caching, failover hedging, admission control, per-tenant isolation. These all live better in [infrastructure layers](https://mgks.dev/tags/platform-engineering/) than distributed across a thousand services.

## Safe Migration at Scale

Moving all your traffic through a proxy is high-stakes. ZGateway's answer is incremental, reversible, and scoped: configuration flags per service and shard prefix control which traffic routes through the gateway. A percentage knob ramps it up. Region filters limit blast radius. A global kill switch enables instant rollback. Zero code changes in clients.

This is discipline. Too many infrastructure projects assume they can migrate everything at once. ZGateway treats the migration as a first-class concern with dedicated safety mechanisms.

Isolation across tenants matters too. When one customer's traffic floods the tier, [load shedding based on discriminant buckets](https://mgks.dev/tags/distributed-systems/) keeps every other customer executing 99.9% of their requests with zero rejections. Structure buys correctness in a way that tuning parameters never does.

The lesson isn't specific to databases or proxies. It's about recognizing when a problem has crossed from "optimization" into "architectural limit" and having the discipline to solve it at the tier that can. Sometimes the simplest design needs to fail at scale before we're willing to add the complexity that fixes it.