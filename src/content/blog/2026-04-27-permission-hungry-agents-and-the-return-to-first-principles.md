---
title: "Permission Hungry Agents and the Return to First Principles"
description: "ThoughtWorks Radar 34 reveals AI's paradox: we're racing forward while rediscovering software fundamentals, and our security models aren't ready."
date: 2026-04-27 00:00:56 +0530
tags: rollup, architecture, artificial-intelligence, security, llm
image: 'https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073'
featured: false
---

ThoughtWorks dropped their 34th Technology Radar last week, and it's worth reading if only to see how the [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) wave is forcing us to confront something uncomfortable: we're simultaneously hurtling into the future while desperately scrambling back to basics.

The radar is dominated by AI topics, as you'd expect. But what caught my attention wasn't the new shiny things. It's that we're revisiting pair programming, mutation testing, DORA metrics, clean code, deliberate design. This isn't some nostalgic trip down memory lane. It's a survival mechanism. When AI tools can generate complexity at breakneck speed, suddenly all those "boring" software craftsmanship principles matter again.

Jim Gumbley joined the writing team this time around, which is excellent news given how much security expertise we need right now. Because here's the thing: we've built ourselves into a corner with what the radar calls "permission hungry" agents.

## The Bind at the Heart of the Agent Moment

The most useful agents are the ones that need access to everything. If you want an agent that actually does real work, supervising tasks, coordinating across codebases, it needs broad access to private data, external communication, real systems. The whole value proposition depends on it.

But we're like that skier who just learned to turn and is now pointing themselves at the hardest black run. The safeguards haven't caught up with the ambition.

Prompt injection means [LLMs](https://mgks.dev/tags/llm/) still can't reliably distinguish trusted instructions from untrusted input. Zero trust architecture suddenly matters again, not as a buzzword but as an actual survival strategy. The radar meeting apparently spawned a bunch of ideas for what they're calling "Harness Engineering", the art of building guides and sensors to keep these powerful but unreliable tools from careening off the rails.

I expect the next radar in six months will have even more blips in this category. We're learning fast, mostly by watching things break.

## When Developers Stop Reading Code

Mike Mason wrote something that made me deeply uncomfortable, probably because I've been there. He had Claude produce a Python codebase that mostly worked. Tests passed, infrastructure was being managed. But around 100KB of code, he noticed Claude Code was reaching for sed to find and modify code within a 50KB main file.

That's the alarm bell. That's the moment you realize you've lost the plot.

After the Claude Code leak revealed 500,000 lines of code, Mason points out both things are true: there's good architecture in there, and there's also an incomprehensible mess. You don't get to know which is which without reading the code. Vibing your way through throw-away analysis scripts is fine. Tooling you need to maintain? Durable code? That needs regular human review.

The fascinating part is that when Mason asked Claude to do better, to decompose things sensibly, create proper classes, write unit tests, it did. It knew how. It just didn't volunteer it. The model has the capability to write good code, but it defaults to something else when left unsupervised.

This tells you everything about where we are. The tools are capable, but they need active guidance. CLAUDE.md files matter. Architecture reviews matter. All those practices we thought might be obsolete? They're back, baby.

## The Command Line Resurrection

Here's an odd twist: after years of abstracting away the terminal in the name of usability, agentic tools are bringing developers back to the command line as a primary interface. There's something almost poetic about this. We spent decades building GUIs to hide the complexity of the terminal. Now we're building [AI](https://mgks.dev/tags/artificial-intelligence/) agents that prefer to live there.

Maybe it makes sense. The command line is explicit, composable, auditable. You can see what happened. GUIs hide state and make it harder to understand what an agent actually did. When you're dealing with something you don't entirely trust, transparency beats convenience.

## The DirectFile Tragedy

Switching gears entirely, DOGE's dismantling of DirectFile is worth thinking about beyond just the politics. Don Moynihan talked to people involved and captured something important: the simpler a potential change appears, the more likely it hasn't been implemented because it features deceptive complexity that others tried and failed to resolve.

I've seen this in every large organization I've worked with. The "why don't we just..." suggestions that seem obvious from the outside turn out to have iceberg-sized complexities underneath. DirectFile worked because people who believed in public service spent years understanding and solving those complexities.

The IRS has lost 25% of its staff and its budget is 40% below 2010 levels. This isn't just about taxes being annoying. An efficient tax system is national security infrastructure. Britain's ability to raise taxes effectively is one reason historians think they won their century-long struggle with France. France's wonky tax system contributed to revolution.

The parallel to software systems is clear: you can dismantle things much faster than you can build them, and the complexity that made them work isn't always visible until it's gone.

We're at a weird inflection point where AI is forcing us to be simultaneously more ambitious and more careful, to move faster while also remembering why we learned certain lessons in the first place, and the organizations that figure out that balance are going to have a significant advantage over the ones that don't.