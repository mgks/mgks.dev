---
title: "GitHub's eBPF Solution to the Circular Dependency Problem You Didn't Know You Had"
description: "How GitHub uses eBPF to detect circular dependencies in deployment scripts, preventing catastrophic incidents when systems depend on themselves to recover."
date: 2026-04-17 12:00:54 +0530
tags: rollup, open source, ebpf, devops, infrastructure
image: 'https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988'
featured: false
---

There's something darkly funny about the idea that GitHub hosts its own code on GitHub. It's the ultimate dogfooding scenario, but it comes with a problem that sounds almost too philosophical: if GitHub goes down, how do you deploy the fix when your deployment tooling needs GitHub to work?

This isn't just a thought experiment. It's a real operational nightmare that GitHub's infrastructure team had to solve. And their solution, using eBPF to detect and prevent circular dependencies in deployment scripts, is one of those elegant technical approaches that makes you wonder why we haven't been doing this all along.

## The Dependency Hell You Can't Test For

Let me paint you a scenario that's probably happened at your company too. A MySQL outage takes down part of GitHub's infrastructure. The site can't serve release data from repositories. To fix it, you need to roll out a configuration change to the affected MySQL nodes. Simple enough, right?

Except your deployment script might be calling out to github.com to download a binary. Or hitting an internal service that happens to depend on that same MySQL cluster. Suddenly your fix can't deploy because the very thing you're trying to fix is blocking your ability to fix it.

The traditional answer was code review. Every team that owned stateful hosts had to manually audit their deployment scripts for circular dependencies. But as anyone who's worked at scale knows, this is the kind of thing that sounds great in theory and fails spectacularly in practice. Dependencies get added incrementally. Third-party tools take on new dependencies in patch updates. Nobody catches it until 2am when production is on fire.

You might think the obvious fix is to just block access to github.com from these machines entirely. But these aren't isolated deployment boxes. They're stateful hosts serving customer traffic even during rolling deploys. Blanket blocking github.com would break legitimate production traffic.

## Enter eBPF, Stage Left

This is where the solution gets interesting. eBPF (extended Berkeley Packet Filter) lets you load custom programs directly into the Linux kernel and hook into core system primitives. Think of it as JavaScript for your kernel, except way more powerful and slightly more terrifying.

GitHub's team zeroed in on the BPF_PROG_TYPE_CGROUP_SKB program type, which hooks into network egress from a specific cGroup. For those not steeped in [Linux infrastructure](https://mgks.dev/tags/infrastructure/), a cGroup is a Linux primitive that enforces resource limits and isolation for sets of processes. Docker uses them heavily, but you don't need Docker at all.

The insight here is brilliant in its simplicity: create a cGroup, place only the deployment script inside it, and limit outbound network access for just that script. The host continues serving production traffic normally while the deployment process runs in a restricted sandbox.

The implementation uses cilium/ebpf, a pure-Go library that dramatically simplifies working with eBPF. No need to wrestle with kernel headers or arcane C build systems. A simple `go generate` directive compiles the eBPF C code and auto-generates the necessary Go structs. Just `go build` and you're done.

## DNS Blocking Without the IP Address Nightmare

Here's where it gets trickier. CGROUP_SKB operates on IP addresses. Maintaining a blocklist of GitHub's sprawling infrastructure would be an exercise in futility. IPs change constantly. Services move. Good luck keeping that up to date.

So they added another layer using BPF_PROG_TYPE_CGROUP_SOCK_ADDR, which hooks syscalls that create sockets and can rewrite the destination IP. Any DNS query (port 53) gets intercepted and redirected to a userspace DNS proxy that GitHub runs.

Now the flow is elegant: deployment script makes a DNS query, eBPF intercepts it, forwards to the DNS proxy, proxy checks against a domain blocklist, and uses eBPF Maps to tell the CGROUP_SKB program whether to allow or deny the subsequent connection. All without maintaining a massive IP blocklist that would be outdated before you committed it to git.

The DNS proxy approach also makes updates trivial. Add a domain to the blocklist and it takes effect immediately. No kernel recompilation, no host restarts, no complex IP range calculations.

## Debugging Without Losing Your Mind

The real cherry on top is the observability work. When a deployment fails because of a blocked request, developers need to know exactly which command triggered it. Otherwise you're stuck grepping through logs trying to correlate timestamps.

Inside the BPF_PROG_TYPE_CGROUP_SKB program, they extract the DNS transaction ID from the skb_buff along with the Process ID that initiated the request. This mapping goes into an eBPF Map. When the DNS proxy sees a request, it looks up the transaction ID, finds the PID, reads `/proc/{PID}/cmdline` to get the full command, and logs everything together.

The result is a log line that tells you exactly what broke: the domain that was blocked, which process tried to access it, and the full command line that triggered the request. This turns debugging from an archaeological expedition into a straightforward fix-and-ship workflow.

## Six Months Later

After a six-month rollout, the system is now live across GitHub's infrastructure. Teams get immediate feedback when they accidentally add problematic dependencies. Third-party tools that take on new dependencies get caught automatically.

The impact on mean time to recovery is significant. Those 2am incidents where you discover a circular dependency while trying to deploy a fix? They don't happen anymore, or at least happen far less frequently.

Is this a perfect solution? Of course not. GitHub's team explicitly acknowledges there are still ways for circular dependencies to slip through. But perfect is the enemy of shipped, and this is a massive improvement over "hope someone catches it in code review."

## The Broader Picture

What strikes me about this approach is how it represents a fundamental shift in how we think about preventing operational problems. Instead of relying on human vigilance and process, they built a system that makes the wrong thing impossible, or at least immediately obvious.

This is the promise of eBPF that has the [infrastructure](https://mgks.dev/tags/infrastructure/) and [open source](https://mgks.dev/tags/open-source/) communities so excited. It's not just about observability or security or networking. It's about being able to enforce invariants at the kernel level without modifying the kernel itself. You can ship new safety guarantees without waiting for your entire fleet to upgrade to a new kernel version.

Tools like bpftrace and ptcpdump are making eBPF more accessible to developers who don't want to write custom programs. But there's something powerful about seeing a team identify a specific operational problem and build a custom eBPF solution to solve it. This is the kind of systems thinking that prevents entire classes of incidents.

The circular dependency problem isn't unique to GitHub. Every company running infrastructure at scale has some version of this, where systems depend on themselves in ways that aren't obvious until everything breaks at once. The question is whether you discover those dependencies through painful incidents or through automated tooling that catches them before they matter.