---
title: "Security Research in the Age of AI: What Really Matters"
description: "An inside look at how top security researchers validate findings, use AI responsibly, and build exploit chains that matter to developers."
date: 2026-10-25 12:00:20 +0530
tags: rollup, open-source, security, bug-bounty, ai-tools
image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070"
featured: false
---

I've been thinking a lot lately about what separates good security research from great security research. The GitHub Bug Bounty team recently spotlighted a researcher named r31n, and their approach offers some genuinely useful lessons for anyone interested in security, AI, or how to do rigorous technical work in an industry that's moving fast.

Here's what struck me: r31n doesn't have a favorite bug class. Instead, they think in terms of exploit chains. An open redirect on its own might seem harmless, but chain it with an SSRF that follows redirects, and suddenly you've got something serious. This is the kind of systems-level thinking that matters.

## The Tools Trap

AI has lowered the barrier to entry for security research. That's real. But r31n makes something clear that I think developers need to hear: tools don't matter. The quality of the work does.

I see this a lot. People get excited about a new security scanner or AI-powered analysis tool, and they think that's going to make them better researchers. But r31n prefers manual investigation and small, purpose-built scripts. They'll automate something only when they catch themselves repeating a task.

What's interesting is their point about mindset. You can become extremely good with a particular tool and still miss interesting bugs because you're only seeing the target through that tool's lens. Over-reliance on automation narrows the way you think. Tools change. Techniques change. Curiosity and persistence age better.

For developers reading this, the implication is straightforward: don't outsource your understanding to tools. AI and automated scanners can accelerate your work, but they shouldn't replace the fundamentals of understanding how your code actually works.

## AI as an Accelerator, Not a Replacement

r31n uses AI quite a bit, but mostly as an accelerator. They use it for navigating unfamiliar code, finding call sites, tracing data through the codebase, and understanding how systems interact. They also find it helpful for writing proof-of-concept scripts.

But here's the critical part: they verify everything manually. AI gives you false positives. It hallucinates. It makes confident wrong answers. And if you're doing security research, you can't afford to trust that.

I think this is relevant to [DevSecOps](https://mgks.dev/tags/devsecops/) more broadly. As organizations start incorporating AI into their security tooling, the same principle applies. AI can help you move faster, but it doesn't replace verification. A tool that tells you there's a vulnerability isn't the same as you understanding that vulnerability.

## How to Think About Sources and Sinks

When r31n starts investigating an application, they think in terms of sources and sinks. A source is where attacker-controlled data enters the system. A sink is where that data gets consumed in a security-sensitive operation. The interesting part is tracing what happens in between.

This is actually a really useful mental model for developers building systems. If you can identify your sources and sinks, and you understand the transformations and validations happening in between, you're already thinking like a defender. You're already considering trust boundaries.

For teams building and shipping software, this approach scales. You don't need to memorize every vulnerability type. You need to understand your data flows. You need to know where untrusted input enters your system and where it might be used in dangerous ways.

## Validation, Proof of Concept, Impact

What separates researchers who get VIP status from those who don't is consistent work at a high level. Findings need to be verified. Reproducible. They need to demonstrate that a security boundary has actually been crossed, not theorize about it.

This is where I think the security research community gets something right that the broader software industry sometimes misses. Impact matters. A vulnerability report without a working proof of concept and clear reproduction steps is harder to action. A finding that's theoretical rather than demonstrated takes longer to triage and remediate.

If you're working on [building secure software at scale](https://mgks.dev/tags/security/), this same principle applies. Clear reproduction steps. Working demonstrations. Specific impact. These aren't nice-to-haves. They're the foundation of moving from triage to actual remediation.

The security landscape is changing rapidly. AI has changed what's possible. But it hasn't changed what matters: understanding systems deeply, thinking critically about how components interact, validating your assumptions, and taking responsibility for the quality of your work.

If the bar for security research is now set by people who use AI as an accelerator while maintaining rigorous standards for verification and impact, what should that bar be for the rest of us building systems that millions of developers depend on?