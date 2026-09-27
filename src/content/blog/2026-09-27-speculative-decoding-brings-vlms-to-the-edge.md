---
title: "Speculative Decoding Brings VLMs to the Edge"
description: "Liquid AI's DSpark drafter achieves 3.13x speedups on-device by applying speculative decoding to vision-language models, with day-one support for llama.cpp and MLX."
date: 2026-09-27 06:00:20 +0530
tags: rollup, artificial-intelligence, vision-language-models, speculative-decoding, edge-inference
image: "https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070"
featured: false
---

I've been watching the speculative decoding space evolve, and the application to vision-language models feels like a natural but non-obvious next step. Liquid AI's DSpark approach for VLMs demonstrates that the architectural patterns we've refined for text models can translate into the multimodal domain, and the results are compelling enough to shift how we think about VLM deployment.

The core insight here is elegant: image patches and text tokens both get projected into a shared representation space before reaching the target model's layers. This means the draft model operates on hidden states of identical dimensionality regardless of input modality. It sounds simple, but it's the kind of detail that enables the inference algorithm to remain unchanged from text-based DSpark. You get to reuse the entire pipeline, which is huge for deployment complexity.

## The Performance-Practicality Tradeoff

What strikes me most is the honesty around Amdahl's law. The reported speedups look impressive on the surface: 3.13x decoding speedup on Apple's M5 Max, 2.66x on H100. But the end-to-end improvements are more modest at 1.56x to 2.62x on-device and 1.64x to 2.27x on GPU. This isn't because the drafter is weak, it's because speculative decoding only accelerates the decode phase.

On edge devices, prefill and vision encoding eat a disproportionate share of latency. The vision encoder processes raw pixel data, then the language model operates on hundreds of visual tokens plus your text prompt. Prefill scales quadratically with prompt length, and that cost sits outside the decode optimization. So even a massive decode speedup gets capped by Amdahl's law. I appreciate that Liquid AI is transparent about this rather than cherry-picking the largest single-phase improvements.

This matters for developers because it reframes the question. You're not getting a free 3x overall speedup. You're getting a meaningful but bounded improvement that makes VLM inference more practical without being transformative. For many applications, 1.6x to 2.2x end-to-end acceleration is enough to unlock on-device deployment where it wasn't feasible before.

## Accessibility Through Existing Frameworks

The day-one support for llama.cpp, MLX-VLM, and SGLang is where this becomes immediately useful. I've spent enough time trying to adopt new inference runtimes to know that framework compatibility is often the blocking issue. Having the draft models available in Safetensors and GGUF formats, with plug-and-play support in established tools, removes friction.

The parameter overhead is negligible too: 280M parameters on top of LFM2.5-VL-3B adds only 8.9% to the model size. That's a small enough cost that you can ship the drafter as a sidecar without fundamentally changing deployment constraints. The training approach mirrors the text DSpark recipe, using a mixture of vision-language SFT data weighted toward expected workloads, so the draft model stays reasonably well-tuned for real-world tasks.

## Where This Intersects With Broader Trends

I see this as another data point in the larger push toward <a href="https://mgks.dev/tags/model-optimization/">model optimization</a> for edge deployment. Speculative decoding isn't the flashiest optimization, but it's becoming a standard ingredient alongside quantization, pruning, and structured compression. For VLMs specifically, we're finally getting tools that make local deployment practical without sacrificing output quality.

The exact token verification guarantee is important here: greedy output from the target model with the drafter attached is identical to the target alone. No stochastic approximation, no accuracy loss, no hallucination risk from over-aggressive drafting. That's a constraint worth respecting, and it's why the reported 8 to 9 token block size is conservative. You're trading some potential speedup for guaranteed correctness.

Looking at the benchmark results across six diverse vision tasks (general VQA, text VQA, captioning, chart reasoning, complex reasoning, multi-turn conversation), the speedups hold reasonably well across different workload types. That's encouraging for generalization, though I'd want to see longer-term data on whether the gains persist as model sizes scale or prompts get longer.

The timing feels right. We've spent years optimizing LLM inference to the point where it's accessible on consumer hardware. VLMs are the obvious next frontier, but they're harder to optimize because of the vision encoding overhead and the interaction between modalities. DSpark for VLMs suggests that the architectural patterns we've learned from text models do transfer, which should accelerate the next round of optimization work.

How many more optimization passes can we layer on top of each other before the law of diminishing returns finally dominates the entire field?