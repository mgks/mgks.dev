---
title: "AI Agents Need Boundaries, Not Just Instructions"
description: "How Docker AI Governance separates agent authority from model capability through sandbox policies, tool governance, and audit trails."
date: 2026-11-19 06:00:20 +0530
tags: rollup, open-source, ai-agents, security, docker
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

I've been thinking about the moment when AI moved from answering questions to taking actions. That shift changes everything about how we should think about security.

When a model decides what to do versus when an organization actually allows it to happen - that distinction is now critical. A coding agent can install packages, edit files, call external services. The security question isn't whether it's capable. It's whether it should be allowed to right now, in this context, with these permissions.

I used to think about security as something you baked into instructions. Tell the model to be careful. Tell it what not to do. That doesn't scale with agents that can execute real work. The model output is not automatically an authorized action, and we need infrastructure to enforce that gap.

## Where Can the Agent Actually Work?

Docker Sandboxes solve this with microVMs - isolated lightweight virtual machines where each agent gets its own Docker Engine, filesystem, and network stack. But isolation alone isn't governance. Docker AI Governance adds policy on top.

A security team can now define what an agent can reach. Specific domains allowed. Certain IP ranges blocked. Filesystem paths mounted as read-only. These aren't suggestions passed to the model. They're enforced at the network proxy and filesystem mount layer. The agent literally cannot bypass them.

What I find powerful here is consistency. The same boundary follows developers across their sandboxes instead of being configured differently on every machine. A junior developer and a senior architect get the same enforced limits, not just the same advice.

A developer checks what's actually allowed before starting the agent. The result comes from active policy, not from hoping the model will remember an instruction. That's the difference between governance that works and governance that depends on good behavior.

## Tools Need Permission, Not Just Access

MCP (Model Context Protocol) is how agents connect to external tools and services. But making a tool available shouldn't mean every agent can use it immediately. That's where MCP Tool Governance enters.

Administrators write policies in Cedar that control which MCP servers agents can reach and what they can do through them. A policy might allow read-only tool calls to a specific server. Another policy might require human confirmation before a sensitive action runs. A third might block access entirely.

This makes tool access an explicit policy decision. Teams get the tools they need for their work. Everything else stays unavailable. It's different from [AI security practices](https://mgks.dev/tags/security/) where we hope teams configure things safely on their own.

One important boundary worth naming: MCP policies apply to tools accessed through Docker's MCP Gateway. If an agent connects directly to a remote MCP server from inside the sandbox, it falls under the sandbox's network policy instead. The architecture matters.

## Audit and Visibility Close the Loop

You can't trust what you can't see. Docker AI Governance records sandbox policy decisions and session events as structured audit records. Each record captures the principal, action, target, decision, and timestamp.

Denied actions are especially useful. You see not just that something failed, but that a governance rule blocked it and which rule. Allowed actions matter too - they show how policy was actually applied while the agent worked.

These records can stay local or ship to cloud storage. From there, teams can search organization-wide activity, export for analysis, or feed directly into existing SIEM workflows. The audit trail becomes part of your compliance story and your incident response toolkit.

I think about this for teams dealing with [enterprise AI](https://mgks.dev/tags/ai-agents/) deployments. A CISO needs to answer hard questions: What access does this agent have? Where are those boundaries enforced? What evidence do we have afterward? Audit logs make those answers concrete.

## The Supply Chain Piece

Governance controls what an agent is allowed to do at runtime. Separate from that is a question about artifacts: what container images and software are agents building, testing, or deploying?

Docker Hardened Images provide minimal, production-ready container images with signed SBOMs, VEX information, cryptographic signatures, and SLSA Build Level 3 provenance. Teams can inspect what's inside an image and verify how it was built. Trust isn't just about where it came from - it's about what's inside it.

These two layers work together. Governance controls the agent's authority while it works. Hardened Images establish trust in the artifacts the workflow depends on.

The pattern that emerges is clean: define the boundary, check it before the agent starts, enforce it while running, and audit what happened. If the boundary needs to change, you change the policy. You don't hope the model will behave differently.

The real challenge with agentic AI isn't that agents make decisions. It's that those decisions lead directly to real actions in real systems. That makes the boundary around the agent as important as the model itself - and maybe more important.