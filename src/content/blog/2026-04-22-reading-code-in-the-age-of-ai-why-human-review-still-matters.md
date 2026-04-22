---
title: "Reading Code in the Age of AI: Why Human Review Still Matters"
description: "ThoughtWorks Radar reveals AI's paradox: tools generate complexity faster than we can understand it. Time to revisit fundamentals."
date: 2026-04-22 12:00:56 +0530
tags: rollup, architecture, artificial-intelligence, developer-experience
image: 'https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076'
featured: false
---

ThoughtWorks just dropped their 34th Technology Radar, and the dominant theme is unsurprising: [AI](https://mgks.dev/tags/artificial-intelligence/) is everywhere. But what caught my attention wasn't just another collection of LLM tools and techniques. It was the counterintuitive insight that artificial intelligence is forcing us backward, not just forward.

The radar team found themselves returning to fundamentals. Pair programming. Zero trust architecture. Mutation testing. DORA metrics. Clean code principles. These aren't nostalgic callbacks to simpler times. They're a necessary counterweight to the speed at which AI tools can generate complexity.

Think about that for a second. We're building tools that can scaffold entire applications in minutes, and our response is to double down on the basics of software craftsmanship. That's not a contradiction. That's survival instinct.

## The Uncomfortable Truth About Code Generation

Mike Mason shares a telling story about using Claude to build a Python codebase. Tests passed. The system worked. But somewhere around 100KB of code, he noticed something alarming: Claude had started using sed to find and modify code within a 2,000 line file. When your AI assistant reaches for command-line text manipulation tools instead of proper refactoring, you've got a problem.

The leaked Claude Code repository with its 500,000 lines tells the same story. Good architecture exists alongside incomprehensible mess. You don't get to know which is which without reading the code yourself.

This is the bind we're in. Throw-away analysis scripts? Sure, vibe away with AI generation. But the moment you're building something durable, something you need to maintain, you need human review. Even if that review is just a human asking a model to evaluate the code with hints about what good looks like.

Mason points out something fascinating: the AI knew better. When he asked "I'm getting uncomfortable with how big this is getting, can we do something better?" it immediately did the right thing. Sensible decomposition. New classes. Unit tests. It knew all along but didn't volunteer it.

## Permission Hungry Agents and the Security Nightmare

The radar introduces a term I expect we'll hear a lot more: "permission hungry" agents. These are tools that need access to everything to be useful. They supervise real work tasks, coordinate swarms across entire codebases, touch private data, external systems, and real infrastructure.

The payoff sounds worth it. But we're like skiers who just learned to turn, confidently pointing ourselves at the hardest black diamond run. The safeguards haven't caught up with the ambition.

Prompt injection means [LLMs](https://mgks.dev/tags/llm/) still can't reliably distinguish trusted instructions from untrusted input. We're granting broad access to systems that can be manipulated by cleverly crafted text. This isn't a theoretical concern. This is a "we need security experts like Jim Gumbley on the radar team" level of serious.

The radar dedicates significant space to what they call Harness Engineering. Think guides and sensors for AI tools. Guardrails that actually work. I expect the next radar in six months will have even more blips in this category because we're learning the hard way that moving fast and breaking things has real consequences when the thing moving fast has access to production systems.

## The Return of the Command Line

Here's an unexpected twist: agentic tools are bringing developers back to the terminal. After years of building abstractions and GUI tools in the name of usability, we're rediscovering that the command line is actually a powerful interface for AI agents.

It makes sense when you think about it. The terminal is text-based, composable, and has decades of tooling built around it. It's a natural fit for language models. But it also means we need developers who understand shell scripting, pipe operations, and the Unix philosophy again.

The future of [developer experience](https://mgks.dev/tags/developer-experience/) might look a lot like the past, just with smarter autocomplete.

## What Government IT Can Teach Us

The dismantling of DirectFile offers lessons beyond government technology. Don Moynihan identifies a paradox: the simpler a potential change appears, the more likely it hasn't been implemented because it features deceptive complexity that others have tried and failed to resolve.

I've seen this in every large organization I've worked with. The "easy fix" that leadership demands is easy precisely because you don't understand the problem space. The people who do understand it know why it's hard.

One DirectFile team member drew a sharp contrast with approaches that don't center user needs: "if you do not think government has a responsibility to serve people, I think it draws into question how good are you going to be at making government work better for people if you just don't believe in that underlying principle."

That applies to any technology initiative. If you don't believe your software should serve its users, you're going to build bad software. AI generation doesn't change that fundamental truth. It might make it easier to build bad software faster, but the underlying principle remains.

## The Framework That Emerges

What I take from all this is a rough framework for working with AI code generation. Use it freely for disposable code. Scripts you'll run once and forget. Exploratory work. Prototypes meant to be thrown away.

But the moment you're building something meant to last, flip the switch. Human review becomes mandatory. Not just for security, though that's critical. For comprehension. For maintainability. For knowing that six months from now when something breaks at 3am, you'll be able to understand what the code is doing.

The CLAUDE.md file Mason mentions isn't just documentation. It's your way of encoding what good looks like for your specific context. Without it, you're hoping the AI's training data aligns with your values and requirements. Sometimes it does. Sometimes you get 2,000 line files and sed scripts.

The technology radar returning to fundamentals while surveying cutting-edge AI tools isn't ironic, it's exactly right, because the faster we can generate complexity, the more we need proven techniques to manage it.