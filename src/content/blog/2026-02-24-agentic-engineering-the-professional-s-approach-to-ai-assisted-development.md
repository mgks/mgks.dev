---
title: "Agentic Engineering: The Professional's Approach to AI-Assisted Development"
description: "Simon Willison's new project documents coding patterns for the emerging discipline where professional engineers use AI agents that generate, execute, and iterate on code."
date: 2026-02-24 00:00:12 +0530
tags: rollup, engineering, artificial-intelligence, coding-agents
image: 'https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070'
featured: false
---

Simon Willison is launching something I've been waiting for someone to formalize. He's calling it Agentic Engineering Patterns, and it's his attempt to document the actual practices that work when building software with coding agents like Claude Code and OpenAI Codex.

The distinction he's making matters. This isn't about "vibe coding" where you throw prompts at an [AI](https://mgks.dev/tags/artificial-intelligence/) and hope for the best. This is about professionals using tools that can both generate code AND execute it, creating a feedback loop that lets the agent test and iterate without constant hand-holding.

I've spent enough time with these tools to know that gap between theory and practice is massive. Everyone talks about AI-assisted programming like it's either magic or garbage, but the reality lives somewhere in the messy middle where actual patterns emerge if you pay attention.

## The Evolution from Prompts to Patterns

What Willison is documenting on his blog goes beyond the typical "here's how to use ChatGPT for coding" content that's flooded the internet. He's already got 345 posts under his ai-assisted-programming tag, but this new project aims to structure that knowledge into something systematic.

The format he's chosen is interesting. He's modeling it after the classic Gang of Four Design Patterns book from 1994, which means we're looking at chapter-shaped patterns that address specific problems with concrete solutions. Not blog posts that age poorly, but living documents that get updated as the field evolves.

He's calling this new format a "guide" with chapters that have less prominent dates and are designed to be maintained over time. It's his answer to the evergreen content problem that plagues technical blogs. You write something useful, it gets buried under newer posts, and six months later the information is half-stale but still ranking in search results.

## Why This Matters Now

The timing isn't arbitrary. We're at this weird inflection point where [coding agents](https://mgks.dev/tags/coding-agents/) have become genuinely useful but the collective knowledge about how to use them effectively is scattered across Twitter threads, Discord channels, and individual blog posts.

Willison's approach puts him at the professional engineer end of the spectrum, explicitly positioning this as expertise amplification rather than expertise replacement. That's the framing that gets lost in most discussions about AI and programming. The tools don't make non-programmers into engineers overnight, but they can make experienced engineers significantly more productive if used correctly.

What I appreciate is his transparency about the process. He's committing to publishing 1-2 chapters per week and maintaining his policy of not publishing AI-generated writing under his name. The [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) tools get used for proofreading and generating example code, but the actual insights and explanations are human.

## The Practical Reality

The fundamental shift with agentic engineering is that the feedback loop tightens dramatically. Traditional LLM coding assistance gives you code, you test it, you go back with errors, repeat. Agents that can execute code change that dynamic entirely. They can run their own tests, see their own failures, and iterate before you even look at the output.

But that autonomy creates new problems. How do you structure your prompts? What level of access should the agent have? When do you intervene versus letting it work through issues? These aren't questions with obvious answers, and they're exactly the kind of thing that benefits from documented patterns.

I'm curious to see which patterns emerge as foundational versus which ones turn out to be edge cases. The field is young enough that we're still figuring out basic vocabulary, let alone best practices.

The guide format Willison is using might prove more important than the specific patterns themselves, because it acknowledges something crucial: this stuff is going to keep changing, and our documentation needs to change with it rather than ossifying into outdated books.