---
title: "AI-Assisted Development: The Taste Problem"
description: "Why coding with AI agents works brilliantly for implementation but falls apart for API design. Lessons from building real systems with Claude."
date: 2026-04-10 00:00:56 +0530
tags: rollup, architecture, artificial-intelligence, developer-experience
image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'
featured: false
---

I've been thinking a lot about Lalit Maganti's account of building SQLite tooling with [AI](https://mgks.dev/tags/artificial-intelligence/). Not because it's another "look what I built with AI" story, but because it exposes something fundamental about where [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) helps and where it absolutely doesn't.

For eight years, he wanted these tools but never built them. The SQLite codebase is notoriously difficult, and the work seemed tedious. Then after what Simon Willison calls "the November inflection point", he gave it a shot with Claude. In January, he acted as a semi-technical manager, delegating almost everything to the AI. By late January, he had a working system with over 500 tests.

He also had complete spaghetti code.

## The First Attempt: When AI Becomes Your Junior Developer

The problem wasn't that the code didn't work. It did. The problem was that nobody, including Maganti himself, could maintain it. Functions scattered randomly across files. Python pipelines he didn't understand. Files ballooning to thousands of lines. It solved the immediate problem but had no future.

This is the dirty secret of AI-assisted development that nobody wants to talk about in their demo videos. When you treat [AI as a code generator](https://mgks.dev/tags/artificial-intelligence/) without deep oversight, you get code that works today and becomes a maintenance nightmare tomorrow.

The saving grace was those 500 tests. They proved the approach worked. So he threw everything away and started over.

## The Second Attempt: Refactoring as Core Workflow

The rewrite changed everything about how he worked with AI. He thought deeply about design. He reviewed all generated code. After every large batch, he'd step back and ask "is this ugly?" Sometimes the AI could clean it up. Other times he saw large-scale abstractions the AI couldn't, gave it direction, and let it execute.

This is where things get interesting. The cost of trying the wrong approach dropped dramatically because restructuring became cheap. If you have taste in code, you can guide the AI through explorations that would be too expensive to attempt manually.

But "taste" is doing a lot of work in that sentence.

## The Objective Answer Problem

Maganti's conclusion maps perfectly to what I've experienced: AI excels when there's an objectively checkable answer. Need an implementation that passes tests? AI is excellent. Working on something you can describe but don't fully understand yet? AI is good but requires careful supervision.

Working on something where you don't even know what you want? AI ranges from unhelpful to actively harmful.

The API design phase exposed this brutally. He spent several days in early March doing nothing but API refactoring, manually fixing things any experienced engineer would instinctively avoid. There's no test for "is this API pleasant to use" or "will this API help users solve their actual problems." That's exactly why the coding agents failed so completely at it.

This aligns with what Simon Willison mentioned in his podcast with Lenny Rachitsky about security concerns. AI can generate code that works, but understanding the implications, the attack surfaces, the maintenance burden? That requires human judgment that can't be automated away.

## Documentation and the Work/Study Distinction

The Diátaxis framework for technical documentation makes a similar distinction that applies here. It separates tutorials (serving users at study) from how-to guides (serving users at work). Tutorials provide learning experiences. How-to guides help accomplish tasks.

AI is phenomenal at the how-to level. "Make this function parse SQL" is a task with clear success criteria. But it fails at the tutorial level, at explaining why you'd design an API one way versus another, at building the conceptual framework that lets someone work effectively in your system.

The framework also advocates pulling explanations into separate areas, linking to them rather than interrupting flow. This mirrors how AI works best: focused on specific, bounded tasks rather than trying to weave together implementation, design rationale, and user experience simultaneously.

## The Supply Chain Reality Check

Speaking of security concerns, the Axios supply chain compromise shows how sophisticated attacks have become. Attackers spent weeks building trust with a maintainer, eventually getting them on a video call where they convinced them to install what appeared to be a legitimate update. It was actually a Remote Access Trojan.

This matters for AI-generated code because verification becomes even more critical when you're not writing every line yourself. We're already bad at auditing dependencies. Adding AI into the mix creates another layer where "it works" doesn't mean "it's safe" or "it's maintainable."

## What Growth Actually Means

Ryan Avent's point about economic growth applies here too. We shouldn't want AI-assisted development for its own sake. What's good about it is that it expands our collective capacities. We can tackle projects that sat on todo lists for eight years. We can explore design alternatives that would be too expensive to prototype manually.

But only if we maintain taste. Only if we understand that the AI is a tool for execution, not for judgment. Only if we recognize that some problems, the ones without objective metrics, still require deeply human skills.

The real lesson from Maganti's experience isn't that AI can help you build things faster, though it can. It's that the constraint has shifted from "can I implement this" to "do I understand what I actually want." That's a harder problem, and no amount of generated code will solve it for you.