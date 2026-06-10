---
title: "What I Learned From Meta's PowerOutage Tests on Entire Data Center Regions"
description: "A deep dive into Meta's Instantaneous PowerLoss Storm program and what it means for building resilient infrastructure."
date: 2026-06-10 12:00:13 +0530
tags: rollup, software-engineering, infrastructure, data-center, resilience
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

I've spent a decent chunk of my career thinking about what happens when things break. Not in a paranoid way, but in a "let's actually plan for the worst" kind of way. So when I read through Meta's write-up on their Instantaneous PowerLoss Storm program, I couldn't help but dig deeper. This isn't just another reliability case study. It's a window into how one of the world's largest infrastructure operators prepares for disasters that give zero warning.

## The Problem With Zero Notice Disasters

Most disaster preparedness talks focus on scenarios where you get some advance warning. A hurricane is approaching, a wildfire is spreading, you have hours to spin down services or migrate traffic. That's the comfortable zone. But what happens when the lights just... go out? No warning, no time to gracefully shutdown, just instant power loss across an entire data center region.

Meta's team frames this as the "last line of defense" in their Disaster Readiness program. And honestly, I love that framing. They've spent years building up early warning systems, but they knew they needed something for the scenarios that slip through every crack. We're talking about protecting infrastructure that spans thousands of servers, handles exabytes of data, and runs everything from Instagram to their AI training workloads.

What's fascinating is that they had to build power loss tolerance into every layer of their stack. I'm talking about the mechanical and electrical facilities, server racks, storage systems, compute resources, and up to their container orchestrator called Twine. None of this was an afterthought. It was designed in from day one.

## The Real Nightmare: Bootstrapping a Region

Here's where my brain started hurting. When an entire region loses power, you eventually need to bring it back up. That sounds straightforward until you realize what that actually means. Millions of services trying to start simultaneously, all needing to discover each other, establish trust, and figure out who depends on whom. Without any external help.

This is what they call bootstrapping, and it's a beast.

The first problem they ran into was dependencies. More specifically, circular dependencies. Their Twine orchestrator has a set of control plane services: Scheduler, Allocator, Broker, Zelos (the coordinator), and others. These services are required to start anything else in the region. So if Service A needs Service B to start, and Service B needs Service A, you have a classic chicken and egg problem. Meta calls this the "ouroboros" risk, named after the ancient symbol of the snake eating its own tail.

Their solution was fascinating. They used something called Belljar tests in their CI/CD pipelines to continuously detect these dependency issues early. That's the preventive approach. But they also built a "Twine recovery kit" with a "jumpstart" capability for breaking any unexpected circular dependencies that somehow make it to production. Belt and braces approach, as they put it.

I respect that level of paranoia in system design.

## The Boomerang Problem

Just when they thought they had handled the dependency issue, another strange problem emerged. They were using unavailability events (UEs) to orchestrate shutdown and recovery of services during these power events. But here's the thing: those very signals ended up shutting down the orchestrator control plane services themselves.

Think about that for a second. The system designed to handle the disaster becomes a victim of its own disaster response mechanism. The services that were supposed to coordinate recovery got orphaned because they never received the UE needed to properly shut down or be managed.

Their solution was surprisingly elegant rather than adding complex exclusion lists or intricate filtering logic. They simply allowed control plane services to ignore shutdown signals related to power-related unavailability events. Sometimes the straightforward approach wins over the clever one.

## Balancing Reliability With Engineering Reality

Now here's where I think every engineer and infrastructure lead should pay attention. Meta explicitly acknowledges that building watertight tolerance to instant power loss is theoretically possible but comes with real costs. You could overengineer everything, but that introduces its own risks, including false positives that impact regular operations.

They drew clear lines on what impacts must be avoided. Data loss in storage and database systems, permanent damage to facilities, or sustained impact beyond a single region were non-starters. These were table-stake requirements. On the other hand, transient service errors, individual rack failures within acceptable thresholds, and bounded staleness in routing tables were deemed tolerable. The key discriminator was whether the issue could be addressed through post-incident remediation within a reasonable response time.

This is such an important lesson. Not everything needs to be perfect all the time. You need to think about what tradeoffs make sense for your specific context. For a company running [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) workloads at Meta's scale, the calculus is different than for a startup running on cloud infrastructure.

## Testing in Production (Carefully)

One of the trickiest parts of all this is validating your disaster preparedness without causing an actual disaster. You can't just power down a major production region and see what happens. That's not a test, that's an incident.

Meta's approach was beautifully incremental. They started by validating self-contained problems like dependency detection in new pre-production regions. Then they ran tests in "shadow" regions that replicated production setups. Only after building confidence did they move to their newest (and smallest) production regions with limited blast radius. Eventually, they tested in large production regions housing critical storage, AI, and data warehouse workloads.

Each exercise trained both their infrastructure and their engineers incrementally toward the long-term goal of handling region loss as gracefully as losing a smaller fault domain.

## What This Means For The Industry

Here's where my opinion comes in strongly. I think this kind of testing paradigm should become standard practice for any organization running critical infrastructure at scale. The fact that Meta is open-sourcing much of their approach and sharing these lessons publicly is a gift to the community.

The really interesting part is how this connects to modern AI infrastructure. As organizations rush to deploy [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) capabilities, they're building out unprecedented amounts of specialized infrastructure. That infrastructure needs the same level of resilience thinking, not as an afterthought but as a fundamental design requirement. Meta explicitly mentions that their infra has been evolving rapidly to meet AI use cases, and reliable recovery capabilities have enabled them to innovate faster.

Reliability and velocity aren't opposites. They're two sides of the same coin. You can't have one without the other, and building robust disaster recovery isn't about playing it safe, it's about enabling bold moves.

The next time you're designing a system that needs to run at scale, ask yourself: what happens when everything fails at once, and there's no time to react?