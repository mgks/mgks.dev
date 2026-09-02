---
title: "Claude Fable 5.1: When Reasoning Effort Actually Matters"
description: "Testing Anthropic's new Fable 5.1 across reasoning levels reveals a wild cost/quality tradeoff. The pelican benchmark shows reasoning might not be what we think it is."
date: 2026-09-02 12:00:21 +0530
tags: rollup, engineering, claude, benchmarks, ai-reasoning
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
featured: false
---

Anthropic dropped Claude Fable 5.1 today, and the headline is impressive: a 52.6% score on the new Terminal-Bench-Science 0.1 benchmark, crushing previous models. But there's something more interesting hiding in the details, and it cost me $5.13 and a lot of time to find it.

I did what I always do with new Claude releases: I asked it to generate an SVG of a pelican riding a bicycle. Not exactly a scientific task, but it's become my personal litmus test for model capability across Anthropic's releases. With Fable 5.1 now offering five distinct reasoning effort levels (low, medium, high, xhigh, max), I wanted to see what actually changes as you crank up the reasoning dial.

The answer surprised me: almost nothing, until suddenly everything.

## The Flat Middle

At low and medium reasoning effort, Fable 5.1 produced nearly identical SVGs with identical reasoning traces (meaning: no reasoning at all). The output tokens barely differed: 1,998 vs 1,977. Both took about 23 seconds. The model seemed to skip reasoning entirely for this prompt at these effort levels, treating them as equivalent to just... running normally.

High effort gave me a slightly expanded version with more planning text visible ("I'm planning the SVG layout for a pelican riding a bicycle..."), but the actual SVG quality was indistinguishable. Same pelican, basically. We're still in the realm of competent but unremarkable.

Then I hit xhigh.

Suddenly: 36,767 output tokens. 7 minutes 51 seconds. $1.83 for a single prompt. The reasoning transcript exploded with detail. The model was actively debating design decisions, considering trade-offs, reconsidering approaches. "I'll accept the slight thickness as charming rather than overengineering it," it decided. The output was noticeably better: cleaner proportions, better positioning of the pelican on the bicycle.

But max is where things got genuinely impressive. 65,927 output tokens. Nearly 14 minutes of compute time. $3.30. The reasoning became almost novelistic, working through micro-decisions about helmet placement, considering visual hierarchy, adjusting control points in Bezier curves. The final SVG showed clear signs of that extended deliberation: a cute blue hat on the pelican, a fish in a basket, feet properly positioned on pedals, wings gripping handlebars.

## What This Costs Us

Let's be honest about what just happened: I spent $5.13 to get a better drawing of a pelican on a bike. That's absurd on its surface. But it's also revealing something important about how these models actually work.

The jump from high to xhigh isn't about a 40% improvement in reasoning tokens. It's a 14x increase in output tokens and an exponential increase in time and cost. We're not in linear scaling territory anymore. And the quality improvement, while real, is more about thoughtful iteration than fundamental capability.

This connects to something I [wrote about earlier this year](https://mgks.dev/tags/benchmarks/) regarding benchmark fatigue. The pelican test has become less predictive of general capability than it used to be. What it's become excellent at is showing *within-model* variation at different reasoning levels. For Fable 5.1, that variation is wild.

## The Real Question

What I'm actually interested in is who pays $3.30 per request for better SVG generation, and when that's worth it. For coding tasks, scientific research, or genuinely complex problem-solving, maybe the cost pencils out. For creative or exploratory work? The incentives get murkier.

Anthropically's emphasizing the science benchmark numbers, and rightly so. A 52.6% on a new benchmark focused on terminal-based reasoning is genuinely strong. But I'd rather see extended reasoning effort tiers tested on tasks where the cost-benefit analysis actually makes sense for real users.

The pelican rides his bike capably at every reasoning level. He just rides fancier bikes when you pay more. The question for developers is whether fancy is worth the bill, and whether [our benchmarks are actually measuring](https://mgks.dev/tags/ai-reasoning/) what we need them to measure in production systems.