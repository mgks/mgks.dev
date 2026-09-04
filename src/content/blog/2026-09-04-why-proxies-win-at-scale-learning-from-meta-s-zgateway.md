---
title: "Why Proxies Win at Scale: Learning from Meta's ZGateway"
description: "How interposing a stateless proxy tier between millions of clients and a shared backend solves reliability and efficiency problems that client libraries cannot."
date: 2026-09-04 18:00:20 +0530
tags: rollup, software-engineering, infrastructure, distributed-systems, proxy-architecture
image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070"
featured: false
---

I've been thinking a lot lately about the architecture decisions that only make sense at extreme scale. Meta's ZGateway is one of them, and it teaches a lesson that applies far beyond their infrastructure.

The problem ZGateway solves sounds mundane on the surface: a million clients, each touching tens of thousands of database hosts, each managing its own connection pool. But that mundane setup creates a catastrophe. Every client opens thousands of outbound connections. Every database host accepts thousands of inbound ones. It's a dense mesh of TLS connections, mostly idle, consuming memory and file descriptors on both ends. When a client cohort restarts or a deploy rolls out, that mesh becomes a reconnection storm that can crash the entire fleet.

The direct solution seems obvious: fix it in the client library. But here's where scale changes everything. You have a million clients owned by hundreds of teams, changing at different velocities. You can't coordinate them. And even if you could, the database fleet is consolidating on its own schedule. Coupling the two tightly means jumping between two moving cars.

## The Proxy as a Decoupling Layer

A proxy decouples them. ZGateway collapses that many-to-many mesh into two bounded hops. Clients connect to a regional ZGateway. ZGateway connects to the database fleet. The connection count drops by roughly 19x, but that's almost beside the point. The real win is the change in scaling behavior.

In the direct model, database-host fan-in grows linearly with client population. Every new client cohort makes every database host slightly worse. With ZGateway, that linear growth disappears. Fan-in becomes a function of regions times shard density, controlled by the infrastructure team. An unbounded variable driven by everyone else becomes a bounded variable you own.

This isn't unique to Meta. Proxies appear everywhere large, diverse client populations talk to shared backends: connection poolers, service mesh sidecars, CDNs, API gateways. The pattern emerges when the trade-off makes sense: you add a hop and another tier to operate, but you get back the ability to coordinate behavior across unrelated callers. That asymmetry only pays off at scale. With a small client population, it's overhead. With a million clients, it's the foundation of reliability.

## Batching Across Clients

Once traffic flows through one tier, it becomes the natural home for capabilities clients would otherwise reimplement independently and poorly. Batching is the clearest example.

A client-side batcher can only merge work from its own process. A shared batcher on the proxy can merge work across clients. If a thousand unrelated callers simultaneously request the same key, ZGateway fetches it once and fans the result out. A hot key never becomes a stampede. For years, Meta's customers who wanted this ran fragile, CPU-hungry client libraries that were individually tuned and a steady source of incidents. Those libraries are gone now.

The batching itself is surprisingly sophisticated. Requests are held in memory and flushed when a time window elapses, payload size crosses a limit, or request count hits a cap. Added latency stays bounded. But holding requests in memory is an OOM risk, so the system ships with two safety mechanisms: idle eviction for slow-burn growth, and an in-flight cap for acute overload. Steady hygiene plus an acute safety valve is what makes batching safe by default.

I find this pattern elegant. It's the infrastructure equivalent of reliability engineering: assume something will go wrong and build the defense into the mechanism itself.

## Control and Observability

Moving traffic onto a proxy is high-stakes. ZGateway controls rollout with client-side configuration flags scoped per service and shard prefix. A percentage knob ramps eligible traffic. A region filter limits blast radius. A global kill switch gives instant rollback. It's pure configuration, no code changes, which makes the rollout controllable in real time.

A shared tier serves hundreds of use cases. One misbehaving tenant must not starve the others. ZGateway uses Discriminant Load Shedding: every request maps to a per-tenant bucket split by priority, and buckets drain round-robin. When a tenant floods the tier, only its own bucket fills and sheds excess while everyone else keeps draining. Isolation as a property of structure, not luck.

You also get observability baked in. One controlled observation showed ~1,350 active tenant buckets under overload. Only 6 were actually shedding. The other ~1,344 executed 99.9% of their requests with zero rejections. Goodput stayed near 97-98%. This is what good infrastructure looks like: you don't just handle failure, you measure it precisely.

What strikes me most about ZGateway is that it wasn't built until the time was right. Earlier, the mesh would have been premature complexity. But the moment client population crossed a threshold, when the alternative was reliability incidents, the proxy became not optional but foundational. 

The deeper lesson is this: infrastructure decisions aren't universal truths. They're temporal. The right choice at 1,000 clients becomes a liability at 1,000,000. The question isn't whether you need a proxy, it's whether your current client population is large and diverse enough that the coordination benefits outweigh the operational cost. And what's your breaking point?
