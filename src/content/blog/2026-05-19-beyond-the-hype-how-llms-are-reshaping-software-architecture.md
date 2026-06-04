---
title: "Beyond the Hype: How LLMs Are Reshaping Software Architecture"
description: "From legacy migrations to agentic patterns, exploring what agentic programming means for how we actually build systems and mentor the next generation."
date: 2026-05-19 12:00:50 +0530
tags: rollup, architecture, ai, legacy-systems
image: 'https://images.unsplash.com/photo-1747920523600-bd6a3d064f4d?q=80&w=2070'
featured: false
---

I spent a day last week at The Orchard Retreat, a gathering of software developers talking about the profession's future with agentic programming. The conversations there were less about the wow-factor of <a href="https://mgks.dev/tags/artificial-intelligence/">AI</a> and more about the uncomfortable questions: what actually changes when machines can write code? How do we keep humans learning? What do we break in the process?

The discussions felt like watching architecture shift in real time. Not the polished conference-talk version of the future, but the messy conversations where people who've been burned by technology before start asking harder questions.

## The Unexpected Win: Lift and Shift Is Back on the Menu

My colleagues have spent years being dismissive of "lift and shift" migrations. You know the pattern: port a legacy system to a new platform while keeping feature parity. The conventional wisdom was brutal about this approach. Half the features in most systems go unused anyway (the 2014 Standish Group report put it at 50%), and modernization should mean rethinking what users actually need, not just moving the same bloat to a shinier platform.

That argument made sense when porting code meant hiring a team for months. But one attendee who does a lot of legacy migration work said something that stuck with me: the math has changed completely. With <a href="https://mgks.dev/tags/artificial-intelligence/">LLM</a>-powered code generation, lifting and shifting should now be the first step, not the avoided one.

Here's the thinking: a team built a behavioral clone of GNU Cobol in Rust in three days. 70,000 lines. This isn't theoretical anymore. The cost of getting your system to a better platform is suddenly so low that you should probably just do it. And once you're there, the environment is cleaner, the tooling is better, and evolution becomes cheaper. But and this is critical, you have to actually stop there and do the rethinking work afterward.

The old approach assumed the lift-and-shift was too expensive to justify unless you were also fixing everything. The new approach says: get it moved first (cheap), then you have a better platform to evolve on. The key insight isn't that we skip the modernization work. It's that we've decoupled the expensive parts.

## When Simplicity Hides Complexity

One of the more interesting ideas I heard was framed as "Interrogatory LLM." Someone in the group was dealing with massive specification documents. Instead of trying to review them directly, they had an <a href="https://mgks.dev/tags/artificial-intelligence/">AI</a> interview a human expert, asking questions to verify the specification was actually correct. The machine asks, the human answers, and through dialogue you surface the gaps and contradictions that a static review would miss.

It's a small shift in how you use these tools, but it changes the dynamic. Rather than the AI being a tool that outputs things for you to check, it becomes a tool that helps you check your own thinking.

This relates to something another attendee mentioned that had nothing to do with AI at all. When consulting with organizations, the first thing they do is read the change-control board guidelines. Not the process documentation, but the guidelines themselves. Because those rules? They're scar tissue. Each one exists because something broke before. Understanding why things are the way they are requires understanding the history of what went wrong.

## The Complexity Multiplier in Financial Systems

Several attendees worked in financial systems, which meant dealing with the nightmare scenario: complex legacy environments, regulatory controls, and the knowledge that if something goes wrong, real money vanishes. These systems are particularly challenging because financial products exist in multiple jurisdictions, each with different regulations.

The current approach is to build a single complex system that figures out which jurisdiction applies and routes to the right rules. This creates layers of conditional logic that become harder to maintain over time. Someone asked: what if we flipped this? Build simpler, individual systems for each jurisdiction, then use LLMs to ensure they stay consistent with each other as rules change.

This gets at something deeper about software design. We spend a lot of effort identifying what's the same across different contexts and centralizing it, because duplication is expensive. But if LLMs can help us manage consistency across multiple systems without centralizing the logic, does that change the trade-off? Can we have simpler systems that are easier to understand and modify, even if they're not DRY in the traditional sense?

The question isn't answered yet. But the fact that people are asking it means the landscape has genuinely shifted.

## The Skills Obsession Symptom

James Pritchard made an observation that landed hard: people accumulate folders of markdown skill files for their LLMs, trying to configure them into better behavior. And mostly, it doesn't work. LLMs use these skills inconsistently. Sometimes they miss them entirely when needed. Other times they bloat the context window with irrelevant stuff.

His argument is that this is a symptom of reaching for configuration when you should be reaching for architecture. You write a skill file saying "write better tests" instead of fixing why your test setup is complicated in the first place. You configure how the LLM should work instead of making your codebase clearer.

