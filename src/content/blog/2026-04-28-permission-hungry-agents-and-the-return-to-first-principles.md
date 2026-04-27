---
title: "Permission Hungry Agents and the Return to First Principles"
description: "ThoughtWorks Radar 34 reveals AI's paradox: tools that generate complexity at speed while forcing us back to security basics and software fundamentals."
date: 2026-04-28 00:00:56 +0530
tags: rollup, architecture, artificial-intelligence, security, developer-tools
image: 'https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988'
featured: false
---

The latest ThoughtWorks Technology Radar landed last week, and it's reading like a field report from the front lines of our collective reckoning with [AI](https://mgks.dev/tags/artificial-intelligence/). The 34th edition contains 118 blips, and unsurprisingly, [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) dominates the conversation. But what caught my attention isn't just the AI focus itself. It's how AI is forcing us to simultaneously look forward and backward at the same time.

We're revisiting pair programming, mutation testing, DORA metrics, clean code. Not because we're nostalgic, but because AI tools can generate complexity faster than we can think. That's the real story here. We finally have tools that can outpace human thought in code generation, and it turns out the brake pedal matters more than we realized.

The radar team added Jim Gumbley to their writing crew, which feels like excellent timing. Security has always been important, but when you're dealing with systems that can't reliably distinguish trusted instructions from untrusted input, you need someone who thinks about threat models for breakfast.

## The Permission Hungry Bind

Here's the central tension that the radar identifies: the agents worth building are the ones that need access to everything. OpenClaw supervises real work tasks. Claude Cowork handles actual development workflows. Gas Town coordinates entire agent swarms across codebases. These aren't toy demos. They're tools that require broad access to private data, external communication, real systems.

The problem is we're like skiers who just learned to turn, now confidently pointing ourselves at the hardest black run. The safeguards haven't caught up with our ambition. Prompt injection means models still can't reliably tell the difference between what you told them to do and what some malicious input is trying to make them do.

This is why so many of the radar's blips focus on what they're calling Harness Engineering. The idea being that if you're going to run these powerful but unpredictable systems, you need proper guides and sensors. You need the engineering equivalent of a climbing harness. Something that lets you move freely but catches you when things go wrong.

## When Developers Stop Reading Code

Mike Mason wrote about watching Claude produce a Python codebase that mostly worked. Unit tests passed. Real world testing looked good. Then he noticed something alarming: the main file had grown to 2,000 lines, and Claude, when it needed to make edits, had started reaching for sed to find and modify code within that file.

Think about that for a second. The model was using text manipulation tools because it had lost track of the structure of its own code. It was treating the codebase like a text file instead of a program.

Mason also looked at the leaked Claude Code after it hit 500,000 lines. His verdict? Both things are true. There's good [architecture](https://mgks.dev/tags/architecture/) in there, and there's also an incomprehensible mess. You don't get to know which is which without reading the code.

His rough framework makes sense to me. Throwaway analysis scripts? Vibe away. Generate whatever works and move on. But tooling you need to maintain, durable code that has to stick around, that needs regular human review. Even if the review is just a human asking a model to evaluate the code with hints about what good looks like.

The interesting bit is that when Mason asked Claude to do better, it did. Sensible decomposition, new classes, sometimes even unit tests. It knew how to write good code. It just didn't volunteer it. Which tells you something about the default behavior of these tools. They optimize for getting something working, not for creating maintainable systems.

## The DirectFile Lesson

DOGE's brief rampage through government services killed DirectFile, a program that let people file taxes online without paying TurboTax their annual tribute. Don Moynihan talked to people involved in DirectFile and identified what he calls a paradox of government reform: the simpler a potential change appears, the more likely it hasn't been implemented because it features deceptive complexity that others have tried and failed to resolve.

I've heard that story in plenty of large corporations too. "Why don't we just..." is usually the beginning of discovering why not.

But there's a difference with government initiatives. At their best, they're built on an attitude of public service. The people who worked on DirectFile drew a sharp contrast with DOGE's approach. If you don't think government has a responsibility to serve people, how good are you going to be at making government work better for people?

The loss isn't just about one program. The IRS has lost 25% of its staff. Its budget is 40% below 2010 levels. We hate tax collectors, sure, but a functional tax system is actually important. Britain's ability to raise taxes effectively was a major reason it won its century long struggle with France. France's wonky tax system was a major reason why its monarchy fell to revolution.

There's also considerable evidence that increasing the IRS budget would more than pay for itself in increased revenue, but that's a conversation for another day.

The real lesson here applies beyond government. Complexity is often invisible until you try to change something. The tools that let us move fast, whether they're AI coding assistants or organizational restructuring mandates, don't automatically come with the wisdom to know when to slow down. That's still on us.