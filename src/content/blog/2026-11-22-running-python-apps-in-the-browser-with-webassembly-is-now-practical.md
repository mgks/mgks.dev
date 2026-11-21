---
title: "Running Python Apps in the Browser with WebAssembly is Now Practical"
description: "Simon Willison's Datasette Lite rewrite using service workers shows how to run full Python applications in WebAssembly. This pattern could transform how we build preview environments."
date: 2026-11-22 00:00:22 +0530
tags: rollup, engineering, webassembly, python, tooling
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

Simon Willison just shipped a complete rewrite of Datasette Lite, and it's quietly one of the most important developments I've seen in how we can architect preview environments and demo tools. The old version was a clever hack. The new one is elegant infrastructure.

Let me explain what's actually happening here, because the architecture tells you something important about where web development is heading.

## Service Workers as HTTP Proxies

The new Datasette Lite registers a service worker for the entire lite.datasette.io domain. This lets it intercept HTTP requests and serve responses from client-side code instead of a server. The parent page creates an iframe that makes normal Datasette requests, but with a special `/app/<session>/` prefix.

That session ID is the clever bit. Without it, every tab would share the same underlying Datasette instance. With it, each tab can run a completely independent Python environment with different plugins, databases, and configurations. The service worker routes requests using that session ID back through to a web worker running Pyodide, which executes a full instance of Datasette.

This is layered: service worker handles HTTP routing, web worker maintains Python state (since Pyodide loses state after 30 seconds in a service worker), iframe keeps everything isolated. Each layer solves a specific constraint.

## The URL as Configuration

What makes this actually useful is how you configure it all through URL parameters. You can pass `?install=datasette-maplibre` to install plugins from PyPI. You can pass `&url=https://.../demo.db` to load a specific SQLite database. You can chain `&metadata=` to load custom metadata files that describe your data.

Then you can paste that link in an issue to demonstrate a bug, or share it to showcase a feature. No server setup required. The receiver clicks a link and gets a fully functional environment.

I've used similar patterns with [API design](https://mgks.dev/tags/api-design/) for years, but I've never seen them executed this cleanly. The technical debt usually catches you. Here it feels genuinely maintainable.

## SQLite Versions as a Service

One detail that fascinated me: Datasette Lite now supports `?sqlite=3.54.1` to run against specific SQLite versions. Willison created `pysqlite3-wasm-wheels`, a repository with WebAssembly compiled Python wheels for 163 different SQLite versions.

This is wild because it means you can test whether a behavior is a SQLite bug or a Datasette bug by switching versions through a URL parameter. It's a debugging tool that would have required serious DevOps work five years ago. Now it's just HTTP requests served from your browser.

## Why This Matters

The broader pattern here is that Python applications no longer need to stay server-side. Any Python app with reasonable resource constraints can now:

- Ship zero-infrastructure demo environments
- Provide reproduction links for bug reports
- Run preview environments for CI/CD without spinning up containers
- Test against multiple configurations without deployment complexity

The catch is that extensions matter. Anything using C or Rust extensions used to be blocked from WebAssembly. But modern coding agents can compile those to WASM now. PEP 783 standardized publishing WASM wheels to PyPI in April 2026, so this pattern is becoming standardized infrastructure rather than a clever one-off.

Databases are still the blocker. SQLite works perfectly in WASM. PostgreSQL and MySQL work but aren't idiomatic yet. That's the real frontier.

## The AI Spike That Became Production

One detail stuck with me: Willison started this architecture as an "AI research spike generated using Claude Opus 4.8" in May. He didn't feel confident shipping it until November, after working with Claude Fable 5.2 to understand and refine it. He even had Claude generate the SVG diagrams in the README.

That's a realistic picture of how AI-assisted development actually works. Generating working code is one thing. Understanding it well enough to maintain and deploy it to production is another. The spike-to-production journey took six months of thinking.

This pattern is spreading. I'd expect to see WASM-based preview environments become standard for Python tools over the next year. The technology is proven. The tooling is getting better. The use cases are undeniable.

The question isn't whether your Python tool *can* run in the browser anymore. It's whether you've built the URL-based configuration layer to make it actually useful.