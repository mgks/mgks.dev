---
title: "Datasette Agent: Where Three Years of LLM Development Finally Clicked"
description: "The convergence of conversational AI and data querying opens new possibilities for personal data assistants and extensible tooling."
date: 2026-05-23 12:00:51 +0530
tags: rollup, engineering, datasette, llm
image: 'https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073'
featured: false
---

I've been watching Simon Willison's LLM library evolve for years now, but the release of Datasette Agent feels like one of those moments where separate threads suddenly weave together into something genuinely useful. This isn't just another chatbot wrapper around a database. It's what happens when you spend three years building the right abstractions.

The core idea is deceptively simple: ask your data questions in natural language. But getting there required solving a bunch of problems that most people don't think about until they're elbow-deep in prompt engineering. How do you ensure reliable tool calls? How do you get an [AI](https://mgks.dev/tags/artificial-intelligence/) model to write valid SQLite queries consistently? How do you make the whole thing extensible so people can build on top of it without forking the codebase?

These aren't trivial questions, and the fact that we're now at a point where Gemini 3.1 Flash-Lite can handle them cheaply and reliably speaks to how far the models have come in the past year.

## The Plugin Architecture Changes Everything

What strikes me most about Datasette Agent is that it treats extensibility as a first-class concern from day one. The datasette-agent-charts plugin is the obvious showcase, letting you generate visualizations on top of your queries, but that's just the beginning.

The fact that Claude and [OpenAI](https://mgks.dev/tags/open-ai/) Codex can now reliably write Datasette Agent plugins by reading a repo checkout and following instructions is wild. We're living in this strange moment where you can say "build me a plugin that does X" and have an AI write working code that other AIs can then execute. It's turtles all the way down, and somehow it's actually practical.

I'm genuinely curious where this goes. There are apparently several plugins still in prototype phase that haven't hit alpha yet. That's the kind of pipeline that suggests this ecosystem is going to develop faster than anyone predicted.

## Local Models Are Getting There

Running Datasette Agent against gemma-4-26b-a4b in LM Studio feels like a significant moment to me. Open weight models have been improving at a breakneck pace, and the fact that they can now handle reliable tool calling and SQL generation means you're no longer trapped in the cloud API economy if you don't want to be.

Sure, Gemini Flash-Lite is cheap and fast, but there's something powerful about being able to run your own data assistant on your own hardware. The barrier to entry keeps dropping.

## Building Personal AI Around Your Data

The most interesting thing Simon mentioned almost in passing is his plan to build "Claw," a personal AI assistant built around data imported from different parts of his digital life. This is exactly where I think this technology gets genuinely interesting, beyond the novelty phase.

We've spent the last decade fragmenting our data across dozens of services. Email, social media, notes, photos, calendars, chat history. The idea of being able to query all of that through a conversational interface, powered by something you can actually understand and extend, is compelling. It's not about building a general-purpose AI. It's about building a tool that understands your specific context and your specific data.

The Dogsheep toolkit, which Simon is revisiting for this project, was ahead of its time in thinking about personal data consolidation. Now we finally have the tooling to make something useful with it.

## The Broader Implications for LLM Tooling

The major refactor coming to the LLM library on the back of this work is worth paying attention to. When building one application teaches you something fundamental about your underlying library, that's when you know you're onto something. The "LLM agent" abstractions being extracted from Datasette Agent will likely influence how people build agent-based systems more broadly.

We're still figuring out what good abstractions for [AI agents](https://mgks.dev/tags/ai-agents/) look like. Most of what exists right now is either too rigid or too opinionated. The fact that this is emerging from actual shipping code, not theoretical discussions, means it's probably worth watching.

And Datasette Cloud getting Datasette Agent support is the practical bit that will determine whether this stays in the enthusiast bubble or actually reaches people who just want a tool that works. Extensibility matters less if nobody can easily run the thing.

There's something satisfying about watching three years of incremental work suddenly crystallize into a product that feels coherent and useful. But what really got my attention is that this is just the beginning of what the plugin ecosystem will enable.