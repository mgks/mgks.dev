---
title: "AI as an Organizational Multiplier: Why Your Team's Experience Varies Wildly"
description: "AI amplifies what you're already doing. Why some teams see half the incidents while others face double, and what agent architecture teaches us about control."
date: 2026-03-02 12:00:12 +0530
tags: rollup, architecture, artificial-intelligence, software-engineering
image: 'https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232'
featured: false
---

I don't usually share video links because I'd rather read a transcript in three minutes than watch someone talk for thirty. But Laura Tacho's overview on how organizations are using [AI](https://mgks.dev/tags/artificial-intelligence/) is worth your time. She presents data from DX that confirms something I've been seeing in the wild: there is no typical experience with AI in software organizations.

Some companies are experiencing twice as many customer incidents after adopting AI tools. Others are seeing half. That's not a minor variance, that's organizations shooting off in completely opposite directions.

Laura calls [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) an accelerator and a multiplier. If your practices were solid before, AI amplifies that. If they were shaky, well, you're about to find out just how shaky. Organizational performance is multidimensional, and AI doesn't flatten those dimensions. It exaggerates them.

This matches what I've observed. Teams with strong testing practices are having a great time with coding assistants. Teams that were already shipping untested code are now shipping more untested code, faster. The tool doesn't care about your process. It just does more of what you tell it to do.

## The Agent Subconscious

Rachel Laycock shared something from a recent retreat that got my attention: the concept of an "agent subconscious" built on a knowledge graph of postmortems and incident data. This is exactly the kind of organizational memory that typically lives in the heads of senior engineers and architects.

I've watched this pattern play out countless times. A production issue surfaces, and someone with ten years at the company immediately recognizes it because they saw something similar in 2019. That person becomes a bottleneck and a single point of failure. When they're on vacation or leave the company, that knowledge evaporates.

Encoding that institutional knowledge into something an agent can query changes the dynamics. Not because the agent is smarter than your senior staff, but because it's always available and can surface relevant historical context instantly.

The challenge, as always, is capturing that knowledge in a form that's actually useful. Postmortem documents are notoriously variable in quality and completeness.

## Agentic Engineering vs Vibe Coding

Simon Willison is starting a series on Agentic Engineering Patterns, and I'm paying close attention. He draws a clear line between "vibe coding" where non-programmers use LLMs without understanding the output, and agentic engineering where professionals use coding agents to amplify their expertise.

The distinction matters. One approach treats the LLM as a magic box. The other treats it as a power tool that still requires skill and judgment to use effectively.

His focus on test-first development with agents is spot on. The biggest risk with coding agents isn't that they'll write bad code (they will), it's that they'll write code that seems to work but doesn't, or code that solves the wrong problem entirely. Tests catch both failure modes.

Writing the test first also forces you to think clearly about what you actually want before handing it off to an agent. This is the same discipline that makes TDD valuable with human programmers, just applied to a different kind of collaborator.

## Fine-Scoped Agents and Security

Aaron Erickson's take on agent architecture resonates: structure your agents like you would a company. Insert friction where decisions are slow and the cost of being wrong is high. Reduce friction where decisions are fast and mistakes are cheap.

The days of "here's my agent with access to everything" are numbered, and good riddance. Korny Sietsma's advice about splitting tasks to avoid giving any single agent access to the "Lethal Trifecta" is an application of the Principle of Least Privilege. It's basic [security](https://mgks.dev/tags/security/) hygiene, but it matters even more with agents because the failure modes are less predictable.

This also happens to make the agents work better. Smaller contexts mean better performance. An agent focused on a single well-defined task produces better output than one trying to juggle multiple concerns.

You end up with specialized agents for reading email, policy enforcement, acting on decisions. Each one has narrow permissions and a clear job. The complexity moves from "one big smart agent" to "orchestration of focused agents," which is actually easier to reason about and debug.

## The Social Media Sickness

That story about the child recognizing AI-generated images faster than adults tracks with what I'm seeing. Fresh neural networks, biological or otherwise, adapt quickly to new patterns. Six-fingered hands are this generation's uncanny valley marker.

But the anecdote about the Instagram comments on a rape survivor's post is a reminder that our problems with social media run much deeper than synthetic content. The platforms have created environments where the ugliest possible human behavior gets amplified and rewarded with engagement.

Free speech is important. I try not to be a poseur about it. But the current state of social media moderation is clearly failing users, particularly women and minorities who bear the brunt of coordinated harassment. The platform owners seem content to let it burn as long as the engagement numbers go up.

Maybe we'll eventually train AI moderators that can handle this at scale without descending into either toothless ineffectiveness or arbitrary censorship, but I'm not holding my breath. The fundamental issue is that the platforms don't want to solve the problem because solving it would require changing their business model.

The multiplier effect applies here too. If your platform was designed to maximize engagement above all else, adding AI tools just accelerates the race to the bottom.