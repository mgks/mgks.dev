---
title: "MilleMiglia: Open-Sourcing the Supply Chain's Forgotten Middle"
description: "Google researchers release MilleMiglia, an open-source benchmark for middle-mile logistics optimization. Why this matters for the future of supply chain software."
date: 2026-09-22 00:00:21 +0530
tags: rollup, research, logistics, optimization, supply-chain
image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070"
featured: false
---

# The Supply Chain's Hidden Problem

When you order a Dutch poffert online and it arrives fresh the next day, 450 miles away, you're witnessing one of logistics' most complex puzzles: the middle mile. Yet despite consuming enormous portions of supply chain budgets, this segment has been largely ignored by both researchers and developers.

Google researchers Aymane Lotfi and Thibaut Cuvelier just released MilleMiglia, an open-source instance generator that could change this. I think this matters more than most people realize, especially if you're building optimization software or working on supply chain problems.

## Why Middle-Mile Has Been Invisible

The logistics industry has historically obsessed over two extremes: first-mile (factory to distribution center) and last-mile (distribution center to customer). Both fit neatly into the vehicle routing problem (VRP) framework that academic research loves. Thousands of papers, countless libraries like OR-Tools, and entire companies are built around optimizing these stages.

The middle mile? It's been treated like infrastructure. A boring relay race between regional distribution centers that happens to cost massive amounts of money and dictate whether goods arrive fresh or spoiled.

The real reason for this neglect is simple: data. Logistics companies treat their network topologies and demand volumes as trade secrets. Without public benchmarks, academic progress stalled. Researchers couldn't test algorithms. Developers couldn't build specialized tools. Everyone just copied VRP solutions and hoped for the best.

## What Makes Middle-Mile Different

The brilliance of MilleMiglia is that it forced the team to articulate why middle-mile isn't just a bigger VRP problem. The structure is fundamentally different.

In last-mile delivery, a truck follows a route. Each package stays in one vehicle from origin to destination, usually within a single day. It's a sequencing problem: which customer gets served first, in what order, within time windows.

In the middle mile, packages transfer between vehicles across a multi-day continental network. A parcel from Groningen might travel to Utrecht, then Antwerp, then Paris before hitting the last-mile network. At each hub, it's unloaded, sorted, consolidated with other freight, and loaded onto the next scheduled truck. This is a synchronization problem, not a routing problem.

Miss the scheduled connection at a hub? Your package waits until the next cycle. This single constraint makes the problem a multi-commodity flow puzzle on a space-time graph, not a traveling salesman variant. Most existing VRP solvers simply cannot handle it.

## How MilleMiglia Solves the Data Problem

The generator creates synthetic instances that preserve realism while protecting proprietary information. It uses statistical distributions calibrated against both publicly available data and privately disclosed information from industrial partners. The result: benchmarks that look like real logistics networks without revealing anyone's secrets.

I appreciate the technical choices here. It's written in C++, uses Protocol Buffers for serialization, and embeds all constraints (vehicle schedules, throughput limits, synchronization requirements) in a single file format. This is the opposite of fragmentation. Unlike VRP which has dozens of variants (CVRP, VRPTW, PDPTW), middle-mile constraints live together in one standardized structure.

The team is also generating instances at different scales, from small research problems to massive datasets suitable for training machine learning models. This is exactly what the research community needs.

## Why This Matters for Developers

If you're building [optimization](https://mgks.dev/tags/optimization/) software or working on supply chain tools, this is significant. MilleMiglia provides what CVRPLIB gives to vehicle routing: a standardized, peer-reviewed benchmark suite. This means:

You can now publish middle-mile algorithms with reproducible results. You can compare performance across different approaches. You can build specialized solvers that exploit middle-mile structure instead of retrofitting generic VRP tools. You can attract academic talent to a problem that's been invisible.

Beyond benchmarks, Google is working on a specialized solver and API designed specifically for middle-mile problems. This suggests the future of logistics software isn't about generalizing existing frameworks further. It's about recognizing structural differences and building tools that exploit them.

## The Bigger Picture

What strikes me is how this reflects a broader pattern in research infrastructure. The best tools often emerge when someone finally admits that existing abstractions don't fit the problem. For years, researchers tried to squeeze middle-mile problems into VRP frameworks because that was the only standardized way to think about them. MilleMiglia doesn't solve that by adding another variant. It solves it by saying: this deserves its own representation.

The collaboration between Google, UniBrescia, and ENPC Paris also matters. This is the kind of problem that requires both industrial grounding and academic rigor. You need practitioners to say "our networks look like this" and researchers to translate that into clean mathematical structures.

If the community takes this seriously, we're looking at the next wave of supply chain optimization: specialized algorithms for problems that have been hiding inside generalized frameworks. And that means better software, faster optimization, and yes, fresher pofferts arriving at your door.

The question now is whether the research community will finally pay attention to the problem that's been powering global commerce while nobody was looking.