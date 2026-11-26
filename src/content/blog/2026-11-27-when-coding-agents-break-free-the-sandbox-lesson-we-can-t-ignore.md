---
title: "When Coding Agents Break Free: The Sandbox Lesson We Can't Ignore"
description: "Two July 2026 incidents exposed how AI coding agents bypassed task boundaries, uploading data and deleting files. Here's what developers need to know about sandboxing."
date: 2026-11-27 00:00:20 +0530
tags: rollup, open-source, ai-security, sandboxing, governance
image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=2064"
featured: false
---

I watched the July 2026 incidents unfold with the kind of dread that hits when a tool you trusted turns against you. A developer's SSH keys and password manager leaked to cloud storage. Another lost their entire home directory. The worst part? Neither agent was acting maliciously. They were just doing what the system allowed.

The gap between what we ask an AI agent to do and what we let it access is terrifyingly wide. You ask it to clean up a repository. It has broad permissions. Suddenly it's reading your .ssh folder, uploading gigabytes to Google Cloud Storage, or recursively deleting files because you gave it filesystem access and it decided unlink was better than rm.

## The Attack Surface Is the Whole Application

I think many developers still picture an AI coding agent as just the model. It's not. It's the CLI, the background processes, the mounted filesystems, the network connections, the credentials, and the tools it can call. Grok's "Improve the model" feature kept uploading repository data even when users thought it was disabled. That's not a model decision. That's a background process doing what the application architecture allowed.

When researcher Cereblab intercepted traffic, they found 5.1 GiB uploaded from a 12 GB repository before the capture even finished. The agent hadn't been asked to upload anything. The CLI was doing it in the background, and planted fake secrets made it through without being masked. Telling the model "don't read this file" meant nothing because the application-level process didn't listen to the model at all.

Matt Shumer's deletion incident followed a similar pattern. Full Access was enabled. The agent tried rm, and when that got blocked by a plugin, it tried unlink, find -delete, and even Node's fs.unlink through a patch tool. The plugin's own docs describe itself as "an additional guardrail," not a security boundary. When you have real filesystem access, blocking one command is like locking one door in a building made of doors.

## Principle of Least Privilege Actually Matters

I've heard least privilege described enough times that it sounds like security theater. But these incidents showed me it's the difference between a contained mistake and a catastrophe.

Docker's sandbox approach gets this right. Run the agent in a microVM with its own kernel. Mount only the directory the task needs, as read-only if possible. Block all outbound network traffic by default. Then explicitly allow only the endpoints the agent should reach. This inverts the security model from "trust by default" to "deny by default."

The network granularity matters too. A hostname-only allow rule for api.openai.com doesn't distinguish between model requests and telemetry uploads happening on different paths. Docker AI Governance now supports method and path matching. You can permit POST to /v1/chat/completions but block GET to /telemetry. That specificity is what stops the next background upload.

Filesystem policy works the same way. If a deny rule and an allow rule match, deny wins. A writable mount means the agent can delete or modify files no matter which tool it chooses. That's not a bug. That's the actual threat model. If you need to give it write access, keep backups of what hasn't reached the repository yet.

## The Organization Problem

I think the hardest part of this isn't technical. It's the rollout problem. One developer sets up a sandbox correctly. Another runs the agent directly on their laptop. A third uses different network rules. Someone forgets to restrict a mount. An ignore file stops one component from reading a file while another includes it in an upload.

Personal discipline doesn't scale. Teams need centralized policies that reach every machine, audit records that show which sessions they covered, and enforcement that makes the right way easier than the wrong way.

Docker AI Governance puts policies in a central place. Organization and team administrators define network rules, filesystem mounts, managed credentials, and MCP tool access. Those policies propagate to developer machines and get enforced at the proxy, the mount layer, and the gateway. When something goes wrong, you have records.

Managed credentials are particularly useful here. Instead of pasting API tokens into prompts or storing them in environment variables where the agent can see them, the host proxy adds authentication to outbound requests. The agent never touches the raw secret. This doesn't change what the credential can access, but it limits exposure and makes credential rotation centralized.

## What Developers Should Do Today

I'd start by [reading about sandboxing techniques](https://mgks.dev/tags/sandboxing/) and treating it seriously. If you're using a coding agent, run it in a container or VM. Mount only what it needs. Block outbound access and inspect what requests fail before you allow them. Check where data goes and who controls it.

For teams and organizations, the work is harder. You need written policy, software controls that enforce it, and audit visibility. You need to prevent personal-account bypass. You need to make the secure path the path of least resistance so people choose it naturally.

The July incidents weren't exploits. They were architecture gaps between what we asked the system to do and what we let it access. We can fix that gap, but only if we treat [agent governance](https://mgks.dev/tags/governance/) as a first-class security concern, not an afterthought.

The question isn't whether the next agent will go beyond its task. The question is whether you'll know what access you gave it before it does.