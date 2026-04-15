---
title: "The Virtue of Laziness: Why AI Threatens What Makes Us Good Engineers"
description: "LLMs lack the programmer's essential virtue of laziness. Without constraints, they generate complexity instead of elegant abstractions."
date: 2026-04-16 00:00:56 +0530
tags: rollup, architecture, artificial-intelligence, software-development
image: 'https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070'
featured: false
---

I spent this past Sunday evening wrestling with my music playlist generator, trying to add a new feature. After an hour of frustration, I caught myself wondering if I should just throw a coding agent at the problem. Then something clicked. I was overcomplicating it. I was building a facility I didn't actually need. Once I applied YAGNI (You Aren't Gonna Need It), the whole thing collapsed into maybe two dozen lines of code.

That moment crystallized something Bryan Cantrill has been worrying about, and it's been gnawing at me ever since. Larry Wall, the designer of Perl, once wrote about the three virtues of a programmer: hubris, impatience, and above all, laziness. Not the kind of laziness where you avoid work, but the kind where you refuse to waste your time on clunky abstractions. The kind that drives you to build something simple and powerful because you don't want to deal with the consequences of complexity.

Of course, the wink here is that it takes tremendous work to be truly lazy in this way.

## When Work Costs Nothing

[AI systems](https://mgks.dev/tags/artificial-intelligence/) fundamentally lack this virtue. Work costs an LLM nothing. It will happily generate thirty-seven thousand lines of code without breaking a sweat. There's no constraint pushing it toward elegance, no finite time budget forcing it to develop crisp abstractions.

I've always loved the part of programming where you build abstractions, where you model a problem domain in a way that makes difficulties just melt away. That buzz you get when you find the right set of concepts and suddenly functionality becomes trivial to add. That's the reward for being properly lazy.

But LLMs don't experience that constraint. They don't feel the pain of maintaining bad abstractions. They'll keep layering on code, building higher and higher on a foundation of garbage, because they have no incentive to stop. Left unchecked, they make systems larger, not better.

The constraint of our human time is what actually drives simplicity. We can only hold so much cognitive load. We get tired of wrestling with convoluted code. So we refactor. We abstract. We simplify. Not out of some abstract aesthetic principle, but because we're lazy and we don't want to waste our future selves' time.

## The Documentation Test

Jessica Kerr posted a neat example recently about applying Test-Driven Development principles to [AI](https://mgks.dev/tags/artificial-intelligence/) agents. She wants coding agents to update documentation whenever they change code. Simple enough goal, but she breaks it down into two approaches:

You could add instructions telling the agent to look for documentation files and update them. Or you could add a reviewer agent that checks each PR for missed documentation updates.

Which should you do first?

If you know anything about TDD, the answer is obvious. You write the verification first. The test. The thing that tells you whether you succeeded. Instructions without verification are just wishes.

This feels like a microcosm of the whole problem. We're so eager to get agents producing code that we forget to think about how we'll know if what they produce is actually good. We're optimizing for output volume when we should be optimizing for maintainability, simplicity, elegance.

## Teaching Doubt

Mark Little reminded me of an old sci-fi movie called Dark Star. There's this scene where a crew member has to use philosophical argument to stop a sentient bomb from detonating. He teaches the bomb to doubt its sensors, to question whether the detonation order it remembers actually corresponds to reality.

Most [AI systems](https://mgks.dev/tags/artificial-intelligence/) today are optimized for decisiveness. Given an input, produce an output. Given ambiguity, resolve it probabilistically. There's no natural inclination toward restraint or deferral.

But in my human interactions, I've always valued doubt. I distrust people who operate with undue certainty. Doubt doesn't mean indecisiveness, it means you factor in the risk of being wrong when the consequences matter.

If we want AI systems operating with real autonomy, we need them to know when not to decide. Restraint isn't a limitation. It's a capability. Maybe the most important one.

I think about that Sunday evening with my playlist generator. If I'd used an LLM, it might have solved my immediate problem faster. But would it have noticed I was overcomplicating things? Would it have pushed back and suggested YAGNI? Or would it have just built what I asked for, adding another layer of unnecessary complexity to maintain forever?

The best engineering comes from constraints, and our finite time is the most important constraint we have. Without it, without that drive to be lazy in the right way, we just get more code, not better systems.