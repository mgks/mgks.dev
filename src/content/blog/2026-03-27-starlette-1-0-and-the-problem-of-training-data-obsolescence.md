---
title: "Starlette 1.0 and the Problem of Training Data Obsolescence"
description: "Starlette finally hits 1.0, but breaking changes expose a fascinating problem: how do you make LLMs generate code for frameworks they weren't trained on?"
date: 2026-03-27 12:00:56 +0530
tags: rollup, engineering, python, ai, frameworks
image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'
featured: false
---

Starlette 1.0 is finally out, and honestly, it's kind of surreal that it took this long. Not because the framework wasn't production-ready (it's been the foundation of FastAPI for years), but because Kim Christie and the team were committing to API stability in a way that most modern Python projects just don't anymore.

I've always loved Starlette. It sits in this perfect sweet spot between Flask's simplicity and Django's batteries-included philosophy. You can write an entire app in a single Python file, but you're working with proper async/await from the ground up, not bolted on as an afterthought. The fact that it powers FastAPI while getting a fraction of the brand recognition is one of those weird quirks of tech marketing.

The 1.0 release brings breaking changes, which is exactly what you'd expect from a major version bump. The most significant is the shift from `on_startup` and `on_shutdown` parameters to a lifespan mechanism based on async context managers. It's cleaner, more Pythonic, and frankly overdue. But here's where things get interesting.

## The Training Data Problem

We're now in this bizarre situation where [AI](https://mgks.dev/tags/artificial-intelligence/) models have been trained on years of Starlette 0.x code, and suddenly that code doesn't work anymore. Not in a "oh, deprecated but still functions" way, but in a "this will actually break" way.

I decided to test this with Claude's skill system. If you haven't played with skills on claude.ai, they're essentially custom knowledge documents you can inject into Claude's context. There's even a skill-creator skill that lets Claude build its own skills, which is delightfully meta.

I gave Claude one instruction: clone the Starlette repo and build a comprehensive skill document for the 1.0 release with code examples for every feature.

Claude went off and did exactly that. It even handled the fact that the GitHub URL was slightly wrong (the repo moved organizations) because GitHub's redirects saved it. The resulting skill document was thorough, covering routes, middleware, websockets, the new lifespan system, everything.

Then I noticed something new. A "Copy to your skills" button appeared at the top of the generated skill. I clicked it, and suddenly my regular Claude chat had access to this knowledge.

## Testing the Updated Knowledge

Time to see if this actually worked. I asked Claude to build a task management app with projects, tasks, comments, and labels. Essentially a lightweight GitHub Issues clone.

What came back was proper Starlette 1.0 code. It used the new lifespan mechanism. It integrated aiosqlite for database operations and Jinja2 for templates. The entire thing was a single working Python application, exactly the kind of thing Starlette excels at.

This is worth sitting with for a moment. We're not talking about Claude Code or some specialized coding agent here. Regular Claude chat now functions as a coding agent. It can write code, test code, iterate on code. The lines between "chatbot" and "[artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) developer tool" have completely blurred.

## What This Means for Framework Authors

Here's the thing that keeps me up at night: every major version release of every framework now needs to account for the fact that millions of developers are going to ask LLMs to generate code for it. And those LLMs are working with training data that might be months or years out of date.

Skills (or whatever equivalent other platforms use) become a necessary part of the release process. You're not just writing migration guides for human developers anymore. You're writing them for the machines that will be generating code on behalf of those developers.

The Datasette project I work on is still on alpha 26, not because it's unstable, but because I'm terrified of breaking changes. That fear feels even more justified now. When you break an API, you're not just breaking existing code, you're breaking every [LLM](https://mgks.dev/tags/llm/) that's trying to generate new code for your framework.

Maybe the real innovation here isn't Starlette 1.0 itself (though it's a great release). It's the realization that framework documentation now needs to exist in two forms: one for humans, and one that can be injected into AI context windows at scale.

The fact that I could update Claude's knowledge of an entire framework in about five minutes and immediately get working code from it suggests we're entering a very different era of software development, where the staleness of training data matters less than the ability to rapidly update it.