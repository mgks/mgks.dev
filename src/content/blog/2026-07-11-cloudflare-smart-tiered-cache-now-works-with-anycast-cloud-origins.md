---
title: "Cloudflare Smart Tiered Cache Now Works With Anycast Cloud Origins"
description: "Cloudflare's Smart Tiered Cache now supports AWS, GCP, Azure, and Oracle Cloud origins behind anycast IPs using region hints to fix hairpin routing."
date: 2026-07-11 12:01:01 +0530
tags: rollup, cloud, cloudflare, caching, networking
image: "https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070"
featured: false
---

## The Anycast Problem Nobody Talks About Enough

If you've ever hosted an origin on AWS or GCP behind a load balancer and wondered why your cache hit ratios looked disappointingly low, you may have been silently bitten by the anycast problem. I've seen this come up repeatedly in infrastructure discussions, and it's one of those issues that's surprisingly hard to diagnose unless you already know what to look for.

Here's the short version: Cloudflare's Smart Tiered Cache picks a single upper-tier data center to act as a middleman between edge nodes and your origin. The idea is that cache misses funnel through one place, keeping your hit ratios high and your origin load low. This works beautifully for origins with a fixed unicast IP. But public cloud providers like AWS and GCP often put their load balancers and regional ingress points behind anycast or regional unicast IPs, where the same IP address resolves to different physical locations depending on where in the world you're probing from.

When Cloudflare's latency probes hit one of these IPs, the origin looks "close" to many data centers simultaneously. There's no clear winner, so Smart Tiered Cache either falls back to multiple upper tiers or, in worse scenarios, picks one that creates a hairpin route. Traffic from a user in Tokyo might get routed to Chicago as the upper tier, only for Chicago to fetch data from an origin sitting in Singapore. That's two ocean crossings for a single cache miss. Not great.

## How the Region Hint Fix Actually Works

Cloudflare's approach here is elegant in its simplicity from the user's side, even if there's serious engineering underneath. You go to your dashboard under Caching > Tiered Cache > Origin Configuration, find the anycast origin IP, and set a region hint like `aws:us-east-1` or `gcp:europe-west1`. That's the entire user-facing workflow.

On Cloudflare's side, they're doing quite a bit more. Every few hours they pull the latest IP range files from supported cloud providers, mapping each cloud region to its current set of IP prefixes. They run continuous latency probing every 15 minutes across their upper tier database. For each cloud region, subnets vote on the best upper tier weighted by probe data. Primary and fallback tiers are always assigned to different points of presence so a single PoP failure can't knock out both.

For regions without enough probe data yet, they fall back to geographic proximity using Tier 1 PoPs, then quietly upgrade to data-backed selection as probes accumulate. This is the kind of graceful degradation that I think more infrastructure systems should adopt rather than failing loudly or requiring manual intervention.

The anycast detection itself is a clever bit of physics-constrained reasoning. Cloudflare measures latency from multiple checkpoint data centers to the same origin IP. If two round-trip times added together are faster than light traveling through fiber between those two checkpoints could physically allow, the IP must be answering from multiple locations. You can't fake the speed of light.

## What This Means for Developers Building on Cloud

For anyone building on [cloud infrastructure](https://mgks.dev/tags/cloud/), this closes a real gap. The workaround before this feature existed was essentially to avoid Smart Tiered Cache for cloud-hosted origins or accept degraded behavior. Neither is a great option when you're trying to squeeze latency and hit ratios out of a globally distributed setup.

The practical implication is that origins on AWS, GCP, Azure, and Oracle Cloud can now benefit from the same single-tier cache efficiency that unicast origins have always enjoyed. For high-traffic applications, the difference between multiple fallback upper tiers and a single optimal one can translate directly into fewer origin fetches, lower bandwidth costs, and faster response times for end users.

I also think the API and Terraform support matters here more than the dashboard does for most teams. If you're managing infrastructure as code, the ability to set region hints programmatically means this fits into existing deployment pipelines without creating a manual step someone might forget. You define your origin's cloud region once in your Terraform config alongside everything else.

This is part of a broader pattern I've been watching in [networking](https://mgks.dev/tags/networking/) infrastructure: the best CDN and edge improvements lately aren't about adding new capabilities so much as making existing ones work correctly for the architectures developers actually use. R2 bucket support in late 2024, load balancer pool optimization in early 2025, and now anycast cloud origins. The common thread is that each fix removes a case where the system had to give up and do something suboptimal.

Cloudflare says more providers are coming beyond the current four. The interesting question is whether they'll eventually make this entirely automatic, inferring the cloud region from other signals so the hint becomes optional or unnecessary. Given their trajectory of progressively removing manual configuration requirements, that seems like where this ends up.

If the systems we build are only as smart as the infrastructure beneath them, what does it mean for application architecture when the network layer starts understanding your deployment topology as well as you do?