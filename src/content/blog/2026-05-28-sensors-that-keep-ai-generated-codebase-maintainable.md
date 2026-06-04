---
title: "Sensors That Keep AI-Generated Codebase Maintainable"
description: "How I used linters, coupling metrics, and mutation testing to help AI agents self-correct and maintain code quality over time"
date: 2026-05-28 00:00:15 +0530
tags: rollup, architecture, artificial-intelligence, testing
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

I recently rebuilt an internal analytics dashboard from scratch using AI coding agents. TypeScript, NextJS, React, a backend that pulls data from various APIs and presents it in a web frontend. The usual stuff. But this time I wanted to focus on something different: I wanted to see if I could keep the codebase maintainable without writing any guides or documentation for the AI. No markdown files explaining code quality. Just sensors. Sensors that run continuously and give the agent feedback so it can course-correct on its own.

The premise was simple. Internal quality matters whether a human or AI writes the code. A tangled codebase makes AI agents look in the wrong place for implementations, create inconsistencies, or load way more context than they should. I wanted to catch those problems early, ideally before they reached my eyes.

## Where Sensors Live

I categorized my sensors into three groups based on when they run.

Session sensors run alongside the agent during development, giving fast feedback while the agent is still in the flow. The same checks run again in CI on clean infrastructure to confirm nothing slipped through. Then there are schedule-based sensors that run weekly or monthly to catch drift that accumulates slowly, like coupling getting worse over time.

Let me walk through what I actually set up.

## ESLint as a First Line of Defense

I started with ESLint because it's the most obvious candidate. Basic linting targets maintainability at the file and function level. I focused on rules that catch common AI failure modes. The biggest wins were detecting excessive function length, too many imports in a single file, and cyclomatic complexity that spiraled out of control.

These weren't even enabled in ESLint's default preset. I had to configure maximums for them manually. That was a bit surprising honestly. You'd think tool maintainers would have tuned these defaults for modern usage, but they haven't caught up to the reality of AI-assisted coding yet.

Here's the interesting part though. A sensor is only useful if it helps the agent actually fix the problem. So I built a custom ESLint formatter that overrides the default messages with something more helpful. Instead of just saying "no-explicit-any," the message now includes guidance on what to do about it.

My message for the no-explicit-any warning tells the agent it's allowed to suppress the warning with a comment if it has a good reason, but it needs to document why. This keeps suppressions visible and reviewable. Before, teams avoided these warnings because suppressing them one by one felt tedious. Now the agent can make a judgment call and move on.

For threshold rules like max-lines-per-function, I told the agent it can slightly increase the threshold if refactoring would be unnecessary in that specific case. This isn't a permanent suppression, just a bump that lets the rule fire again if things get worse. It avoids the binary choice of "suppress or comply."

The cost-benefit balance of static analysis has shifted dramatically. It's cheaper to create custom rules with AI, and the benefit has increased because AI makes different mistakes than humans. Little hygiene issues happen more frequently with AI, so the feedback actually gets used. The downside is the risk of a false sense of security. Linters catch syntax and complexity, but they miss semantic issues that require understanding what the code actually does.

## Going Beyond Files: Modularility Sensors

Basic linting works within a file, but maintainability also depends on how modules relate to each other. That's where things get trickier.

I experimented with dependency-cruiser to enforce layer boundaries. The app had a clients folder, services folder, and web UI folder. I asked the agent to help me write rules that would prevent code in the clients folder from importing anything from services.

The tool was surprisingly effective at cleaning up messiness that had already accumulated. Once I introduced these rules, the agent could spot violations and fix them going forward. It's a nice replacement for describing architecture in a markdown guide because the rule itself documents the constraint.

But dependency-cruiser is limited to what imports and file paths express. It can't capture semantic relationships or business logic boundaries.

So I went further and built my own coupling analysis tool. I had an agent write an application that extracts metrics like incoming and outgoing imports and calls per file, using the TypeScript compiler for accuracy. The tool has two interfaces: a web UI with visualizations for me to browse, and a CLI that the agent can call to get the numbers.

The visualizations include dependency structure matrices and other standard charts. I found them tedious to interpret honestly. The data is detailed but requires a lot of context to understand. It's the kind of thing that works well for experts but doesn't reduce cognitive load for casual review.

When I gave the CLI to an AI agent and asked it to analyze the coupling and suggest improvements, things got more interesting. The analysis actually pointed me to the same hotspots I would have found by staring at diagrams, just in a format that was more digestible. Asking the LLM to ground its analysis in deterministic tool output gave me higher confidence than if the agent had just scanned the codebase on its own.

That said, the raw coupling data alone wasn't very useful. What is "appropriate" coupling depends heavily on context, not just the call graph. A file with many dependencies might be a legitimate facade that coordinates important work.

So I tried something different. Instead of relying purely on computational metrics, I used Vlad Khononov's Modularity Skills to have AI analyze the design semantically. This was much more fruitful. It found actual refactoring opportunities that would reduce change risk. The coupling data mostly confirmed what the semantic analysis already found, but it didn't add much new value.

The insight here is that computational sensors work great at the file and function level. But for cross-file concerns like modularity, you need inferential sensors. Raw data is too noisy without AI to add semantic interpretation.

## Tests as Regression Sensors

Tests serve many purposes, but in the context of maintainability, I'm interested in regression detection. When a test fails, the agent has to ask: did I break something accidentally, or am I changing behavior intentionally? A good test suite decreases the probability that AI breaks existing functionality.

In my app, I let the agent write all the tests without much oversight. I wanted to see how effective an AI-generated test suite actually is at catching regressions.

The two main risks with un-reviewed AI-generated tests are false negatives (tests that pass but don't actually verify anything) and false positives (fragile tests that fail for the wrong reasons). I used coverage and mutation testing to probe for false negatives.

Coverage alone is misleading. I had a file with 100% statement coverage and 75% branch coverage that had no unit tests. It showed high coverage because an acceptance test called through that code path. Coverage tells you a line executed, not that its behavior was verified. If someone changes that helper function later, the UI could break and no test would catch it.

Mutation testing solved this. It makes small changes to the code and checks if tests still pass. If they do, those tests aren't actually verifying that behavior. In my case, the mutation tester reported 13 survivors for that mappers file. Thirteen mutations that the test suite didn't catch. That's a serious gap.

Mutation testing does have a practical limitation: it's resource intensive. I didn't run it continuously, just triggered it manually when I wanted to audit the test suite.

The broader observation is that as AI gets better at generating tests, we're seeing a shift toward more end-to-end style acceptance tests. They're easier to write and cover more code, but they're often assertion-light. This gives a false sense of security. Mutation testing becomes crucial for catching this gap. Without it, you're flying blind on whether your test suite actually protects you.

## What I Learned

Computational sensors shine at the file and function level. They catch linting issues, enforce dependency rules, and find gaps in test coverage. Cross-file concerns needed AI to interpret the data meaningfully.

I didn't use any guides in this experiment. No markdown files explaining architecture or coding standards. Just sensors and the feedback they provided. I'm curious how the balance between guides and sensors will evolve. Once you trust your sensors, do you still need guides? Can weaker AI models get good results with strong sensors? How do you keep guides and sensors consistent?

The biggest surprise was mutation testing. I always knew it was theoretically useful, but never felt the pain acutely enough to set it up. Now that I've delegated most testing to AI, it's become essential. The conversation about test correctness is separate from what I've described here, but it's equally important.

These sensors definitely improved my review experience and trust in the code. They aren't a magical solution that removes the human from the loop. But they're becoming genuine partners in maintaining code quality over time.