---
title: "LLM 0.32a0: When Your Abstraction Meets Reality's Complexity"
description: "Simon Willison's LLM library gets a major refactor to handle the messy, multi-modal world of modern AI models. Here's why abstractions always break."
date: 2026-05-03 12:00:56 +0530
tags: rollup, engineering, open-source, llm
image: 'https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076'
featured: false
---

I've been watching Simon Willison's LLM library evolve since he first released it in 2023, and the new 0.32a0 alpha is one of those releases that makes you think about how quickly the ground shifts beneath us in [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) development. The original abstraction was simple and beautiful: text goes in, text comes out. That worked great for GPT-3.5 era models. It doesn't work anymore.

The problem with good abstractions is that reality eventually punches holes in them. When Simon started LLM, treating prompts as simple text inputs made perfect sense. But then models started accepting images. Then audio. Then video. Then they started returning structured JSON, calling tools, and showing their reasoning process. And now some models can return images and audio too.

You can only patch an abstraction so many times before you need to rethink the whole thing.

## The Message-Based World We Actually Live In

The shift from `prompt=` to `messages=[]` might seem like a small API change, but it represents a fundamental recognition of how we actually use these models. Nobody just sends one-off prompts anymore. Every interesting application involves a conversation, a back-and-forth, a context that builds over time.

The clever part here is that LLM was already handling this behind the scenes with SQLite, but that meant you were locked into Simon's storage decisions. The new approach gives you the primitives to build conversations however you want. You can store them in PostgreSQL, Redis, a text file, or just keep them in memory. The library doesn't care anymore.

What I find interesting is how this mirrors the evolution of every major [LLM](https://mgks.dev/tags/llm/) provider's API. OpenAI's chat completions format became the de facto standard not because it was mandated but because it actually matched how people wanted to use these models. Sometimes the right abstraction emerges from usage patterns rather than upfront design.

## Streaming Heterogeneous Chaos

The streaming changes are where things get really messy, in a good way. Modern models don't just return text anymore. They return thinking tokens, then regular tokens, then tool calls, then more text, then maybe an image or some audio. It's a heterogeneous stream of typed parts, and your abstraction needs to handle that without making the simple case painful.

The new `response.parts()` API gives you this stream of typed message parts. You can iterate over them and handle each type differently. Reasoning text can go to stderr in a different color. Tool calls can be displayed as they happen. It's not elegant in the classical sense, but it's honest about the complexity we're dealing with.

I appreciate that Simon kept the CLI interface almost unchanged despite this massive internal refactor. The only new flag is `-R/--no-reasoning` to suppress thinking tokens. Good library design means absorbing complexity internally so users don't have to care until they need to.

## The SQLite Problem That's Not Really About SQLite

The part about redesigning the conversation storage as a graph is fascinating because it highlights a problem that most LLM applications eventually hit. When you're using an [OpenAI](https://mgks.dev/tags/open-ai/) style chat API, you're constantly sending the same conversation history over and over, just with one more message appended each time.

Storing this naively means duplicating the entire conversation on every turn. That's wasteful and makes it hard to understand the actual structure of what's happening. A graph model where conversations branch and merge makes conceptual sense, but I wonder if it's overengineering for most use cases.

Simon's undecided about whether this should land in 0.32 or wait for 0.33, and I think that's the right call. Ship the core refactor first, see how people use it, then figure out the storage story. Perfect is the enemy of shipped.

## Breaking Changes That Aren't Breaking

The beauty of this refactor is that it's technically backwards compatible. Old code using `prompt=` still works because LLM just wraps it in a single-item messages array internally. But everyone will need to migrate eventually because the old abstraction can't express what models can actually do now.

This is how you deprecate an API without breaking everyone's code. You build the new system alongside the old one, make migration easy, and let people move at their own pace. The alpha release strategy here is smart too. Get the [open-source](https://mgks.dev/tags/open-source/) plugins updated, exercise the new design in production for a few days, and fix any glaring issues before stamping it as stable.

The real test will be whether third-party plugin authors can adapt without too much pain. LLM's plugin ecosystem is its killer feature, and a refactor like this could easily fragment the community if the migration path isn't smooth.

I keep coming back to how this release represents a broader truth about building tools in rapidly evolving spaces: your abstractions will always lag behind reality, and the question isn't whether you'll need to refactor but how gracefully you can do it when the time comes.