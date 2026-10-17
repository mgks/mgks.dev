---
title: "Python 3.15 arrives: lazy imports and sampling profilers reshape the ecosystem"
description: "Python 3.15 brings lazy imports, new profiling tools, and unpacking syntax. Here's what matters for building faster, more maintainable applications."
date: 2026-10-17 18:00:20 +0530
tags: rollup, engineering, python, performance, developer-tools
image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070"
featured: false
---

Python 3.15 is officially here, and for the first time in years I'm genuinely excited about multiple features landing in the same release. The headline improvements matter because they address real pain points I encounter building open source software that needs to run everywhere.

With 3.10 now officially unsupported, I can finally drop backward compatibility and start using 3.11 features across my projects. But 3.15 itself deserves attention, particularly for what it signals about Python's direction.

## Lazy imports solve a real startup problem

PEP 810's explicit lazy imports are the feature I'm most anticipating. Here's the pattern:

```python
from lazy import expensive_module
```

The module won't actually load until you use it. This sounds simple, but it's transformative for CLI tools and plugins.

I built an LLM plugin system where authors could use heavyweight dependencies like sentence_transformers. The problem? Every invocation of the `llm` command would spend multiple seconds loading these dependencies, even if you weren't using that particular plugin. I documented manual lazy import patterns as a workaround, but having this in the language itself changes everything. You go from requiring discipline and documentation to having it baked into the syntax.

This matters beyond CLI tools. Any application with optional features, plugin systems, or conditional imports benefits. Web frameworks that load database drivers only when needed. Data science tools that defer TensorFlow loading. The startup penalty for Python has been a legitimate criticism for years, and lazy imports provide a language-level solution.

## Profiling gets a generational upgrade

Python's profiling story just improved dramatically. The standard library now includes Tachyon, a sampling profiler alongside the existing instrumentation-based cProfile.

Sampling profilers are fundamentally different. They periodically capture stack traces from running processes without instrumenting your code. I've used py-spy for this, but having it in the standard library is significant. You can attach to an existing Python 3.15 process by PID and start gathering data:

```bash
python -m profiling.sampling --pid 12345
```

The output includes flame graphs and heat maps. The Firefox Profiler integration is particularly clever. This is low-overhead profiling that works against production systems without requiring restart or code changes.

For teams building performance-critical applications, this is a game-changer. You're not guessing anymore; you're observing where time actually goes. The [profiling and optimization techniques](https://mgks.dev/tags/performance/) I've recommended before relied on external tools. Now they're part of the standard library.

## What actually improved in performance?

Miguel Grinberg's recent benchmarking revealed something interesting: 3.15 performs roughly the same as 3.14 for most workloads. The exception is Python's experimental JIT compiler, which showed a 1.2x speedup on Fibonacci calculations. This is the first time the JIT demonstrated real-world performance gains.

I'm cautious about JIT improvements. They sound revolutionary until you realize they only help specific patterns. But the trajectory matters. 3.14 showed significant improvements over 3.13. If 3.15's JIT starts generalizing performance wins, that's the story of the next few years.

## The 3.11 features I can finally use

Dropping 3.10 lets me use 3.11 features I've been restricted from. tomllib is available for TOML parsing without external dependencies. TaskGroup and timeout() in asyncio make concurrent code cleaner. datetime.UTC as an alias removes friction.

But the SQLite improvements matter most for my work. Better transaction handling, connection context managers, and performance optimizations mean Datasette can be simpler and faster. I landed a PR removing a workaround I'd needed for years.

I'm updating my cookiecutter templates to test against Python 3.11 through 3.15. This signals to the ecosystem that you should be testing against modern Python versions. Most open source maintainers are years behind on this.

## The meta-story here

Python's release cycle has matured. Features land when they're ready, not on arbitrary schedules. Lazy imports, sampling profilers, and JIT improvements all address pain points that real developers complained about for years.

The question now: will the ecosystem catch up? Most production systems still run Python 3.10 or 3.11. These features only matter if people upgrade. But as 3.15 becomes the standard for new projects, you'll start seeing lazy imports in popular libraries, sampling profilers in performance monitoring tools, and maybe even the JIT providing meaningful speedups on real workloads.

The next generation of Python applications might actually be faster to start and simpler to debug than we expected.