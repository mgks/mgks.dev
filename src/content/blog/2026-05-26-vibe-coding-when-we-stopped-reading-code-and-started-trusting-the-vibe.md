---
title: "Vibe Coding: When We Stopped Reading Code and Started Trusting the Vibe"
description: "A deep dive into Andrej Karpathy's vibe coding concept - what it means, why it matters, and why forgetting code exists might be both its greatest strength and deepest flaw for developers."
date: 2026-05-26 00:00:14 +0530
tags: rollup, architecture, ai, security, software-development
image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720"
featured: false
---

There's a moment that sticks with you when you first hear about vibe coding. It's not the technology itself that catches you off guard, it's the philosophy behind it. Andrej Karpathy essentially said out loud what many of us have been doing with [AI](https://mgks.dev/tags/artificial-intelligence/) assistants for the past year: he stopped reading the code. He accepts changes without looking at diffs, copies error messages straight back into the chat, and just... vibes. The code grows beyond his comprehension, and he's okay with that.

That's wild when you think about it. Here is one of the most respected engineers in our field openly admitting he doesn't look at what he's shipping. And the crazy part? It works. Mostly. For certain things.

## The Difference That Matters

What got me thinking wasn't just vibe coding itself, but how easily it gets confused with something else entirely. There's agentic programming, where you're still deeply involved with the code, still reviewing it, still caring about the internal structure. You might not write every line yourself, but you're the pilot. With vibe coding, you've handed over the controls and closed your eyes.

The semantic drift here is real. People hear "AI writes my code" and assume it's all the same category. But the mental model is completely different. One is delegation with oversight. The other is delegation with faith. And faith is a slippery foundation to build software on.

I think that's worth being honest about, especially for developers who might feel like they're doing something wrong because they're still reading their code. You're not. You're just being careful in a way that vibe coding explicitly rejects.

## The Real Problems Start Sneaking In

Let me be direct about what keeps me up at night with this approach. The security implications alone are significant. LLMs have a massive attack surface and they don't know when they're generating something that exposes credentials or creates a pathway into deeper systems. If you're not looking at the code, you have no idea what's being written. For disposable weekend projects where you're the only user, sure, that's probably fine. For anything touching real data or real users? That "vibe" gets uncomfortable fast.

Then there's the quality problem that compounds over time. I've seen what happens when you let an LLM iterate on code without human oversight for a few rounds. The structure gets messy. Functions do too much. Dependencies form that make future changes terrifying. LLMs are actually better at working with well-structured code, so this creates a negative feedback loop where the software degrades and becomes harder to improve, even for the AI helping you.

And hallucinations aren't just about facts. They're about behavior. An LLM can confidently write code that does the wrong thing in ways that aren't obvious. Combined with the non-deterministic nature of these models, asking for a small enhancement might introduce errors in completely unrelated parts of the codebase. You're not just trusting the code, you're trusting that the next prompt won't break something that worked yesterday.

## Where This Actually Makes Sense

Look, I'm not here to dismiss vibe coding entirely. There's a legitimate use case here. If you need to build something quickly for yourself or a small group of trusted collaborators who understand the risks, and it's genuinely throwaway, the approach has merit. Non-programmers can now build tools that solve their own problems without going through the learning curve. That's genuinely powerful.

The danger is when the scope creeps. When that "quick prototype" gains users. When it starts handling sensitive information. When "I'll just delete it later" becomes "we've been running this in production for six months and I have no idea what's in it."

The technology is evolving fast. Maybe future models will handle even the messiest codebase gracefully. But right now, right now we need to be honest about what we're trading off. Vibe coding trades code comprehension for speed, and that trade makes sense only in very specific contexts.

The question isn't whether vibe coding is good or bad. It's whether you understand what you're agreeing to when you stop looking at what you're building.