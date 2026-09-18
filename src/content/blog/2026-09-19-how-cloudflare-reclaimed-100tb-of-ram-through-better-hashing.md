---
title: "How Cloudflare Reclaimed 100TB of RAM Through Better Hashing"
description: "Cloudflare optimized consistent hashing in Pingora, reducing memory footprint by 25% through struct alignment fixes and mathematical analysis of hash distribution."
date: 2026-09-19 00:00:20 +0530
tags: rollup, cloud, performance, rust, distributed-systems
image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=2070"
featured: false
---

I've always found it fascinating how the biggest wins in systems engineering often come from understanding the fundamentals deeply. Cloudflare's recent effort to reclaim over 100TB of RAM globally is a perfect case study in how small algorithmic improvements compound at scale.

The story starts with a deceptively simple problem: their internal load-balancing service, Pingora Backend Router, was using way more memory than expected. The culprit? Consistent hashing structures in their ketama implementation. But here's what struck me most: the solution wasn't a complete rewrite. It was careful analysis, a pinch of math, and some clever Rust tricks.

## Understanding Consistent Hashing at Scale

Consistent hashing is one of those ideas that's elegant in theory but genuinely tricky in practice. The concept is straightforward: map servers and tasks onto a hash space, then assign each task to the nearest server. This lets you add or remove servers without reshuffling your entire cache.

The problem emerges because hash outputs are essentially random numbers. Some servers end up with disproportionately large ranges, handling way more requests than others. The mathematical solution? Add multiple hashes per server. Instead of one hash representing each server, use 160 (NGINX's default). This averaging effect reduces the coefficient of variation from about 99% down to 8%.

But here's where it gets interesting for developers building similar systems: more hashes means more memory. At Cloudflare's scale, this becomes genuinely problematic. Every byte multiplied across thousands of servers and petabytes of capacity suddenly matters.

## The Struct Alignment Trick

The first breakthrough came from Zaidoon's observation about how Rust stores data in memory. Their Point struct looked something like this:

```rust
struct Point {
  hash: u32,
  index: u16,
}
```

You'd think that's 6 bytes (4 + 2), but Rust's alignment rules require structures to be multiples of their largest field's size. So the actual size? 8 bytes. That's a 33% overhead for nothing.

The solution was storing hash and index as a raw byte array with getters. Less readable, but it compiled down identically and reclaimed that wasted space. A 25% memory reduction from a single struct change.

This is the kind of optimization that feels almost wrong to celebrate, but at scale it's transformative. I've seen this pattern across high-performance systems: alignment is a silent killer that most developers never think about until profilers scream at them.

## The Math That Changed Everything

The real insight came from revisiting the math behind consistent hashing. Most sources give approximations or asymptotic limits, but Cloudflare actually derived the exact formula for coefficient of variation with multiple hashes per server.

Then they discovered something crucial: 32-bit hash collisions become unexpectedly common as you increase hash counts. Between 10,000 and 100,000 hashes per server in a 2,048-server data center, collisions start degrading performance instead of improving it. This is the birthday paradox biting you in production.

Armed with this understanding, they realized they could reduce hash count by 90% without meaningful error increase. That's not a small optimization; that's a fundamental change to their infrastructure math.

## The Deployment Problem Nobody Talks About

Here's what separates good engineering from great engineering: they didn't just flip a switch. Changing the hash ring changes where cached content lives. A naive global switch would invalidate almost every cache entry, turning an optimization into a traffic apocalypse.

Instead, they ran both the old and new hash rings in parallel during a gradual migration. Each request intelligently moved between rings. This kind of thinking about deployment consequences is something I see missing in a lot of optimization discussions. Performance work that breaks your system isn't optimization; it's sabotage.

## What This Means for Distributed Systems

If you're building anything involving consistent hashing, load balancing, or distributed caching, this work matters. The patterns here extend beyond Cloudflare:

1. Understand your math deeply enough to question it. Most engineers use libraries without knowing whether their parameters are actually optimal for their hardware profile.

2. Measure alignment overhead in your data structures. I'd argue this should be a standard code review check for performance-sensitive code.

3. Plan migrations as carefully as implementations. The technical solution is half the battle.

This is also a reminder that systems optimization is fundamentally about fundamentals. Cloudflare didn't invent anything new here; they just understood consistent hashing well enough to optimize it. If you're interested in how systems scale, check out more on [performance optimization techniques](https://mgks.dev/tags/performance) and [distributed infrastructure](https://mgks.dev/tags/distributed-systems).

The beauty of reclaiming 100TB of RAM isn't just the hardware cost saved. It's the demonstration that deep technical understanding still beats throwing more resources at problems.