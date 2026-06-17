---
title: "How Meta Cracked the Zero-Notice Disaster Problem: Instantaneous PowerLoss Storms"
description: "Inside Meta's extreme disaster testing and how they solved the ultimate chicken-and-egg problem"
date: 2026-06-18 00:00:13 +0530
tags: rollup, software-engineering, data-infrastructure, artificial-intelligence
image: "https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070"
featured: false
---

I've spent a lot of time thinking about what happens when everything fails all at once. Not gradually, not with warning, but in an instant. In the world of data center infrastructure, that's not a hypothetical question. It's a certainty that will eventually arrive, whether you like it or not.

Meta has been running their Disaster Readiness "Storm" program for years, and they've built solid early warning systems for hurricanes, wildfires, and those annoying power supply disruptions that give you a few hours to react. But as their infrastructure scaled, they realized something unsettling: traditional DR strategies weren't cutting it anymore. The infrastructure had grown too massive, too complex, and the old fault domains that once seemed like reasonable boundaries for testing were now laughably small compared to what a full region looks like.

What they needed was a way to test for zero-notice disasters, the kind that strike without any warning at all.

## The PowerLoss Storm Concept

The term "Instantaneous PowerLoss Storm" sounds dramatic, and honestly, it should. We're talking about deliberately injecting a power supply fault that causes immediate de-energization of an entire data center region. That's 50 to 60 times larger than the typical fault domains they'd been testing against for years.

The key insight behind this program is something I've seen time and again in infrastructure engineering: you can only move fast if you have strong foundations. Reliability and velocity aren't opposing forces. They're two sides of the same coin. You simply cannot have one without the other.

Building tolerance for instant power loss required Meta to fundamentally rethink their entire DC stack, from the mechanical and electrical facilities all the way up to their Twine container orchestrator. Each layer needed power loss tolerance baked in from the start, not bolted on afterward.

One clever capability they developed involves using batteries and something called Power Loss Siren (PLS) to persist in-memory data when racks lose power. Another piece is a region-wide asynchronous signaling mechanism using unavailability events (UE) that lets Twine services coordinate shutdown and recovery. These worked beautifully within single fault domains, but scaling them to encompass an entire region revealed gaps they hadn't anticipated.

## The Bootstrap Nightmare

Here's where things get really interesting. When you power off an entire region, you face the challenge of bootstrapping millions of services that all need to start simultaneously and discover each other autonomously. That's not a small problem. It's arguably the hardest distributed systems challenge you'll ever face.

The first monster they encountered was the dreaded circular dependency, what they vividly call the "ouroboros" risk. Their Twine orchestrator has a set of control plane services including the Scheduler, Allocator, Broker, and Zelos coordinator. Without these, nothing else can run. But here's the catch: these services need each other to start. It's a chicken-and-egg problem that makes my brain hurt just thinking about it.

During regular operations, the risk of circular dependencies is relatively low. But during a full region bootstrap? The risk and impact are dramatically higher. Imagine millions of services all trying to start at once, each waiting on another, each dependent on services that themselves are struggling to come online.

Meta's solution involved two complementary approaches. First, they built Belljar tests into their CI/CD pipelines that continuously detect critical startup dependencies among control plane services. These tests catch dependency issues before they ever reach production. Second, as a belt-and-braces solution, they created a Twine recovery kit that provides a "jumpstart" capability to recover Twine services that power Twine itself. Together, these tools have essentially eliminated the threat of circular dependencies.

## The Boomerang Problem

Just when they thought they had things figured out, another issue surfaced that I'm particularly fascinated by: the boomerang problem. This occurs when the generator of a critical signal gets impacted by that same signal.

The unavailability events used to orchestrate shutdown and recovery were so effective that they ended up shutting down the orchestrator control plane services themselves. The result was orphaned services that couldn't be reaped because they'd never received the UE. Imagine firing a missile to defend yourself, only to have it circle back and blow up your own command center.

The complex solution would have been excluding a preset list of services from the UE dispatch list. Instead, Meta took a simpler path that I think reflects good engineering judgment: they allowed control plane services to simply ignore shutdown signals associated with power-related unavailability events. Sometimes the elegant solution is the straightforward one.

## The Tradeoff Calculus

This is where things get philosophical. You could theoretically build watertight tolerance to instant power loss, but that approach carries significant opportunity costs. Either you overengineer your systems, introducing new complexity that creates its own failure modes, or you accept that some tradeoffs are necessary.

Meta drew a clear line on what impacts must be avoided. Data loss in storage and database systems was a non-starter. Permanent damage to mechanical or electrical facilities was unacceptable. Sustained impact beyond a single region would be catastrophic. These became their table-stake requirements.

On the other hand, transient service errors, rack failures within predefined thresholds, and bounded staleness in service routing tables or region unavailability detection were deemed tolerable risks. The reasoning here is smart: if something can be fixed through post-incident remediation within a reasonable mean time to respond, it doesn't need to be architecturally prevented at all costs.

This mindset represents a maturation of how we think about reliability. Not every failure needs to be prevented. Some need to be survived, recovered from, and learned from.

## Testing at Scale

Now here's the really bold part. How do you validate your ability to handle losing an entire region? You can't just flip the switch in production and hope for the best. That's the chicken-and-egg problem of needing to take risks to address risks.

Meta's incremental approach was brilliant. They started by validating self-contained problems like dependencies when turning up new pre-production regions. Then they ran tests in "shadow" regions that replicated production setups. Only after those smaller experiments succeeded did they move to testing their newest and smallest production regions with limited blast radius. Finally, they powered off large production regions housing critical storage, artificial intelligence, and data warehouse workloads.

This incremental approach mirrors how we should think about all high-risk changes in our systems. Start small, validate assumptions, then progressively tackle harder scenarios.

## What This Means for the Industry

The infrastructure that Meta has built to recover from instantaneous failures has become a foundation for innovation. It's enabled them to explore new data center designs, validate reliability improvements in lockstep with rapid capacity deployments, and push the boundaries of what risks they can tolerate.

As their infrastructure continues evolving to meet the demands of capacity and AI workloads, these capabilities become even more critical. The ability to handle region failures as seamlessly as sub-regional fault domains is a game changer for how we think about building resilient systems.

I keep coming back to that fundamental truth: you cannot have velocity without reliability. The two are inseparable. Every shortcut taken on reliability will eventually become a wall you crash into at high speed. And conversely, obsessing over perfection in every failure scenario will leave you paralyzed, unable to ship anything meaningful.

What Meta has accomplished with PowerLoss Storms represents a pragmatic middle ground that more teams should study. It's not about eliminating all risk. It's about understanding what risks matter, building the capabilities to survive the critical ones, and having the institutional knowledge to recover quickly from everything else.

That balance is what separates resilient systems from fragile ones.