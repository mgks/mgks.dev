---
title: "Why Stateless MCP Changes Everything for AI Agents"
description: "The new MCP 2.0 specification eliminates session state, making it vastly simpler to build secure AI agent tools. I built three projects in a week to prove it."
date: 2026-08-03 00:00:32 +0530
tags: rollup, engineering, mcp, ai-agents, protocol-design
image: "https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988"
featured: false
---

Tuesday was Stateless MCP day. After months of following the Model Context Protocol on the sidelines, the 2026-07-28 specification update has genuinely reignited my interest in the entire ecosystem.

Let me back up. MCP is Anthropic's standard for exposing tools to LLM-powered agents. It launched in November 2024, had massive momentum through 2025, then got somewhat sidelined when people realized you could give agents shell access and just call curl. That's flexible, sure, but also dangerous in ways I wrote about extensively.

The stateless redesign changes the game. Where the old spec required two HTTP calls (one to initialize a session and grab an ID, another to actually invoke a tool), the new version does everything in a single request. No session tracking. No server-side state. No routing headaches in distributed systems.

## Why This Matters More Than It Sounds

I couldn't resist building three projects this week to test the waters. The first, `mcp-explorer`, is a CLI tool I had Codex help me write. It lets you interactively probe any MCP server without installation:

```
uvx mcp-explorer https://agentic-mermaid.dev
```

That outputs the full tool list with JSON schemas. Add `| jq .svg -r` and you get rendered diagrams. Building this forced me to really understand the spec, and what struck me most was how straightforward the implementation became. The stateless design meant I could focus on the protocol itself rather than session plumbing.

The second project, `datasette-mcp`, adds MCP support to any Datasette instance. This is actually my fourth attempt at this plugin, but the first one that feels production-ready. Three simple tools: list databases, fetch schemas, execute read-only SQL. Wire it into Claude or ChatGPT, and suddenly your hosted database becomes an agent-accessible resource. I got it running on my blog's Datasette mirror, and watching agents run seven separate queries to answer a single question? That's where the real value becomes obvious.

## The Security Inflection Point

Here's what changed my mind about MCP. A year ago, I wrote about prompt injection risks in the protocol. The concern was real: end users mixing arbitrary tools without understanding the attack surface. Fair criticism.

But then general-purpose agents with arbitrary shell and network access became the default. That's so much harder to secure. You're asking models to navigate unfamiliar operating systems, interpret error messages, pipe commands together without breaking things. One hallucination about a command flag and you've got data exfiltration.

MCP tools, by contrast, are bounded. I can reason about what `execute_sql()` does. I can audit it. A smaller model running on a laptop can drive it reliably. Compare that to asking Claude to SSH somewhere and troubleshoot a configuration file.

## Why This Matters for Your Next Project

I'm planning to use MCP heavily for sensitive applications. When you're building something where you need to restrict what an agent can do, MCP's bounded contract is genuinely comforting. The protocol forces explicitness: here's exactly what this tool does, here's the input schema, here's what comes back.

The stateless redesign makes this practical at scale. No session garbage collection. No distributed cache coherency problems. No need to pin sessions to specific backend instances. For web applications in particular, this is a huge shift.

I'm also bringing MCP into the `llm` CLI tool as an official plugin, which opens possibilities for https://mgks.dev/tags/ai-agents/ frameworks that don't require you to surrender to full shell access. The third project this week was exactly that: an alpha `llm-mcp-client` plugin that lets you chain MCP tools into the CLI.

The deeper pattern I'm seeing is that MCP represents a middle ground between two bad extremes. On one side: no agent capabilities at all. On the other: unrestricted execution in hostile environments. MCP tools sit in the sweet spot where you get real power without unlimited footguns.

The stateless spec makes that sweet spot actually deliverable. And that might be the most important architectural decision Anthropic made around agents this year.

If your current approach to agent tooling is "here's a shell, good luck," it might be worth reconsidering what you could build instead with bounded, auditable tools that even smaller models can reliably operate.

What would your agent do differently if it had to ask permission through explicit tool contracts rather than just running arbitrary commands?