---
title: "Three LLM Inflection Points in Twelve Months"
description: "How Claude Opus 4.5, Fable class models, and reasoning breakthroughs transformed coding agents from unreliable to indispensable."
date: 2026-11-26 12:00:20 +0530
tags: rollup, engineering, llms, coding-agents, ai-engineering
image: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232"
featured: false
---

A year ago, I wouldn't have trusted an LLM to ship production code without extensive review. Today, I'm shipping features faster than I ever have. The difference isn't incremental improvement. It's three distinct inflection points that fundamentally changed what's possible.

## The Reliability Threshold: Opus 4.5

November 24th, 2025 matters because Claude Opus 4.5 crossed a threshold I didn't know existed. It was the first model where the default output was generally correct.

I'd been using Claude Code since February 2025, but honestly, it felt like a productivity tax. I'd generate code, find bugs, correct them, iterate. The friction wasn't worth the speed boost. With Opus 4.5, something shifted. For most daily coding problems, it just got it right. When it was wrong, the mistakes were instructive rather than fundamental.

OpenAI hit a similar mark around the same time with GPT-5.1 variants. The December holidays became a playground for testing these tools at scale, and by January, we stopped treating them as experiments. They became default tools in our workflows.

This matters because reliability changes incentives. When success requires 70% accuracy, you use an LLM as a research assistant. When it hits 85-90% on your specific use cases, you rebuild your entire development process around it.

## The Proactive Turn: Fable Class Models

Then came the moment that made me realize something genuinely new was happening.

I asked Claude Fable 5 to help debug a Safari display glitch. Instead of asking clarifying questions or dumping code snippets, it spun up its own screenshot mechanism using pyobjc-framework-Quartz and built a CORS-enabled localhost logging server to actually investigate the problem. It saw a goal and autonomously created the instrumentation to solve it.

That's not faster code generation. That's something else entirely.

I'm calling these "Fable class" models, and they share a specific characteristic: given a clear goal and the right tools, they don't just solve the immediate problem. They become proactive collaborators who understand context, anticipate needs, and build infrastructure to support their own reasoning.

My mysterious beep finder is the clearest example. I gave Fable 5.2 access to five WebAudio microphones and asked it to locate an infuriating noise in a room full of boxes. It triangulated the source to within 40 centimeters by designing and executing its own spatial analysis. That's not a bigger transformer or better training data. That's fundamentally different reasoning.

I'd classify Claude Fable 5.x, Opus 5.5 (I think of it as "cheap Fable"), GPT-6 Astra, and Gemini 4 Neon as hitting this inflection point. These are now what I expect from frontier models. Everything else feels like a step backward.

## The Taste Problem: Understanding Fun

The third inflection point caught me by surprise because I didn't think it was possible.

I built a Command & Conquer-style RTS game with Claude Fable 5 in August. It was technically impressive and visually competent. It was also boring after 90 seconds. I tried everything: better prompts, more detailed specifications, tweaks to the mechanics. Nothing worked because the fundamental problem wasn't engineering. It was design sensibility.

Then in September, Opus 5.5 came out. I told it plainly: "This game isn't fun enough yet. Make it a LOT more fun." I went to sleep. When I checked in the morning, it had spent 12 hours playtesting new features, rebalancing economies, tweaking feedback loops, and tuning the pacing. The result was a game I actually wanted to play.

I've been to two conferences since then where indie developers showed me AI-assisted games that felt like proper, complete experiences. Not tech demos. Not competent but soulless. Genuinely good games.

This is the most consequential inflection point because it represents a qualitative leap. For years, we've known LLMs could optimize and iterate on specifications. The breakthrough is understanding that some problems aren't about specification at all. They're about taste, coherence, and intuitive understanding of what humans find engaging. When an LLM can reason about fun in ways that match your own sensibilities, everything changes.

## What This Means Going Forward

Software development looks fundamentally different than it did a year ago. The developers who've adapted have compressed years of work into months. The indie games scene is in a culture war about what this means for human creativity.

I'm not entirely sure what Fable 5.2 represents yet. Is it another incremental step or a new inflection point? The evidence suggests something shifted. I'm burning through problems I've procrastinated on for years. Three weeks of releases in Datasette and LLM have delivered more progress than the previous three months combined.

If you can imagine and clearly describe a piece of software, Fable can build it. I still can't quite believe that's true, but I'm living it. The question isn't whether LLMs will transform development anymore. It's whether the next inflection point comes in months or weeks.