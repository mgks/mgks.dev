---
title: "Cloudflare's MoQ Relay API Brings Real Production Capabilities to Low-Latency Streaming"
description: "Cloudflare adds authentication and access controls to its MoQ relay network. Now developers can build isolated, production-ready low-latency applications without managing infrastructure."
date: 2026-08-01 06:00:30 +0530
tags: rollup, cloud, cloudflare, streaming, low-latency
image: "https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070"
featured: false
---

I've been watching Cloudflare's Media over QUIC (MoQ) efforts since they opened their global relay network last year, and frankly, it felt incomplete. Yes, having over 330 cities worth of MoQ endpoints available for free was impressive for protocol testing. But an unauthenticated relay isn't production-ready, and that's a problem when you're trying to build real applications.

Today they're fixing that. The new MoQ provisioning API is exactly what was missing: isolated relays with authentication and granular access controls, available instantly across their global network. This matters more than it might seem at first glance.

## Authentication Changes Everything

Think about what an unauthenticated relay means in practice. Anyone can publish. Anyone can subscribe. That works fine for protocol development, but it's a non-starter for production. An auction site where bids need to reach bidders in milliseconds is a perfect use case for MoQ's low-latency architecture, but you can't use it if viewers' credentials could somehow be used to hijack the publisher's streams.

The provisioning API solves this by letting you create isolated relays and issue separate credentials for publishers and subscribers. Each token can be scoped to specific operations (publish, subscribe, or both), given an expiration date, and revoked independently without disrupting other clients. That's the kind of fine-grained control production applications actually need.

What I find elegant is how they're implementing this. Creating a relay doesn't spin up a virtual machine, container, or dedicated process. Instead, Cloudflare provisions an isolated scope across their existing global infrastructure. It's more like adding a virtual host than starting a new web server. That's why relays are available within seconds with no capacity planning, region selection, or load balancing required.

## The CDN Model Actually Works Here

For years, if you wanted to run a relay-based system, you had two options: build your own fleet or run dedicated instances somewhere. Both required you to estimate capacity, choose regions, and manage scaling as demand changed. It was operational overhead that didn't exist in the application domain.

Cloudflare's approach sidesteps this entirely. The infrastructure is already there. The provisioning API just wraps configuration and credentials on top of what's already running globally. That's the CDN model applied to real-time protocols, and it's genuinely different from how most MoQ deployments work today.

This also matters for standardization. Cloudflare isn't keeping this model proprietary. They're documenting the design in an Internet-Draft called "MoQ CDN Provisioning" with the explicit goal of getting multiple CDN and relay implementations to support a common provisioning model. That's how you build a real ecosystem instead of a bunch of incompatible proprietary implementations.

## Protocol Progress Matters Too

Beyond the API, Cloudflare now supports draft-16 of the IETF MoQ spec, which adds two features that improve the publisher and subscriber experience. PUBLISH lets a publisher send a track to a relay before viewers even request it, reducing the initial latency chain. SUBSCRIBE_NAMESPACE lets subscribers request every track under a namespace instead of requesting them individually, which is critical for scenarios like live streams with multiple renditions and audio tracks.

These aren't flashy features, but they're what makes the protocol actually useful. They're also being developed openly at the IETF, which means no single vendor controls the direction. That matters when you're choosing a fundamental technology for your platform.

## What This Means for Developers

If you've been waiting to build something on MoQ but hesitated because the infrastructure story was unclear, this changes things. You can now create isolated relays through a simple API, issue tokens with different permission levels, and have your application available globally without managing any servers. The beta is free at any scale, which is a solid way to get feedback before charging.

The remaining rough edges are honestly minor. Token scoping is currently all-or-nothing per relay, though the team is working on finer-grained permissions with the IETF community. They're also taking requests for features like bring-your-own signing keys.

For a developer interested in real-time applications that need both low latency and scale, MoQ is now a viable path that didn't exist even a few months ago. The question isn't whether to use it, but whether your application is ready to think differently about how it reaches its audience.