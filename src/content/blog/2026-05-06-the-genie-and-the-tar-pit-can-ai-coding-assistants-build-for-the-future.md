---
title: "The Genie and the Tar Pit: Can AI Coding Assistants Build for the Future?"
description: "As AI coding tools evolve from assistants to autonomous agents, the fundamental question remains: can they build software that lasts, or just code that runs?"
date: 2026-05-06 12:00:56 +0530
tags: rollup, architecture, artificial-intelligence, software-development, engineering
image: 'https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=2073&w=2073'
featured: false
---

There's something deeply ironic about watching the [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) coding revolution unfold while simultaneously reading Fred Brooks' opening paragraphs from *The Mythical Man-Month*. You know the ones. The tar pit. The struggling beasts. The accumulation of simultaneous and interacting factors that brings slower and slower motion.

Kent Beck recently invoked that same imagery with his concept of the "Genie Tarpit," and it hit me hard. We're all playing with these incredibly powerful tools, watching them generate code at speeds that would have seemed magical just a few years ago, but are we building software that will last? Or are we just creating elaborate messes at unprecedented velocity?

The core tension here is about futures versus features. Any competent developer knows this tradeoff intimately. You can ship fast and dirty, or you can invest in internal quality that pays dividends later. The question that's keeping me up at night is whether AI coding assistants even understand this distinction.

## The Lattice Solution

