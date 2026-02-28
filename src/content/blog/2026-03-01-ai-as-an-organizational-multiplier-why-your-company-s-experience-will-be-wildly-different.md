---
title: "AI as an Organizational Multiplier: Why Your Company's Experience Will Be Wildly Different"
description: "AI amplifies what you already do, for better or worse. From agentic patterns to security constraints, here's what actually matters in production."
date: 2026-03-01 00:00:12 +0530
tags: rollup, architecture, artificial-intelligence, software-engineering
image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'
featured: false
---

I don't usually share videos here because I'd rather read a transcript at 3x speed than sit through someone's 45-minute talk. But Laura Tacho's overview on how organizations are using [AI](https://mgks.dev/tags/artificial-intelligence/) is worth your time, mostly because it confirms something I've been seeing in the field: there is no typical experience with AI.

The data from DX shows wild variance. Some companies are seeing twice as many customer incidents after adopting AI tooling. Others are seeing half. The averages tell you almost nothing useful, which is exactly the kind of statistical trap I warn people about constantly.

What's actually happening is that AI acts as a multiplier on whatever organizational practices you already have. Good practices get amplified. Bad practices get turbocharged into chaos. If your team already struggles with code review discipline, giving everyone an AI coding assistant isn't going to magically fix that. It's going to produce more code that doesn't get reviewed properly, faster.

## The Agent Subconscious and Institutional Memory

Rachel Laycock shared something from a recent retreat that caught my attention: the concept of an "agent subconscious" built on a comprehensive knowledge graph of post mortems and incident data. This resonates deeply because I've watched countless production issues get resolved by someone who just *remembers* that time three years ago when something similar happened.

That latent knowledge locked in the heads of senior engineers and tech leads is organizational gold. The problem is those people eventually leave, go on vacation, or simply aren't in the room when the next incident fires. An agent that can query historical incident patterns isn't trying to replace that person. It's trying to make that knowledge accessible when they're not around.

This is fundamentally different from the "let's replace developers with AI" narrative that keeps circulating. We're talking about augmentation of expertise, not replacement of judgment.

## Agentic Engineering vs Vibe Coding

Simon Willison is starting a series on Agentic Engineering Patterns, and I'm glad someone is finally drawing clear boundaries here. There's a massive difference between "vibe coding" (non-programmers prompting their way to something that might work) and professional engineers using coding agents to amplify their existing skills.

His focus on test-first development with agents is exactly right. The biggest risk with coding agents isn't that they'll write bad code. It's that they'll write code that *seems* to work but doesn't, or worse, code that solves the wrong problem entirely. Writing the test first gives the agent a specification to work against and gives you a safety net.

I've been experimenting with this approach and it's surprisingly effective. The agent can iterate rapidly on implementation details while the tests keep it honest. But you need to know what tests to write, which requires actual [software engineering](https://mgks.dev/tags/software-engineering/) expertise.

## Fine-Scoped Agents and the VP of NO

Aaron Erickson's take on agent architecture is probably the most practical security advice I've seen: structure your agents like you would structure a company. Insert friction where decisions are costly. Reduce friction where they're cheap or reversible.

The idea of a "VP of NO" agent whose job is to slow down spending decisions is brilliant. It's the same principle we apply to human organizations. You don't give every engineer root access to production and unlimited cloud spend. You create approval processes and budget constraints.

Korny Sietsma wrote about the Lethal Trifecta last year: the combination of access to sensitive data, ability to execute actions, and decision-making authority. No single agent should have all three. Split the work. Follow the Principle of Least Privilege. Give each sub-task the minimum privilege it needs.

This isn't just more secure, it's also how LLMs work better anyway. Smaller contexts produce better results. Breaking work into "Think, Research, Plan, Act" stages keeps any individual agent from having too much context or too much power.

The days of "here's my agent with access to everything" should be numbered. If they're not, we're going to see some spectacular security failures.

## The Fresh Neural Networks Are Paying Attention

Someone told me their kid spotted AI-generated art at a swimming pool by noticing the six fingers. The parents had to look closely to confirm it. This tracks with what I'm hearing from educators: younger people are developing pattern recognition for [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) outputs faster than the rest of us.

They're being trained on this stuff in real-time, the same way my generation learned to spot photoshopped images or email phishing attempts. It's not magic, it's just exposure creating intuition.

## The Deluge Problem

I curate my feeds carefully. I follow specific people and ignore algorithmic recommendations. But most social media users are drowning in content they didn't ask for, much of it toxic.

The example from Instagram is hard to read but important. A woman sharing her trauma of being raped six years ago, and the comment section filled with men mocking her, thousands of likes on comments like "at least you had some." Platform operators are pretending this isn't their problem to solve.

I lean toward free speech as a principle. But there's a difference between defending unpopular ideas and defending harassment at scale. The platforms have tools to handle this. They're choosing not to use them, apparently hoping the problem will solve itself or that they won't face consequences.

It won't, and eventually they will, but in the meantime real humans are getting hurt by the deluge of ugliness that these platforms enable and profit from.