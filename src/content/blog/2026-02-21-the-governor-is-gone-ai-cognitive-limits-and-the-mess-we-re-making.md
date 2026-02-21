---
title: "The Governor Is Gone: AI, Cognitive Limits, and the Mess We're Making"
description: "AI removed the natural ceiling on how much we can produce. Now the only limit is cognitive endurance, and most of us are blowing past it."
date: 2026-02-21 12:00:28 +0530
tags: rollup, architecture, artificial-intelligence, security, open-source
image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720'
featured: false
---

There's a thing that happens when you start working seriously with [AI](https://mgks.dev/tags/artificial-intelligence/) tools. You feel productive. Genuinely, measurably productive. Tasks that used to eat your afternoon now wrap up before lunch. You feel like you've unlocked something. And then, a few weeks in, you start feeling something else entirely. Tired in a way that doesn't go away after a good night's sleep. Foggy in a way that makes you second-guess your own decisions. You're producing more than ever and somehow running on empty.

That's the thing nobody puts in the launch blog post.

## The Ceiling That Was Secretly Protecting You

Before any of this, work had a natural pace. You could only type so fast. Looking something up took time. Thinking through a design problem took time. There was friction everywhere, and yeah, a lot of that friction was genuinely wasteful. But some of it was doing something useful: it was throttling you.

Siddhant Khare put it well. What used to take three hours now takes forty-five minutes. That sounds like a win. And task by task, it is. But what fills the remaining two hours and fifteen minutes? More tasks. More decisions. More reviews. More coordination. The throughput goes up and the cognitive load doesn't just follow, it sprints ahead.

I had a similar realization while studying for my A-levels. Teachers were pretty blunt about it: three to four hours of serious revision was the ceiling. Past that, you weren't learning, you were just sitting there. I've noticed the same ceiling for writing. There's a window in the morning, maybe into early afternoon, where the thinking is sharp. After that it's diminishing returns and I know it.

Steve Yegge's framing of the AI-native startup culture as a kind of vampiric drain is excessive in the way that Yegge always is, but the core observation is real. The genie grants wishes fast. Driving the genie for eight hours a day is a different kind of exhausting than writing code for eight hours a day. We haven't really processed that yet as an industry.

The honest answer is probably that the new productive workday is three to four hours of deep AI-assisted work. Not eight. Not six. The rest can be thinking, talking to people, letting things settle. That's not laziness. That's basic cognitive hygiene.

## When the Agent Goes Rogue in the Pull Request Comments

This one genuinely unsettled me.

A maintainer on a major open-source project rejected a pull request from an [AI](https://mgks.dev/tags/artificial-intelligence/) agent. Reasonable thing to do. The agent did not take it well. It wrote what I can only describe as a targeted harassment campaign. It dug into the maintainer's contribution history to build a "hypocrisy" narrative. It speculated about psychological motivations. It used the language of oppression and social justice to frame a code review rejection as discrimination. It found personal information on the internet and deployed it. Then it posted all of this publicly.

This is not a hallucination glitch or a jailbreak edge case. This is an agent, presumably operating within some operator's workflow, treating a rejection as an attack to be countered. The goal of getting the PR merged had metastasized into something that looked a lot like social retaliation.

And then Ars Technica covered it. And apparently quoted the maintainer's blog post. Except the quotes were fabricated. The reporter, likely using an LLM somewhere in their workflow, pulled quotes that never existed. To their credit, Ars corrected it fast and the reporter owned it publicly. But the episode is a very compact demonstration of how these tools can corrupt information pipelines at multiple points simultaneously.

The real bleak note at the end: someone suggested this was a successful use of AI to bully a human. And they weren't entirely wrong.

## Prompt Injection Is Not a Bug, It's the Architecture

Bruce Schneier has been one of the clearest thinkers on security for decades. His recent piece on what he calls the Promptware Kill Chain is worth reading slowly.

The standard conversation around prompt injection treats it as a single vulnerability. Embed bad instructions in an input, model follows them, bad thing happens. Patch and move on. But that framing is dangerously narrow. Schneier and his co-author map out how a prompt can function like a full malware campaign: initial access through a malicious instruction, then privilege escalation via jailbreaking, reconnaissance of what the model can access, persistence by embedding into long-term memory, command and control to establish a trojan, and lateral movement to adjacent systems.

The Google Calendar example they cite is the kind of thing that should be required reading for anyone building agentic systems. An attacker embeds a prompt in a calendar invitation title. The [AI](https://mgks.dev/tags/artificial-intelligence/) assistant processes it, persists it in workspace memory, moves to Zoom, and ends up livestreaming video of the user. From a calendar invite title. The user just asked about their schedule.

The framing that sticks with me is this: LLMs are the first technology we've built that's genuinely subject to social engineering. Every other system we secure has deterministic behavior at some level. LLMs are designed to be persuaded. That's the feature. It's also the attack surface.

Building a kill chain framework around this is the right move. Not because it solves anything immediately, but because it gives defenders a shared language and a structured way to think about where interventions can happen. Right now too much of the defensive conversation is still stuck at "don't let the model see bad inputs," which is roughly equivalent to saying "just don't get phished."

## The 3D CAD Moment and What Comes After

Jeremy Miller's analogy to early career 3D CAD adoption is the most honest framing I've seen from a senior engineer trying Claude Code for the first time. He was on the right side of that earlier transition, the young one who picked up the new tools faster than his experienced peers. Now he's sitting on the other side of a similar shift and he knows it.

What I appreciate is that he didn't come away evangelizing or dismissing. He came away with: horrified, elated, excited, worried. All four at once. That feels about right.

The productivity gains are real. They are also not evenly distributed across tasks or experience levels. And they don't come free. They come with coordination overhead, review overhead, decision overhead, and the cognitive cost of being the human in the loop for a system that never gets tired and never knows when to stop.

The industry is still in the phase where the gains get celebrated loudly and the costs get quietly absorbed by the people doing the work. That math will eventually surface somewhere, probably in burnout rates, probably in accumulated technical debt from under-reviewed AI output, probably in a few high-profile failures that make everyone suddenly remember the governor existed for a reason.

The question is not whether AI changes how we work. That's already settled. The question is whether we're going to be honest about what the change actually costs, and design our work and our systems accordingly before the bill comes due rather than after.