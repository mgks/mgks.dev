---
title: "Cloudflare's MoQ Relay API Brings Production-Ready Low-Latency Streaming"
description: "Cloudflare adds authentication and access controls to Media over QUIC, making it viable for production applications. Here's what it means for developers."
date: 2026-08-02 06:00:30 +0530
tags: rollup, cloud, cloudflare, streaming, quic
image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070"
featured: false
---

Last year, Cloudflare made waves by deploying Media over QUIC (MoQ) relays across its entire global network, free and open to anyone. It was a bold move to democratize a new protocol, but there was a catch: without authentication, it was only suitable for testing. Today, they're solving that problem with a provisioning API that adds the isolation and access controls needed for production use.

I've been following MoQ's development at the IETF, and this feels like a turning point. We're moving from "interesting protocol" to "actually usable infrastructure." The implications are significant enough that I think developers building real-time applications should start paying attention.

## What Changed

The core addition is simple but powerful: you can now create isolated relays with granular credentials. Each relay gets its own namespace, separate from other applications. You issue tokens to publishers and subscribers, controlling exactly what each can do. Tokens can expire, be revoked individually, and be scoped to specific operations.

This solves the chicken-and-egg problem that has plagued MoQ adoption. Before, anyone with network access could hijack a relay. Now, you can build production applications with confidence that your publisher's credentials can't be misused by viewers, and vice versa.

The provisioning model is worth understanding because Cloudflare is documenting it as a standard draft at the IETF. Rather than each CDN building proprietary control planes, they want a common model so clients and relays can interoperate. This is how you build ecosystems instead of silos.

## The Architecture That Scales Differently

What I find most interesting is how Cloudflare has built this without adding virtual machines, containers, or dedicated processes. Creating a relay doesn't spin up infrastructure; it creates an isolated logical scope across the existing global network.

This is fundamentally different from how most developers think about scaling media infrastructure. Normally, you run N relay instances, add a load balancer, configure regions, estimate capacity. With MoQ provisioning, you make an API call, get back a relay ID and credentials, and it's immediately available on all 330+ Cloudflare edge locations.

If you've deployed [WebRTC infrastructure before](https://mgks.dev/tags/webrtc/), you know the operational weight that adds. This approach treats infrastructure as a commodity you're borrowing from a global mesh rather than machines you're provisioning.

## What This Enables

MoQ on QUIC is fast because QUIC runs underneath it. Latency characteristics are dramatically better than traditional RTMP or even WebRTC in many scenarios because you skip some of the setup handshakes. The protocol's publish/subscribe model means the relay handles fan-out without the publisher managing connections to thousands of viewers.

With authentication now in place, entire categories of applications become viable: live auctions where bids must reach bidders in milliseconds, interactive live shopping, competitive gaming, real-time collaboration tools. Anywhere you need low latency at scale without building your own delivery infrastructure.

I'm particularly interested in the IETF draft-16 additions. The PUBLISH command lets publishers send tracks to the relay before subscribers request them, eliminating the first-subscription-triggers-publisher-start delay. SUBSCRIBE_NAMESPACE lets subscribers request all tracks under a namespace, including ones added later. These are small features that solve real problems in live streaming.

## Unanswered Questions

The API is currently in beta and will change. Token scoping today is binary (publish/subscribe), but Cloudflare acknowledges this is too coarse. They're working with the community on finer-grained permissions. You might want track-level access control, namespace restrictions, or regional limitations.

I'm also curious about pricing once beta ends. The real value of this service is operational simplicity, not raw compute cost. If the pricing reflects that (and Cloudflare's track record suggests it might), adoption could accelerate quickly.

The bigger question is whether the IETF standardization process moves fast enough. MoQ is still in draft stage. Clients and servers need to implement it. Ecosystem maturity takes time, and most developers are still comfortable with established tech. That said, the speed at which IETF moves on QUIC-related specs has improved, and Cloudflare's commitment to open standards here is encouraging.

## What Developers Should Do

If you're building [real-time applications](https://mgks.dev/tags/realtime/), this is worth experimenting with. The beta is free. The docs are solid. Even if you don't adopt MoQ immediately, understanding how the provisioning API works gives you a mental model for how future CDN control planes might function.

The shift from dedicated relay instances to logical scopes on a global mesh is philosophically important. It mirrors how serverless changed our thinking about compute. Here, we're seeing media delivery become commodity infrastructure you rent by the connection, not by the box.

The question isn't whether MoQ replaces existing protocols overnight; it won't. The question is whether infrastructure that's free to use globally, requires no operational overhead, and gets you sub-100ms latency becomes the default choice for new projects.