The best setup is almost boring: clean patterns, short project config for non-obvious stuff, automation hooks, and maybe one or two skills for specific workflows you run intentionally. That's it. The LLM barely needs configuration because the work environment is already well-structured.

This applies more broadly than just LLM configuration. It's the same principle that made Unix successful. Make the environment so clear that tools work well in it without special casing. The problem isn't the tool. The problem is that your foundation is messy.

## Agents Are Not Always the Answer

Pritchard also pushed back on the enthusiasm for agents at runtime. The problem with agents isn't that they don't work, it's that they work unpredictably. You trade a known execution path for autonomy that mostly means you don't know what's going to happen. When an agent-powered feature breaks in production, you're debugging a conversation transcript instead of a stack trace.

Most use cases labeled "agent" are actually workflows. Known sequences of steps where one or two happen to involve an LLM. You don't need autonomy for that. You need a function call.

Functions compose predictably. If you know the workflow, programming it explicitly is faster, uses fewer tokens, and is easier to debug. The appeal of agents is the promise of flexibility, but most systems don't actually need it. They need reliability.

This feels like a maturing pattern. Early on, the novelty pulls you toward agents. But as people run them in production, the reality kicks in: predictability is often worth more than theoretical flexibility.

## Teaching Judgment Is the Real Problem

One topic kept resurfacing: junior developers. When you work with these tools, your value isn't in raw code production anymore. It's in judgment. How do you know when to use an agent versus a function? When does the LLM's suggestion miss something important? How do you push back on the generated code?

The group had one common answer: pair programming. This isn't novel, but the role shifts slightly. An experienced developer pairs with a junior, not to write code together, but to model judgment about how to use these tools. The junior learns patterns for working with the AI. They also often have tricks of their own, fresh ideas about how to prompt or structure things. The learning is bidirectional, which matters.

But here's the uncomfortable part: this only works if we actually commit to it. Pairing takes time. Mentorship is expensive. And if we're building systems faster, there's pressure to not spend cycles on teaching. That's the failure mode we should actually worry about.

## The Entropy Question

Historically, software exists to bring order to chaos. We take messy human processes and encode them into systems with deterministic rules. But as LLMs handle more of the coding, someone asked: is that reversing?

A lot of software is data transformation. Records over there need to flow to APIs over here, but the data structures are different because they come from different bounded contexts. These transformations are tedious. Agents are particularly good at writing them. We'll suddenly have way more of this code, and it'll be generated rather than carefully designed.

Which raises a strange question: as we use AI to handle more of the tedious transformation and glue work, are we introducing more entropy into our systems? Are we trading careful human design for fast-generated-but-possibly-inconsistent approaches?

Kyle Kingsbury's recent essay "The Future of Everything is Lies, I Guess" sits in this space. He comes from the distributed systems world, where non-determinism is a core problem. His argument is darker than most takes on AI. He's not attacking the capability. He's asking what happens to society when those capabilities are widely deployed by actors without perfect incentives. He's asking about the shape of the world we'll build, not just whether the tools work.

And he's struggling with something real: these tools are useful. He doesn't want to stop using them. But he also doesn't want to ignore what comes with them.

## The Review as Learning

There's a specific question in the SPDD (Structured-Prompt-Driven Development) Q&A that points at something important. Someone asked: why not have agents do the spec review themselves? Agents could read the requirements and the code diff and verify alignment automatically.

The answer was blunt: because review is where humans learn from the AI's choices. By having humans in the loop, you see patterns and trade-offs you might not have thought of. It's slower. But the long-term skill growth matters more than the short-term speed.

One way to judge the value of an AI tool is whether it helps humans learn more about the world we're building. Tools that just make you faster but dumber are not actually valuable over time. They're debt.

This is the inverse of the skills obsession problem. Instead of configuring the tool to do what you want, maybe the question is: what does this tool show me about my own thinking? What am I missing?

## The Uncomfortable Conversation

All of this sits above a darker conversation that came up late, and it deserves honesty. Someone mentioned that as a moderator of a Mastodon instance, they're legally required to review and report AI-generated CSAM. They don't want to see these images. They really wish they could unsee them. And on the dark mornings when they find these reports, they sometimes wonder if the engineers at <a href="https://mgks.dev/tags/open-ai/">OpenAI</a> and similar companies had to see what their technology enables, whether they'd reflect on what alignment actually means in practice.

This isn't an abstract concern about AI safety. This is the immediate, concrete harm happening now. It's the thing that makes all the architectural discussions feel a little hollow.

The future of agentic programming isn't just about whether we design systems well or whether we mentor junior developers well. It's about whether we're willing to face what the technology we're building actually enables, and whether we'll do anything about it when it does.