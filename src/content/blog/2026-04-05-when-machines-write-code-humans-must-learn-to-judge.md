---
title: "When Machines Write Code, Humans Must Learn to Judge"
description: "As LLMs generate more code, teams face cognitive surrender and debt proliferation. The future isn't about writing code, it's about verification."
date: 2026-04-05 00:00:56 +0530
tags: rollup, architecture, artificial-intelligence, software-engineering, llm
image: 'https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232'
featured: false
---

I've been watching this slow motion transformation in how we think about software development, and it's getting weird. Margaret-Anne Storey recently proposed thinking about system health in three layers: technical debt (the classic "we need to refactor this mess"), cognitive debt (the team doesn't understand what the system actually does anymore), and behavioral debt (the team has lost the practices that keep things healthy). It's yet another debt metaphor, and yeah, I'm a bit tired of the proliferation too. But this one maps well to what I'm seeing as [LLMs](https://mgks.dev/tags/artificial-intelligence/) churn out increasingly large volumes of code.

The cognitive debt part is what keeps me up at night. Not because the code is bad, necessarily, but because we're outsourcing our understanding of what we built. Storey references a fascinating paper from Shaw and Nave at Wharton that extends Kahneman's two-system model of thinking. You know the one. System 1 is your gut, your fast intuition that tells you something smells wrong in that pull request. System 2 is when you actually sit down and trace through the logic step by step.

## The Problem of Cognitive Surrender

The paper introduces System 3, which is basically the [AI](https://mgks.dev/tags/artificial-intelligence/) doing the thinking for you. And with it comes this concept of cognitive surrender, where you just accept what the machine spits out without engaging System 2 at all. This is different from cognitive offloading, where you strategically delegate parts of your thinking while staying in control. Cognitive surrender is passive trust. It's the difference between using a calculator to check your math versus blindly copying answers from the internet without understanding the problem.

I see this happening already. Developers accepting AI-generated code because it looks plausible and passes the linter. No one actually understands what it does. Six months later, when something breaks in production at 2am, good luck finding someone who can explain why the code was written that way in the first place.

Here's something that's been bugging me lately. Why do all these code-related icons use angle brackets "< >" to represent programming? You see it everywhere now. The only place those brackets mean anything is HTML or XML. Programmers don't program in HTML. We use curly braces, parentheses, square brackets. It's a small thing, but it reveals something about how people outside our field think about what we do. They think we're writing markup languages, not building complex logical systems.

## Verification Becomes the Bottleneck

Ajey Gore has been thinking about what happens when coding becomes essentially free, and his answer is simple: verification becomes the expensive thing. If an agent can generate a working login flow in thirty seconds, the hard part isn't writing the code anymore. It's figuring out whether that login flow actually handles all the edge cases in your specific context.

What does "correct" even mean for an ETA algorithm in Jakarta traffic versus Ho Chi Minh City? These aren't edge cases. They're the entire job. Agents can't make these judgment calls for you.

This leads to a fascinating shift. Gore argues we need to reorganize our teams around verification rather than code production. Your Monday standup shouldn't be "what did we ship?" but "what did we validate?" Instead of ten engineers building features, you need three engineers and seven people defining acceptance criteria, designing test harnesses, and monitoring outcomes.

That's a radical restructuring of [software engineering](https://mgks.dev/tags/software-engineering/) as a profession. It demotes the act of building and promotes the act of judging. Most engineering cultures will resist this hard because we've built our entire identity around being builders. But Gore thinks the teams that embrace this shift will win.

I mostly agree with him, though I think he's too pessimistic about legacy modernization. He dismisses the idea that agentic coding will crack legacy migration, but I've seen compelling evidence that LLMs are genuinely helpful for understanding what ancient codebases actually do. That's different from rewriting them wholesale, sure, but understanding is half the battle.

## The Future of Programming Languages

There's an ongoing debate about whether source code even has a future in an LLM-dominated world. David Cassel wrote a good overview on The New Stack covering various perspectives. Some people are experimenting with entirely new languages designed for LLMs to understand. Others think strictly typed languages like TypeScript and Rust will be the sweet spot because they give the AI more constraints to work within.

I think the real creative work is going to be in building good abstractions, the kind that let humans and machines communicate about what the code should do. This is basically the Domain-Driven Design idea of Ubiquitous Language, but applied to human-AI collaboration. Last year my colleague Unmesh made this point beautifully: programming isn't just typing syntax that computers execute, it's shaping a solution. We slice problems into focused pieces, bind related data and behavior together, and choose names that expose intent.

Good names cut through complexity. They turn code into a schematic everyone can follow. The most creative act in programming is this continual weaving of names that reveal the structure of the solution and map it clearly to the problem you're trying to solve.

That creative act doesn't disappear just because an AI can generate the implementation. If anything, it becomes more important because now we need to communicate not just with our human teammates but with the machines too. And we need to verify that what got built actually matches what we meant.

The uncomfortable truth is that as AI handles more execution, our job shifts from building to judging, and most of us didn't sign up for that.