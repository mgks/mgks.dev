---
title: "NeoMME: Why Unified Multimodal Encoders Matter for Document AI"
description: "NeoMME ditches separate vision and text encoders for unified multimodal retrieval. What this means for building faster, leaner document search systems."
date: 2026-09-05 18:00:20 +0530
tags: rollup, artificial-intelligence, multimodal, retrieval, document-ai
image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070"
featured: false
---

I've been watching the evolution of visual language models closely, and there's a pattern I keep seeing: we bolt together separate pretrained vision towers, text encoders, and decoders like we're assembling a Frankenstein's monster. It works, but it's expensive, inefficient, and designed for a task (text generation) that doesn't match what we actually need most of the time.

Then NeoMME showed up, and I think it represents something important: a quiet shift toward purpose-built architectures instead of adapting generative models for every problem.

## The Problem With Borrowed Architecture

Most visual document retrievers today follow a predictable pattern. They take a pretrained vision encoder (like SigLIP), pass images through it, then feed the results into a separately trained language model. It works, sure, but you're carrying parameter overhead from components designed for tasks you don't need. A retriever doesn't generate text autoregressively. It doesn't need a causal decoder. Yet that's exactly what many systems include.

ModernBERT showed that bidirectional encoders could be efficient for text-only tasks. The question NeoMME's creators asked was sharper: what if we applied that thinking to multimodal retrieval from first principles?

The answer is a single bidirectional Transformer that processes both text tokens and raw 32x32 image patches. No separate vision tower. No causal decoder. One computational path for both modalities. This isn't just about reducing parameters (though both the 260M and 800M variants are lean). It's about architectural honesty: building what you actually need instead of adapting what you have.

## The Training Story Matters

What I find compelling is how they trained this thing. Rather than fine-tuning existing pretrained components, NeoMME was trained from scratch using masked discrete-diffusion on 524 billion packed tokens. For text-only examples, they randomly mask between 0-100% of tokens. For multimodal examples, they keep image patches visible while forcing the model to reconstruct masked text at rates between 30-100%.

This is clever. Light masking lets the model cheat by inferring from surrounding text alone. Heavy masking forces genuine image-language understanding. Over time, the model learns to ground its representations in visual information when necessary.

The data efficiency story is important too. Modern generative models like GPT-4 train on trillions of tokens. NeoMME used 524 billion, about a quarter of ModernBERT's budget. They compensated with the NorMuon optimizer, which improves data efficiency. I think this signals something the industry needs to hear: scale-at-all-costs may not be the only path forward. Smarter training sometimes beats brute force.

## What Matters for Practitioners

Let me cut to what actually matters if you're building document retrieval systems. On the ViDoRe v3 benchmark, NeoMME-Retriever-260M hits 0.523 nDCG@10, the highest score among all models under 800M parameters. It matches ColQwen2.5 while using 14x fewer parameters. The 800M variant reaches 0.556 nDCG@10, nearly matching models of similar size.

But here's the part that caught my attention: encoding speed. At 2048x2048 resolution on an L40S GPU, the 260M model encodes about 51 pages per second. That's nearly 2x ColModernVBERT's throughput. For building large search indices, speed translates directly to cost. Faster encoding means less GPU uptime, less cloud spend.

Then there's the storage optimization. Late-interaction embeddings from high-resolution pages can be massive, around 1.5 MB per document. Using hierarchical token pooling and asymmetric quantization, they compressed that to 6 kB per page (255x smaller) while retaining 95% of retrieval quality. One forward pass returns both dense and late-interaction embeddings, giving you flexibility depending on your corpus size and infrastructure.

## The Broader Signal

What strikes me about NeoMME is that it's the opposite of the AI industry's current direction. While everyone else is scaling up [foundational models](https://mgks.dev/tags/foundation-models/) with ever-more parameters, this team proved that focused architecture design matters as much as scale.

They open-sourced everything under Apache 2.0. It's available in Hugging Face Transformers. No gatekeeping. No proprietary weights. That matters because it means the community can experiment with unified multimodal encoders for applications beyond document retrieval: [classification](https://mgks.dev/tags/classification/), token labeling, recommendation systems.

I think we'll see more of this pattern: purpose-built encoders that reject the "one model fits all" mentality. The real innovation isn't always in making bigger models bigger. Sometimes it's in building exactly what you need, nothing more.