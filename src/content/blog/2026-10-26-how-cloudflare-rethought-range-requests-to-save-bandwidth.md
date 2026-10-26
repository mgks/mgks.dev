---
title: "How Cloudflare Rethought Range Requests to Save Bandwidth"
description: "Cloudflare rebuilt cache handling for range requests, cutting R2 latency by 50%. Here's why this matters for CDN architecture and developer workflows."
date: 2026-10-26 12:00:20 +0530
tags: rollup, cloud, cdn, caching, infrastructure
image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070"
featured: false
---

I've been thinking a lot lately about how the smallest decisions in infrastructure compound into massive operational problems at scale. Cloudflare just published a post about fixing how their CDN handles HTTP range requests, and it's a textbook example of this principle.

If you've ever seeked to the middle of a YouTube video or resumed a download after losing connection, you've used a range request. It's a simple HTTP feature: the client says "give me bytes 150 to 250" instead of downloading the entire file. Smart, right? But when you're operating a planetary-scale CDN, handling range requests naively becomes a disaster.

## The Problem Hidden in Plain Sight

Cloudflare's old system used fixed-size range "slices" configured per zone. The idea seemed reasonable: map client requests to predictable chunks of a file, cache those chunks, and reuse them. But this created an impossible tradeoff.

Set the range size too small? You get thousands of tiny origin requests, each holding memory while waiting to be coalesced. Set it too large? A video player seeking to the middle of a file might trigger a 128 MiB download from the origin, only to be wasted when the viewer closes the tab. And here's the kicker: every hop through their distributed cache multiplied this waste. The bytes traveled from origin to one data center, between cache tiers, and finally to the client. Wasteful at every layer.

The worst part? This was customer-facing complexity. People had to understand Cloudflare's internal cache architecture to configure a simple setting. That's a product smell.

## Pingora Changed the Game

Cloudflare's transition from nginx to their own caching server, Pingora, created an opportunity. Pingora already stored cached files in fixed-size chunks for resumable downloads. The insight was elegant: if the cache already thinks in chunks, why make the chunk size a customer configuration? Make it just the chunk.

The new system is fundamentally different. For an incoming range request, Cloudflare checks what's already cached and serves that directly. For missing bytes, it fetches origin ranges aligned to chunk boundaries, stores the result in the same chunks, and returns only what the client requested. A request for bytes 150-250 might fetch a whole chunk containing those bytes, but the response stays tight at 150-250.

This isn't perfect. Small requests still might pull a full chunk. Non-aligned ranges still cost extra work. But here's the difference: the extra work is now bounded and predictable, not determined by a user-selected setting that could cause chaos.

## The Coordination Problem

What impressed me most is how they solved the coordination problem. One incoming request might use a cached prefix, an in-flight download from another concurrent request, and a newly fetched suffix. All three sources need to compose into one correct response.

They had to ensure that every origin response matched the requested range, that total file size stayed stable across subrequests, and that entity tags remained consistent. If the origin representation changed mid-coordination, they'd serve the full file instead of mixing versions. They also handle If-Range headers correctly: if the validator doesn't match, abort the range strategy and serve the whole representation.

There's also this detail that shows maturity: they avoid composing ranges when the response would need decompression. A range over compressed bytes isn't the same as a range over decompressed bytes. Rather than silently breaking that contract, they serve the full decompressed response.

## What This Means for Developers

I think about this feature through the lens of [infrastructure patterns](https://mgks.dev/tags/infrastructure/) that matter. Origin Range Requests is now self-service, no tuning required. You enable it via Cache Rule in the dashboard, and Cloudflare handles the rest. That's what good infrastructure looks like: powerful, correct, and invisible.

R2, Cloudflare's object storage, saw p99 time-to-first-byte cut in half. Tiered cache traffic dropped 6%. These aren't vanity metrics. They represent real money saved on bandwidth and real experience improvements for actual users.

For developers shipping large files, this matters because you don't need to understand CDN internals anymore. Video streaming, large artifact repositories, package managers, backup services that serve partial files: all of these just work better now without any code changes.

I'm also thinking about how this shapes future infrastructure decisions. The lesson isn't specific to range requests. It's that infrastructure primitives should be chosen based on what your system actually does, not what users need to configure. [Caching strategies](https://mgks.dev/tags/caching/) that require deep domain knowledge are a scalability problem waiting to happen.

The old system forced Cloudflare's internal constraints onto users. The new system makes the right choice automatic. That's the direction infrastructure should move.

The question for your own systems: where are you exposing internal complexity as customer configuration?