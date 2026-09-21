---
title: "Why Your AI Agent Works Once But Fails the Next Time"
description: "Most benchmarks hide consistency problems behind averages. A new diagnostic tool exposes why capable agents produce unreliable results and how to fix it."
date: 2026-09-21 06:00:20 +0530
tags: rollup, artificial-intelligence, ai-agents, reliability, llm-evaluation
image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070"
featured: false
---

I've been watching the AI agent space mature, and there's a pattern that keeps surfacing in production deployments: an agent nails a task the first time, fails it the second, then succeeds again on the third attempt. Nothing changed. The prompt is identical. The model is the same. Yet the results flip like a coin.

This isn't a capability problem. It's a consistency problem, and it's almost invisible in how we measure agent performance today.

## The Benchmark Blindspot

When you see "77% accurate" on a leaderboard, that's Mean@5 talking. Run the benchmark five times, average the pass rate. It's the metric everywhere, and it's fundamentally optimistic. It asks: "how good is this agent on average?" but completely hides the question that matters in production: "will it work the same way if I ask again?"

I find this gap staggering. A ReAct agent on GPT-4.1 showed 77.4% Mean@5 on AppWorld tasks. Sounds solid, right? But when the researchers ran the same tasks five times and looked for tasks that passed *all* five runs, the number dropped to 53%. That's a 24-point consistency gap. Nearly a quarter of the benchmark is flaky by default, even though the agent is genuinely capable.

For financial transactions or contract reviews, flaky isn't acceptable. It's a showstopper.

## Why Capable Models Still Flip

Here's where the physics gets interesting. Every decision an LLM makes during agentic work comes out of a probability distribution over tokens. What matters is the shape of that distribution.

Sharp distributions put most of their probability mass on one clear winner. The runners-up are far behind. Even with tiny platform-level noise from GPU floating-point arithmetic or request batching, the same token wins every time.

Flat distributions spread comparable probability across several near-tied tokens. Which one wins is barely distinguishable from a coin flip. Tiny perturbations flip the outcome. Since a task chain involves dozens of decisions, each with a small chance of flipping, that compounds into full trajectories diverging.

Temperature, seeds, and greedy decoding won't solve this. They govern how you convert a distribution into a token, but they say nothing about the distribution itself. Even at temperature 0.0 on a hosted endpoint, the probabilities shift slightly run to run. Near-ties still reorder.

## Detecting Unstable Decisions

The real insight from this research is that you can detect exactly which decisions are at risk. The Consistency Analyzer works beautifully here: take one trajectory that succeeded, then replay each decision step with controlled resampling. For each decision, issue a batch of completions (5 by default) against the same context to measure how much the model actually varies at that point.

It's one extra call per decision step, done offline. No logits access, no model internals, just the trace you already have. You get a consistency scorecard that pinpoints which decisions are flat and flip-prone.

## Turning Diagnosis Into Guidelines

Once you know which steps are unstable, you can stabilize them. The research generated "consistency guidelines" in standard format: targeted instructions that flag specific failure modes the agent surfaced.

One real example from an AppWorld task about counting checkbox markers: "When counting checkbox-style markers in note content, use a line-anchored regex match rather than a plain substring count."

That's not task-specific trivia. It's a reusable pattern about string counting that came out of detected uncertainty. The same instability shows up across many tasks.

When these guidelines were injected at inference time, Pass^5 (the "passed all runs" metric) jumped from 53.0% to 69.0% on the same tasks. The consistency gap shrank from 24.4 points to 12.0 points. Medium-difficulty tasks saw +22.9pp gains. Hard tasks +14.3pp. And critically, Mean@5 never dropped. You're not trading average accuracy for consistency; you're getting both.

## What This Means for Builders

I think this flips how we should think about agent reliability. Consistency isn't a side effect of capability. It's an orthogonal axis. A larger model might be more capable, but it won't automatically be more consistent. You need to measure it separately, diagnose it deliberately, and fix it directly.

For developers shipping agents into production, this is essential. Your benchmark numbers are hiding flakiness. If you're building workflows where users expect the same result on retry, the average-case metric is misleading you.

The Consistency Analyzer approach works because it's pragmatic: black-box, no instrumentation beyond the trace you already record, and it targets the actual decision points leaking uncertainty into outcomes. You're not trying to make the model bigger or smarter. You're just making it more stable at the decisions that matter.

The question becomes: how many of your own agents are capable but unreliable, and how much production friction is that costing?