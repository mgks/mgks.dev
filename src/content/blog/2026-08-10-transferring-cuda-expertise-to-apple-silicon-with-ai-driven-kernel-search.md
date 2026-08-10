---
title: "Transferring CUDA Expertise to Apple Silicon With AI-Driven Kernel Search"
description: "How K-Search uses AI and structured translation to automatically port GPU kernel optimizations from CUDA to MLX, reaching near-expert performance without manual rewrites."
date: 2026-08-10 06:00:52 +0530
tags: rollup, research, gpu-kernels, apple-silicon, ai-optimization
image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070"
featured: false
---

The GPU kernel optimization crisis is real, and it's about to get much worse. We're entering an era where hardware diversity is the norm, not the exception. Apple Silicon. Custom AI accelerators. Exotic architectures from startups and established players alike. Each one demands hand-tuned, vendor-specific optimizations to unlock real performance.

The problem? The CUDA ecosystem has spent decades accumulating kernel expertise. Decades. FlashAttention, optimized SSM kernels, paged attention implementations, fused MoE routing. Thousands of engineering hours compressed into low-level code that runs at the edge of what physics allows. Newer platforms like MLX for Apple Silicon have none of that institutional knowledge. Models run correctly but often leave 10x, 20x, even more performance on the table.

So what do we do? Hire a new team of GPU experts for every new hardware platform? That's economically absurd. Manually port kernels from CUDA to Metal, from Metal to some future ISA? That's a recipe for burnout and inconsistency.

Recent work from Berkeley Sky Lab suggests a different path: what if we could automatically transfer optimization knowledge across architectures using AI?

## The K-Search Framework

The core insight here is elegant but non-obvious. K-Search is an evolutionary kernel search framework that treats GPU optimization as a decision tree problem. Rather than a flat list of things to try next, the search maintains a persistent "world model" - a prefix tree where each root-to-leaf path is a complete optimization strategy, and sibling branches represent competing approaches.

Here's how it works: an LLM (in their case, Gemini 3.5 Pro) plays dual roles. First, it reasons like a GPU performance engineer. It classifies the kernel type, rewrites the computation in canonical form, maps data layouts and access patterns, and hypothesizes the bottleneck (bandwidth? latency? compute? synchronization?). Only after this structured analysis does it propose optimizations, one atomic change at a time.

Each candidate is scored across multiple dimensions: an overall priority rating, confidence level, and estimated impacts on memory bandwidth, register pressure, and compute utilization. The search ranks partial plans, expands the most promising branches, and backs off when improvement stagnates. This is not random mutation. This is principled, reasoned search.

On CUDA kernels from FlashInfer, K-Search consistently outperformed other evolutionary frameworks across attention variants and MoE kernels. But that was on CUDA, where the ecosystem is mature. The real question was: could this knowledge transfer to genuinely different hardware?

## Bridging the Architecture Gap

This is where the work gets interesting for developers like us. You can't just hand an LLM a CUDA kernel and say "port this to Metal." You'll get syntactically valid code that is architecturally wrong. Tile sizes designed for NVIDIA's thread hierarchy don't map directly to Apple's GPU organization. Memory hierarchies are different. Instruction sets diverge. Fast paths on one platform are dead ends on another.

The breakthrough is a structured CUDA-to-MLX translation layer. Rather than expecting the LLM to rediscover optimizations from first principles, the researchers extract architecture-specific implementation knowledge from high-performance CUDA kernels (like FlashAttention-2) and feed it as context into the evolutionary search. This transforms the problem: instead of guessing, K-Search reasons about proven implementation strategies and adapts them to Apple Silicon's constraints.

The results speak for themselves. On attention kernels, the full-context configuration reached 0.97x the speed of Apple's native MLX implementation, starting from a naive baseline. Without the translation layer, it got stuck at 0.26x. The evolved kernel independently discovered the key FlashAttention-2 optimizations: threadgroup memory tiling, online softmax, K-transposition, even the exp2 trick (using fast base-2 exponentials instead of computing full exp calls).

## Proving Generalization

Attention kernels are flashy but not the whole story. The team tested on Mamba SSM kernels, which have completely different computational characteristics. Instead of softmax bottlenecks, SSM scan is inherently recurrent and looks sequentially ordered. Yet the state recurrence can be rewritten as an associative operator, enabling parallel prefix scans that run in O(log N) dependent steps instead of O(N).

The community MLX implementation didn't implement this optimization. The evolved kernel did. Result: roughly 20x prefill speedup, limited only by decode (where you can't parallelize a single token). This isn't coincidence. It's a different optimization class entirely, and the framework found it.

## What This Means for Us

The implications ripple outward. We're watching a shift from "hire experts to optimize for new hardware" to "use AI to automatically transfer expertise across platforms." That changes incentives. It means the vendor with the best documented, most thoroughly optimized kernels gains an outsized advantage as new architectures emerge. It means investing in kernel optimization now pays dividends across hardware generations, not just current-gen devices.

For developers working on Apple Silicon or other emerging platforms, it suggests a path forward that doesn't require deep GPU expertise. Feed the search framework proven optimizations from mature ecosystems, and let AI adaptation do the heavy lifting on [architecture-specific tuning](https://mgks.dev/tags/gpu-kernels/).

The work also highlights something deeper: the bottleneck in cross-platform kernel porting isn't the LLM's coding ability. It's context quality. Give an AI system the right constraints, the right architectural knowledge, the right reference implementations, and it can reason toward expert-level results. [Remove the guardrails and context](https://mgks.dev/tags/ai-optimization/), and you get hallucinations and dead ends.

What happens when this framework scales to five new hardware platforms simultaneously?