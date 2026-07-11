---
title: "Cloudflare Smart Tiered Cache Now Works with Cloud Anycast Origins"
description: "Cloudflare's Smart Tiered Cache gains region hints for AWS, GCP, Azure, and Oracle Cloud, fixing hairpin routing caused by anycast IP ambiguity."
date: 2026-07-12 00:01:00 +0530
tags: rollup, cloud, cloudflare, caching, networking
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
featured: false
---

## The Anycast Problem That Broke Tiered Caching

I've spent enough time debugging slow cache misses to recognize a hairpin routing problem when I see one. Cloudflare's Smart Tiered Cache has been one of my favorite low-effort performance wins since it launched in 2021. The premise is simple: instead of every edge node independently pulling from your origin on a cache miss, traffic funnels through a single optimal upper-tier data center closest to your origin. Fewer origin connections, better hit ratios, lower latency. One switch, real results.

But there was always a catch hiding in plain sight. If your origin lives behind an anycast IP on AWS, GCP, Azure, or Oracle Cloud, the system quietly broke down. Cloudflare's latency probes would see the origin as "close" to a dozen data centers simultaneously, because anycast is literally designed to route you to the nearest cloud edge, not your actual backend. The prober had no way to distinguish Chicago's low latency to an AWS anycast IP from Singapore's low latency to that same IP. Both looked equally valid. So Smart Tiered Cache either picked wrong or fell back to multiple upper tiers, sacrificing the cache efficiency that made it worth using in the first place.

The worst case was brutal: a user in Tokyo hits a nearby Cloudflare edge, gets routed to an upper tier in Chicago because that's where probes pointed, and Chicago then fetches from an origin actually sitting in Singapore. Two transoceanic hops for a single cache miss. That's not a minor inefficiency. That's hundreds of milliseconds of unnecessary latency, and it's been a consistently reported pain point for teams running cloud-native infrastructure.

## How Cloudflare Detects and Fixes This

The detection mechanism is clever and grounded in physics. Cloudflare runs latency probes from multiple checkpoint data centers worldwide. If the combined probe latencies from two geographically distant checkpoints are faster than light in fiber could physically travel between those two points, the origin must be responding from multiple locations. That is the anycast signature. You cannot fake the speed of light.

Once an origin is flagged as anycast, Smart Tiered Cache refuses to pin it to a single upper tier. That is the safe behavior, but it leaves performance on the table.

The new feature closes this gap with a region hint. You tell Cloudflare which cloud region your origin actually lives in, for example `aws:us-east-1` or `gcp:europe-west1`, and the system does the rest. Every few hours Cloudflare pulls the latest IP range files from each supported provider, maps those subnets to regions, and cross-references them against its continuously refreshed upper-tier latency database. Each subnet in a region casts a weighted vote for an upper tier. The winner becomes the primary, with a fallback from a different point of presence. If probe data is sparse for a new region, it falls back to geographic proximity until real measurements accumulate.

You can set hints per-IP through the dashboard, bulk-edit all origins at once, or wire it up through the API or Terraform. For infrastructure-as-code workflows, the Terraform path means this fits naturally into existing provisioning pipelines without manual dashboard steps.

## What This Means for Developers

If you work with [cloud networking](https://mgks.dev/tags/networking/) and rely on Cloudflare for caching, this is a meaningful operational improvement. The gap between what Smart Tiered Cache promised and what it actually delivered for cloud-hosted origins was large enough that some teams I know quietly disabled tiered caching altogether and accepted the origin load. That workaround is no longer necessary.

The broader implication is architectural. Anycast is not going away. Cloud providers are leaning harder into it because it gives them control over traffic routing and lets them absorb DDoS volume at their edge before it reaches your backend. The trade-off has always been that it makes the origin look omnipresent to external observers. Tools that rely on latency triangulation to infer origin location, like CDN tier selection systems, get confused by design.

Cloudflare's approach here is pragmatic: instead of trying to solve the anycast inference problem purely through measurement, they accept that you know where your origin is and build a lightweight hint system around that knowledge. The physics-based anycast detection tells them when to ask for help. The region hint tells them where to look. The rest is automated.

This also continues a pattern worth watching in [cloud infrastructure](https://mgks.dev/tags/cloud/) tooling. Each of the recent Smart Tiered Cache improvements, R2 support in November 2024, Load Balancing integration in January 2025, and now public cloud region hints, reflects a shift from generic CDN behavior toward origin-aware routing. The CDN is getting smarter about what sits behind it, not just what sits in front of users.

The question I keep coming back to is: as CDNs accumulate more semantic knowledge about origin infrastructure, where does the CDN end and the cloud networking layer begin?