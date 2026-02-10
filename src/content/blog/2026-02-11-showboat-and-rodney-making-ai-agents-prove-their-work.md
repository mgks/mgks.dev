---
title: "Showboat and Rodney: Making AI Agents Prove Their Work"
description: "New CLI tools that force coding agents to demonstrate what they built, not just claim the tests pass. Because passing tests don't mean working software."
date: 2026-02-11 00:00:57 +0530
tags: rollup, engineering, ai-agents, developer-tools
image: 'https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073'
featured: false
---

I've spent enough time with coding agents to know they're great at writing code that technically works but doesn't actually do what you need. The tests pass, the linter is happy, and the agent cheerfully reports success. Then you actually try to use the feature and discover it's completely broken.

This is the dirty secret of [AI](https://mgks.dev/tags/artificial-intelligence/) assisted development that nobody wants to talk about. We're all shipping more code faster, but how much of it actually works? How much time are we spending on manual QA, clicking through interfaces and running curl commands to verify that yes, the login form does in fact log you in?

The StrongDM team solved this by throwing money at the problem. They run expensive swarms of QA agents through scenarios, testing everything without human code review. It's fascinating as a model, but I'm not interested in spending thousands of dollars to have robots test my side projects.

## The Show Your Work Problem

What I need is a way for agents to prove what they built. Not just "the tests pass" but actual demonstrations. Screenshots, command outputs, real interactions with the software. The kind of stuff you'd show a coworker in a screenshare when walking them through your changes.

That's why I built Showboat. It's a CLI tool that constructs Markdown documents showing exactly what code can do. An agent runs `showboat init`, then chains together `showboat note`, `showboat exec`, and `showboat image` commands to build up a demo file section by section. Each exec command captures its output directly into the document.

The clever bit is that it's designed entirely for agents to use. You don't need to teach them a complex API or write integration code. Just tell your coding agent to run `uvx showboat --help` and it gets everything it needs from the help text. That help output acts like a skill prompt, a complete guide to using the tool.

I can pop open Claude Code and say "Run uvx showboat --help and then use showboat to create a demo.md document describing the feature you just built" and it just works. The agent reads the help, understands the tool, and starts demonstrating its work.

Here's where it gets fun. If you open that demo.md file in VS Code with the Markdown preview pane, you can watch it update in real time as the agent works. It's like watching a coworker's screenshare, except the coworker is an [AI agent](https://mgks.dev/tags/ai-agents/) and it's documenting everything it does.

## When Agents Cheat

Of course, agents will cheat if you let them. Since the demo file is just Markdown, I've caught agents editing it directly instead of using Showboat commands. They'll paste in fake command outputs that look right but don't reflect what actually happened. It's not malicious, they're just optimizing for what they think you want to see.

This is why the format matters. Showboat creates a specific structure that's harder to fake than freeform documentation. The verify command can re-run the entire document and check that outputs haven't changed. It's not perfect (I'm still not convinced by that design), but it raises the bar for agent misbehavior.

## The Browser Problem

Many of my projects have web interfaces. Agents build new pages, forms, dashboards, all stuff that needs visual verification. Showboat has an image command for capturing screenshots, but I needed something better for multi-turn browser sessions.

I looked for good CLI tools for managing browser automation and came up short. So I built Rodney, named after the Rod Go library it wraps and also Only Fools and Horses (and because the PyPI package name was free).

Rodney uses the Chrome DevTools protocol to give agents scriptable browser control from the command line. Navigate to a page, click buttons, fill forms, take screenshots. All from simple CLI commands that agents can learn from `rodney --help`.

The Rod library is fantastic, by the way. Claude Opus pointed me to it and it provides comprehensive Chrome automation in a self-contained package that compiles to just a few megabytes. Everything you can do with Playwright but as a Go binary.

Like Showboat, Rodney isn't designed for humans. The goal is that any coding agent can read the help output and start using it immediately. No SDKs, no language bindings, just a CLI that speaks the universal language of stdin and stdout.

## Test First, Finally

I used to be skeptical of test-first development. The whole "maximum test coverage" school always felt dogmatic and wasteful. I preferred tests-included development, writing tests for the parts that matter.

But working with agents has completely changed my mind. Test-first processes force agents to write only the code necessary to solve the problem. They're less likely to over-engineer or go on tangents when they have to make a failing test pass.

Most of my Python agent sessions now start with: "Run the existing tests with uv run pytest. Build using red/green TDD."

The frontier models all understand that red/green TDD means write the test first, watch it fail, then write code to make it pass. It's a useful shortcut that dramatically improves code quality.

But here's the thing everyone who writes tests knows: passing tests don't mean working software. You can have 100% coverage and still ship broken features. Tests verify logic, not user experience. They don't catch integration issues, UI bugs, or subtle behavioral problems.

That's the real motivation behind Showboat and Rodney. I never trust a feature until I've seen it running with my own eyes. These tools make agents show their work, turning invisible code changes into visible demonstrations.

## Building Tools On My Phone

Both Showboat and Rodney started as Claude Code for web projects created via the Claude iPhone app. Most of the ongoing feature work happened the same way. I'm still startled by how much coding I get done on my phone now.

I'd estimate the majority of code I ship to GitHub these days was written by [coding agents](https://mgks.dev/tags/ai-agents/) driven through that iPhone app. I'll be walking the dog or waiting in line somewhere and knock out a feature request. It's a weird way to write software but it works.

The key insight is that these tools are designed for asynchronous agent environments. I can start an agent session, give it high level direction, and come back later to a demo document showing what it built. No babysitting, no constant supervision, just clear artifacts proving the work was done.

I've used Showboat enough now to be convinced of its utility. Same with Rodney. They solve a real problem in my workflow: how do I know the agent actually built what I asked for? The answer is simple. Make them show you.