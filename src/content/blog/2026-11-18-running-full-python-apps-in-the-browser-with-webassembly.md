---
title: "Running Full Python Apps in the Browser with WebAssembly"
description: "Simon Willison rewrote Datasette Lite using service workers and Pyodide, enabling complex Python applications to run entirely client-side. Here's what this means for developers."
date: 2026-11-18 12:00:22 +0530
tags: rollup, engineering, webassembly, python, browser-computing
image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070"
featured: false
---

I've been following Simon Willison's Datasette Lite project for a while, and the recent rewrite he published is genuinely impressive. He's taken a full server-side Python application and made it run entirely in the browser using WebAssembly and Pyodide, with service workers handling all the HTTP routing. What started as a joke in 2022 has matured into something that fundamentally changes how we think about preview environments and demos.

The original version was, by his own admission, a hack. It ran Datasette in a Pyodide web worker, simulated HTTP requests through that stack, and injected the results back into the page using innerHTML. This approach had obvious limitations: any JavaScript-dependent features broke because script tags don't execute when you inject them this way, and loading additional CSS or JS files from a web worker is messy at best.

## Service Workers as Application Servers

The new architecture is elegant. Instead of trying to simulate the entire request/response cycle, Willison uses service workers to intercept actual HTTP requests for the entire lite.datasette.io domain. The parent page creates an iframe that makes regular-looking Datasette requests, but with a special `/app/<session>/` prefix.

That prefix is the clever bit. It exists because of multiple tabs. If you have one Datasette Lite demo open with the datasette-maplibre plugin and another with different plugins, they're sharing the same service worker. Without session isolation, every tab would talk to the same underlying Datasette instance. Instead, each tab gets its own session ID, and the service worker routes requests back through to a dedicated web worker running a separate Datasette instance for that session.

Why not just run Pyodide directly in the service worker? Because service workers can't maintain state beyond about 30 seconds depending on the browser. The web worker backs the whole thing, maintaining the actual Datasette application instance. The service worker just routes traffic.

It's a really thoughtful design that solves a problem most of us never think about: how do you provide truly isolated preview environments when everything runs client-side?

## The SQLite Wheel Repository

One of the newer features that emerged from this work is particularly useful for library developers. Willison built pysqlite3-wasm-wheels, a repository containing WebAssembly-compiled Python wheels for 163 different SQLite versions.

You can now pass `?sqlite=3.54.1` to Datasette Lite and it will load that specific SQLite version entirely in your browser. Want to test how a query behaves across multiple SQLite releases? You can do that without touching your system Python or Docker. Want to demonstrate a bug that only exists in a specific version? Generate a URL that someone can click and see the exact issue reproduced.

This is the kind of capability that historically required either significant DevOps overhead or careful management of multiple environments locally. Now it's a URL parameter.

## Implications for Web Development

What strikes me most about this work is how it expands what's possible for web-based tooling. The core insight isn't specific to Datasette. Almost any Python application can now provide browser-based preview environments cheaply. Want to let users try a new feature without deploying? Want to generate shareable links that reproduce bugs exactly? Want to offer interactive documentation that actually runs your code?

The traditional blockers around C and Rust extensions are largely solved now. Claude and other coding agents can compile these to Pyodide-compatible WebAssembly routinely. PEP 783, passed in April 2026, means you can publish WebAssembly wheels to PyPI just like regular wheels.

The one serious limitation remains: databases like PostgreSQL and MySQL are possible but still complex in WebAssembly. SQLite, being a single-file embedded database, is perfect. But this limitation exists more because fewer people have tried it than because it's truly impossible.

## URL-Addressable Environments

I've written before about the power of [URL-addressable systems](https://mgks.dev/tags/url-addressable/), and Datasette Lite exemplifies this beautifully. That demo link Willison shared for the maplibre plugin includes the plugin name, the database URL, metadata configuration, and even the specific map view all baked into one URL. It's completely shareable, completely reproducible.

This approach deserves to become standard practice across Python tooling. The investment in making your tool's entire state URL-encodable pays off immediately in terms of documentation, bug reproduction, and collaboration.

Willison credits Claude for helping build the architecture, particularly with generating SVG diagrams to explain how the service worker and web worker choreography works. He's also using Claude-based tools for building smaller utilities like the SQLite version comparison tool.

The fact that complex architectural problems can now be solved collaboratively with AI systems changes what's realistic to build. Six months ago, Willison wasn't sure this would work at scale. By November, after iterating with Claude, he felt confident enough to ship it to production.

What's the next Python framework that's going to realize they could offer instant, zero-setup preview environments to their entire user base?