---
title: "How Near-Free AI Intelligence Rewrites Data Systems"
description: "AI inference costs have fallen 50x per year. Here's what that means for how we build, query, and trust data systems going forward."
date: 2026-07-13 12:01:01 +0530
tags: rollup, research, ai, data-systems, agents
image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070"
featured: false
---

The cost of running a GPT-4-class model has dropped from roughly $30 per million tokens in early 2023 to under $1 today, with some providers pushing below $0.10. That is not incremental progress. That is a phase transition. And if you are building data infrastructure, it changes almost everything about your assumptions.

I have been thinking a lot about a recent perspective from Aditya Parameswaran and collaborators at UC Berkeley's EPIC Data Lab. They frame the implications around three axes: data systems *for* agents, *of* agents, and *by* agents. It is a sharp framing, and I think it deserves more attention from the people actually writing the software.

## Agents Are Terrible SQL Clients (In the Best Way)

When a human analyst queries a database, they issue maybe a dozen queries in a session. When an agent tackles something like 'why did coffee sales drop in Berkeley this year,' it can spin up thousands of sub-queries, exploring joins, filters, and aggregations across a combinatorial search space. The Berkeley team found that on text-to-SQL benchmarks with multiple agents, only 10 to 20 percent of sub-plans are actually distinct. The other 80 to 90 percent is redundant work.

This redundancy is not entirely bad. More attempts genuinely improve task success rates. But from a database engine's perspective, it is catastrophic waste. The good news is that this is a solved class of problem in a different context. Multi-query optimization, shared scans, approximate query processing (AQP) - these ideas from the database literature suddenly become front-and-center engineering priorities again. I find it fascinating that decades-old research is getting a second life because the *client* changed, not the underlying data.

What I think is even more interesting is the idea of making data systems proactive rather than passive. Right now, a database engine waits for a query and returns results. But an agent can accept any form of textual feedback. So a system could respond to an expensive query with a latency estimate before executing it, or surface results for related queries the agent has not thought to ask yet. The system knows the schema and statistics; the agent knows the goal. That handshake has never been properly designed before because humans were always in the loop.

If you work on [infrastructure](https://mgks.dev/tags/infrastructure/) tooling, this is where I would be placing bets right now.

## Memory Is the Underrated Bottleneck

The current agentic stack writes to markdown files and retrieves them via grep or embedding-based search. For a single agent on a short-horizon task, this is fine. At the scale of thousands of agents running long-horizon knowledge work, it will break down hard.

Context windows are growing, but stuffing every potentially relevant memory fragment into context is not a scalable strategy. Latency alone makes it a poor default. What you actually want is structured retrieval across multiple facets simultaneously. The Berkeley team describes a structured memory scheme where memories are tagged with dimensions like table name, operation type, and corrective natural-language instructions. So an agent fixing a flaky test pulls only memories tagged to that module, framework, and failure mode, not a fuzzy blob of everything vaguely similar.

This feels like schema design for cognition. And I think that framing is exactly right. Defining an application-specific memory structure is essentially defining a schema, and just like with databases, getting that schema wrong early costs you dearly later. The open question is whether agents can help define and refine that schema over time, which starts to look like recursive self-improvement through structured memory rather than through raw model updates.

For developers building on top of [ai](https://mgks.dev/tags/ai/) agent frameworks today, the practical implication is that your memory layer deserves as much design attention as your prompt templates. Probably more.

## Trusting Code No Human Fully Wrote

The third challenge is the one that keeps me up at night. Agents are becoming capable of synthesizing entire data systems from scratch, custom-built for a specific workload. The performance and efficiency arguments for doing this are compelling. The verification problem is severe.

If an agent generates a custom query engine or storage format for your workload, how do you know it behaves correctly? Unit tests written by the same agent are not sufficient. The system might pass every test the agent thought to write while silently mishandling edge cases the agent never considered. This is not a hypothetical risk. It is the exact failure mode you see in LLM-generated code today, just at a much larger and more consequential scale.

The intersection of all three challenges - agents querying data, agents running on data infrastructure, and agents building that infrastructure - creates a loop that is either very powerful or very fragile depending on how seriously we take verification. The database community spent decades building formal foundations for query correctness. We may need to do something analogous for agent-synthesized systems, and we do not have decades this time.

The real question is not whether agents will take over knowledge work. It is whether the infrastructure underneath them will be trustworthy enough to matter when they do.