---
title: "Cloudflare's AI Training Controls Give Sites Real Agency"
description: "Cloudflare lets sites opt out of AI training while keeping search visibility. Here's what it means for creators and the future of web scraping."
date: 2026-09-16 00:00:20 +0530
tags: rollup, cloud, ai, web-standards, privacy
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070"
featured: false
---

For years, web creators faced an impossible choice: let AI companies train on your content or disappear from search results. Cloudflare's new Disallow AI Training setting finally breaks that false binary, and I think it signals a meaningful shift in how the internet's infrastructure layer views publisher rights.

The problem was architectural. Companies like Google, Apple, and Microsoft ran mixed-use crawlers that served both search and AI training simultaneously. If you blocked one, you blocked both. A robots.txt directive couldn't distinguish between them. A site owner couldn't say "index me but don't train on me." You got all or nothing.

## The Infrastructure Solution

What's interesting here is that Cloudflare didn't solve this with policy alone. They solved it with their position as a network layer. They publish the preference, identify who's crawling, classify why they're crawling, and block the ones that ignore it. Then they report it all publicly on Radar.

This matters because it addresses something I've been thinking about regarding [privacy and platform power](https://mgks.dev/tags/privacy/). A single site owner adding a robots.txt line can't enforce anything. But infrastructure providers operating at scale can. They see all the traffic. They can make blocking meaningful. This is how you actually shift power dynamics.

Cloudflare created an "Accountable" designation for operators who meet their standards. Apple, Google, and Microsoft qualified because they provide controls today plus time-bound commitments for future capabilities. Amazon, Anthropic, Meta, and OpenAI qualified because they separate search and training crawlers entirely, making granular blocking possible.

One detail stuck with me: less than 1% of Cloudflare sites block search bots. But 17% use some mechanism to block AI training. That's not a rounding error. It's a clear signal that creators view these differently. Search drives discovery and traffic. AI training can commoditize your work.

## The Nuance of Summaries vs Training

What Cloudflare's doing here is important because training and summaries aren't the same problem, though they're often conflated.

Training is about whether your content becomes part of someone else's model. Summaries are about whether people visit your site or consume answers in search results instead. One's a control question. One's a distribution question.

The data's genuinely mixed. Over 40% of people who read AI summaries end their search without clicking through. That's traffic lost. But searchers who do click through convert three to five times better than traditional search traffic. So AI summaries can mean fewer visits of much higher intent.

That's not universally good or bad. An ad-supported blog and an e-commerce site make completely different calculations. Cloudflare's not choosing for you. They're giving you the visibility to choose for yourself. That's philosophically healthier than most platform approaches.

Cloudflare's already planning URL-level granularity for summaries by next year. Instead of a binary yes/no, you could say "use this article but not that one" or "include snippets but not full sections." That's the right direction. A blanket setting was always too crude.

## What This Means for the Web

Here's what interests me about [standards and interoperability](https://mgks.dev/tags/web-standards/): Cloudflare's pushing infrastructure providers to agree on common behavior before regulation forces it. They got buy-in on opt-out mechanisms. They got transparency commitments. They got time horizons.

I'm skeptical of the timeline for Bing. Early 2027 is a long time to wait for basic robot.txt support from a major crawler. But the principle of commitment is there.

The migration path matters too. Existing sites keep their current settings by default. New sites get presets based on whether they run ads. If you're revenue-dependent on human eyeballs, the defaults are more restrictive toward AI. That's sensible policy baked into UX.

What I'm watching now is whether other infrastructure providers follow suit. Cloudflare's move is valuable partly because they operate at scale. If smaller CDNs and hosting providers don't offer equivalent controls, sites will fragment. Some creators will have real choices. Others won't.

The bigger question is whether this framework actually scales to the next wave of crawlers. What happens when 50 different AI companies each run crawlers? Do we each negotiate individually, or do open standards like ai-prefs actually take hold? Cloudflare can't enforce controls on crawlers they don't see traffic from.