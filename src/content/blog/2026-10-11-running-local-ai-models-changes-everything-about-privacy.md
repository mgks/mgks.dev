---
title: "Running Local AI Models Changes Everything About Privacy"
description: "I'm testing local LLMs on high-end hardware to see if self-hosted AI is worth the investment for real work, not just hype."
date: 2026-10-11 18:00:20 +0530
tags: rollup, artificial-intelligence, local-ai, privacy, llms
image: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232"
featured: false
---

I've spent years hesitant about AI because the privacy tradeoff felt unacceptable. Handing my personal data to OpenAI, Google, or Anthropic in exchange for convenience never sat right with me. But something shifted when I realized powerful models could run entirely on my machine, answering only to me.

That's the real appeal here. It's not about being anti-cloud or contrarian. It's that I finally have a choice, and that choice changes how I think about what AI is actually useful for.

## The Hardware Question

Apple's new Mac desktops and the incoming RTX Spark Windows machines are being marketed hard for local AI, and for good reason. The M5 Ultra Mac Studio with 256GB of unified memory I've been testing represents an investment most people shouldn't make lightly. But having this much capability on my desk opened doors I didn't expect.

I installed Hermes Agent, a free open-source desktop app, and loaded the Qwen 3.8 Flash model, a 125-billion parameter beast that weighs about 105GB. Getting it running was surprisingly straightforward. The real work started when I had to figure out what to actually do with it.

The barrier for most people won't be technical. It'll be confronting that blank text box and asking yourself: what would I actually delegate to an AI if privacy weren't a concern? That's a harder question than it sounds.

## Real Work, Not Theater

I started small. A morning briefing that scans my email and calendar, something a $12,000 computer absolutely doesn't need to do, but it worked. Then I tackled something that genuinely annoyed me: organizing my Steam library of 400+ games.

Steam doesn't auto-categorize, so you're stuck manually sorting. I asked Hermes to handle it, gave it a Steam API key, and within minutes my entire library was organized by genre with preserved custom categories. Then I revoked the API key. Done.

This is where local AI clicks for me. The data never left my machine. The access was granular and revocable. I trusted it with something I genuinely wouldn't trust to any cloud service, not because the companies are evil, but because the fewer places my data lives, the better.

I've also had Hermes analyze financial records and build spec comparison spreadsheets for embargo-protected hardware reviews. These are small tasks, but they're exactly the work I'd skip rather than upload to the cloud. The efficiency gain isn't just technical, it's psychological. I'm actually using AI now because I'm not fighting my own security instincts.

## The Limitations Are Real

But I'm not starry-eyed about this. My daily briefing has broken multiple times already. The benchmark automation script I'm building remains a work in progress even with substantial hand-holding of the model. These systems aren't magical assistants that solve everything.

I treat Hermes exactly like system software: a tool with specific capabilities and real limitations. I don't anthropomorphize it. No 'please' or 'thank you,' just direct instructions. It's a program on my computer, nothing more.

The implications for [developers exploring AI infrastructure](https://mgks.dev/tags/ai-infrastructure/) are significant though. We're seeing a genuine shift away from 'move everything to the cloud' thinking toward selective on-device processing. If you're building tools for sensitive data, consider this emerging preference isn't just security theater, it's a real market demand.

## What This Means for the Industry

The real story isn't that local AI is replacing cloud services. It's that developers now have options. You can use [cloud-based tools when appropriate](https://mgks.dev/tags/api-design/) and local models for sensitive work. That flexibility matters.

Machine learning engineering will increasingly split into two camps: commodity cloud APIs for common tasks, and specialized local deployments for privacy-critical or latency-sensitive work. The winners will be teams that understand which tool fits which job.

For most people, the M5 Ultra or RTX Spark route isn't practical. But smaller models on M4 Mac Minis or mid-range laptops are becoming genuinely viable for real work. The hardware is getting cheaper and more efficient while models get smarter.

I'm still early in this journey, and I'm genuinely uncertain where it leads. But what's clear is that privacy-first AI isn't just philosophical preference anymore, it's a practical competitive advantage worth building toward.