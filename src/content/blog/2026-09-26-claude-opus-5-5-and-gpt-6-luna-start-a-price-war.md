---
title: "Claude Opus 5.5 and GPT-6 Luna Start a Price War"
description: "Anthropic and OpenAI released new models today with aggressive pricing. Here's what it means for building AI applications."
date: 2026-09-26 12:00:21 +0530
tags: rollup, engineering, llms, pricing, ai-engineering
image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070"
featured: false
---

Yesterday was pelicans. Today was more pelicans, plus a proper price war.

Anthropic released Claude Opus 5.5 this morning, and about an hour later OpenAI dropped GPT-6 Sol and GPT-6 Luna. Both companies just cut their per-token costs significantly, and the implications for developers are substantial.

## Pricing That Actually Matters

Let me be direct: GPT-6 Luna at $0.10/$0.50 per million tokens is absurdly cheap. It's one of the cheapest models OpenAI has ever released, beaten only by their April and August 2025 Nano variants. When I compare this to what we were paying for GPT-5.6 Sol before today's half-price cut, the difference is staggering.

Opus 5.5 is meanwhile 20% cheaper than the previous Opus generation that had held stable pricing for five releases. More significantly, cached token reads dropped 60%. For anyone running agentic systems that process longer conversations, where 90%+ of input tokens hit cache, this is a material reduction in monthly spend.

What's happening here is clear: both companies are competing aggressively on the application layer. They know developers choose based on cost and capability combined, and right now the cost lever matters more than marginal intelligence gains.

## The Capability Question

But cheaper only matters if the models actually work. I tested both new Claude models using my standard "pelican riding a bicycle" SVG generation task. It's a silly test, but I find it reveals interesting things about how models handle creative spatial reasoning and code generation.

Opus 5.5 at maximum thinking level failed spectacularly. It over-thought the problem so intensely that it hit the 128,000 output token limit while still reasoning about SVG coordinates. Then it did it again on a second attempt. Each failure cost me $2.56 and took nearly 20 minutes.

This is concerning. The "max" thinking level appears to be a trap on simpler tasks. If Opus 5.5 can over-think a ridiculous bicycle-riding pelican prompt into oblivion, I have genuine doubts about trusting it on more complex work without careful tuning.

Fable 5.1 on maximum thinking, by contrast, produced solid results without the failure mode. That matters for how I'm thinking about which Claude model to default to in my applications.

## What This Means for Your Stack

I've already shifted my defaults. Codex and Claude Code now use GPT-6 Sol and Opus 5.5 respectively. The Datasette Agent demo is now running on GPT-6 Luna and performing well on both SQL query generation and building HTML/JavaScript interfaces.

For most application developers, Luna should become your default for cost-sensitive work. It's fast, competent, and dirt cheap. For work where you need stronger reasoning, Sol gives you better performance at a price point that's now identical to what Opus 5.5 costs. That's the real competition right now: not Luna vs Haiku, but Sol vs Opus 5.5.

The Haiku tier is getting squeezed hard. Current Haiku 4.5 pricing is $1/$5, while Luna is $0.10/$0.50. Anthropic needs Haiku 5.5 to address this gap or the lower-end market becomes dominated by OpenAI's offering.

For https://mgks.dev/tags/ai-engineering/ work, this is the moment where pricing stops being a secondary concern and becomes a primary architecture decision. You're now choosing between models that are genuinely close in capability but vastly different in cost.

## The Thinking Trap

One more thing worth noting: the extended thinking feature in Claude appears to have real failure modes on simpler tasks. I need to understand this better before trusting maximum reasoning levels in production systems. The two $2.56 failures were educational, but they point to a gap in how these models handle their own cognitive budgets.

This is different from the typical scaling laws we see in LLMs. It's not about whether more thinking makes better results. It's about whether the model knows when to stop thinking. For https://mgks.dev/tags/llms/, that's a capability that matters more than raw intelligence.

We're in a genuinely interesting period where the competitive pressure is creating real choice for developers instead of forcing us into a single obvious option. The question now is whether that choice leads to better applications or just cheaper ones.