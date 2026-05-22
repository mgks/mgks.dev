---
title: "Datasette Agent: When Data Tools Meet Conversational AI"
description: "Three years of LLM work finally converges with Datasette. What this means for building AI systems around your data."
date: 2026-05-23 00:00:50 +0530
tags: rollup, engineering, datasette, llm
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674'
featured: false
---

There's a particular kind of satisfaction that comes from watching two separate projects finally click together. That's what happened this week with Datasette Agent, and honestly, I've been sitting with it for a few days trying to figure out how to articulate why it matters beyond just "cool thing exists now."

The surface-level pitch is simple enough: Datasette Agent gives you a conversational interface to query your databases. You ask questions in English, it writes SQL, executes it, and hands back results. With the charts plugin enabled, it even visualizes the data. But what actually excites me is the scaffolding underneath, and what it reveals about where <a href="https://mgks.dev/tags/artificial-intelligence/">AI</a> tooling is heading.

## The Three-Year Convergence

Simon's been building the <a href="https://mgks.dev/tags/llm/">LLM library</a> for just over three years now. That's a long time to work on something without the obvious payoff of a shipping product. You write abstractions, you iterate on patterns, you figure out what actually matters versus what sounded good on a whiteboard at 2 AM.

Datasette itself has been around even longer, quietly becoming this incredibly flexible tool for exploring and publishing data. The fact that these two projects sat in adjacent spaces for so long without formally connecting says something about how fractal software development can be. You build tools that solve your problem, you refine them, and then one day you realize the real potential was in stitching them together all along.

The demo video really drives this home. Watching a natural language question get transformed into a SQLite query that actually works, then seeing results come back with proper context, it's the kind of seamless interaction that usually takes serious engineering effort to pull off. The fact that it's running on Gemini 3.1 Flash-Lite, the cheap and speedy model, makes it even more relevant. This isn't requiring bleeding-edge hardware or unrealistic token costs.

## Extensibility as Philosophy

Where things get interesting is the plugin architecture. Datasette Agent isn't designed as a monolith that does everything. It's built from the ground up expecting you to extend it.

This matters because it means the AI assistant layer becomes a platform rather than a fixed product. Someone can build a charts plugin. Someone else can build a plugin for exporting results to specific formats. A third person might build something that integrates with their particular workflow. The core stays lean, but the ecosystem can grow in directions the original author didn't predict.

I've watched this pattern fail spectacularly in other projects. They build a plugin system, but the core team controls what matters, and external plugins feel like they're fighting against the grain. That's not what's happening here. The choice to use <a href="https://mgks.dev/tags/open-ai/">Claude Codex and OpenAI</a>'s code generation tools to write the plugins themselves signals something important: "This should be easy enough that an AI can help you do it." That's a pretty high bar for usability.

## The Model Question

The piece that genuinely surprised me was how capable open weight models are becoming at this specific task. Datasette Agent needs solid tool calling semantics and the ability to generate valid SQL queries. That's a combination that narrows things down considerably. Yet apparently gemma-4-26b-a4b, running locally in LM Studio, handles it without issues.

This is the kind of development that doesn't make headlines because it's incremental, but the compounding effect is huge. Six months ago, asking a local model to write SQL queries would be a dice roll. Now it's workable. A year from now, it might be boring.

The live demo running against agent.datasette.io using Gemini 3.1 Flash-Lite is the pragmatic choice. Fast, cheap, reliable. But the fact that you can also run this against local models opens up possibilities for folks who care about data privacy or want to avoid external API calls entirely.

## Building Personal AI Around Your Data

The most intriguing bit in the announcement is almost a throwaway: Simon's planning to build Claw, a personal AI assistant around data imported from different parts of his digital life. That's using Datasette Agent as the foundation for something much more ambitious.

This is the kind of thing that sounds niche until you think about what it actually means. Most AI assistants today work against general knowledge or whatever documents you upload to them. But what if your assistant was specifically trained to understand your actual data? Your blog archives, your notes, your observations, your digital history. Not through fine-tuning, but through actual access to the structured data you've collected.

The pelican sighting example from the announcement is weirdly perfect for illustrating this. Simon can ask his assistant "what was the most recent pelican sighting" and get an actual answer because the data lives in Datasette. The assistant isn't guessing or hallucinating. It's querying your database.

## Implications for the LLM Ecosystem

The fact that this is already informing the major LLM 0.32a0 refactor tells you something about the feedback loop happening here. Tools like this don't just use the underlying libraries, they stress test them, reveal missing abstractions, and force you to confront what patterns actually matter.

It sounds like agent-specific abstractions might make their way into the LLM library itself. That's significant because it means this experiment isn't just a cool project, it's a data point that will shape how people think about building <a href="https://mgks.dev/tags/artificial-intelligence/">AI systems</a> in Python.

Datasette Cloud users will eventually get access to this as well, which means it's not staying relegated to the open source corner. There's a real product path here.

The #datasette-agent Discord channel already exists for people who want to dig deeper. That's where the real experimentation will happen. Someone's going to build something with this that nobody anticipated, and that's when you'll know the platform design actually succeeded.

The question I keep coming back to isn't "is this cool?" It obviously is. It's "what gets unlocked when thousands of people have a conversational interface to their own data, built on open source tools?" That's the thought that keeps me up.