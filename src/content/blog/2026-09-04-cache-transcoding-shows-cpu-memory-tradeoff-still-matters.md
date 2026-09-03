---
title: "Cache Transcoding Shows CPU-Memory Tradeoff Still Matters"
description: "Cloudflare's Cache Transcoding prototype compresses text assets to 1/3 size using Zstandard, trading minor CPU overhead for massive storage and bandwidth savings across distributed infrastructure."
date: 2026-09-04 00:00:20 +0530
tags: rollup, cloud, caching, compression, infrastructure
image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070"
featured: false
---

I've been following Cloudflare's internship program work closely, and their Cache Transcoding prototype is worth understanding because it reveals something fundamental about modern infrastructure: we're still making the same CPU-versus-memory tradeoffs that dominated systems design decades ago, just at planetary scale.

The premise is elegant. Memory and storage costs have spiked. Cloudflare runs a massive distributed CDN that moves petabytes of data between data centers daily. What if, instead of storing assets in whatever form the origin server sends them, we re-encoded eligible content using Zstandard (zstd) compression before writing to disk? The encoding happens once per cache fill. The decoding happens on every serve. The math works if assets get reused enough.

## The Compression Math That Actually Adds Up

In their testing, eligible text assets (HTML, JSON, CSS, JavaScript) compressed to roughly 1/3 of original size. That's not aggressive compression either, they used zstd level 3, which prioritizes speed over ratio. The CPU cost? A few percent overhead on the origin-facing proxy under realistic traffic patterns.

What matters here is the asymmetry. Encoding costs 4.31 nanoseconds per byte. Decoding costs 1.56 ns/byte. Both are one-time operations per cache fill and serve respectively. But assets get served far more often than they're fetched from origin. Over an asset's lifetime in cache, you're paying the encoding cost once and the (cheaper) decoding cost dozens or hundreds of times.

This is why the decision to transcode *all* eligible compressible text above 4 KiB, rather than just hot content, proved smarter. You'd think limiting to popular assets would help, but it didn't. Decoding happens every single serve, so throttling to only hot content saved storage inconsistently while CPU barely budged. The simpler rule performed better.

That's a valuable lesson for anyone building caching systems: measure your actual reuse patterns before optimizing eligibility criteria. Intuition about what's "hot" often fails.

## Smart Eligibility Checks Beat Brute Force

The prototype only transcodes 200 OK responses where Content-Encoding is unset, the Content-Type is compressible text, and Content-Length is known and >= 4 KiB. Everything else passes through unchanged: images, video, fonts, precompressed responses, range requests, and binary content.

This matters because 21.4% of requests were media (images, video, fonts) representing 63.3% of bytes. Compressing already-compressed formats burns CPU for nothing. Meanwhile, text represented 67.3% of requests but only 22.3% of bytes, and 71% arrived uncompressed. That's the target.

The 4 KiB threshold is particularly interesting. It removed huge numbers of tiny requests while capturing nearly all eligible byte savings. Going lower added per-object overhead without meaningful storage gains. These kinds of thresholds feel like engineering details, but they're actually decisions about what problems you're trying to solve. Here, Cloudflare's solving for fleet-wide efficiency, not per-object optimization.

## Tiered Cache Behavior Changes Under Compression

The architecture gets more interesting when assets move through their Tiered Cache system. On a full miss, the upper tier fetches from origin (uncompressed), encodes once, stores as zstd, and transfers the compressed form to lower tiers. Lower tiers also store compressed, decoding only on the client-facing hop.

If the lower tier has a hit but upper tier has it, the compressed object moves tier-to-tier unchanged, then decodes once at the edge. The metadata tracks encoding state, preventing double-encoding.

This is infrastructure design thinking: compression isn't just about storage, it's about reducing bandwidth between data centers. Moving petabytes of compressed versus uncompressed data monthly has real cost implications. See how this connects to [broader concerns about infrastructure efficiency](https://mgks.dev/tags/infrastructure).

## What This Means for Developers

As developers, we often think compression is the CDN's problem. But Cache Transcoding shows how infrastructure decisions ripple into application design. If your CDN is compressing server responses server-side, the behavior changes based on Content-Type headers and response sizes. You still want to minify and compress on origin when possible, because that's always cheaper than transcoding. But understanding your CDN's eligibility criteria helps.

The prototype proves this at Cloudflare's scale with rigorous testing: a million requests across test servers, correctness validation through entire request paths, and careful benchmarking. Yet they're still uncertain about broader Internet behavior. Their test corpus was deliberately compressible text, not representative. They'll test [various content types and object sizes](https://mgks.dev/tags/caching) before fleet-wide rollout.

The next phase explores higher compression levels, range requests, and passing compressed objects directly to downstream systems that support them natively. That's where things get truly interesting: what if applications and infrastructure conspired to keep data compressed end-to-end, only decompressing at the absolute final moment?

We've been trading CPU for memory and bandwidth for decades. The specifics change at scale, but the core tension remains: how much computation is compressing and decompressing worth compared to what you save on storage and network?