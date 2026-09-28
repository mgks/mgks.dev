---
title: "DSpark Vision Drafters Bring 3x Speedups to Edge VLMs"
description: "Speculative decoding for vision-language models achieves significant inference speedups on edge devices and GPUs with minimal parameter overhead and day-one framework support."
date: 2026-09-28 06:00:20 +0530
tags: rollup, artificial-intelligence, ai-inference, vision-language-models, edge-computing
image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=2070"
featured: false
---

Liquid AI just shipped something that caught my attention: a speculative decoding drafter for their LFM2.5-VL vision-language model that achieves 2.3x to 3.13x faster decoding on Apple Silicon and up to 2.66x on H100 GPUs. What makes this particularly interesting isn't just the numbers, but how they've engineered it and what it reveals about the current state of VLM inference.

The core idea carries over from their text LFM2.5-DSpark work: tap into the target model's hidden states at fixed layers, then use a lightweight 280M-parameter drafter to speculatively generate candidate tokens before the main model verifies them. The clever part is how they handle the multimodal aspect. By projecting both image patches and text tokens into a shared representation space before those tapped layers, the drafter operates on hidden-state vectors of identical dimensionality regardless of modality. This means the inference algorithm stays unchanged from their text models, which is elegant in terms of implementation and probably critical for maintaining code quality across frameworks.

## Understanding the Efficiency Tradeoff

Here's where I think the real insight lies: speculative decoding only accelerates the decode phase, not vision encoding or prefill. On datacenter GPUs, this is less of a problem because compute is abundant. But on edge devices, prefill already dominates wall time. The M5 Max sees end-to-end improvements of 1.56x to 2.62x, which is solid but noticeably lower than the 2.3x to 3.13x decode-only speedups. This is pure Amdahl's law in action. You can't speed up something proportionally to the parts that still run at full speed.

What I find valuable is that Liquid AI seems aware of this constraint and measured it explicitly across diverse tasks (VQA, text VQA, captioning, chart QA, reasoning, multi-turn conversation). The variation in end-to-end gains (1.30x to 2.62x on M5 Max, 1.64x to 2.27x on H100) tells a story: some workloads are decode-bound, others aren't. That's useful information for developers deciding if this optimization is worth integrating.

## Practical Framework Integration

What excites me most is the day-one support for llama.cpp, MLX-VLM, and SGLang. These aren't academic showcases, they're the tools people actually use to run VLMs locally and at scale. The drafter ships in both Safetensors and GGUF formats, which means developers can grab it immediately and experiment.

The implementation details matter too. With SGLang, you attach the draft model via command-line flags and query an OpenAI-compatible endpoint. With llama.cpp and MLX-VLM, the block size is read from metadata, so there's minimal configuration overhead. The fact that speculative decoding is exact (the target verifies every token) means greedy output always matches the target model alone, no quality regression.

For anyone building applications with [vision-language models](https://mgks.dev/tags/vision-language-models/), this removes a friction point. You don't need to fork the codebase or wait for long-term ecosystem support. The infrastructure is there now.

## What This Signals for the Industry

I think this work is telling us something important about VLM inference optimization going forward. The low parameter overhead (just 8.9% for 280M parameters) and strong performance suggest speculative decoding scales well for multimodal models. Unlike some inference tricks that only work for narrow cases, this approach improves performance across six different task categories without specialized tuning per workload.

The on-device results are particularly interesting for developers targeting Apple Silicon. A 1.56x to 2.62x end-to-end speedup transforms what's practical on an M5 Max. That's the difference between 'technically runs' and 'actually usable for real applications.' Similarly, on H100s, the 1.64x to 2.27x gains are meaningful for cost-sensitive inference clusters where every percentage point of efficiency matters.

What I'm curious about is how this scales to larger VLMs. The LFM2.5-VL-3B is relatively compact. Would a drafter designed for something like LLaVA or Claude's vision model show similar efficiency gains, or does the ratio of vision processing to language modeling start to dominate differently at larger scales?

The deeper question is whether this becomes table stakes for VLM deployments, similar to how quantization and KV-cache optimization are now expected. If the community converges on speculative decoding for VLMs the way text LLMs have, we might see a meaningful reduction in the compute required to serve these models at scale. That would reshape economics for everyone from edge device manufacturers to cloud providers.