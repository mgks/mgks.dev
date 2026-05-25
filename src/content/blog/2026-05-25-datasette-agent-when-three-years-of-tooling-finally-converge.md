---
title: "Datasette Agent: When Three Years of Tooling Finally Converge"
description: "How the intersection of LLM Python libraries and Datasette creates a new paradigm for conversational data exploration."
date: 2026-05-25 12:00:15 +0530
tags: rollup, engineering, datasette, ai
image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720'
featured: false
---

There's a particular satisfaction that comes from watching isolated pieces of infrastructure finally click together. I've been following Simon Willison's work on the LLM Python library for years now, watching it gradually mature from a CLI tool into something genuinely sophisticated. Datasette itself has been a marvel of database introspection and sharing for nearly as long. But seeing them converge into Datasette Agent? That's the kind of moment that makes you realize the ecosystem was always waiting for this.

The announcement of Datasette Agent's first release landed quietly but with significant weight. This isn't just another wrapper around an <a href="https://mgks.dev/tags/artificial-intelligence/">AI</a> model. This is a thoughtfully architected conversational interface that lets you ask questions of your data in natural language and get back actual answers, backed by SQL queries running against real databases.

## Why This Matters More Than It Seems

On the surface, Datasette Agent does something straightforward: you ask it a question, it generates SQL, it returns results. But the implications ripple outward.

For years, the gap between "I have data in a database" and "I can explore that data conversationally" required either hiring someone to write dashboards or spending weeks learning business intelligence tools. Datasette Agent collapses that gap. The live demo instance running against Simon's blog backup and the global power plants dataset shows this in practice. You're not clicking through menus. You're having a conversation.

The choice of Gemini 3.1 Flash-Lite for the demo instance is telling. It's cheap, it's fast, and it reliably produces valid SQLite queries. This isn't about throwing the fanciest model at the problem. It's about understanding that for tool use and <a href="https://mgks.dev/tags/sql/">SQL</a> generation, you don't need the most capable model. You need reliability and cost efficiency. That's a maturity I haven't seen often in <a href="https://mgks.dev/tags/open-ai/">AI</a> product design.

## The Plugin Architecture Is the Real Play

What genuinely excites me about this project is the extensibility. Datasette Agent isn't monolithic. You can add datasette-agent-charts and suddenly your conversational interface can generate visualizations. You can point Claude Code or OpenAI Codex at the datasette-agent repository and tell it what you want to build.

This is how you design for an ecosystem. Rather than trying to predict every use case, you provide the primitives and let developers run.

The mention of prototypes being tested against local models (like gemma-4-26b-a4b running in LM Studio) reveals something important about where open-weight models have landed. Six months ago, asking an open model to generate production SQLite queries felt optimistic. Now? It works. Not perfectly, but reliably enough that it's a genuine alternative to proprietary models for this specific task.

## The Broader Technical Implications

The LLM library is undergoing a major 0.32a0 refactor informed by Datasette Agent's architecture. This is Simon thinking through what abstractions emerge when you actually build something at scale with these tools. Those abstractions will feed back into the library itself. This is how good design iterates.

I'm particularly intrigued by the mention of Claude Artifacts-inspired plugins. The idea of a plugin that renders a specific kind of output in a structured way, separate from the core conversational flow, opens up interesting possibilities for how conversational interfaces can structure their responses.

And then there's the Claw project mentioned almost in passing. A personal AI assistant built around data imported from different parts of your digital life, powered by resurrecting the Dogsheep tools? That's the kind of personal infrastructure project that will probably teach us more about what conversational interfaces actually need than most commercial products ever will.

## Where Open-Source Meets Production Reality

What's worth noting is that this isn't just research or a proof of concept. Datasette Agent is shipping to Datasette Cloud users. It's running on real instances. It's generating real queries against real data.

That matters because it changes the conversation about what's possible with relatively simple tooling. You don't need a massive ML infrastructure team. You need clear thinking about how to decompose a problem and the ability to connect existing, well-designed pieces.

The plugin architecture combined with reliable tool calling creates something that feels less like a neat demo and more like an actual platform. Developers can build on top of this. They're already doing it informally based on the source checkout approach. Once the abstractions solidify, I'd expect to see a genuine ecosystem emerge.

The fact that this whole thing came together through iterating on open-source tools and libraries, rather than as a closed product, speaks to something deeper about how technology actually gets built well these days. You don't get here with a proprietary black box. You get here by thinking clearly about interfaces, learning from what users actually need, and being willing to have those learnings reshape your earlier work.

What happens next is probably more interesting than what just shipped.