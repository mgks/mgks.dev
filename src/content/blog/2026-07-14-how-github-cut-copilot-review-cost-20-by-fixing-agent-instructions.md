---
title: "How GitHub Cut Copilot Review Cost 20% by Fixing Agent Instructions"
description: "GitHub's Copilot code review team found that swapping tools wasn't enough. Rewriting agent instructions around reviewer workflows cut costs by 20%."
date: 2026-07-14 06:00:59 +0530
tags: rollup, open-source, ai, developer-tools, agents
image: "https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070"
featured: false
---

There's a lesson buried in GitHub's recent Copilot code review engineering post that I think a lot of developers building on top of agent frameworks are going to recognize immediately: better tools do not automatically mean better behavior. The workflow instructions matter just as much, sometimes more.

GitHub's team wanted to migrate Copilot code review from its own internal code exploration tools to the shared Unix-style tools used across the Copilot CLI harness: `grep`, `glob`, and `view`. Makes sense on paper. Shared infrastructure means fewer duplicate implementations and improvements that ripple across multiple Copilot products. But when they ran the benchmarks, review cost went up and fewer useful comments came out. The tools were fine. The instructions were wrong.

## The Diff Between a Reviewer and a Coding Assistant

This is the part that clicked for me immediately. A coding assistant exploring a repository has a broad job. It might need to understand the structure of an entire codebase before suggesting a change, making sure it doesn't break something in a corner you haven't looked at yet. That kind of wide exploration is appropriate for the task.

A code reviewer has a much narrower job. You start from the diff. You ask whether this specific change introduces a real problem. You look for the smallest piece of surrounding evidence that confirms or dismisses that concern, and then you move on. You do not want to load the entire repository into your working context before you know what you're looking for.

The shared CLI tool instructions were tuned for the assistant use case. So when Copilot code review started using them, the agent behaved like an assistant: browse broadly, read generously, search again, carry all of that context forward. Every tool result stays in the context window. Extra file contents are not disposable printouts for an agent, they're tokens that linger and affect everything downstream.

The team could see this clearly in their benchmark traces. The agent was making roughly the same number of tool calls, but spending them on broad exploration instead of targeted evidence gathering. That's the kind of subtle behavioral shift that's hard to catch without good observability into what the agent is actually doing.

## Rewriting Instructions Around Pull Request Evidence

The fix the team landed on was not complicated in terms of word count. It was specific and disciplined. They rewrote the tool instructions to encode a reviewer's instincts: start from the diff, narrow first with `grep` and `glob`, read exact evidence with `view`, and if a search fails, retry with a simpler corrected query rather than pivoting into a larger exploration loop.

That last part is something I find particularly interesting for anyone working with [ai](https://mgks.dev/tags/ai/) systems. A small tool failure, like an incorrect file path or a regex that doesn't match, can become the entry point to a runaway exploration loop if the agent's recovery behavior isn't explicitly shaped. The new instructions gave the agent a disciplined fallback: one corrected search, not a cascade of guesses.

The rhythm they were after shifted from "browse, read, search again" to "ask, narrow, read, decide." That's a meaningful change in how an agent spends its budget.

The result in production was roughly 20% lower average review cost while maintaining the same review quality. That's not a small number for something that runs at scale across every pull request review.

## What This Means for Developers Building on Agent Frameworks

If you are building any kind of product on top of an agent framework, this story should hit close to home. Most frameworks come with default tools and default instructions. Those defaults are tuned for the framework's primary use case, which is rarely identical to yours. When your use case drifts far enough from the original design, those defaults start working against you quietly, without obvious errors, just subtly worse behavior that shows up in cost and quality metrics.

The solution is not always to build your own tools from scratch. GitHub's team proved that shared infrastructure can work. But it requires investing in the workflow layer: understanding what your agent's actual job is, how that differs from the default assumptions baked into the instructions, and rewriting those instructions to match.

This connects to something broader happening across the [developer-tools](https://mgks.dev/tags/developer-tools/) space right now. As more teams move from experimenting with AI agents to running them in production at scale, the work is shifting from "can we make this work" to "can we make this work efficiently and predictably." Benchmark traces, workflow observability, and disciplined instruction design are becoming actual engineering concerns, not afterthoughts.

The teams that figure out how to build tight feedback loops between agent behavior and product outcomes are going to have a significant edge. GitHub's approach here, running the same review examples, comparing tool traces, updating instructions, and running again, is a concrete example of that discipline paying off.

The question worth sitting with is: if your agent's instructions were written for a different job than the one it's actually doing, would you be able to tell from the outside?