---
title: "How Cloudflare Freed 100TB of Memory Through Obsessive Optimization"
description: "Cloudflare's Big Pineapple DNS cache reduced per-entry memory by 50% through five targeted optimizations. What this teaches us about systems programming."
date: 2026-08-28 06:00:50 +0530
tags: rollup, engineering, systems-engineering, memory-optimization, dns
image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070"
featured: false
---

I find myself returning to Cloudflare's recent deep dive on optimizing Big Pineapple, their DNS caching system, because it illustrates something I think gets lost in modern software development: when you operate at scale, a single wasted byte becomes a real problem.

They manage 250 billion DNS cache entries across their fleet. One byte per entry equals 250GB of memory. Let that sink in. That's not theoretical waste. That's real money, real power consumption, real infrastructure your company has to maintain.

What Cloudflare did was eliminate that waste through five successive optimizations that, combined, cut per-entry memory by more than 50% and freed roughly 100 terabytes across their fleet. More importantly, they didn't trade speed for space. Insert throughput climbed 43%, and lookup latency dropped 19%.

## Stop Using Vec When You Mean Box

The first optimization reveals how much unnecessary overhead we carry in modern Rust code. DNS responses stored in the cache get written once and never modified. Yet they were stored as `Vec<T>` objects, which maintain three fields: a pointer, length, and capacity.

Once you know a collection won't grow, that capacity field is pure waste. Eight bytes per field across 8 Vec and String fields per entry. Sixty-four bytes per entry. Multiply that by 250 billion entries and you're looking at 16 terabytes of wasted memory.

The fix is elegant: use `Box<[T]>` and `Box<str>` instead. They don't carry capacity. They can't grow. They're exactly what you need when you're done building a data structure.

I see this pattern everywhere in production code. We reach for familiar collections without asking whether they fit the problem. Using Vec as a default is like defaulting to HashMap when you rarely modify your data. It works. It's just wasteful.

## Structure Layout Matters More Than You Think

Cloudflare replaced three separate lists (answer, authority, additional sections) with a single buffer and offsets. Instead of three 8-byte pointers and three 8-byte lengths, they store three 2-byte offsets. That saves 28 bytes per entry across 250 billion entries: 7 terabytes.

But here's where it gets interesting. Removing small fields sometimes eliminates padding around them. Rust aligns structs to satisfy CPU requirements and rounds the total size up to an alignment boundary. Sometimes removing a field removes the padding it requires, and the whole struct shrinks by more than that field's size.

This is one of those details that separates systems programmers from application developers. Most of us don't think about struct layout. We write the fields, the compiler handles alignment, and we move on. But at Cloudflare's scale, understanding how [memory-optimization](https://mgks.dev/tags/memory-optimization/) techniques interact is the difference between a mediocre solution and an exceptional one.

## Enums Pay a Hidden Tax

DNS records come in many types: A, AAAA, CNAME, MX, NAPTR, and so on. The natural Rust representation is an enum, where each variant holds the appropriate data.

Except enums are sum types. They're always the size of their largest variant. In Cloudflare's case, NAPTR records need 136 bytes, but A records only need 4. Over 80% of traffic is A and AAAA records, so most entries were wasting 120+ bytes on padding.

They boxed the larger variants, moving them to separate heap allocations. Now A records stay compact, and the enum just stores a pointer to the rare large variants.

But boxing introduced its own costs: allocator overhead and poor memory locality. Records for a single entry got scattered across the heap instead of sitting contiguously. CPU cache performance suffered.

## The Wire Format Compromise

## Instead of parsed enum variants, Cloudflare switched to storing record data as raw bytes in a single buffer with 2-byte length prefixes. No per-variant overhead. No scattered heap allocations. Data packed contiguously for better cache locality.

The tradeoff is that you can't randomly index records anymore. You have to iterate sequentially. For most workloads this is fine. For DNS responses with typically 1-4 records per entry, it's negligible.

The real win: most record types can be copied directly from the buffer into outgoing messages without parsing. Previously each record required field-by-field serialization. Now A, AAAA, TXT, and DNSSEC records bypass that work entirely.

This reduced lookup latency by 5% in their benchmarks. More than that, it demonstrates how storage format decisions ripple through performance. Change how you store data, and you change what queries cost.

## What This Means for You

I'm struck by how these optimizations aren't clever tricks. They're straightforward applications of fundamental principles: use the right data structure for your access patterns, understand your system's bottlenecks, measure everything.

Most of us will never operate a DNS cache handling 250 billion entries. But the lessons apply anywhere you're moving enough data that efficiency matters. Understand struct layout. Measure before and after changes. Question whether collections need to grow.

These optimizations also freed 100 terabytes that Cloudflare can now allocate elsewhere, making their infrastructure more resilient and cost-effective. That's what happens when you take memory seriously. Have you looked at your own systems recently through this lens?