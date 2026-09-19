---
title: "ChatGPT Work Generated Running Routes, Then Lost The Code"
description: "GPT-6 created GPS routes from my address using OSM data, but the actual code disappeared after thread compaction. What this reveals about LLM transparency."
date: 2026-09-19 18:00:22 +0530
tags: rollup, engineering, llm-transparency, gpt-6, developer-tools
image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=2070"
featured: false
---

I asked ChatGPT Work with GPT-6 Astra (Max) to generate 5K and 10K running routes from my house this morning. Twenty-seven minutes later, I had exactly what I requested: two looping routes as both embedded visualizations and downloadable GPX/GeoJSON files. It was genuinely impressive work. Then I discovered the system had already discarded the code it used to build them.

When I asked how it had accomplished the task, the model explained it used Nominatim to geocode my address, Overpass to pull OpenStreetMap data, and then calculated the loops locally. Clean, elegant approach. Naturally, I wanted to see and understand the actual Python code. By the time I thought to request it, the ChatGPT UI had compacted the conversation thread, and the code was gone for good. The model couldn't retrieve it anymore.

This matters because it's becoming an anti-feature in production AI systems.

## The Transparency Problem in Agentic LLMs

The lack of visible code execution is something I've written about before on [developer tooling trends](https://mgks.dev/tags/developer-tools/), but thread compaction takes it further. When an LLM spends 27 minutes reasoning and calling tools to solve a problem, that computational context is valuable intellectual property for understanding *how* the solution was derived. It's reproducibility. It's debugging. It's learning.

But when a system compacts threads to save token context, all that intermediate reasoning vanishes. The model only retains a summarized version of what happened. You get the artifact (the GPX file, the visualization), but the *process* is lost. For a one-off task like generating running routes, this is annoying. For production systems where developers need to understand or audit what happened, this is a liability.

The visualization itself was handled through something called the "visualize skill," which created an HTML file that embedded D3.js from a CDN and included the full route geometry in a JSON script tag. That part worked transparently enough - I could inspect the HTML and understand how the map rendering worked. But the routing algorithm? The logic that decided which streets to include? That's black box.

## What Developers Actually Need

If I'm going to rely on LLM agents for complex tasks, I need guarantees about transparency and reproducibility. This means a few things:

First, any system using thread compaction should preserve the pre-compacted text somewhere. Don't delete it from the context window, sure, but store it. Second, that archived context should be accessible via agent tool calls or an explicit retrieval mechanism. If I ask the model for the code it ran, it should be able to reconstruct it from that archive, even if the current thread has been compacted.

Third, intermediate outputs should be logged. Every tool call, every response from Nominatim, every Overpass query, every intermediate calculation - this should exist somewhere I can retrieve it later. Not necessarily exposed by default, but available.

Without this, I'm essentially trusting that the system works without being able to verify or understand what it did. That's fine for consumer applications, but it's unacceptable for [AI systems](https://mgks.dev/tags/llm-transparency/) in any kind of professional or critical context.

## The Bigger Picture

What I experienced was a capability window. For about 27 minutes, GPT-6 had access to tools and reasoning space that produced something genuinely useful. Then the UI compacted away the evidence of that work, leaving me with only the output. This is a design flaw that will become more glaring as people start using these systems for actual production work.

The running routes themselves were great - I got valid, loopable paths that look sensible on a map. But I have no way to verify the routing logic was sound, or to understand what assumptions the model made, or to reproduce the process if I wanted variations. And I definitely can't audit it if something went wrong.

LLM systems that hide their reasoning and discard their work are impressive demos but terrible infrastructure. If you're building tools that others will depend on, transparency isn't optional, and neither is preserving the context of what those tools did. The fact that this happened automatically and silently, without my explicit request to compress the thread, is the real problem here.

How many other critical decisions are being made by AI systems right now where nobody will ever see the working?