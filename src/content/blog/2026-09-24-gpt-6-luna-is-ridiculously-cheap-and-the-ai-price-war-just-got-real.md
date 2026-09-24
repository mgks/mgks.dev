---
title: "GPT-6 Luna is ridiculously cheap, and the AI price war just got real"
description: "OpenAI and Anthropic dropped massive price cuts today. Here's what it means for developers building with LLMs in 2026."
date: 2026-09-24 12:00:22 +0530
tags: rollup, engineering, llm-pricing, gpt-6, claude
image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070"
featured: false
---

Yesterday felt like a normal release cycle. Grok 4.7, MiMo v2.6 Flash/Pro, Claude Opus 5.5, then GPT-6 Sol and GPT-6 Luna all dropped within hours. But when I started charting the pricing, I realized we've just entered a new era of LLM economics.

GPT-6 Luna is now $0.10/$0.50 per million tokens. That's cheaper than anything OpenAI has shipped except for Nano variants, and it's half the price of GPT-5.6 Luna, which was already my favorite model for building production applications. Somehow they made it cheaper *and* better.

## The pricing landscape has fundamentally shifted

I've been tracking these numbers obsessively, and the competitive pressure is undeniable. Grok 4.7 came in at $2/$6 for input/output, undercutting GPT-5.6 Sol by more than 50%. But now GPT-6 Sol matches Grok's input pricing while being cheaper on output. Meanwhile, Anthropic dropped Opus 5.5 pricing by 20% and slashed cache read prices by 60%, which matters enormously for agentic workflows.

Here's what kills me: GPT-5.6 Terra is getting a 25% price increase in November, and GPT-6 Sol is already cheaper than Terra's promotional pricing. Any remaining justification for using Terra just evaporated. The model tier consolidation is real.

At this price point, GPT-6 Luna becomes the default choice for cost-sensitive applications. The Datasette Agent demo I upgraded to Luna feels fast and competent at SQL generation and JavaScript scaffolding, which tells me we're not sacrificing capability for the price cut. That's genuinely rare in this space.

## Reasoning models are hitting their limits

I ran my standard pelican test against Claude Opus 5.5 at 'max' reasoning level, and for the first time ever, a model failed to complete the task. It didn't refuse or hallucinate - it over-thought itself into the 128,000 token output limit, spending 20 minutes and $2.56 of my money thinking about SVG path coordinates while generating nothing.

This is concerning. I specifically chose 'max' reasoning mode hoping for better quality, but if it's going to get stuck in analysis paralysis on trivial prompts, I don't trust it for serious work. Fable 5.1 at 'max' reasoning didn't have this problem and produced better results, which suggests the issue is specific to how Opus 5.5 handles the reasoning budget.

It makes me question whether 'max' reasoning is actually useful yet, or if we're still in the phase where "thinking hard" is often just "thinking long." [I've been experimenting with reasoning models](https://mgks.dev/tags/reasoning-models/) since they launched, and this is the first time one has genuinely concerned me.

## What this means for building in production

I've switched my default models in Codex and Claude Code. GPT-6 Sol handles complex tasks with good reliability, and Luna handles everything else at a fraction of the cost. This two-tier approach is going to be standard for a lot of developers now.

The cache pricing reduction on Anthropic's side is particularly interesting for anyone building [long-running AI agents](https://mgks.dev/tags/ai-agents/). If 90% of your input tokens hit the cache at 60% of the previous price, that's transformative economics for systems that reuse large contexts.

But here's the tension: we're seeing a price war, not a quality war. Every model released today is competent. The delta between Luna and Sol exists mostly in speed and reliability on hard problems, not in whether they can solve your problem at all. That means the differentiation now lives in the ecosystem, the APIs, the developer experience, and the reasoning capabilities that don't hit token limits.

## The real story is consolidation

We're watching the LLM market compress from dozens of viable options down to a handful of dominant providers and pricing tiers. Haiku 4.5 is $1/$5, but GPT-6 Luna is $0.10/$0.50 - if Haiku 5.5 doesn't come in significantly cheaper, it loses its reason to exist. Anthropic has to match Luna's pricing or cede the lower end entirely.

Meanwhile, GPT-6 Astra and Claude Fable 5.1 are both sitting at $10/$50, fighting over who owns the premium reasoning tier. Below that tier, it's increasingly a race to zero on price.

The real question isn't whether Luna or Sol is better - it's whether these price points are actually sustainable, or if we're witnessing a race to irrelevance where margins compress until only the companies with the most efficient inference infrastructure can survive.