---
title: "I Asked an AI to Audit Code and It Found 80+ Real Vulnerabilities"
description: "GitHub's open source taskflow agent found authentication bypasses, IDORs, and PII leaks with a 50% true positive rate. Here's how it actually works."
date: 2026-03-07 12:00:32 +0530
tags: rollup, open source, artificial intelligence, security
image: 'https://images.unsplash.com/photo-1680783954745-3249be59e527?q=80&w=1064'
featured: false
---

GitHub's Security Lab just released something that honestly makes me question what security auditing is going to look like in a year or two. They've been running an [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) agent against open source projects and finding high-severity vulnerabilities at a rate that would make most bug bounty hunters jealous. Over 80 vulnerabilities reported so far. Authentication bypasses. Insecure direct object references that leak personally identifiable information. One finding where you could literally log in with any password.

The wild part? This isn't some carefully tuned model trained on millions of vulnerability datasets. It's taskflows. YAML files with prompts. The framework is called seclab-taskflow-agent and it's completely open source. You can run it yourself right now if you have a GitHub Copilot license.

I've spent years watching AI demos that promise revolutionary code analysis, and most of them fall apart the moment you point them at real codebases. Too many hallucinations. Too many false positives. The signal-to-noise ratio makes them useless for actual security work. But this approach is different because it doesn't try to do everything in one massive prompt.

## Breaking Down How Taskflows Actually Work

The core insight here is stupid simple but effective. LLMs suck at complex multi-step reasoning when you dump everything into one giant context window. Even with the newer models that can supposedly handle 200k tokens, they skip steps or make stuff up. Anyone who's tried to get an LLM to do a thorough code review knows this pain.

Taskflows split the work into sequential stages. First, the system does threat modeling. It divides the repository into components based on functionality. It identifies entry points where untrusted input comes in. It figures out what each component is supposed to do, which sounds basic but is actually critical for determining if something is a vulnerability or just how the software is designed to work.

Think about it. A command injection in a CLI tool that's specifically built to execute user scripts isn't a security bug. An SSRF in a reverse proxy application is literally the point of the application. Traditional static analysis tools flag these constantly because they can't understand intent. The GitHub team built this contextual awareness directly into the taskflow design.

After threat modeling, there's a brainstorming stage where the agent suggests potential vulnerability types for each component. This is intentionally loose. The agent gets freedom to explore different attack vectors based on the component's exposure to untrusted input and its security boundary. The key trick is explicitly telling it not to audit the suggestions yet, just generate candidates.

Then comes the audit stage with fresh context. The suggestions from brainstorming are treated like unvalidated alerts from an external scanner. The agent has to scrutinize each one with strict criteria. It needs to provide concrete attack scenarios. It needs to cite specific files and line numbers. It's told explicitly that many suggestions will be false positives and it should not make things up.

This two-stage design prevents the self-validation problem where an AI just confirms its own assumptions. By resetting context between stages and using different prompts, the audit phase actually catches the hallucinations from the brainstorming phase.

## The Vulnerabilities They Found Are Legitimately Scary

Let me walk through some of the disclosed findings because the severity distribution is not what I expected.

First run against Outline, a TypeScript collaboration suite. The agent found an authorization bypass where low-privileged users could add arbitrary groups to documents they shouldn't be able to modify. The exploitability description was precise enough that manual verification took minutes, not hours. Outline patched it in three days.

Then there's WooCommerce. Guest order enumeration that exposed names, addresses, phone numbers. This had been sitting there undetected. The agent found similar issues in Spree commerce too. Two CVEs where you could enumerate addresses by incrementing sequential IDs. These are the kinds of boring, obvious-in-hindsight authorization bugs that somehow survive for years in production codebases.

But the Rocket.Chat finding is the one that made me do a double take. In their microservices setup, you could log into their DDP Streamer service using literally any password. Any password. The technical details are almost funny if they weren't so serious. They were using bcrypt.compare which returns a Promise, but they forgot to await it. A Promise object is always truthy in JavaScript, so the validation always returned true.

The fact that an LLM caught this subtle async logic bug across multiple files and correctly assessed the security impact is genuinely impressive. This isn't pattern matching against known vulnerability signatures. This is understanding code flow and JavaScript semantics.

## The Numbers Tell an Interesting Story

Out of 40 repositories tested, the agent suggested 1,003 potential issues. After the audit stage, 139 were marked as actual vulnerabilities. Post-deduplication and manual verification, 91 confirmed vulnerabilities. That's roughly a 50% true positive rate after the audit stage filters things.

What stands out is the vulnerability distribution. Business logic issues are 25% of findings. IDOR issues alone outnumber the next two categories combined. The agent is really good at understanding access control models and following control flow through complex codebases. That's exactly where traditional static analysis tools struggle the hardest.

Memory safety issues barely register, which makes sense given most tested repos are in memory-safe languages. But it also suggests taskflows might not be the right tool for finding memory corruption bugs. That's fine. Different problems need different approaches.

Here's what surprised me about the false positives. None of them are hallucinations in the traditional sense. Every false positive has real evidence backing it up. You can follow the report, find the endpoint, test the payload. They're just wrong about exploitability due to mitigations or authentication layers the agent missed. These are the same mistakes a junior human auditor would make, not AI-specific nonsense.

The team added a post-audit filtering taskflow to remove low-severity findings and it cuts out about 50% of the noise. The whole system is tunable based on your risk tolerance.

## What This Means for Security Work

I'm not going to pretend this replaces security researchers. Manual verification is still required. The exploit chains that matter most are the creative ones that need deep domain knowledge. But 80+ real vulnerabilities in open source projects that nobody else found? That's not nothing.

The democratization angle is what interests me. This framework is [open source](https://mgks.dev/tags/open-source/). Anyone can run it. Anyone can write their own taskflows. The barrier to entry for systematic security auditing just dropped significantly. Small teams that can't afford dedicated security staff can point this at their codebase and get actionable findings.

I also think the taskflow approach generalizes beyond security. The same pattern of breaking complex analysis into sequential stages with strict validation between steps could work for code quality checks, architecture reviews, dependency analysis. Any problem where you need an AI to do multi-step reasoning over a large codebase.

The GitHub team is explicitly asking people to write their own taskflows. They want community contributions. That's how you get a tool that actually improves instead of stagnating with the same vendor-locked prompts.

What I keep coming back to is how much of this is just good engineering rather than [AI](https://mgks.dev/tags/artificial-intelligence/) magic. The model isn't special. The prompts aren't doing anything groundbreaking. The insight is structuring the problem so the AI's strengths matter and its weaknesses don't kill you. Threat modeling to establish context. Two-stage validation to prevent hallucinations. Explicit instructions to cite evidence and admit uncertainty.

Maybe that's the real lesson here: the teams that figure out how to build scaffolding around AI instead of just throwing prompts at problems are going to get disproportionate value out of these tools.