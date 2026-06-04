---
title: "LLM 0.32a0: Why Your Prompt/Response Mental Model is Already Obsolete"
description: "Simon Willison's LLM library gets a major refactor to handle multi-modal inputs, streaming message parts, and the messy reality of modern AI models"
date: 2026-05-04 12:00:55 +0530
tags: rollup, engineering, llm, open-source, python
image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720'
featured: false
---

I've been watching Simon Willison's LLM library evolve since its early days, and the 0.32a0 alpha release represents something I've been anticipating for months. Not because it adds flashy new features, but because it finally acknowledges what many of us building with [AI](https://mgks.dev/tags/artificial-intelligence/) have been dancing around: the "send text, get text back" model is dead.

When LLM first launched in April 2023, modeling the world as prompts and responses made perfect sense. You had a question, the model had an answer. Clean, simple, easy to reason about. But that mental model has been quietly crumbling for over a year now, and most libraries have been adding increasingly awkward patches to keep the illusion alive.

## The Conversation Problem Nobody Wanted to Solve

Here's the thing about modern LLM interfaces. Ever since ChatGPT proved that conversational UI wasn't just a gimmick, every interaction with these models has been framed as a dialogue. But the underlying APIs still require you to replay the entire conversation history with each turn. It's like method acting where you have to recite the entire screenplay from the beginning every time you want to say your next line.

The major vendors all copied [OpenAI's](https://mgks.dev/tags/open-ai/) chat completions API pattern, which uses this messages array structure. That's fine when you're building a conversation from scratch, but try handing it a pre-existing conversation mid-stream. The gymnastics required were absurd. LLM worked around this with a SQLite persistence layer, but that meant committing to a specific storage solution just to have basic conversation continuity.

The new `llm.user()` and `llm.assistant()` builder functions feel obvious in hindsight, but they solve a real architectural pain point. You can now construct conversations as first-class objects without fighting the library's assumptions about how you're storing state.

## Streaming is Not Just Faster Text Anymore

The second major shift in 0.32a0 addresses something even messier: model responses are no longer homogeneous streams of tokens. Claude might send you reasoning output, then regular text, then a JSON tool call request, then more text. Some models execute tools server-side and return the results inline. Multi-modal output models are starting to appear that can interleave images or audio snippets.

The old streaming API couldn't represent this without grotesque hacks. Now responses are modeled as streams of typed message parts. You can iterate through them and handle different types appropriately. Want to display reasoning tokens in a different color? That's now a natural consequence of the architecture instead of a special case.

What strikes me about this design is how it pushes complexity to where it belongs. Instead of pretending everything is just text tokens with metadata, it acknowledges that modern [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) models produce structured, typed outputs that need structured, typed handling.

## The Backwards Compatibility Trick

Here's what I respect most about this refactor: the old `prompt=` parameter still works. LLM just upgrades it to a single-item messages array behind the scenes. This is how you do breaking changes without breaking anyone. The surface API evolves while maintaining compatibility with code written against older assumptions.

The new `response.to_dict()` serialization mechanism also hints at where this is going. LLM has been locked into SQLite for conversation persistence, which is fine for many use cases but constraining if you want to use Redis, or Postgres, or some distributed system. Now you can extract a TypedDict representation and handle storage however you want.

## What's Still Missing

Willison mentions the remaining challenge: redesigning the SQLite logging system to capture these finer-grained details without duplicating conversation history. He's thinking about modeling it as a graph, which makes sense when you consider how chat completion APIs constantly extend and replay conversations.

I'm curious whether that ships in 0.32 or gets pushed to 0.33. Graph-based storage for conversation history feels like it needs careful design, not something to rush into an already substantial refactor. But the fact that it's being considered shows the depth of thinking here.

The alpha release strategy is smart too. Get the core abstractions into real-world use, exercise them against actual plugins and use cases, find the sharp edges before declaring it stable. Software design is empirical, not theoretical.

This release won't make headlines because it doesn't add chatbot features or integrate with the latest model provider, but it represents something more valuable: a library author recognizing when fundamental assumptions need to change and having the discipline to refactor the entire abstraction layer to match reality.