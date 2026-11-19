---
title: "How AI Found 4000 Vulnerabilities Without Drowning Maintainers"
description: "GitHub and Microsoft's Codename MDASH pilot shows AI can fix open source vulnerabilities at scale, but only if we respect maintainers' time and expertise."
date: 2026-11-19 12:00:20 +0530
tags: rollup, open-source, security, ai-tools, devsecops
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

I've been watching the open source security landscape shift dramatically. We've built AI systems that can find vulnerabilities faster than ever before, but we've created a new problem in the process: maintainers are drowning in AI-generated security reports, most of which don't matter.

GitHub and Microsoft just showed us a better way forward with Codename MDASH, and I think it fundamentally changes how we should approach AI in open source security.

## The Vulnerability Finding Paradox

For years, finding security issues was the bottleneck. We didn't have enough tools, enough researchers, or enough eyeballs on widely-used projects. Now? Finding vulnerabilities is trivial. You can point a model at any codebase and get thousands of potential issues back in minutes.

But here's the thing: finding them doesn't fix them. And maintainers, often working unpaid on projects that millions depend on, suddenly face an impossible triage task. They're getting duplicate reports, false positives, and findings that aren't actually vulnerabilities. The noise has become louder than the signal.

Christian Grobmeier, a Log4j maintainer, put it perfectly: "the AI defending open source has to be better than the AI attacking it." Instead, we've built systems that are sometimes worse.

## What Codename MDASH Actually Did

The pilot started with a radical constraint: only send findings that matter. GitHub and Microsoft scanned six high-impact open source projects - AutoGPT, Caddy, Express, FastMCP, ImageMagick, and Netty. But they didn't just dump raw findings on maintainers.

They had seven Microsoft FORGE Lab researchers manually review thousands of AI findings, triaging them down to just 99 actionable reports. Each report came with a suggested fix. Maintainers received private reports, decided what to fix, and got to work.

The results speak for themselves: as of November 2024, maintainers had fixed 55 of the 99 reports, with 14 already shipped in production. Caddy's team fixed all 22 reports in a week or less. ImageMagick's two-person team fixed a complex issue in 15 minutes with a well-scoped patch.

One maintainer noted the difference: "Normally, a security advisory would take us around 30 minutes to 1 hour on average to read, understand, and make a fix. It is a huge difference."

## The Human Layers Matter

Here's what I find most important about this approach: it's unapologetically expensive on the front end. Seven researchers spent two days per project doing manual triage. That's not scaling to thousands of projects next month.

But that's exactly the point. We shouldn't be trying to scale this yet. The pattern that matters is the process: find with AI, verify with humans, deliver with context. That sequence works. Skipping steps doesn't.

I think about this in the context of [AI code generation and developer experience](https://mgks.dev/tags/ai-tools/). We've learned that raw AI output needs human judgment to be valuable. The same is true for security findings. A model can identify patterns, but a researcher needs to understand whether those patterns actually represent risk in this specific codebase.

Maintainers got what they needed most: a short, curated list. Express maintainers said the reports "cut through the noise." FastMCP's team said the scan went beyond what previous AI scanners had provided. The signal-to-noise ratio finally made triage manageable.

## Raising the Standard for Vulnerability Reports

I think this pilot establishes a new baseline for anyone using AI to find vulnerabilities in open source. If you're scanning someone else's code, you owe them:

1. Verification before reporting. The sender's job is triage, not the maintainer's.
2. Suggested fixes, not just findings. Raw findings are half-finished work.
3. Private reporting channels. Public disclosure without maintainer coordination is hostile.
4. Respect for their time. Cut through the noise or don't report.

This ties into broader [DevSecOps practices and automation](https://mgks.dev/tags/devsecops/) we're seeing emerge. The goal shouldn't be automating our way to a false sense of security - it should be automating the work that respects human expertise rather than replacing it.

## What's Actually Scalable Here

The infrastructure to support this exists on GitHub. Private vulnerability reporting, CI/CD on private forks for verification, and access to capable models for proof-of-concept testing. Maintainers got reports where they already work, with the tools they need to verify and ship fixes.

The GitHub Secure Open Source Fund shows what happens when you resource maintainers properly: 216 projects with 300+ maintainers have fixed 4,000+ vulnerabilities in software downloaded 20 billion times monthly. That's the downstream effect of caring about maintainer experience.

The real constraint isn't whether we can find vulnerabilities. It's whether we'll commit to fixing them responsibly, with maintainers as partners rather than obstacles to work around.

What if the mark of a mature security program isn't how many vulnerabilities you find, but how many you actually help fix?