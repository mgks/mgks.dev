---
title: "AI Is Quietly Deciding Which Languages Developers Choose Next"
description: "TypeScript just topped GitHub's language charts. The real story isn't the milestone, it's why AI compatibility is silently reshaping every tech decision you make."
date: 2026-02-22 00:00:27 +0530
tags: rollup, open source, artificial intelligence, developer tools, typescript
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674'
featured: false
---

There's a data point buried inside the Octoverse 2025 report that I keep coming back to. In August 2025, TypeScript surpassed both Python and JavaScript to become the most-used language on GitHub. For the first time ever.

That's a big deal on its own. But the number itself isn't the interesting part. What's interesting is *why* it happened, and what it tells us about how developer behavior is shifting in ways we're not fully conscious of.

## Convenience Is the Most Powerful Force in Tech Adoption

We like to believe our technology choices are rational. We pick languages because of performance benchmarks, community size, job market demand, or personal preference built over years of experience. And sure, those things matter. But there's another force at work that's harder to quantify: friction.

When a tool reduces friction, your brain logs that as a positive experience. Do it enough times and it becomes a preference. Do it at scale across millions of developers and it becomes an industry shift.

[Artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) is doing exactly this right now, except faster than any previous tooling change I've seen in my time writing about tech. Eighty percent of new developers on GitHub are using Copilot within their first week. Their baseline for "this feels easy" is being set before they've even built strong habits around any particular stack. That's not a small thing. That's a generation of developers whose instincts are being calibrated by AI-assisted workflows from day one.

## Why Strongly Typed Languages and AI Are a Natural Fit

Here's the technical bit that makes this all click.

When [AI](https://mgks.dev/tags/artificial-intelligence/) generates code, it works better when constraints are clear. In JavaScript, a variable can be anything at runtime. In TypeScript, a declaration like `x: string` immediately eliminates an entire class of possible operations. That boundary matters because it gives the model less ambiguity to navigate. The suggestions come out more accurate, more contextually correct, and less likely to require a follow-up edit to fix something subtle.

Developers experience this as TypeScript suggestions "just working" more often than JavaScript ones. They probably don't consciously think "the type constraints are helping the model." They just notice that the flow feels smoother. And smooth flow gets repeated.

That's the loop. TypeScript is winning not just because it's a better language for large codebases (though it is), but because it happens to align well with how AI code generation works under the hood. The adoption curve is being quietly shaped by a compatibility that most developers never explicitly evaluate.

It's also not just TypeScript. Bash usage is up in a way that nobody would have predicted a few years ago. Shell scripting has always had a reputation for being annoying and error-prone. What changed? AI absorbed most of the syntax frustration. Now developers reach for shell scripts when shell scripts are the right tool, instead of avoiding them because writing them felt painful.

## What This Means If You're Making Architecture Decisions Today

Over 1.1 million public repositories now use LLM SDKs. That's mainstream, not experimental. And those integrations are clustering around the languages and frameworks where AI performs best.

If you're choosing a stack for a new project right now, you're probably factoring in AI tooling support even if you don't realize it. The project that feels easier to set up often feels easier precisely because Copilot is giving you better suggestions, not because the language itself is simpler.

A few things worth thinking about if you're making these calls for a team:

**Set your patterns before you generate anything.** AI is very good at following established structure and not great at inventing clean architecture from scratch. If you lay down three or four well-structured endpoints or components first, the generated code that follows will mirror them. The quality of your foundation gets amplified, for better or worse.

**Type systems are guardrails, not a correctness guarantee.** TypeScript reducing errors is real. But passing the type checker doesn't mean your business logic is right. I've seen TypeScript codebases that compile perfectly and behave incorrectly. Don't let the green checkmark become a substitute for thinking.

**Higher throughput means drift accumulates faster.** If your team is shipping 25-30% more code than before because of AI assistance, that's genuinely great. It also means your architectural decisions spread across the codebase faster. Senior engineering review doesn't become less important when velocity increases. It becomes more important.

**Make your decisions legible to AI.** Architecture Decision Records, detailed READMEs, structured comments. These aren't just good practice for human onboarding anymore. They're context that AI tools use to generate code that aligns with your intent. If your design principles exist only in someone's head, AI has no way to respect them.

## The Broader Shift Happening Across Open Source

The open source ecosystem is sensitive to these kinds of behavioral shifts in ways that proprietary software isn't. When developers choose what to contribute to, what to build libraries for, what frameworks to maintain, those choices accumulate into the infrastructure everyone else builds on.

If AI compatibility is becoming a selection pressure for which technologies developers choose, then it's also becoming a selection pressure for which open source projects grow and which ones stagnate. A framework that doesn't play well with AI tooling is going to see slower contribution rates, not because developers consciously boycott it, but because working on it feels like fighting an uphill battle compared to alternatives.

This is worth paying attention to if you maintain an open source project. How well does your API surface, your type system, your documentation structure support AI-assisted development? That's becoming a real dimension of project health.

## The Awareness Gap

Most of the technology decisions I've seen made in the past year have AI compatibility baked in implicitly. The team picks TypeScript over plain JavaScript and half the reason is "the tooling feels better." Nobody says "our AI code generation works better with strong types." They just feel the difference and make the call.

There's nothing wrong with that. But there's a difference between making a choice because of unconscious friction avoidance and making it with full awareness of what's driving the preference.

Think about the last three technology choices you made. How much of it was driven by how smooth the experience felt with your AI tools versus deliberate evaluation of the tradeoff? If you can't answer that cleanly, the tools might be making more of the decision than you are.

The convenience loop is real, it works, and it's encoding preferences across the entire developer ecosystem right now. The question isn't whether to use [AI tools](https://mgks.dev/tags/artificial-intelligence/) or fight the loop. The question is whether you're aware enough of the loop to steer it toward choices you'd actually endorse on reflection.

Technology decisions have always been path dependent. AI is just making the paths form faster than we're used to.