---
title: "Treating AI Instructions as Infrastructure, Not Documentation"
description: "How encoding team standards as versioned AI instructions solves the consistency problem that plagues AI-assisted development workflows."
date: 2026-04-02 12:00:56 +0530
tags: rollup, architecture, ai-tooling, software-engineering
image: 'https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070'
featured: false
---

I've been thinking about a problem that shows up on every team using [AI](https://mgks.dev/tags/artificial-intelligence/) coding assistants: two developers, same codebase, same tool, wildly different output quality. The gap isn't what the AI knows about your project. It's what each developer tells the AI to do with that knowledge.

The senior engineer generates a new service and instinctively specifies: follow our functional style, use the existing error-handling middleware, place it in lib/services/, make types explicit, use our logging utility instead of console.log. The junior developer asks for "a notification service" and gets something that technically works but drifts from every convention the team has spent years building.

Same AI. Same context. Completely different results.

This happens across every interaction. When the senior asks for a refactoring, she specifies: preserve the public contract, avoid premature abstraction, keep functions small and single-purpose. When she runs a security check, she knows to look for SQL injection, verify authorization on every endpoint, ensure secrets aren't hardcoded. The junior developer asks to "clean up this code" or "check if this is secure" and gets generic advice that misses the team's specific concerns.

We treat this as a skills problem. Train the juniors. Write better docs. Do more pairing. These help, but they're slow and they don't scale. The knowledge exists, it just has no vehicle for consistent distribution.

## The Gap Between Documentation and Practice

Teams have always tried to codify standards. The challenge has always been the gap between what's written down and what actually happens. A checklist on a wiki depends on someone reading it, remembering it, and applying it consistently under deadline pressure. In my experience, that's where most codification efforts quietly die.

[Artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) instructions change this dynamic in an interesting way. A team standard encoded as an AI instruction doesn't depend on someone remembering to apply it. The instruction is the application. When a developer generates code using an instruction that embeds architectural patterns, or runs a security check that encodes the team's threat model, the standards are applied as a side effect of the workflow, not as a separate step that requires discipline.

The governance becomes the workflow.

This is the same shift that happened with linting rules and CI/CD pipelines. Linting rules are versioned config files, not personal preferences. CI/CD pipelines are executable definitions, not wiki pages describing deployment steps. AI instructions belong in the same category: configuration that executes, not documentation that informs.

## Extraction as Interview

The most interesting part of creating these instructions is the extraction process. It's essentially an interview with your senior engineers, structured around pointed questions that span the full development workflow.

What architectural decisions should never be left to individual judgment? Which conventions get corrected most often in generated code? Which security checks are applied instinctively? What triggers an immediate rejection in review? What separates a clean refactoring from an over-engineered one?

The answers map directly to instruction structures. Non-negotiable architectural patterns become generation constraints. Frequent corrections become convention checks. Security instincts become threat-model items. Review rejections become critical checks.

I've found this process has value beyond the resulting instructions. On one project, the extraction conversation revealed that two senior engineers had quietly different thresholds for what counted as a "critical" security concern versus an "important" one. This disagreement had never surfaced because each reviewed different pull requests. The act of writing a shared instruction forced the distinction to be made explicit.

Once a junior developer started using the resulting instructions, the effect was immediate. Their first review flagged a missing authorization check on a newly added endpoint, exactly the kind of issue that had previously only been caught when a senior happened to be the reviewer. The instructions didn't make the developer more experienced. They made their inexperience less costly.

## Anatomy of an Executable Instruction

A well-structured executable instruction has four elements. First, the role definition tells the AI what perspective to take. Second, the constraints specify non-negotiables that the AI must respect. Third, the checks list what the AI should verify or flag. Fourth, the examples show what good looks like in concrete terms.

This anatomy applies whether you're generating code, refactoring, checking security, or reviewing pull requests. The difference is in what each element contains, not the structure itself.

Keep instructions small and single-purpose. Smaller instructions maintain focus, are easier to maintain, and compose flexibly. A generation instruction should handle generation. A security instruction should handle security. Don't try to build one mega-instruction that does everything.

## Repository Placement Changes Everything

A prompt on an individual machine is a personal productivity hack. The same prompt in the team's repository is infrastructure. That distinction is the difference between a personal preference and a team practice.

When it lives in the repository, it inherits the properties of any versioned artifact. Changes are tracked. Standards are owned collectively. Every developer works from the same version. Different tools implement this differently (custom commands, skills, rules files, project instructions) but the underlying property is the same: a versioned, shared artifact that the [AI](https://mgks.dev/tags/artificial-intelligence/) executes consistently.

This is how teams improve the standards together. A developer who notices that the generation instruction doesn't specify the team's new error-handling pattern submits a PR to update it. A security incident reveals a gap in the security instruction; the fix is a commit, reviewed and merged like any other infrastructure change.

The standards aren't static rules handed down by a senior and frozen in place. They're living artifacts that the whole team maintains, sharpened by practice, improved through the same pull request workflow the team already uses for code.

## When This Actually Matters

This approach is most valuable when a team is large enough that consistency can't be maintained through conversation alone. A useful heuristic: if AI-assisted output visibly varies in quality depending on who's prompting, or if generation and review work is routing through a handful of people because they're the only ones who know how to prompt effectively, the inconsistency is the signal.

Teams of five may not need this. Teams of fifteen almost certainly do.

The costs are real. Creating good instructions requires effort (the extraction interviews, the drafting, the iteration). Overly prescriptive instructions become brittle; they produce false positives on edge cases or fight against legitimate variations in approach. There's a maintenance burden as standards evolve. And there's a risk of over-engineering: not every interaction with AI needs a dedicated instruction.

The right starting point, in my experience, is one instruction. A generation or review instruction is usually the highest-value choice. It addresses the most common workflow, the widest quality gap, and the most visible inconsistency. Additional instructions should follow adoption, not precede it.

## Standards That Execute

This is, at its core, a shift from judgment that lives in people's heads to judgment that executes as shared infrastructure. The senior engineer's instincts (the patterns she checks, the conventions she enforces, the risks she flags) don't have to remain personal and unscalable.

They can be extracted, encoded into versioned instructions, and applied consistently across every developer and every interaction with AI.

The mechanism isn't new. Teams already do this with linting rules, CI pipelines, and infrastructure-as-code. What changes with AI is the scope of what can be encoded. Linting catches syntax and style. Executable team standards can encode architectural judgment, security awareness, refactoring philosophy, and review rigor: the kind of knowledge that previously transferred only through pairing, mentorship, and years of shared experience.

There's a real risk these instructions become another documentation graveyard, created with enthusiasm and abandoned within months. Repository placement and pull request review mitigate this. An instruction that lives in the repo is visible. It appears in diffs. It can be referenced in pull request templates. When it drifts from actual practice, the drift is visible in the same way that a stale test is visible, not because someone audits it, but because it's encountered in the normal course of work.

The closer the artifact is to the workflow, the more likely it is to be maintained.

The most interesting property of these standards is that they're team-owned, living in the repository, evolving through pull requests, improving when practice reveals gaps. Every instruction that misses something is an instruction waiting to be updated, and the update is a commit that the whole team reviews.