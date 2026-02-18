---
title: "Just-in-Time Tests: When AI Writes Your Tests Right Before Deployment"
description: "Meta's Catching JiTTests use LLMs to auto-generate tests on-demand, targeting regressions without maintenance overhead. A radical shift in testing philosophy."
date: 2026-02-19 00:00:56 +0530
tags: rollup, software-engineering, artificial-intelligence, testing, llm
image: 'https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070'
featured: false
---

I've been thinking a lot about how [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) is changing the way we write code, but I hadn't really stopped to consider what it means for testing. Meta just dropped something called Catching JiTTests that honestly feels like it's from a different era of software development. The premise is wild: instead of maintaining a suite of tests that get more bloated and brittle over time, you let an [LLM](https://mgks.dev/tags/llm/) generate tests on the fly when you submit a pull request.

The timing makes sense when you think about it. If AI agents are churning out code faster than we ever could manually, our traditional testing infrastructure becomes the bottleneck. I've worked on codebases where the test suite took longer to run than writing the feature itself, and half the time you'd get flaky failures that meant nothing. The maintenance burden alone is crushing for most teams.

## The Old Way Is Breaking Down

Traditional testing operates on this assumption that you can predict what might break in the future. You write tests for current behavior and hope they catch regressions down the line. But here's the thing: you're essentially guessing. You don't know what changes someone will make six months from now, so you write defensive tests that either catch nothing or worse, flag legitimate changes as failures.

I've seen this play out dozens of times. A developer makes a perfectly valid change, the test suite explodes with red, and now you're in this annoying dance of figuring out which failures are real bugs versus which tests just need updating. With agentic development ramping up the pace of code changes, this problem goes from annoying to completely untenable.

The false positive problem is particularly brutal. When your CI pipeline cries wolf too often, engineers start ignoring test failures altogether. I've been on teams where we'd merge PRs with failing tests because "oh, those always fail" or "that's just a flaky test." At that point, what's even the point?

## How Catching JiTTests Actually Work

The core insight here is almost embarrassingly simple once you hear it: generate tests that are specific to the exact change being made, not generic tests that try to cover all possible futures. When you submit a PR, an LLM analyzes your diff, infers what you're trying to do, and generates tests targeted at finding regressions in that specific change.

This is fundamentally different from existing [AI-powered testing](https://mgks.dev/tags/testing/) tools that just auto-generate a traditional test suite. Those still require maintenance, still accumulate cruft, still suffer from the same false positive problems. Catching JiTTests are ephemeral by design. They exist only to validate one specific change, then they're gone.

The LLM's ability to infer intent is doing a lot of heavy lifting here. If it can understand what you're trying to accomplish with a code change, it can simulate potential faults that might arise from that specific modification. It's not trying to cover every edge case in your entire codebase. It's asking: "given what this developer seems to be doing, what could go wrong right now?"

Meta claims these tests require no code review and no maintenance. That's a bold claim, and honestly, it makes me a bit skeptical. But the logic tracks. If the test is generated, run once, and discarded, there's nothing to maintain. And if the LLM is sophisticated enough to minimize false positives by understanding intent, maybe you really don't need human review of the test code itself.

## What This Means for How We Build Software

I think we're watching a fundamental shift in what testing even means. For decades, we've operated under the assumption that more tests equals better quality. We measure code coverage, we write unit tests and integration tests and end-to-end tests, we build these elaborate testing pyramids. But what if that entire framework was just a workaround for not being able to predict the future?

The traditional approach made sense when humans were writing all the code at human speeds. You could afford to invest time in a comprehensive test suite because changes happened slowly enough that maintenance was manageable. But when AI agents are shipping multiple PRs per hour, that calculus completely breaks down.

What's interesting to me is how this inverts the normal testing workflow. Instead of writing tests first or alongside your code, the tests appear after you've written the code but before it merges. It's almost like having an extremely paranoid coworker who spins up custom scenarios to try breaking your specific changes, then disappears.

The skeptic in me wonders about coverage gaps. What about the interactions between changes over time? What about the regression that doesn't appear until three different PRs have all merged? Traditional test suites, for all their flaws, at least provided some continuity. These JiTTests are inherently point-in-time validations.

But maybe that's fine. Maybe we've been over-indexing on comprehensive coverage when what we really need is targeted validation of changes as they happen. And nothing stops you from keeping some traditional tests for critical paths while using JiTTests for the bulk of your changes.

## The Economics of Testing in an Agentic World

There's a resource angle here that Meta isn't emphasizing but seems crucial. Running LLMs to generate tests on every PR isn't free. Neither is executing those generated tests. But compare that cost to the human cost of writing, reviewing, and maintaining a traditional test suite, especially when AI is dramatically increasing the volume of code changes.

I suspect we'll see a new category of tooling emerge around this. Companies will need infrastructure to manage LLM-generated test execution, aggregate results, tune the models to their specific codebases, and handle the occasional weird failure mode when the LLM misunderstands intent.

The false positive minimization is probably the make-or-break factor. If these tests cry wolf even 10% of the time, they'll get ignored just like traditional flaky tests. Meta claims they've solved this through "sophisticated techniques" and intent understanding, but I'd want to see real-world numbers from teams using this in production.

What happens when the LLM is just wrong about what you intended? Does it generate tests that validate incorrect behavior? How do you catch that without reviewing the generated test code, which defeats the whole purpose?

## Testing Theory Gets Rewritten

This really does feel like a paradigm shift, not just an incremental improvement. We've spent decades building up testing best practices, design patterns, frameworks, and philosophies. The idea that you could just... not maintain tests? That the tests themselves are disposable? It violates something fundamental about how I was taught to think about software quality.

But maybe that's the point. Maybe the old mental models only made sense in the old constraints. When you have AI that can understand code and generate tests on demand, maintaining a permanent test suite starts to look like premature optimization.

I'm curious how this plays with other testing approaches. What about property-based testing? Mutation testing? Fuzzing? Do those become obsolete, or do they complement JiTTests by catching different categories of bugs?

The cultural shift might be harder than the technical one. Convincing engineers to trust auto-generated tests that aren't reviewed and only run once feels like a tough sell. We've been trained to be paranoid about test quality, and for good reason. Letting an LLM handle that without human oversight requires a different kind of trust.

I keep coming back to this question: if we're generating tests automatically based on code changes, and AI agents are writing the code changes, are we just watching two AIs have a conversation about whether code is correct while humans occasionally peek over their shoulders?