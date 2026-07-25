---
title: "Why AI Adoption Is Stalling: The Context Engineering Problem"
description: "The real bottleneck in AI adoption isn't capability, it's context. Michael Foree explains why connecting AI to your actual work is harder than it should be."
date: 2026-07-25 18:00:30 +0530
tags: rollup, software-engineering, ai, context-engineering, llm
image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720"
featured: false
---

Everyone's talking about AI being capable and smart, but there's a dirty secret nobody likes admitting: most AI tools are useless out of the box. Not because they can't think. Because they don't know anything about your actual work.

I've been watching this play out across the industry, and Michael Foree, Stack's Director of Data Science, put it perfectly in a recent conversation. The adoption bottleneck isn't about AI being dumb. It's about AI being disconnected.

Take something as simple as replying to an email. An LLM can absolutely understand language, generate coherent responses, and sound professional. What it can't do is understand who sent the email, what previous conversations you've had with them, what context clues are scattered across your Slack channels, or what actual priorities might make this email urgent.

So here's what actually happens: you copy-paste relevant information from five different places into your AI tool. It generates a response. You edit it. Back-and-forth a few times. Then you copy it into your email client. Then you hit send. You've basically tripled the work to use the AI "helper."

## The Real Cost of Context

This is where context engineering becomes the hidden tax on AI adoption. When Foree surveyed technical and non-technical professionals, the pattern was universal: AI is capable but disconnected.

For an AI to actually send an email autonomously, it needs:

- Access to the email thread
- Access to your historical emails with that person
- Access to related Slack conversations
- Access to project documentation
- Access to briefs, RFPs, or other relevant docs
- Permission to actually send the email

Each of these requires manual setup. You have to authenticate, grant permissions, and often configure which data to include. For something you might use once a day? The effort-to-benefit calculation doesn't work.

But this isn't just a user experience problem. There's a technical cost that scales with your data.

Every document, message, and email thread becomes "context" that the AI needs to process. That's tokens. That's latency. That's cost. When you multiply this across enterprise data volumes, you're burning significant compute just to give the AI enough information to not hallucinate completely.

Worse, LLMs get distracted by irrelevant information. Tell an AI, "Jump over this log," while mentioning blueberries nearby, and it'll probably try to include blueberries in its answer because the model learned to treat nearby information as contextually relevant. In a corporate setting with thousands of documents and messages, this distraction effect compounds.

Modern LLMs are getting better at filtering noise and asking clarifying questions, but they had to be specifically trained for that behavior. And even then, that training is on publicly available information.

## The Proprietary Information Problem

Here's where enterprise adoption really struggles: the most valuable context is proprietary.

OpenAI can't train GPT-5 on your company's internal documentation. They don't have access to it, and you don't want them to. But that means when you deploy an LLM internally, it doesn't understand your specific processes, your company jargon, your decision-making frameworks, or your actual constraints.

Some companies are trying to solve this with products like [Stack Internal](https://mgks.dev/tags/ai/), which acts as a knowledge connector. Instead of training LLMs on proprietary data, you create a layer that brings AI-generated answers together with human expertise. An AI can propose an answer, then an internal expert validates it against your actual procedures.

This is holy grail context engineering. It's the missing piece that big AI labs can't solve because they don't have access to your secrets.

The implication here is significant: [the future of enterprise AI](https://mgks.dev/tags/enterprise/) won't be about raw model capabilities. It'll be about integrations, permissions, validation layers, and the unglamorous work of connecting AI to your actual tools and data.

## What This Means for Developers

If you're building AI products or integrating AI into existing workflows, the technical challenges are only half the battle. The other half is context engineering.

You need to:

- Reduce setup friction (fewer authentication steps, sensible defaults)
- Handle irrelevant context gracefully (filtering, ranking, or asking for clarification)
- Build validation loops where humans can confirm AI outputs against proprietary knowledge
- Keep token costs reasonable across large datasets
- Design for incremental adoption (users shouldn't need full setup to see value)

The companies that crack this will own enterprise AI adoption. The ones that ignore context engineering will keep watching users spend more time setting up AI than using it.

The real question isn't whether AI can do the work. It's whether your product makes it easy enough that people actually want to do the integration work.