---
title: "Can AI Coding Agents Legally Relicense Open Source Code?"
description: "A Python library maintainer used Claude to rewrite LGPL code under MIT. The original author says that's illegal. Who's right?"
date: 2026-03-06 12:00:33 +0530
tags: rollup, engineering, artificial-intelligence, open-source, licensing
image: 'https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070'
featured: false
---

Something fascinating and legally messy just happened in the Python ecosystem. Dan Blanchard, who has maintained the chardet library for over a decade, just released version 7.0.0. It's a complete rewrite. Same API, same package name, but now under an MIT license instead of LGPL. He did it using Claude.

Mark Pilgrim, the original author who walked away from the internet in 2011, came back two days later to say this is illegal.

I've been watching this unfold and honestly, I'm not sure who's right. But I am sure this is the first of many cases like it.

## The Old Way of Clean Room Engineering

Back in 1982, Compaq wanted to build IBM PC clones but couldn't just copy IBM's BIOS. So they split their engineers into two teams. One team reverse engineered the BIOS and wrote a specification. The other team, who never saw the original code, built a new implementation from that spec.

This took weeks or months. Multiple teams. Careful legal choreography.

Dan Blanchard did something similar in hours with an [AI](https://mgks.dev/tags/artificial-intelligence/) coding agent. He used Claude's "superpowers brainstorming skill" to create a design document. Then he worked in a fresh repo with no access to the old source tree. He explicitly told Claude not to base anything on LGPL or GPL code. Then he iterated with the AI until he had working code.

The code similarity analysis shows 1.29% overlap with the previous version. For context, successive versions of the old codebase showed 80-93% similarity. By the numbers, this looks like genuinely new code.

## The Legal Gray Zone

Here's where it gets uncomfortable. Traditional clean room engineering relies on separation. One person who knows the original code writes a spec. A different person who has never seen the original code implements it. Dan had "ample exposure" to the original code. He maintained it for over a decade.

His argument is interesting though. He says clean room methodology is just a means to an end. The end is ensuring the new code isn't a derivative work. He's claiming he can prove that through direct measurement instead of process guarantees.

Mark Pilgrim's position is straightforward: the LGPL doesn't care if you rewrote it from scratch. If you had access to the licensed code, you can't change the license. Adding an AI code generator into the mix doesn't grant you new rights.

I keep going back and forth on this. On one hand, if the code is genuinely independent and provably different, what exactly is being protected? On the other hand, you can't just use [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) to launder licenses.

## Why This Matters Beyond chardet

This is happening in open source first because that's where the code and the drama are both public. But coding agents are already being used inside companies to rebuild legacy systems, to create alternative implementations of competitor features, to work around licensing constraints.

What happens when a company uses Claude or GPT-4 or whatever to recreate a competitor's proprietary system? They feed the AI public documentation, API specs, maybe some reverse engineered behavior. The AI generates structurally independent code. Is that legal?

I expect we'll find out through expensive litigation soon. Once commercial companies realize their IP might be vulnerable to AI-assisted clean room rewrites, the lawyers will get involved. And unlike open source maintainers arguing on GitHub, these cases will have serious money behind them.

The chardet situation is unique in a few ways that make it harder to resolve. Dan was the maintainer, so he had legitimate access to the code. He's also been the primary contributor for 14 years, so you could argue he has some moral claim to the project's direction. And the library was effectively abandoned by its original author for 15 years.

But none of that changes the license. LGPL is LGPL.

## The Process Is Well Documented

One thing that makes this case particularly interesting is how well documented Dan's process is. There's a detailed design document in the repo dated February 25, 2026. It walks through each stage of the rewrite: starting with tests, then implementing the detection logic, then optimization.

He used Claude Code, which apparently keeps artifacts and conversation logs. You can see the planning, the iterations, the decisions. This level of transparency is unusual. Most clean room rewrites rely on process separation because you can't easily prove what was in someone's head.

With AI coding agents, you potentially can. You have the prompts, the generated code, the conversation history. You can run plagiarism detection tools. You can measure structural similarity.

Is that enough? I don't know. The law isn't really set up for this scenario.

## What Should Have Happened

Looking at this pragmatically, I think Dan made a mistake in how he framed this. Releasing it as chardet 7.0.0 under MIT was always going to be controversial. It's the same package name, the same PyPI namespace, the same API.

A better approach might have been to release it as a new library. Call it chardet-ng or fastchardet or something. Make it clear it's a clean room implementation inspired by chardet but legally independent. Let the community decide whether to migrate.

Then if Mark Pilgrim or anyone else wanted to challenge it, they'd need to prove it's a derivative work. The burden of proof would be reversed.

Instead, by releasing it as chardet 7.0, Dan is asserting the right to relicense an existing project. That's a much harder position to defend, even with provably independent code.

The broader question for the industry is whether AI-assisted clean room implementations are legitimate at all. I lean towards yes, with caveats. If the process is genuinely independent, if the code is structurally different, if proper care is taken to avoid copying, then I think the result should be legally clean. But the legal system moves slowly and these cases will take years to resolve.

Right now we're in a weird transitional period where the technology has raced ahead of the law and nobody knows what the rules are.