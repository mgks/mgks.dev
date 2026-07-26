---
title: "BGP's Origin Attribute Crisis: How the Internet Routing System Breaks Trust"
description: "70% of BGP routes have manipulated ORIGIN values. I explore why major ISPs are gaming the system and what this means for Internet infrastructure."
date: 2026-07-26 06:00:30 +0530
tags: rollup, cloud, bgp, routing, network-infrastructure
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

The Internet's routing backbone operates on a foundation of trust that's quietly crumbling. I recently dug into research showing that approximately 70% of observed BGP paths have a different ORIGIN value than what the originating Autonomous System actually set. This isn't a bug or a configuration mistake. It's systemic manipulation, and it's happening at scale across major Tier-1 ISPs.

Let me explain why this matters and what I think it reveals about how the Internet really works versus how we pretend it works.

## The ORIGIN Attribute and BGP Path Selection

BGP, the Border Gateway Protocol, is essentially the Internet's decision-making system for routing traffic. When your packet needs to reach a destination, BGP helps routers figure out which path to take. Part of that decision-making process involves evaluating the ORIGIN attribute, which appears on every single route announcement.

The ORIGIN attribute has three possible values: IGP (Interior Gateway Protocol, indicating the route originates within an AS), EGP (a deprecated historical value), or INCOMPLETE (meaning the origin is unknown or external). According to RFC 4271, this value should never be modified by routers after it's set by the originating AS. It's a foundational rule.

Except nobody's following it.

When two routes to the same destination have equal Local Preference and AS_PATH length, BGP selects the one with the lower ORIGIN value. IGP wins. That's why ISPs are rewriting non-IGP values to IGP: it gives them an unfair advantage in the path selection algorithm, attracting more traffic to their networks and generating more revenue.

## How Major Networks Are Gaming the System

The research here is damning. Out of 352 direct peer ASes tested in IPv4, almost 10% were changing the ORIGIN attribute to IGP. At the Tier-1 level, it's worse: six out of 16 major networks are manipulating ORIGIN. When you look at the top 50 ASes globally by customer cone, 26% of them are rewriting this attribute.

These aren't small, insignificant networks. These are the backbone providers that carry the majority of Internet traffic. The study showed that when ORIGIN was reset to IGP, these rewriters secured 18% more paths in IPv4 and 40% more paths in IPv6 that would have gone through competing networks.

I found one particularly revealing detail: a team that reached out to one of these ASes' engineers confirmed they're rewriting ORIGIN to EGP on routes from peers to deliberately deprioritize them compared to customer routes. That's not accidental. That's policy.

## What This Means for Developers and Infrastructure

If you're building systems that depend on Internet routing working "fairly," you should be uncomfortable. The mechanism that's supposed to guide traffic is being gamed by the largest players in the ecosystem. More specifically, if you're routing-sensitive (think: financial trading systems, real-time video delivery, or services requiring low latency), your traffic might be taking suboptimal paths not because it's technically necessary, but because someone rewrote a BGP attribute to make money.

This also undermines trust in the system as a whole. Protocols like [BGP security and route validation](https://mgks.dev/tags/network-infrastructure/) exist, but they don't prevent ORIGIN manipulation because the RFC says you shouldn't modify it, not that you can't. We've built the Internet on "trust but verify" assumptions that are collapsing under economic incentives.

## The Arms Race Problem

Here's what bothers me most: once the community knows this is happening, every network that wants to remain competitive feels forced to do it too. It's not malicious actors. It's a tragedy of the commons. A Tier-1 network that complies with RFC 4271 loses traffic to competitors who don't. The race is on.

The research community has proposed deprecating the ORIGIN attribute entirely in BGP path selection, but that requires IETF consensus and vendor implementation across the Internet. That's slow. Meanwhile, the manipulation continues because the incentives haven't changed.

## What Happens Next?

I think we need to stop pretending ORIGIN is a meaningful signal for routing decisions. If 70% of observed routes have been modified, then the attribute no longer serves its intended purpose. The Internet's routing layer needs either enforcement mechanisms that actually prevent modification, or we need to accept that [routing decisions are as much about economics as they are about technology](https://mgks.dev/tags/bgp/) and build our systems accordingly.

The uncomfortable truth is that the Internet routing system prioritizes revenue and competitive advantage over the technical merit of paths. The question is: how many of us are building systems that assume otherwise?