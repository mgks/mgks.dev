---
title: "Stateless MCP Has Won Me Back"
description: "Why the new stateless Model Context Protocol specification matters more than Skills for building secure, auditable AI agents that actually scale."
date: 2026-08-04 00:00:32 +0530
tags: rollup, engineering, mcp, ai-agents, llm-tools
image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070"
featured: false
---

Tuesday was Stateless MCP day. The rollout of MCP 2.0 (formally: 2026-07-28 Model Context Protocol specification) is the most significant change to the spec since November 2024, and it's completely reignited my interest in this protocol.

Let me back up. MCP is Anthropic's Model Context Protocol, a standard for exposing tools to LLM-powered agents. It had enormous momentum through 2025, then got eclipsed by Skills when everyone realized that giving an agent a shell with curl access could do almost everything MCP could do, but more flexibly. I was skeptical enough to write about the shift in my 2025 review.

But I'm coming back around now. And honestly, I think I was too quick to dismiss it.

## Why Shells Aren't the Answer

Giving an agent arbitrary terminal access with internet connectivity is fraught with risk. You need a model strong enough to navigate that environment safely, and you inherit every security surface area that comes with shell execution. MCP tools are far easier to audit and control. More importantly, simple enough that smaller models running on a laptop can still drive them reasonably well.

What changed this week is that the new stateless specification has dramatically decreased the complexity of implementing both clients and servers. I built three of them.

The difference is almost comically stark. Legacy MCP required two HTTP requests: first to initialize a session and grab a Mcp-Session-Id, then a second request to actually call the tool. The new stateless approach uses a single HTTP request. That's it.

Cleanly implemented, single responsibility, no server-side session management overhead. This is better architecture, period. It's also a better fit for scalable web applications because you're not maintaining session state or worrying about routing the same client to the same backend machine.

## Building on the New Foundation

I couldn't find a great CLI tool for interactively probing MCP servers, so I had Claude help me build one. mcp-explorer is the result, a stateless Python CLI that works with uvx. You can query any MCP server and get back a full list of available tools with their JSON schemas.

That single tool taught me more about the new spec in an afternoon than I learned about legacy MCP in weeks. I find building small utilities like this to be a genuinely productive way to learn specifications, even when an AI writes most of the code.

The second project was datasette-mcp, a Datasette plugin that exposes three tools: list_databases(), get_database_schema(), and execute_sql(). I've actually tried building this four times over the past year and a half. Only with the stateless spec did it feel good enough to ship. Now any Datasette instance can gain a /-/mcp endpoint that lets agents run SQL queries against your data. I'm running it on my blog mirror at datasette.simonwillison.net/-/mcp, and it's remarkably useful.

The third project was long overdue. My LLM tool has needed native MCP integration for months. The new llm-mcp-client plugin fills that gap, and I'm already considering pulling it directly into LLM core.

## The Security Angle

Here's what matters most: I wrote back in 2024 that MCP had prompt injection security problems. The core issue is that when end users mix and match tools, responsibility for avoiding data exfiltration attacks falls on the users themselves. That's a hard problem to solve well.

But general-purpose agents with arbitrary shell and curl access? That's exponentially harder. You're now managing security across terminal execution, network requests, arbitrary file system access. The default for most coding agent tools today.

MCP, by contrast, is much easier to reason about. You can audit what tools are available, what inputs they accept, what outputs they produce. You can rate-limit, you can sandbox, you can review logs afterward. For [building secure LLM applications](https://mgks.dev/tags/security/), this matters enormously.

The stateless specification makes this even better because it removes the architectural complexity that could hide security issues. Single requests, no sessions, no state to get out of sync.

## What Happens Next

I plan to lean hard into MCP when building sensitive applications on top of LLMs. The security properties are real. The implementation complexity is now low enough that it's actually viable for indie developers and small teams. And the ecosystem is starting to move in the right direction.

The bigger implication is that [AI agent architecture](https://mgks.dev/tags/ai-agents/) might bifurcate. For convenience and speed, you'll have general agents with shell access. For anything involving real data, real money, or real risk, you'll use MCP. That's actually a healthy outcome.

What's genuinely exciting is imagining what MCP servers look like when every database, API, and service provider has one ready to go.