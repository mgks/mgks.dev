---
title: "LLM 0.32: When a CLI Tool Becomes an Agent Platform"
description: "Major LLM release adds reasoning traces, server-side tools, and content-addressable logging. What this means for building AI systems."
date: 2026-08-06 00:00:50 +0530
tags: rollup, engineering, llm, ai-agents, developer-tools
image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720"
featured: false
---

I released LLM 0.32 this morning, and honestly, it feels like a turning point for the project. This isn't just a feature drop - it's a fundamental rethinking of what an LLM interface should be when you're building anything more ambitious than simple prompt-and-response workflows.

The headline features are solid: visible reasoning traces, server-side provider tools, content-addressable SQLite logs, and support for new models. But what strikes me more is how these changes converge to make LLM look increasingly "agent-shaped," as I've started calling it.

## Reasoning and Transparency

When you run LLM against reasoning models now, their thinking traces automatically stream to standard error while the actual output goes to stdout. This is deceptively elegant. You get visibility into the model's reasoning process without polluting the output you might pipe to another tool. It's the kind of design decision that feels obvious in hindsight but requires thinking carefully about Unix principles and how AI systems actually work in practice.

The `-R` flag lets you hide reasoning when you don't need it. This matters more than it sounds - in production systems, you often want clean output, but in development you want every bit of insight you can get. Having that toggle baked in from the start is the right call.

## The Tool Ecosystem Shift

What's genuinely exciting is server-side tools. LLM now supports tools from different providers - OpenAI's code execution environment, Anthropic's WebSearch, WebFetch, and CodeExecution. Through the new AnthropicMCP integration, you can even chain tools from my datasette-mcp plugin as part of a single API call.

This matters because it means you're not stuck choosing between "use this model with these tools" or "use that model with those tools." The tool ecosystem becomes composable. A developer can now mix OpenAI models with Anthropic's web search capabilities, throw in code execution, and query a Datasette instance - all as part of one logical workflow.

That's the kind of flexibility that was theoretically possible before but required significant plumbing. Now it's a natural extension of how LLM works.

## API Changes That Reflect Reality

I want to highlight the Python API changes because they're philosophically important. Previously, LLM forced you into a conversation abstraction - create a conversation, send messages one at a time. It was trying to hide how LLMs actually work: each request carries the complete history of all previous messages.

With 0.32, you can now pass `model.prompt(messages=[])` directly, acknowledging the reality of how these systems function. The old abstraction wasn't wrong - it was just incomplete for advanced use cases.

Similarly, the Response object now gives you access to the full complexity of what modern models return: reasoning text, output strings, tool calls, image attachments, all mixed together. The CLI now displays this intelligently. In code, you can inspect the structure and build on it.

This is what happens when a tool evolves from "run a prompt, get text back" to "orchestrate complex interactions with various models and tools." The API has to reflect that complexity.

## Logging Gets Smarter

The content-addressable message store is quietly one of the best design decisions here. Modeled after Git, it avoids logging duplicate JSON on every turn of a conversation. Instead, messages are hashed and stored once, with references building the history. The `llm logs` command handles the conversion transparently.

For anyone building systems like [Datasette Agent](https://mgks.dev/tags/datasette/), this matters enormously. You can pause tool chains for human approval and resume from stored message history - both critical for production agent systems - without exploding your database with redundant data.

## The Agent Question

I've been deliberately vague about "agents" until recently. The term was too undefined. But "An LLM agent runs tools in a loop to achieve a goal" is now well-established enough that I can stop dancing around it.

Looking at LLM today, it's becoming an agent platform almost by accident. The CLI lets you mix models, tools, and [reasoning capabilities](https://mgks.dev/tags/ai-agents/) into one-liners. The Python library is powerful enough to build systems like llm-coding-agent. Tool execution, approval workflows, and persistent message history all Just Work.

The next question - maybe for 0.33 - is whether to explicitly bake "agent" abstractions into the core library. What would that look like? How do you design a CLI and Python API that makes building agents feel as natural as running a single prompt?

I'm still figuring that out, but I'm genuinely excited about the possibilities.

When a tool starts looking agent-shaped without you explicitly designing it that way, what does that tell you about where the industry is heading?