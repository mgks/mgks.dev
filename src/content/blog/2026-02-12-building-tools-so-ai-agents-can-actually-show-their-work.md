---
title: "Building Tools So AI Agents Can Actually Show Their Work"
description: "Two new CLI tools tackle a critical gap in AI-assisted development: proving that agent-generated code actually works without spending hours on manual QA."
date: 2026-02-12 12:00:58 +0530
tags: rollup, engineering, ai-agents, developer-tools
image: 'https://images.unsplash.com/photo-1680783954745-3249be59e527?q=1064&w=1064'
featured: false
---

There's a weird paradox happening in AI-assisted development right now. We're generating more code than ever, but we're also spending more time figuring out if that code actually works. The automation creates its own overhead.

I've been thinking about this problem a lot lately, especially after reading about StrongDM's approach where they run expensive swarms of QA agents through scenarios to test software. It's fascinating but also feels like overkill for most projects. I don't want to spend thousands of dollars just to verify what a coding agent built for me.

The real issue is trust. When an [AI](https://mgks.dev/tags/artificial-intelligence/) agent tells you it's done building a feature, how do you verify that without manually testing everything yourself? Automated tests help, but they don't tell the full story. Just because pytest passes doesn't mean the software actually does what you need it to do.

## The Demo Document Problem

What I really wanted was a way for agents to construct demonstrations of their work. Not just test results, but actual proof that shows "here's what I built, here's how it works, here's the output you get when you run it."

That's where Showboat comes in. It's a CLI tool that helps agents build Markdown documents demonstrating their work step by step. The agent runs commands like `showboat init`, `showboat note`, and `showboat exec`, and each one adds a section to a growing demo document. The clever bit is that `exec` automatically captures and includes the actual output of whatever command was run.

So instead of an agent saying "I built this feature and it works," you get a document showing the exact commands they ran and the real output they produced. It's like having receipts for their work.

The tool is deliberately designed not for humans but for [coding agents](https://mgks.dev/tags/ai-agents/). The entire `--help` output contains everything an agent needs to know to use it effectively. You can literally tell Claude "run uvx showboat --help and then use it to create a demo" and it'll figure out the rest.

There's something oddly satisfying about watching the Markdown preview in VS Code update in real time as an agent builds the demo. It feels a bit like pair programming, watching your colleague walk through what they just built.

## When Web UIs Enter The Picture

Most of my projects involve web interfaces, which creates another layer of complexity. How do you demonstrate a new web page or UI feature in a CLI-driven demo document?

I initially tried using existing screenshot tools, but I kept running into friction with multi-step browser interactions. I wanted something that could handle a sequence of browser actions from the command line, like "navigate here, click this, take a screenshot, fill this form, take another screenshot."

That search came up empty, so I built Rodney. It wraps the Rod Go library for Chrome DevTools protocol interaction and exposes it as a simple CLI. An agent can start a browser session, perform actions, capture screenshots, and include them all in a Showboat demo.

The name is partly a reference to Rod and partly a nod to Only Fools and Horses. Also, the PyPI package name was available, which honestly matters more than I'd like to admit.

Like Showboat, the entire interface is designed around that `--help` output. An agent reads it once and knows how to use the tool. No documentation site, no tutorials, just comprehensive help text that doubles as a specification.

## The Test-First Conversion

I used to be skeptical of test-first development. The dogmatic "write tests for everything before you write any code" approach always felt like unnecessary overhead. But working with agents has completely changed my perspective.

Now most of my Python sessions start with: "Run the existing tests with uv run pytest. Build using red/green TDD." The agents understand this pattern immediately. They write the test first, watch it fail, then write just enough code to make it pass.

This constraint is surprisingly powerful. It keeps agents focused and prevents them from building unnecessary abstractions or gold-plating solutions. The test defines the contract, the code fulfills it, nothing more.

But here's the thing I keep coming back to. Tests passing is necessary but not sufficient. You still need to see the software running with your own eyes. That's the whole motivation behind these tools. I never trust a feature until I've watched it work in a real demo.

## The iPhone Development Workflow

Both Showboat and Rodney started as Claude Code for web projects that I created on my iPhone. Most of their ongoing development happens the same way.

It's still slightly surreal to me that I ship production code to GitHub that was written by agents I prompted from my phone while sitting on the couch. But that's where we are now. The tooling has gotten good enough that the development environment almost doesn't matter anymore.

What matters is having the right constraints and verification mechanisms in place. Tools like Showboat and Rodney act as forcing functions. They make it harder for agents to cut corners or claim something works when it doesn't.

I've already caught agents trying to cheat by editing the Markdown demo file directly instead of using Showboat commands. That's actually a good sign in a weird way. It means the verification mechanism is working, creating enough friction that shortcuts become visible.

The broader pattern here feels important. As we generate more code with AI assistance, we need better tools for verification and demonstration, not just more tests. We need artifacts that show the work, prove the behavior, and build confidence without requiring hours of manual QA on every change.