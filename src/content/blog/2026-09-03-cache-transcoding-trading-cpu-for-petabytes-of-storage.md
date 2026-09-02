---
title: "Cache Transcoding: Trading CPU for Petabytes of Storage"
description: "How Cloudflare uses Zstandard compression inside the cache layer to reduce storage costs and bandwidth while maintaining sub-millisecond performance."
date: 2026-09-03 00:00:20 +0530
tags: rollup, cloud, infrastructure, compression, cloud-storage
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065"
featured: false
---

I've been thinking a lot about the economics of distributed systems lately. At scale, the math changes. A few percentage points of CPU overhead stops being an academic concern and becomes a real business decision. Cloudflare's Cache Transcoding project shows what that calculation looks like when you're running petabytes of cached content across hundreds of data centers.

The premise is deceptively simple: what if we compressed assets *inside* the cache itself rather than just storing whatever encoding the origin sends? By encoding eligible content with Zstandard before writing to disk, then decoding only when serving to clients, Cloudflare saw their eligible cache objects shrink to roughly one-third their original size. That's not marginal. That's the difference between fitting customer content on your hardware or buying more servers.

## The Compression Tradeoff

Here's where it gets interesting for developers thinking about [infrastructure optimization](https://mgks.dev/tags/infrastructure/). Compression isn't free. Every byte encoded costs CPU on the way in, and every byte decoded costs CPU on the way out. The key insight is that assets get served far more often than they're cached. At zstd level 3, the encoding cost (4.31 nanoseconds per byte) is paid exactly once when content enters the cache. The decoding cost (1.56 ns/byte) happens on every single serve.

The math works because the serving-to-filling ratio is massively skewed. Most cached content gets reused dozens or hundreds of times. That one-time encoding cost amortizes across thousands of requests. You're essentially paying a small, fixed upfront fee for massive ongoing savings.

Zstandard itself is the right tool for this job. Compared to Brotli, zstd compresses 42% faster while achieving nearly identical compression ratios. Against gzip, it produces 11.3% smaller files at comparable speed. For a system that would touch massive amounts of traffic, that balance between speed and compression matters. You can't afford to turn cache fills into a CPU bottleneck.

## Not Everything Should Be Compressed

What surprised me about this approach is what they *didn't* compress. Images, video, and fonts are already compressed. Trying to squeeze them further burns CPU for nothing. In Cloudflare's traffic sample, media represented 63.3% of bytes but only 21.4% of requests. Those bytes are already optimized.

Compressible text is the real opportunity. HTML, JSON, CSS, and JavaScript hit the cache frequently, were often served uncompressed by origins, and compress well. About 71% of that eligible text arrived with no content encoding set. That's where the storage wins are.

The eligibility criteria reveal practical engineering thinking. They only transcoded 200 OK responses with unset Content-Encoding, compressible text types, and known Content-Length above 4 KiB. That 4 KiB threshold filtered out tiny requests while capturing 99% of eligible bytes. Lower thresholds meant per-object overhead that didn't justify the storage savings. Sometimes constraints aren't bugs, they're features.

## Distributed System Implications

What really matters here is how this scales across a [tiered cache architecture](https://mgks.dev/tags/cloud-storage/). When a cache miss happens at a lower tier but the upper tier has the object, the compressed version transfers between data centers. It stays compressed on the wire and on disk, only getting decoded at the client-facing edge. That's elegant systems thinking. You're paying the decoding cost exactly where it matters: on the request path to users.

The architecture also prevents double-compression through encoding markers. A cache layer that receives an already-compressed object preserves it in that form rather than encoding it again. This prevents cascading overhead in a multi-tier system where content might pass through several layers.

Cloudflare tested this with controlled zones and real traffic loads. They ran a million requests across 10 servers, measuring both local cache behavior and inter-datacenter transfers. Their test corpus compressed by 2.8x, though they're explicitly cautious about calling that a fleet-wide constant. Honest uncertainty about generalization is exactly what you should demand from infrastructure teams.

## What This Means Going Forward

The next steps are telling: higher compression levels, broader content types, and examining range requests and pre-compressed responses. They're also considering passing compressed objects directly to downstream components that already support zstd, skipping decompression entirely.

For developers, this highlights something important about modern infrastructure. The bottlenecks aren't always where you think. Memory and storage costs are rising faster than CPU efficiency improvements. When that's true, trading cycles for capacity becomes economically rational. That shift cascades down to how we design systems.

The real question isn't whether compression is worth it. It's how far you can push the tradeoff before the diminishing returns outweigh the complexity of maintaining another subsystem in your stack.