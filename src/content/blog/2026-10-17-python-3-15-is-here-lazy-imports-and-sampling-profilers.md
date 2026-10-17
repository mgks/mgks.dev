---
title: "Python 3.15 is here: lazy imports and sampling profilers"
description: "Python 3.15 brings lazy imports, new unpacking syntax, and built-in sampling profilers. Here's what matters for developers dropping 3.10 support."
date: 2026-10-17 12:00:22 +0530
tags: rollup, engineering, python, performance, open-source
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065"
featured: false
---

Python 3.15 is officially released, and with it comes the end of Python 3.10 support. As someone maintaining open source software across multiple Python versions, this is a meaningful milestone. I can finally drop support for a five-year-old release and start using features from Python 3.11 that I've been eyeing for months.

But before I dive into what 3.11 unlocks, let me highlight the features in 3.15 itself that genuinely matter for production code.

## Lazy imports solve real startup problems

Explicit lazy imports from PEP 810 address a pain point I've dealt with firsthand. My LLM CLI tool uses a plugin system, and I had to document manual lazy imports for plugin authors because importing heavy dependencies like sentence_transformers added multiple seconds to every command invocation.

Now with PEP 810, you can defer module loading until symbols are actually used. This isn't just convenience; it's a material improvement for tools with plugins, CLI applications, and any system where startup latency matters. For applications competing on responsiveness, this is significant.

The new unpacking syntax for comprehensions is also neat, extending PEP 448's unpacking with `[*sublist for sublist in lists]`. It's a small ergonomic win that makes certain data transformations more readable.

## Sampling profilers in the standard library

Python's profiling story just got better. The built-in tracing profiler has been renamed to profiling.tracing, joined by a new sampling profiler called Tachyon (profiling.sampling).

I've used external tools like py-spy for this work. Sampling profilers are low-overhead and reveal where time actually goes without needing to instrument your code upfront. They work by periodically capturing stack traces and aggregating them to identify hot functions. Having this capability in the standard library means fewer dependencies and better accessibility for developers who need to profile production systems.

The tooling is sophisticated too: flame graphs, heat maps, and even Firefox profiler UI output. This is the kind of thing that makes Python's developer experience competitive with more established systems languages.

## What 3.15 doesn't deliver (yet)

Miguel Grinberg's recent performance testing found that 3.15 performs mostly identically to 3.14, with one exception: the experimental JIT compiler showed a 1.2x boost on Fibonacci tests. That's the first meaningful JIT win Miguel's observed across releases, though it's still experimental and not production-ready.

Performance improvements have been incremental across recent releases. 3.14 showed more significant gains over 3.13, but the Python team's focus on stability and compatibility means raw speed gains come slower. That's a reasonable tradeoff for a language with Python's ecosystem.

## The real win: dropping 3.10, using 3.11

Here's where dropping 3.10 support actually matters. Python 3.11 introduced several features I've been wanting to use in projects like Datasette:

- `tomllib` for TOML parsing without external dependencies
- `TaskGroup` and `timeout()` for cleaner asyncio code
- `datetime.UTC` as a standard alias
- Enhanced SQLite support with better performance and new APIs
- Significant typing system improvements

I've already started landing these improvements across my main projects. Removing workarounds like the `set_authorizer(None)` call in Datasette felt like cleaning up technical debt.

I've also updated my cookiecutter templates for click-app, datasette-plugin, python-lib, and llm-plugin to test against Python 3.11 through 3.15. This ensures new projects I scaffold start with modern Python from day one.

## What this means for the broader ecosystem

Every Python release that drops support for older versions represents a small but real reset. Projects can shed compatibility layers, simplify their CI matrices, and adopt new patterns. It's not dramatic, but it compounds. The Python community benefits from this gradual modernization.

For tools and frameworks, this timing matters too. If you maintain something [across multiple Python versions](https://mgks.dev/tags/open-source/), you're now free to require 3.11+. That opens doors to async improvements, better standard library coverage, and cleaner code.

The question for 2025 isn't whether to upgrade to 3.15, but whether your constraints allow dropping 3.10 now and what 3.11 features you've been postponing. How many of your projects are still carrying compatibility code that could disappear today?