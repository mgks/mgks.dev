---
title: "When Benchmarks Break: A Laptop Model Drew Better Pelicans Than Claude Opus"
description: "A quantized 21GB model running locally outperformed Anthropic's flagship on SVG generation. What this tells us about AI benchmarks and model comparison."
date: 2026-04-18 00:00:55 +0530
tags: rollup, engineering, artificial-intelligence, llm, benchmarks
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674'
featured: false
---

I've been running this ridiculous pelican-riding-a-bicycle benchmark for months now, and it's always been a joke. A statement about how absurdly difficult it is to actually compare [AI models](https://mgks.dev/tags/artificial-intelligence/) in any meaningful way. But this week something genuinely weird happened.

Qwen3.6-35B-A3B, a quantized model running locally on a MacBook, drew objectively better pelicans than Anthropic's brand new Claude Opus 4.7. Not just marginally better. Noticeably better. Opus messed up the bicycle frame entirely.

Let me be clear about what I'm saying here. I have enormous respect for Qwen, but I seriously doubt that a 21GB quantized version of their latest model is more powerful or useful than Anthropic's latest proprietary release. That would be insane. Yet on this specific task, the smaller local model absolutely crushed it.

## The Benchmark That Won't Die

The pelican test started as pure absurdity. Generate an SVG of a pelican riding a bicycle. That's it. No rubrics, no scoring system, just eyeball it and see what comes out. 

The strange thing is that for most of 2024 and into 2025, there was actually a loose correlation between pelican quality and general model usefulness. The early pelicans were garbage. Recent ones from models like Gemini 3.1 Pro were genuinely usable illustrations, assuming you had a pressing need to illustrate a pelican riding a bicycle.

Today that correlation snapped completely. Qwen's pelican has clean lines, proper bicycle geometry, reasonable proportions. Opus gave me a pelican with a mangled frame. I even tried passing `thinking_level: max` to Opus on a second attempt. Didn't help much.

Then I burned one of my secret backup tests. Generate an SVG of a flamingo riding a unicycle. Same result. Qwen won again, partly for the excellent `<!-- Sunglasses on flamingo! -->` SVG comment that made me laugh.

## What This Actually Means

Here's where it gets interesting for those of us building with these models. We're at a point where benchmark performance has completely decoupled from practical utility in specific domains.

Opus 4.7 is almost certainly better at reasoning, code generation, analysis, and most of the tasks developers actually care about. But SVG generation? Apparently that's a different competency entirely. And a 21GB model you can run on a laptop has it nailed while the frontier model stumbles.

This isn't about Anthropic dropping the ball. It's about the fact that [large language models](https://mgks.dev/tags/llm/) are these bizarre Swiss Army knives where the tools don't scale proportionally. Making the knife bigger doesn't automatically make every tool better. Sometimes the smaller knife has a sharper bottle opener even if its main blade is duller.

Some people think the labs are training specifically for my pelican benchmark. I don't believe that. But I'll admit, Opus's performance gave me a tiny glint of suspicion. That's how paranoid this whole model comparison game makes you.

## The Local Model Surprise

There's another angle here that matters. Qwen3.6-35B-A3B ran locally via LM Studio on a MacBook Pro M5. The whole model is about 21GB quantized. You can just download it and run it.

For certain tasks, you might genuinely be better off with a local quantized model than paying API costs for frontier models. Not for everything. Probably not for most things. But for some specific use cases? Absolutely.

If your application needs to generate SVG illustrations of animals on vehicles, well, now you know. More seriously, this suggests we need to be way more task-specific in our model selection. The days of "just use the biggest model" are getting complicated.

The weirdest part of all this is that my stupid joke benchmark accidentally stumbled into revealing something real about how these models develop capabilities, and how those capabilities don't necessarily scale the way we expect them to.