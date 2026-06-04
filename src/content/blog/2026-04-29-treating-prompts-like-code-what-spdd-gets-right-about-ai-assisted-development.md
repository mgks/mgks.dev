---
title: "Treating Prompts Like Code: What SPDD Gets Right About AI-Assisted Development"
description: "Thoughtworks' Structured Prompt-Driven Development treats prompts as version-controlled artifacts. Here's why that matters more than typing faster."
date: 2026-04-29 12:00:56 +0530
tags: rollup, architecture, artificial-intelligence, software-engineering, development-workflow
image: 'https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070'
featured: false
---

I've been watching teams struggle with [AI](https://mgks.dev/tags/artificial-intelligence/) coding assistants for a while now. The pattern is always the same: initial excitement about how fast you can generate code, followed by mounting frustration when you realize the real bottleneck was never typing speed. It was always alignment, review, and making sure what you built is actually what anyone wanted.

Thoughtworks' internal IT team ran into this exact wall and came out the other side with something they're calling Structured Prompt-Driven Development. The core insight is brutally simple: if prompts generate your code, treat prompts like code. Version them. Review them. Refactor them when reality changes.

Most teams using [AI assistants](https://mgks.dev/tags/artificial-intelligence/) today are doing what I'd call "artisanal prompting." Someone asks Claude or GPT to generate a function, tweaks it in chat until it looks reasonable, copies it into the codebase, and moves on. Six weeks later when that code needs changes, nobody remembers what the original intent was. The chat history is gone. The prompt that generated it is lost. You're back to reading code and guessing.

SPDD flips this. The prompt becomes the spec. You write it down, put it in git, review it before any code exists, then use it to generate implementation. When something's wrong, you fix the prompt first, then regenerate. The prompt and code evolve together instead of drifting apart.

## The REASONS Canvas Is Doing Heavy Lifting Here

The framework uses something called the REASONS Canvas, which is basically a structured template forcing you to think through seven dimensions before touching code. Requirements, Entities, Approach, System structure, Operations, Norms, Safeguards. It's the kind of thing that sounds bureaucratic until you've spent three days in code review hell because nobody agreed on what "user" meant in your domain model.

What makes this work is that it moves uncertainty left. Way left. You're arguing about domain boundaries and architectural constraints before the LLM generates a single line of implementation. This is wildly different from how most teams use AI tools right now, where the model is spitting out code and you're trying to figure out if it's right by staring at diffs.

The example they walk through is a billing engine enhancement. They start with business requirements, run analysis to extract domain concepts, generate a structured prompt that captures the full design, then finally produce code. At each step there's a command-line tool managing the workflow. It's very process-heavy, which will make some developers uncomfortable.

But here's what caught my attention: when they find a bug in the generated code, they don't just patch it. They update the prompt to reflect the correct logic, then regenerate. The prompt is the source of truth. Code is downstream.

## This Changes What Code Review Actually Means

In traditional development, code review is where you catch bugs, argue about naming, and occasionally discover the whole approach is wrong. With SPDD, most of that conflict gets resolved earlier because you're reviewing the intent artifact first. By the time code exists, you're mostly checking if the implementation matches the spec.

The workflow distinguishes between two types of changes. If you're fixing business logic or changing observable behavior, update the prompt first and regenerate. If you're refactoring for clarity without changing behavior, update the code and sync back to the prompt. It's treating refactoring seriously as a distinct discipline, which is rare in AI-assisted workflows.

They provide a bunch of CLI commands through a tool called openspdd. There's one for breaking requirements into user stories, another for analyzing the codebase to extract domain concepts, another for generating the structured prompt, another for syncing code changes back. It's a complete pipeline.

I'll be honest: this feels heavy. For a small feature it might be overkill. But for anything touching core business logic or requiring coordination across a team, the discipline makes sense. You're paying upfront cost in structure to avoid downstream chaos.

## The Skills Shift Is The Real Story

What interests me more than the specific workflow is the skill set they're calling out. To use SPDD effectively, developers need three things: alignment skills to clarify intent before implementation, abstraction-first thinking to model the domain properly, and iterative review discipline to catch drift early.

These are not new skills. They're the same things good [software engineers](https://mgks.dev/tags/software-engineering/) have always needed. But AI assistance makes them more critical because the bottleneck shifted. When you can generate code fast, the limiting factor becomes how clearly you can think about what code should exist.

The article admits SPDD currently has a high skill floor. It works best when someone on the team can do solid domain modeling and architectural thinking. For junior developers or teams without that expertise, it's probably too much overhead. They're working on lowering that barrier by making design constraints and business rules more machine-readable, but that's future work.

## Where This Falls Apart

SPDD is optimized for logic-heavy domains. Business rules, data transformations, API contracts. Places where you can specify behavior precisely and verify correctness mechanically. They explicitly call out that it doesn't work as well for aesthetic domains like frontend styling, where "correct" is subjective and context-dependent.

I'd add that it probably struggles with exploratory work too. When you're prototyping and genuinely don't know what you're building yet, the overhead of maintaining prompt artifacts in lockstep with code will feel like friction. This is a method for when you know what you're building and need to build it reliably at team scale.

The other risk is process calcification. Any workflow this structured can turn into cargo cult if you're not careful. Teams might follow the steps without understanding why, generating REASONS Canvas documents because that's what the process says, not because it's helping them think clearly.

## The Meta-Game Around AI Tooling

What Thoughtworks is really doing here is establishing governance patterns for AI-generated code. How do you make it auditable? How do you make successful patterns reusable across the team? How do you prevent the codebase from becoming an archaeological dig where nobody remembers why anything was built?

Treating prompts as first-class artifacts is one answer. It's not the only answer, but it's a coherent one. And importantly, it's grounded in real team usage over time, not just someone's theory about how AI development should work.

I think we'll see more frameworks like this emerge as teams move past the honeymoon phase with AI assistants and start hitting organizational friction. The question isn't whether individual developers can use these tools effectively in isolation. Obviously they can. The question is whether teams can use them without sacrificing the things that make software maintainable: shared understanding, clear boundaries, traceable decisions.

SPDD is one bet on what that discipline looks like. It won't be everyone's bet, but it's a serious attempt to answer a question most teams are still ignoring: what happens when the AI generates most of your code but you still need humans to decide what code should exist?