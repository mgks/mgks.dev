---
title: "AI is Writing Code Faster Than We Can Secure It"
description: "One in three GitHub PRs now involves AI agents. But our security practices haven't scaled. Here's why that matters for developers."
date: 2026-10-08 00:00:20 +0530
tags: rollup, open-source, ai, security, devsecops
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065"
featured: false
---

A new secret appears in publicly visible code about once every two seconds. That number has doubled yearly for the past three years. The immediate reaction from some corners of the industry is predictable: AI made developers careless.

But the data tells a different story.

I've been following GitHub's secret scanning metrics closely, and what I'm seeing suggests we're not facing a carelessness problem. We're facing a scaling problem. Between Q2 2024 and Q2 2026, the number of screened pushes grew 2.84 times while pushes carrying credentials grew only 2.59 times. More importantly, the share of push-path blocks that developers override has fallen from 6.63% to 3.93% over the same period. Developers aren't becoming more willing to accept risk. They're becoming more aware of it.

What's actually happening is simpler and more urgent: we're accelerating code creation without proportionally accelerating code protection.

## The Scaling Crisis

One in three pull requests on GitHub now involves an AI agent. A year ago, that number was fewer than one in 10. If that pace holds, within two years, most code pushed to GitHub could be written by an agent. Much of it may never be fully read by a human.

This isn't inherently bad. Agents are making developers more productive. They're handling boilerplate, reducing toil, and letting humans focus on harder problems. The issue is that the tools creating more software haven't been paired with tools protecting more of it.

The mean time to manually revoke a compromised secret hovers around 40 days. One in five takes more than 90 days. Meanwhile, exposed credentials can remain usable for weeks or months. At a fixed human remediation rate, doubling your code output doubles your expected exposures and doubles the remediation workload. That's not scalable. It's not a developer behavior problem. It's a structural problem.

## Prevention Over Response

GitHub's approach here is instructive. Rather than telling developers to "be more careful," they're shifting the burden to the platform. The secret scanning partnership program now covers more than 150 technical partners. In Q2 2026, public scanning reported an average of 26 credential matches per second. Once notified, partners like OpenAI, Google Cloud, and Slack can revoke tokens immediately, without waiting for a developer to spot and process an alert.

But even better is push protection, which stops recognizable credentials before they enter repository history. In the past month, a secret was blocked by push protection at least once every second. When it comes to issuer-bound credentials, GitHub blocks more secrets than slip through.

Here's what matters for the rest of us: when you're preventing leaks earlier in the development flow, the cost of prevention is tiny and the decision is binary. After a secret crosses the push boundary and enters repository history, that same string can authenticate to a real system, and the cost becomes unbounded.

## The Context Problem

But push protection currently catches only about 30% of newly detected secrets. The remaining 70% get discovered after they're already exposed. Why? Many secrets don't have recognizable patterns. Internal database passwords, custom tokens, and domain-specific credentials often look like random strings. We need context to identify them.

This is where AI becomes essential rather than peripheral. GitHub recently introduced a fine-tuned classifier built with Microsoft Applied Sciences that assesses candidate secrets in context, evaluating batches in under two milliseconds. It's not generating code or prose. It's making precise, fast judgments about whether a string is actually a credential.

Including this model in push protection could more than double the number of secrets prevented before exposure. That's the kind of scaling we need.

## What This Means for Your Workflow

If you're shipping code on GitHub, this matters directly. You're benefiting from better secret detection whether you realize it or not. If you're building on open source or contributing to projects that use modern secret scanning, the platform is doing more of the [security work](https://mgks.dev/tags/devsecops/) that used to fall on your shoulders.

But there's a broader implication here for how we think about developer tools. We've spent the last few years optimizing for developer productivity through AI agents and code generation. We're now at the point where that productivity gain creates new technical debt if security doesn't scale alongside it.

The responsibility isn't on you to remember not to commit secrets. The responsibility is on the platform to make committing secrets practically impossible. When one in three PRs involves an AI agent, we can't rely on human vigilance. We need automation that moves faster than the code it's protecting.

This is the inflection point: developers and agents move faster, so protection must too, or we risk building a more productive industry on a less secure foundation.