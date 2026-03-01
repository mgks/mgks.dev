---
title: "AI as an Organizational Multiplier: The Case for Fine-Scoped Agents"
description: "How AI amplifies existing organizational practices, why averages deceive us, and the emerging patterns for safer agentic systems in production."
date: 2026-03-02 00:00:12 +0530
tags: rollup, architecture, artificial-intelligence, agents
image: 'https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988'
featured: false
---

I generally avoid linking to videos because I'd rather read a transcript in three minutes than watch someone talk for thirty. But Laura Tacho's overview on how organizations are currently using [AI](https://mgks.dev/tags/artificial-intelligence/) is worth your time. The data from her work with DX reveals something more important than the numbers themselves: there is no typical experience with AI in organizations.

The averages are misleading, which shouldn't surprise anyone who's been paying attention. Some companies are seeing twice as many customer incidents. Others are seeing half. AI isn't making things uniformly better or worse. It's acting as a multiplier of whatever organizational practices already exist.

If your deployment practices are chaotic, AI will help you deploy chaos faster. If your testing culture is strong, AI will amplify that too. This isn't a technology problem. It's a systems thinking problem.

## The Agent Subconscious

Rachel Laycock shared reflections from a recent Future of Software Engineering retreat that included an idea I keep turning over in my mind: the concept of an "agent subconscious" informed by a comprehensive knowledge graph of postmortems and incident data.

I've seen this problem play out repeatedly in production systems. Someone with ten years at the company can solve an incident in minutes because they remember that weird thing from 2019. When that person is on vacation or leaves the company, the knowledge disappears.

A knowledge graph of incidents and resolutions could capture that institutional memory in a way that's actually queryable and useful. Not as a replacement for human expertise, but as a substrate that makes that expertise accessible when the right people aren't in the room.

## Agentic Engineering vs Vibe Coding

Simon Willison is starting a series on [Agentic Engineering Patterns](https://mgks.dev/tags/artificial-intelligence/) that deserves attention. He's drawing a clear line between "vibe coding" where you ignore the actual code being generated, and agentic engineering where professional developers use [coding agents](https://mgks.dev/tags/agents/) to amplify their existing expertise.

The test-first approach he describes is particularly interesting because it addresses the core risk with coding agents: they might write code that doesn't work, or build code that's unnecessary and never gets used. Having the agent write tests first creates a forcing function. The tests define what success looks like before any implementation happens.

This isn't revolutionary if you've been doing TDD for years. But it's a smart application of an existing practice to constrain and guide agent behavior in useful ways.

## Fine-Scoped Agents and the Principle of Least Privilege

Aaron Erickson's take on agent architecture resonates with my own thinking on security. The idea of structuring agents like you would structure a company, with different scopes and authorities, makes intuitive sense.

You don't give every employee in a company access to the bank account and the production deployment keys and customer data all at once. You create separation of concerns. You insert friction where the cost of being wrong is high. You reduce friction where decisions are cheap and reversible.

Korny Sietsma wrote about mitigating agentic AI security risks by splitting tasks so no agent has access to all parts of the "Lethal Trifecta." This is just the Principle of Least Privilege applied to AI systems. It's also better for performance, smaller contexts mean the LLM works better.

The pattern of Think, Research, Plan, Act with each stage handled by a separate, narrowly scoped agent isn't just more secure. It's also more debuggable, more testable, and more maintainable. When something goes wrong, you know which agent in the chain failed.

## What Kids Notice That We Don't

Someone told me a story about their child at a swimming pool who looked at a poster and immediately said "that's AI." The parents were skeptical until they spotted the six fingers. Younger minds are being trained to recognize the artifacts of generated content faster than we are.

This isn't just about six-fingered hands anymore. The tells are getting subtler and the detection skills are getting sharper. We're in an arms race between generation quality and human pattern recognition, and I'm not sure which side is winning.

## The Deluge Problem

I curate my social media carefully, following only feeds I control. But most people don't have that option or don't know how to exercise it. They're drowning in a tsunami of content, much of it toxic, with no editorial layer to filter it.

The example of comments on a woman's post about surviving rape, filled with thousands of likes for messages like "Well at least you had some" and "Hope you didn't talk this much when it happened," makes me physically ill. The platforms running these systems are either unable or unwilling to address the problem at scale.

I lean toward free speech in most cases, but there's a difference between protecting speech and amplifying the worst of human behavior through algorithmic distribution. The people building these platforms have chosen to look away while their users suffer the consequences, and that choice is a reflection of priorities that have nothing to do with making the internet better for anyone except shareholders.