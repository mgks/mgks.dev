---
title: "AI Agents Are Writing Code Faster Than We Can Secure It"
description: "One in three GitHub pull requests now involves AI agents. We need to rethink how we approach security when code creation outpaces human review."
date: 2026-10-08 12:00:20 +0530
tags: rollup, open-source, ai-security, devsecops, secret-scanning
image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070"
featured: false
---

A year ago, fewer than one in ten pull requests on GitHub involved an AI agent. Today, it's one in three. If that pace holds, within two years, most code pushed to GitHub could be written by an agent.

I find myself thinking about this statistic constantly. Not because AI agents are bad, but because we're witnessing a fundamental shift in how software gets created, and our security practices haven't caught up.

The common narrative is that developers are becoming careless. That AI tools are enabling sloppy habits. I think that's backwards. The real issue is workload scaling.

## The Math Doesn't Work Anymore

GitHub's data tells a clear story: between Q2 2024 and Q2 2026, screened pushes grew 2.84 times while pushes carrying credentials grew 2.59 times. Critically, there's no statistically detectable trend in per-push prevalence. Developers aren't becoming more careless. They're just pushing more code, and the sheer volume creates exposure at scale.

Here's what keeps me up: the mean time to manually revoke a leaked secret is about 40 days. One in five takes more than 90 days. Meanwhile, a new secret appears in public code roughly once every two seconds, doubling yearly for the past three years.

You can't tell developers to be more careful when the real problem is that human remediation can't scale alongside development velocity. It's not a discipline issue. It's an architecture problem.

What's encouraging is that developers *understand* this. The share of developers overriding push protection blocks fell from 6.63% to 3.93% over nine quarters. When given the right tools, developers actively engage with security. They want to build safely.

## Prevention Is Where the Leverage Lives

I'm genuinely impressed by what GitHub has built with secret scanning. The partner program now covers 150+ technical providers. In Q2 2026, public scanning reported an average of 26 credential matches per second. When partners get notified, many immediately revoke tokens without waiting for manual developer action.

But push protection is where real progress happens. It intervenes early, stopping secrets before they ever enter repository history. When developers or agents get feedback at the moment of a mistake, correction is cheap. After a secret reaches production history, the blast radius expands infinitely.

The numbers are stark: push protection currently stops about 30% of newly detected secrets. We're finding the remaining 70% after they've already leaked. That gap represents our biggest opportunity.

## The Four-Body Problem

Extending push protection to unstructured secrets is genuinely difficult. A provider-issued token might have a recognizable prefix. An internal database password has nothing. We need context, but context comes with tradeoffs.

This is what I think of as the four-body problem for secret protection: precision, latency, throughput, and cost are coupled constraints. A check that's too slow can't run frequently. One that's too expensive won't scale. False positives erode developer trust and make the next block harder to accept. But missing a real secret gets through.

GitHub's answer was the ModernBERT classifier, built with Microsoft Applied Sciences. It evaluates candidate secrets in context in under two milliseconds, making it precise enough and fast enough to run in the critical path at scale. Early results suggest it could more than double the number of secrets prevented before they leak.

That's the kind of leverage we need: tools that scale protection proportionally with code creation speed.

## What This Means for Your Workflow

As AI agents become standard development tools, the security model changes fundamentally. You can't supervise every request an agent makes. You need systems that make the safe path the easy path.

For teams implementing [AI code generation workflows](https://mgks.dev/tags/ai-security/), this means leaning into push protection and automated secret scanning. For organizations scaling development, it means shifting left aggressively, catching problems before they're problems.

Read more about implementing effective [DevSecOps practices](https://mgks.dev/tags/devsecops/) in an AI-driven world.

The future isn't about making developers more careful. It's about making protection automatic, fast, and invisible.

We're at an inflection point where we can either choose tools that protect software at the speed developers create it, or watch the gap between creation and protection widen indefinitely. The choice seems obvious, yet somehow, many teams are still managing secrets like it's 2015.