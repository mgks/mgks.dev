---
title: "AI Agents Break the Web's Trust Model. Here's What We Need"
description: "As AI agents scale across the web, sites lose visibility into who's actually behind each request. We need new protocols to preserve accountability without blocking progress."
date: 2026-11-06 00:00:20 +0530
tags: rollup, cloud, ai-agents, web-standards, identity
image: "https://images.unsplash.com/photo-1680783954745-3249be59e527?q=80&w=1064"
featured: false
---

The web's trust model is breaking, and most people haven't noticed yet.

For decades, websites operated under a simple assumption: one visitor equals one person. That person might use privacy tools or a VPN, but the fundamental contract held. A site could identify, serve, and hold accountable the human on the other end of the connection.

AI agents are demolishing that contract.

When a user delegates tasks to an AI agent running on remote infrastructure, the website no longer sees the person. It sees the agent. And when one agent operates on behalf of multiple users, or multiple agents operate for one user, the site loses the ability to answer three fundamental questions: Who are you? Are you trustworthy? Who answers when something goes wrong?

I think most developers working on web infrastructure haven't fully internalized how broken this gets at scale.

## The Intermediation Problem Isn't New

Proxies, VPNs, and cloud browsers have been intermediaries for years. Sites could handle them by requiring direct access or by blocking intermediary traffic outright. But AI agents are different because they're not a niche tool anymore. They're becoming the default way people interact with the web.

This changes everything. When agentic traffic becomes the majority, blocking is no longer viable. Sites can't just say "use the web directly." They have to figure out how to work with agents while maintaining basic security and compliance.

The problem is structural. An agent can do things no human could: it doesn't tire, doesn't feel friction, acts in parallel, and operates around the clock. A human checking an airline website a few times per week looks different from an agent polling it constantly. A human making one purchase looks different from an agent buying items on behalf of four different people.

Without visibility into who's actually behind the agent, sites start absorbing costs they can't control.

## What Sites Actually Need to Know

Consider the Ezra example from the source material. Ezra is a personal assistant who runs errands for multiple clients. The grocer doesn't know whose preferences are whose. The bank can't tell if someone is trying to brute-force passwords on behalf of the account holder or attacking it. When a client disputes a purchase, the grocer has no way to prove authorization because they only ever saw Ezra.

Swap Ezra for an AI agent and the fundamental problems remain:

**Regulatory compliance**: Some sites have age or geographic restrictions. Without knowing who the actual user is, sites can't verify compliance.

**Fraud prevention**: [Friendly fraud](https://mgks.dev/tags/security/) happens when a user approves a purchase then disputes it as unauthorized. Agents remove the device and IP history that sites use to detect this pattern.

**Rate limiting and resource protection**: Free services designed with human-scale usage in mind get destroyed by agents polling endpoints constantly or consuming entire free trials in minutes.

**Content monetization**: An agent reads an article and summarizes it for the user somewhere else. The site paid to serve the content but gets no visit, no ad impression, no monetization.

**Accountability**: When an agent makes a mistake or acts maliciously, who answers? The operator? The user? The site can't tell, so it often absorbs the cost.

## The Wrong Solutions Are Already Being Proposed

I've seen two common proposals that I think fundamentally miss the problem.

The first is "human in the loop" (HITL): when an agent encounters a CAPTCHA, it passes it to the human to solve. This proves a human is present at that moment and nothing else. It doesn't solve traffic commingling, it doesn't help with fraud detection, and it undermines the entire point of agents by adding friction back into the process. Sites expect operators will just bypass it anyway.

The second is scope-based access control: restrict what an agent is allowed to do. The problem is that agents are built to do anything a user could, so they ask for broad permissions and usually get them. A scope of "everything" tells the site nothing useful. And knowing what an agent was authorized to do still doesn't answer who's accountable when it goes wrong.

Both solutions treat agents as hostile actors to be contained rather than as a new category of traffic that requires new protocols.

## What Actually Works

The industry is already exploring real solutions. [Web Bot Auth](https://mgks.dev/tags/web-standards/) allows agents to cryptographically sign their requests, providing secure identification without requiring the agent to pass as human. MOLE enables rate limiting without user-specific identifiers. The x402 protocol aims to enable payments while remaining privacy-preserving.

These aren't perfect, but they're directional. They treat identity as a spectrum that trades various degrees of information about a user while following data minimization principles.

The key insight is that sites don't need to know the human's name or location or browsing history. They need to know:

- Which agent is making this request and who's operating it
- Whether this agent was authorized to act on behalf of this user
- Whether the behavior matches what was authorized
- Who answers if something goes wrong

These questions can be answered through explicit protocols and cryptographic proofs rather than through device fingerprinting or IP-based tracking.

The internet works better when sites and agents collaborate to solve these problems instead of defaulting to adversarial blocking. The question isn't whether agents will scale. It's whether we'll build the infrastructure to let them scale responsibly.