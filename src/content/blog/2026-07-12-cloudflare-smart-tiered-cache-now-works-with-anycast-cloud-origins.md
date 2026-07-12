---
title: "Cloudflare Smart Tiered Cache Now Works With Anycast Cloud Origins"
description: "Cloudflare's Smart Tiered Cache gains region hints for AWS, GCP, Azure, and Oracle Cloud, finally fixing hairpin routing for anycast origins."
date: 2026-07-12 18:01:00 +0530
tags: rollup, cloud, cloudflare, caching, networking
image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070"
featured: false
---

## The Anycast Problem Nobody Talks About Enough

If you've ever hosted an origin on AWS, GCP, or Azure and wondered why your cache hit ratios were lower than expected, there's a good chance anycast routing was quietly working against you. I've seen this trip up developers who did everything right on the Cloudflare side, only to find their traffic hairpinning across continents before reaching the actual backend.

Here's the core issue. Cloudflare's Smart Tiered Cache works by probing latency from its data centers to your origin IP, then funneling all cache misses through the single closest upper tier. That's elegant when your origin has a fixed unicast IP. But most public cloud load balancers and regional ingress points sit behind anycast or regional unicast IPs. When Cloudflare probes those, the IP responds from whichever cloud edge is nearby, not from where your actual backend lives. So a probe from Chicago might look fast because AWS's Chicago edge answered, even though your application is running in Singapore.

The result is a classic hairpin. A user in Tokyo hits a Cloudflare edge in Asia, gets routed to the upper tier in Chicago because that's where the probe said the origin was "closest," and Chicago then fetches from Singapore. Two transoceanic hops, hundreds of milliseconds of added latency, and a cache layer that's technically working but functionally hurting you. This is one of those infrastructure problems that's invisible until you know what to look for.

## How Cloudflare Detects Anycast and What Changes Now

Cloudflare already built a detection mechanism using physics. If probes from two distant checkpoint data centers both return latencies faster than light in fiber could physically travel between them, the origin must be answering from multiple locations simultaneously. That's a reliable anycast signal. Once detected, Smart Tiered Cache falls back to multiple upper tiers rather than pinning to one. It's safe but suboptimal, because spreading misses across tiers reduces the cache concentration that makes tiered caching valuable in the first place.

The new feature closes this gap with a region hint system. You tell Cloudflare which cloud region your origin lives in, for example `aws:us-east-1` or `gcp:europe-west1`, and Cloudflare takes it from there. Every few hours, it pulls the latest IP range files from AWS, GCP, Azure, and Oracle Cloud. These files map cloud regions to their current IP prefixes. Cloudflare cross-references those subnets against its upper tier database, which is rebuilt from latency probes refreshed every 15 minutes. The upper tier with the strongest weighted signal for that region becomes the primary, with a fallback from a different point of presence so no single PoP failure breaks the chain.

For regions with insufficient probe data, Cloudflare falls back to geography using the closest Tier 1 PoP, then quietly promotes to data-backed selection as probes accumulate. The whole system is self-maintaining. Your only job is picking the right region hint.

This is genuinely good infrastructure design. The hard part, continuous probing, weighted voting across subnets, geographic fallback, automatic failover, runs on Cloudflare's side. You get the benefit without building or maintaining any of it. For developers working with [cloud](/tags/cloud/) architectures at scale, this removes a class of networking problems that previously required either deep Cloudflare expertise or accepting degraded cache performance.

## What This Means for How We Build

The broader implication here is worth sitting with. As more application backends move behind managed cloud services with anycast front ends, the assumptions baked into traditional CDN and caching systems start to break down. Smart Tiered Cache was built on the assumption that an origin IP maps to a location. That was mostly true in 2021. It's decreasingly true now.

Cloudflare's approach of continuously expanding what Smart Tiered Cache understands about origin architectures, first R2 buckets, then load balancing pools, now anycast cloud regions, reflects a shift toward infrastructure that reasons about where your stuff actually lives rather than where a probe says it does. That's the right direction.

From a practical standpoint, if you're running origins on any of the four supported providers, setting a region hint costs you nothing and can meaningfully improve cache hit ratios and reduce origin pull latency. The configuration is available in the dashboard, via API, and through Terraform, so it fits into existing [networking](/tags/networking/) infrastructure-as-code workflows without friction. Bulk editing across all origin IPs is supported too, which matters if you're managing a large number of origins.

The free availability across all Cloudflare plans is worth noting. This isn't a premium feature. The complexity is absorbed on Cloudflare's side, and the benefit is passed to everyone using the platform.

I'm curious where the line is between "infrastructure that configures itself" and "infrastructure that makes silent decisions you can't audit," and whether the industry is ready to have that conversation seriously.