---
title: "Streamline: Building Custom Video Pipelines on Cloudflare"
description: "Cloudflare's new Streamline platform lets developers build real-time video processing pipelines with Workers, Containers, and Durable Objects. Here's what it means."
date: 2026-10-04 18:00:20 +0530
tags: rollup, cloud, video-processing, cloudflare-workers, streaming
image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070"
featured: false
---

I've been watching Cloudflare's developer platform mature, and Streamline feels like a meaningful inflection point. They're not just hosting video anymore; they're giving developers the infrastructure to *transform* it in real-time.

When you're working with video at scale, the limitations become obvious fast. Cloudflare Stream handles hosting and delivery beautifully, but what if you need to burn subtitles into a stream? Add dynamic annotations? Create alternate versions on the fly? You'd normally need to spin up your own encoding infrastructure, manage lifecycle concerns, handle long-running processes, and deal with all the operational complexity that comes with video processing.

Streamline addresses this by combining three Cloudflare primitives in a way that actually makes sense for media workloads.

## The Architecture Pattern

The design here is clever because it acknowledges a fundamental constraint of serverless platforms: requests are stateless and ephemeral. Video processing isn't. A livestream might run for hours. You can't keep an HTTP connection open for that duration, and you shouldn't have to.

Streamline splits concerns cleanly. A Container runs the actual media engine, handling RTMPS input/output, HLS ingestion, and frame-by-frame processing. This is where the heavy lifting happens, where you need predictable CPU and memory. A Worker controls and orchestrates everything else. A Durable Object relays preview data back to the controlling application.

The elegant part: once you start a pipeline, it keeps running even if your Worker disconnects. You can safely reconnect later. The Container won't sleep through the `onActivityExpired()` callback, which prevents the automatic shutdown that normally happens with idle containers. There's also a configurable maximum duration to prevent runaway processes.

## What This Enables

I'm thinking about the use cases this unlocks. Real-time subtitle rendering from closed captions is obvious. But imagine rendering AI-generated annotations on a live sports feed. Picture-in-picture compositing for multi-camera events. Dynamic watermarking. Filter applications. Basically, anything involving frame-level manipulation that needs to happen at broadcast scale.

The developer experience matters here too. Streamline exports two packages: one for remote deployments (`@streamline/cloudflare`) and one for local development. Locally, it's just a Docker container talking to a thin adapter layer. That's the kind of parity that actually gets people building.

The API is intuitive. You pass a configuration object describing your pipeline: what filters to apply, which overlays to add, where input comes from, where output goes. The order of operations is fixed by the engine (filters, then overlays, then output), which simplifies both the implementation and the mental model.

## The Security Model Matters

What strikes me most is how seriously they've taken security. This isn't an afterthought. Stream Live Input keys are stored as secrets and never leak to the browser. The controlling Worker verifies Access integration before accepting control requests. Preview video uses separate credentials: an Access service token for the container workload and a random per-session capability for the relay. Even better, the service token is injected by an outbound Worker and never enters container memory.

For a singleton owner deployment running privately, this works well. It's not a security model for a public multi-user service, and they're honest about that. But it establishes the right foundations.

## What This Signals

I see Streamline as part of a bigger pattern across the [Cloudflare developer platform](https://mgks.dev/tags/cloudflare-workers/). They're moving beyond simple HTTP request/response patterns. First came [Durable Objects](https://mgks.dev/tags/cloud-infrastructure/) for stateful coordination. Then Workers for AI. Now Containers for long-running media processing.

The platform is maturing into something that handles not just web workloads but specialized compute patterns. That's significant. It means developers might actually choose Cloudflare not just for edge caching and DDoS protection, but as the primary compute platform for fairly complex applications.

The open-source release and public playground are smart moves. Real adoption happens when people can experiment without commitment. The example Worker application with Astro frontend handles overlays, subtitle decoding, filters, and picture-in-picture. That's enough to spark ideas.

What I'm curious about: as more developers build custom video pipelines on this infrastructure, what new media experiences become feasible that weren't before?