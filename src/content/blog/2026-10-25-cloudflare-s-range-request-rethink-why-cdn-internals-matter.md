---
title: "Cloudflare's Range Request Rethink: Why CDN Internals Matter"
description: "How Cloudflare rebuilt range request caching to cut R2 latency by 50% and eliminate customer configuration headaches"
date: 2026-10-25 18:00:20 +0530
tags: rollup, cloud, cdn, performance, caching
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

I've always been fascinated by how CDNs handle the weird edge cases that seem simple on paper but turn into operational nightmares at scale. Range requests are a perfect example: a video player seeking to the middle of a movie asks for a few megabytes, and the system has to decide how much extra data to fetch, cache, and shuffle between data centers. Cloudflare just shipped a rethinking of this problem that's worth understanding, not just because it makes file delivery faster, but because it shows how architectural decisions can leak complexity onto customers.

The old system had a brutal tradeoff baked into its bones. Cloudflare split files into fixed-size ranges during caching, and customers had to configure that size per zone. Pick too small (say, 64 KB) and a single seek request spawns dozens of tiny origin fetches, each holding memory while waiting. Pick too large (128 MB) and a client requesting bytes 150-250 triggers a megabyte-scale download and cross-datacenter transfer. I find this especially painful because customers shouldn't need to understand Cloudflare's internal chunking strategy just to serve video efficiently.

## The Coordination Problem

What makes this harder than it sounds is the coordination layer. When a client requests bytes 5,000-10,000 of a file that's being cached, the edge might have bytes 0-1,024 already on disk, bytes 1,024-2,048 still being downloaded from the origin, and need to fetch bytes 2,048-5,120 next. The system has to stitch these together into a single valid response, all while ensuring that concurrent requests don't corrupt the cache or cause the same bytes to be fetched multiple times.

Cloudflare's solution leverages something Pingora was already doing: storing cached files in fixed-size chunks. Instead of making chunk size a configuration knob, they made it intrinsic to the cache design. For a range request, the system checks which requested bytes are cached, serves what's there, and fetches only the missing chunks aligned to the chunk boundaries. The downstream response still contains only the bytes the client asked for, even if the origin fetch was larger.

The elegance here is that bounded waste replaced unbounded waste. Yes, a request for bytes 150-250 might fetch an entire 512 KB chunk. But that's predictable. The old system could waste gigabytes on a single seek depending on how unlucky the boundary alignment was.

## Making Infrastructure Invisible

What strikes me about this work is how it treats infrastructure complexity as a UX problem. The old range caching required customers to make an informed decision about internal Cloudflare architecture just to avoid operational pain. That's backwards. The new implementation eliminates the setting entirely. You turn it on via a Cache Rule, and Cloudflare handles the rest. No tuning, no support tickets, no cargo-cult configurations passed down through teams.

The results speak loudly. R2 saw p99 time-to-first-byte drop by roughly 50%, and a follow-up improvement cut tiered cache traffic by 6%. These aren't micro-optimizations. They're the difference between a platform feeling snappy and feeling sluggish.

There's also a lesson here about [monitoring and observability](https://mgks.dev/tags/observability/). Before rolling this out company-wide, Cloudflare moved their highest-pain workloads first: R2, which had been configured with a 64 MB range size that meant every cross-boundary request could trigger 128 MB of transfer. Those internal users became the test bed. I think this pattern matters more than it gets credit for. Too many teams ship infrastructure changes based on test environments that don't reproduce the chaos of real traffic.

## What This Means for Developers

If you serve large files, video, or versioned artifacts through a CDN, this is concrete good news. You don't need to think about range caching anymore. If you're building on R2 or similar object storage, the latency improvements are immediate. If you're managing your own origin, enabling Origin Range Requests via Cache Rules should be straightforward.

But there's a broader implication I'm thinking about: how much of our infrastructure still leaks internal assumptions onto users? How many configuration options exist because the system was built around a particular constraint that's no longer true? I've seen this pattern everywhere - auth systems that assume stateless tokens before realizing they needed state, caching layers that force you to reason about serialization formats, load balancers that make you configure exactly how traffic gets split.

The most interesting systems are the ones that hide their complexity. They make good choices by default, allow customization for the exceptional cases, and don't ask users to understand the engineering tradeoffs baked into version 1.

Cloudflare taking this seriously enough to rebuild the entire range-caching coordinator on top of Pingora suggests they're thinking about this problem correctly. The question now is whether this level of thoughtfulness extends to the next architectural debt they inherit.