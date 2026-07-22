---
title: "How Anthropic Ships Features in the Age of Coding Agents"
description: "Cat Wu and Thariq Shihipar reveal how Anthropic's product team ships 10x faster with Claude Code and Claude Tag, and what that means for engineering priorities."
date: 2026-07-22 12:00:31 +0530
tags: rollup, engineering, ai-engineering, product-development, coding-agents
image: "https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070"
featured: false
---

I watched a fireside chat recently where Cat Wu and Thariq Shihipar from Anthropic's Claude Code team discussed something that's been nagging at me for months: now that we can build features in days instead of months, how do we decide what's actually worth building?

When Claude Code launched just over a year ago, it required babysitting. Cat remembers reading every permission prompt carefully, saying "no" repeatedly. Now? They've stepped back entirely. The shift freed them to think about what experiences they should build, rather than how to build them. With their newer Fable model, they're one-shotting entire features.

This is a massive psychological shift for engineering teams, and I think most of us haven't fully internalized it yet.

## The Death of the Six-Month PRD

Cat made an observation that hit me hard: two years ago, product managers would spend six months aligning on specs before writing a single line of code. Now that timeline has collapsed to a week. Sometimes a day.

This means the bottleneck isn't execution anymore. It's taste. It's judgment. It's knowing what's worth building in the first place.

I've written about [product thinking for engineers](https://mgks.dev/tags/product-development/) before, but this crystallizes why it matters so much now. When building costs nothing, you need developers who understand business fundamentals, customer problems, and what actually moves the needle. The "just ship it and see" mentality sounds great until you've shipped 50 mediocre features and your product feels like a junkyard.

Thariq mentioned something about this too: he's now pro-rewriting codebases. The old mythical man-month wisdom said never rewrite. But if a codebase is your only spec, and your coding agent can distill it or create variations, maybe rewriting becomes strategic. They rewrote Bun in Rust and shipped it live. The point isn't the rewrite itself, it's that the cost-benefit calculation changed.

## Claude Tag: The Multiplayer Layer

But here's where it gets interesting. Claude Code solves the individual developer problem. Claude Tag solves the team problem, and I think this is where most orgs will stumble.

Claude Tag lives in Slack. It's multiplayer by default. It's proactive, not reactive. You tell it "monitor bug reports and file PRs," and it does that forever without manual intervention. It remembers team preferences. Most importantly: it lands 65% of Anthropic's product engineering PRs.

65%. That's not a toy metric.

What fascinates me is how this changes code review. Thariq mentioned they use code owners for critical areas, but they're clearly not reviewing every line. Instead, they're relying on a combination of agent capability, evals, and having the right people watching the right things. It's a trust-but-verify approach, except the verify part is probabilistic rather than deterministic.

Thariq also mentioned non-engineers using Claude Tag to search internal Slack, query metrics, and even clone repositories to explain features to stakeholders. That's a different class of tool entirely. When marketing teams can ask Claude to explain what your code does, the boundaries of who participates in product development shift.

## How Do You Even Prioritize Now?

The hardest question I asked was about prioritization. Cat gave me something I can actually use: they dogfood everything internally first. They share with all of Anthropic, then early customers. They have an internal bar for user retention. If a feature doesn't hit that bar, it doesn't ship to the world.

This is smart because it's forcing a hard constraint where there should be one. Without it, you'd build forever. With it, you have a measuring stick.

One example: remote control for Claude Code. Cat didn't understand why anyone would use it. Turns out people love plugging in their laptops at night and controlling Claude Code from their couch. It shipped because it hit the internal retention bar, not because it made sense to leadership.

That feedback loop matters more now than it ever did, because you can iterate so fast that your intuition becomes dangerously unreliable.

## What This Means for Your Team

If you're leading engineers or making product decisions, the game has changed. The constraint moved from execution to judgment. You need people who understand why features matter, not just people who can build them fast.

Code review is evolving too. You can't review every line of [AI-generated code](https://mgks.dev/tags/ai-engineering/) the way you used to. You need smarter verification: evals, ownership models, retention metrics.

The question isn't anymore "can we build this feature?" It's "should we build it, and how will we know if it works?" The second question is harder, and it's the one that's going to separate good products from noise.