---
title: "How Near-Free AI Intelligence Will Reshape Data Systems"
description: "AI inference costs have dropped 50x per year. Here's what that means for how we build, query, and trust data systems going forward."
date: 2026-07-10 06:01:02 +0530
tags: rollup, research, ai, data-systems, agents
image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070"
featured: false
---

Intelligence is getting cheap. Not metaphorically cheap, actually cheap. GPT-4-class reasoning that cost $30 per million tokens in early 2023 now runs under $1, and some providers are pushing below $0.10. That is a 50x median annual decline. I think most developers have not fully internalized what this means yet, because the implications go far deeper than "AI features are now affordable." It changes the fundamental architecture of data systems.

A recent perspective from UC Berkeley's EPIC Data Lab lays this out clearly, and I want to walk through what I see as the most consequential shifts for anyone building data infrastructure today.

## Agents Are About to Become Your Heaviest Database Users

Here is the uncomfortable truth: your database was not designed for agents. It was designed for humans clicking through dashboards, or applications firing well-formed queries shaped by developers. Agents behave completely differently. They introspect schemas, run exploratory column scans, issue partial queries, revise them, and iterate, all before settling on a final answer. A single user request for something like "why did coffee sales drop in Berkeley this year" could spawn thousands of individual SQL queries across multiple agents exploring different hypotheses in parallel.

The research finding that surprised me most here is that only 10 to 20 percent of sub-plans across these agentic attempts are actually distinct. That means 80 to 90 percent of the work is redundant. From a correctness standpoint, that redundancy helps because more attempts means higher task success rates. From a systems standpoint, it is a massive waste.

This is where ideas from multi-query optimization and shared scan literature become newly relevant. Data systems that can detect overlapping sub-plans and reuse intermediate results will have a real edge. So will systems that support approximate query processing, letting agents get directionally correct answers fast rather than waiting for exact results that may not even matter for the next reasoning step.

I also find the idea of flipping the passive/active dynamic compelling. Right now, a database executes what it is told. But an agent can accept any form of textual feedback. A smarter system could intercept an expensive query, estimate its latency, and steer the agent toward a cheaper path before burning compute. That kind of proactive behavior was not viable when every client expected strict query results. Agents open that door. If you are building on top of [AI and data tooling](https://mgks.dev/tags/ai/), this architectural shift is worth thinking about now.

## Memory and State Management for Agent Swarms

The second challenge is less about queries and more about what happens when hundreds or thousands of agents are running concurrently, sharing state, writing memories, and sometimes stepping on each other.

The current default is basically: write markdown files, search with grep or embeddings. That works at small scale. It will not work when agents are handling the majority of knowledge work at an organization. Context windows have limits, and even as they grow, stuffing every relevant memory fragment into context has real latency costs.

What we actually need is structured memory, organized across multiple attributes so that retrieval can be targeted and precise. Think of it like a schema for agent knowledge. An agent debugging a flaky test should be able to retrieve memories tagged specifically for that module, language, and failure mode, not a fuzzy bag of embedding neighbors. And critically, what gets retrieved should be corrective, not just descriptive. Raw agent traces including past mistakes will just teach future agents to repeat those mistakes.

The concurrent write problem is thornier. When thousands of agents are simultaneously attempting transactions and most need to be rolled back, the standard versioning and copy-on-write approaches start to strain. Livelock, where agents spend all their time compensating for each other's actions without making progress, is a real failure mode to design against. This is an area where techniques from distributed systems like CRDTs and operational transformation will likely find new life inside agent infrastructure.

For anyone thinking about [infrastructure and systems design](https://mgks.dev/tags/infrastructure/), agent coordination is going to be one of the defining engineering challenges of the next few years.

## Synthesizing Data Systems From Scratch

The third shift is the wildest one. Agents are getting capable enough to write entire data systems from scratch, custom-built for a specific workload. The idea of a general-purpose database that handles every use case starts to look like a legacy constraint when you can synthesize a purpose-built system on demand.

The hard part is verification. How do you trust a system you did not write and may not fully understand? This is not just a correctness problem, it is a confidence problem. Developers need tools to validate that agent-synthesized systems behave as intended, under edge cases, under load, and over time.

I think this is where the next decade of database research will actually live, not in query optimization or storage formats, but in the question of how humans maintain meaningful oversight over systems that increasingly design and build themselves.

The cheapest intelligence in history is about to become the most active user of every data system ever built, and the question is whether those systems are ready for it.