---
title: "Nine Incidents in May: What GitHub's Outages Teach Us About Resilience"
description: "A technical deep-dive into GitHub's May 2026 incidents and what they mean for developers building on the platform"
date: 2026-06-12 12:00:13 +0530
tags: rollup, open source, devops, infrastructure, github
image: "https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070"
featured: false
---

Let me be honest: when I first saw the May availability report from GitHub, I had to double-check I wasn't reading about a fictional scenario. Nine incidents in a single month is a lot, especially from a platform that powers millions of developer workflows worldwide. But here's what really caught my attention: this isn't a story ofcollapse. It's a story of a massive infrastructure transformation happening in real-time, with all the messy growing pains that entails.

The timing is fascinating too. GitHub's traffic is exploding, largely driven by [AI](https://mgks.dev/tags/artificial-intelligence/)-assisted and agentic development workflows. They're moving from a monolith to microservices, shifting to Azure for elastic capacity, and systematically eliminating shared failure points that have caused problems for years. In the span of four months, they went from 8% of monolith traffic on Azure to 40%. That's the kind of scale change that doesn't happen without some public bruises.

## The Database Migration That Almost Broke Everything

The incident on May 4th is probably the most instructive one for anyone who works with databases at scale. GitHub ran a routine online schema migration against a heavily-accessed database table. The migration had been progressing fine for hours, but as traffic ramped up toward the weekly peak, the combined load from the migration and normal production traffic completely saturated database connection capacity.

The math here is brutal: when you're running a schema migration that locks rows, and then you have normal traffic hitting the same table, you can quickly create a situation where every request is waiting on every other request. Query contention on a primary database cascaded into timeouts across dependent services like Codespaces, Pages, Packages, OAuth, and Copilot. At peak, about 1.3% of requests were returning 5xx errors.

What strikes me about this is that it wasn't a freak accident. It was a collision of two normal operations that shouldn't have been allowed to collide. GitHub is now implementing dynamic throttling that adapts to live cluster load, and they're adding circuit breakers that will automatically pause migrations when latency or connection utilization crosses safe thresholds. This is the kind of defensive programming that sounds obvious in retrospect but requires actual incident pain to motivate.

## The 32-Bit Integer Bug That Should Have Been Prevented

The May 6th incident involving pull request review threads failing is the one that made me shake my head. A 32-bit integer key reached its maximum value in a Vitess lookup table. The primary table had been migrated to 64-bit integers, but the lookup table was missed. Once the primary table values exceeded what a 32-bit integer could hold, new thread creation requests failed at nearly 100%.

This is a classic technical debt problem. The migration wasn't complete because someone didn't realize the lookup table existed, or assumed it was handled, or documentation was out of date. We're not talking about legacy systems from the 1990s here. This is infrastructure that's actively maintained. The lesson is clear: when doing schema migrations, you need to trace every single dependency, not just the primary tables. GitHub is now expanding monitoring to include Vitess lookup tables specifically, which tells me they learned this lesson the hard way.

## The Service Account That Took Down Actions

The May 26th incident is perhaps the most bizarre of the bunch. GitHub's automated account review system incorrectly suspended the service account used by GitHub Actions to authenticate workflow runs and download actions. This wasn't a security breach or malicious activity. It was an overly eager automation flagging a critical system account.

For about 36 minutes, all newly queued workflow runs failed to start. GitHub Pages, Copilot code review, Copilot coding agent, Octoshift, and GitHub Enterprise Importer were also impacted because they all depend on Actions. The remedy was relatively simple: restore the account, mark it exempt from automated review, and flush cached state. But the blast radius was enormous.

What's notable here is that this is exactly the kind of failure that happens when you have automation touching critical systems without proper guardrails. You need allowlists for service accounts that can never be suspended, and you need those protections enforced consistently across all account management tooling, not just in one place. GitHub is implementing exactly that now.

## The Common Thread: Growth Pain

Looking at all nine incidents, a pattern emerges. GitHub is experiencing massive growth driven by AI development workflows. Their infrastructure team is actively transforming their systems to handle this growth, moving to Azure, breaking apart monoliths, isolating databases, implementing stateless authentication. These are all the right moves. But every structural change introduces new failure modes, and temporary vulnerability comes before permanent resilience.

The key insight here is their guiding principle: availability, then capacity, then features. When faced with trade-offs, they choose reliability first. That's why they're sharing these incidents publicly, explaining what went wrong, and detailing their remediation plans. Trust in a platform like this isn't built by pretending things are perfect. It's built by being transparent about problems and genuinely fixing them.

For developers building on GitHub today, the practical takeaway is this: assume that any critical workflow might have a bad hour occasionally. Build retry logic. Use multiple regions where possible. Don't design systems that require GitHub to be perfectly reliable 100% of the time, because no platform achieves that. The incidents I read about this month are uncomfortable to digest, but they're also evidence that GitHub is willing to do the hard work of earning back trust after each individual failure.

The platform isn't becoming less reliable. It's becoming more transparent about the reliability challenges it faces while actively working to solve them. That's more than most infrastructure providers can say.