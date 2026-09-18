---
title: "Rewriting 800K Lines with AI Agents: What We Learned"
description: "GitHub rewrote the Copilot agent runtime from TypeScript to Rust using AI agents. Here's what that massive migration reveals about the future of large-scale rewrites."
date: 2026-09-18 06:00:20 +0530
tags: rollup, open-source, ai-agents, rust, devops
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
featured: false
---

## The Rewrite That Changed How We Think About Rewrites

I've watched teams attempt massive codebases rewrites before. They typically follow a predictable pattern: months of planning, heated debates about architecture, a carefully orchestrated cutover that keeps everyone anxious for weeks, and inevitably, regressions that haunt you in production for months after.

Then GitHub decided to rewrite the Copilot agent runtime from 430,000 lines of production TypeScript into 800,000 lines of production Rust. And here's the part that gets me: AI agents wrote most of it.

A single developer, with AI assistance, completed what would have historically required a whole team for one to two years. The runtime shipped incrementally across 128 pull requests. The performance improved by orders of magnitude. Regressions happened, sure, but they got caught and fixed quickly along the way.

This isn't hype. This is what happens when you actually let AI agents handle the mechanical work of porting code while your team focuses on the architecture and domain logic.

## Why Rust? Why Now?

The original architecture had a real problem. The TypeScript-based runtime lived inside the Copilot CLI, which then got wrapped in a JSON-RPC protocol to create an SDK. Every time an application created a CopilotClient, it spawned a new Node.js process. That meant:

Minimum 100 MB of working set per client just for V8. Every function call crossed a process boundary. A crash in Node took your entire session. Startup times that added up when you were deploying at scale.

For a runtime that now powers the Copilot CLI, the Copilot app, VS Code, Visual Studio, Excel, Outlook, PowerPoint, Word, and more, those constraints became untenable.

Rust solved the hard requirements: embedding through a C ABI, predictable startup times, low memory overhead, and resource efficiency. But this wasn't a "Rust is always better" situation. It was the right tool for this specific architecture.

## How the Port Actually Happened

Here's what fascinates me about this approach: they didn't do a big bang rewrite. They ported in place, incrementally, with 128 PRs landing in main and shipping along the way.

Think about what that means for risk management. Instead of coordinating a massive cutover where everything changes at once, you get continuous validation. Regressions surface early. You catch performance regressions, lifecycle bugs, and edge cases before they ship to millions of developers.

The team initially estimated 130,000 lines to port. The actual number was 430,000 lines of TypeScript that moved through the port, while the team continued adding new Rust code and removing old TypeScript in parallel. The line counts appeared stable on the graph, but that stability masked massive churn underneath. The incoming Rust was climbing, the outgoing TypeScript was accumulating, and the old TypeScript kept getting updated with new features.

For a detailed look at how [large-scale refactoring works at modern companies](https://mgks.dev/tags/large-scale-refactoring/), this is a masterclass.

## What This Means for the Industry

I think there are three things here that matter beyond just this specific project.

First, AI agents are now viable for mechanical code transformation at scale. Not just refactoring a single function or writing boilerplate. We're talking about porting nearly half a million lines with minimal human rework. That's a fundamental shift in what's possible.

Second, the architecture matters more than the language. The team didn't just rewrite TypeScript to Rust. They decoupled the UI from the runtime, properly separated concerns, and built a shared runtime that multiple products could consume cleanly. The language change enabled better architecture, but the architecture change is what actually solved the problem.

Third, incremental shipping of large rewrites reduces risk dramatically. You don't have to choose between "complete it all at once" or "maintain two codebases in parallel." You can port in place, validate continuously, and ship as you go.

For developers working on platforms and infrastructure, this has real implications. If you're considering a rewrite of something critical, look at whether you can port incrementally. Look at whether AI can handle the mechanical work. Look at whether your architecture will actually improve, not just your language choice.

The Copilot agent runtime is now embedded in a dozen different Microsoft products. A rewrite that slow, risky, or error-prone would have been unthinkable six months ago. Now it's something a small team can pull off with AI assistance, learning about [how to build security into everything across the developer lifecycle](https://mgks.dev/tags/devsecops/) along the way.

When the industry figures out how to apply this pattern to other massive legacy systems, we might actually start seeing progress on some of the codebases that have been stuck in stagnation for years.