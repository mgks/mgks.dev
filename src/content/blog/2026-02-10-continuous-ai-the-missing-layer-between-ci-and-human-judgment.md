---
title: "Continuous AI: The Missing Layer Between CI and Human Judgment"
description: "GitHub Next explores background agents that handle judgment-heavy tasks CI was never designed for. Here's what that means for how we build software."
date: 2026-02-10 00:00:57 +0530
tags: rollup, open source, artificial intelligence, github, automation
image: 'https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232'
featured: false
---

I've been thinking about why CI feels incomplete lately. Not broken, just incomplete. Tests pass, builds work, linters catch style violations. But there's this entire class of work that sits outside what CI can handle, and we've just accepted it as "things humans have to do manually."

GitHub Next has been exploring something they call Continuous AI, and it's not another AI coding assistant. It's closer to background agents that run in your repository the same way CI jobs do, except they handle tasks that require reasoning instead of rules. The distinction matters more than it sounds.

## The Work CI Can't Touch

Continuous integration solved deterministic problems beautifully. A test either passes or fails. A build succeeds or doesn't. You can express these things as rules, and rules scale horizontally across every commit.

But most of the cognitively expensive work in software engineering doesn't fit that pattern. When documentation drifts from code, there's no regex that catches it. When a dependency changes behavior without bumping major versions, static analysis won't flag it. When you refactor a module and three other teams need to know about it, no linter will tell you.

These are judgment calls. They require understanding intent, synthesizing context, and making decisions that can't be reduced to boolean logic.

Idan Gazit, who leads GitHub Next, puts it plainly: "Any time something can't be expressed as a rule or a flow chart is a place where [AI](https://mgks.dev/tags/artificial-intelligence/) becomes incredibly helpful."

That's the gap Continuous AI targets. Not replacing CI, but handling the adjacent space where correctness depends on interpretation rather than validation.

## Natural Language as Configuration

The prototype GitHub Next built uses a deliberately simple pattern. You write natural-language instructions in a Markdown file, save it in `.github/aw/`, and the agent starts running on repository events or schedules you define.

```markdown
When documentation and code diverge, open a PR with fixes.
```

That's a complete workflow. No YAML, no complex configuration. Just intent expressed clearly enough for an agent to reason over.

I'm conflicted about this. On one hand, natural language as configuration feels fragile. On the other, some expectations genuinely can't be expressed any other way without losing meaning. You can't write a deterministic rule for "keep docs accurate" because accuracy isn't a boolean state. It's a judgment call that requires understanding what the code actually does and whether the documentation still reflects that.

The interesting part is that these workflows don't make autonomous commits. They create pull requests, issues, or discussions. The same artifacts developers already review. The agent does the reasoning, but human judgment remains the final checkpoint.

## What This Actually Looks Like

GitHub Next tested these patterns in real repositories, and some of the examples are more compelling than others.

Documentation sync is probably the strongest use case. Every time code changes, an agent checks whether related docs are still accurate and opens a PR with suggested updates. This is genuinely hard to automate with traditional CI because it requires semantic understanding, not just pattern matching.

Dependency behavior tracking is another one. Dependencies change flags, alter defaults, update help output. These shifts break things in subtle ways that unit tests often miss. An agent can periodically check if a dependency's actual behavior still matches what your code expects and flag discrepancies before they surface in production.

The localization workflow is clever too. Content changes in English, the agent generates draft translations and opens PRs for review. Not perfect translations, but enough to make incremental updates continuous instead of batched right before releases.

Then there's the weirder stuff, like using agents to play a simple game thousands of times to detect UX regressions. Strip away the game, and you have a pattern for simulating user behavior at scale to compare variants. That's legitimately useful for testing complex interactions that are too expensive to manually verify every commit.

## The Safety Model Actually Matters

Here's what I appreciate about GitHub Next's approach: agents operate with read-only access by default. They can't create issues, open PRs, or modify anything unless you explicitly grant permission.

They call this Safe Outputs, which defines a deterministic contract for what an agent can do. When you write a workflow, you specify exactly which artifacts it may produce and under what constraints. The blast radius is bounded and auditable.

This isn't paranoia. It's acknowledging that agents can fail or behave unexpectedly, and designing around that reality. Outputs are sanitized, permissions are explicit, activity is logged. You're not trusting the agent to be perfect. You're trusting the constraints you've defined.

That's a very different mental model from "let AI handle it" and hoping for the best.

## The Part Nobody Wants to Talk About

If [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) can handle judgment-heavy chores, what does that mean for how we value engineering work?

I don't think this replaces developers. But it does shift where human judgment gets applied. If an agent can draft documentation updates, generate translation PRs, track dependency drift, and flag performance regressions, what are we spending our time on instead?

Ideally, we're focusing on problems that require taste, creativity, and context that can't be delegated. But realistically, a lot of engineering roles involve exactly the kind of repetitive judgment work that Continuous AI targets.

Idan frames it optimistically: "In the future, it's not about agents running in your repositories. It's about being able to presume you can cheaply define agents for anything you want off your plate permanently."

That's true, but it also means the baseline expectation for what constitutes "real engineering work" is about to shift. Again. The same way CI changed expectations around testing and deployment.

## Starting Small Actually Makes Sense

You don't need to rebuild your entire pipeline. Start with one recurring chore that requires judgment but not deep expertise.

Pick something like weekly status reports that pull from issues, PRs, and CI results. Or docs sync for a high-churn module. Or tracking when dependencies change behavior in ways that might affect your code.

These are tasks that drain attention without adding much value. Making them continuous instead of episodic is where the real gain lives.

The GitHub Next prototype (find it at `gh aw`) makes experimentation cheap. Write a natural-language rule, save it in `.github/aw/`, and see what happens. If the agent produces garbage, delete the file. The risk is low, the feedback loop is fast.

## The Larger Pattern

If CI automated rule-based work over the past decade, Continuous AI might do the same for certain categories of judgment-based work when applied deliberately and safely. Not all judgment work. Probably not even most of it. But the subset that's recurring, cognitively expensive, and doesn't require deep context or creativity.

That's still a lot of work.

And I think the shift from [open source](https://mgks.dev/tags/open-source/) tooling to proprietary agents handling judgment calls in private repositories changes something fundamental about how we reason about software quality and maintenance. When the agent that keeps your docs accurate is a black box running proprietary models, what happens when the model changes or the service shuts down?

These are questions we'll be answering as this pattern matures, assuming it matures at all. For now, it's an interesting experiment in expanding what "continuous" can mean beyond tests and builds. Whether it becomes infrastructure or fades into the pile of promising prototypes that never shipped depends on whether developers actually trust agents with judgment calls that matter.