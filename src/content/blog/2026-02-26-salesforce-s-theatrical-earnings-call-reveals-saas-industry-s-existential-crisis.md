---
title: "Salesforce's Theatrical Earnings Call Reveals SaaS Industry's Existential Crisis"
description: "Benioff's leather jacket and customer testimonials can't hide the fundamental question: will AI agents make per-seat SaaS licensing obsolete?"
date: 2026-02-26 12:00:10 +0530
tags: rollup, artificial intelligence, saas, enterprise-software
image: 'https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070'
featured: false
---

I've sat through dozens of earnings calls, but Salesforce's Q4 2025 performance was something else entirely. Marc Benioff showed up in a leather jacket, ran customer testimonials like an infomercial, and said "SaaSpocalypse" six times. This wasn't a normal earnings call. This was a company in full-blown panic mode trying very hard not to look like it's panicking.

The numbers themselves were fine. Revenue of $10.7 billion, up 13% year-over-year. But numbers don't matter when investors are having an existential crisis about your entire business model. The [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) agent revolution has Wall Street convinced that the per-seat SaaS licensing model is about to become as relevant as selling encyclopedia sets door-to-door.

## The Real Question Everyone's Avoiding

Here's what's actually happening: AI agents don't need user interfaces. They don't need seats. They don't need to be "per employee." An agent can do the work of ten employees but only needs API access and compute. So if your entire business model is built around charging $150/month per user seat, and suddenly companies need 90% fewer seats because agents are doing the work, well, you see the problem.

Salesforce knows this. That's why they invented "agentic work units" or AWU. It's a new metric designed to show value beyond just counting tokens. The idea is to measure when an agent actually completes a task, like writing to a database record or finishing a workflow. On the surface, this sounds reasonable. Counting tokens is a bit like measuring programmer productivity by lines of code written.

But I'm skeptical. This feels like inventing a new scoreboard when you're losing at the old game. AWU gives Salesforce control over how we measure their AI success, conveniently right when traditional SaaS metrics start looking scary.

## Architecture Wars and the Battle for the Stack

The most revealing moment came when Salesforce presented their vision of the future tech stack. In their diagram, SaaS platforms like Salesforce sit on top, owning the customer relationship and the workflow. [AI](https://mgks.dev/tags/artificial-intelligence/) models from companies like OpenAI sit at the bottom as commoditized, interchangeable compute engines.

This is a direct counter to OpenAI's Frontier architecture, which shows exactly the opposite. In OpenAI's world, they own the top of the stack. The agent layer belongs to them. Your Salesforce instance becomes just a data store that the agent reads from and writes to occasionally.

Both can't be right. One of these companies is going to own the primary interface through which businesses interact with their data and workflows. The other becomes infrastructure. And infrastructure gets commoditized and margin-compressed.

I think the answer depends entirely on where the intelligence lives. If the orchestration logic, the decision-making, the understanding of business context lives in the SaaS application, then Salesforce wins. If it lives in the [AI model layer](https://mgks.dev/tags/machine-learning/), then OpenAI and companies like them win.

Right now, that intelligence is moving rapidly toward the model layer. GPT-4 and Claude can understand business context in ways that would have required custom application logic two years ago. That's the terrifying part for Salesforce.

## What Developers Should Actually Pay Attention To

Forget the theater. The $50 billion buyback and dividend increases are financial engineering. The customer testimonials are marketing. What matters is how Salesforce prices AWU and whether enterprises actually adopt it.

If AWU pricing is just per-seat licensing with extra steps, nothing changes. If it's genuinely usage-based and scales down when agents replace humans, then maybe Salesforce has figured out how to survive the transition. But I haven't seen the pricing yet, and I suspect it's going to be messy for the first few years while they figure out what the market will bear.

The other thing to watch is API pricing. When agents become the primary interface, API rate limits and costs become existential questions. Salesforce historically has had pretty restrictive API limits on lower-tier plans. That worked fine when APIs were for occasional integrations. It doesn't work when an agent needs to make 10,000 API calls a day to do its job.

The companies that figure out agent-native pricing models first will have a massive advantage. It won't be per-seat. It probably won't be pure token-based either. My guess is it'll be some hybrid of task completion metrics, data volume, and compute intensity. But nobody has cracked this yet, including Salesforce despite their AWU announcement.

Benioff's leather jacket and Sasquatch jokes can't hide the fact that SaaS companies are facing the first real threat to their business model in two decades, and nobody, including Salesforce, really knows how this plays out.