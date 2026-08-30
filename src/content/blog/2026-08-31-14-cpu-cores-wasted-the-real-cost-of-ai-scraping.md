---
title: "14 CPU Cores Wasted: The Real Cost of AI Scraping"
description: "How LLM training scrapers consume 20% of git.kernel.org's infrastructure, forcing difficult tradeoffs between openness and sustainability."
date: 2026-08-31 00:00:51 +0530
tags: rollup, engineering, ai, infrastructure, web-scraping
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070"
featured: false
---

I've had my complaints about AI scrapers before, but now I have actual metrics to back up what I've been saying. The numbers are sobering enough that they're forcing us to make uncomfortable decisions about the future of open infrastructure.

Let me put this in concrete terms: across five geographically distributed nodes totaling 90 CPU cores, between 14 and 16 cores are doing nothing but rendering git commits as HTML for scrapers. That's roughly 20% of our total capacity, and it's not even the whole story because the traffic comes in waves.

## Why Scrapers Think They're Being Smart

Here's what fascinates me about this problem: there's actually an efficient way to get all this data. Everything on git.kernel.org can be cloned. The entire Linux kernel history, all 1.48 million commits, plus 922 forks that mostly deduplicate on the backend. A proper training pipeline would clone once, parse locally, and be done.

Instead, what we see is the most inefficient approach possible: rendering commits as HTML and parsing the rendered output. This creates billions of valid URLs to scrape from just the linux.git repository alone. When you factor in patches, diffs, and arbitrary commit ranges, the URL space becomes effectively infinite.

The scrapers know this is stupid. They're doing it anyway because it works.

## The Escalation Treadmill

When the problem started about a year ago, I thought we had options. Initially, the bots were helpfully identifying themselves via user-agent strings. We banned those. Then they started spoofing browser identities. We moved to IP-based blocking, which worked until they started rotating through entire ASN ranges.

Then things got creative. They began distributing requests across millions of residential and mobile IPs, each making just 4-5 requests before disappearing. By the time we could characterize them as bots, they were already gone. It's the classic swarm attack pattern: hit hard, move on, return when the target recovers.

We implemented a proof-of-work challenge (we call it Anubis) that forces clients to solve SHA256 puzzles before accessing the site. It was devastatingly effective at first. The bots just left.

For a few months, we had peace.

Then they came back, solving the puzzles. So we raised the difficulty. Legitimate users started complaining that their phones were getting warm from the computation. We raised it again anyway because it was the only tool we had.

Today, roughly 33% of the 6 million daily requests to git.kernel.org are solving the proof-of-work challenge to get through. With generous assumptions, legitimate traffic is only about 2% of our total requests. Everything else is scrapers, and a third of them are willing to burn CPU cycles to get what they want.

## The Broader Pattern

This isn't unique to git.kernel.org. This is happening across the internet right now. App developers are turning your TV into an attack vector through proxy SDK monetization. Companies are spawning daily with custom AI models that all need training data. The incentives are completely misaligned with reality.

What troubles me most is that there's no elegant solution here. We can't make a technical fix that doesn't also punish legitimate users. We can't shame the scrapers into going away. We can't appeal to the economics of it all because, from their perspective, burning a fraction of compute to extract training data worth millions is perfectly rational.

## What This Means for Infrastructure

The immediate consequence is that we're turning off features. You'll lose functionality when accessing our resources anonymously. This sucks. We hate it. But we're running out of better options.

For anyone building infrastructure at scale, the lesson is clear: if your service is valuable enough to be worth scraping, you'll need to plan for active adversarial use. That means thinking about rate limiting, proof-of-work challenges, or content gating from day one. The problem compounds exponentially once the scrapers arrive.

I want to be clear: we're still offering all our data for download to anyone who asks. We believe in open infrastructure and open data. You might just need to follow a different process now. If you're training an LLM and you want our data, reach out. We'll work with you. What we won't tolerate is random IPs treating our infrastructure as a free GPU cluster hidden behind a web server.

The frustrating part is knowing that somewhere right now, another startup is launching with the same problem we have, and they'll go through the same painful discovery process because there's no standard playbook for defending against distributed, monetized, coordinated scraping.