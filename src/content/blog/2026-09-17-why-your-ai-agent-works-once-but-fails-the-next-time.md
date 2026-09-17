---
title: "Why Your AI Agent Works Once But Fails the Next Time"
description: "Consistency gaps in LLM agents matter more than average accuracy. Introducing consistency guidelines to stabilize agent decisions."
date: 2026-09-17 18:00:20 +0530
tags: rollup, artificial-intelligence, ai-agents, reliability, llm-evaluation
image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070"
featured: false
---

I've watched AI agents succeed brilliantly in demos, then fail silently in production. The uncomfortable truth: your agent can be 77% accurate on average and still fail the same task half the time you run it. That's not a capability gap. It's a consistency problem, and it's been hiding in plain sight on every leaderboard.

The benchmark everyone cites measures Mean@k: run a task five times, average the pass rate. Your agent succeeded 77% of the time across five runs? Great. But here's the question nobody asks: how many tasks did it pass all five times? The real number for that same agent? 53%. That 24-point gap is the consistency gap, and it's where real-world reliability breaks down.

## The Gap Nobody Measures

I think about this differently now. There's a fundamental distinction between "how good is this agent on average?" and "will this agent handle my request reliably?". Mean@k answers the first. Pass^k, the fraction of tasks passed on every single run, answers the second. Most production workflows need Pass^k, not Mean@k.

The insidious part: this isn't about raw capability. It's about how confident the model is in its own decisions. Each time an LLM agent chooses an API call, a parameter value, or a retry strategy, that choice comes from a probability distribution over tokens. A sharp distribution puts almost all its weight on one answer. A flat distribution spreads comparable mass across several near-tied alternatives.

Flat distributions are fragile. Tiny perturbations at inference time, floating-point non-associativity, even request batching on a hosted endpoint, nudge the numbers just enough to flip near-ties. And when you chain dozens of decisions across a task trajectory, a small per-step chance of flipping compounds into a large chance the entire run diverges. That's where your 24-point gap comes from. The model isn't becoming less capable on run two. The noise floor just happened to change.

Worse: this survives greedy decoding and fixed seeds. Temperature zero helps, but it doesn't eliminate the problem. The probabilities themselves still shift slightly across requests.

## Finding the Unstable Decisions

I've started thinking of this as a search problem: which specific decisions in an agent's trajectory are the flat ones, and what do you do once you've found them?

Consistency guidelines attack this directly. The approach uses a two-stage pipeline. First, detect: replay a single recorded trajectory through controlled resampling, measuring how much the model's output varies at each decision step. This means one extra model call per step, done offline, using the same context but drawing k completions in parallel. This gives you a consistency score per decision, pinpointing exactly which steps are at risk of flipping. Second, generate: every flagged step becomes a guideline in the same format as [existing ALTK-Evolve guidelines](https://mgks.dev/tags/ai-agents), storing reusable lessons about how to avoid that kind of uncertainty.

The real example here is striking. On a SimpleNote task asking "How many activities are done in my bucket list?", the analyzer flagged a decision about counting checkbox markers. The generated guideline was: "When counting checkbox-style markers in note content, use a line-anchored regex match rather than a plain substring count."

Nothing here is task-specific trivia. String-counting bugs show up with high uncertainty across many tasks. The analyzer targets instability, not failure. It catches steps the agent got right this time but could easily get wrong next time.

## What This Changes

The results matter. On AppWorld's 168 test tasks, Pass^5 jumped from 53.0% to 69.0%. The consistency gap compressed from 24.4 percentage points to 12.0. Mean@5 still improved, climbing from 77.4% to 81.0%. This isn't about trading average accuracy for consistency. Both improve.

Harder tasks gained the most: +14.3 percentage points on Hard tier, +22.9pp on Medium. The analyzer is doing exactly what it should: finding the specific decision points where the model's own uncertainty was leaking into the outcome, then providing context to sharpen those distributions.

Even better, guidelines transfer. When applied to a different but related task in the same scenario, Pass^5 lifted by 13 percentage points. A guideline from one run isn't just patching that run. It's capturing something reusable.

I see this as fundamentally important for the next phase of [agent development](https://mgks.dev/tags/llm-evaluation). As we push these systems into workflows where reproducibility matters, measuring consistency becomes as important as measuring accuracy. The leaderboards will catch up eventually, but your production systems need this now.

What happens when consistency becomes non-negotiable?