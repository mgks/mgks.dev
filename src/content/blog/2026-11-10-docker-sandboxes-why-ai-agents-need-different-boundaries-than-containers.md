---
title: "Docker Sandboxes: Why AI Agents Need Different Boundaries Than Containers"
description: "Containers isolate applications, but AI coding agents need machine-shaped isolation. Here's why Docker built sandboxes with their own kernel."
date: 2026-11-10 12:00:20 +0530
tags: rollup, open-source, docker, containers, ai-agents
image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070"
featured: false
---

I've been using Docker for years, and when I first heard about Docker Sandboxes, my brain did what it always does: tried to fit them into the container mental model. A sandbox is just a container with AI stuff inside, right? Not quite.

This distinction matters more than it might seem, and it reveals something important about how we're building AI infrastructure: the primitives we designed for one job don't automatically work for another, no matter how similar they sound.

## Containers Were Built for Applications, Not Actors

A container is a process (or group of processes) running on a host with its own view of the filesystem, process tree, and network. Linux namespaces provide that isolation, and cgroups meter resources. The key thing is that every container on a machine shares the same Linux kernel. This design is why containers start in milliseconds, pack densely, and carry almost no overhead. Over a decade of tooling has built around this: Compose, Kubernetes, registries, image scanners, CI systems. They all treat the container as the common unit.

This works beautifully for what containers were designed for: running a service, executing a code snippet, processing a request, or running an evaluation and disappearing. The problem is that AI coding agents don't fit that shape.

An autonomous coding agent is an actor. It makes decisions and operates on systems the way a developer uses a laptop. It clones repositories, installs packages, starts databases, builds images, and tries again for hours. It reads instructions from files, web pages, issue descriptions, and tool output that nobody reviewed. Some of that input is untrusted. A malicious instruction in a README or tool description can steer the agent on purpose. The code it generates might be wrong or actively hostile.

I think about the agent that deleted a production database after misreading its task. When the agent runs unattended in YOLO mode, there's no permission prompt left to catch it. A workload with that much authority and that little predictability needs a boundary designed for it. And that's not a container.

## The Kernel Boundary Problem

Here's the crux: a container's boundary is enforced by the kernel it shares with every other container on the machine. Escaping a container requires a kernel exploit or a sophisticated side-channel attack, which aren't everyday finds. But if you do breach that boundary, you're standing in the host kernel with access to every other process, every credential mounted alongside them, and potentially every other container's data.

An agent doesn't need an exploit to find the gaps in container configuration. Give it a Docker socket (mounted via `/var/run/docker.sock`), and it'll probe its surroundings, work out that it's in a container, and find the hole. That socket hands a container control of the host Docker daemon, which is why Docker limits it to trusted users. An agent will find it. Docker-in-Docker setups, mounted credentials, and broad host mounts are other holes agents are likely to discover because probing their environment is literally part of the work.

## A Different Boundary for a Different Job

Docker Sandboxes run an agent inside a microVM with its own Linux kernel, its own filesystem and network stack, and a private Docker Engine. The agent gets sudo inside that isolated environment. It can install packages, run services, build images, and bring up entire applications without reaching the host daemon, the host filesystem outside its workspace, or other sandboxes on the same machine.

The architecture puts the trust boundary in the right place. If an agent escapes its container inside a sandbox, it lands in a disposable microVM. The host stays out of reach. You can delete the sandbox and start another. Each agent gets its own microVM, so two agents running on the same machine can't reach each other either.

This isn't just about compartmentalization. A microVM can't hide what you choose to share with it. The workspace is mounted read-write by default, so the agent can edit or delete files. MCP servers and skills are shared too. Clone mode gives the agent a private in-VM clone to work in, protecting the host working tree. Whatever you mount, you can see and reason about what the agent can touch.

## What This Means for the Industry

I think we're at an inflection point where we're asking infrastructure primitives to do jobs they weren't designed for. Containers were the right answer to application isolation, and they still are. But they're not the right answer to autonomous agent isolation, and trying to make them fit wastes effort and introduces risk.

The fact that Docker built a separate technology rather than forcing agents into containers tells me something: the teams building AI infrastructure are thinking carefully about boundaries, not just throwing existing tools at new problems. That's rare and worth paying attention to.

The configuration trade-off is real. A sandbox needs a supported hypervisor, and setup requires some thought. But Kits and environment files make this repeatable. You record a project's sandbox configuration in `sbxenv.yaml` and commit it to the repo. New developers reproduce the setup without relearning what worked.

If agents are going to run at scale inside organizations, the infrastructure around them needs to be as standardized and reproducible as containers are now. That's not a given, but watching Docker move [policy controls to organization-wide standards](https://mgks.dev/tags/ai-governance/) and [publish agent-specific Kits](https://mgks.dev/tags/docker/) suggests the industry is taking that seriously.

The question isn't whether agents will run in your infrastructure: they will. The question is whether you'll have thought through your boundaries before they do.