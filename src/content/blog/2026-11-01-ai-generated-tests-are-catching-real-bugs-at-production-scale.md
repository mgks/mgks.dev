---
title: "AI-Generated Tests Are Catching Real Bugs at Production Scale"
description: "Meta's Catching JiTTests demonstrate how LLMs can generate executable tests that catch bugs before code lands, achieving 60% true positive rates and preventing 20% of privacy incidents."
date: 2026-11-01 00:00:20 +0530
tags: rollup, software-engineering, testing, ai-assisted-development, code-quality
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
featured: false
---

I've been following Meta's work on Just-in-Time Tests (JiTTests) for a while now, and I have to say, this is one of the more pragmatic applications of LLMs I've seen in software engineering. Not because it's flashy or revolutionary in theory, but because it actually works at scale and catches real bugs that traditional testing misses.

The core insight here is deceptively simple: instead of having an LLM review code like a human reviewer would, generate executable tests that prove a behavioral difference exists. These tests either pass or fail. No ambiguity. When you're running hundreds of millions of lines of code constantly evolving, that determinism matters.

## The Testing Problem at Scale

Here's the reality that most engineers outside massive organizations don't fully appreciate: at Meta's scale, traditional testing simply can't keep pace. You can't manually review every diff. You can't run every possible test combination. Code changes compound, complexity grows, and eventually your testing infrastructure becomes a bottleneck rather than a safety net.

What Meta has done with Catching JiTTests is create a system that runs overnight on spare capacity, identifies risky diffs using something akin to a Diff Risk Score, and then generates tests specifically designed to expose behavioral differences introduced by those changes. In the first half of 2026, this caught 74 serious privacy bugs at the diff stage, reducing overall privacy incidents by 20%.

That's not a research result. That's production impact.

## The Two-Pronged Approach

What impressed me most is how they handle the inherent ambiguity of LLM-generated tests. They use two complementary workflows:

The "dodgy diff" workflow treats each change as a mutant and generates tests to distinguish the modified behavior from the original. It's brute force in the best way: maximize the pool of potential catches and hope strong signals emerge.

The "intent-aware" workflow is more sophisticated. An LLM infers what the diff is trying to accomplish by analyzing the code changes, diff title, and summary. Then it describes the risks, constructs mutants representing potential bugs, and generates tests to catch those specific scenarios. It's essentially asking: "If someone tried to implement this feature, what could go wrong?"

Then comes the filtering problem.

## Reducing False Positives Without Sacrificing Velocity

Here's where I think Meta cracked something important: they didn't try to make perfect judgments at scale. Instead, they combined LLM-as-Judge (an ensemble approach aggregating multiple state-of-the-art models) with RubFake, a rule-based system providing deterministic, verifiable judgments.

The LLMs handle semantics and nuance. The rules handle reproducibility and verification. Together, they rank weak catches and decide which ones warrant human review.

And critically, Meta moved away from human-in-the-loop (humans review everything) toward human-on-the-loop (humans set criteria and review outcomes at aggregate level). This is the move that actually lets this scale without grinding engineering velocity to a halt.

Five hundred eighty-nine engineers engaged with the system. Sixty percent of their findings were true positives. That's a signal strong enough that engineers actually trust the output and act on it.

## What This Means for the Industry

I think about this differently now than I did even a year ago. [AI-assisted development](https://mgks.dev/tags/ai-assisted-development/) is happening whether we like it or not. Agentic systems will write code faster. Deployment velocity will increase. The question isn't whether that happens; it's whether we can build testing infrastructure that keeps pace.

Meta has shown a concrete answer: generate tests automatically, run them concurrently, use ensemble judgment to filter noise, and trust human engineers to set policy rather than review every output.

This pattern probably generalizes. I see it applying to other types of automated verification, security scanning, performance regression detection. The underlying principle is sound: let AI handle execution, let rules handle determinism, let humans handle policy.

But here's what I'm really thinking about: if JiTTests can catch 60% of real bugs before code lands, what's actually happening to software quality across the industry right now while most of us are still relying on traditional testing?

Maybe the real question isn't whether AI can help us test better, but whether we can afford not to adopt these approaches as the pace of development continues to accelerate across [code-quality](https://mgks.dev/tags/code-quality/) practices everywhere.