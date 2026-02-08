---
title: "Context Engineering: The New Frontier in AI-Assisted Development"
description: "As coding agents evolve, context engineering becomes crucial. Here's what developers need to know about rules, skills, and the art of prompt curation."
date: 2026-02-09 00:00:57 +0530
tags: rollup, architecture, ai-tools, developer-experience, generative-ai
image: 'https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073'
featured: false
---

I've been watching the [AI](https://mgks.dev/tags/artificial-intelligence/) coding assistant space explode over the past year, and something fascinating is happening. We've moved past the "wow, it can write code" phase into something more nuanced: figuring out how to actually make these things useful in real development workflows.

The shift is subtle but significant. Early on, we just threw prompts at these tools and hoped for the best. Now we're entering what I'd call the context engineering era, where the real work isn't just using the AI but carefully curating what information it sees.

Birgitta Böckeler from Thoughtworks has a great way of putting it through her colleague: "Context engineering is curating what the model sees so that you get a better result." Simple, right? But the execution is anything but.

## Instructions vs Guidance (And Why It Matters)

Here's something I've noticed in my own work with coding agents: not all prompts are created equal. There's a real difference between telling an agent "write an E2E test following this pattern" and saying "always write tests that are independent of each other."

The first is an instruction, a specific task. The second is guidance, a principle that should inform everything the agent does. This distinction matters more than you'd think because it affects where and how you configure these things in your setup.

Most of this stuff lives in markdown files scattered around your project. Yeah, we're back to plain text files as configuration. There's something beautifully simple about that, even if the underlying mechanics are anything but simple.

## The Context Interface Problem

This is where things get interesting. Modern coding agents don't just work with what you give them upfront. They can reach out and grab more context when they need it.

Think about it: your agent has access to bash commands, file searching, MCP servers (custom programs that expose data and actions), and now Skills, which are basically descriptions of additional resources the LLM can load on demand. It's like giving the AI a phone book of capabilities it can call when needed.

But here's the catch. The more of these interfaces you configure, the more space they take up in the context window. And yes, I know context windows are massive now. Claude can handle 200K tokens, and some models go even higher. But that doesn't mean you should just dump everything in there.

I've seen agents get worse when you give them too much context. They start getting confused, missing the forest for the trees. Plus, every token costs money. Not a lot, but it adds up when you're running these things constantly.

## Who Decides What Gets Loaded?

There are basically three ways context gets pulled into your coding agent, and each has tradeoffs that'll make you think twice about your setup.

The LLM itself can decide to load context. This is crucial for autonomous agents that run without constant human supervision. You configure Skills, the agent sees their descriptions, and when it thinks "oh, I need that E2E testing pattern now," it loads it. The problem? You're never 100% sure it'll load what you expect. There's this inherent uncertainty, this non-determinism that you just have to accept.

Then there's human invocation. Slash commands are the classic example here. You type `/code-review` and boom, your review prompt gets loaded. Total control, but you're back to manual work. Less automation, more certainty.

Finally, some things are triggered by the agent software itself at deterministic points. Claude Code's hooks are like this. Every time you edit a file or run a command, specific actions can fire automatically. Predictable, but less flexible.

I find myself constantly balancing these three approaches. Too much automation and things get unpredictable. Too much manual control and I'm not really getting the benefit of having an agent.

## Claude Code's Feature Sprawl

Let me walk you through what Claude Code offers as of early 2026, because it's a good snapshot of where this whole space is heading. And honestly, it's a lot.

There's CLAUDE.md, the main rules file that always loads at session start. This is where your most important project-wide conventions live. Then there are scoped rules that only load when relevant files are touched. Write something for TypeScript files? Those rules only appear when you're working with .ts files.

Slash commands used to be a thing but they're deprecated now, absorbed into Skills. That's actually a good move because Skills are more flexible. A Skill can contain guidance, instructions, documentation, even scripts. The LLM looks at the skill description and decides whether to load it for the current task.

Subagents are newer and kind of wild. They're separate contexts with their own model configuration and toolsets. You can run them in parallel. Cursor calls them something else, Roo Code has had them for a while as "modes." We're still figuring out the patterns here.

MCP servers give your agent access to external systems. Want your agent to check JIRA? There's an MCP server for that. Need browser automation via Playwright? MCP server. These are powerful but they're also another thing to maintain and configure.

Hooks are rare but useful. They let you trigger actions deterministically when certain events happen. Cursor just added support for them. I expect we'll see more of this pattern because sometimes you really do want that certainty.

And finally, there are Packages for distributing all this configuration across teams. Because once you've built a good setup, you want to share it.

## The Convergence That's Coming

This is too many features. We're in what the [industry](https://mgks.dev/tags/industry/) calls a "storming" phase where everyone's trying different approaches to see what sticks. I'd bet money that Skills will eventually absorb not just slash commands but also rules files. Why maintain three different ways to give your agent instructions when one flexible approach could handle it all?

Building a good context engineering setup takes time. Real time. You can't just write a bunch of rules files and call it done. You need to use the configuration for weeks, see where it helps and where it falls short, iterate. There are no unit tests for this stuff. You're tuning based on feel and results.

That's why people are so eager to share their setups. It's not just about being helpful (though that's part of it). It's about not wanting to reinvent the wheel when someone else has already figured out a good pattern.

## The Uncertainty Principle of Context Engineering

Here's what bothers me about how some people talk about this work. I keep seeing phrases like "ensure the agent does X" or "prevent hallucinations." That's not how this works. That's not how any of this works.

As long as we're dealing with LLMs, we're dealing in probabilities, not certainties. Good context engineering increases the likelihood of useful results. It makes success more probable. But it can't guarantee anything.

I've seen really well-configured agents do something unexpected. I've seen minimal setups produce surprisingly good results. The LLM is still interpreting all these instructions, applying its training, making decisions we can't fully predict or control.

This doesn't mean context engineering is useless. Far from it. But it does mean we need to choose the right level of human oversight for each task. Critical code? Review everything closely. Boilerplate generation? Maybe you can relax a bit.

The real skill isn't just in writing good rules and instructions. It's in understanding the probabilistic nature of what we're building and designing our workflows accordingly. We're not engineering in the traditional sense where inputs deterministically produce outputs. We're curating, guiding, nudging these systems toward better behavior while accepting that sometimes they'll still surprise us.