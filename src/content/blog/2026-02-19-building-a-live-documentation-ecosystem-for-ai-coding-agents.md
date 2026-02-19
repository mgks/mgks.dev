---
title: "Building a Live Documentation Ecosystem for AI Coding Agents"
description: "Showboat's new remote streaming feature and companion tools create a real-time feedback loop for AI-assisted development workflows."
date: 2026-02-19 12:00:58 +0530
tags: rollup, engineering, ai, developer-tools, automation
image: 'https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232'
featured: false
---

I've been watching Simon Willison build Showboat over the past week, and what started as a simple CLI tool for generating Markdown documentation has evolved into something more interesting: a real-time streaming ecosystem for [AI](https://mgks.dev/tags/artificial-intelligence/) coding agents.

The core insight here is deceptively simple. When you're working with Claude Code or similar [AI coding assistants](https://mgks.dev/tags/ai/), you're often stuck waiting for the entire task to complete before you can see what the agent has built. It commits code, pushes to GitHub, and only then can you review the work. This creates an awkward feedback loop where you're essentially flying blind until the very end.

Showboat v0.6.0 changes this completely by adding what Willison calls a "remote" feature. Set an environment variable pointing to a web endpoint, and suddenly every command the agent runs (init, note, exec, image) streams its results to your server in real time. You can watch the documentation being built as the agent works, not after.

## The Power of Simple Conventions

What makes this ecosystem interesting isn't any single tool but how loosely coupled they are. Showboat doesn't care what generates an image, it just needs a file path. Chartroom wraps matplotlib to output PNG charts. Rodney does browser automation and captures screenshots. They all work together because they follow basic Unix philosophy: do one thing, output something useful, let other tools compose.

This is the opposite of the tightly integrated toolchain approach most development ecosystems push you toward. There's no plugin architecture, no official API contracts, just tools that output text and file paths. If you can write to stdout, you can participate.

The datasette-showboat plugin demonstrates this nicely. It's a simple Datasette plugin that adds two endpoints: one for viewing documents, one for receiving updates. That's it. The protocol is so straightforward (regular POST form variables, multipart uploads for images) that you could implement a receiver in any web framework in an afternoon.

## Why This Matters for AI Workflows

The real breakthrough here is the feedback loop. Willison mentions having Claude Code publish screenshots of work in progress, then providing feedback directly in the Claude session while it's still working. This is huge.

Most [AI-assisted development](https://mgks.dev/tags/artificial-intelligence/) tools treat the agent as a black box that runs to completion. You prompt, it generates, you review, you iterate. The latency kills momentum. Being able to see intermediate results and course-correct mid-flight fundamentally changes how you can use these tools.

Rodney, the browser automation tool, makes this even more powerful for web development. The agent can load pages, interact with them, capture screenshots, and embed everything in the Showboat document as it goes. You're not waiting for a deploy to see if the CSS changes worked, you're watching the agent test them in real time.

## The Chartroom Addition

Chartroom feels like the most "utility player" addition to the ecosystem. It's essentially a CLI wrapper around matplotlib that accepts data from CSV, TSV, JSON, or even direct SQLite queries. The interesting bit is the alt text generation for charts, which means agents can create accessible visualizations without you having to manually describe them later.

The implementation is straightforward but thoughtful. Multiple output formats (just the image, or HTML/Markdown with alt text embedded), support for matplotlib's various styles, standard input for piping data. It's clearly designed to be driven by agents that are following help text as their instruction manual.

That's actually a clever pattern Willison keeps using: make the `--help` output comprehensive enough that an AI can learn the tool from that alone. No need to stuff documentation into the agent's context window separately, just tell it to run help and figure it out.

## What Gets Built Next

The environment variable webhook mechanism is probably the most under-explored piece here. Right now it's just streaming Showboat documents to Datasette, but it's effectively a generic extension point. You could stream to Slack, trigger CI pipelines, update dashboards, whatever.

I'd expect to see more small, single-purpose tools built around this pattern. Something that generates diagrams, something that runs benchmarks and formats results, something that does API testing and captures requests/responses. As long as they output something Showboat can embed, they slot right in.

The whole thing feels very much like the early Unix pipeline renaissance, except the thing piping commands together is an AI agent instead of a shell script. The agent becomes the glue code, and your job shifts from writing integration logic to building composable primitives that agents can orchestrate.

It's a different way of thinking about tool design when your primary user is an AI that reads help text instead of a human who reads tutorials.