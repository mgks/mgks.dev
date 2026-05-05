---
title: "LLM 0.32a0: Rethinking Abstractions for Modern Language Models"
description: "Simon Willison's LLM library gets a major refactor to handle multi-modal inputs, streaming typed responses, and the messy reality of frontier models."
date: 2026-05-06 00:00:56 +0530
tags: rollup, engineering, llm, api-design
image: 'https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988'
featured: false
---

I've been watching Simon Willison's LLM library evolve since its early days, and the 0.32a0 alpha release represents something rare in open source: a willingness to fundamentally rethink your abstractions when the world changes underneath you.

The core problem is simple to state but hard to solve. When LLM launched in April 2023, the mental model was straightforward: you send text to a model, you get text back. That was the contract. But [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) models didn't stay still. They learned to see images, hear audio, watch video, generate structured JSON, call tools, show their reasoning, and even create images. The original abstraction cracked under pressure.

What I find interesting here is not just the technical solution but the timing. This is an alpha release of a library that already works fine for most people. Willison could have kept bolting on special cases and custom flags. Instead, he's choosing to rebuild the foundation while the building is occupied.

## Messages All The Way Down

The first major change replaces the simple `prompt=` parameter with a `messages=[]` array. This mirrors what every major [AI](https://mgks.dev/tags/artificial-intelligence/) vendor API already does, treating interactions as conversational turns rather than isolated prompts.

The insight here is that models don't actually understand "prompts" anymore. They understand conversations. Every time you send a new message, you're really sending the entire conversation history up to that point, like a screenplay that keeps getting longer. The model fills in the next line from the assistant character.

This worked fine if you were building conversations from scratch, but it made certain tasks unnecessarily painful. Want to build an emulation of the OpenAI chat completions API? Good luck inflating a stored conversation back into the right format. LLM had workarounds using SQLite, but those never became stable API features.

Now you can pass in conversation history directly. You can use builder functions like `llm.user()` and `llm.assistant()` to construct message arrays, or you can reply to previous responses with `response.reply()`. The old `prompt=` still works, but internally it just becomes a single-item messages array.

## Streaming Typed Chaos

The second change is even more ambitious. Modern models don't just return text anymore. A single response from Claude might include reasoning tokens, regular text, a JSON tool call request, more text, then another tool call. [OpenAI](https://mgks.dev/tags/open-ai/) models can execute code interpreter or web search on the server side, returning tool outputs mixed into the stream. Multi-modal output models are starting to return images or audio snippets.

LLM 0.32a0 models all of this as a stream of typed message parts. You can iterate through a response and check what type each chunk is: text, reasoning, tool call, tool result, whatever. This is a much more honest representation of what's actually happening inside these frontier models.

The practical benefit shows up immediately in the CLI. Reasoning tokens now display in a different color and go to stderr instead of stdout. That means they won't pollute your pipeline if you're chaining LLM with other Unix tools. There's also a `-R` flag to suppress reasoning output entirely if you just want the final answer.

What strikes me about this design is how it embraces messiness rather than hiding it. Modern language models are not clean input-output functions. They're complex systems that think out loud, call tools, backtrack, and produce multiple types of content. The API now reflects that reality.

## The Storage Problem

Willison mentions that the current SQLite conversation persistence is "quite inflexible" and needs a redesign. He wants to model conversations as graphs rather than linear sequences, which makes sense when you consider how chat APIs actually work. Every new prompt replays the entire conversation history, which means you're constantly storing duplicated message chains.

A graph structure would let you store each message once and track branching conversation paths. This is the right mental model, but it's also a hard problem. The fact that he's considering holding this for 0.33 instead of cramming it into 0.32 shows good judgment.

The new `response.to_serializable()` method at least provides an escape hatch for people who want to roll their own storage layer. It returns a TypedDict that captures all the important state without committing you to any particular persistence strategy.

## Backwards Compatible Refactors

Here's what impresses me most: this is described as a "major backwards-compatible refactor." Those four words contain a lot of careful design work. Breaking changes are easy. Maintaining compatibility while fundamentally restructuring your abstractions is hard.

The old `prompt=` parameter still works. The CLI only needed one new flag. Existing code should mostly keep running while new code can take advantage of the richer abstractions. That's not sexy, but it's professional.

I keep coming back to the motivation here. This isn't driven by feature requests or competitive pressure. It's driven by the gap between the library's abstraction and the reality of what modern models can do. That gap was only going to get worse as multi-modal output models become more common and models develop even weirder capabilities.

Sometimes the right move is to stop patching and rebuild the foundation, even when it means shipping an alpha and exercising it in production for a few days to find the design flaws. The alternative is technical debt that compounds until the abstraction becomes actively misleading about what's actually possible.