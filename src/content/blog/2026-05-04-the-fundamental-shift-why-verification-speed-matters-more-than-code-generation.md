---
title: "The Fundamental Shift: Why Verification Speed Matters More Than Code Generation"
description: "AI coding tools are everywhere now. But the game isn't about generating code faster anymore. It's about knowing if that code is right."
date: 2026-05-04 00:00:56 +0530
tags: rollup, architecture, artificial-intelligence, software-engineering
image: 'https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076'
featured: false
---

Chris Parsons just dropped his third update on using [AI](https://mgks.dev/tags/artificial-intelligence/) to code, and there's something crucial buried in there that I think many developers are missing. The fundamentals haven't changed much since his first post: keep changes small, build guardrails, document everything, verify before shipping. What has changed is the volume.

"Verified" used to mean you actually read the code. With modern agent throughput, that's no longer realistic. Now it means checked by tests, by type checkers, by automated gates, or by you only where your judgment actually matters. The check still happens. It just doesn't always happen in your head.

This feels uncomfortable at first. We've been trained to believe that good programming means understanding every line. But here's the thing: a team that can generate five approaches and verify all five in an afternoon will destroy a team that generates one and waits a week for feedback. The game has shifted from "how fast can we build" to "how fast can we tell whether this is right".

## The Harness Is Everything

Parsons recommends either Claude Code or Codex CLI, but his real emphasis is on the inner harness these tools provide. And Birgitta Böckeler's recent article on Harness Engineering (which got crazy traffic, by the way) digs into exactly why this matters.

LLMs are brilliant at exploratory and fuzzy rules. But once you've identified something that really is objective, converting it to a formal, unambiguous, deterministic format gives you more assurance. Böckeler did experiments with static analysis and found something interesting: it's more useful with agents because they actually address every warning. They don't slack off like humans do.

That's the key insight. Build better review surfaces, not better prompts. Make feedback unnecessary where possible by having the agent verify against a realistic environment before it asks a human. Make feedback instant where you can't eliminate it.

If you're a senior engineer worried that your job is quietly turning into approving diffs, you're right. It is. The way out isn't to resist this. It's to train the [AI](https://mgks.dev/tags/artificial-intelligence/) so the diffs are right the first time, to become the person on the team who shapes the harness, and to make that work the visible thing you're measured on. That role compounds in a way that reviewing never will.

## Functions Still Matter, But For Different Reasons

Adam Tornhill asked an age-old question recently: how long should a function be? Turns out this question is still relevant in agentic programming, just for different reasons.

AI models don't "understand" code the way humans do. They infer meaning from patterns in tokens and depend heavily on what's explicitly expressed in the code. Research shows that naming plays a critical role. When meaningful identifiers get replaced with arbitrary names, model performance drops significantly. Current models rely on literal features like names, structure, and local context rather than inferred semantics.

The answer isn't about line counts. It's about providing better structure. Functions are the first unit of structure in a codebase. They define how logic is grouped, how intent is communicated, and how change is localized. If the function boundaries are wrong, everything built on top of them becomes harder to understand and harder to evolve.

I've written before that the key to function length is the separation between intention and implementation. If you have to spend effort looking at a fragment of code to figure out what it's doing, extract it into a function and name it after that "what". When you read it again, the purpose leaps right out at you. Most of the time you won't need to care about how the function fulfills its purpose.

This matters even more with AI tools because they lean so heavily on those explicit signals. A well-chosen function name defines useful concepts and enters the vocabulary of your program. That vocabulary is what the AI uses to understand and extend your codebase.

## Software Brain Meets Reality

Nilay Patel wrote something that's been bouncing around my feeds about why people hate AI. He has this concept of "software brain", which is when you see the whole world as a series of databases that can be controlled with structured code.

Zillow is a database of houses. Uber is a database of cars and riders. YouTube is a database of videos. Once you start seeing the world as a bunch of databases, it's a small jump to feeling like you can control everything if you can just control the data.

Here's the problem: Software Brain views people as databases, and people really don't like that. Getting everything into a database so software can see it is a preoccupation of the AI industry. It's why all the meeting systems have AI note takers now.

I was chatting recently with a company wanting to use AI to make sense of their internal data. The potential was huge, but the data was a mess. People put stuff into fields that didn't make sense, there was no consistency about how important entities got classified. As someone commented, the hardest problem with internal data is precise, consistent definitions.

This has been true during all my decades with computers. The difficulty of getting such definitions undermines much of the hopes of Software Brain. But it also points to something important: precise and consistent definitions are crucial for effective communication with AI tools. These definitions need to grow in the conversation and be tended over time. Conceptual modeling will be a key skill for [agentic programming](https://mgks.dev/tags/software-engineering/) and whatever comes next.

At least I hope it will, since it's a part of programming I really enjoy.

## The Legibility Trap

Ezra Klein wrote about a new feeling in San Francisco. AI types there aren't as confident as you might expect. They think the AI age has arrived and its winners and losers will be determined by speed of adoption. The advantages of working atop an army of AI assistants and coders will compound over time. So they're racing to fully integrate AI into their lives and companies.

But that doesn't just mean using AI. It means making themselves legible to the AI.

I see colleagues dumping all their email, meeting notes, slide decks, everything into files that AI can read and work with. This plays to AI's strengths. We know AI is really good at querying unstructured information. I can figure out what's buried in my notes far more effectively than hoping I'm typing the right search regex.

I've been using Gemini for exactly this on the web. It's easier to write a question to it than to throw search terms at Google. Gemini keeps a record of my past requests and uses that to tune what I'm looking for. As Klein observes, it's constantly referring back to other things it knows or thinks it knows about you. The result is a strange amalgam of feeling seen and feeling caricatured.

Klein is a writer, and he's faced with the same temptation I have. Maybe instead of toiling over articles, he should ask an LLM to create a style guide, and every few days ask it to compose an article, read it, tweak it, and publish. But that's not appealing at all. I want understanding to grow in my brain, not the LLM's transient session. Writing to explain my thinking to others is how I refine that thinking, "chiseling that idea into something publishable" as Klein puts it.

To have an AI write for you is to cripple your own mind, even if it makes you more "productive" by some metric someone else cares about.