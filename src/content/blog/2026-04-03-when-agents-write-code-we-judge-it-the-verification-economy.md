---
title: "When Agents Write Code, We Judge It: The Verification Economy"
description: "As LLMs generate code at scale, our job shifts from writing to verifying. What does this mean for how we organize teams and think about programming?"
date: 2026-04-03 12:00:56 +0530
tags: rollup, architecture, artificial-intelligence, software-development
image: 'https://images.unsplash.com/photo-1680783954745-3249be59e527?q=1064&w=1064'
featured: false
---

I've been watching something interesting happen in the industry lately. We're churning through metaphors about debt faster than we're paying down actual technical debt. Now we have cognitive debt joining the party alongside technical debt, and honestly, I'm getting a bit tired of all these economic metaphors for software problems.

But Margaret-Anne Storey's framework for thinking about system health actually makes sense. She proposes three layers: technical debt (the code itself), comprehension debt (whether the team understands what they built), and cognitive debt (whether we can reason about the system at all). These interact with each other in messy ways, and the rise of LLM-generated code is making the cognitive layer particularly troublesome.

The really interesting bit is how this connects to Kahneman's two-system model of thinking. You know, the "Thinking Fast and Slow" stuff where System 1 is your quick intuition and System 2 is deliberate thinking. Shaw and Nave at Wharton have added a third system to account for [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/): System 3, which introduces what they call "cognitive surrender."

Cognitive surrender is when you just trust what the [AI](https://mgks.dev/tags/artificial-intelligence/) spits out without engaging your deliberate thinking. They distinguish this from cognitive offloading, which is the strategic delegation of work you'd do anyway. The difference matters. One is passive trust, the other is intentional tool use.

## The Expensive Thing Isn't Writing Anymore

Ajey Gore nails something crucial here. If agents make code generation essentially free, what becomes expensive? His answer: verification.

Think about building an ETA algorithm. What does "correct" even mean when you're dealing with Jakarta traffic versus Ho Chi Minh City traffic? What about driver allocation when you're juggling earnings fairness, customer wait times, and fleet utilization? When hundreds of engineers ship to 900 microservices around the clock, "correct" isn't one definition. It's thousands of shifting, context-dependent definitions.

These aren't edge cases. This is the entire job. And agents can't do this judgment for you.

I keep seeing evidence that agents perform well when they have good automated verification. This pushes us toward Test Driven Development, which is fine, but that's still a lot of verification work. We need to figure out how to make it easier for humans to comprehend larger test suites, because that's where the bottleneck moves.

Ajey suggests we'll need to reorganize around verification instead of code writing. Your Monday standup changes from "what did we ship?" to "what did we validate?" The team that had ten engineers building features now has three engineers and seven people defining acceptance criteria, designing test harnesses, and monitoring outcomes.

That's uncomfortable because it demotes building and promotes judging. Most engineering cultures will resist this hard. The ones that don't will have an advantage.

## The HTML Bracket Problem

Quick sidebar: I've noticed illustrations using "&lt; &gt;" as icons for code. This is weird. No programming language actually uses angle brackets to surround program elements like that. Why not curly braces "{ }"?

Obviously it's because they're thinking of HTML or XML. But programmers don't program in HTML. It's markup, not code. This small confusion reveals something larger about how we think about [software development](https://mgks.dev/tags/software-development/) in the age of web dominance.

## What Happens to Source Code Itself

David Cassel has a good overview article on The New Stack about whether source code even has a future. Some people are experimenting with entirely new languages built with LLMs in mind. Others think existing strictly typed languages like TypeScript and Rust will be the best fit for LLM-generated code.

The article is mostly an overview with lots of quotations, not much analysis, but it captures the range of opinions well.

What interests me more is whether there's still a role for humans to work with LLMs to build useful abstractions. The Domain-Driven Design idea of Ubiquitous Language feels relevant here. Last year Unmesh Joshi made a point about this that stuck with me: programming isn't just typing syntax computers can execute. It's shaping a solution. We slice problems into focused pieces, bind related data and behavior together, and choose names that expose intent.

Good names cut through complexity. The most creative act is this continual weaving of names that reveal the structure of the solution and map clearly to the problem.

If agents are writing most of the code, this naming and abstraction work becomes even more important. Someone needs to grow a language that makes sense to both humans and the agents doing the grunt work. That's not code generation, it's something closer to architecture and design, but at a much more granular level than we typically think about those disciplines.

The shift from writing to verifying isn't just about org charts and standups, it's about fundamentally rethinking what programming means when the typing part becomes trivial.