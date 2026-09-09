---
title: "Why AI Agents Need Sandboxes, Not Just Permissions"
description: "Explore how sandbox environments contain AI agents safely, handle credentials securely, and let developers experiment without risking their machines."
date: 2026-09-10 00:00:20 +0530
tags: rollup, open-source, ai-agents, security, containers
image: "https://images.unsplash.com/photo-1747920523600-bd6a3d064f4d?q=80&w=2070"
featured: false
---

I've been watching the rise of AI coding agents with equal parts excitement and concern. Claude Code, Gemini CLI, Copilot CLI, and a dozen others are moving from novelty to production, and they're running with increasing autonomy on developer machines. The problem is that autonomy without containment is a security debt waiting to compound.

The recent OpenAI/Hugging Face incident showed us 17,600 attacker actions that human review couldn't catch in real time. That number should change how we think about agent safety. We can't rely on post-execution audits or hoping developers notice something went wrong. We need isolation that works before a problem happens.

## Isolation as the Foundation

There's a fundamental tension here: agents need freedom to be useful. They need to install packages, run scripts, call external services, and make decisions without asking permission for each step. But giving that kind of autonomy directly on a host machine, with developer credentials available, is essentially running untrusted code in production.

A proper sandbox changes the game. I'm talking about real isolation, not just containerization. MicroVM-based sandboxes like Docker Sandboxes give each agent its own Linux kernel, isolated by a hardware-backed hypervisor boundary. That's the same level of isolation as a full virtual machine, but lightweight enough to spin up in seconds.

What this means in practice: if an agent installs a malicious package, escalates privileges, or gets prompt-injected into doing something destructive, the damage stays in the sandbox. When the run finishes, you delete the environment and everything inside disappears with it. The agent can go full autonomy mode because the blast radius is actually contained.

## Secrets Never Touch the Sandbox

Most sandboxes pass credentials in as environment variables or mounted files. That sounds reasonable until you realize: if the credential is inside the boundary, the workload can read it, log it, exfiltrate it. If an agent goes rogue or gets manipulated, your secrets leak.

The better approach is keeping credentials in the host keychain entirely. The sandbox injects them into outbound network requests at the boundary, so the agent gets the benefit without ever seeing the value. An agent that can't read your GitHub token also can't accidentally write it to a log or hand it off to a prompt-injected instruction.

This matters more than it sounds. I've seen teams treat agent credentials the same way they treat regular secrets, which means they're already treating them wrong. Agents need a different security model because they operate unattended. [Security practices for AI workflows](https://mgks.dev/tags/security) need to account for that.

## Policy Enforcement at Runtime

Isolation sets the outer wall, but what the agent can actually reach depends on the controls you define. Network access, filesystem access, which services it can call, which host paths it can read or write. Most tools let you scope some of this, but the implementation varies wildly.

What matters is that policy gets enforced at the boundary at runtime. The agent tries to connect to an unauthorized service? It fails at the network layer. It tries to read SSH keys? The filesystem policy blocks it. These controls hold even when the code inside tries something you didn't anticipate, which it will.

For platform and security teams, this becomes the unit of governance. Define policy once, apply it to every agent regardless of which tool is running it. One boundary to reason about, one set of controls to audit, consistent across every coding agent your developers adopt.

## A Real Development Environment

Here's where a lot of sandbox implementations fall short: they strip down the environment so much that the agent can't actually do useful work. A thin sandbox pushes work back onto the host, which defeats the entire point of having a boundary.

A sandbox worth using needs a full Linux environment. Real package management, shell access, service startup, databases, the ability to run Docker. Specifically, a full Docker daemon isolated within the sandbox so an agent can build and run containers as part of its workflow without any path back to the host daemon. That's a meaningful capability for agentic workflows where a single task might involve building an image, running tests, and tearing everything down.

## The Cost of Inconsistency

[Developer workflows with AI](https://mgks.dev/tags/developer-workflow) are fragmenting. Teams aren't standardizing on one agent; they're mixing Claude Code, Gemini CLI, different versions of different tools. If each agent brought its own isolation model, you'd end up securing a different environment for every tool, and vendors could shift their approach with each release.

A single sandbox technology running every agent the same way solves this at scale. Define your network, filesystem, and credential policy once. It applies no matter which agent is running. Consistency becomes enforceable.

The six benefits compound: isolation contains the blast radius, controls scope what the agent can reach, credentials stay out of its hands, environments are disposable and reproducible, you get a real dev environment for actual work, and consistency makes governance scale. Together, they let an agent operate at full speed while keeping the risk close to zero. But a gap in any one of them becomes the weak point a runaway agent finds first.