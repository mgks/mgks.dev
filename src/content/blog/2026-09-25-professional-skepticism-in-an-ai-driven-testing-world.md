---
title: "Professional Skepticism in an AI-Driven Testing World"
description: "Why developers need healthy skepticism when adopting AI agents, test-driven development for agentic systems, and what flaky tests really tell us about our code."
date: 2026-09-25 12:00:20 +0530
tags: rollup, software-engineering, ai, testing, agentic-systems
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

I recently had a conversation with David Burns from BrowserStack that crystallized something I've been thinking about for months: as AI agents become more prevalent in our development workflows, the most valuable skill might be professional skepticism.

David heads up developer advocacy and the open source office at BrowserStack, and he's spent years thinking about testing at scale. What strikes me about his perspective is that he doesn't frame AI as a silver bullet for testing challenges. Instead, he emphasizes maintaining a critical eye even as we adopt these powerful new tools.

This matters because there's real pressure in our industry right now to treat AI agents as solutions to problems they're not actually solving. We're seeing teams rush to adopt agentic engineering without asking hard questions about what they're optimizing for, and that's a recipe for building fragile systems.

## Test-Driven Development Meets Agentic Engineering

One insight that stood out to me: the principles of test-driven development translate directly to agentic systems. If you're building an AI agent to handle complex workflows, the same discipline applies. You need to define expected behaviors upfront, test those behaviors rigorously, and iterate based on failure modes.

What's different is the surface area of uncertainty. Traditional TDD gives you deterministic outcomes. Agentic systems introduce probabilistic behavior, hallucination risks, and edge cases that are genuinely hard to anticipate. The solution isn't to abandon TDD principles. It's to apply them more rigorously, with better observability and more comprehensive test coverage.

I think there's a broader lesson here about [ai-in-production](https://mgks.dev/tags/ai-in-production/) that we're still learning as an industry. We need frameworks for thinking about when agentic systems are appropriate, and when deterministic systems are actually the safer choice.

## Flaky Tests and Application State

Here's something that seems obvious once you hear it but isn't discussed enough: flaky tests almost always come down to state management. A test that passes sometimes and fails other times isn't flaky because of randomness in your code. It's flaky because your test isn't properly isolated, or your application isn't resetting state between test runs.

This insight extends to integration tests, end-to-end tests, and especially tests around AI systems. If your agentic tests are flaky, the question isn't whether AI is inherently unpredictable. The question is whether you're properly controlling the preconditions, mock data, and environmental state that the agent operates within.

I've seen teams blame "AI unpredictability" when the real issue was test pollution or inadequate fixture management. That's a costly diagnosis to miss.

## Why Skepticism Matters More Than Ever

Professional skepticism in an AI-driven world means asking specific questions:

What exactly is this agent replacing, and why is that replacement worth the added complexity? Are we measuring real improvement, or just adoption metrics? What happens when the agent fails, and do we have visibility into those failure modes?

These questions apply whether you're adopting AI for [testing](https://mgks.dev/tags/testing/) infrastructure, code generation, or product features. The skeptical perspective isn't anti-AI. It's pro-sustainable-engineering.

I notice that teams with the strongest AI implementations aren't the ones who trusted the technology blindly. They're the ones who built careful observability, maintained version control over prompts and configurations, and weren't afraid to fall back to simpler approaches when the agentic solution added more problems than it solved.

BrowserStack's approach to this through their developer advocacy work is telling. They're not pushing AI agents as a universal solution. They're exploring how these tools fit into real testing workflows, where the constraints are real and the stakes are high.

## What This Means for Your Team

If you're evaluating agentic systems for your workflows, start with the basics: strong test coverage, clear success metrics, and well-managed state. Make sure your monitoring can distinguish between "the system worked but produced unexpected output" and "the system failed to work."

Build in circuit breakers. Be explicit about fallback behavior. Document why you chose an agentic approach over alternatives.

The future isn't AI versus traditional engineering practices. It's AI working well within carefully considered engineering practices that have been refined over decades.

When you combine agentic systems with genuine professional skepticism, you're not limiting innovation, you're making it sustainable, so perhaps the question isn't whether to adopt AI agents, but whether you have the discipline to adopt them well.