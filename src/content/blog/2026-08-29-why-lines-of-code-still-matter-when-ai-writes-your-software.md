---
title: "Why Lines of Code Still Matter When AI Writes Your Software"
description: "AI coding agents are changing productivity metrics. We need new frameworks to measure what agents actually deliver, and what gets lost in the speed."
date: 2026-08-29 00:00:51 +0530
tags: rollup, engineering, ai-agents, software-engineering, productivity
image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2070"
featured: false
---

I've been pushing back against the conventional wisdom that lines of code (LOC) is a meaningless productivity metric. The argument usually goes: good engineers write less code, so counting LOC is backwards thinking.

But with AI agents, the calculus changes dramatically. And I think we need to be honest about what that means.

## The Numbers Do Tell a Story

In the before-times, a software engineer producing 200 lines of production-ready, debugged code in a day was having an incredibly good day. Most days you'd produce 50 or 60. These aren't pulled-from-thin-air numbers - they reflect the reality of thinking, designing, implementing, testing, and debugging.

When AI agents let you produce 1,000 lines of debugged code, that really is a meaningful improvement. Full stop. But here's the catch: you have to maintain the quality standards. The code needs to be maintainable, tested, and actually production-ready. You can get there with agents, but it demands enormous skill and knowledge and experience. That's what senior engineers are made of.

So lines of code aren't a useless metric when agents are involved. They're actually revealing something important about capability scaling - but only if the quality floor stays constant.

## The Cognitive Load Problem Nobody Talks About

This is where I think the real shift happens. I can churn out code a hundred times faster than before. That's genuinely powerful.

But here's what follows: I don't have the cognitive capacity to stay on top of a hundred times the amount of code. The bottleneck moved. It used to be my hands and my time. Now it's my brain and my attention.

Companies sometimes ask why they'd need multiple engineers if one engineer with agents can do the work of ten. The obvious answer is the bus factor - a team of one is a badly designed team. But there's something deeper. The new limiting factor is distributed cognitive capacity. You need a team so you can load balance the mental work across multiple people who understand the system, can make coherent decisions about it, and can actually maintain it.

One engineer with agent-powered productivity is still just one person's understanding of the codebase.

## The Winchester Mystery House Problem

There's a concept from *The Mythical Man-Month* called conceptual integrity - the idea that well-designed software has an internal coherence. No surprises. Everything fits together. You know what the system is about.

Conceptual integrity is brutally hard to maintain with agents. You have an idea for a feature, you write a prompt, and five minutes later you've got it. Your software grows little weird bumps in funny different directions. Claire Giordano compared it perfectly to the Winchester Mystery House - a structure that keeps adding rooms for forty years until it becomes a maze that makes no sense.

The problem: it's so cheap to add those rooms now. It used to be that discipline was enforced by friction. You'd have an idea for a crazy feature and think: yeah, but that would take me a week. I can't justify that. So you'd forget about it. You'd converge toward coherent systems.

Now? It takes an hour. It's trivially easy to justify.

## What This Actually Means

The implication for teams using [AI agents](https://mgks.dev/tags/ai-agents/) isn't that you should stop using them. It's that you need different kinds of discipline. You can't rely on effort as a forcing function anymore.

You need architectural clarity. You need people whose job is saying no to features that don't fit. You need systems that enforce conceptual boundaries even when the implementation cost is zero.

This is actually harder than the old way, because the old way gave you a built-in governor. Every feature proposal came with a time cost that forced a conversation about whether it belonged.

Now that conversation has to happen in pure concept-space, with nothing but your judgment to back it up.

The teams that will succeed with agents are the ones that treat conceptual integrity not as something that emerges from constraint, but as something you actively design for and defend - even when there's no friction to naturally enforce it.