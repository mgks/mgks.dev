---
title: "Building an Emoji List Generator Live: What GitHub's Rubber Duck Thursday Taught Me About AI-Powered Development"
description: "A live coding session reveals how GitHub Copilot CLI and multi-model AI workflows are changing how we build small tools. Here's what actually happened."
date: 2026-04-19 00:00:54 +0530
tags: rollup, open source, artificial intelligence, github, developer tools
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=1674&w=1674'
featured: false
---

I've been watching GitHub's Rubber Duck Thursday streams on and off for a while now, but this week's episode caught my attention in a way that previous ones hadn't. The team built an emoji list generator using the GitHub Copilot CLI, and what struck me wasn't the tool itself but rather how the development process unfolded. It's one thing to read about [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) in development workflows. It's another to see it happen in real time with all the messy, human decision-making that comes with it.

The problem they were solving is almost comically simple: taking a boring list and turning it into one of those perfectly formatted emoji-prefixed social media posts you see everywhere. You know the ones. But the interesting part wasn't the what, it was the how.

## Planning Mode Is Where Things Get Interesting

They started with GitHub Copilot CLI's planning mode. Here's where I think a lot of people misunderstand what modern [AI development tools](https://mgks.dev/tags/artificial-intelligence/) actually do. It's not magic code generation that spits out perfect solutions. It's more like having a really good rubber duck that asks you questions you should have thought of yourself.

The CLI asked clarifying questions about tech stack choices and library preferences. Someone in the chat suggested OpenTUI, and that became part of the plan. This is the collaborative loop that actually matters. The AI isn't replacing the developer or the community, it's facilitating a conversation that leads to better architectural decisions faster.

They ended up with a plan.md file. Just a markdown file laying out the approach. Nothing revolutionary, but also nothing you'd typically formalize for a throwaway stream project. That's the subtle shift I keep noticing with these tools. They make good practices feel less like overhead and more like natural workflow.

## The Multi-Model Reality

Here's where it gets technically interesting. They didn't just use one model. They used Claude Opus 4.7 for implementation after planning with Copilot. This multi-model workflow isn't something most articles talk about because it complicates the narrative of "just use X tool and everything works."

In reality, different models are good at different things. Planning and asking clarifying questions? That's one skill set. Actually generating working code that follows specific patterns? That's another. The ability to switch between them in a single workflow without context switching between entirely different tools is where the actual productivity gain lives.

The project used OpenTUI for the terminal interface, the GitHub Copilot SDK for the AI components, and clipboardy for clipboard access. Standard Node.js stuff, but orchestrated through a combination of AI planning and human decision-making.

## What Actually Ships

They built a terminal app where you paste a list, hit Ctrl+S, and get an emoji-ified version on your clipboard. The whole thing probably took under an hour from concept to working prototype. That's genuinely impressive, but not because AI wrote all the code. It's impressive because the friction between "I have an idea" and "I have a working thing" has collapsed to almost nothing.

The allow-all tools flag and the [GitHub](https://mgks.dev/tags/github/) MCP server integration meant the CLI had access to everything it needed without manual configuration. This is the kind of developer experience refinement that matters more than raw code generation capabilities. When tools work together without you having to write glue code or authentication layers, you actually ship things instead of just thinking about shipping them.

## The Open Source Angle

They open sourced the emoji list generator immediately. It's on GitHub for anyone to fork, modify, or ignore. This is what healthy open source looks like in 2026. Not everything needs to be a major framework or library. Sometimes it's just a useful script someone made on a Thursday stream that solves a tiny problem you didn't know you had.

The real value isn't in the specific emoji generator. It's in having a working example of how to combine OpenTUI with the Copilot SDK and clipboard libraries in a way that actually works. That's documentation you can run and modify, which beats written docs every time.

What strikes me most about this whole thing is how unremarkable it's starting to feel to build small tools with AI assistance, and that's exactly when technology becomes truly useful.