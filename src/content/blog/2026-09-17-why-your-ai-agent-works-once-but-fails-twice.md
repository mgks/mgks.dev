---
title: "Why Your AI Agent Works Once but Fails Twice"
description: "AI agents achieve high average accuracy but fail inconsistently on identical tasks. A new consistency measurement and guideline system reveals why, and how to fix it."
date: 2026-09-17 00:00:20 +0530
tags: rollup, artificial-intelligence, ai-agents, reliability, llm-evaluation
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
featured: false
---

I've watched a lot of AI agent demos. They're impressive until the engineer runs the same task twice and gets different results. That gap between "works" and "works reliably" is becoming the most important problem in production AI, and I think we're only now getting the measurement tools to understand it.

Here's the uncomfortable truth: a ReAct agent using GPT-4.1 succeeds on 77.4% of AppWorld tasks on average. Sounds solid. But run that same agent five times on each task? It succeeds all five times on only 53% of tasks. That's a 24-point consistency gap, and it matters way more than the headline number suggests.

Most benchmarks hide this behind an average because averaging is easy. Mean@5 tells you how good an agent is on average. Pass^5 (every run must succeed) tells you whether you can trust it in production. The distinction isn't semantic: Pass^5 <= Mean@5 always. An agent can be capable and unreliable simultaneously.

## The Real Cost of Variance

I care about this because variance is expensive in the real world. If you're reconciling a financial transaction or validating a contract, consistency matters more than average performance. When your agent sometimes decides to retry a failed API call and sometimes doesn't, all because of floating-point rounding on a GPU, that's not a capability problem. That's a showstopper.

The source of this variance isn't sampling noise at temperature 0.0. The researchers tested greedy decoding with fixed seeds and still saw inconsistency. The real culprit is decision uncertainty embedded in the model's token probability distributions. When the model is deciding which API to call or what argument to pass, some decisions come from sharp distributions (clear winner, runs out the same way every time). Others come from flat distributions where several tokens are nearly tied. On a hosted endpoint where probabilities shift slightly between runs, that near-tie can resolve differently tomorrow than it did today.

And here's the compounding problem: an agent's trajectory chains dozens of decisions. A small per-step chance of flipping multiplies into a large chance that some run diverges completely from others.

## Finding and Fixing Unstable Steps

The approach here uses what they call the Consistency Analyzer: a diagnostic tool that replays each decision step through controlled resampling to identify which steps actually vary. It's black-box (no logits, no model internals required) and adds just one model call per decision step, done offline. You get a scorecard of exactly which decisions are at risk.

Once you've identified the unstable steps, you generate consistency guidelines: specific, reusable recommendations injected into the agent's context at inference time. A real example from AppWorld: "When counting checkbox-style markers in note content, use a line-anchored regex match rather than a plain substring count." Not trivia about one task, but a general pattern that stabilizes uncertain decisions across many similar tasks.

The results matter. Pass^5 jumps from 53.0% to 69.0% on the test set. The consistency gap tightens from 24.4 points to 12.0 points. Mean@5 never drops, which is crucial: you're not trading average accuracy for consistency, you're just making your agent more stable.

## What This Means for Developers

I think this is significant for a few reasons. First, it reframes how we should evaluate agents. Every leaderboard you see reports Mean@k. None of them report Pass^k. We're collectively optimizing for the wrong metric if we care about production reliability. Start measuring consistency on your own tasks and you'll find gaps you never knew existed.

Second, it's a reminder that [agent evaluation](https://mgks.dev/tags/llm-evaluation/) is still immature. We're borrowing evaluation frameworks from supervised learning and pretending they apply to agentic systems. They don't. An agent that sometimes works is fundamentally different from an agent that always works, and our benchmarks need to capture that distinction.

Third, and maybe most practically: you can improve consistency without a bigger model. This isn't a capability problem. Gpt-oss-120b, a much weaker model, still gained 6 points from consistency guidelines. That means if you're stuck with a particular model in production, you have a lever to pull.

The real opportunity here is in [reliability engineering for AI agents](https://mgks.dev/tags/ai-agents/). We've spent the last few years chasing bigger models and higher average scores. The next decade is about building agents you can actually depend on, which means measuring what you can't see in a single run and fixing the fragile decisions hiding in your trajectories.

If your agent's accuracy numbers can't reproduce on the second Tuesday of the month, you're not alone, and now you have a way to find out why.