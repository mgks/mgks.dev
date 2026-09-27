---
title: "Speculative Decoding Brings VLMs to the Edge"
description: "Liquid AI's DSpark draft model achieves 3x faster vision-language inference on-device and 2.66x on H100s while adding just 8.9% parameters."
date: 2026-09-28 00:00:20 +0530
tags: rollup, artificial-intelligence, vision-language-models, speculative-decoding, edge-ai
image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720"
featured: false
---

I've been watching the slow march toward practical edge AI for years now, and Liquid AI's LFM2.5-VL-DSpark feels like a meaningful inflection point. They've taken speculative decoding, a technique that's been quietly improving text model inference, and extended it into the vision-language space where it actually matters even more.

The core idea is elegant: use a smaller draft model to speculatively generate token sequences, then have the larger target model verify them in parallel. This turns the memory-bandwidth bottleneck of decoding into a throughput problem that modern hardware can actually solve. But vision-language models add complexity because you're not just decoding text; you're juggling image patches, visual tokens, and text embeddings across multiple modalities.

## Making Multimodal Work

What impressed me most is how they unified the architecture. By projecting both image patches and text tokens into a shared representation space before the tapped layers, the drafter operates on identical hidden-state dimensions regardless of whether it's processing visual or textual information. This means the inference algorithm stays exactly the same as their text implementations. That's not obvious engineering, and it matters for adoption because it keeps the inference stack simple.

The draft model itself is minimal: 280M parameters, a 4-layer attention-only architecture with a block size of 9. That 8.9% parameter overhead is tiny compared to the speedups they're reporting. On-device with MLX on an M5 Max, they're seeing 2.30x to 3.13x faster decoding and 1.56x to 2.62x end-to-end improvements. On H100s, it's 2.66x to 20.4x on decoding, though end-to-end tops out around 2.27x.

The end-to-end numbers matter more than raw decoding speed, and here's where Amdahl's law kicks in. Vision encoding and prefill are compute-bound operations that don't benefit from speculative decoding. On edge devices like Apple Silicon, this creates a ceiling: even massive decode speedups can only improve overall latency so much if vision encoding and prefill already dominate the wall clock time. It's honest framing from Liquid AI, and it tells me they understand the real constraints developers face.

## Hardware Reality Matters

I think there's an underappreciated insight here about hardware specialization. The M5 Max's per-core GPU neural accelerators specifically narrow the gap between edge and datacenter performance on prefill-heavy workloads. This suggests that future edge silicon designed with VLM inference in mind could push these end-to-end gains much higher. The drafter itself is hardware-agnostic, but the architecture's potential is only fully realized on silicon that handles the non-speculative parts efficiently.

The deployment story is equally important. Day-one support for llama.cpp, MLX-VLM, and SGLang means developers don't need to wait for ecosystem maturation. The block size is automatically read from configuration files, and setup is straightforward enough that experimenting with local inference becomes practical. That's the kind of friction reduction that actually drives adoption.

## What This Means for Builders

For developers, this opens a real path toward local VLM deployment at scale. The speedups are material enough to change the economics: a 2.27x end-to-end improvement on an H100 might be the difference between feasible and infeasible for certain applications. On-device, even 1.56x improvements matter when you're running on battery or trying to minimize cold start latency.

The measurements across six diverse vision tasks (general VQA, text VQA, image captioning, chart QA, complex reasoning, multi-turn conversation) following the MMSpec benchmark suggest these gains generalize reasonably well. That's the opposite of cherry-picked results, and it matters for production confidence.

I'm also tracking how this affects the [https://mgks.dev/tags/inference-optimization/](inference optimization landscape). Speculative decoding has proven useful for text LLMs, but VLMs are where it might see real traction because the inference costs are higher and more developer-visible. If this pattern continues, we might see drafting become a standard component of VLM serving stacks, the way batching and quantization have.

The release on Hugging Face in both Safetensors and GGUF formats is tactically smart. It signals maturity and removes barrier-to-entry for experimentation. The open model approach also means the broader community can build on these results rather than waiting for next-generation hardware.

Speculative decoding won't solve every inference problem, and Amdahl's law is real, but for the specific domain of vision-language inference on constrained hardware, this feels like a genuine step forward in making edge deployment practical rather than theoretical. The question now is whether this inspires hardware designers to optimize the vision encoding and prefill stages that currently bottleneck end-to-end latency.