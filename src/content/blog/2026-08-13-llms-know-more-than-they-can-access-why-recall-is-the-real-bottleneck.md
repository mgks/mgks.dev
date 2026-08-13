---
title: "LLMs Know More Than They Can Access: Why Recall Is the Real Bottleneck"
description: "Google Research reveals frontier LLMs encode 95-98% of facts but fail to recall 26-34% of them. The factuality problem isn't knowledge gaps, it's knowledge accessibility."
date: 2026-08-13 06:00:50 +0530
tags: rollup, research, llms, ai-research, reasoning
image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070"
featured: false
---

I've been thinking a lot lately about why ChatGPT and Gemini sometimes confidently tell me things that are just... wrong. We usually assume these models either never learned the fact or simply aren't smart enough to retrieve it. But a new framework from Google Research suggests something more interesting: frontier LLMs actually know far more than we think. The problem isn't what they've learned. It's whether they can access it.

In "Empty Shelves or Lost Keys? Recall Is the Bottleneck for Parametric Factuality," researchers Nitay Calderon and Gal Yona introduced knowledge profiling, a behavioral framework that fundamentally reframes how we diagnose factual errors in large language models. Their findings hit hard: Gemini-3-Pro and GPT-5 encode 95-98% of facts from Wikipedia, yet still fail to directly recall 26-34% of them. Even with extended thinking enabled, these models fail on 11-12% of their own encoded knowledge.

This distinction matters profoundly. If a model fails because it never learned something (encoding failure), you scale up. You make the model bigger. You collect more data. But if a model fails because it can't access what it already knows (recall failure), you need different interventions entirely. You need better retrieval mechanisms, better prompting strategies, better post-training methods.

## The Real Bottleneck Has Shifted

I find the scaling evidence particularly compelling. In the Gemma 3 family, larger models show dramatically fewer encoding failures, but recall failures remain stubbornly persistent and actually become a larger share of remaining errors. This tells us something crucial: scaling is getting us the wrong solutions to the wrong problems. We're building bigger models that encode more facts, but we're not meaningfully improving how those models access what they've encoded.

The researchers discovered this pattern across different dimensions. When comparing rare facts to popular ones, they found that factual popularity gaps are actually quite small for encoding. A fact about some obscure historical figure gets encoded almost as reliably as a well-known fact. But recall? That's where the gap widens dramatically. This reframes the long-tail problem entirely. The issue isn't that models lack capacity to store rare knowledge. It's that the training process makes rare facts harder to retrieve when you ask for them in different contexts.

There's also the reversal curse insight, which I think deserves more industry attention. Models often know "A is B" but fail at "What is B?". The intuitive explanation is that bidirectional knowledge is simply absent. But the research suggests something more nuanced. In multiple-choice settings, reverse questions are no harder than direct ones. Models can recognize the right answer when it's presented as an option. They just can't generate it from scratch when the query deviates from how the fact was originally learned.

This is a recall problem, not a knowledge problem. And that distinction opens up entirely new solution spaces for folks building production LLM systems.

## Thinking as a Recall Mechanism

What I found most practically relevant was how thinking-optimized models recover otherwise inaccessible knowledge. These models recover roughly 40-65% of encoded-but-not-directly-known facts when given space for intermediate reasoning. Compare that to their recovery rate on non-encoded facts: only 5-15%. This suggests thinking acts primarily as a recall-facilitation mechanism. It's helping models access what they've already learned, not deriving answers through complex multi-step reasoning from scratch.

For developers working on [https://mgks.dev/tags/ai-research/](https://mgks.dev/tags/ai-research/) and building AI systems, this has real implications. Chain-of-thought prompting and thinking-optimized models aren't just making reasoning better. They're fundamentally changing how we should architect retrieval in neural networks. If a model can recover 40-65% of its encoded knowledge through thinking, then perhaps the bottleneck in many failure cases isn't the model at all. It's our prompting strategy and our inference methods.

The practical challenge, though, is that thinking carries computational cost. There's no general mechanism yet for determining when to invoke it. This feels like an important open problem for [https://mgks.dev/tags/reasoning/](https://mgks.dev/tags/reasoning/) systems: how do you build intelligent fallback mechanisms that know when to spend extra compute on retrieval versus when direct recall should suffice?

As we continue scaling and optimizing LLMs, I suspect the next generation of factuality improvements won't come from just making models bigger or feeding them more data. They'll come from fundamentally better knowledge utilization mechanisms. We've mostly solved knowledge acquisition. Now we need to solve knowledge accessibility. And if frontier models are already encoding nearly everything, that's exactly where the returns on investment will be found next.