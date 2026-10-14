---
title: "LFM2.5-24B: Small Models That Actually Reason and Act"
description: "Liquid Foundation Models 2.5 brings agent-grade reasoning to 24B parameters with 3x faster inference and stronger tool use than much larger competitors."
date: 2026-10-14 12:00:20 +0530
tags: rollup, artificial-intelligence, llms, agents, edge-inference
image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=2064"
featured: false
---

I've been watching the LLM space chase bigger numbers for so long that LFM2.5-24B-A2B caught me off guard. Here's a 24-billion-parameter model that beats 35B and 26B competitors on tool use and agentic workflows while running 1.7x faster on consumer hardware. That's not incremental. That's the kind of shift that changes what's actually viable to deploy.

## The Reasoning Gap We Didn't Know We Had

LFM2.5 is a reasoning-only model, meaning it produces an explicit chain of thought before answering. That's table stakes for agents, but it wasn't the default for last-gen open models. The builders scaled pre-training from 17T to 33T tokens and added 2T tokens of mid-training specifically weighted toward reasoning, math, code, and instruction following. Then they added another 300B tokens at extended context (131K) and ran five post-training stages to turn the base model into something that can actually orchestrate tool calls and multi-turn trajectories.

This is why I think size metrics have stopped being useful. Raw parameter count tells you almost nothing about whether a model can reason through a complex task or reliably call the right tool at the right time. LFM2.5 is smaller than its competition, yet competitive or dominant on five of eight tool-use benchmarks. On AutomationBench, it scores more than three times higher than the next-best model. That gap exists because the builders optimized for what matters in production, not what looks good in a paper.

## Edge Inference Changes the Deployment Calculus

I need to be direct: the performance numbers here reframe what's actually deployable. On an M5 Max, LFM2.5 decodes at 184 tokens/second. On a Ryzen AI Max+, it hits 114 tokens/second while using less memory than competing MoEs. That's faster than the next-best model while fitting in constrained environments.

For developers building on-device AI, that shifts everything. You can now ship agents that reason and call tools without cloud roundtrips. The latency floor drops. User trust increases because computation stays local. LFM2.5 also reaches over 21K output tokens per second at scale on a single NVIDIA B300, so it's not just an edge story either.

I think we're at an inflection point where on-device reasoning becomes the default architecture for certain categories of applications, and models like this one are the foundation that makes it viable. See our guide on [local model serving](https://mgks.dev/tags/edge-inference/) for more on the infrastructure side.

## The Instruction-Following Moat

One metric I watch closely is instruction following, because it correlates with reliability in production. LFM2.5 leads on all three instruction-following benchmarks in this evaluation. That means fewer parse errors, fewer hallucinated tool calls, fewer edge cases that blow up in staging.

The trade-off is real, though. On knowledge-heavy benchmarks like GPQA Diamond and HLE, larger models maintain an edge. On coding benchmarks like SWE-Bench Verified, they also win. The builders are explicit about this: pair LFM2.5 with retrieval or web search for knowledge-heavy workloads. That's not a weakness; that's a architectural choice that makes sense. You're not running a knowledge base in the model weights. You're building a system that retrieves when it needs to and reasons locally the rest of the time. That's the right pattern for 2025.

## Ecosystem Maturity on Day One

The model ships with day-one support across llama.cpp, MLX, vLLM, SGLang, and ONNX. That means you can deploy it almost anywhere without waiting for community implementations to catch up. The setup is straightforward: serve it locally behind any OpenAI-compatible backend, point your agent harness at it, and start building.

I think this matters more than people realize. Open models with sparse ecosystem support become research artifacts. Models with full infrastructure support become tools developers actually use. LFM2.5 lands on the right side of that line.

The real question now is whether open reasoning models at this scale force the closed-model vendors to rethink their pricing, or whether we're about to see a much wider adoption of local deployment across the industry. I suspect both happen, but the second one matters more for developers building actual products.