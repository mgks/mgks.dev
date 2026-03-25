---
title: "Starlette 1.0 and the curious case of teaching AI new tricks"
description: "Starlette finally hits 1.0, but what happens when your LLM was trained on outdated code? Claude's new skills feature might just solve that problem."
date: 2026-03-26 00:00:56 +0530
tags: rollup, engineering, python, ai
image: 'https://images.unsplash.com/photo-1747920523600-bd6a3d064f4d?q=80&w=2070'
featured: false
---

Starlette 1.0 just dropped, and honestly, it's about time. This is one of those rare moments where a framework that's been powering millions of applications finally gets the stability badge it deserves. If you've been using FastAPI, you've been using Starlette this whole time. It's the invisible foundation that nobody talks about at dinner parties.

Kim Christie started this thing back in 2018, and it immediately felt different from the typical Python web framework. It's ASGI-native, which means it actually understands async/await instead of bolting it on as an afterthought. Simon Willison has been watching it closely since the beginning but never committed to using it for Datasette because, well, no 1.0 meant no stability promises. Fair enough when you're building a plugin ecosystem.

The project changed hands recently. Marcelo Trylesinski took over maintenance in September 2025, which makes sense given their years of contributions. These quiet transitions happen all the time in open source, but they're critical for project longevity.

## The breaking changes nobody wanted but everyone needed

Version 1.0 comes with breaking changes. The old `on_startup` and `on_shutdown` parameters are gone, replaced by a lifespan mechanism using async context managers. This is cleaner, more Pythonic, and aligns better with how modern async code should work. But here's where it gets interesting.

If you're a developer in 2026, you're probably using [AI](https://mgks.dev/tags/artificial-intelligence/) to generate boilerplate code at least some of the time. I certainly am. The problem? Most large language models were trained on code from before Starlette 1.0. Ask Claude or GPT-4 to write you a Starlette app, and there's a decent chance it'll spit out code using the old startup/shutdown pattern that doesn't work anymore.

This isn't a hypothetical problem. It's actively annoying. You paste the generated code, run it, and immediately hit errors because the training data is stale.

## Claude's skill system as a workaround

Here's where things get clever. Claude on claude.ai has this skills feature that I've mostly ignored until now. It turns out there's a meta-skill called skill-creator that lets Claude build its own skills. So the experiment was simple: point Claude at the Starlette GitHub repo and ask it to generate a skill document with all the 1.0 features and examples.

I didn't even provide the repository URL. Just said "Clone Starlette from GitHub" and Claude figured it out. It cloned from the old repository path, but GitHub redirects handled it automatically. The resulting skill document looked comprehensive, covering routing, middleware, the new lifespan mechanism, everything.

Then I noticed a "Copy to your skills" button I'd never seen before. Clicked it. Now my Claude instance knows Starlette 1.0.

Testing this was straightforward. I asked it to build a task management app with projects, tasks, comments, and labels. Claude generated a complete GitHub Issues clone using Starlette 1.0 patterns, aiosqlite for the database, and Jinja2 for templates. The code actually ran. No deprecated patterns, no manual fixes needed.

## What this actually means for [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) tooling

This feels like a glimpse at how we'll handle the staleness problem going forward. LLMs can't be retrained every time a framework releases a new version. That's not economically viable and the lag time would be months at minimum. But if the models can ingest fresh documentation and examples at inference time through skills or similar mechanisms, suddenly the problem becomes manageable.

It's not perfect. The skill document is still limited by context windows, and there's no guarantee the model will prioritize the skill over its base training. But it's directionally correct.

What strikes me most is how casually powerful this is becoming. Claude can clone repositories, read documentation, generate comprehensive reference materials, and then immediately use that knowledge to write working code. We're not talking about a specialized coding agent here. This is the base Claude chat interface with some extra tooling bolted on.

The distinction between "coding assistant" and "coding agent" is getting blurry. Claude Code gets all the attention, but regular Claude can already write and conceptually test code against its own knowledge base. It's not running the code in a sandbox (yet), but it understands what should work based on the patterns it just learned.

## The Starlette aesthetic

If you haven't used Starlette directly, it sits somewhere between Flask's simplicity and Django's batteries-included philosophy. Single-file apps are totally viable, which is increasingly important when you're asking an LLM to generate something complete. The fewer files and the less boilerplate, the better the results tend to be.

Christie's background with Django REST Framework shows through in the API design. Things feel intuitive if you've spent time in the Django ecosystem, but without all the ORM baggage and assumptions about how you'll structure your project.

The framework has been stable in practice for years, even without the 1.0 label. That's part of why FastAPI could build on top of it with confidence. But the lack of that explicit stability promise kept some developers away, myself included for certain projects. Now that barrier is gone.

I wonder how long it'll take before the base training data for major [language models](https://mgks.dev/tags/language-models/) includes post-1.0 Starlette code. Six months? A year? And what happens to all the FastAPI tutorials and examples that inadvertently teach Starlette 0.x patterns? The internet doesn't forget, but it also doesn't update itself.