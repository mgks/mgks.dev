---
title: "How Cloudflare Reclaimed 100TB of RAM with Better Hashing"
description: "Deep dive into consistent hashing optimization: how understanding the math behind algorithm design led to massive memory savings at scale."
date: 2026-09-21 18:00:20 +0530
tags: rollup, cloud, performance, systems-design, distributed-systems
image: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232"
featured: false
---

I've always found it fascinating how the biggest wins in infrastructure come not from rewriting everything, but from truly understanding what you've already built. Cloudflare's recent optimization of their consistent hashing implementation is a perfect case study in this principle.

The story starts with a deceptively simple question: why was their Pingora Backend Router using so much memory? The answer took them deep into the mathematics of consistent hashing, Rust memory alignment rules, and the birthday paradox. What emerged was a lesson about how small algorithmic improvements compound massively at global scale.

## Understanding Consistent Hashing at Scale

Consistent hashing isn't new. It's been a cornerstone of distributed systems for decades, solving the fundamental problem of how to distribute tasks across servers without massive reshuffling when the topology changes. Cloudflare uses it to route cacheable requests to the right server, ensuring one copy per data center and providing a stable lookup mechanism.

The algorithm works by mapping both servers and tasks onto a hash space (think of it as a number line), then assigning each task to the nearest server. Simple, elegant, and mathematically sound. But here's where it gets interesting: because hashes are essentially random, the ranges servers handle can be wildly unbalanced. Server A might get 10% of requests while Server B gets only 2%.

The traditional fix is adding multiple hash points per server, typically 160 in NGINX and Pingora's default. This works because averaging multiple random distributions reduces variance. It's the law of large numbers in action. With 160 hashes per server across 100 servers, the coefficient of variation drops from 99% to about 8%. Pretty solid.

But Cloudflare had another problem: not all servers are equal. Some have more storage, others different capabilities. They needed weighted consistent hashing, which is where the ketama algorithm enters the picture. It's named after the library where it was first implemented (the naming story is admittedly funny if you look it up). By using disk space as weights, they could proportionally allocate load based on actual capacity.

## The Memory Alignment Trap

Here's where I found the technical elegance really kicks in. One engineer, Zaidoon, noticed their hash point storage structure was unnecessarily large:

```
struct Point {
  hash: u32,
  index: u16,
}
```

You'd think this should be 6 bytes. You'd be wrong. Rust's alignment rules require structure size to be a multiple of the largest field's alignment (4 bytes for u32). So Point actually occupies 8 bytes minimum. That sounds trivial until you realize they're storing billions of these globally.

The fix involved storing hash and index as a raw byte array with getters, effectively packing them into 6 bytes. This 25% memory reduction alone reclaimed significant capacity, but the team realized they could go further by revisiting the math.

## The Mathematics Led the Way

This is what impressed me most. Rather than accepting approximate formulas from the literature, they derived the exact mathematical relationship between hash count and distribution variance. With this rigor, they could prove something surprising: for their 2048-server data centers, collision rates in 32-bit hash space start increasing significantly above 10,000 hashes per server.

Most collisions don't matter much, but they introduce unpredictable error that undermines load balancing. Armed with this analysis, they made a bold decision: reduce hash count by 90% without sacrificing accuracy.

But changing the ring structure invalidates cached content. A naive cutover would destroy their cache effectiveness, turning a memory optimization into a traffic apocalypse.

## Gradual Migration as Art

Their solution was elegant: run both the old and new hash rings in memory simultaneously, gradually migrating traffic from old to new. This is where infrastructure meets product strategy. They could measure the impact in real time, validate their math against actual behavior, and roll back instantly if needed.

What strikes me about this approach is how it reflects a maturing understanding in systems engineering. The optimization wasn't just about the algorithm or the code. It required understanding the entire system: the math, the Rust memory model, the distributed consequences of cutover, and the customer impact of cache invalidation.

This is similar to how other [https://mgks.dev/tags/performance/](performance optimizations) often require rethinking entire layers, or how [https://mgks.dev/tags/distributed-systems/](distributed systems) require considering failures you haven't seen yet.

100TB of reclaimed RAM across their global network. That's real capacity returned to the pool. That's faster hardware procurement cycles, reduced electricity costs, and more headroom for growth.

The broader lesson here isn't about consistent hashing specifically. It's about how mathematical rigor, once applied retroactively to already-deployed systems, can unlock enormous efficiency gains that seemed impossible based on conventional wisdom.