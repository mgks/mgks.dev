---
title: "Building a Personal Command Center in a Day: What AI-Assisted Development Actually Looks Like"
description: "A GitHub engineer built a productivity tool in one day using AI agents. Here's what that workflow reveals about the future of software development."
date: 2026-04-16 12:00:54 +0530
tags: rollup, open source, artificial intelligence, github copilot
image: 'https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=2073&w=2073'
featured: false
---

I've been watching the [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) development workflow debate unfold for months now, and honestly, most of the discourse feels disconnected from reality. People either claim AI will replace all developers or dismiss it as glorified autocomplete. Neither camp seems interested in what's actually happening on the ground.

Then I came across Brittany Ellich's story about building a personal command center, and it clicked. This is what AI-assisted development actually looks like when someone competent uses it, not the hype cycle nonsense we keep reading about.

## The Problem Was Boring, The Solution Was Fast

Brittany is a staff engineer on GitHub's billing team. Her day job involves metered billing, tracking Actions minutes, storage, the kind of infrastructure work that keeps platforms running. She had a mundane problem: too many apps, too much context switching, wanted everything in one place.

So she built it. In a day. While doing her regular work.

That timeframe matters because it reveals something important about how [AI](https://mgks.dev/tags/artificial-intelligence/) changes the economics of side projects. Before, you'd need to carve out a weekend, maybe longer if you're learning a new stack. Now the barrier between "I wish this existed" and "I built this" has collapsed.

Her workflow is interesting. She doesn't just throw prompts at [GitHub Copilot](https://mgks.dev/tags/github-copilot/) and hope for the best. She uses what she calls a "plan-then-implement" approach. Copilot interviews her with questions about requirements until they have an adequate plan. Then implementation happens based on that plan.

## Parallel Development Streams

Here's where it gets practical. Brittany runs multiple workflows simultaneously. She keeps agent mode going in VS Code for synchronous development, up to two non-competing agent workflows at once. Meanwhile, Copilot Cloud Agent handles asynchronous tasks like bug fixes or well-scoped tech debt changes.

Think about that architecture for a moment. She's essentially managing multiple junior developers who never get tired, never complain, and work 24/7. Except they're not developers, they're AI agents with different strengths and failure modes.

The tool she built is an Electron app that aggregates her scattered digital life into one interface. Calendar, tasks, notes, GitHub activity, everything. It's not revolutionary, but it doesn't need to be. Personal productivity tools work best when they're tailored to exactly how you think and work.

What caught my attention is her admission that she can't say she learned much about Electron during the build process because Agent Mode handled most of it. But when she simplified the repo to make it publicly accessible, she felt comfortable reading and modifying the code despite limited Electron experience.

## The Stack Stopped Mattering

She answered a loaded question about whether she cares about tech stacks anymore with "not really." That's a seismic shift in how we think about software development. For years, picking the right stack was half the battle. You'd agonize over frameworks, worry about learning curves, calculate the time investment.

Now? The stack is almost incidental. You can build an Electron app without deeply understanding Electron. You can ship a React app without being a React expert. The knowledge required has shifted from implementation details to architecture and requirements gathering.

This doesn't mean expertise is dead. Brittany's a staff engineer, she knows how to evaluate code, spot problems, make architectural decisions. The AI handles the tedious translation of intent into syntax. She handles everything else that actually matters.

Her built project uses Electron with React and TypeScript, Tailwind for styling, Vite for bundling. All [open source](https://mgks.dev/tags/open-source/) tools. The repository is public if you want to clone it. You'll need Node.js, npm, and an Anthropic API key.

## What Agents Are Actually Good At

There's a telling detail about how agents behave. Brittany noted they love adding code but are much less enthusiastic about removing it. That matches my experience too. AI assistants are optimistic builders. They'll happily scaffold features and add functionality. But ruthless simplification? That still requires human judgment.

This reveals the current sweet spot for AI-assisted development. It excels at the expansion phase, getting from zero to working prototype. It struggles with the contraction phase, removing unnecessary complexity and making hard tradeoffs.

The tools are getting better at answering "how do I build this?" but still fumble "should I build this?" and "what can I remove?" Those questions require taste, experience, and a willingness to say no. Computers aren't good at saying no.

## The Learning Curve Inverted

Brittany stays current through Slack channels at GitHub, the company blog, podcasts like How I AI and Last Week in AI, and conversations on Bluesky. Standard stuff for senior engineers. But notice what's missing: she's not grinding through tutorials or taking courses on every new framework.

The learning model has inverted. Instead of learning a technology deeply before building with it, you can build with it first and learn the parts that matter as you go. Your AI assistant handles the boilerplate and common patterns. You learn by reading the generated code and making adjustments.

This feels backwards to those of us who learned programming the traditional way. But it might be more efficient. You're learning in context, solving real problems, seeing patterns emerge organically. The tedious "hello world" phase is automated away.

Her advice is simple: go build something. Building from scratch has never been easier. That's both exciting and slightly unsettling. The barrier to entry has dropped so low that the main obstacle is no longer technical skill but creative vision and problem-solving ability.

The question isn't whether you can build something anymore, it's whether you should, and more importantly, whether anyone will actually use what you build.