---
title: "Speculative Decoding Meets Vision: LFM2.5-VL Gets the Speed Treatment"
description: "Liquid AI's DSpark draft model accelerates vision-language inference by 2.3x on-device and 20x on GPU, but Amdahl's law reveals the real bottleneck."
date: 2026-09-26 00:00:20 +0530
tags: rollup, artificial-intelligence, vision-language-models, speculative-decoding, edge-inference
image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720"
featured: false
---

I've been watching the speculative decoding arms race closely, and what Liquid AI just shipped with LFM2.5-VL-DSpark caught my attention for a deceptively simple reason: they're being honest about where the speedups actually matter.

For context, speculative decoding is a technique where a smaller "draft" model generates multiple candidate tokens in parallel, and the larger target model validates them in a single forward pass. It's elegant, deterministic (greedy output matches the target model exactly), and it's been transforming datacenter inference. But vision-language models are different. And Liquid's willingness to say "end-to-end gains are more modest than decode gains" tells me they understand the real constraints.

## The Architecture That Works

Liquid's approach is pragmatically sound. They reuse the DSpark architecture from their text models: tapping hidden states at fixed layers, projecting both image patches and text into a shared representation space before those layers, then letting the 280M-parameter draft model operate on uniform-dimensional vectors. No modality-specific hacks. The result is a 4-layer, attention-only drafter with a block size of 9 (clamped to 8 at inference for hardware considerations).

What matters here is parameter efficiency. Adding just 8.9% to the deployed model's size is reasonable. And day-one support across llama.cpp, MLX-VLM, and SGLang (with the appropriate builds) signals that this isn't a lab novelty but something genuinely meant for production use.

## The Numbers That Matter

The raw decoding speedups are impressive: 2.3x to 3.13x on Apple silicon (M5 Max), 1.57x to 2.14x on M3 Ultra, and 20.4x to 2.66x on H100. But here's where I appreciate their transparency. End-to-end latency improvements are substantially smaller: 1.56x to 2.62x on M5, 1.30x to 1.77x on M3, and 1.64x to 2.27x on H100.

Why the gap? Amdahl's law. Vision encoding and prefill dominate the wall time, especially on edge devices. A large decode speedup doesn't help if prefill accounts for 60% of your latency.

## Where Speculation Falls Short

This is the part everyone should internalize. VLMs process hundreds of visual tokens after the image passes through an encoder. On an M5 Max, that prefill cost is massive relative to decode. Even a 3x decode win only yields 1.56x end-to-end improvement. Edge devices with less compute see this effect even more acutely.

GPUs fare better because they're compute-rich. H100s can handle prefill efficiently, so decode speedups translate more directly to end-to-end gains. But that 20.4x peak is deceiving without context: it's task-dependent, and measured against a baseline that wasn't optimized for speculative decoding from the start.

I see this pattern across the industry now. We're chasing decode speed because it's measurable and flashy, but the real wins come from shrinking the parts of the pipeline we haven't accelerated. This is why I'm increasingly interested in approaches like [streaming prefill and continuous batching](https://mgks.dev/tags/inference-optimization/).

## The Developer Experience Angle

What excites me here is the pragmatism around deployment. You're not learning a new inference framework or wrestling with custom kernels. SGLang, llama.cpp, and MLX-VLM all have the necessary support. Block size is baked into the config. The safetensors and GGUF formats cover most deployment scenarios.

This matters because speculative decoding only delivers value if it actually ships. I've seen clever techniques languish because integrating them required rewriting half your inference stack. Liquid's decision to work within existing ecosystems sidesteps that friction.

## What's Next

The fact that this works across such diverse tasks (VQA, text OCR, captioning, chart reasoning, conversation) suggests the draft model isn't overfit to a narrow use case. That's harder than it sounds. It means the DSpark approach generalizes across modalities and reasoning patterns, which bodes well for scaling.

But I'm watching for what happens when we combine speculative decoding with other prefill acceleration techniques. Speculative decoding is a decode-only win; if we simultaneously optimized prefill via better tokenization schemes or learned compression, the end-to-end multipliers could shift dramatically. For [vision-language models](https://mgks.dev/tags/vision-language-models/) specifically, maybe we need draft models for prefill too.

The question isn't whether speculative decoding works for VLMs. It clearly does. The question is whether it's the bottleneck we should be optimizing, or a distraction from the real constraint: the compute cost of processing thousands of visual tokens before we even start generating.