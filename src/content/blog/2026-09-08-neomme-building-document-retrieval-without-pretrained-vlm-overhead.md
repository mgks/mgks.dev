---
title: "NeoMME: Building Document Retrieval Without Pretrained VLM Overhead"
description: "NeoMME is a 260M/800M multimodal encoder that rethinks visual document retrieval by training a single bidirectional Transformer from scratch instead of stacking pretrained components."
date: 2026-09-08 12:00:20 +0530
tags: rollup, artificial-intelligence, multimodal-ai, document-retrieval, efficient-ml
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

I've been watching the visual language model space evolve, and I'm struck by how many teams bolt together pretrained vision towers, projectors, and causal decoders for tasks that don't actually need text generation. NeoMME challenges this architectural orthodoxy in a way that feels both obvious and overdue.

The team behind NeoMME (pronounced 'nee-oh-me') started with a simple observation: if you're building a document retriever or classifier, you don't need a generative VLM's parameter overhead or compute costs. You need fast, accurate embeddings. So they designed a multilingual multimodal encoder from scratch, training it with masked discrete-diffusion on both text and images using the same computational path.

What strikes me most is the efficiency-quality tradeoff they've achieved. The 260M model outperforms every model strictly below 800M parameters on ViDoRe v3, reaching 0.523 nDCG@10 while using 14x fewer parameters than ColQwen2.5. At matched resolution on an L40S GPU, it encodes about 51 pages per second, nearly 2x faster than ColModernVBERT. This isn't marginal improvement; it's the kind of step-change that matters for production systems.

## Training for retrieval, not generation

The pretraining approach reveals how seriously they took efficiency. Instead of following the conventional path of using a massive pretrained vision encoder, NeoMME processes raw 32x32 image patches directly through a bidirectional Transformer. For text-only examples, they apply variable masking rates (0-100%) and train the model to denoise. For multimodal examples, they keep images visible while forcing the model to reconstruct masked text with corruption rates between 0.3 and 1.

This is clever because it naturally incentivizes the model to learn grounded descriptions. Light masking lets the model guess from surrounding text alone. Heavy masking forces image understanding. The dataset mix spans multilingual text, code, math, natural images, and documents, totaling about 524 billion tokens. They chose the NorMuon optimizer to squeeze better performance from this relatively modest (compared to ModernBERT's 2 trillion) text budget.

The architecture rejects the conventional wisdom that you need separate encoders for vision and language. By unifying both modalities through one bidirectional Transformer, NeoMME gains advantages in pretraining, fine-tuning, parallelization, and serving. If you've struggled with coordinating vision tower updates across your deployment pipeline, you'll appreciate the simplification here.

## Page images, not text extraction

For document retrieval, they fine-tuned NeoMME-Retriever using ColPali's page-image methodology. This decision matters more than it might seem. Traditional document RAG extracts text via OCR, losing layout, charts, tables, and visual hierarchy. NeoMME-Retriever treats pages as images, preserving everything that makes documents human-readable.

One forward pass returns both dense and late-interaction embeddings, giving developers flexibility. You can use late-interaction for maximum recall on smaller corpora, or run a hybrid approach: dense retrieval for initial filtering through an ANN index, then late-interaction reranking on candidates. This pragmatism suggests the authors understand production constraints.

## The compression frontier

Late-interaction embeddings scale linearly with image patches. A 2048x2048 page produces roughly 2.1 MB in float32. Across benchmarks, the average is 1.5 MB per document. For large corpora, this becomes prohibitive. The team combined hierarchical token pooling and asymmetric quantization to compress this down to 6 kB per page (255x smaller) while retaining 95% of retrieval quality. That's the kind of engineering that separates research papers from systems you'd actually deploy.

They've also published clear compression tradeoff curves so you can pick the right operating point for your storage budget and quality requirements. This transparency feels rare and valuable.

## What this means for builders

If you're currently using a pretrained VLM for retrieval or classification, you might be paying unnecessary computational overhead. NeoMME suggests there's a category of tasks where purpose-built encoders beat repurposed generative models on efficiency, quality, and speed.

The models are available in Hugging Face Transformers under Apache 2.0, with both dense and late-interaction checkpoints ready for fine-tuning. This lowers the barrier to building visual document retrieval systems that don't require massive cloud budgets just to index a corpus.

I'm also thinking about the broader pattern here. ModernBERT improved text encoders by dropping unnecessary generative architecture. ModernVBERT added a vision tower. NeoMME drops the tower entirely and trains unified from scratch. Each step shaves away assumptions that feel natural until someone questions them.

As RAG systems move toward hybrid text and visual retrieval, having efficient multimodal encoders matters. The question isn't whether visual document retrieval works; it's whether we can afford to deploy it at scale, and whether the models we deploy actually need to generate text or just understand it.