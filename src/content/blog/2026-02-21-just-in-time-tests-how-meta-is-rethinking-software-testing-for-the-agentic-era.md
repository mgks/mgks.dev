---
title: "Just-in-Time Tests: How Meta Is Rethinking Software Testing for the Agentic Era"
description: "Meta's JiTTests use LLMs to auto-generate bespoke tests per code change, killing false positives and test maintenance overhead in agentic dev workflows."
date: 2026-02-21 00:00:27 +0530
tags: rollup, software-engineering, artificial-intelligence, testing, developer-tools
image: 'https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232'
featured: false
---

There's a quiet crisis happening in software testing right now, and most teams are either ignoring it or haven't quite named it yet. The rise of [AI](https://mgks.dev/tags/artificial-intelligence/)-assisted and agentic coding tools has dramatically accelerated how fast code gets written and merged. That's mostly great. But our testing infrastructure? It was built for a different pace entirely.

Traditional test suites are written by humans, reviewed by humans, and maintained by humans. That works fine when a team ships a few features a week. It starts to crack when an AI agent is generating and merging dozens of changes a day across a large codebase.

Meta has been thinking about this problem and their answer is something they call Just-in-Time Tests, or JiTTests.

## What JiTTests Actually Are

The core idea is surprisingly clean. Instead of maintaining a static suite of tests that has to anticipate every possible future change to the code, you generate tests *on demand*, specifically tailored to the code change that just came in. The moment a pull request is submitted, an LLM looks at the diff, understands what changed, infers what the developer probably *intended* to do, and generates a test designed to catch regressions introduced by that exact change.

No test file to write. No test code to review. No maintenance burden piling up over time.

The type Meta focuses on here is specifically called a "Catching JiTTest." The name is intentional. It's not trying to validate general code quality or enforce style. It's trying to *catch* a bug that this specific change might have introduced. That's a much narrower and honestly more useful goal.

What makes this technically interesting is the intent inference part. Traditional tests are written somewhat blindly toward the future. A developer writes a test today that has to somehow remain meaningful as the codebase evolves in ways nobody can predict. That's why you get so many tests that either never fail, or fail constantly on things that aren't real bugs. Both are expensive.

Because a JiTTest is generated with knowledge of the actual change in front of it, the LLM can reason about what behavior *should* have changed versus what *shouldn't* have. That's a fundamentally different starting point. And it directly addresses the false positive problem, which if you've worked on any reasonably sized codebase, you know is genuinely soul-crushing at scale.

## Why This Matters More Than It Might Seem

False positives in testing are not just annoying. They're corrosive. Once engineers learn that a failing test probably doesn't mean anything, they start ignoring failures. Then you've lost the entire value of having tests in the first place. This is a cultural problem that starts as a tooling problem.

Agentic development makes this dramatically worse. When [AI](https://mgks.dev/tags/artificial-intelligence/) tooling is generating code at scale, the volume of changes hitting your CI pipeline can be enormous. If each of those changes is triggering a bunch of flaky or irrelevant test failures, your engineers are spending their time triaging noise instead of catching real bugs. The economics just don't work.

JiTTests sidestep this by design. Because each test is scoped to one change and generated with an understanding of that change's intent, the signal-to-noise ratio is structurally better. You're not running a thousand tests written three years ago against code that has evolved in completely different directions. You're running a focused test that was written five minutes ago, specifically for this PR.

There's also something worth noticing about the maintenance angle. The ongoing cost of maintaining a large test suite is one of those things that scales badly and invisibly. Nobody budgets for it explicitly. It just slowly consumes engineering time in the form of "why is this test failing again" investigations and "updating tests to match new behavior" tickets. JiTTests don't accumulate that debt because they're ephemeral by nature.

## The Bigger Shift Happening Here

This feels like part of a broader pattern where the [developer tools](https://mgks.dev/tags/developer-tools/) space is being rebuilt from scratch with LLMs as a first-class primitive rather than a bolt-on feature. The old paradigm assumed humans write code, write tests, review both, and maintain both. Agentic development breaks that assumption at the "write code" step. JiTTests break it at the "write tests" step.

What's left is engineers doing what they're actually good at: reasoning about whether a system is behaving correctly, making architectural decisions, and catching the kinds of subtle semantic bugs that no amount of automated tooling reliably surfaces.

I do think there are open questions here. LLM-generated tests are only as good as the LLM's understanding of the codebase, the change, and the intended behavior. For well-documented, straightforward changes that's probably fine. For deeply complex systems with subtle invariants, I'm less sure. There's also a question of test coverage over time. If you only ever test what changed, are you building up blind spots in areas of the code that haven't been touched recently but are still critical?

That said, Meta is solving for a real problem that the industry has been papering over for years. The testing model that worked in 2015 was already showing strain by 2020. In a world where AI agents are shipping code continuously, it needs a proper rethink, not just more of the same at higher volume.

The interesting question isn't whether JiTTests are perfect. It's whether the old approach was ever actually working as well as we told ourselves it was.