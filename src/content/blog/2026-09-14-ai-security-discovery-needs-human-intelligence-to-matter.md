---
title: "AI Security Discovery Needs Human Intelligence to Matter"
description: "Sam Curry on why AI finds vulnerabilities faster than ever, but building resilient infrastructure and shifting security left is how teams actually stay ahead."
date: 2026-09-14 00:00:20 +0530
tags: rollup, software-engineering, security, ai, zero-trust
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

I've been thinking a lot lately about the asymmetry in security. AI can scan for vulnerabilities at superhuman speed, but that speed only matters if we know what to do with what it finds. Sam Curry, Chief Security Officer at Zscaler, frames this problem differently than most security vendors I talk to. When we spoke at Ai4, he didn't lead with AI detection rates or threat intelligence dashboards. He led with a harder question: where does human judgment actually sit in the security stack anymore?

The premise stuck with me. We're at an inflection point where machine learning can identify exploitable patterns in code and infrastructure faster than a human ever could. But the real work, the part that actually prevents breaches, is deciding what to do about it. That's where human intelligence becomes the scarce resource, not the common one.

## The Speed Trap

One of the most interesting points Sam raised is that traditional security approaches treat vulnerability discovery and response as separate problems. You run a scan, you get a report, you triage it, you (hopefully) fix it. With AI in the loop, that workflow breaks down because the volume of findings becomes overwhelming. An AI can generate thousands of potential attack vectors in the time it takes a human to read the executive summary of a penetration test.

The insight here is subtle but important: shifting security closer to the application layer, rather than treating it as a network perimeter problem, forces the discovery process to be more selective. When you're enforcing zero trust architecture and pushing security inspection right up against your workloads, you're not just catching threats earlier. You're reducing the false positive noise that buries the signal.

This matters for development teams because it changes where the responsibility sits. If security is a network problem, it's IT's problem. If security is an application problem, it becomes an engineering problem. And frankly, engineers are better positioned to understand what matters and what's noise in their own code.

## Building for Resilience, Not Just Detection

Here's where I think Curry's perspective diverges most sharply from the typical AI-as-savior narrative in security. He's focused on building resilient infrastructure, not just better intrusion detection. The distinction is crucial.

AI will find vulnerabilities. That's its job. The question is: what kind of infrastructure do you have when it does? If your code is tightly coupled, your dependencies are deeply nested, and your failure modes are catastrophic, then every vulnerability AI discovers is a potential breach. But if your infrastructure is built with resilience in mind - if you've designed for graceful degradation, if you compartmentalize functionality, if you treat secrets and access like they're toxic - then a discovered vulnerability becomes manageable. It becomes a bug to fix, not a existential threat.

This is where [security fundamentals](/tags/infrastructure/) actually compound over time. The teams that are going to thrive in an AI-augmented security landscape aren't the ones betting everything on the next detection tool. They're the ones investing in [clean architecture](/tags/zero-trust/) and thoughtful dependency management. They're the ones building systems that can tolerate failure.

## The Human Layer

What struck me most about the conversation was Sam's insistence that human judgment still matters. Not for finding vulnerabilities (AI wins there decisively) but for understanding context. Why does this vulnerability matter in this system? What's the blast radius? How does it interact with the rest of the infrastructure? Those are questions that require domain expertise and architectural understanding.

This suggests a future where security teams don't spend cycles on busywork triage but instead focus on threat modeling, architectural review, and strategic decisions about where to invest resilience. That's actually a more valuable use of human expertise than the status quo, where much of security engineering is rote pattern matching.

For developers, the implication is clear: security is moving closer to code, and that's not entirely a burden. It's an opportunity to build systems that are genuinely robust, not just ones that pass a compliance checklist.

The real question we should be asking isn't whether AI will find the vulnerabilities before humans do. It's whether we'll build systems that can survive having them.