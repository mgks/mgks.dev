---
title: "Why AI Agents Need Better Security Tools, Not Careful Developers"
description: "As AI agents write more code, GitHub's data reveals developers aren't getting careless. But our security infrastructure needs to evolve faster than our code creation."
date: 2026-10-08 18:00:20 +0530
tags: rollup, open-source, ai-security, devsecops, secret-scanning
image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2070"
featured: false
---

One in three pull requests on GitHub now involves an AI agent. A year ago, that number was fewer than one in ten. If this pace continues, most code pushed to GitHub could be written by agents within two years, and much of it may never be fully read by a human.

This terrifies some people. The narrative writes itself: reckless developers paired with AI agents creating a security nightmare. A new secret appears in publicly visible code about once every two seconds. Surely AI made us careless.

But the data tells a different story.

## Developers Aren't Getting Lazier, They're Just Faster

GitHub analyzed nine quarters of data spanning Q2 2024 through Q2 2026. The findings challenge conventional wisdom. Between those quarters, screened pushes grew 2.84 times while pushes carrying credentials grew only 2.59 times. More importantly: there's no statistically detectable trend showing that developers are becoming more careless with secrets on a per-push basis.

What we actually see is the opposite. The share of push-protection blocks that developers override has fallen linearly from 6.63% to 3.93%. Developers understand the risk now more than ever. They're less willing to accept it. They're not becoming complacent. They're accelerating.

This distinction matters fundamentally. The problem isn't developer behavior. The problem is scale. When you double the amount of code created, you roughly double the expected exposures. And if each exposure requires the same manual human remediation, you've doubled your workload while your remediation speed hasn't changed.

The mean time to manually revoke a compromised secret still hovers around 40 days. One in five takes more than 90 days. That's the real vulnerability. Not carelessness, but lag.

## The Four-Body Problem

Secret protection involves what GitHub calls the "four-body problem": precision, latency, throughput, and cost are all coupled constraints. You can't simply choose better detection without considering the others.

A perfect detector that takes 30 seconds per push won't scale. A check that's incredibly cheap but constantly fires false positives trains developers to ignore warnings. Prevention must be worth a developer's time. After a secret crosses into repository history, detection becomes a post-incident response. Before it crosses, blocking is a simple binary decision with minimal cost.

Context matters here in ways pattern matching can't capture. Some secrets have recognizable prefixes. Others, like internal database passwords, are completely unstructured. The surrounding code and world context become your only detection clue.

GitHub's approach now includes a fine-tuned ModernBERT classifier built with Microsoft Applied Sciences that assesses candidate secrets in context without generating code or prose. It evaluates batches in under two milliseconds. It's fast enough, cheap enough, and precise enough to run at scale in the critical path. This model can more than double the number of secrets the platform prevents before they enter history.

## Why This Matters for Your Infrastructure

The philosophical shift here is subtle but important: we're moving from "teach developers to be more secure" to "build systems that scale security alongside development speed."

I've written before about [AI code generation](https://mgks.dev/tags/ai-code-generation/) and its impact on developer experience. But here's what that doesn't capture: the developer experience improvements we need most right now aren't about making coding faster. They're about making security effortless. Push protection that blocks secrets before they enter history doesn't slow anyone down. It prevents 30% of newly detected secrets before remediation becomes a crisis.

GitHub's secret scanning partnership program now covers over 150 technical partners. When a secret is detected publicly, these partners can revoke tokens immediately. The developer may still need to replace credentials, but revocation doesn't wait for manual action. In Q2 2026, public scanning reported an average of 26 credential matches every second, and many partners revoke automatically.

This is the scalability we need. Not developer discipline. Not nagging warnings. Systems that act.

## The Direction Forward

As we hand more work to AI agents, I believe our security infrastructure must become smarter, faster, and more autonomous. The days of treating security as something developers handle manually are ending not because developers are lazy, but because the math doesn't work anymore.

You can't tell a developer to be more careful when they're sleeping and an AI agent is shipping code. You can't scale human remediation when secrets appear faster than humans can respond. The solution is shifting left: detect earlier, block automatically, and let systems handle what systems can handle.

The future isn't about making developers more paranoid. It's about building platforms that develop safely at the speed developers actually work. The question isn't whether AI will write more code. It's whether your security infrastructure is ready when it does.