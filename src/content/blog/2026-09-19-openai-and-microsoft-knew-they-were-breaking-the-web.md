---
title: "OpenAI and Microsoft Knew They Were Breaking the Web"
description: "Unsealed court docs reveal internal warnings about AI training destroying publisher economics. What this means for the future of content and web infrastructure."
date: 2026-09-19 12:00:20 +0530
tags: rollup, artificial-intelligence, ai-ethics, copyright, large-language-models
image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720"
featured: false
---

The recently unsealed court documents in the New York Times' case against OpenAI and Microsoft read like a cautionary tale written by the defendants themselves. What's most striking isn't the allegations of copyright infringement or unfair data scraping, but the fact that both companies documented, in their own internal communications, exactly how much damage they were about to cause.

I've been tracking AI developments closely for years, and this level of documented awareness of potential harm before proceeding anyway represents something we don't see often: companies acknowledging the cliff they're walking toward and choosing not to stop.

## The Doom Loop Nobody Can Escape

Perhaps the most damning quote comes from an internal Microsoft document stating that their AI content strategy has "started a 'doom loop' that will hurt the performance of our models and the entire web at the same time." Let that sink in. Microsoft's own teams recognized they were creating a self-defeating system: AI trained on web content that ultimately destroys the incentive for that content to exist.

Brent Hecht, Microsoft's Director of Applied Science, was even more direct. He called the scraping of training data the "largest theft of labor in human history" and said Microsoft's fair use defense makes a "complete mockery" of the concept itself. Now, Microsoft tried to distance itself from Hecht's comments, framing them as one employee's "academic and forward-looking" perspective. But internal documents show this wasn't fringe thinking, it was institutional concern.

What this means for developers and AI practitioners: we're building on a foundation we know is unstable. The LLM training paradigm, as currently implemented, is fundamentally unsustainable. If you're architecting AI systems today, you should be thinking about how your models will function when the supply of freely available training data dries up.

## The Economics of Extraction

OpenAI's internal documents reveal that ChatGPT literally memorizes and reproduces copyrighted material verbatim. Employees acknowledged that GPT-4 "memorized a ton of data and therefore will be insanely good at regurgitation." Meanwhile, an OpenAI representative admitted being "unaware" of any efforts to detect or remove paywalled content from training data, despite leadership statements that paywalled content should be licensed.

This is the critical gap between what these companies say publicly and what they actually do internally. For those of us building with these models, that's a problem. We're depending on APIs and services built on potentially compromised data practices. The legal and ethical risks are real, and they're not going away.

OpenAI's own media experts estimated that referral traffic to major publishers like the Times has dropped as much as 60 percent, largely due to AI summaries providing direct answers without requiring users to visit source sites. This isn't a side effect, it's the intended outcome. Nick Turley from OpenAI is quoted noting that once you get an answer from ChatGPT, there's "no good reason to click" on source links.

## What Happens When the Well Runs Dry

Here's what concerns me most: both companies knew they were entering what could be called Google Zero territory, where the web becomes less valuable as a training resource because it's increasingly populated by AI-generated content and less original human work. They had this conversation internally. They documented it. And they proceeded anyway.

I've written before about [AI sustainability challenges](https://mgks.dev/tags/ai-ethics/), but this filing proves those aren't hypothetical concerns. They're documented outcomes that the largest AI companies anticipated but ignored. As developers, we need to understand that the models we're using today might not have viable successors built on the same principles.

For teams considering how to [approach AI responsibly](https://mgks.dev/tags/web-sustainability/), this is instructive. The technical challenges of building better models are solvable. The ethical and economic problems created by the current training paradigm might not be.

Satya Nadella's admission that chatbots have essentially replaced search and removed the need to visit source material directly confirms what many of us suspected. The business model works great for Microsoft and OpenAI in the short term. The problem is the long-term implications for the ecosystem that makes the entire internet possible.

The unsealed documents show companies choosing "gazillions" of dollars over sustainability. For developers and the broader tech industry, the question becomes: how do we build the next generation of AI systems without repeating this mistake?