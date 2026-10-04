---
title: "Why Your AI Agent Passed Once But Failed 19 Times"
description: "ThinkingBox reveals agents pass single attempts but fail on repeat. 67% of failures look clean. The gap between capability and consistency is the real problem."
date: 2026-10-04 12:00:20 +0530
tags: rollup, artificial-intelligence, ai-agents, llm-reliability, benchmarking
image: "https://images.unsplash.com/photo-1680783954745-3249be59e527?q=80&w=1064"
featured: false
---

I read the ThinkingBox paper and something clicked. We've been measuring AI agents wrong.

A customer's $745 appliance is stuck at a distribution center, fifteen days late. An agent pulls her order, checks tracking, reads the refund policy twice, opens a support ticket, documents everything. Nine tool calls. All well-formed. Then it closes the ticket as "resolved" and asks if there's anything else it can help with.

The problem: the carrier exception is still open. The ticket should be on hold, not closed. The database disagrees with what the agent claims it did.

An ordinary eval would see nine successful tool calls and call that a win. ThinkingBox graded the actual backend state. It failed.

That gap is the story.

## The Gap Between Capability and Consistency

Across 507 stateful business workflows, each run 20 times, ThinkingBox found that 79% of valid tool-call sequences still left the backend in the wrong state. Of those failures, 67% terminated cleanly without reporting an error. The agent sounded like it worked. The database said otherwise.

This matters because I ship code that changes real records. So does everyone building on agents. We care about whether the agent gets the refund right every time, not whether it *can* get it right once.

Here's what I found striking: Claude Opus 5.5 scores 67.16% on a single attempt. Call that pass@1. But it only passes 47.53% of tasks on every single attempt out of 20 tries. That's the consistency gap: 20 percentage points between "the agent did this once" and "the agent does this reliably."

Kimi-K3 solves 93.89% of benchmark tasks at least once. Broadest coverage in the field. Only 13.41% pass all 20 attempts. It's the inverse: maximum breadth, minimum consistency.

A customer-facing system needs consistency. A model that's right 94% of the time but only 13% reliably is not a working system. It's a lottery.

## What's Actually Failing

The diagnostic work is useful. Four in five failures are tool handling problems, not reasoning failures. Agents get far enough to attempt the workflow, then choke on error recovery, failed preconditions, or empty lookups. That's a retry-and-recovery problem wearing a reasoning mask.

Domain matters hard. Claude Opus 4.6 scores 68.62% on retail but 8.30% on auto insurance. The same model becomes nearly useless in a different domain. That suggests the problem isn't general reasoning but context-specific tool choreography.

This is actionable. I can use the same signal the benchmark uses: check the terminal state before committing changes, not the model's summary of it. Classify tool errors so retries target recoverable failures. Shrink the tool surface to what the workflow actually needs. Require human approval on changes I can't cheaply reverse.

I haven't measured the lift from any of these, which is exactly the kind of thing worth testing.

## The Cost Question

Cost per successful task attempt tells a different story than raw accuracy. GPT-5.6 Sol costs $0.127 per successful attempt. Claude Opus 5.5 costs $0.351. Opus 5.5 is more accurate (67.16% vs 65.03%) but costs nearly three times as much per success.

But consistency has its own cost curve. GPT-5.4 costs $6.80 per task that passes all 20 attempts. GPT-6-Astra reaches $7.45. Claude Opus 5.5 hits $7.80. The cheapest way to get one right answer is not the cheapest way to get a dependable one.

For systems touching real records, that's the budget that matters. Pick your model not on pass@1 but on the cost of a task that works every time.

## What This Means for Deployment

I'm watching teams deploy agents like they're shipping LLM inference endpoints: measure on benchmark, pick the highest score, ship it. ThinkingBox suggests that's backwards.

The relevant metric for production is pass@20 or pass@consistency, not pass@1. A model that solves your task 90% of the time in isolation but only 40% consistently is worse than one that solves it 65% of the time but 63% consistently.

That changes model selection. It changes monitoring. It changes how I think about error budgets and human-in-the-loop workflows.

Most importantly, it flips the burden. Instead of hoping my agent's next attempt is lucky, I build systems that verify terminal state before they commit. I classify failures by type and retry on tool errors. I put humans between the agent and changes I can't reverse. The model becomes a reasoning component inside a system designed for dependability, not a black box I'm hoping gets it right.

ThinkingBox is open-source now. The benchmark sits behind OpenEnv. This is testable.

The gap between what a model can do once and what it does every time is not a statistical quirk. It's the difference between a prototype and a system.