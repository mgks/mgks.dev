---
title: "LLMs Don't Actually Care About Your Tech Stack"
description: "Modern coding agents work surprisingly well with new tools and private codebases, challenging the assumption that they're biased toward mainstream tech."
date: 2026-03-11 12:00:34 +0530
tags: rollup, engineering, artificial-intelligence, llm
image: 'https://images.unsplash.com/photo-1680783954745-3249be59e527?q=80&w=1064'
featured: false
---

There's been this persistent worry in the developer community that [AI](https://mgks.dev/tags/artificial-intelligence/) coding assistants would push us all toward the same boring stack. The logic seemed sound: if these models are trained on millions of Python and JavaScript repositories, wouldn't they naturally steer every conversation toward React and Django? Wouldn't new languages and frameworks get left in the dust?

I shared that concern. Two years ago, it was absolutely true. Ask an [LLM](https://mgks.dev/tags/llm/) about Elixir or Nim and you'd get generic, often wrong responses. Ask about React and you'd get production-ready code.

But something fundamental has shifted with the latest generation of models and agent frameworks.

## Context Windows Changed Everything

I've been testing this extensively with my own tools, stuff that's so new it couldn't possibly be in any training data. My workflow now starts with something like "use uvx showboat --help to learn about this tool" and then watching the agent digest the documentation before writing a single line of code.

The context windows on these new models are massive. They can swallow entire documentation sites, reference implementations, and your existing codebase patterns all before they start generating solutions. This isn't the same as having that knowledge baked into the weights during training.

What's actually happening is closer to how a human developer would approach an unfamiliar codebase. You grep around, you read the existing patterns, you find similar examples and adapt them. The agent does this too, just faster and with less complaining.

## Private Codebases Work Fine

Drop one of these coding agents into a proprietary codebase that uses internal frameworks and custom tooling. My experience has been that it just works. The agent reads your existing code, identifies patterns, generates something similar, tests it, realizes it's wrong, and iterates.

There's no magical training data advantage here. It's using the same strategy it would use for any unfamiliar domain: read, pattern match, test, iterate.

I thought we'd end up in a world where "Choose Boring Technology" became an unspoken requirement for working with AI assistants. The reality is playing out differently. The technology choices I'm making aren't being influenced by what's popular in the training data at all.

## The Testing Loop Matters More

What seems to matter more than training data coverage is whether the agent can test its output. If it can run the code, see errors, and iterate, it figures things out. This works for new tools, old tools, weird tools, whatever.

The agent harnesses that include proper testing loops and error feedback are the ones producing good results with unfamiliar tech. The ones that just generate and pray still struggle, but that's a tooling problem, not a training data problem.

This doesn't mean the models are perfect with new technology. They're not. But the gap between "well represented in training data" and "completely novel" is much smaller than I expected it to be.

## What This Actually Means

The implication here is kind of wild. We might not be heading toward a monoculture of AI-friendly languages and frameworks after all. If the context window is large enough and the agent can test its work, the training data representation matters less than I thought.

You can still use that weird Rust web framework. You can still build internal tools with whatever makes sense for your problem. The AI will figure it out by reading your docs and examples.

This is probably good news for [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) progress in general. If agents can work effectively with novel tools and patterns, they're not going to calcify the industry around whatever was popular in 2023. New ideas can still break through.

I'm genuinely surprised by this. I expected the gravitational pull toward mainstream technology to be much stronger. Instead, what we're seeing is that given enough context and a feedback loop, these models are surprisingly adaptable to whatever you throw at them.

Maybe the real question isn't whether AI will bias us toward boring technology, but whether we'll use that freedom to finally try the interesting stuff we've been putting off.