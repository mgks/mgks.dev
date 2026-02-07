---
title: "The Dark Factory: Building Software Without Looking at the Code"
description: "StrongDM's AI team ships production software using agents that write code no human reviews. Here's how they test it and why it might actually work."
date: 2026-02-08 00:00:58 +0530
tags: rollup, engineering, artificial-intelligence, automation
image: 'https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070'
featured: false
---

I've been writing code for long enough to remember when the idea of shipping software without code review seemed insane. Now I'm watching teams ship production systems where no human even looks at what the [AI](https://mgks.dev/tags/artificial-intelligence/) agents are writing.

StrongDM's AI team just published how they're doing this, and it's either the future of software development or a cautionary tale waiting to happen. I'm honestly not sure which yet.

The setup is wild. They founded this team in July 2025 with one rule: no hand-coded software. Everything gets built by agents. The code they produce goes straight to production without human review. This is what Dan Shapiro calls the Dark Factory level of adoption, borrowed from manufacturing where lights-out factories run without human supervision.

## The Inflection Point Nobody Talks About

Here's what makes this possible now versus six months ago. StrongDM traces their approach back to October 2024 when Claude 3.5 Sonnet's second revision started compounding correctness instead of errors on long-horizon tasks.

I noticed this too, though I didn't have words for it at the time. Something shifted. The models stopped falling apart after the tenth or twentieth step. By December 2024 you could see it clearly in Cursor's YOLO mode, where the agent just keeps going without asking permission.

Then came November 2025 with Claude Opus 4.5 and GPT 5.2, and suddenly what StrongDM was doing in July looked almost conservative. The inflection point hit hard enough that I'm seeing experienced developers adopt "no hand-coded software" rules in January 2026. That timeline is absurd.

## The Testing Problem

But here's the obvious issue. If agents write both the implementation and the tests, how do you know anything works? An agent can easily write a test that asserts true and call it done.

This feels like the central question facing [software engineering](https://mgks.dev/tags/engineering/) right now. How do you prove that AI-generated software works when you can't trust AI-generated tests?

StrongDM's answer involves something they call scenarios, borrowed from Cem Kaner's work in 2003. These are end-to-end user stories stored outside the codebase, like holdout sets in machine learning. The agents building the software never see them.

Instead of boolean pass/fail, they measure "satisfaction" probabilistically. Of all the observed paths through all the scenarios, what fraction likely satisfy the user? It's a fundamentally different way of thinking about correctness.

The twist is they treat these scenarios like an aggressive external QA team would operate. Expensive in the traditional model, but cheap when your QA team is made of agents.

## Digital Twin Universe

This is the part that broke my brain when I saw the demo back in October.

They're building software that manages user permissions across Okta, Jira, Slack, Google Docs, Google Drive, and Google Sheets. Security software. Built with unreviewed LLM code. I know.

To test this, they built what they call a Digital Twin Universe. Behavioral clones of every third-party service their software touches. Full API replicas with edge cases and observable behaviors.

How do you clone Okta's entire API? You dump the public documentation into your agent harness and have it build an imitation as a self-contained Go binary. Add a simplified UI on top. Now you can test without rate limits, without triggering abuse detection, without API costs.

The economic argument here is subtle. Creating high-fidelity clones of major SaaS products was always technically possible. Engineers have wanted in-memory replicas of their CRM for testing since forever. But nobody could justify the engineering cost.

That calculation just changed. What used to be months of engineering work is now hours of agent time.

## Releasing Software as Specs

The release strategy matches the development approach. They published Attractor, their non-interactive coding agent, as a GitHub repo with zero code. Just three markdown files describing the spec in detail. The README tells you to feed it into your coding agent of choice.

It's either brilliant or trolling, possibly both.

Their other release, cxdb, is more traditional. 16,000 lines of Rust implementing an AI context store. It's like logging for [LLMs](https://mgks.dev/tags/large-language-models/) but actually sophisticated, storing conversation histories and tool outputs in an immutable DAG.

They also introduce terminology that might stick around. Gene Transfusion for having agents extract patterns from one system and reuse them elsewhere. Semports for direct language-to-language porting. Pyramid Summaries for multi-level documentation that agents can navigate efficiently.

## The Cost Question

I buried this originally but it matters. The StrongDM approach apparently costs around $20,000 per month per engineer in compute.

At that price point this becomes a business model question, not a technical one. Can you build products profitable enough to justify spending more on AI tokens than on salaries? Maybe if you're in security or compliance where margins are high.

But I think there's value here even if you're not burning thousands on tokens. The patterns matter more than the scale. I run plenty of agent experiments on Claude's $200/month Max plan without needing a swarm of 24/7 QA testers.

The real question is what subset of these ideas works at reasonable cost. Scenario-based testing stored outside the codebase? That's applicable anywhere. Digital twins of every service you integrate with? Maybe not unless you're VC-funded.

## What This Means

When I visited the StrongDM AI team in October 2025, they'd been working for three months. Three people. They already had functional demos of agent harnesses, digital twin clones of half a dozen services, and swarms of simulated testers running scenarios.

This was before the November releases that made agentic coding significantly more reliable.

The pattern is clear. Software engineers are shifting from building code to building and monitoring systems that build code. The question isn't whether this happens but how fast and who can afford to do it first.

There's also a competitive dynamics problem nobody wants to talk about. If any competitor can clone your newest features with a few hours of agent work, what exactly are you building a moat around? The scenarios? The test harness? The digital twins?

I keep coming back to the testing question though. Proving that AI-generated code works without human review feels like the unlock that makes everything else possible, and I'm not convinced anyone has really solved it yet, including StrongDM.