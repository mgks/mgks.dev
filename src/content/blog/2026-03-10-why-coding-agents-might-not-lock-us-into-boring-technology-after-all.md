---
title: "Why Coding Agents Might Not Lock Us Into Boring Technology After All"
description: "Modern LLMs can learn new tools on the fly through documentation and examples. The feared training data bias might be less of an issue than we thought."
date: 2026-03-10 12:00:33 +0530
tags: rollup, engineering, artificial-intelligence, llm, developer-tools
image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720'
featured: false
---

I've been testing something that shouldn't work as well as it does. When I start working with brand new command-line tools I built, tools that literally didn't exist until a few weeks ago, I just tell the coding agent to run `--help` on them first. And it figures them out. Perfectly well, actually.

This goes against everything I expected about how [AI](https://mgks.dev/tags/artificial-intelligence/) coding assistants would shape our technology choices.

## The Training Data Trap That Wasn't

Two years ago, the concern seemed entirely reasonable. If you asked an [LLM](https://mgks.dev/tags/llm/) about Python or JavaScript, you'd get coherent, working code. Ask about something niche like Elm or a proprietary internal framework? You'd get confident hallucinations at best.

The logic was simple: these models learn from what exists on the internet. Popular tools have more Stack Overflow answers, more GitHub repositories, more blog posts. The feedback loop seemed inevitable. We'd all slowly converge on the same boring stack because that's what the AI knew best.

I definitely felt this pressure early on. Why experiment with that interesting new framework when ChatGPT barely understands it? Better stick with React, right?

## Context Windows Changed Everything

But something shifted with the latest generation of models. The context windows got long enough that you can just dump documentation into them. Not summaries. Not carefully curated examples. The actual docs.

When I work with my own tools like uvx, showboat, rodney, or chartroom, I start every session the same way. I tell the agent to run the help commands. It reads the output. Then it just... works. It understands the flags, the subcommands, the patterns.

The agent doesn't need these tools to be in its training data because it can learn them right there in the conversation. The knowledge doesn't need to be baked in during training anymore.

## Private Codebases Work Fine Too

Drop a [coding agent](https://mgks.dev/tags/developer-tools/) into any reasonably documented codebase and watch what happens. It'll grep around for examples. It'll read the existing code to understand patterns. It'll test its own output and iterate when something breaks.

I've done this with internal company tools that will never be public. Tools that use custom DSLs and weird architectural patterns specific to one organization. The agent doesn't care. It treats learning the codebase like any other problem to solve through exploration and testing.

This iterative approach matters more than I initially realized. The agent doesn't need to get it right the first time if it can rapidly test and refine. Training data gives you better first attempts, sure, but if you can do fifty attempts in a minute, the quality of attempt number one matters less.

## Not Boring Technology After All

I genuinely thought we were heading toward a future where "Choose Boring Technology" would become the default not because of careful architectural thinking, but because the AI tools would simply work better with boring choices. A kind of technological monoculture driven by training data availability.

That's not what I'm seeing in practice. I'm not changing my technology choices to accommodate the limitations of coding agents. They're adapting to whatever I throw at them.

The interesting question now is whether this cuts both ways. If coding agents remove the barrier to adopting new tools, does that actually accelerate innovation? Or do we still have other forces pushing us toward standardization?

Maybe the real constraint was never going to be what the AI knows, but what we as humans have the energy to learn and maintain.