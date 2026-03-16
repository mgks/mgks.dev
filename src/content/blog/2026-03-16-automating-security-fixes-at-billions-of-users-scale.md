---
title: "Automating Security Fixes at Billions-of-Users Scale"
description: "How Meta's security team uses AI to patch vulnerabilities across millions of lines of mobile code without driving engineers insane."
date: 2026-03-16 12:00:32 +0530
tags: rollup, software-engineering, security, ai, mobile-development
image: 'https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076'
featured: false
---

I've been thinking a lot about scale lately. Not the kind of scale where you're proud your app handles 10,000 requests per second, but the kind where a single security vulnerability might exist in hundreds of places across millions of lines of code, affecting billions of users. That's the reality Meta's Product Security team deals with every day.

The thing that struck me about their approach is how they've essentially admitted that humans can't keep up. And honestly, that's refreshing. Too many companies still pretend that throwing more engineers at security problems will somehow work. It won't.

## The Problem With Mobile Security at Scale

Here's what makes mobile security particularly nasty: you can't just update a server and call it a day. You've got multiple apps, each with their own codebases, each with potentially hundreds of call sites where the same vulnerable pattern gets repeated. Every time someone copy-pastes code (and let's be honest, we all do it), they're potentially copying a security issue too.

Meta's solution is what they call a "two-pronged strategy," which is corporate speak for "we automate the hell out of it." They've built systems that can propose security patches, validate them, and submit them automatically. The key word here is "minimal friction" for the engineers who own the code. Because if your security tooling pisses off developers, they'll find ways around it.

## When AI Actually Solves Real Problems

I'm generally skeptical of [AI](https://mgks.dev/tags/artificial-intelligence/) solutions that feel like someone just bolted ChatGPT onto an existing product and called it innovation. But this is different. This is using [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) to solve a problem that genuinely can't be solved manually at this scale.

Think about it: you need to identify vulnerable patterns, understand the context of each call site, generate a fix that doesn't break functionality, validate that fix, and then navigate the internal code review process. Doing this hundreds of times across different apps and teams would take months with human engineers. The system Meta built can do it continuously.

What I find particularly interesting is that they're not replacing security engineers. They're multiplying their effectiveness. One person can now shepherd fixes across an entire ecosystem instead of getting bogged down in the mechanical work of changing code and running tests.

## The Automation vs Control Tradeoff

There's always a tension between automation and maintaining control. You want systems that can move fast and fix things (sorry, had to), but you also don't want a rogue bot pushing broken patches to production code that billions of people depend on.

Meta's approach seems to thread this needle by keeping humans in the loop where it matters. The system proposes and validates, but engineers still have visibility and control. It's not about removing human judgment, it's about removing human tedium.

I imagine there were some skeptical engineers initially. "You want a bot to submit patches to my code?" But if the alternative is spending weeks doing repetitive security updates instead of building features, suddenly that automation looks pretty good.

## What This Means for the Rest of Us

Most companies don't operate at Meta's scale, which might make this seem irrelevant. But I think the lessons here apply more broadly. [Security](https://mgks.dev/tags/security/) debt compounds just like technical debt. The longer you wait to fix a class of vulnerabilities, the more places it spreads to.

Even if you're working with tens of thousands of lines of code instead of millions, the same principles apply. Can you identify patterns? Can you automate fixes? Can you reduce the friction of applying security updates?

The reality is that manual security reviews and fixes don't scale linearly with codebase size. They scale exponentially. You need force multipliers, and that's what intelligent automation provides.

What fascinates me most is how this represents a shift in thinking about security. It's not just about preventing vulnerabilities from being introduced (though that's important). It's about accepting that vulnerabilities will exist and building systems sophisticated enough to find and fix them faster than attackers can exploit them.