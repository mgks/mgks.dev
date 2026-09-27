---
title: "Professional Skepticism in an AI-Driven Development World"
description: "Exploring how developers can apply critical thinking, test-driven development, and rigorous testing practices to build reliable AI systems and agents."
date: 2026-09-27 12:00:20 +0530
tags: rollup, software-engineering, ai, testing, developer-advocacy
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065"
featured: false
---

I recently listened to a conversation between Ryan and David Burns from BrowserStack about something that's been on my mind lately: how do we maintain rigor and skepticism as AI becomes increasingly woven into our development workflows?

David's role as Head of Developer Advocacy at BrowserStack puts him in an interesting position. He sees firsthand how teams are rushing to adopt AI tools without the same level of scrutiny they'd apply to other critical infrastructure. And honestly, that concerns me too.

## The Case for Healthy Skepticism

We're in a moment where AI hype is at a fever pitch. Every tool promises to make development faster, smarter, more intuitive. But I think David's emphasis on professional skepticism is exactly what the industry needs right now. Not cynicism, mind you, but thoughtful questioning.

When I integrate an AI tool into my workflow, I ask: What could go wrong? How will this degrade gracefully? What happens when it hallucinates or provides confidently incorrect suggestions? These aren't questions to paralyze us, but rather frameworks to help us make better decisions about where AI actually adds value versus where it introduces risk.

The developers I respect most aren't the ones who adopt every new AI feature immediately. They're the ones who understand their specific problems deeply enough to evaluate whether a tool genuinely solves them.

## Test-Driven Development Meets Agentic Engineering

One of the most actionable parts of David's discussion involves applying TDD principles to agentic systems. This is where theory meets practice in a meaningful way.

Traditional test-driven development gives us a framework: write tests first, watch them fail, then build the minimal implementation to make them pass. It forces clarity about desired behavior before we start coding.

With AI agents, we need similar discipline. If you're building an agent that makes decisions on behalf of your system, you need to define what success looks like before you train it. What are the edge cases? What behaviors are unacceptable? How do you measure whether the agent is actually improving things?

I've been [exploring testing strategies](https://mgks.dev/tags/testing/) for AI systems, and the pattern I keep seeing is that teams that treat agents like any other component, subjecting them to rigorous automated testing, end up with more reliable systems. Surprising, perhaps, but true.

## The Flaky Test Problem and Application State

David's insights on flaky tests are worth dwelling on. Everyone hates flaky tests. They're the debugging tax we pay for incomplete thinking about our systems.

The real issue, as David points out, is almost never the test itself. It's application state. Flaky tests are a symptom that we haven't fully considered how state flows through our application. Maybe a background process is interfering. Maybe timing assumptions are hidden. Maybe database cleanup isn't actually isolated between test runs.

This matters more as we add AI components. When your application includes a language model making decisions, state management becomes even more critical. You need to understand: Is the model's behavior deterministic for the same input? How does it handle state from previous interactions? What happens if it receives incomplete or contradictory information?

Proper [quality assurance practices](https://mgks.dev/tags/quality-assurance/) require thinking deeply about these questions before you ship.

## What This Means for Us

I think the broader implication is that AI adoption doesn't give us permission to abandon the principles that made us good developers in the first place. If anything, it demands we apply them more rigorously.

The teams building impressive AI-driven features aren't the ones who treated AI as magic. They're the ones who:

- Define success criteria before implementation
- Test extensively and automatically
- Monitor behavioral drift in production
- Maintain healthy skepticism about vendor claims
- Understand their systems deeply enough to debug them

David's advocacy for this approach comes from years of helping developers build reliable systems. And honestly, his skepticism feels almost countercultural right now, which is exactly when we need it most.

The question isn't whether AI will transform development. It will. The question is whether we'll let it transform us in ways that compromise the craftsmanship and rigor that actually matter, or whether we'll integrate these powerful tools while maintaining the discipline that separates reliable systems from flashy failures.