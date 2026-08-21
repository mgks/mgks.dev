---
title: "Lines of Code Still Matter When Agents Write Them"
description: "Why measuring productivity by lines of code makes sense for AI coding agents, and why teams still need humans to maintain conceptual integrity."
date: 2026-08-21 12:00:50 +0530
tags: rollup, engineering, ai-agents, software-engineering, productivity
image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=2070"
featured: false
---

I've been pushing back against the conventional wisdom that lines of code is a meaningless productivity metric. When it comes to [AI coding agents](https://mgks.dev/tags/ai-agents/), I actually think it matters quite a bit.

Here's the thing: there's a hard floor on human productivity. Before agents existed, a solid software engineer might produce 200 lines of production-ready, debugged code on a great day. Most days? Fifty or sixty lines. That's the realistic baseline when you account for thinking time, debugging, testing, and all the invisible work that goes into shipping quality code.

If agents let you produce a thousand lines of debugged code at the same quality level, that's a meaningful improvement. But and this is crucial, it only counts if the code is actually maintainable, tested, and follows your architectural patterns. You can reach that quality bar with agents, but it requires significant skill and experience to orchestrate properly. That's what separates senior engineers from junior ones in the age of AI.

## The Cognitive Load Problem

One question companies are starting to ask: if a single engineer can produce code at 100x the previous velocity, do we need teams at all? The obvious answer includes bus factor concerns and redundancy. But there's something deeper.

I can output code dramatically faster than before. What I cannot do is maintain cognitive capacity across that volume. A team of engineers still makes sense, not because humans are slow, but because the limiting factor has shifted. We need to load-balance our collective cognitive capacity across a larger codebase. The bottleneck isn't production anymore; it's comprehension and decision-making.

This fundamentally changes how we should think about team structure and code reviews. We're not reviewing for bugs so much as for architectural coherence.

## The Conceptual Integrity Crisis

There's a concept from The Mythical Man-Month called conceptual integrity: well-designed software has a coherent feel to it. Everything fits together. There are no surprises. It covers exactly the right problem space.

With agents, this becomes much harder to maintain. You can describe a feature, run a prompt, and have working code in five minutes. That velocity is seductive. But it creates a different problem: your software accumulates "weird bumps in funny directions." Each feature makes local sense, but globally the codebase loses its integrity.

I like Claire Giordano's analogy here: the Winchester Mystery House. Sarah Winchester spent 40 years continuously adding rooms because she believed she'd be haunted unless the construction never stopped. The result is 140 rooms with no coherent design, just endless accretion.

That's exactly what happens when the friction of building features disappears. You think of a wild idea and immediately ask: why not build it? When building took a week, the answer was obvious. When it takes an hour, justification becomes much easier.

## The Discipline Problem

The real issue is that discipline used to be enforced by time. Constraints bred intentionality. With agents, we lose that natural governor. Saying "no" to a feature idea becomes harder because the cost is so low.

This means [code quality](https://mgks.dev/tags/code-quality/) now depends entirely on conscious discipline and strong architectural guidelines. You need strong opinions about what belongs in your system and what doesn't. You need senior engineers making decisions about scope and coherence, not just technical correctness.

It shifts the job of senior engineers from code review for bugs to code review for *fit*. Does this feature belong? Does it align with our conceptual model? Does it maintain the integrity of the system? These questions become more important than "is this implementation correct?"

The temptation is immense. The cost of saying yes is negligible. That's precisely why the discipline has to come from architecture and culture, not from the tools. We've entered an era where fast code production is easy, but maintaining software coherence is harder than ever. The question becomes: how do we build the organizational discipline to say no to things we technically can do?