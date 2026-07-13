---
title: "How Near-Free AI Intelligence Will Reshape Data Systems"
description: "AI inference costs have dropped 50x per year. Here's what that means for data systems, agentic workloads, and the developers building them."
date: 2026-07-13 06:01:02 +0530
tags: rollup, research, ai, data-systems, agents
image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070"
featured: false
---

The cost of running a GPT-4-class model has dropped from roughly $30 per million tokens in early 2023 to under $1 today, with some providers pushing below $0.10. That is not a gradual decline; it is a collapse. And when intelligence becomes essentially free, the systems we build around it need to be rethought from the ground up.

I have been following a research perspective out of UC Berkeley's EPIC Data Lab, led by Aditya Parameswaran, that frames this shift around three distinct challenges for data systems. I think every developer working near databases, pipelines, or AI tooling should understand what is coming.

## Agents Are the New Query Client

The way a human analyst queries a database and the way an agent does it are fundamentally different. A human writes one SQL query, waits, iterates. An agent running a root-cause analysis task like 'why did coffee sales drop this year' will fire thousands of sub-queries, exploring joins, filters, and aggregations across a combinatorial space. In experiments on text-to-SQL benchmarks with multiple agents per task, 80 to 90 percent of those sub-queries turn out to be duplicates.

This is both a problem and a signal. The redundancy tells us agents explore speculatively and broadly, which improves task success rates. But from a systems perspective, it is wasted compute on a massive scale. The fix is not to make agents smarter about issuing fewer queries; the fix is to make data systems smarter about handling the pattern. Multi-query optimization, shared scans, approximate query processing, result streaming - these are not new ideas, but they become critically important again under agentic workloads.

More interestingly, data systems could stop being passive executors. An agent, unlike a BI dashboard, can accept natural language feedback. A database that says 'that query will take 40 seconds, here is a related pre-materialized view that answers 90 percent of your question' is now actually useful. That kind of proactive, context-aware interaction was never worth building before. Now it is the obvious next step.

If you are interested in the broader trajectory of [AI tooling](https://mgks.dev/tags/ai/) and how it intersects with infrastructure, this is one of the most concrete areas to watch.

## The Memory Problem Nobody Has Solved Yet

When you have thousands of agents running in parallel on long-horizon tasks, where does their state live? Right now the answer is markdown files, grep, and embedding-based retrieval. That works at small scale. It breaks down fast when agents are doing the majority of knowledge work across large codebases, databases, and company-wide context.

The Berkeley perspective introduces what they call structured memory: organizing agent memory across multiple attributes like table names, operation types, and natural language instructions, so retrieval can be precise and multi-faceted rather than keyword or embedding-based. An agent debugging a flaky test should be able to pull only memories tagged with the relevant module, framework, and failure mode. Not everything in the vicinity.

What I find compelling about this framing is that it is essentially schema design for agent cognition. Defining what dimensions matter for a given application, what gets stored versus discarded, and how corrective knowledge gets encoded rather than raw traces with mistakes - this is real engineering work, not prompt tuning.

Concurrent writes to shared memory from thousands of agents also introduce consistency problems that files and key-value stores were never designed to handle. CRDTs, operational transformation, exactly-once semantics - these distributed systems concepts are getting dragged back into relevance by a completely different set of pressures than the ones that originally motivated them.

## Agents Writing the Systems Themselves

The third challenge is the one that feels furthest out but is arriving faster than people expect: agents synthesizing entire data systems from scratch for a given workload. The pitch is that if you can generate a custom system tuned to your specific access patterns, you do not need to pay the generality tax of a general-purpose database.

The hard part is not generation. The hard part is verification. How do you trust a system you did not write and cannot fully audit? This connects directly to questions around [infrastructure](https://mgks.dev/tags/infrastructure/) correctness and testing methodology that the industry has not fully worked out even for human-written code.

What makes this more tractable than it sounds is that the verification problem can itself be partially handed to agents. Agents generating test suites, checking behavioral equivalence, fuzzing their own outputs - recursive self-verification is not science fiction at this point.

Put all three challenges together and the picture that emerges is this: the database and data engineering field is about to go through a redesign cycle as significant as the move from row stores to columnar analytics, but driven by a completely different force. The query client is now an autonomous reasoner issuing thousands of speculative requests, the state management layer needs distributed systems rigor it currently lacks, and the systems themselves may soon be generated on demand.

The developers who internalize these shifts early, and start building with agentic workload patterns in mind rather than retrofitting later, are going to find themselves ahead of a very fast-moving curve.