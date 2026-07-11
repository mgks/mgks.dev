---
title: "How GitHub Cut Copilot Review Cost 20% by Rewriting Tool Instructions"
description: "GitHub's Copilot code review team found that swapping tools wasn't enough. Rewriting agent instructions around pull request workflows cut costs by 20%."
date: 2026-07-11 06:00:59 +0530
tags: rollup, open-source, ai, developer-tools, devops
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
featured: false
---

## When Better Tools Make Things Worse

There's a lesson buried in GitHub's recent Copilot code review migration that I think a lot of AI tooling teams are going to learn the hard way. They swapped out their proprietary code exploration tools for a shared Unix-style harness (grep, glob, view) and expected a clean upgrade. Instead, review quality dropped and token costs went up. The tools were fine. The instructions were wrong.

This matters because the instinct in almost every AI product team right now is to reach for better tools as the primary lever. Better retrieval, better search, better context windows. But what GitHub found is that the *workflow shaped by the instructions* is often more important than the capabilities of the tools themselves. An agent using grep like a broad coding assistant instead of a focused reviewer will burn tokens exploring file trees when it should be asking one narrow question about the diff in front of it.

I find this genuinely interesting from an [open-source](https://mgks.dev/tags/open-source/) perspective because the shared tooling they moved to (the Copilot CLI harness) is exactly the kind of infrastructure consolidation that makes sense on paper. One place to improve, multiple products benefit. But shared infrastructure comes with shared defaults, and those defaults encode assumptions about how the tool will be used.

## The Reviewer Mindset vs. The Coding Assistant Mindset

The core insight from GitHub's engineering team is simple but easy to overlook: a code reviewer and a coding assistant have fundamentally different starting points.

A coding assistant might reasonably map a large area of a repository before making a change. It needs to understand what it might accidentally break. That broad exploration is justified by the task.

A reviewer starts from a diff. The question is not 'what does this repo look like' but 'did this specific change introduce a problem?' The narrowest path to answering that question is almost always better. Every extra file loaded into context is a token cost that persists through the rest of the review.

When GitHub rewrote the tool instructions to encode this reviewer-shaped workflow explicitly, grep, glob, and view stopped being browsing tools and started being evidence tools. The agent would narrow with grep or glob first, read exact evidence with view, and pivot cleanly when a search failed instead of spiraling into a wider exploration loop.

The result was roughly 20% lower average review cost while maintaining review quality. That is a meaningful efficiency gain from what amounts to a prompt engineering effort, not a model upgrade or a new tool.

## What This Means for Teams Building on Agent Frameworks

If you're building products on top of agent frameworks, this story should recalibrate how you think about the work. Most frameworks ship with tools that have implicit workflows baked into their descriptions and instructions. Those workflows reflect the use case the framework was originally designed for. When your use case diverges, you inherit the mismatch silently.

The fix is not always a new tool. It's often a more precise description of how and when to use the tools you already have. GitHub's traces made this visible in a concrete way: the agent was making a similar number of tool calls, but the proportion spent on relevant evidence changed significantly once the instructions were rewritten.

This connects to something I think about a lot when covering [developer-tools](https://mgks.dev/tags/developer-tools/): the gap between a tool's capability and how an agent is actually directed to use it is where a lot of performance is left on the table. Benchmarks that only show final scores hide this. You need traces that show the path, not just the destination.

GitHub's internal benchmarks gave them exactly that feedback loop. They could compare tool traces across iterations, ask whether the agent was narrowing toward evidence or expanding away from it, and connect workflow behavior directly to cost and quality outcomes. That's a model for how AI product teams should be evaluating agent changes in general.

The broader implication is that as AI agents become more deeply embedded in development workflows, the craft of writing precise, context-specific instructions becomes a first-class engineering skill. It's not prompt hacking. It's workflow design expressed in natural language, and the quality of that design has measurable production consequences.

Shared infrastructure is still worth pursuing, and consolidating tools across products is still the right call for maintainability. But when you consolidate, you need to audit the assumptions embedded in the defaults you're inheriting, because those assumptions will shape agent behavior in ways that may not show up until you're reading a trace wondering why your agent is browsing instead of reviewing.

The question worth sitting with is whether your agent's instructions are actually shaped around the job it needs to do, or whether they're still carrying the posture of whatever system inspired them first.