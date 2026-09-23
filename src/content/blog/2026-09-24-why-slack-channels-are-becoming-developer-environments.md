---
title: "Why Slack Channels Are Becoming Developer Environments"
description: "Slack's Code Channels feature breaks down silos between developers and AI agents, merging code writing and review into a single collaborative space."
date: 2026-09-24 00:00:20 +0530
tags: rollup, software-engineering, ai-development, team-collaboration, coding-tools
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

I've been thinking a lot about where we actually write code these days, and it's not where most of us think it is. We open terminals, fire up VS Code, and treat that as the canonical development environment. But Rob Seaman from Slack has a provocative point: what if a Slack channel could be a better place to develop than your local machine?

This isn't about replacing your IDE. It's about recognizing that code isn't written in isolation anymore, and the tools we've built around "local development" haven't caught up to how teams actually work.

## The Multiplayer Problem Nobody's Solved

When you spin up an AI coding agent today, something happens that feels productive but deeply problematic: the context becomes siloed. You ask Claude or Copilot to write a function, it generates code, you copy it into your editor, you test it alone, and then you open a PR for review. That's three separate contexts, three separate conversations.

Ryan and Rob discuss something crucial here that I think the industry is starting to feel but hasn't articulated well: what if the agent, the developer, and the reviewer were all in the same room from the start?

Code Channels does this by making AI coding a party chat experience. A developer writes a prompt, the AI agent responds with code, and the team can discuss, iterate, and review in real-time without context switching. Suddenly, code review isn't a gatekeeping step that happens after the fact. It's a collaborative process that flattens the entire workflow.

## Why This Matters for How Teams Scale

I've worked on enough teams to know the pattern: junior developers struggle because context is fragmented. They write code locally, get feedback in a PR three days later, misunderstand the comments, and the cycle repeats. Meanwhile, senior developers are constantly jumping between terminals, Slack, GitHub, and Jira just to stay synchronized.

Code Channels removes that friction. When an AI agent is writing code *in* the Slack channel where your team communicates, the institutional knowledge lives there too. Senior developers see it happening and can coach in real-time. Juniors learn by watching. Design decisions get debated before they're baked into the codebase.

There's also something deeper here about [how developers learn and grow](https://mgks.dev/tags/team-collaboration). The article Rob mentioned, "Learning on the shop floor," hints at this: we learn best when we can see how decisions are made, not just see the final output. A Slack channel creates that visibility in a way a terminal never could.

## The Terminal Was Never That Great Anyway

Let me be direct: the terminal is an artifact. We use it because we've always used it, and because many of the tasks it handles require something low-level and scriptable. But for collaborative coding? For the actual process of writing, reviewing, and shipping code together?

A terminal is the opposite of transparent. Your colleagues can't see what you're thinking. The AI agent can't see the context of your project. Code review becomes a forensic analysis of what someone else was thinking, not a real-time collaboration.

Slack, on the other hand, is where your team already lives. You've got channel history, you've got threading, you've got integrations with every tool your team uses. Adding an AI agent that can write code directly into that context isn't just convenient. It's systemically different.

## The Real Question

I think the question isn't whether Slack is a better development environment than a terminal. It's whether we're ready to admit that development hasn't been a solitary activity for years, and our tools should reflect that.

Code Channels suggests one answer. But I wonder what happens when this pattern scales to other aspects of development: debugging, testing, infrastructure, deployment. If Slack can be where your team writes code and reviews it together with AI agents in the loop, why stop there?

The future probably isn't "terminal vs. Slack." It's a [fully multiplayer development experience](https://mgks.dev/tags/ai-development) where context, collaboration, and automation are native to the environment from the start. The question is whether our tools and workflows are brave enough to get there.