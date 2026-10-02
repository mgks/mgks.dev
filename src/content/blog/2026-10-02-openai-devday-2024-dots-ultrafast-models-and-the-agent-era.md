---
title: "OpenAI DevDay 2024: Dots, Ultrafast Models, and the Agent Era"
description: "Live coverage of OpenAI's keynote announcing Dots personal agents, GPT-6.1 Sol, Ultrafast inference, and ChatGPT Sites at DevDay 2024."
date: 2026-10-02 12:00:21 +0530
tags: rollup, engineering, openai, ai-agents, developer-tools
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

I'm live blogging from OpenAI DevDay in San Francisco, and today's announcements signal a fundamental shift in how we'll work with AI over the next year. The theme is clear: from chatbots to agents, from one-off queries to persistent, delegable intelligence.

## Dots: Personal Agents You Actually Trust

The headline product is Dots, personal AI agents with cute blob avatars that you name and gradually delegate responsibility to. I had my suspicions when Sam showed the early demo - it looked very similar to Meta's Muse agent. But watching Holly demo "Dottie" handling Slack messages, spawning tasks in ChatGPT Spaces, and building apps in the iOS Simulator made something click: this isn't just another agent interface. It's OpenAI's answer to the fundamental question of "how do we make AI systems people actually feel comfortable depending on?"

Sam called Astra "our most aligned model," and that language matters. The entire pitch for Dots is calibrated around trust and delegation. You control how much responsibility you give your agent, and it learns your patterns. The fact that Dots get their own identities in Slack - showing up as team members - is a subtle but important detail about normalizing AI as a collaborating entity rather than a tool.

They're also launching ChatGPT Spaces, which look like shared artifacts with a Notion-style interface. Teams collaborate with their Dots directly here. This is clearly OpenAI's response to Claude Teams, and it positions agents not as solitary helpers but as members of distributed teams.

## The Model Stack Gets Faster and Cheaper

GPT-6.1 Sol is here, positioned as "near-Astra level intelligence at a fifth of the price." That's the developer story everyone wanted to hear. But the real differentiator is Ultrafast: 8x faster than standard models, up to 300 tokens per second, available for both Astra and Sol.

This matters because speed unlocks new use cases. Real-time interactive agents, responsive UIs, streaming workflows that don't feel glacial. Yes, Ultrafast costs 6x more than standard inference, but Sam's casual "you know what, it's worth it" suggests OpenAI has already done the math on when that trade-off makes sense.

They're also launching a Decisions API that lets models respond in milliseconds by choosing from a predefined set of options. This is fascinating because it's a direct response to products like Jev that launched on the stealth circuit just two weeks ago. OpenAI's moving fast when they see a gap.

## Computer Use Gets Better, Actually

Tejal Patwardhan demonstrated something that won't get as much attention but matters enormously: they used their own models to optimize their Computer Use harness, achieving a 2x latency improvement. More importantly, models are "much less likely to make mistakes while navigating desktop and browser."

I've [written about computer use agents before](https://mgks.dev/tags/ai-agents/), and the reliability problem has always been the sticking point. If Astra can actually navigate your desktop without hallucinating clicks, that changes everything about what's possible with [autonomous workflows](https://mgks.dev/tags/developer-tools/).

## Security as a First-Class Feature

The Codex Security session was surprisingly gripping. OpenAI's internal security sprint fixed 53 critical findings on day one, and they're now surfacing those lessons through automated scanning, patch generation, and verification. The 1% rollback rate on auto-generated patches is genuinely impressive.

What matters here is the philosophical shift: they're not just giving you a security scanner. They're giving you an adversarial agent (verify-fix) that challenges proposed patches. That's the kind of automation that scales security practices to teams that don't have dedicated security engineers.

## The Distribution Question

Sign in with ChatGPT is finally launching. This has been the missing piece - let users authenticate with ChatGPT and use their existing subscription tokens in third-party apps. I've wanted this for years, and its absence always felt like a missed opportunity.

Combine this with ChatGPT Sites (8 million already hosted, 70% of OpenAI employees building with it), Plugin Extensions, and the new OpenAI Marketplace, and you see a platform being built in real time. The question is whether this can meaningfully compete with Claude's ecosystem momentum, or whether OpenAI's distribution advantage through ChatGPT's massive user base is just too large to overcome.

What strikes me most is the confidence in the demos. Romain's live coding with Ultrafast, the GPT-Live agent moderating an entire panel, the Codex Remote building for iPhone - these work because the underlying models are just getting better at the hard parts. That reliability, more than any single feature, is what will determine whether these tools become infrastructure or novelties.