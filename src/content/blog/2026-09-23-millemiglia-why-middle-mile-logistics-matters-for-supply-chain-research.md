---
title: "MilleMiglia: Why Middle-Mile Logistics Matters for Supply Chain Research"
description: "Google open-sources MilleMiglia, a benchmark generator tackling the overlooked middle-mile logistics problem that represents huge costs in global supply chains."
date: 2026-09-23 06:00:21 +0530
tags: rollup, research, logistics, optimization, supply-chain
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065"
featured: false
---

When I think about how a Dutch poffert reaches my door 450 miles away by next morning, I rarely consider the journey between distribution centers. That's the middle mile, and it's where the real logistics problem lives.

The first and last miles get all the attention. Academics have built decades of research around vehicle routing problems (VRP) for local pickup and final delivery. Google Maps Platform has sophisticated APIs for last-mile optimization. Open-source solvers like OR-Tools handle thousands of delivery scenarios daily. But the middle mile? That continental relay race of goods moving between regional distribution centers has been largely ignored by the research community, despite representing a massive chunk of supply chain costs.

Google's new MilleMiglia generator addresses this gap, and I think it signals something important about how we approach optimization research when real-world complexity collides with academic simplicity.

## The Middle-Mile Constraint Problem

The reason middle-mile logistics has been overlooked isn't laziness. It's that the problem is fundamentally different from what standard VRP solvers handle. In last-mile delivery, a truck leaves a distribution center and visits customer locations in sequence. The optimization is local and immediate: which stops do we visit today, in what order?

In middle-mile logistics, a single shipment bounces between multiple vehicles across days or weeks. A package might arrive in Utrecht, miss its scheduled truck to Paris because capacity is full, and wait until the next cycle. This creates what researchers call a "synchronization problem." Your shipment must arrive at intermediate hubs within specific time windows to catch the next leg. Miss that window and you're sitting in a warehouse until tomorrow's truck.

This transforms the mathematical structure entirely. You're no longer solving a vehicle routing problem. You're solving a [multi-commodity flow problem on a space-time graph](https://mgks.dev/tags/optimization/). That's fundamentally different, and existing VRP solvers can't handle it.

Logistics companies know this constraint intimately. But they treat their network topologies, demand volumes, and optimization strategies as proprietary secrets. From a research perspective, this creates a desert: we have wonderful benchmarks for standard VRP variants (CVRP, VRPTW, PDPTW), but nothing for the problem that actually costs supply chains the most money.

## MilleMiglia as a Research Bridge

What MilleMiglia does is provide the standardized benchmark data that middle-mile research desperately needs. It's written in C++ and uses Protocol Buffers for serialization, making it language-agnostic. More importantly, it generates realistic instances by interpolating between public industrial data and privately disclosed information, creating privacy-preserving synthetic networks.

The generator captures constraints that matter for real operations: fixed vehicle schedules, distribution-center throughput limits, consolidation requirements, and time-window synchronization. All of this is embedded in a single file format, unlike traditional VRP variants which each have their own specialized format.

I think this is significant because it democratizes a problem that was previously locked behind corporate data rooms. Researchers at UniBrescia and ENPC Paris can now work on instances that reflect actual logistics challenges. Machine learning researchers can generate huge datasets for training algorithms. Solver developers can optimize specifically for middle-mile flow structures instead of adapting general VRP tools.

## What This Means for Developers

For developers building logistics systems, MilleMiglia opens a new frontier. If you're currently using OR-Tools or similar general-purpose solvers for anything involving multi-day, multi-hub shipment routing, you're probably leaving significant optimization on the table. The structure of middle-mile problems requires specialized algorithms.

Google is apparently developing a specialized solver alongside this instance generator. I expect we'll see a wave of middle-mile optimization tools in the coming years, similar to how the CVRPLIB benchmark created an entire ecosystem of VRP solvers.

More practically, having open-source benchmarks means companies can now validate their middle-mile optimization strategies against standardized instances. That's a big deal for supply chain engineering.

## The Benchmarking Precedent

MilleMiglia is explicitly positioned as the first step toward a standardized benchmarking suite similar to [CVRPLIB for vehicle routing](https://mgks.dev/tags/supply-chain/). This precedent matters. When you give researchers standardized benchmarks, they compete on solving the problem better, not on arguing about whether their problem formulation makes sense. That accelerates progress dramatically.

The collaboration between Google, UniBrescia, and ENPC Paris suggests this isn't just an academic exercise. Google is investing in this because they likely operate middle-mile logistics at scale. The open-source release signals confidence that standardized benchmarks will benefit the entire industry by pushing algorithm development forward.

What begins as an open-source benchmark for research often becomes the foundation for production systems. I wonder what optimizations we'll see emerge once researchers have ten years of middle-mile benchmark results to work from.