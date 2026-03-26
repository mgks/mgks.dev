---
title: "Starlette 1.0 and the Problem of Teaching AI New Tricks"
description: "Starlette finally hits 1.0, but breaking changes expose a fascinating challenge: how do you get LLMs to generate code for versions they weren't trained on?"
date: 2026-03-27 00:00:56 +0530
tags: rollup, engineering, python, ai, open-source
image: 'https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073'
featured: false
---

Starlette 1.0 just dropped and honestly, it's wild that this feels like such a milestone for a framework that already powers FastAPI, which has been eating the Python web framework world for lunch. The brand recognition problem is real here. Everyone knows FastAPI, but mention Starlette and you might get blank stares from developers who use it every single day without knowing it.

Kim Christie started this thing back in 2018, and it became one of those projects that felt immediately right if you wanted to work with ASGI and asyncio without feeling like you were fighting the framework. The reason I never built Datasette on top of it was purely about stability promises. I needed a stable plugin API, and Starlette wasn't committing to that yet. Funny enough, I still haven't shipped my own 1.0 after 26 alphas, so maybe I should stop throwing stones from my glass house.

Marcelo Trylesinski took over the project in September 2025, which makes sense given the years of contributions. The transfer to their GitHub account was about making maintenance sustainable and letting them actually get sponsored for the work.

## Breaking Changes and the Training Data Problem

The 1.0 release includes breaking changes, which is exactly what a 1.0 is for. The most significant is how startup and shutdown code works. The old `on_startup` and `on_shutdown` parameters are gone, replaced by a lifespan mechanism using async context managers. It's cleaner, more Pythonic, and completely breaks any code written against 0.x.

Here's where it gets interesting for anyone working with [AI](https://mgks.dev/tags/artificial-intelligence/) code generation tools. Starlette is well-known enough that models have been trained on tons of example code. But all that training data uses the old API. So when you ask Claude or ChatGPT to write you a Starlette app, there's a really good chance it's going to spit out code that doesn't work with 1.0.

This is not a theoretical problem. This is going to bite people constantly over the next year.

## Skills as a Solution

I decided to test whether Claude's skills feature could solve this. Regular Claude Chat has this skill-creator skill, which means Claude can build its own skills. Very meta, very useful.

I gave it a simple prompt: clone Starlette from GitHub and build a skill markdown document with code examples of every feature. I didn't even tell it where the repo lived. It found it on its own, used the old repository URL (which GitHub redirected automatically), and generated what looked like a comprehensive skill document.

Then I noticed a "Copy to your skills" button I hadn't seen before. Clicked it, and boom, my Claude chat now has Starlette 1.0 knowledge baked in.

To test it, I asked Claude to build a task management app with projects, tasks, comments, and labels. What I got back was a working GitHub Issues clone using Starlette 1.0, SQLite via aiosqlite, and Jinja2 templates. The code actually worked. The lifespan mechanism was implemented correctly. This wasn't hallucinated pre-1.0 garbage.

## The Real Story Here

People are obsessed with Claude Code right now, but regular Claude is already a coding agent. It can write code, test code, and iterate on code. The skills system turns it into something more specific: a coding agent that can be quickly updated with new knowledge about frameworks and APIs that didn't exist or were different when the model was trained.

This matters way more than it seems. The half-life of [Python](https://mgks.dev/tags/python/) framework knowledge in language models is getting shorter and shorter. Every major release with breaking changes creates a window where the models are confidently wrong. Skills give you a way to patch that in real-time without waiting for retraining.

Starlette sits in this interesting position where it's simultaneously under-recognized and massively used. It's the kind of framework that feels like asyncio-native Flask with some Django sensibility thrown in, which makes sense given Kim Christie also created Django REST Framework. You can write entire apps in a single Python file, which makes it perfect for LLM code generation when the LLM actually knows what it's doing.

The question isn't whether Starlette 1.0 is good (it is), but whether the tooling around [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) code generation can keep pace with the frameworks themselves as they evolve.