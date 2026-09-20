---
title: "Running Routes and Lost Code: Why LLM Transparency Matters"
description: "ChatGPT created perfect running routes using OSM data, but the actual code vanished. Why LLM systems need better transparency and code preservation."
date: 2026-09-20 12:00:22 +0530
tags: rollup, engineering, llm-transparency, ai-tooling, openstreetmap
image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720"
featured: false
---

I asked ChatGPT Work with GPT-6 Astra to do something delightfully specific this morning: figure out 5K and 10K running routes looping from my house using OpenStreetMap data. Twenty-seven minutes later, I had exactly what I requested - beautiful embedded visualizations and downloadable GPX and GeoJSON files. It worked flawlessly.

Then I asked the obvious follow-up: how did you actually do this?

The response was immediate and transparent: "I used Nominatim to locate the address and Overpass to download local OpenStreetMap roads and trails, then calculated the loops locally." Clear. Direct. Exactly the kind of answer that makes you feel like you understand what the AI just did.

But here's where it falls apart.

## The Transparency Gap

When I asked for the actual Python code it had written, ChatGPT couldn't provide it. The thread had been compacted by the system, and the pre-compacted content was no longer accessible to me. I could see the results. I could see the methodology described in natural language. But I couldn't see the actual implementation.

This is an anti-feature masquerading as an optimization.

I understand why LLM systems use context compaction - token budgets are real, and efficiency matters. But the moment you compress a conversation thread, you're destroying valuable artifacts that users might need later. In my case, I wanted to understand the specific implementation details, potentially reuse or modify the approach, or simply verify what the AI actually did versus what it claimed to do.

There's a deeper trust issue here. When I can see working code, I can audit it. I can check whether the routing algorithm makes sense, whether it's actually using the OSM data correctly, whether there are edge cases it might have missed. When all I have is a description and results, I'm operating on faith.

## What Needs to Change

Any LLM system that uses compaction should preserve the pre-compacted text and make it available through agent tool calls. This doesn't require storing infinite context forever - it means keeping a record that users can explicitly request.

Imagine a simple API: `retrieve_compacted_context()` or a UI button labeled "Show Original Conversation." Users could access the full, uncompressed version of any past thread. This would transform compaction from a user-invisible cost-saving measure into a transparent optimization that preserves accountability.

The technical implementation isn't complex. Version the conversation state before and after compaction, store both, and expose retrieval through the same interface where other tools operate. It's an architectural choice, not a technical impossibility.

## The Visualization Success

On the bright side, the map visualization worked beautifully. ChatGPT created an HTML file called `/workspace/el-granada-5k-share.html` that embedded directly into the ChatGPT UI using the visualize skill. The file contained a `<script type="application/json">` element with full geometry data, rendered with D3 from an allow-listed CDN.

This is what good AI integration looks like. I could see my routes, interact with the map, understand spatially what the AI had created. That's powerful. But it also highlights the contrast - if the visualization could be so transparent and interactive, why couldn't the underlying code be equally accessible?

The fact that I could download GPX and GeoJSON files means I could theoretically reverse-engineer what happened by analyzing the geometry. But that's a workaround, not a solution.

## What This Means for Developers

If you're building with LLM agents that do complex work, this matters to you. You're going to want to inspect what your AI systems actually did, not just what they claim to do. As these systems handle more consequential tasks - from infrastructure automation to data analysis to code generation - the audit trail becomes critical.

Relying on [ai-agent](https://mgks.dev/tags/ai-agent/) systems that hide their working is appealing until it isn't. The moment something goes wrong, or you need to understand why a particular output was produced, you'll wish you had access to the actual implementation.

This is also a signal about how we should design LLM-based tools more broadly. Transparency isn't just nice to have - it's foundational to trust. Systems that work hard to show you their reasoning, their code, their data sources, and their methods are systems worth relying on.

The running routes were perfect, the visualization was elegant, and the integration was seamless. But the lost code taught me something more valuable: in a world of increasingly powerful AI agents, the ones worth using are the ones that refuse to hide what they're actually doing.