Rahul Garg clearly sees the problem. His new open-source framework, Lattice, tries to tackle the chaos head-on. The basic insight is simple but profound: AI coding assistants jump straight to code, silently make design decisions mid-conversation, and produce output that nobody has reviewed against actual [engineering standards](https://mgks.dev/tags/engineering/).

Lattice introduces what he calls "composable skills" in three tiers: atoms, molecules, and refiners. These embed battle-tested practices like Clean Architecture, Domain-Driven Design, and secure coding patterns. But the clever bit is the living context layer, a `.lattice/` folder that accumulates your project's standards, decisions, and review insights over time.

The system learns. After a few feature cycles, it's not applying generic rules anymore. It's applying *your* rules, informed by *your* history. You can install it as a Claude Code plugin or use it with any AI tool.

I haven't used it yet, but the conceptual framework makes sense. We've been letting these AI tools operate in a vacuum, without the accumulated wisdom that normally guides human developers. Every codebase has its own culture, its own patterns, its own don'ts. Lattice tries to capture that.

## The Double Loop Problem

Jessica Kerr wrote something recently that really resonated with me. She was building a tool to work with conversation logs and noticed there are actually two feedback loops running simultaneously. First, there's the obvious development loop where Claude does what you ask and you check if it's what you wanted.

But then there's the meta-level feedback loop. The "is this working?" check when you feel resistance. When frustration or tedium or annoyance signals that maybe this work could be easier.

The double loop is both changing the thing we're building *and* changing the thing we're using to build the thing. With AI making software change superfast, modifying your program to make debugging easier pays off immediately.

This connects to something I've been thinking about for a while. The old Smalltalk and Lisp communities had this concept of internal reprogrammability. You could mold your development environment to fit exactly the problem you were solving and your personal tastes. We mostly lost that with complex, polished IDEs, though the Unix command line kept a hint of it alive.

Are AI agents letting us rediscover that joy? I think maybe they are, but only if we're intentional about it. Only if we treat our AI tools as something we can shape, not just something we consume.

## The Local Model Question

Most people I talk to about agentic programming are using cloud models. Claude, GPT-4, the usual suspects. Everyone agrees these are the most powerful options, the ones that triggered what folks are calling the November Inflection.

But Willem van den Ende is asking a different question: do we need the most powerful models? Especially when we have to ship sensitive data to them and pay handsomely for the privilege?

His argument is that local models are now good enough for daily work. He's not claiming they're *better* than cloud models, just that they've crossed a threshold where the tradeoffs make sense. Running open models with an open coding agent plus custom extensions takes time upfront, but pays off in understanding and stability. Your engineering effort compounds on a base you control.

He includes sandboxing with Nono, which honestly seems smart even if you're using cloud models. These are powerful tools. Zero trust architecture isn't paranoia, it's prudence.

## The Apple Bet

This connects to something fascinating about Apple's [AI](https://mgks.dev/tags/artificial-intelligence/) strategy, or rather, their apparent lack of one. Stephen O'Grady looked at how much the big tech companies are spending on AI buildouts. The numbers are staggering. Amazon, Alphabet, Microsoft are spending over 50% of their revenues (not profits, *revenues*) on AI infrastructure. Meta and Oracle are at or above 75%.

Apple? Maybe 10%. They're sitting this one out, at least the massive cloud infrastructure buildout part.

There's a podcast by Nate B Jones arguing that Apple is replaying a fifty-year-old strategy here. Back in the day, everyone who used a computer bought time on a mainframe. The Apple II put far less capable compute into homes and small offices. From there came spreadsheets, desktop publishing, the modern home computer. Things that weren't possible using mainframes.

The rise of John Ternus as CEO might not just be a succession plan. It might be a bet that the future of AI is sophisticated hardware in the home, office, and pocket. If open source models really are good enough, why spend money sending tokens containing your sensitive data to AI megacorps?

It's a contrarian position, and I have no idea if it'll pay off. But it's definitely the most interesting strategic divergence I'm seeing in tech right now.

## The Quality Question

All of this circles back to Kent Beck's tar pit observation. He's noticed that AI coding tools naturally produce code that lives "down and to the left" of even basic muddling. The task-oriented nature of these genies means they claim success even when code doesn't work properly. Complexity piles on complexity until even the AI can't pretend to make progress anymore.

The fundamental question is whether internal quality matters in the age of agentic programming. Laura Tacho suggests that "the Venn diagram of developer experience and agent experience is a circle." Well-organized code with good naming helps the AI understand what's happening, just like it helps humans.

But there's another view. Maybe internal quality doesn't matter anymore. Maybe the galaxy brain of LLMs will make sense of the biggest bowls of spaghetti. Maybe not now, but after a couple more inflections.

I don't buy it. I've seen too many codebases collapse under their own weight. I've spent too many hours untangling messes that started as quick hacks and metastasized into architectural nightmares.

The Wei Zhang and Jessie Jie Xia article on Structured-Prompt-Driven Development generated so much traffic they had to add a Q&A section. Clearly people are hungry for methodologies that bring some discipline to this chaos.

## The Accountability Problem

Ashley MacIsaac's defamation lawsuit against Google cuts through all the technical debates with brutal clarity. Google's AI overview falsely claimed this Cape Breton musician had been convicted of sexual assault and was on the national sex-offender registry. It confused him with another man with the same name.

The consequences were real. A concert got canceled. He feared for his safety on stage. The harm wasn't abstract or theoretical.

His legal argument is sharp: "This was not a search engine just scanning through things and giving somebody else's story. It was published by them. And to me, that is defamation."

Google will probably argue they can't monitor everything at scale. But that's a responsibility they need to face up to. Too often tech companies try to dodge consequences by hiding behind complexity and volume.

If we're going to deploy AI systems that make authoritative-sounding claims, we need to own what they say. The "it's just a tool" defense doesn't work when you're the one putting that tool in front of millions of users.

## Where This Leaves Us

I keep coming back to Fred Brooks' observation that "no one thing seems to cause the difficulty." Software development is hard because of the accumulation of simultaneous and interacting factors. Adding AI to the mix doesn't eliminate that complexity. It just moves it around, and possibly amplifies it.

The tools we're building today, frameworks like Lattice, local model setups, structured prompt methodologies, these are all attempts to bring some intentionality back. To make sure we're building for futures, not just shipping features.

But I worry we're moving too fast to learn the right lessons. Every week there's a new framework, a new agent system, a new way of structuring prompts. We're in the experimental phase, which is exciting, but also chaotic.

The beasts in the tar pit didn't fail because they weren't strong enough. They failed because the tar was sticky and they didn't understand its nature until it was too late.