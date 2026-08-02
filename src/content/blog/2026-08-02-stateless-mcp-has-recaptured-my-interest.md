---
title: "Stateless MCP has recaptured my interest"
description: "MCP 2.0 simplifies agent tooling with stateless design. I built three projects this week exploring why this matters for secure, scalable LLM applications."
date: 2026-08-02 12:00:31 +0530
tags: rollup, engineering, mcp, llm-agents, developer-tools
image: "https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674"
featured: false
---

Tuesday was Stateless MCP day. The rollout of MCP 2.0 (formally the 2026-07-28 Model Context Protocol specification) marks the most significant change to the spec since Anthropic introduced it in November 2024. I'm coming back around to this protocol in a big way.

For context: MCP saw a huge spike of interest through 2025, then got somewhat eclipsed by Skills when people realized that giving an agent shell access and curl could do most of what MCP did more flexibly. I wrote about that deflation in my 2025 review. But I'm reconsidering.

Giving an agent a shell environment with internet access is genuinely fraught. It requires a strong model, careful guardrails, and even then you're playing with fire. MCP tools are easier to audit, control, and simple enough that smaller models running on a laptop can drive them reasonably well. The new stateless design makes this even more compelling.

## From Stateful to Stateless

The complexity difference is striking. Legacy MCP required two HTTP requests: first to initialize a session and grab an Mcp-Session-Id, then to actually call the tool. Now stateless MCP does it in one clean request. This is so much better from both implementation and operational perspectives.

No more maintaining server-side session state. No more routing concerns for backend machines. This design is actually how web applications should work at scale. I built three projects this week just to explore this, and the simplicity made a real difference in how fast I could iterate.

I couldn't find a great CLI tool for interactively probing MCP servers, so I had Codex help me build one. mcp-explorer is a stateless Python CLI that works with uvx without installation:

```
uvx mcp-explorer call agentic-mermaid.dev/mcp list_tools
```

It queries tools and returns their JSON schemas. Add `| jq .svg -r` and you get rendered output. Building CLI tools like this is a genuinely productive way to get familiar with a specification, even when an AI writes most of the code.

## Two Plugins Worth Your Attention

datasette-mcp is probably my fourth attempt at this plugin, but the stateless design finally made it feel good to release. It adds a `/-/mcp` endpoint to any Datasette instance with three tools: list_databases, get_database_schema, and execute_sql (read-only for now).

Wire these into ChatGPT or Claude and they gain the ability to run SQL queries against your hosted Datasette. I'm running it on my blog's Datasette mirror. Watching Claude execute seven separate SQL queries to answer a question felt like watching the protocol actually work.

The second is llm-mcp-client, a new alpha plugin for my LLM tool. This has been overdue. I'm excited to experiment with MCP across more tools like [Datasette Agent and llm-coding-agent](https://mgks.dev/tags/llm-agents/).

## Security Actually Matters Here

Months after MCP launched, I wrote about prompt injection security problems in the protocol. The pattern of end users mixing and matching tools pushed responsibility for avoiding data exfiltration out to users themselves. I hadn't fully articulated it then, but that was the core concern.

Then general agents with arbitrary shell and curl arrived, and that's so much harder to keep secure. You can't reason about what might go wrong. Attackers have infinite surface area.

Something I've come to appreciate about MCP is that it's actually tractable to reason about agent capabilities and failure modes. The default tool set is bounded. You can audit what an agent can access. This is the opposite of [agents with open network access](https://mgks.dev/tags/security/).

I plan to lean into MCP significantly when building sensitive applications on top of LLMs. The security posture is just fundamentally better. When you're building systems that access real data or perform consequential actions, bounded capability sets aren't a limitation, they're a feature.

The stateless design removes a major barrier to adoption. Smaller teams can now build MCP servers and clients without worrying about session management or scaling concerns. This could shift how we think about connecting LLMs to specialized tools, especially in enterprise contexts where auditability actually matters.

How many production LLM applications are still held back by the choice between dangerous flexibility and the friction of building custom integrations each time?