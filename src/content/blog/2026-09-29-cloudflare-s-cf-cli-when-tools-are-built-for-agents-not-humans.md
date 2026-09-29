---
title: "Cloudflare's cf CLI: When Tools Are Built for Agents, Not Humans"
description: "Cloudflare's new cf CLI expands from 280 to 3000+ operations and prioritizes agent usability over human workflows. What does this mean for the future of developer tools?"
date: 2026-09-29 18:00:20 +0530
tags: rollup, cloud, ai-agents, developer-tools, cloudflare
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
featured: false
---

I've been watching the shift toward agentic development with a mix of fascination and concern. Cloudflare's new cf CLI is a watershed moment because it explicitly acknowledges something we've all been circling around: the primary user of a developer tool might not be a human anymore.

The numbers tell the story. A year ago, agents represented single-digit percentages of Wrangler usage. By March 2026, that hit 25%. Last week it crossed 48%. Agents are also more prolific, using almost twice as many distinct commands daily and four times more likely to chain six or more commands together. This isn't a rounding error in the user base anymore - it's becoming the majority.

But here's where Cloudflare had a real problem: Wrangler only exposed around 280 operations out of Cloudflare's thousands available through the API. Agents were hitting walls constantly, forced to either give up on tasks or operate through workarounds. The company realized that patching Wrangler incrementally would mean fighting against years of LLM training data, documentation, and learned behavior. The cleaner path was to build something new from the ground up.

Enter cf - and the thinking behind it fascinates me.

## JSON First, Humans Second

Most CLIs treat human readability as gospel. Tables, colored output, carefully formatted text designed for eyes scanning a terminal. But when agents use Wrangler, they immediately append --json and pipe everything through jq. Some commands didn't even support JSON output, forcing agents to parse unicode tables - technically possible but token-expensive.

Cf inverts this. JSON is the default. Humans sit one layer back, asking agents to filter results and return them in whatever format is useful. This is philosophically interesting because it's honest: if agents are the primary user, why pretend otherwise?

That said, cf includes interactive forms for complex operations like domain purchases. The tool acknowledges that some workflows still need human judgment, but it doesn't force agents through that path unless necessary.

## The Discovery Problem

With 3,000+ possible operations, how does an agent find what it needs without hallucinating or bloating context windows? Cloudflare added `cf cli search` - a natural language command discovery tool that lets agents ask "how do I set up a worker with a database?" and get back relevant operations based on API descriptions.

This is the kind of infrastructure that should become standard. Most existing CLIs force agents to read help text or fallback to training data. Having a built-in semantic search that works with the tool's own schema eliminates that friction.

## TypeScript Config as Developer Platform

The move from TOML to TypeScript configuration is the least obvious but possibly most significant change. Yes, TypeScript is easier for both humans and agents to parse. But more importantly, it's programmatic.

Cloudflare showed examples of Wrangler configs that went from over 5,000 lines to a fraction of that by defining environments programmatically rather than through copy-paste duplication. Agents can read TypeScript config files, understand them without additional context, and importantly, LSP plugins give them real-time feedback about what's possible.

This matters for [developer experience](/tags/developer-tools/) because it shifts configuration from declarative copy-paste to intentional code. The config becomes something you can actually reason about and refactor.

## Building on Vite

Moving from Wrangler's custom esbuild integration to Vite is another signal about where Cloudflare sees the future. Vite has a thriving ecosystem. Agents can leverage existing Vite plugins. The dev server gets hot module replacement for free. This isn't just better for human developers - it's better for agent-driven development because there's less custom Cloudflare infrastructure to understand.

For Workers that still need the old approach, cf delegates back to Wrangler. That's pragmatic, but the default path is clearly forward.

## What This Means for the Industry

I think we're looking at the early stages of a fundamental split in how developer tools get designed. Tools built for [ai-agents](/tags/ai-agents/) prioritize different things than tools built for humans: consistent schemas over clever interfaces, semantic discoverability over documentation, programmatic configuration over YAML hierarchy.

Cloudflare is positioning itself ahead of that curve. When the Wrangler maintenance window ends in 18 months, there will likely be plenty of resistance. But the company has correctly recognized that fighting against the shift toward agentic development is a losing battle.

The question isn't whether agents will be the primary consumer of CLIs - the data says that's already happening. The question is whether tool makers will design for them explicitly, or continue pretending they're building for humans and hope agents figure it out anyway.

Cf chooses the former path. And if other tool vendors don't follow suit, their users will eventually abandon them for ones that do.