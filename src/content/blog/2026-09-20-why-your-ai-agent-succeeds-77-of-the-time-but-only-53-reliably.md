---
title: "Why Your AI Agent Succeeds 77% of the Time (But Only 53% Reliably)"
description: "Most agent benchmarks hide inconsistency behind averages. Here's why that gap matters and how to measure real-world reliability."
date: 2026-09-20 18:00:20 +0530
tags: rollup, artificial-intelligence, ai-agents, reliability, llm-evaluation
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
featured: false
---

When I first saw the numbers, I thought there was a mistake. A ReAct agent hitting 77.4% accuracy on AppWorld, but passing all five consecutive runs on just 53% of tasks. That's a 24-point consistency gap, buried inside what every leaderboard would report as a straightforward success rate.

The gap represents something we rarely talk about in AI: the difference between 'capable' and 'reliable'. And it's becoming impossible to ignore as agents move into financial reconciliation, contract review, and other workflows where you can't afford to lose the coin flip.

## The metric that hides the problem

Most benchmarks report Mean@k: run a test k times, average the pass rate. That's the 77.4% number everyone sees. But there's another metric that matters far more in production: Pass^k, the fraction of tasks where an agent succeeds on every single run.

Think of it this way. Pass@k asks: did at least one attempt work? (Great for verification workflows). Pass^k asks: will it work every time? (Essential for batch operations or workflows without a retry loop). Mean@k is optimistic. Pass^k is realistic.

The consistency gap isn't a capability problem. It's not something you fix with a bigger model or better prompting, though those help with averages. It's an orthogonal axis entirely: an agent can be genuinely capable and wildly inconsistent at the same time.

## Where the flip-flop comes from

Every decision an LLM makes comes from a probability distribution over next tokens. What matters is the shape. A sharp distribution puts most of its mass on one token; the runner-up is far behind. A flat distribution spreads comparable mass across several near-tied options.

On flat distributions, tiny perturbations flip outcomes. GPU floating-point non-associativity. Request batching. Hosted endpoint probability drift. At temperature 0.0 (deterministic decoding), these shouldn't matter in theory, but they do in practice. And because a trajectory chains dozens of decisions together, small per-step noise compounds into large variance across runs.

Here's the part that bothers me: you can't fix this with decoding settings. Greedy decoding and fixed seeds don't touch the underlying distribution. They just decide how to extract a token from it.

## Detecting instability before it breaks

The approach in the source material uses something called the Consistency Analyzer: a diagnostic tool that replays each decision step through controlled resampling. For each decision, you sample k completions (default 5) against the already-recorded context, not fresh tool calls or environment interactions. This tells you exactly which decision steps are vulnerable to flipping on the next run.

It's black-box: no logits, no model internals. Just one additional model call per decision step, done once offline. That's elegant because it's practical. You're not instrumenting the model or building custom infrastructure.

Once you know which steps are unstable, you generate targeted guidelines. Not generic advice. Specific, actionable patterns extracted from the trajectory at exactly the points where uncertainty leaked into the outcome. The example in the paper is brilliant: when counting markers in note content, use anchored regex rather than substring matching because titles repeat the symbol in legend lines.

Nothing task-specific. String-counting bugs and unverified search results show up as high-uncertainty decision points across many tasks. The analyzer targets instability, not failure. It catches steps the agent got right this time but could easily get wrong next time.

## What gets fixed

The results on AppWorld test_normal: Pass^5 rises from 53.0% to 69.0%. Mean@5 rises from 77.4% to 81.0%. The consistency gap shrinks from 24.4 points to 12 points. Nearly a third of previously-inconsistent tasks become tasks the agent passes on every single run.

Medium-difficulty tasks gain the most (+22.9 percentage points), followed by hard tasks (+14.3pp). And Mean@5 never drops. That mattered because you could theoretically boost Pass^k by trading away average accuracy. That would just be shuffling the unreliability around, not fixing it.

When the same guidelines are tested on similar but different tasks in the same scenario, Pass^5 still lifts by 13 percentage points. The guidelines are capturing reusable patterns, not memorizing one trajectory's specifics.

## What this means for you

As AI agents move into production workflows, we need to stop treating consistency as a side effect of capability. It's not. It's a first-class problem that requires first-class measurement and targeted solutions. If you're building systems where an agent's answer can't randomly change between requests, this gap matters more than any benchmark number.

The real question isn't whether your agent is good on average. It's whether it's good enough to be trusted when the stakes are real.