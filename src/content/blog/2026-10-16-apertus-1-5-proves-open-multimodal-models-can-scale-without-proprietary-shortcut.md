---
title: "Apertus 1.5 Proves Open Multimodal Models Can Scale Without Proprietary Shortcuts"
description: "Apertus 1.5 adds multimodal capabilities to an open 8B and 70B model with full transparency. Here's what the architecture teaches us about open AI development."
date: 2026-10-16 00:00:20 +0530
tags: rollup, artificial-intelligence, open-source, multimodal-ai, model-evaluation
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

I've been watching the open-source AI space closely, and Apertus 1.5 just landed something genuinely important: a fully transparent multimodal model that doesn't require a separate vision encoder. It's not the flashiest release, but the implications for how we build and evaluate open models are substantial.

The headline is straightforward: Apertus took their existing 8B and 70B text models and continued pretraining with 4 trillion and 2 trillion new tokens respectively, adding image and audio understanding through early-fusion tokenization. But what struck me is *how* they did it and what they're publishing alongside the weights.

## The Architecture Lesson: Simplicity Over Hacks

Most multimodal models bolt on a vision encoder, which means separate inference pipelines, higher latency, and architectural complexity. Apertus instead tokenized images with Emu3.5 (512×512 becomes 1,024 tokens) and audio with WavTokenizer (40 tokens per second), then fed everything into the same sequence as text. The model architecture didn't change. Training ran at text-only speed.

This is elegant because it's honest. You're not hiding complexity behind abstractions; you're extending the token vocabulary and letting the model learn multimodal understanding the same way it learned language. The tradeoff is real: Apertus 1.5 still only generates text, not images or audio. But for a developer building applications that need to *understand* diverse inputs, this is often exactly what you need.

The performance numbers bear this out. Apertus 1.5 8B is competitive with open-weight models on spatial and document understanding, and notably, it outperforms Claude Haiku 4.5 on the Last Translation Benchmark. For a 8B model, that's not marginal.

## Transparency as Infrastructure

But here's what really matters: the evaluation transparency. I spend a lot of time trying to figure out what models actually do versus what their marketing claims. Apertus is publishing results in the Every Eval Ever (EEE) schema, which records not just scores but who ran the evaluation, how the model was accessed, generation settings, and metric interpretations.

This matters because leaderboard scores are nearly meaningless without context. A model might score well on MMLU because of specific prompt formatting or sampling temperature choices that won't carry over to your use case. EEE schema captures that. The UK AI Security Institute uses the same infrastructure. That's not a coincidence; it's infrastructure for governance.

Moreover, Apertus published their training recipes, ablations, and data mixtures in the technical report. Intermediate checkpoints are available on Hugging Face. This means I can actually trace how each post-training stage (SFT, long-context SFT, RL, DPO, charter alignment) changed model behavior. Researchers can investigate whether multimodal reasoning traces in SFT actually persist through text-only RL. Spoiler: they do.

## What This Means for Developers

For developers building with language models, Apertus 1.5 represents a concrete option for multimodal reasoning that doesn't require proprietary APIs. The 8B model is deployable on consumer hardware. The 70B model fits on enterprise infrastructure. Both understand images and audio without architectural tricks.

The evaluations also matter practically. If you're doing translation, Swiss legal analysis, or multilingual instruction following, Apertus 1.5 has been benchmarked against comparable models in transparent ways. You can reproduce those benchmarks using their public fork of lm-evaluation-harness.

I'm also watching the community integrations: Proton Lumo, Infomaniak Euria, and API availability through Swisscom, Infomaniak, and others. This is how open models move from research artifacts to infrastructure.

## The Governance Question

One more layer: Apertus mapped their evaluation reporting to EU AI Act Article 55 and the GPAI Code of Practice. The EEE schema can represent 56 of 60 elements these frameworks require. This matters because it means open models are becoming serious about regulatory alignment before regulators demand it. That's the opposite of how proprietary models typically operate.

When evaluators, developers, and governance bodies can all access machine-readable evidence about model capabilities in a standard format, the entire ecosystem becomes more trustworthy. Not because models are suddenly perfect, but because we stop relying on press releases and leaderboard games.

Apertus 1.5 isn't revolutionary in raw capability, but it's methodically pushing the needle on how open development should work: shared infrastructure, transparent evaluation, reproducible ablations, and honest tradeoffs. The 2.0 roadmap (sparse MoE, 600B parameters, agents, math/coding) suggests they're thinking long-term about open model quality, not just quick wins.

The question now is whether other model developers are paying attention to this approach, or whether we'll keep defaulting to opaque leaderboards and closed training recipes.