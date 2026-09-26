---
title: "Skepticism as a Superpower in the Age of AI Testing"
description: "Professional skepticism matters more than ever. David Burns on test-driven development for AI agents, flaky tests, and building reliable systems."
date: 2026-09-27 00:00:20 +0530
tags: rollup, software-engineering, ai, testing, developer-advocacy
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

I recently listened to a conversation between Ryan and David Burns, Head of Developer Advocacy at BrowserStack, and something stuck with me: in an AI-driven world, skepticism isn't cynicism, it's a superpower.

We're in a strange moment. AI is everywhere, tools are multiplying, and there's genuine value being created alongside genuine hype. For developers, this means we need to be more thoughtful than ever about what we adopt and why.

## Applying Test-Driven Development to AI Agents

One of the most practical insights from their discussion was about treating agentic engineering like traditional software development. If you've done TDD (test-driven development), you know the rhythm: write a test, watch it fail, write code to make it pass, refactor. It's a discipline that forces clarity.

With AI agents, that discipline becomes even more critical. These systems have emergent behavior. They can surprise you in ways deterministic code won't. But that's exactly why we need tests. We need to define what success looks like before we deploy an agent into production. We need to verify not just that it runs, but that it behaves in ways we can reason about and defend.

This isn't about distrust. It's about building confidence. And confidence comes from evidence, which comes from tests.

I've written before about [the importance of testing patterns](https://mgks.dev/tags/testing/) in modern development, and this feels like a natural evolution of that principle. As systems become more autonomous, our verification practices need to become more rigorous, not less.

## The Flaky Test Problem Comes Down to State

David made another observation that deserves real attention: flaky tests usually aren't about randomness or timing. They're about application state.

A test that passes sometimes and fails other times is telling you something. It's saying your application has hidden dependencies, unmanaged side effects, or state that persists between test runs in ways you didn't intend. Fix the state, fix the test.

This is harder than it sounds. It requires discipline. It means thinking carefully about isolation, setup, teardown, and data management. But it's worth it because flaky tests corrode trust. They make developers cynical. They create false alarms that eventually get ignored.

Here's what I think matters: a team with 100 solid, deterministic tests you can trust is infinitely more productive than a team with 1000 tests that flake randomly. Quality over quantity, always.

## Professional Skepticism in Practice

What David brought to this conversation, and what I think matters for all of us building things, is that skepticism doesn't mean hostility toward new ideas. It means asking the right questions.

When you encounter an AI tool, a new framework, or a novel testing approach, the skeptical question isn't "is this a scam?" It's "does this solve a real problem, and how will I know if it's working?" That second part matters. Measurability. Verifiability.

This applies across the entire stack. Whether you're evaluating an AI testing tool, considering a new architecture, or deciding whether to adopt [emerging development practices](https://mgks.dev/tags/developer-advocacy/), the question is the same: what's the evidence?

We're seeing a lot of hype cycle right now. Some tools will genuinely change how we work. Others will fade. The way you tell the difference is by being rigorously skeptical while remaining genuinely open to innovation. That's harder than pure cynicism, but it's more useful.

## What This Means for Your Work

If you're building systems, especially systems that interact with AI in any way, my suggestion is straightforward: tighten your testing practices. Use TDD principles. Manage your state deliberately. Be skeptical about claims until you have evidence. And remember that the skepticism is in service of building better things, not in service of blocking progress.

The developers who'll thrive in the next few years aren't the ones who blindly adopt every new tool, and they're not the ones who reject everything new. They're the ones who think clearly about tradeoffs, who test rigorously, and who understand that professional skepticism is exactly what we need right now.

How many developers are actually asking hard questions about the AI tools they're considering, and how many are just following the momentum?