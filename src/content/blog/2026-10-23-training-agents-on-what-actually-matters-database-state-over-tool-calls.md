---
title: "Training Agents on What Actually Matters: Database State Over Tool Calls"
description: "How executable rewards from terminal database state can train more reliable AI agents than traditional benchmarks, with real results from ThinkingBox."
date: 2026-10-23 12:00:20 +0530
tags: rollup, artificial-intelligence, agent-training, reinforcement-learning, llm-reliability
image: "https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070"
featured: false
---

I built ThinkingBox to catch a specific lie: an agent saying it finished when the database told a different story. A ticket marked resolved while the underlying exception remained open. Nine confident tool calls, one wrong database row.

That experience led somewhere unexpected. If we can check what actually changed in the database, we have something better than a grading rubric. We have a reward signal.

Most AI benchmarks measure what a model *says* it did. ThinkingBox-Bench measures what it *actually changed*. We took that insight further: we used the same executable terminal-state checks as rewards for training agents on tasks they'd never seen before. The results matter for anyone deploying language models against real systems.

## The Metric That Hides What Matters

Pass@1 accuracy is comfortable but misleading. Kimi-K3 solved 93.89% of our benchmark tasks at least once. But it completed only 13.41% of them reliably, on every single attempt. Claude Opus 5 inverted this: narrower breadth, far more consistency.

If you're deploying an agent to production databases, consistency is what you need. A model that succeeds 95% of the time on one task and 10% of the time on another will burn trust and create chaos. We measure this with observed-20/20: what percentage of tasks does the model solve on *every* recorded attempt?

That gap matters. And it's invisible in standard accuracy numbers.

## Why Selecting the Right Training Tasks Changes Everything

I learned this the hard way: not all training tasks are equal. If a task is already solved by your model, training on it teaches nothing. If it's hopeless, training is wasted compute. The sweet spot is tasks that are *currently hard but learnable*.

Difficulty is policy-relative. A task is challenging only until the model learns it. So we probed each candidate training task once against the base model, estimated its success probability, and selected only tasks where that probability fell between roughly 30-70%. We called this offline policy-relative difficulty, and kept the training pool fixed throughout the run.

This decision shaped everything. GRPO learns best when trajectories within a batch contradict each other. An all-success batch teaches nothing. An all-failure batch teaches nothing. A mixed batch [0,0,0,1,1,1,1,1] creates the gradient signals that drive improvement. Selecting the right tasks meant getting that contrast efficiently.

## What We Actually Achieved

We fine-tuned Qwen3.8-27B on 187 carefully selected tasks using token-mean GRPO for 50 training steps. Each step generated 144 complete rollouts across 24 H100s, each with a fresh isolated backend and real MCP tool calls.

The results:
- Average success rose from 51.70% to 60.78% (pass@1)
- Tasks solved reliably on all 20 attempts nearly tripled: from 38 to 107 (observed-20/20)
- Cost per dependable task dropped from $0.177 to $0.139

On a single hotel-booking task, the improvement crystallized: the base model violated manager-approval policy in 15 of 20 attempts. The trained model preserved the correct booking state in all 20. That's not an edge case. That's what production reliability looks like.

## The Trade-off Nobody Talks About

I noticed something the moment we analyzed the results: pass@20 (at-least-once coverage) declined slightly while observed-20/20 (repeatability) surged. The model didn't become broader. It became sharper.

This pattern is called sharpening in prior RL work. The probability distribution shifted toward trajectories that work consistently, and some low-probability solution paths vanished. For production systems, that's exactly what you want. For research benchmarks measuring breadth, it looks like a step back.

The implication cuts both ways. If you're building systems that need to work every time, train for repeatability, not coverage. If you're building exploratory research tooling, you might want the opposite. The metric you optimize for determines what you get.

## What This Means for Deploying Agents

Most agent benchmarks are theater. They measure statistical accuracy on tasks the model has never seen, then declare winners based on percentages that hide critical failures. I've seen models that score 89% on standard benchmarks fail 40% of the time on production variants of the same task type.

ThinkingBox inverts this. By grading on executable terminal state, we align measurement with reality. By using those same executable checks as training rewards, we propagate that alignment into the model's learned behavior.

The cost math is harsh: eight H100s, 144 rollouts per step, fifty steps, just to move one 27B model from 38 reliable tasks to 107. But at $8.00 per consistently-working task, we're approaching the cost-effectiveness of much larger models that arrived there through scale alone.

For teams deploying agents against databases they actually care about, the question isn't whether to measure repeatability. It's whether you can afford not to.