---
title: "Continuous AI: Why GitHub is Betting on Agents That Reason, Not Just Execute"
description: "GitHub Next introduces Continuous AI, a new pattern for automating judgment-heavy engineering work that CI was never designed to handle."
date: 2026-02-10 12:00:56 +0530
tags: rollup, open source, artificial intelligence, automation, developer tools
image: 'https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232'
featured: false
---

I've been watching GitHub Next's work on Continuous AI for a while now, and it's finally clicking for me why this matters. It's not another copilot feature. It's not CI with a chatbot bolted on. It's something genuinely different, and it addresses a problem I've felt but never articulated well.

Most of my engineering work isn't writing code. It's the stuff around the code: keeping docs accurate, reviewing PRs for intent rather than syntax, tracking down performance regressions that aren't bugs but are still wrong, answering the same questions about what changed this week. All the things that require judgment.

CI solved the deterministic stuff brilliantly. Tests pass or fail. Builds work or don't. Linters catch style violations. But CI was never designed for "does this code still match what the documentation says it does?" That's a different category of work entirely.

## The Gap CI Never Filled

Here's the thing about continuous integration: it's *supposed* to be limited. It excels at binary outcomes because that's what it was built for. You can't write a YAML file that checks whether your migration guide still makes sense after you refactored your API. You can't express "flag any new code that looks like it might slow down the critical path" as a regex.

Idan Gazit from GitHub Next puts it well: "Any task that requires judgment goes beyond heuristics." The moment you need interpretation, synthesis, context, you've left the territory CI can cover.

I see this every week. Someone updates a function signature. The code works fine. Tests pass. But now three different README files are lying to users, and nobody notices until someone files an issue two months later. That's not a CI failure. That's CI working exactly as designed and still missing the problem.

What GitHub Next is proposing with Continuous AI is treating [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) agents the same way we treat CI jobs: background processes that run in your repository, triggered by events or schedules, but handling tasks that require reasoning instead of rules.

## What This Actually Looks Like

The prototype they've built (it's just called `gh aw` right now) uses a deliberately simple pattern. You write a Markdown file in `.github/workflows/` that contains natural language instructions. The agent reads it, operates on your repository with read-only access by default, and produces artifacts you can review.

It's not magic. You're not writing "fix my bugs" and having the agent ship code. You're writing things like "whenever documentation references code examples, verify the examples still work and open a PR if they don't." That's specific enough to be actionable but impossible to express as traditional CI logic.

The safety model is interesting. Agents can't do anything unless you explicitly grant permission. Want it to open PRs? You specify that in the workflow definition. Want it to just file issues? Different permission. The blast radius is deterministic, which matters when you're letting an AI poke around your codebase.

I appreciate that they're treating this like infrastructure, not magic. The agent's work is visible in pull requests, issues, or discussion threads. Everything is auditable. Nothing happens in a black box.

## The Examples That Made This Click

GitHub Next tested this in real repositories, and some of the examples are the exact pain points I've dealt with:

**Documentation drift:** An agent that reads code changes and checks if related documentation is still accurate. When it finds mismatches, it opens a PR with suggested fixes. Not perfect, but having a draft ready beats manually auditing docs every sprint.

**Recurring status reports:** Instead of a manager spending an hour every Friday pulling data from issues, PRs, and CI logs, an agent generates a synthesis. It's not just aggregation, it's interpretation: "bugs in the auth module increased 40% this week, here are the common patterns."

**Translation updates:** Content changes in English, the agent generates draft translations and opens PRs for each language. The translations need human review, but you're reviewing drafts instead of starting from scratch.

The dependency tracking example is clever. Dependencies change behavior without bumping major versions all the time. New flags appear, defaults shift, deprecation warnings show up. An agent can catch "this library now requires an extra configuration step we're not doing" in a way that classical CI never could.

## This Feels Like Early CI

There's a pattern here that reminds me of stories about early [automation](https://mgks.dev/tags/automation/) in software. When CI first became common, people were skeptical. "You want to run tests automatically? On every commit? That's overkill." Now it's unthinkable not to.

I think we're at a similar inflection point with judgment-heavy work. Not replacing developers, but changing when certain chores happen. From "when someone remembers" to "continuously."

The mental model Idan describes is useful: not one big general-purpose agent, but a fleet of small ones. Each responsible for one specific chore, one rule of thumb, one category of check. You might have separate agents for docs, translations, performance checks, style consistency, and dependency updates.

That's more sustainable than trying to build one AI that "understands your codebase." Narrow scope, clear permissions, transparent outputs.

## What This Isn't

This is not a replacement for code review. It's not going to understand your product strategy or make architectural decisions. It's not going to catch every bug or write your features for you.

It's specifically for the subset of engineering work that's repetitive, necessary, requires judgment, and eats up time without adding much satisfaction. The stuff you'd delegate to a junior engineer if you had infinite juniors, except you don't.

I also don't think this is the beginning of "AI agents running repositories autonomously." The safe outputs model matters. Agents operate within guardrails developers define. They produce artifacts for review, not autonomous changes to production systems.

That's actually the only way this works at scale. If I can't audit what an agent did, I'm not going to trust it with my repository.

## Where This Gets Interesting

The creative uses are what intrigue me. The Universe demo where they used agents to play a platformer game thousands of times to detect UX regressions? Strip away the game mechanics and you have something broadly applicable: agents simulating user behavior at scale, comparing variants, flagging unexpected changes.

That's not something I would've thought to automate before. But now that it's possible, I can think of a dozen places it'd be useful. Testing CLI output changes across versions. Verifying API response formats haven't subtly shifted. Checking that error messages still make sense after refactoring.

It's the kind of work where you'd love to have a human do it, but realistically nobody's going to run the same script 10,000 times just to make sure nothing regressed.

## Starting Small

You don't need to overhaul your entire workflow to try this. Start with one annoying recurring task. Maybe it's checking that code comments match function signatures. Maybe it's flagging PRs that modify performance-critical code without updating benchmarks. Maybe it's just generating a weekly digest of what changed so you don't have to.

Pick something judgment-heavy that you keep forgetting to do, write a natural language rule for it, and see what happens.

I think the biggest shift here isn't technical, it's conceptual. We're used to [automating](https://mgks.dev/tags/automation/) things that can be reduced to rules. Now we're starting to automate things that require understanding intent. That's a different kind of leverage, and I'm curious where it leads.

The question isn't whether AI can replace developers, it's which parts of our work we actually want to keep doing ourselves.