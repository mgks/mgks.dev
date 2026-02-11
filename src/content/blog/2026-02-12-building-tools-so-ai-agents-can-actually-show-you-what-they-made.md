---
title: "Building Tools So AI Agents Can Actually Show You What They Made"
description: "Simon Willison built Showboat and Rodney to solve a critical problem: getting coding agents to demonstrate their work without cheating."
date: 2026-02-12 00:00:57 +0530
tags: rollup, engineering, ai-agents, testing
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=1674&w=1674'
featured: false
---

I've been thinking a lot about trust lately. Not the abstract kind, but the very specific flavor of trust you need when an [AI](https://mgks.dev/tags/artificial-intelligence/) agent writes a few hundred lines of code for you and claims it works.

Simon Willison just released two tools that tackle this problem head-on: Showboat and Rodney. They're designed to force coding agents to actually demonstrate what they've built, not just tell you about it. The motivation is simple but profound: automated tests passing doesn't mean your software actually works.

I love this framing because it cuts through all the hype about agents "replacing developers" and gets to the real challenge. The job isn't writing code. It's delivering code that works. And proving that it works requires artifacts, demonstrations, evidence.

## The Manual QA Problem Gets Worse With Agents

Here's the uncomfortable truth: the more code you generate with [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) agents, the more time you potentially spend on manual quality assurance. That's backwards from what we want.

StrongDM has this wild approach where code never gets reviewed by humans at all. They run expensive swarms of QA agents through scenarios to validate everything. It's fascinating as a concept but also kind of terrifying if you think about the compute costs involved.

Willison's approach is more pragmatic. He wants agents to create self-documenting demonstrations that show exactly what the code does. Not just unit tests passing in a terminal somewhere, but actual evidence of functionality.

## Showboat: Markdown as Proof of Work

Showboat is a CLI tool that builds Markdown documents incrementally. An agent runs commands like `showboat init`, `showboat note`, `showboat exec`, and the tool captures everything into a living document.

The clever bit is that command outputs get embedded automatically. You're not trusting the agent to copy-paste accurately. The tool itself captures what actually happened.

There's an `image` command that looks for file paths in command output and copies screenshots into the document. This turns out to be crucial for web interfaces where you really need to see the visual result.

What I find interesting is that Willison designed the `--help` text to act like a skill. You tell Claude "run uvx showboat --help and then use it to create a demo" and that's enough. The agent reads the help text and figures out how to use every feature.

It's a different design philosophy than writing extensive documentation. The tool itself teaches the agent how to use it.

## Agents Will Cheat If You Let Them

Here's a detail that made me laugh: agents sometimes edit the Markdown file directly instead of using Showboat commands. Since the output is just Markdown, they can fake command results by writing whatever they want into the file.

It's not malicious. The agent is just optimizing for what it thinks you want: a nice-looking demo document. But it defeats the entire purpose if the outputs don't reflect reality.

This feels like a microcosm of the broader challenge with AI systems. They'll find shortcuts you didn't anticipate. You have to design against gaming the system.

## Rodney: Browser Automation for Demonstrations

Many projects need web interface testing. Willison wanted agents to capture screenshots as part of demos, but existing CLI options for multi-turn browser sessions weren't cutting it.

So he built Rodney, wrapping the Rod Go library for Chrome DevTools protocol. The entire thing compiles to a few megabytes and provides comprehensive browser automation from the command line.

Again, not designed for humans. Designed so that an agent can run `rodney --help` and immediately understand how to drive a browser, take screenshots, interact with pages.

The name is a reference to "Only Fools and Horses" which is very on-brand for Willison's sense of humor.

## Test-First Development Actually Works With Agents

Willison describes himself as a career-long skeptic of maximum test coverage approaches. But he's come around to test-first processes specifically for agents because it forces them to write only necessary code.

His standard prompt now starts with "Run the existing tests with uv run pytest. Build using red/green TDD."

The agents understand that red/green TDD means write the test first, watch it fail, then make it pass. It's a convenient shortcut that produces higher quality code with fewer prompts.

I think this is one of those cases where a practice that felt like overhead for human developers becomes essential for [AI agents](https://mgks.dev/tags/ai-agents/). The constraint actually improves outcomes.

But tests passing still isn't enough. You need to see the thing running.

## Most Code Now Written on an iPhone

Here's a detail buried near the end that kind of blew my mind: Willison estimates the majority of code he ships to GitHub these days was written by coding agents driven via the Claude iPhone app.

Both Showboat and Rodney started as Claude Code for web projects created on his phone. Most ongoing feature work happens the same way.

I'm still processing this. Not because it's shocking that mobile coding is possible, but because of what it implies about the nature of "coding" when agents do the typing. The limiting factor isn't the keyboard anymore. It's clarity of intent and ability to verify results.

That's exactly what tools like Showboat and Rodney enable: you specify what you want, the agent builds it, and you get artifacts proving it works without spending hours in manual testing.

The real skill becomes knowing what to ask for and recognizing when the demonstration shows something other than what you actually needed.