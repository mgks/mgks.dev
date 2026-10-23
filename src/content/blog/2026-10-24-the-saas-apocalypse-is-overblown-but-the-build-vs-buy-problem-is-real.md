---
title: "The SaaS Apocalypse is Overblown, But the Build-vs-Buy Problem is Real"
description: "Netflix engineering leader Nivia Henry on why the SaaS death narrative misses the point, and what actually matters for infrastructure decisions in 2024."
date: 2026-10-24 00:00:20 +0530
tags: rollup, software-engineering, saas, infrastructure, engineering-leadership
image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070"
featured: false
---

I've been hearing the 'SaaS apocalypse' narrative for about two years now. Every other blog post claims companies are ditching their tools and building in-house. But after listening to Nivia Henry, an engineering leader who spent two and a half years solving complex data problems at Netflix, I think we're asking the wrong question entirely.

The SaaS apocalypse narrative isn't wrong so much as it's incomplete. Yes, some companies are rethinking their tool dependencies. Yes, the economics of certain categories have shifted. But the real story isn't about SaaS dying. It's about the build-versus-buy calculus becoming genuinely complicated for the first time.

## When the Economics Actually Favor Building

There's a particular moment when building in-house makes sense, and it's not when everyone says it does. Nivia pointed out that the complexity isn't in whether you *can* build something, but whether you should given your specific constraints: data volume, team expertise, cost structure, and long-term roadmap.

At Netflix's scale, building custom infrastructure makes sense for certain problems that off-the-shelf solutions simply can't optimize for. At a Series B startup, it almost never does. But here's what's changed: the gap between those two extremes is now occupied by companies who genuinely need to think about it.

AI has accelerated this timeline. A small team with access to LLMs can prototype infrastructure solutions faster than ever. The barrier to in-house development has lowered, which means the threshold for outsourcing has changed. This doesn't mean the SaaS market is collapsing. It means the decision-making process is harder.

## Understanding Architecture is Your Unfair Advantage

One insight from the conversation struck me: long-term infrastructure costs are almost entirely determined by how well you understand your system architecture. This is the part that most engineering organizations get wrong.

I've seen teams pick tools based on ease of setup rather than how those tools will scale with their system. They optimize for the next quarter rather than the next three years. Then they wake up to technical debt that costs millions to unwind.

Nivia's point was sharper: you can't make a rational build-versus-buy decision without understanding what you're actually building. Not just the code, but the data flows, the failure modes, the coupling between systems. That architectural knowledge is what separates good infrastructure decisions from expensive mistakes.

This is why I think the best engineering leaders aren't the ones who are ideologically pro-build or pro-buy. They're the ones who take the time to understand their systems deeply enough to ask the right questions. What would we lose by outsourcing this? What would we gain by building it? What are we actually paying for, in total cost of ownership terms?

## The AI Wildcard Changes Everything

We're in a strange moment where AI capabilities are creating new build opportunities that didn't exist six months ago, while simultaneously making certain [infrastructure](https://mgks.dev/tags/infrastructure/) decisions obsolete. A tool you bought in 2022 might be redundant in 2025 if you can now achieve its function with a good prompt and an API call.

This creates a kind of decision paralysis. Do you invest in tools that might be disrupted? Do you over-index on building because it's more flexible? The answer, I think, is to get better at making reversible decisions. Build things that are easy to swap out. Choose systems that integrate well rather than systems that lock you in.

What I appreciated about Nivia's perspective is that she wasn't evangelizing for building everything in-house. She was arguing for clear-eyed analysis of what you're trading. Time to market versus operational flexibility. Maintenance burden versus customization. Dependency risk versus building risk. These are real tradeoffs that deserve real thought.

The SaaS companies that will survive and thrive are the ones that acknowledge this. They're not pretending their tools are irreplaceable. They're building them in ways that make sense for their customers' architectures, not just their own margins.

The hard truth is this: the companies making the best infrastructure decisions right now aren't the ones choosing build or buy. They're the ones asking whether they even understand what they're deciding about.