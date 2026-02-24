---
title: "The Map That Became the Territory: AI, Specifications, and What We Mean When We Say 'I Built This'"
description: "On AI agents, observability, bespoke software, and the uncomfortable question of who actually built what when LLMs generate our code."
date: 2026-02-24 12:00:11 +0530
tags: rollup, architecture, artificial-intelligence, llm, software-development
image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720'
featured: false
---

I've been thinking about that Lewis Carroll quote. The one about the map that's a mile to a mile, so perfect in its representation that the country itself becomes its own map. It showed up in a discussion about whether we should replace code with specifications when working with [LLMs](https://mgks.dev/tags/llm/). The irony is delicious: as we try to abstract away from implementation details, we risk creating specifications so detailed they become indistinguishable from the code itself.

But that's not the most interesting part. The most interesting part is what happens when the map starts drawing itself.

## The Security Theater of High-Permissioned Agents

Let's talk about OpenClaw for a moment. The pattern here is familiar: fascinating technology, terrifying security implications, and a bunch of people trying to figure out how to experiment without burning down their infrastructure. Jim Gumbley suggests practical mitigations like cloud VMs or micro-VM tools like Gondolin. These are good ideas. They reduce the blast radius.

But here's the thing that keeps me up at night: we're treating [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) agents like they're just particularly aggressive scripts. We're applying container security patterns to something that can potentially reason its way around those containers. I'm not saying the mitigations are useless. I'm saying we might be fighting the last war.

The deeper issue is that we don't have a mental model for what "secure deployment of an agent with broad permissions" even means. We're improvising. And improvisation in security usually ends poorly.

## Observability in the Age of Non-Determinism

Caer Sanders makes a point that resonates deeply with my experience: the biggest indicator of dysfunction in AI organizations is lack of observability. Teams that don't measure and validate inputs and outputs are setting themselves up for spectacular failures.

I've been saying for years that production QA is undervalued. Now we're entering an era where your system might produce different outputs given identical inputs, and suddenly everyone's rediscovering the value of actually watching what your software does in the wild.

The robotics parallel Caer draws is instructive. If you design a chassis, model it, and have it 3D printed, most people would say you built the robot, not the printer. But when AI generates the code that glues your system together, who built the system? The intuition breaks down because we've spent decades treating code as the fundamental unit of creation in software.

Maybe it never was. Maybe we were always specifying intent and the compilers were doing the building. The LLMs just made the abstraction gap wide enough to make us uncomfortable.

## Bespoke Software and the Death of App Stores

Andrej Karpathy spent half an hour vibe coding a custom dashboard for his treadmill experiments. His observation that the app store model is becoming outdated strikes me as both obviously true and deeply unsettling. The future, he suggests, is AI-orchestrated services creating ephemeral, highly custom applications.

This is where the map-to-territory metaphor really lands. If every user gets bespoke software generated on demand, what does "debugging" mean? What does "version control" mean? How do you A/B test when every experience is unique?

The answer, I think, circles back to observability. When you can't rely on deterministic behavior, you need comprehensive instrumentation. You need to know what your system is actually doing, not what you think it should be doing based on the code you wrote, because increasingly you didn't write the code. You specified the intent.

## The Pronoun Problem and Attribution

There's a small note in the source material that bothers me more than it should: the need for a new pronoun so AI can identify itself without anthropomorphizing. When a chatbot says "I did this thing," it grates because of the presumption.

But this connects to a larger question about attribution in AI-assisted work. If an [LLM](https://mgks.dev/tags/llm/) materially helped with your writing, acknowledge it. Not just for transparency, but because it gives readers information about the potential value and limitations of what they're reading.

I hardly use LLMs for my own writing, though I suspect I have an inflated opinion of my ability. But the principle applies broadly: know your audience. If they'll be annoyed by the uncanny valley of AI prose, don't let it generate your text. If you're writing a mandated report nobody will read, have at it.

The real question is whether acknowledgment scales. When AI generates 80% of your codebase, do you credit it in every file? In the README? Does it matter if the AI was following your specifications so precisely that the code is effectively a deterministic transformation of your intent?

We don't have good answers yet because we're still pretending the old categories apply.

## The Specification That Ate Itself

Back to that Carroll quote. The farmers objected to the mile-to-mile map because it would cover the whole country and shut out the sunlight. So they used the country itself as its own map.

The joke lands differently now. We're creating specifications so detailed, so comprehensive, that they approach the complexity of the implementation. At that point, why not just use the implementation as its own specification? Let the AI generate the code, instrument it heavily, and observe what it actually does.

This sounds reckless. It probably is reckless. But I'm not sure the alternative, infinitely detailed specifications that somehow remain more maintainable than code, is actually achievable.

The middle path, if there is one, requires us to get much better at observability, much more comfortable with non-determinism, and much more honest about what we mean when we say "I built this." Because increasingly, the answer might be "I specified the intent, the AI built it, and we're both hoping it does what I meant."