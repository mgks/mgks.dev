---
title: "The Three-Tier Developer Split: How LLMs Are Reshaping Software Teams"
description: "Junior devs gain mentors, seniors gain leverage, but mid-level developers face an existential challenge as AI agents reshape programming careers."
date: 2026-02-14 00:00:58 +0530
tags: rollup, architecture, artificial-intelligence, developer-experience, career
image: 'https://images.unsplash.com/photo-1747920523600-bd6a3d064f4d?q=80&w=2070'
featured: false
---

I've been mulling over some fascinating conversations from the Thoughtworks Future of Software Development Retreat, and one observation keeps nagging at me: we've been asking the wrong question about [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) and developer jobs. Everyone's been freaking out about junior developers getting replaced, but the real story is way more nuanced and honestly more interesting.

The senior developers at this retreat had an almost predictable take on their own future. Of course they'd say they still have value, focusing on architecture while LLMs handle the "messy details of syntax and coding." But here's what caught my attention: one attendee reported that resistant senior developers, when forced into hands-on LLM exercises, saw a third of them instantly convert to being very pro-LLM. That's not theoretical pontificating. That's real experience changing minds.

There's a quip from the retreat that perfectly captures the pace of change: some negative opinions of LLM capabilities "are so January." I felt that. The gap between someone who last tried Claude in December versus someone using it today might as well be measured in years of capability improvement.

## The Junior Developer Paradox

Here's where it gets counterintuitive. Everyone's worried about juniors getting replaced, but this group was actually sanguine about their prospects. Junior developers are open-minded about [LLMs](https://mgks.dev/tags/llm/) and already familiar with using them. They're digital natives in the age of AI coding assistants.

The always-available mentor angle is compelling, though it needs caveats. Yes, juniors should be skeptical of their AI mentors. But as the notes wryly point out, they should be skeptical of fleshy mentors too. Not all of us are as brilliant as we like to think we are. I've certainly given advice I later regretted.

The real crisis? Mid-level developers. They formed their careers without LLMs but haven't gained enough experience to drive them effectively the way seniors do. They're stuck in this awkward middle ground where their hard-won skills are being commoditized but they don't yet have the architectural judgment to stay ahead of the curve.

## Cognitive Debt vs Technical Debt

Margaret-Anne Storey's concept of cognitive debt deserves more attention. There's a great anecdote from an entrepreneurship course where a student team hit a wall around week 7 or 8. They initially blamed technical debt, but the real issue was that nobody could explain why certain design decisions had been made or how different parts of the system worked together. The theory of the system had fragmented.

I like the parallel drawn here to technical debt. Many people use "technical debt" to mean bad code, but that's not quite right. The bad stuff is cruft: poor boundaries, bad naming, sloppy structure. Technical debt is the metaphor for dealing with cruft's costs. Either you pay the interest by accepting slower changes, or you pay down the principal through refactoring.

In the cognitive realm, the cruft equivalent is ignorance. Not knowing the code, not understanding the domain. The debt metaphor still applies: it either costs more to add capabilities, or you invest explicitly in gaining knowledge. And here's the kicker: those costs apply to both humans and The Genie.

With LLMs generating more code faster, we're potentially accumulating cognitive debt at an unprecedented rate. Nobody on the team understands why the agent made certain choices. The code works, ships, and becomes a mystery.

## Developer Experience Is Agent Experience

Laura Tacho's observation cuts deep: "The Venn Diagram of Developer Experience and Agent Experience is a circle."

Everything we advocate for developers also helps LLMs work better. Smooth tooling, clear development environment information, good modularity, descriptive naming. All of it helps the transformer as much as it helps squishy neural networks. And management is recognizing this, leading to efforts to smooth the path for the LLM.

The sad part? As Laura noted, execs won't make the effort for humans that they're making for robots. It took [AI](https://mgks.dev/tags/artificial-intelligence/) agents for leadership to care about developer experience. That says something uncomfortable about how we value human developers versus their potential replacements.

## The IDE's Revenge

IDEs still have a future, but they need to incorporate LLMs thoughtfully. Not everything should go through an LLM. They're a horribly inefficient way to rename a function, for example. Deterministic refactoring tools are perfect for that.

The interesting pattern is orchestration. Say you want to change "person" to "contact" throughout your domain. It appears in function names, field names, documentation, test cases. A simple search-replace isn't enough, but having the LLM operate on the entire codebase is overkill. What if the LLM chooses to use the IDE's refactoring capabilities on all the places it identifies? The LLM becomes a conductor, orchestrating IDE features rather than doing everything itself.

Analysis shows that renames in IDEs occur in clusters like this, so it would be genuinely useful. It's a nice example of the right tool for the right job, with AI making the high-level decisions about what tool to deploy where.

## Team Size and the Pizza Question

Will two-pizza teams shrink to one-pizza teams because LLMs don't eat pizza? Or will we have the same size teams doing much more?

I'm with the retreat attendees on this: probably the latter. There's something about the two-pizza team size that effectively balances collaboration benefits with coordination costs. That balance feels fundamental to how humans work together, not just an artifact of our coding speed.

This raises questions about pair programming's evolution. The common notion seems to be one programmer driving multiple LLM agents. But what about two humans driving a bunch of agents? Combining the benefits of pairing with greater code-generative ability? I suspect we'll see experiments with this, though the coordination overhead might kill it.

## The Exhausting Future of Supervisory Programming

Here's what worries me most. A Harvard Business Review study of a 200-person tech company over eight months found that employees worked at a faster pace, took on broader scope, and extended work into more hours of the day with generative AI. Often without being asked.

That sounds great until the excitement fades and workload creep sets in. Cognitive fatigue, burnout, weakened decision-making. The productivity surge gives way to lower quality work and turnover.

Someone on Twitter nailed it: "The part of 'everyone becomes a manager' in AI that I didn't really think about until now was the mental fatigue of context switching and keeping many tasks going at once, which of course is one of the hardest parts of being a manager and now you all get to enjoy it too."

We're shifting from programmers engaged with code to supervisory programmers herding agents. But will increasing context-switching undermine the effectiveness of driving many agents? Programmers will still be accountable for code generated under their watch. The question is whether we can harvest the parallelism of agents while minimizing the context-switching that makes management exhausting.

I expect a lot of activity exploring effective workflows for supervisory programming in the coming months, because right now we're mostly just winging it and hoping the productivity gains outweigh the cognitive costs of becoming air traffic controllers for our AI coworkers.