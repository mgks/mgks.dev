---
title: "Code Review, Observability, and the Cognitive Cost of AI Amplification"
description: "Rethinking code review as product judgment, observability as our new IDE, and whether AI tools extend our capabilities or replace them entirely."
date: 2026-03-24 00:00:33 +0530
tags: rollup, architecture, artificial-intelligence, observability, code-review
image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'
featured: false
---

David Poll makes a point about code review that I've been dancing around for years but never quite articulated properly. Code review isn't primarily about catching bugs. Sure, reviewers find bugs. But if that's what you think the process is for, you're missing almost everything valuable about it.

The question code review really answers is: "Should this be part of my product?" That's it. That's the core insight.

I think about code review as keeping the codebase healthy, which is close but not quite the same thing. Poll's framing is sharper because it explicitly connects technical decisions to product judgment. When he ran Firebase's API council for five and a half years, the most valuable feedback was never about bugs in specs. It was about mental model contradictions, trust-eroding deprecation strategies, and APIs that would confuse developers encountering them for the first time.

These are judgment calls about direction. No amount of production observability surfaces them because the system can work perfectly and still be the wrong thing to have built.

## The Judgment Layer

I agree completely that we shouldn't think of review as bug-catching. It's about steering. But I'd add something Poll doesn't emphasize enough: code review is fundamentally about communication between people. It enables multiple perspectives on product development. This is true for traditional pull request reviews, but also for pair programming and what I think of as refinement code review, the kind you do after integration.

[AI](https://mgks.dev/tags/artificial-intelligence/) raises the level of that judgment. When machines can generate syntactically correct code at superhuman speed, the human role shifts up the abstraction ladder. We're not scrutinizing semicolons anymore. We're asking whether this entire approach makes sense, whether it fits the product's trajectory, whether it will make sense to the team six months from now.

That's a harder skill than bug-spotting, and it's one we haven't systematically taught to most developers.

## What Observability Reveals

Charity Majors wasn't happy with the Thoughtworks Future of Software Development Retreat recap. Her concern is that the most respected minds in software are replicating a decades-old blind spot: relegating production to the realm of bugs and incidents.

She's right to push back. I consider [observability](https://mgks.dev/tags/observability/) to be a key tool in working with our AI future, and not because it catches bugs. I've long supported the notion of QA in production. Observability reveals what the system actually does when real users interact with it.

Test cases help with known paths. Reality drags you into the unknowns. Not just unknowns of software behavior in unforeseen places, but unknowns of how the software affects the broader human and organizational systems it's embedded in. By watching how software is used, we learn what users really want to achieve. These observed requirements often never appeared in interviews or focus groups.

If this is true for systems written line-by-line in deterministic code, it's exponentially more true in a world of supervisory engineering where humans don't examine every semicolon. Harness engineering and humans in the loop help. Tests remain as important as ever for explaining and evaluating code. But the unknowns will inevitably raise observability's importance in understanding what the system thinks it does.

I think we'll see a future where much of a developer's effort goes into figuring out what a system is doing and why it behaves that way. Observability tools become the IDE.

## The Cognitive Bargain

Tim Requarth questions whether [AI](https://mgks.dev/tags/artificial-intelligence/) actually amplifies human cognition or just replaces it. He draws a sharp contrast between navigating with paper maps versus GPS.

With a paper map, you study streets, trace routes, convert the bird's eye abstraction into first-person perspective. By the time you arrive, you have a nascent mental model of how the city fits together. With Google Maps, you get a blue dot, an optimal line from A to B, a reassuring robotic voice. You follow, you arrive, you have no idea where you are.

A paper map demands something from you. That demand leaves you with knowledge. GPS requires nothing and leaves you with nothing.

Steve Jobs called computers "bicycles for the mind." Satya Nadella said with ChatGPT's launch that "we went from the bicycle to the steam engine." The difference matters. A bicycle was a technological revolution, but the cyclist still had to put in effort. You are traveling, not being traveled.

Requarth argues Silicon Valley executives focus too much on the goal and ignore the cognitive atrophy in the humans being traveled.

## What We Choose to Lose

Much of this depends on whether we care about what we're losing.

I struggle with mental arithmetic, so I value calculators. I don't think I lose anything when machines handle calculation toil. I do miss the sense of place when using GPS over maps, but I'm happy I can drive through unfamiliar neighborhoods without getting lost.

When it comes to writing, I have no desire to let an LLM write for me. The thinking happens in the writing. If I outsource the writing, I outsource the thinking.

The same applies to code. If I'm using AI to generate boilerplate that I understand completely and could write myself but would rather not, that's a bicycle. If I'm using AI to generate logic I don't fully understand and can't readily explain, that's a steam engine, and I'm being traveled.

AlphaGo defeated the best human Go players a decade ago. Since then, humans study AI games to become better players and discover broader principles. The interesting question isn't whether AI can beat us, it's whether we can learn from AI systems to improve in fields where success is less deterministically defined.

Maybe the future of software development looks like studying AI-generated code the way Go masters study AlphaGo games, extracting patterns and judgment calls that make us better engineers even when we write code ourselves.