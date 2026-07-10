---
title: "How Near-Free AI Intelligence Will Reshape Data Systems"
description: "AI inference costs have dropped 50x in a year. Here's what that means for data systems, agentic workloads, and developers building the next layer of infra."
date: 2026-07-11 00:01:02 +0530
tags: rollup, research, ai, data-systems, agents
image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070"
featured: false
---

There's a quote from the Gettysburg Address that keeps surfacing in AI circles lately: government of the people, by the people, for the people. Swap 'government' for 'intelligence' and you get something that feels surprisingly accurate for where we're headed. Intelligence is getting cheap enough to be genuinely universal, and that changes everything underneath it.

GPT-4-class capabilities cost around $30 per million tokens in early 2023. Today you can get the same quality of reasoning for under $1, and some providers are pushing below $0.10. That's not a gradual decline. That's a collapse. And the implication isn't just that AI gets more affordable; it's that the entire architecture of software systems built on top of it needs to be rethought from scratch.

I've been following a perspective piece from Aditya Parameswaran's group at UC Berkeley, and it frames this shift through three questions that I think every developer working near data infrastructure should sit with.

## Agents Are About to Become the Dominant Database User

When a human analyst queries a database, they issue maybe a dozen queries in a session. When an agent tackles the same task, it might issue thousands. The pattern is fundamentally different: lots of schema introspection, partial query formulation, exploratory column scanning, and iterative refinement. What the Berkeley group calls 'agentic speculation' is not a neat sequence of SQL statements. It's a high-volume, heterogeneous stream of overlapping work.

Here's the part that jumped out at me: in experiments on text-to-SQL benchmarks with multiple agents working the same task, only 10 to 20 percent of the sub-plans are actually distinct. That means 80 to 90 percent of the query work is redundant. Current database engines have no idea this is happening. They execute each query in isolation, burning compute on work that's already been done.

The fix isn't just caching. It's rethinking the query interface itself. Instead of agents issuing one SQL query at a time, imagine a system where agents submit a batch with explicit approximation tolerances. The database engine can then do multi-query optimization, share scans across overlapping plans, and stream partial results so agents can bail early if the direction isn't promising. This is decades-old academic work finally finding its killer use case.

What excites me about this direction is that the database stops being a passive executor. A smarter system could steer agents, suggest related queries, warn about expensive plans before running them, or proactively materialize views it predicts will be useful. This is now feasible precisely because agents can accept free-form textual feedback rather than requiring a strict result schema. If you're building in this space, check out what's happening in the [agents](https://mgks.dev/tags/agents/) ecosystem right now because the tooling is moving fast.

## Memory at Scale Is an Unsolved Problem

The current dominant approach to agent memory is essentially: write everything to markdown files, retrieve via grep or embeddings. It works well enough for small setups. It will not survive a world where thousands of agents are doing the bulk of knowledge work simultaneously.

The core problem is faceted retrieval. If an agent is debugging a flaky test, it needs memories tagged by module, framework, failure mode, and language, not just the top-k most semantically similar snippets. Unstructured embeddings smear everything together. What's needed is something closer to a structured schema for memory: attributes that can be matched exactly, wildcarded, or filtered, with natural language instructions attached as payloads.

The Berkeley group describes a structured memory format where dimensions like table name, operation type, and corrective instructions can be stored and queried in combination. That's essentially giving agents a queryable episodic database rather than a pile of notes. The parallel to schema design is not accidental. Defining a good memory schema for an agent application might end up being as important as designing a good relational schema for a traditional app.

Concurrent writes are the other nightmare here. When thousands of agents are editing shared state simultaneously, copy-on-write semantics and optimistic concurrency start to crack. Most attempted transactions will need to be rolled back; only the 'correct' outcome should persist. Techniques from CRDTs and operational transformation research are relevant, but nobody has demonstrated these at the scale we're talking about. The risk of livelock, where agents endlessly compensate for each other's actions without making real progress, is a genuine failure mode that nobody has cleanly solved.

For developers building [infrastructure](https://mgks.dev/tags/infrastructure/) for multi-agent systems, this is the unglamorous work that will define reliability at scale.

## Synthesis Over Configuration

The third shift is the most speculative but potentially the most disruptive. Agents are now capable enough to synthesize entire data system components from a workload description. Instead of configuring a general-purpose engine, you describe your access patterns and let an agent write a custom system tuned exactly for them.

The verification problem is real. How do you trust a synthesized system? Differential testing against a reference implementation is one approach, but it's expensive and never exhaustive. This is going to require new thinking about correctness guarantees, property-based testing, and formal verification methods that can operate at the speed of synthesis.

We are not far from a world where the data system you deploy was written entirely by an agent the week before and tested against a workload you described in plain English. That should make you both excited and a little uncomfortable, which is probably the right disposition for where we're going.