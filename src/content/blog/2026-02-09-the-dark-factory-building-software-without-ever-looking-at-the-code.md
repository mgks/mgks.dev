---
title: "The Dark Factory: Building Software Without Ever Looking at the Code"
description: "StrongDM's AI team ships production software written entirely by agents, using Digital Twin Universes and holdout scenarios instead of human code review."
date: 2026-02-09 12:00:57 +0530
tags: rollup, engineering, artificial-intelligence, software-development
image: 'https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076'
featured: false
---

I've been sitting on this one for a while, and it's been eating at me. Back in October, I saw something that made me question what software engineering even means anymore. A three-person team at StrongDM showed me a demo of their "Software Factory" where [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) agents write code that no human ever reviews, and it actually works.

Not "works" in the sense of a toy demo or a proof of concept. We're talking about production software. Security software, no less. The kind of stuff that manages user permissions across Okta, Jira, Slack, and Google services. You know, the exact type of system where a bug could expose your entire company's data.

And nobody looks at the code.

Dan Shapiro called this the "Dark Factory" level of AI adoption, a reference to those fully automated manufacturing plants that can run in the dark because no humans need to be present. It sounds insane. It probably is insane. But after seeing it work, I can't stop thinking about whether this is just early-adopter madness or an actual glimpse of how we'll all be working in a year or two.

## The Inflection Point Nobody Talks About Enough

StrongDM's [AI](https://mgks.dev/tags/artificial-intelligence/) team was founded in July 2025, but the real catalyst came earlier. They pinpoint October 2024's Claude Sonnet 3.5 revision as the moment when something fundamental changed. Long-horizon agentic coding workflows stopped accumulating errors and started compounding correctness instead.

By December 2024, anyone playing with Cursor's YOLO mode could feel it. The models weren't just autocompleting anymore. They were actually thinking through problems across multiple files, refactoring sensibly, catching their own mistakes.

Then November 2025 hit with Claude Opus 4.5 and GPT 5.2, and suddenly half the developers I follow were tweeting about how agents could finally handle complex tasks end-to-end. I've felt it myself. The difference between Claude 3.5 and Opus 4.5 isn't incremental. It's qualitative.

But feeling like the models got better and actually trusting them to write production code without review are very different things.

## The Core Problem: How Do You Know It Works?

Here's where it gets interesting. If you're not writing code by hand, how do you prove it works? The obvious answer is tests, but that immediately falls apart. If the agent writes both the implementation and the tests, nothing stops it from writing tests that just assert true or check for the exact buggy behavior it implemented.

I've hit this wall myself when experimenting with agent-driven development. You end up in this weird place where you're reviewing test quality instead of implementation quality, which is somehow more exhausting because tests can pass while being completely meaningless.

StrongDM's answer came from an old paper by Cem Kaner on Scenario testing from 2003. They treat scenarios as "holdout sets" stored outside the codebase where agents can't see them. These aren't unit tests. They're full end-to-end user stories that describe what the software should accomplish without prescribing how.

Think of it like aggressive QA testing by an external team, except the QA team is also made of agents. But crucially, these testing agents don't have access to the implementation or the implementation agent's thought process. They only know what the user wanted to happen.

The brilliant part is they moved away from boolean success criteria. Instead of "test suite is green," they use this concept of "satisfaction" that's probabilistic. Of all the observed trajectories through all the scenarios, what fraction of them actually satisfy the user's intent?

That's a much more honest way to think about software quality when [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) is involved.

## Digital Twin Universe: The Part That Broke My Brain

The demo that really got me was their Digital Twin Universe. They're building software that manages permissions across a bunch of third-party services. To test it properly, they needed to hammer these APIs with thousands of requests per hour, test failure modes, simulate edge cases.

Obviously you can't do that against production Okta or Slack. Rate limits, API costs, getting your IP banned, the whole deal.

So they had their agents clone them.

Not shallow mocks. High-fidelity behavioral clones that replicate the APIs, edge cases, and observable behaviors of Okta, Jira, Slack, Google Docs, Google Drive, and Google Sheets. Self-contained Go binaries with simplified UIs on top.

The process is exactly what you'd think but wouldn't believe could work: dump the full public API documentation into the agent harness and have it build an imitation. One of the creators, Jay Taylor, shared the key insight on Hacker News: use the top popular publicly available SDK client libraries as compatibility targets, aiming for 100% compatibility.

With these twins, their testing agents can go absolutely wild. No rate limits. No quotas. No costs. Just thousands of simulated scenarios running continuously as new code gets generated.

Here's what makes this genuinely disruptive: creating a high-fidelity clone of a significant SaaS application was always technically possible. But it was never economically feasible for any team to actually do it. How many person-months would it take to manually build a convincing Slack clone just for testing? How would you justify that to management?

Now it's an afternoon of agent work.

## The Economics Are Weird and Concerning

I need to be honest about something that StrongDM mentions but doesn't dwell on: their token costs run around $20,000 per month per engineer.

That's not a typo. Twenty thousand dollars. Per month. Per engineer.

At that burn rate, this stops being a software engineering story and becomes a business model question. Can you build products profitable enough to justify that overhead? What happens when your competitor can clone your features in hours using the same techniques?

I'm much more interested in whether these patterns can work at the $200/month tier I'm personally using with Claude. I don't have a swarm of QA testers running 24/7, but I'm constantly thinking about how to get agents to prove their work without me reviewing every line.

The token costs might come down. They might not. But the core ideas, the Digital Twin Universe concept, the holdout scenarios, the move toward probabilistic satisfaction metrics instead of boolean test results, those feel important regardless of cost.

## What This Means for the Rest of Us

StrongDM released their core agent, Attractor, on GitHub in the most on-brand way possible: the repo contains no code. Just three markdown files with detailed specs. The README basically says "feed this into your coding agent of choice."

They also released cxdb, their AI Context Store, which is a proper codebase with 16,000 lines of Rust, 9,500 of Go, and 6,700 of TypeScript. It's for storing conversation histories and tool outputs in an immutable DAG, like a much more sophisticated version of my own LLM tool's SQLite logging.

I'm probably going to steal ideas from it. They call that pattern "Gene Transfusion" in their techniques documentation, having agents extract patterns from existing systems and reuse them elsewhere.

Their techniques page introduces a whole vocabulary for this new way of working: Semports for direct language-to-language code porting, Pyramid Summaries for multi-level documentation that agents can zoom through efficiently. It's the beginning of a design pattern language for agent-driven [software development](https://mgks.dev/tags/software-development/).

What struck me most about visiting their team in October was how mundane it all seemed to them. Three people, three months in, already running this whole operation. They weren't treating it like a research project or a moonshot. It was just how they worked.

And this was before Opus 4.5 made agents significantly more reliable.

## The Question That Keeps Me Up

I keep coming back to the same uncomfortable thought. If this works, if you really can build production software without humans reviewing code, what exactly is the software engineer's job?

StrongDM's answer seems to be: building and semi-monitoring the systems that build the code. Designing scenarios. Maintaining the Digital Twin Universe. Extracting patterns for Gene Transfusion. Debugging at a higher level of abstraction.

It's not that we become unnecessary. We move up a layer. But it's a very different skill set from what most of us trained for.

The Dark Factory metaphor is apt but also a bit terrifying. Those factories run in the dark because humans set them up perfectly and then got out of the way. The question is whether software is really ready for that level of automation, or whether we're just in a honeymoon period before the models hit their limits and everything falls apart.

I don't know yet. But I do know that teams like StrongDM's are already living in that future, and they're not coming back.