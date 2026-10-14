---
title: "Python 3.15 is here: lazy imports and sampling profilers change the game"
description: "Python 3.15 brings explicit lazy imports, new profiling tools, and unpacking syntax. Here's what matters for building faster, more maintainable software."
date: 2026-10-14 06:00:22 +0530
tags: rollup, engineering, python, performance, open-source
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
featured: false
---

Python 3.15 is officially released, and I'm genuinely excited about what this means for the tools I build. More importantly, Python 3.10 is now officially unsupported, which gives me permission to drop it from my projects and start using features from Python 3.11 that I've been eyeing for years.

But let's start with what's new in 3.15 itself, because there are some genuinely transformative features here.

## Lazy imports finally solve a real problem

Explicit lazy imports from PEP 810 address something I've struggled with for a while. My LLM CLI tool uses a plugin system, and I kept recommending that plugin authors implement manual lazy imports in their documentation. Why? Because simply installing a plugin that depends on heavy libraries like sentence_transformers could add multiple seconds to every invocation of the llm command.

Now, with `from module import lazy symbols`, the module doesn't load until those symbols are actually used. This is a game-changer for CLI tools, server startup performance, and any code path where you might not need all your imports. I'm already thinking about how to leverage this across my projects.

## Profiling gets serious

Python's profiling story just got significantly better. The standard library now includes Tachyon, a sampling profiler that runs with almost no overhead. I've used py-spy for this kind of work before, but having it built into the standard library changes everything.

Sampling profilers work differently than instrumentation profilers. Instead of measuring every function call, they periodically capture stack traces and aggregate them to show where your program actually spends time. They're low-overhead enough to run in production.

Better yet, the output options are excellent: flame graphs, heat maps, and formats compatible with the Firefox profiler UI. Being able to profile existing processes by PID means I can finally understand what my production code is actually doing without instrumenting it first.

## Unpacking gets more flexible

The new unpacking syntax in comprehensions `[*sublist for sublist in lists]` is elegant. It's a small feature, but these small syntax improvements compound over time. They make code more readable and reduce the need for workarounds.

## What this means for my projects

Dropping Python 3.10 support and adopting 3.11 features is what excites me most. Suddenly I can use:

- `tomllib` for TOML parsing without external dependencies
- `TaskGroup` and `timeout()` for better asyncio patterns
- `datetime.UTC` instead of `datetime.timezone.utc`
- Enhanced SQLite support with better type hints

Datasette, which makes heavy use of asyncio, will benefit immediately from TaskGroup. I've already started landing these improvements across my cookiecutter templates, ensuring that new projects I generate test against Python 3.11 through 3.15.

My first PR removed a workaround in Datasette that I've had to maintain for years. That's the real win here: not flashy new features, but the ability to delete code that was only there to support older Python versions.

## The performance question

Miguel Grinberg recently tested whether Python 3.15 is actually faster. The answer is mostly no, compared to 3.14. Performance stayed flat across most categories. However, the experimental JIT compiler showed a 1.2x improvement on synthetic benchmarks. That's the first time Miguel observed a meaningful JIT performance increase, which suggests the JIT team is making real progress.

This matters because Python's performance has been a contentious topic. While I care about [performance optimization](https://mgks.dev/tags/performance), I care more about having the right tools available. The sampling profiler means I can now measure where time is actually going, which is half the battle.

## What this means for open source maintainers

If you maintain libraries that support multiple Python versions, you now have a decision to make. Every year, one version falls out of support. Some projects support only the last 2-3 versions. Others support everything currently maintained by the core team.

My policy is to support every version still receiving security updates from CPython. This means I can now drop 3.10 entirely and start using modern Python features. It also means checking my [open source tools](https://mgks.dev/tags/open-source) against 3.15 from day one.

The fact that lazy imports, better profiling, and improved async patterns are now baked into the standard library suggests the Python community is serious about addressing real pain points. The question for the next year is whether these features will be widely adopted, or if ecosystem inertia keeps most projects on older versions for longer than necessary.