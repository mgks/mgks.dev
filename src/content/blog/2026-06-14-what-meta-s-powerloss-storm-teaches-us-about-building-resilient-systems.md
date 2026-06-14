---
title: "What Meta's PowerLoss Storm Teaches Us About Building Resilient Systems"
description: "How Meta tests for zero-notice disasters and why it matters for every engineer building distributed systems."
date: 2026-06-14 12:00:13 +0530
tags: rollup, software-engineering, infrastructure, reliability, ai
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

When I first started thinking about disaster preparedness in infrastructure, I assumed we were mostly talking about things like early warning systems for hurricanes or fire suppression in data centers. These are the kind of threats where you have hours, sometimes days of advance notice. You can gracefully drain workloads, migrate traffic, and batten down the hatches. The playbook is well-established.

But Meta's team was dealing with a different beast entirely. They needed to prepare for what they call "zero-notice disasters" scenarios where power just disappears. No warning. No time to act. The entire region goes dark, and millions of services need to come back up somehow, discovering each other and reorganizing without any human intervention. That's not a typical DR scenario. That's a whole different ball game.

## The Last Line of Defense

What caught my attention in their write-up was this concept of the "Instantaneous PowerLoss Storm" within their broader Disaster Readiness program. Think about what this means for a moment. You've got a region basically a cluster of data center buildings sharing power and network infrastructure that suddenly has zero electricity. Everything goes down. Not just one rack or one building, but the whole region.

Now, here's where it gets really interesting from a systems design perspective. Each individual component in Meta's stack was already designed to handle power loss gracefully. Storage systems, compute clusters, the Twine container orchestrator all had some level of tolerance built in. But that tolerance was tested and hardened only within single fault domains. When you zoom out to an entire region, all those assumptions start falling apart.

The scale difference is staggering. A typical region is 50 to 60 times larger than the individual fault domains they were used to dealing with. But it's not just about having more servers. It's about the complexity of autonomously bootstrapping millions of services that all need to start at once and find each other. That's a massive coordination problem, and it was keeping their team up at night.

## The Dependency Nightmare

One of the most fascinating challenges they faced was something I've seen bite countless teams building distributed systems: circular dependencies. Their Twine orchestrator has a set of control plane services the Scheduler, Allocator, Broker, Zelos coordinator that everything else depends on. You literally cannot start any other service in the region without these running first.

During normal operations, this isn't a huge deal because everything is already up and running. But when you're trying to boot an entire region from scratch, you hit a classic chicken and egg problem. Service A needs Service B to start. Service B needs Service C. Service C needs Service A.

Meta attacking this with something called Belljar tests in their CI/CD pipelines, which continuously detect these dependency issues before they hit production. That seems like a solid approach, but I love that they went further. They built a "Twine recovery kit" to actually break these circular dependencies if they somehow manifest in production. That's the belt-and-braces mentality that separates good infrastructure teams from great ones.

## The Boomerang Problem

Just when I thought they'd solved the worst of it, they encountered another delightful issue called the "bo boomerang" problem. They had this system of unavailability events (UEs) that would signal to services that they needed to shut down or recover. But the system that generated these critical signals was itself affected by the same signals it was sending. So you'd end up with orphaned services that could never be properly shut down because the shutdown mechanism took itself offline.

Their fix was surprisingly elegant rather than building complex exclusion lists of services that should never receive these signals, they just let the control plane services ignore shutdown signals related to power events. Simple, sustainable, and much easier to reason about than adding more complexity to an already complex system.

## What's Actually Worth Protecting

Here's where I think every infrastructure engineer should pay attention. Meta made some deliberate tradeoffs about what they're willing to accept as tolerable damage during these events.

Data loss in storage and database systems? Not acceptable. Permanent damage to facilities? Also a hard no. Anything that affects multiple regions? Definitely out of bounds.

But transient service errors? Rack failures within certain thresholds? Slight staleness in routing tables or detection systems? These were deemed tolerable. The key insight is that they drew the line at problems that can't be fixed through post-incident remediation within a reasonable response time. Everything else, they accept as the cost of doing business at massive scale.

I think this framework is actually really useful for the rest of us. Not every failure mode needs to be architecturally eliminated. Sometimes it's better to accept a class of failures and have good recovery procedures instead of building incredibly expensive prevention mechanisms that themselves introduce complexity and risk.

## Testing Through Incremental Risk

One thing that impressed me was their incremental approach to validation. They wasn't about to just flip the switch on a major production region and see what happens. Instead, they built up confidence through multiple stages.

First, they tested self-contained problems in new pre-production regions. Then they ran tests in "shadow" regions that exactly replicated production. Only after that did they touch their smallest production regions with limited blast radius. Eventually they worked up to powering off large production regions housing critical storage, AI, and data warehouse workloads.

This is exactly how we should think about rolling out risky changes in any system. Each step teaches you something, and each success builds confidence for the next bigger test.

## The Bigger Picture

What strikes me most is the philosophy underlying all of this. Meta sees reliability and velocity as two sides of the same coin. You can't innovate fast if your foundation is shaking. But you also can't build strong foundations without pushing the envelope and testing your limits.

The ability to recover from instantaneous regional failure has become a foundation that lets them innovate in data center designs, deploy capacity rapidly with built-in reliability, and tolerate risks that would have seemed unacceptable before. If you're working on distributed systems, there's something deeply relevant here about how to think about failure at scale.

I'm certainly going to take a harder look at the dependency graphs in systems I work on, and I hope you'll do the same.