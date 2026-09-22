---
title: "Meta's Rebalancer: How to Solve Assignment Problems at Scale"
description: "Meta open-sourced Rebalancer, a framework for solving large-scale bin packing and assignment problems. What it means for infrastructure optimization."
date: 2026-09-22 18:00:20 +0530
tags: rollup, software-engineering, optimization, infrastructure, systems-design
image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070"
featured: false
---

Assignment problems are everywhere in infrastructure. How do you distribute shards across servers? Route traffic through datacenters? Assign serverless functions to optimize locality? These sound like different problems, but they're all instances of the same fundamental challenge: given objects and bins, optimize placement while respecting constraints.

Meta's Algorithmic Optimization team recently open-sourced Rebalancer, a framework that makes solving these problems tractable at massive scale. I find this genuinely interesting because it bridges a gap that's plagued infrastructure teams for years: the gap between what we want to express (real business logic) and what solvers can actually handle (mathematical formulas).

## The Usability and Scalability Trap

Traditionally, optimization problems get solved by either commercial MIP solvers like Gurobi or hand-rolled heuristics. Commercial solvers are powerful but demand precise mathematical formulation. Practitioners struggle translating domain knowledge into constraint matrices. Hand-rolled heuristics are pragmatic but hard to reuse and debug.

Rebalancer separates specification from solution. You describe your problem using a domain-specific language centered on objects, bins, constraints, and objectives. A task is an object. A server is a bin. CPU and memory are dimensions. Capacity limits are constraints. From that specification, Rebalancer auto-generates either a local search heuristic or a MIP for external solvers.

This design choice matters. It lets practitioners think in their domain rather than solver syntax. Need to change how utilization is calculated? Adjust the expression API. Need to add a new constraint? Add another spec. This incremental abstraction is exactly what makes complex systems approachable.

## Expression Graphs and Two Solving Strategies

Under the hood, Rebalancer compiles specifications into an expression graph. Leaf nodes represent raw utilization (like memory used by tasks on a server). Parent nodes aggregate or transform these values (Max, Sum, Square, Abs). This graph is elegant because constraint evaluation during search becomes a straightforward graph traversal.

Rebalancer offers two solving strategies, and the choice depends on problem size and time budget.

The optimal solver translates the expression graph into MIP constraints and feeds it to FICO Xpress, Gurobi, or HiGHS. This works well for moderate problems but hits a hard ceiling: worst-case model size is O(objects * bins). On Meta's largest problems, this is simply infeasible.

The local search solver works directly on the graph, exploring neighborhoods by moving objects between bins. Each move generates a candidate assignment. Rebalancer evaluates all candidates, picks the best one that doesn't violate constraints, and repeats. The neighborhood size is only O(objects + bins), and with aggressive parallelization and pruning, Rebalancer achieves millions of evaluations per second.

Here's what's striking: at Meta, almost all large-scale production problems use local search. The optimal solver is reserved for offline prototyping and baseline tuning. This reveals something important about modern infrastructure scale: exact optimality is often less valuable than fast-enough feasibility.

## Real-World Impact at Scale

Rebalancer has been running in production at Meta for a decade. The numbers are humbling: roughly 40 million assignment problems solved daily across 30+ unique formulations. P99 solve time on a problem with 265k objects and 3.2k bins is 12 seconds. Problems exceeding 1 million objects average 171 seconds.

Applications span sharding (Shard Manager), service placement (RAS), traffic routing (Taiji), serverless grouping, ML workload balancing, meeting room assignment, and support ticket routing. That range suggests Rebalancer solves a genuine category of problems, not a niche use case.

## The Debugging Burden

Interestingly, Meta's teams discovered that once formulation became easy, debugging became hard. Without visibility into solver behavior, engineers struggled answering questions like: which constraints are actually binding? What if I relaxed that constraint? Why was this object placed there instead of here?

So they built Rebalancer Explorer, a Dockerized web UI that surfaces these questions. This is a subtle but important lesson: frameworks that make specification easy can inadvertently make debugging harder unless instrumentation is considered from the start.

## What This Means for Infrastructure Engineers

Rebalancer is open-source under Apache 2.0, and I think it represents a maturing approach to optimization in systems. Instead of building custom solvers for each problem, we're learning to describe problems formally and let tooling handle the solving.

For teams doing capacity planning, load balancing, or resource scheduling, this is worth exploring. Your specific constraints might map cleanly to Rebalancer's spec language. Even if you don't use it directly, the design philosophy (separate specification from solving, support both exact and heuristic methods, invest in debugging UX) applies broadly.

The broader implication: as infrastructure grows more complex, optimization frameworks that hide solver internals while exposing domain concepts become increasingly valuable. The question isn't whether you need optimization; it's whether you can afford custom implementations for every variant of the problem you'll encounter.